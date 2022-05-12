import { Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, ComputeType } from 'aws-cdk-lib/aws-codebuild';
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CodePipeline, ShellStep, AddStageOpts, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { CodeSource } from '../CodeSource';
import { DeploymentBranch, DeploymentPipelines } from '../DeploymentPipelines';
import { TrimCloudAssemblyStep } from '../TrimCloudAssemblyStep';

/**
 * Individual Pipelines
 */
export interface IndividualPipelineStackProps<T> extends StackProps {
  readonly branch: DeploymentBranch<T>;
}

/**
 * An individual pipeline stack.
 * @author Kikoda
 *
 * @export
 * @class IndividualPipelineStack
 * @typedef {IndividualPipelineStack}
 * @template T
 * @extends {Stack}
 */
export class IndividualPipelineStack<T> extends Stack {
  constructor(scope: DeploymentPipelines<T>, id: string, props: IndividualPipelineStackProps<T>) {
    super(scope, id, props);

    const { baseDir = '.', synthOuputDir = 'out', pruneCloudAssembly = true } = scope.config;
    const { branch } = props;

    // Static Pipeline id
    const pipelineId = `${scope.component.name}-${branch.staticPipelineIdentifier}`;
    const codeArtifactAccessRole = new Role(this, 'CodeArtifactsAccessRole', {
      assumedBy: new ServicePrincipal('codepipeline.amazonaws.com'),
    });
    codeArtifactAccessRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['codeartifacts:*'], //TODO: probably dont allow absolutely everything....
      }),
    );
    // Branch-based pipeline name
    const pipelineName = `${scope.component.name}-${branch.name.replace('/', '-')}`;
    const pipeline = new CodePipeline(this, pipelineId, {
      pipelineName,
      dockerEnabledForSynth: true,
      synthCodeBuildDefaults: {
        buildEnvironment: {
          computeType: ComputeType.LARGE,
        },
      },
      synth: new ShellStep('Synth', {
        input: new CodeSource(this, branch.name, scope.config.repository).source,
        commands: [`cd ${baseDir}`, `npm run cdk synth -o ${synthOuputDir}`],
        primaryOutputDirectory: `${baseDir}/${synthOuputDir}`,
      }),
      assetPublishingCodeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              commands: [
                `ASSUME_ROLE_ARN=${codeArtifactAccessRole.roleArn}`,
                'TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)',
                'export TEMP_ROLE',
                'export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.AccessKeyId\')',
                'export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SecretAccessKey\')',
                'export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SessionToken\')',
              ],
            },
            preBuild: {
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
      },
    });
    pipeline.pipeline.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['sts:assumerole'],
      }),
    );

    branch.stages.forEach(stage => {
      const pre: AddStageOpts['pre'] = [];

      // optional pruning step before CFN deploy to get around 256mb input artifact limit
      if (pruneCloudAssembly) {
        pre.push(new TrimCloudAssemblyStep(id, pipelineName));
      }

      // add manual approval step if applicable
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.name}`));

      const stageType = scope.component.stage;
      pipeline.addStage(
        new stageType<T>(this, stage.name, {
          config: stage.config,
          env: stage.env,
        }),
        { pre },
      );
    });

    pipeline.buildPipeline();

    // TODO: Move to custom Aspect
    // if (props.notificationTopicArn && props.notificationTopicArn !== '') {
    //   new PipelineEventNotificationRule(pipeline, props.notificationTopicArn);
    // }
  }
}
