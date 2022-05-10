import { DetailType, NotificationRule } from 'aws-cdk-lib/aws-codestarnotifications';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { CodePipeline } from 'aws-cdk-lib/pipelines';
import AllowCodeStarSnsPublishStatement from '../PolicyStatements/AllowCodeStarSnsPublishStatement';

export class PipelineEventNotificationRule extends NotificationRule {
  constructor(scope: CodePipeline, notificationTopicArn: string) {
    const targetTopic = Topic.fromTopicArn(scope, 'NotificationTopic', notificationTopicArn);

    super(scope, `Pipeline-Event-Notification`, {
      detailType: DetailType.BASIC,
      events: [
        'codepipeline-pipeline-pipeline-execution-failed',
        'codepipeline-pipeline-pipeline-execution-succeeded',
        'codepipeline-pipeline-manual-approval-needed',
      ],
      source: scope.pipeline,
      targets: [targetTopic],
    });

    targetTopic.addToResourcePolicy(new AllowCodeStarSnsPublishStatement(notificationTopicArn));
  }
}
