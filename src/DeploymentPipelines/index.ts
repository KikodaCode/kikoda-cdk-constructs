import { App, StackProps, Stage } from 'aws-cdk-lib';
import { RepositoryConfig } from '../CodeSource';
import { IndividualPipelineStack, PipelineConfig, StageConfig } from './IndividualPipelineStack';

export { StageConfig, PipelineConfig } from './IndividualPipelineStack';

/**
 * Configuration for the component to be deployed.
 *
 * @export
 * @interface ComponentConfig
 * @typedef {ComponentConfig}
 */
export interface ComponentConfig {
  /**
   * The name of this component.
   *
   * @readonly
   * @type {string}
   */
  readonly componentName: string;
  /**
   * A class that extends Stage. This class will be used to create the individual component stages for each specified stage configuration.
   *
   * @readonly
   * @type {typeof Stage}
   */
  readonly componentType: typeof Stage;
}

/**
 * Configuration for the specific deployment
 *
 * @export
 * @interface IDeploymentBranch
 * @typedef {IDeploymentBranch}
 * @template TConfig
 */
export interface IDeploymentBranch<TConfig> {
  /**
   * The name of the code branch that this deployment branch represents.
   *
   * @readonly
   * @type {string}
   */
  readonly branchName: string;
  /**
   * The name to be used by the pipeline stack, it is possible to configure this sperately from the branch name so that updating the branch name does not require destroy/recreate.
   *
   * @readonly
   * @type {string}
   */
  readonly staticPipelineIdentifier?: string;
  /**
   * Configuration for the stages represented by this deployment branch.
   *
   * @readonly
   * @type {StageConfig<TConfig>[]}
   */
  readonly stages: StageConfig<TConfig>[];
}
/**
 * Configuration for the DeploymentPipelines construct.
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
   * An interface representing the configutation for each branch and its related stage.
   *
   * @readonly
   * @type {TBranch[]}
   */
  readonly deploymentBranches: TBranch[];
  readonly pipelineConfig: PipelineConfig;
  /**
   * Configuration for the source code repository. Currently supports GitHub and CodeArtifacts.
   * @readonly
   * @type {RepositoryConfig}
   */
  readonly repository: RepositoryConfig;
  readonly component: ComponentConfig;
}

/**
 * Deployment pipelines creates an individual deployment pipeline stack for each branch.
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
   * Creates an instance of DeploymentPipelines.
   *
   * @constructor
   * @param {App} app
   * @param {DeploymentPipelinesProps<TConfig, TBranch>} props
   */
  constructor(app: App, props: DeploymentPipelinesProps<TConfig, TBranch>) {
    props.deploymentBranches.forEach((branch: TBranch) => {
      const pipelineStackId = `${props.component.componentName}-${branch.staticPipelineIdentifier}-pipeline`;
      new IndividualPipelineStack(app, pipelineStackId, {
        branch,
        pipelineConfig: props.pipelineConfig,
        repository: props.repository,
        component: props.component,
        env: props.env,
      });
    });
  }
}
