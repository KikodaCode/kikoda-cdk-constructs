import { App, StackProps, Stage, StageProps } from 'aws-cdk-lib';
import { PolicyStatementProps } from 'aws-cdk-lib/aws-iam';
import { RepositoryConfig } from '../CodeSource';
import { IndividualPipelineStack } from './IndividualPipelineStack';

export interface StageConfig<TConfig> extends StageProps {
  readonly stageName: string;
  readonly manualApproval?: boolean;
  readonly config: TConfig;
}

export interface IDeploymentBranch<TConfig> {
  readonly branchName: string;
  readonly staticPipelineIdentifier: string;
  readonly stages: StageConfig<TConfig>[];
}

export interface DeploymentPipelinesProps<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> extends StackProps {
  readonly component: string;
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
  readonly stageType: typeof Stage;
  readonly deploymentBranches: TBranch[];
  readonly notificationTopicArn?: string;
  readonly builderAssumeRole?: string;
  readonly codeArtifactRepositoryArn?: string;
  readonly repository: RepositoryConfig;
  readonly additionalBuildRolePolicies?: PolicyStatementProps[];
}

export class DeploymentPipelines<
  TConfig,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> {
  constructor(app: App, props: DeploymentPipelinesProps<TConfig, TBranch>) {
    props.deploymentBranches.forEach((branch: TBranch) => {
      const pipelineStackId = `${props.component}-${branch.staticPipelineIdentifier}-pipeline`;
      new IndividualPipelineStack(app, pipelineStackId, { ...props, branch });
    });
  }
}
