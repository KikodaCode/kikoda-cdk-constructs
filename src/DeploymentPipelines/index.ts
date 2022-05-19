import { App, StackProps, Stage, StageProps } from 'aws-cdk-lib';
import { PolicyStatementProps } from 'aws-cdk-lib/aws-iam';
import { RepositoryConfig } from '../CodeSource';
import { IndividualPipelineStack } from './IndividualPipelineStack';

/**
 * TODO: Update documentation
 *
 * @export
 * @interface StageConfig
 * @typedef {StageConfig}
 * @template TConfig
 * @extends {StageProps}
 */
export interface StageConfig<TConfig> extends StageProps {
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {string}
   */
  readonly stageName: string;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {?boolean}
   */
  readonly manualApproval?: boolean;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {TConfig}
   */
  readonly config: TConfig;
}

/**
 * TODO: Update documentation
 *
 * @export
 * @interface IDeploymentBranch
 * @typedef {IDeploymentBranch}
 * @template TConfig
 */
export interface IDeploymentBranch<TConfig> {
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {string}
   */
  readonly branchName: string;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {string}
   */
  readonly staticPipelineIdentifier: string;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {StageConfig<TConfig>[]}
   */
  readonly stages: StageConfig<TConfig>[];
}

/**
 * TODO: Update documentation
 *
 * @export
 * @interface DeploymentPipelinesProps
 * @typedef {DeploymentPipelinesProps}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>
 * @extends {StackProps}
 */
export interface DeploymentPipelinesProps<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> extends StackProps {
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {string}
   */
  readonly component: string;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {?string}
   */
  readonly baseDir?: string;
  /**
   * TODO: Update documentation
   *
   * @readonly
   * @type {?string}
   */
  readonly synthOuputDir?: string;
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
   * A class that extends Stage. This class will be used to create the individual stages for each specified stage configuration.
   *
   * @readonly
   * @type {typeof Stage}
   */
  readonly stageType: typeof Stage;
  /**
   * An interface representing the configutation for each branch and its related stage.
   *
   * @readonly
   * @type {TBranch[]}
   */
  readonly deploymentBranches: TBranch[];
  /**
   * A SNS Topic arn that when specified will be used to send pipleine notifications.
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
  /**
   * Specifying a codeartifacts ARN here will enable asset phase of the pipeline to access that codeartifacts repository.
   * This includes adding approprate roles and leveraging an assumed role for the docker build so that the docker build can pull from codeartifacts.
   *
   * @readonly
   * @type {?string}
   */
  readonly codeArtifactRepositoryArn?: string;
  /**
   * Configuration for the source code repository. Currently supports GitHub and CodeArtifacts.
   * @readonly
   * @type {RepositoryConfig}
   */
  readonly repository: RepositoryConfig;
  /**
   * A list of policies that will be added to the build role.
   *
   * @readonly
   * @type {?PolicyStatementProps[]}
   */
  readonly additionalBuildRolePolicies?: PolicyStatementProps[];
}

/**
 * TODO: Update documentation
 *
 * @export
 * @class DeploymentPipelines
 * @typedef {DeploymentPipelines}
 * @template TConfig
 * @template TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>
 */
export class DeploymentPipelines<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> {
  /**
   * TODO: Creates an instance of DeploymentPipelines.
   *
   * @constructor
   * @param {App} app
   * @param {DeploymentPipelinesProps<TConfig, TBranch>} props
   */
  constructor(app: App, props: DeploymentPipelinesProps<TConfig, TBranch>) {
    props.deploymentBranches.forEach((branch: TBranch) => {
      const pipelineStackId = `${props.component}-${branch.staticPipelineIdentifier}-pipeline`;
      new IndividualPipelineStack(app, pipelineStackId, { ...props, branch });
    });
  }
}
