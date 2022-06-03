import { Stack, StackProps, StageProps } from 'aws-cdk-lib';
import { ComputeType } from 'aws-cdk-lib/aws-codebuild';
import { IRole } from 'aws-cdk-lib/aws-iam';
import {
  ShellStep,
  AddStageOpts,
  CodePipeline,
  ManualApprovalStep,
  CodeBuildOptions,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { merge } from 'lodash';
import { AssumeRolePartialBuildSpec } from './assume-role-partial-build-spec.ts';
import { ComponentConfig, IDeploymentBranch } from './branch-pipelines';
import { CodeSource, RepositoryConfig } from './code-source';
import { CodeArtifactAuthTokenAccessRole } from './codeartifact-auth-token-access-role';
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
  readonly stageName: string;
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
   * Specifying a codeartifact ARN here will enable asset phase of the pipeline to access that codeartifact repository.
   * This includes adding approprate roles and leveraging an assumed role for the docker build so that the docker build can pull from codeartifact.
   *
   * @readonly
   * @type {?string}
   */
  readonly codeArtifactRepositoryArn?: string;
  /**
   *
   *
   * @readonly
   * @type {?string}
   */
  readonly notificationTopicArn?: string;
  /**
   * An optional role that can be assumed to perform the build.
   *
   * @readonly
   * @type {?string}
   */
  readonly builderAssumeRole?: string;
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
      codeArtifactRepositoryArn,
      notificationTopicArn,
    } = props.pipelineConfig;

    const { source, synthOuputDir = 'out', baseDir = '.' } = props.repository;

    // Static Pipeline id
    const pipelineId = `${componentName}-${staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${componentName}-${branchName.replace('/', '-')}`;

    const builderAssumeRoles: IRole[] = [];
    let assetPublishingCodeBuildDefaults: CodeBuildOptions = {};

    if (codeArtifactRepositoryArn) {
      const codeArtifactAccessRole = new CodeArtifactAuthTokenAccessRole(
        this,
        'CodeArtifactAccessRole',
        { codeArtifactRepositoryArn },
      );
      builderAssumeRoles.push(codeArtifactAccessRole);
      assetPublishingCodeBuildDefaults = merge(assetPublishingCodeBuildDefaults, {
        partialBuildSpec: new AssumeRolePartialBuildSpec(codeArtifactAccessRole.roleArn)
          .partialBuildSpec,
      });
    }
    const pipeline = new CodePipeline(this, pipelineId, {
      pipelineName,
      dockerEnabledForSynth: true,
      synthCodeBuildDefaults: {
        buildEnvironment: {
          computeType: ComputeType.LARGE,
        },
      },
      synth: new ShellStep('Synth', {
        input: new CodeSource(this, props.branch.branchName, source).source,
        commands: defineSynthCommands('npm', baseDir, synthOuputDir),
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
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.stageName}`));

      pipeline.addStage(new componentType(this, stage.stageName, stage), {
        pre,
      });
    });

    pipeline.buildPipeline();

    for (const role of builderAssumeRoles) {
      role.grantAssumeRole(pipeline.pipeline.role);
    }

    // TODO: move to an aspect?
    if (notificationTopicArn && notificationTopicArn !== '') {
      new PipelineEventNotificationRule(pipeline, {
        notificationTopicArn,
      });
    }
  }
}
