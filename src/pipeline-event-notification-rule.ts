import { DetailType, NotificationRule } from 'aws-cdk-lib/aws-codestarnotifications';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { CodePipeline } from 'aws-cdk-lib/pipelines';
import AllowCodeStarSnsPublishStatement from './codestar-sns-publish-access-statement';

/**
 * Properties for a new pipeline event notification rule.
 */
export interface PipelineEventNotificationRuleProps {
  /**
   * Arn of the notification topic to send pipeline event notifications to.
   */
  readonly notificationTopicArn: string;
  /**
   * List of event types associated with this notification rule.
   *
   * @default [
   * 'codepipeline-pipeline-pipeline-execution-failed',
   * 'codepipeline-pipeline-pipeline-execution-succeeded',
   * 'codepipeline-pipeline-manual-approval-needed'
   * ]
   */
  readonly events?: string[];
  /**
   * The level of detail to include in the notifications for this resource.
   *
   * @default DetailType.BASIC
   */
  readonly detailType?: DetailType;
}

/**
 * A new pipeline event notification rule.
 */
export class PipelineEventNotificationRule extends NotificationRule {
  /**
   * Create an instance of PipelineEventNotificationRule.
   *
   * @constructor
   * @param scope
   * @param props
   */
  constructor(scope: CodePipeline, props: PipelineEventNotificationRuleProps) {
    const targetTopic = Topic.fromTopicArn(scope, 'NotificationTopic', props.notificationTopicArn);

    const {
      events = [
        'codepipeline-pipeline-pipeline-execution-failed',
        'codepipeline-pipeline-pipeline-execution-succeeded',
        'codepipeline-pipeline-manual-approval-needed',
      ],
      detailType = DetailType.BASIC,
      notificationTopicArn,
    } = props;

    const ruleProperties = {
      events,
      detailType,
      source: scope.pipeline,
      targets: [targetTopic],
    };

    super(scope, `Pipeline-Event-Notification`, ruleProperties);

    targetTopic.addToResourcePolicy(new AllowCodeStarSnsPublishStatement(notificationTopicArn));
  }
}
