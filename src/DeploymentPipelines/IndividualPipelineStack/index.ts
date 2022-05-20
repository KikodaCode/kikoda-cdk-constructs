import { Stack } from 'aws-cdk-lib';
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
import { IDeploymentBranch } from '..';
import { CodeSource, DeploymentPipelinesProps } from '../..';
import { PipelineEventNotificationRule } from '../PipelineEventNotificationRule';
import { TrimCloudAssemblyStep } from './TrimCloudAssemblyStep';

/**
 * TODO: Update documentation
 * @author Kikoda
 *
 * @param {?string} [role]
 * @returns {{}}
 */
const createAssumeRoleCommands = (role?: string) =>
  role
    ? [
        `ASSUME_ROLE_ARN="arn:aws:iam::$account_id:role/${role}`,
        'TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)',
        'export TEMP_ROLE',
        'export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.AccessKeyId\')',
        'export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SecretAccessKey\')',
        'export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SessionToken\')',
      ]
    : [];

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
  extends DeploymentPipelinesProps<TConfig, TBranch> {
  /**
   * The deployment branch that this stack represents.
   * @author Kikoda
   *
   * @type {TBranch}
   */
  branch: TBranch;
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
   * @author Kikoda
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {IndividualPipelineStackProps<TConfig, TBranch>} props
   */
  constructor(scope: Construct, id: string, props: IndividualPipelineStackProps<TConfig, TBranch>) {
    super(scope, id, props);

    const {
      component: stackName,
      baseDir,
      synthOuputDir,
      pruneCloudAssembly = true,
      stageType,
      branch,
    } = props;

    const prune = pruneCloudAssembly;

    // Static Pipeline id
    const pipelineId = `${stackName}-${branch.staticPipelineIdentifier}`;

    // Branch-based pipeline name
    const pipelineName = `${stackName}-${branch.branchName.replace('/', '-')}`;

    const additonalPolicyStatements: PolicyStatementProps[] = [];
    let assetPublishingCodeBuildDefaults: CodeBuildOptions = {};

    if (props.codeArtifactRepositoryArn) {
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
          actions: ['codeartifacts:*'], //TODO: probably dont allow absolutely everything....
          resources: [props.codeArtifactRepositoryArn],
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
        input: new CodeSource(this, branch.branchName, props.repository).source,
        commands: this.defineSynthCommands(
          synthOuputDir,
          baseDir,
          props.builderAssumeRole,
          true,
          'npm',
        ),
        primaryOutputDirectory: `${baseDir}/${synthOuputDir}`,
      }),
      codeBuildDefaults: {
        rolePolicy: props.additionalBuildRolePolicies?.map(x => new PolicyStatement(x)),
      },
      assetPublishingCodeBuildDefaults,
    });

    // Add defined stages
    branch.stages.forEach(stage => {
      const pre: AddStageOpts['pre'] = [];

      // optional pruning step before CFN deploy to get around 256mb input artifact limit
      if (prune) pre.push(new TrimCloudAssemblyStep(id, pipelineName));

      // add manual approval step if applicable
      if (stage.manualApproval) pre.push(new ManualApprovalStep(`Promote To ${stage.stageName}`));

      pipeline.addStage(new stageType(this, stage.stageName, stage), {
        pre,
      });
    });

    pipeline.buildPipeline();

    for (const statement of additonalPolicyStatements) {
      pipeline.pipeline.addToRolePolicy(new PolicyStatement(statement));
    }

    // TODO: move to an aspect?
    if (props.notificationTopicArn && props.notificationTopicArn !== '') {
      new PipelineEventNotificationRule(pipeline, {
        notificationTopicArn: props.notificationTopicArn,
      });
    }
  }

  /**
   * Creates synth commands based on input parameters.
   *
   * @private
   * @param {?string} [synthOutputDir]
   * @param {?string} [baseDir]
   * @param {?string} [assumeRole]
   * @param {boolean} [installRequired=true]
   * @param {string} [pkgManager='yarn']
   * @returns {{}}
   */
  private defineSynthCommands(
    synthOutputDir?: string,
    baseDir?: string,
    assumeRole?: string,
    installRequired: boolean = true,
    pkgManager: string = 'yarn',
  ) {
    let commands: string[] = [];
    if (assumeRole) {
      commands = [...commands, ...createAssumeRoleCommands(assumeRole)];
    }
    if (baseDir) {
      commands.push(`cd ${baseDir}`);
    }
    if (installRequired) {
      commands.push(`${pkgManager} install`);
    }
    let synthCommand = `${pkgManager}${pkgManager === 'npm' ? ' run' : ''} cdk synth`;
    if (synthOutputDir) {
      if (synthOutputDir === '') {
        synthCommand += `-o ${synthOutputDir}`;
      }
    }
    commands.push(synthCommand);
    return commands;
  }
}
