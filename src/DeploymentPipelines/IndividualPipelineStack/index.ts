import { Stack, StackProps, StageProps } from 'aws-cdk-lib';
import { BuildSpec, ComputeType } from 'aws-cdk-lib/aws-codebuild';
import {
  Effect,
  PolicyStatement,
  PolicyStatementProps,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import {
  ShellStep,
  AddStageOpts,
  CodePipeline,
  ManualApprovalStep,
  CodeBuildOptions,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { merge } from 'lodash';
import { ComponentConfig, IDeploymentBranch } from '../';
import { CodeSource, RepositoryConfig } from '../../CodeSource';
import { defineSynthCommands } from '../../utils/cliCommandUtils';
import { PipelineEventNotificationRule } from '../PipelineEventNotificationRule';
import { TrimCloudAssemblyStep } from './TrimCloudAssemblyStep';
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
   * Specifying a codeartifacts ARN here will enable asset phase of the pipeline to access that codeartifacts repository.
   * This includes adding approprate roles and leveraging an assumed role for the docker build so that the docker build can pull from codeartifacts.
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
 * The properties for the IndividualPipelineStack construct.
 *
 * @export
 * @interface IndividualPipelineStackProps
 * @typedef {IndividualPipelineStackProps}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig>
 * @extends {DeploymentPipelinesProps<TConfig, TBranch>}
 */
export interface IndividualPipelineStackProps<TConfig, TBranch extends IDeploymentBranch<TConfig>>
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
 * An individual deployment pipeline stack.
 *
 * @export
 * @class IndividualPipelineStack
 * @typedef {IndividualPipelineStack}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig>
 * @extends {Stack}
 */
export class IndividualPipelineStack<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig>,
> extends Stack {
  /**
   * Creates an instance of IndividualPipelineStack.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {IndividualPipelineStackProps<TConfig, TBranch>} props
   */
  constructor(scope: Construct, id: string, props: IndividualPipelineStackProps<TConfig, TBranch>) {
    super(scope, id, props);
    const { staticPipelineIdentifier = props.branch.branchName, branchName } = props.branch;
    const { componentName, componentType } = props.component;
    const {
      pruneCloudAssembly = true,
      codeArtifactRepositoryArn,
      builderAssumeRole,
      notificationTopicArn,
    } = props.pipelineConfig;

    const { source, synthOuputDir = 'out', baseDir = '.' } = props.repository;

    // Static Pipeline id
    const pipelineId = `${componentName}-${staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${componentName}-${branchName.replace('/', '-')}`;

    const additonalPolicyStatements: PolicyStatementProps[] = [];
    let assetPublishingCodeBuildDefaults: CodeBuildOptions = {};

    if (codeArtifactRepositoryArn) {
      additonalPolicyStatements.push({
        effect: Effect.ALLOW,
        actions: ['sts:assumerole'],
      });
      const codeArtifactAccessRole = new Role(this, 'CodeArtifactsAccessRole', {
        assumedBy: new ServicePrincipal('codepipeline.amazonaws.com'),
      });
      codeArtifactAccessRole.addToPolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['codeartifacts:GetAuthorizationToken', 'sts:GetServiceBearerToken'],
          resources: [codeArtifactRepositoryArn],
        }),
      );
      assetPublishingCodeBuildDefaults = merge(assetPublishingCodeBuildDefaults, {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              commands: [
                `ASSUME_ROLE_ARN=${codeArtifactAccessRole.roleArn}`,
                'TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)',
                'export TEMP_ROLE',
                'export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.AccessKeyId\')', // TODO: JQ dependency
                'export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SecretAccessKey\')',
                'export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SessionToken\')',
              ],
            },
            pre_build: {
              commands: [
                "echo Build started on 'date'",
                'echo Building the Docker image...',
                'docker build --build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --build-arg AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN',
              ],
            },
          },
        }),
        buildEnvironment: {
          environmentVariables: {},
        },
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
        commands: defineSynthCommands('npm', baseDir, synthOuputDir, builderAssumeRole),
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

    for (const statement of additonalPolicyStatements) {
      pipeline.pipeline.addToRolePolicy(
        new PolicyStatement({ ...statement, resources: [pipeline.pipeline.role.roleArn] }),
      );
    }

    // TODO: move to an aspect?
    if (notificationTopicArn && notificationTopicArn !== '') {
      new PipelineEventNotificationRule(pipeline, {
        notificationTopicArn,
      });
    }
  }
}
