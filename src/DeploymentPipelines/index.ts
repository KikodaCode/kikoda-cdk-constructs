/**
 * @module DeploymentPipelines
 */
import { App, StackProps, StageProps } from 'aws-cdk-lib';
import { PolicyStatementProps } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { RepositoryConfig } from '../CodeSource';
import { ConfiguredStage, ConfiguredStageProps } from '../ConfiguredStage';
import { IndividualPipelineStack } from './IndividualPipelineStack';

/**
 * The component to be deployed with {@link DeploymentPipelines}.
 */
export interface Component {
  name: string;
  stage: typeof ConfiguredStage;
}

export interface IStage<TConfig> extends StageProps {
  stageName: string;
  manualApproval?: boolean;
  config: TConfig;
}

export interface IDeploymentBranch<TConfig> {
  branchName: string;
  staticPipelineIdentifier: string;
  stages: IStage<TConfig>[];
}

/**
 * DeploymentPipelinesProps
 */
export interface DeploymentPipelinesProps<
  TConfig,
  TStage extends ConfiguredStage<TConfig>,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> extends StackProps {
  component: string;
  baseDir?: string;
  synthOuputDir?: string;

  /**
   * Add a step to pull down and remove asset zips from the cloud assembly output from the Synth
   * step. This is usefull when you have a lot of resources and are hitting the CFN limit for input
   * artifact size.
   *
   * @default true
   */
  pruneCloudAssembly?: boolean;
  getStage: (scope: Construct, id: string, props: ConfiguredStageProps<TConfig>) => TStage;
  deploymentBranches: TBranch[];
  notificationTopicArn?: string;
  builderAssumeRole?: string;
  codeArtifactRepositoryArn?: string;
  repository: RepositoryConfig;
  additionalBuildRolePolicies?: PolicyStatementProps[];
}

export class DeploymentPipelines<
  TConfig,
  TStage extends ConfiguredStage<TConfig>,
  TBranch extends IDeploymentBranch<TConfig> = IDeploymentBranch<TConfig>,
> {
  constructor(app: App, props: DeploymentPipelinesProps<TConfig, TStage, TBranch>) {
    props.deploymentBranches.forEach((branch: TBranch) => {
      const pipelineStackId = `${props.component}-${branch.staticPipelineIdentifier}-pipeline`;

      new IndividualPipelineStack(app, pipelineStackId, { ...props, branch });
    });
  }
}
