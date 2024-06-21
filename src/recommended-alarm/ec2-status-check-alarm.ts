import { Duration } from 'aws-cdk-lib';
import { ComparisonOperator, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { IInstance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an EC2 status check alarm.
 */
export interface Ec2StatusCheckAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The EC2 instance to monitor.
   */
  instance: IInstance;
  /**
   * The period over which the maximum is applied.
   *
   * @default Duration.minutes(5)
   */
  period?: Duration;
  /**
   * The number of status check failures that trigger the alarm.
   *
   * @remarks
   * When a status check fails, the value of this metric is 1. The threshold is
   * set so that whenever the status check fails, the alarm is in ALARM state.
   *
   * @default 1
   */
  threshold?: number;
}

/**
 * This alarm helps to monitor both system status checks and instance status checks.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#EC2}
 */
export class Ec2StatusCheckAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: Ec2StatusCheckAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm helps to monitor both system status checks and instance status checks. If either type of status check fails, then this alarm should be in ALARM state. Intent: This alarm is used to detect the underlying problems with instances, including both system status check failures and instance status check failures.',
      comparisonOperator:
        props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 2,
      metric: new Metric({
        metricName: 'StatusCheckFailed',
        namespace: 'AWS/EC2',
        statistic: 'Maximum',
        period: props.period ?? Duration.minutes(5),
        dimensionsMap: { InstanceId: props.instance.instanceId },
      }),
      threshold: props.threshold ?? 1,
    });
  }
}
