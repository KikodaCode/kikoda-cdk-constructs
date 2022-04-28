/**
 * @module DeploymentPipelines
 */
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { ComputeType } from 'aws-cdk-lib/aws-codebuild';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { DetailType, NotificationRule } from 'aws-cdk-lib/aws-codestarnotifications';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Topic } from 'aws-cdk-lib/aws-sns';
import {
  AddStageOpts,
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { ConfiguredStage, StageConfig } from '../ConfiguredStage';

/**
 * The component to be deployed with {@link DeploymentPipelines}.
 */
export interface Component {
  name: string;
  stage: typeof ConfiguredStage;
}


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
  readonly config: {
    stageConfig: StageConfig<T>;
  };
}

export interface DeploymentBranch<T> {
  /**
   * The source branch name to deploy from
   */
  name: string;
  /**
   * This is a unique string used to differentiate pipleine constructs
   * in CDK. This is important as it's used to scope all environments
   * and the resources therein and their associate PhysicalIds in Cloudformation.
   * **!!! Changing this can result in unwanted updates/replacement to stack resources !!!**
   *
   * Typically you want to set this to the type (See Git Flow) of branch being deployed
   */
  staticPipelineIdentifier: string;
  stages: EnvironmentStage<T>[];
}


/**
 * DeploymentPipelinesProps
 */
export interface DeploymentPipelinesProps<T> extends StackProps, CodeRepositoryConfig {
  component: string;
  baseDir: string;
  synthOuputDir: string;

  /**
   * Add a step to pull down and remove asset zips from the cloud assembly output from the Synth
   * step. This is usefull when you have a lot of resources and are hitting the CFN limit for input
   * artifact size.
   *
   * @default true
   */
  pruneCloudAssembly?: boolean;
  Stage: typeof ConfiguredStage;
  deploymentBranches: DeploymentBranch<T>[];
  notificationTopicArn?: string;
}

interface CodeCommitSourceConfig {
  codeCommitArn: string;
}

interface GitHubSourceConfig {
  codeStarConnectionArn: string;
  owner: string;
  triggerOnPush: boolean;
}

/**
 * Configuration properties for the code source repository. Currently supports CodeCommit and GitHub Sources.
 * GitHug source requrires a preexisting CodeStarConnection.
 */
interface CodeRepositoryConfig {
  codeRepository: GitHubSourceConfig | CodeCommitSourceConfig;
}

/**
 * Individual Pipelines
 */
interface IndividualPipelineStackProps<T> extends DeploymentPipelinesProps<T>, CodeRepositoryConfig {
  branch: DeploymentBranch<T>;
  notificationTopicArn?: string;
}

/**
 * An individual pipeline
 * @class
 */
class IndividualPipelineStack<T> extends Stack {
  constructor(scope: Construct, id: string, props: IndividualPipelineStackProps<T>) {
    super(scope, id, props);

    const {
      component: stackName,
      baseDir,
      synthOuputDir,
      pruneCloudAssembly,
      Stage,
      branch,
    } = props;

    const prune = pruneCloudAssembly === undefined ? true : pruneCloudAssembly;

    // Static Pipeline id
    const pipelineId = `${stackName}-${branch.staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${stackName}-${branch.name.replace('/', '-')}`;

    let source;
    let codeCommitSource = props.codeRepository as CodeCommitSourceConfig;
    if (codeCommitSource.codeCommitArn) {
      source = CodePipelineSource.codeCommit(
        Repository.fromRepositoryArn(this, 'Repository', codeCommitSource.codeCommitArn),
        branch.name,
      );
    }
    let githubSource = props.codeRepository as GitHubSourceConfig;
    if (githubSource.owner) {
      source = CodePipelineSource.connection(githubSource.owner, branch.name, {
        connectionArn: githubSource.codeStarConnectionArn,
        triggerOnPush: githubSource.triggerOnPush,
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
        input: source,
        commands: [`cd ${baseDir}`, `npm run cdk synth -o ${synthOuputDir}`],
        primaryOutputDirectory: `${baseDir}/${synthOuputDir}`,
      }),
    });

    branch.stages.forEach(stage => {
      const pre: AddStageOpts['pre'] = [];

      // for grep'ing, truncate to 24 chars; if not already ends in dash, then add one
      let bucketPrefix = id.substring(0, 24);
      bucketPrefix = bucketPrefix.slice(-1) === '-' ? bucketPrefix : `${bucketPrefix}-`;

      // optional pruning step before CFN deploy to get around 256mb input artifact limit
      if (prune) {
        pre.push(
          new CodeBuildStep('TrimCloudAssembly', {
            rolePolicyStatements: [
              new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['s3:ListAllMyBuckets', 's3:PutObject'],
                resources: ['*'],
              }),
            ],
            commands: [
              `CLOUDASM_PATH=$(aws s3api list-buckets | grep '${bucketPrefix}' | awk '{print $2}' | sed 's/"//g' | sed 's/,//g')/${pipelineName.substring(
                0,
                20,
              )}/Synth_Outp`,
              "LATEST=$(aws s3 ls s3://$CLOUDASM_PATH/ | sort | tail -n 1 | awk '{print $4}')",
              'aws s3 cp s3://$CLOUDASM_PATH/$LATEST .',
              'unzip $LATEST -d tmp',
              'cd tmp',
              'rm -rf asset.*',
              'zip -r -A $LATEST *',
              'aws s3 cp $LATEST s3://$CLOUDASM_PATH/',
            ],
          }),
        );
      }

      // add manual approval step if applicable
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.name}`));

      pipeline.addStage(
        new Stage<typeof stage.config.stageConfig.stackConfigs>(this, stage.name, {
          config: stage.config.stageConfig,
          env: stage.env,
        }),
        { pre },
      );
    });

    pipeline.buildPipeline();
    if (props.notificationTopicArn && props.notificationTopicArn !== '') {
      const targetTopic = Topic.fromTopicArn(this, 'NotificationTopic', props.notificationTopicArn);

      new NotificationRule(this, `${pipelineName}-Notification`, {
        detailType: DetailType.BASIC,
        events: [
          'codepipeline-pipeline-pipeline-execution-failed',
          'codepipeline-pipeline-pipeline-execution-succeeded',
          'codepipeline-pipeline-manual-approval-needed',
        ],
        source: pipeline.pipeline,
        targets: [targetTopic],
      });

      targetTopic.addToResourcePolicy(
        new PolicyStatement({
          sid: 'AWSCodeStarNotifications_publish',
          effect: Effect.ALLOW,
          principals: [new ServicePrincipal('codestar-notifications.amazonaws.com')],
          actions: ['SNS:Publish'],
          resources: [props.notificationTopicArn],
          conditions: {
            StringEquals: {
              'aws:SourceAccount': process.env.CDK_DEFAULT_ACCOUNT,
            },
          },
        }),
      );
    }
  }
}

/**
 * One pipleline will be created for each stage. (eg. dev test stage prod).
 * The generic type is used to dynamically type the configuration.
 * @deprecated -- This is a WIP construct please use as a reference for now.
 */
export class DeploymentPipelines<T> {
  constructor(app: App, props: DeploymentPipelinesProps<T>) {
    props.deploymentBranches.forEach((branch) => {
      const pipelineStackId = `${props.component}-${branch.staticPipelineIdentifier}-pipeline`;

      new IndividualPipelineStack(app, pipelineStackId, { ...props, branch });
    });
  }
}
