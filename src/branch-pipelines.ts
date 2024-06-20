import { App, StackProps, Stage } from 'aws-cdk-lib';
import { RepositoryConfig } from './code-source';
import { StageConfig, PipelineConfig, ComponentPipelineStack } from './component-pipeline-stack';

export { StageConfig, PipelineConfig } from './component-pipeline-stack';

/**
 * Configuration for the component to be deployed.
 */
export interface ComponentConfig {
  /**
   * The name of this component.
   */
  readonly componentName: string;
  /**
   * A class that extends Stage. This class will be used to create the individual component stages for each specified stage configuration.
   */
  readonly componentType: typeof Stage;
}

/**
 * Configuration for the specific deployment
 */
export interface IDeploymentBranch<TConfig> {
  /**
   * The name of the code branch that this deployment branch represents.
   */
  readonly branchName: string;
  /**
   * The name to be used by the pipeline stack, it is possible to configure
   * this separately from the branch name so that updating the branch name does
   * not require destroy/recreate.
   */
  readonly staticPipelineIdentifier?: string;
  /**
   * Configuration for the stages represented by this deployment branch.
   */
  readonly stages: StageConfig<TConfig>[];
}
/**
 * Configuration for the BranchPipelines construct.
 *
 * @extends {StackProps}
 */
export interface BranchPipelinesProps<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> extends StackProps {
  /**
   * An interface representing the configuration for each branch and its
   * related stage.
   */
  readonly deploymentBranches: TBranch[];
  /**
   * Configuration for the pipeline.
   */
  readonly pipelineConfig: PipelineConfig;
  /**
   * Configuration for the source code repository. Currently supports GitHub
   * and CodeArtifacts.
   */
  readonly repository: RepositoryConfig;
  /**
   * Configuration for the component to be deployed.
   */
  readonly component: ComponentConfig;
}

/**
 * Branch pipelines creates an individual component deployment pipeline stack
 * for each branch.
 */
export class BranchPipelines<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> {
  /**
   * Instance(s) of ComponentPipelineStacks created
   */
  public readonly componentPipelineStacks: ComponentPipelineStack<TConfig, TBranch>[] = [];

  /**
   * Creates an instance of DeploymentPipelines.
   *
   * @constructor
   * @param {App} app
   * @param {BranchPipelinesProps<TConfig, TBranch>} props
   */
  constructor(app: App, props: BranchPipelinesProps<TConfig, TBranch>) {
    props.deploymentBranches.forEach((branch: TBranch) => {
      const pipelineStackId = `${props.component.componentName}-${
        branch.staticPipelineIdentifier || branch.branchName
      }-pipeline`;
      this.componentPipelineStacks.push(
        new ComponentPipelineStack(app, pipelineStackId, {
          branch,
          pipelineConfig: props.pipelineConfig,
          repository: props.repository,
          component: props.component,
          env: props.env,
        }),
      );
    });
  }
}
