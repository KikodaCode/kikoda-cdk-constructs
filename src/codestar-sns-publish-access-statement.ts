import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

/**
 * Creates a policy statement that allows codestar-notifications principle the SNS:Publish action on the specified SNS Topic arn.
 *
 * @export
 * @class CodeStarSnsPublishAccessStatement
 * @typedef {CodeStarSnsPublishAccessStatement}
 * @extends {PolicyStatement}
 */
export default class CodeStarSnsPublishAccessStatement extends PolicyStatement {
  /**
   * Creates a policy statement that allows codestar-notifications principle the SNS:Publish action on the specified SNS Topic arn.
   *
   * @constructor
   * @param {string} notificationTopicArn
   */
  constructor(notificationTopicArn: string) {
    super({
      sid: 'AWSCodeStarNotifications_publish',
      effect: Effect.ALLOW,
      principals: [new ServicePrincipal('codestar-notifications.amazonaws.com')],
      actions: ['SNS:Publish'],
      resources: [notificationTopicArn],
      conditions: {
        StringEquals: {
          'aws:SourceAccount': process.env.CDK_DEFAULT_ACCOUNT,
        },
      },
    });
  }
}
