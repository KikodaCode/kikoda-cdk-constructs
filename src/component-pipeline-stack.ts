import { Stack, StackProps, StageProps } from 'aws-cdk-lib';
import { ComputeType } from 'aws-cdk-lib/aws-codebuild';
import {
  ShellStep,
  AddStageOpts,
  CodePipeline,
  ManualApprovalStep,
  CodeBuildOptions,
  CodePipelineProps,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { merge } from 'lodash';
import { ComponentConfig, IDeploymentBranch } from './branch-pipelines';
import { CodeSource, RepositoryConfig } from './code-source';
import { PipelineEventNotificationRule } from './pipeline-event-notification-rule';
import { TrimCloudAssemblyStep } from './trim-cloud-assembly-step';
import { defineSynthCommands } from './util';

/**
 * Configuration for the stage.
 *
 * @export
 * @interface StageConfig
 * @typedef {StageConfig}
 * @template TConfig
 */
export interface StageConfig<TConfig> extends StageProps {
  /**
   * The name of the stage.
   *
   * @readonly
   * @type {string}
   */
  readonly name: string;
  /**
   * Add a manual approval step when deploying this stage.
   *
   * @readonly
   * @type {?boolean}
   */
  readonly manualApproval?: boolean;
  /**
   * The generic config.
   *
   * @readonly
   * @type {TConfig}
   */
  readonly config: TConfig;
}

/**
 *
 * @export
 * @interface PipelineConfig
 * @typedef {PipelineConfig}
 */
export interface PipelineConfig {
  /**
   * Add a step to pull down and remove asset zips from the cloud assembly output from the Synth
   * step. This is usefull when you have a lot of resources and are hitting the CFN limit for input
   * artifact size.
   *
   * @readonly
   * @type {?boolean}
   */
  readonly pruneCloudAssembly?: boolean;
  /**
   *
   * @readonly
   * @type {?string}
   */
  readonly notificationTopicArn?: string;

  /**
   * CodeBuild options for the asset publishing step. Maps to the CodePipelineProps assetPublishingCodeBuildDefaults.
   * These will be merged with options to handle CodeArtifacts repositories if `codeArtifactRepositoryArn` is also specified.
   * @readonly
   */
  readonly assetPublishingCodeBuildDefaults?: CodePipelineProps['assetPublishingCodeBuildDefaults'];
  /**
   * Additional customizations to apply to the synthesize CodeBuild projects
   *
   * @default - Only `codeBuildDefaults` are applied
   */
  readonly synthCodeBuildDefaults?: CodePipelineProps['synthCodeBuildDefaults'];
}

/**
 * The properties for the ComponentPipelineStack construct.
 *
 * @export
 * @interface ComponentPipelineStackProps
 * @typedef {ComponentPipelineStackProps}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig>
 * @extends {DeploymentPipelinesProps<TConfig, TBranch>}
 */
export interface ComponentPipelineStackProps<TConfig, TBranch extends IDeploymentBranch<TConfig>>
  extends StackProps {
  /**
   * The deployment branch that this stack represents.
   *
   * @type {TBranch}
   */
  readonly branch: TBranch;
  readonly repository: RepositoryConfig;
  readonly pipelineConfig: PipelineConfig;
  readonly component: ComponentConfig;
}

/**
 * An individual component deployment pipeline stack.
 *
 * @export
 * @class ComponentPipelineStack
 * @typedef {ComponentPipelineStack}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig>
 * @extends {Stack}
 */
export class ComponentPipelineStack<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig>,
> extends Stack {
  /**
   * Instance of the CDK.CodePipeline created
   */
  readonly codePipeline: CodePipeline;

  /**
   * Creates an instance of IndividualPipelineStack.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {ComponentPipelineStackProps<TConfig, TBranch>} props
   */
  constructor(scope: Construct, id: string, props: ComponentPipelineStackProps<TConfig, TBranch>) {
    super(scope, id, props);

    const { staticPipelineIdentifier = props.branch.branchName, branchName } = props.branch;
    const { componentName, componentType } = props.component;
    const {
      pruneCloudAssembly = true,
      notificationTopicArn,
      synthCodeBuildDefaults: codeBuildOptions,
      assetPublishingCodeBuildDefaults,
    } = props.pipelineConfig;

    const { source, synthOuputDir = 'out', baseDir = '.' } = props.repository;

    // Static Pipeline id
    const pipelineId = `${componentName}-${staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${componentName}-${branchName.replace('/', '-')}`;
    let synthCodeBuildDefaults: CodeBuildOptions = merge(
      {
        buildEnvironment: {
          computeType: ComputeType.LARGE,
        },
      },
      codeBuildOptions,
    );
    this.codePipeline = new CodePipeline(this, pipelineId, {
      pipelineName,
      dockerEnabledForSynth: true,
      synthCodeBuildDefaults,
      synth: new ShellStep('Synth', {
        input: new CodeSource(this, props.branch.branchName, source).source,
        commands: defineSynthCommands(baseDir, synthOuputDir),
        primaryOutputDirectory: `${baseDir}/${synthOuputDir}`,
      }),
      assetPublishingCodeBuildDefaults,
    });

    // Add defined stages
    props.branch.stages.forEach(stage => {
      const pre: AddStageOpts['pre'] = [];

      // optional pruning step before CFN deploy to get around 256mb input artifact limit
      if (pruneCloudAssembly) pre.push(new TrimCloudAssemblyStep(id, pipelineName));

      // add manual approval step if applicable
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.name}`));

      this.codePipeline.addStage(
        new componentType(this, stage.name, { stageName: stage.name, ...stage }),
        {
          pre,
        },
      );
    });

    this.codePipeline.buildPipeline();

    // TODO: move to an aspect?
    if (notificationTopicArn && notificationTopicArn !== '') {
      new PipelineEventNotificationRule(this.codePipeline, {
        notificationTopicArn,
      });
    }
  }
}
