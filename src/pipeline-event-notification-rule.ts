import { DetailType, NotificationRule } from 'aws-cdk-lib/aws-codestarnotifications';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { CodePipeline } from 'aws-cdk-lib/pipelines';
import AllowCodeStarSnsPublishStatement from './codestar-sns-publish-access-statement';

/**
 * TODO: Update documentation
 *
 * @export
 * @interface PipelineEventNotificationRuleProps
 * @typedef {PipelineEventNotificationRuleProps}
 */
export interface PipelineEventNotificationRuleProps {
  /**
   * TODO: Update documentation
   *
   * @type {string}
   */
  notificationTopicArn: string;
  /**
   * TODO: Update documentation
   *
   * @type {?string[]}
   */
  events?: string[];
  /**
   * TODO: Update documentation
   *
   * @type {?DetailType}
   */
  detailType?: DetailType;
}

/**
 * TODO: Update documentation
 *
 * @export
 * @class PipelineEventNotificationRule
 * @typedef {PipelineEventNotificationRule}
 * @extends {NotificationRule}
 */
export class PipelineEventNotificationRule extends NotificationRule {
  /**
   * TODO: Creates an instance of PipelineEventNotificationRule.
   *
   * @constructor
   * @param {CodePipeline} scope
   * @param {string} notificationTopicArn
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
