import { App, Environment } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RepositoryConfig } from '../CodeSource';
import { ConfiguredStage } from '../ConfiguredStage';
import { IndividualPipelineStack } from '../IndividualPipelineStack';

/**
 * The component to be deployed with {@link DeploymentPipelines}.
 */
export interface Component {
  readonly name: string;
  readonly stage: typeof ConfiguredStage;
}

export interface DeploymentStage<T> {
  /** The name of the deployment stage eg. 'dev', 'test, 'prod' */
  readonly name: string;
  /** Manually approve this stage's deployment before continuing the pipeline? */
  readonly manualApproval?: boolean;
  /** Optionally provide the deployment environment for this stage. */
  readonly env?: Environment;

  /**
   * Configuration for the environment.
   */
  readonly config: T;
}

export interface DeploymentBranch<T> {
  /**
   * The source branch name to deploy from
   */
  readonly name: string;
  /**
   * This is a unique string used to differentiate pipleine constructs
   * in CDK. This is important as it's used to scope all environments
   * and the resources therein and their associate PhysicalIds in Cloudformation.
   * **!!! Changing this can result in unwanted updates/replacement to stack resources !!!**
   *
   * Typically you want to set this to the type (See Git Flow) of branch being deployed
   */
  readonly staticPipelineIdentifier: string;
  readonly stages: DeploymentStage<T>[];
}

export interface SourceRepositoryConfig {
  readonly repository: RepositoryConfig;
  readonly baseDir?: string;
  readonly synthOuputDir?: string;
  /**
   * Add a step to pull down and remove asset zips from the cloud assembly output from the Synth
   * step. This is usefull when you have a lot of resources and are hitting the CFN limit for input
   * artifact size.
   *
   * @default true
   */
  readonly pruneCloudAssembly?: boolean;
}

/**
 * DeploymentPipelinesProps
 *
 * @export
 * @interface DeploymentPipelinesProps
 * @typedef {DeploymentPipelinesProps}
 */
export interface DeploymentPipelinesProps<T> {
  /**
   * Description placeholder
   *
   * @readonly
   * @type {Component}
   */
  readonly component: Component;
  readonly deploymentBranches: DeploymentBranch<T>[];
  readonly repoConfig: SourceRepositoryConfig;
}

/**
 * One pipleline will be created for each stage. (eg. dev test stage prod).
 * The generic type is used to dynamically type the configuration.
 *
 * @export
 * @class DeploymentPipelines
 * @typedef {DeploymentPipelines}
 * @extends {Construct}
 */
export class DeploymentPipelines<T> extends Construct {
  /**
   * The source code repository to deploy from.
   * @author Kikoda
   *
   * @readonly
   * @type {SourceRepositoryConfig}
   */
  readonly config: SourceRepositoryConfig;

  /**
   * The component to be deployed with {@link DeploymentPipelines}.
   * @author Kikoda
   *
   * @readonly
   * @type {Component}
   */
  readonly component: Component;

  /**
   * Deployment Pipelines.
   *
   *
   * Example:
   * <code>
   *  new DeploymentPipelines(this, 'DeploymentPipelines', {});
   * </code>
   * @author Kikoda
   * @constructor
   * @param {App} app - the parent app.
   * @param {DeploymentPipelinesProps} props - The configuration for the deployment pipelines.
   */
  constructor(app: App, props: DeploymentPipelinesProps<T>) {
    super(app, 'DeploymentPipelines');
    this.component = props.component;
    this.config = props.repoConfig;

    props.deploymentBranches.forEach(branch => {
      const pipelineStackId = `${props.component.name}-${branch.staticPipelineIdentifier}-pipeline`;

      new IndividualPipelineStack(this, pipelineStackId, { branch });
    });
  }
}
