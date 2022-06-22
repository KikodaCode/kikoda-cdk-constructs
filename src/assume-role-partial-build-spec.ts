import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';

/**
 * The partial buildspec that includes commands to assume a role and pass credentials to a docker build call.
 * This is designed to be used with CodePipelineProps.assetPublishingCodeBuildDefaults.partialBuildSpec.
 *
 * @export
 * @class AssumeRolePartialBuildSpec
 * @typedef {AssumeRolePartialBuildSpec}
 */
export class AssumeRolePartialBuildSpec {
  /**
   * The partial buildspec. This is designed to be used with CodePipelineProps.assetPublishingCodeBuildDefaults.partialBuildSpec.
   *
   * @public
   * @type {BuildSpec}
   */
  public partialBuildSpec: BuildSpec;
  /**
   * Creates an instance of AssumeRolePartialBuildSpec.
   *
   * @constructor
   * @param {string} roleArn
   */
  constructor(roleArn: string) {
    this.partialBuildSpec = BuildSpec.fromObject({
      phases: {
        install: {
          commands: [
            `ASSUME_ROLE_ARN=${roleArn}`,
            'TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)',
            'export TEMP_ROLE',
            'export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.AccessKeyId\')', // TODO: JQ dependency
            'export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SecretAccessKey\')',
            'export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SessionToken\')',
          ],
        },
      },
    });
  }
}
