import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import { ComputeType } from 'aws-cdk-lib/aws-codebuild';
import { CodePipeline, ShellStep, AddStageOpts, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CodeSource, RepositoryConfig } from '../CodeSource';
import { ConfiguredStage, StageConfig } from '../ConfiguredStage';
import { PipelineEventNotificationRule } from '../PipelineEventNotificationRule';
import { TrimCloudAssemblyStep } from '../TrimCloudAssemblyStep';

export interface EnvironmentStage<T> {
  /** The name of the deployment stage eg. 'dev', 'test, 'prod' */
  readonly name: string;
  /** Manually approve this stage's deployment before continuing the pipeline? */
  readonly manualApproval?: boolean;
  /** Optionally provide the deployment environment for this stage. */
  readonly env?: Environment;

  /**
   * Configuration for the environment.
   */
  readonly config: StageConfig<T>;
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
  readonly stages: EnvironmentStage<T>[];
}

/**
 * Individual Pipelines
 */
export interface IndividualPipelineStackProps<T> extends StackProps {
  readonly component: string;
  readonly baseDir: string;
  readonly synthOuputDir: string;
  /**
   * Add a step to pull down and remove asset zips from the cloud assembly output from the Synth
   * step. This is usefull when you have a lot of resources and are hitting the CFN limit for input
   * artifact size.
   *
   * @default true
   */
  readonly pruneCloudAssembly?: boolean;
  readonly stageType: typeof ConfiguredStage;
  readonly deploymentBranches: DeploymentBranch<T>[];
  readonly notificationTopicArn?: string;
  readonly branch: DeploymentBranch<T>;
  readonly codeSource: RepositoryConfig;
}

/**
 * An individual pipeline
 * @class
 */
export class IndividualPipelineStack<T> extends Stack {
  constructor(scope: Construct, id: string, props: IndividualPipelineStackProps<T>) {
    super(scope, id, props);

    const {
      component: stackName,
      baseDir,
      synthOuputDir,
      pruneCloudAssembly = true,
      stageType,
      branch,
    } = props;

    // Static Pipeline id
    const pipelineId = `${stackName}-${branch.staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${stackName}-${branch.name.replace('/', '-')}`;
    const pipeline = new CodePipeline(this, pipelineId, {
      pipelineName,
      dockerEnabledForSynth: true,
      synthCodeBuildDefaults: {
        buildEnvironment: {
          computeType: ComputeType.LARGE,
        },
      },
      synth: new ShellStep('Synth', {
        input: new CodeSource(this, branch.name, props.codeSource).source,
        commands: [`cd ${baseDir}`, `npm run cdk synth -o ${synthOuputDir}`],
        primaryOutputDirectory: `${baseDir}/${synthOuputDir}`,
      }),
    });

    branch.stages.forEach(stage => {
      const pre: AddStageOpts['pre'] = [];

      // optional pruning step before CFN deploy to get around 256mb input artifact limit
      if (pruneCloudAssembly) {
        pre.push(new TrimCloudAssemblyStep(id, pipelineName));
      }

      // add manual approval step if applicable
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.name}`));

      pipeline.addStage(
        new stageType<typeof stage.config.stackConfigs>(this, stage.name, {
          config: stage.config,
          env: stage.env,
        }),
        { pre },
      );
    });

    pipeline.buildPipeline();

    if (props.notificationTopicArn && props.notificationTopicArn !== '') {
      new PipelineEventNotificationRule(pipeline, props.notificationTopicArn);
    }
  }
}
