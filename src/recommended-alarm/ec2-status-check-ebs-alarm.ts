import { Duration } from 'aws-cdk-lib';
import { ComparisonOperator, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { IInstance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an EC2 status check attached EBS alarm.
 */
export interface Ec2StatusCheckEbsAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The EC2 instance to monitor.
   */
  instance: IInstance;
  /**
   * The period over which the maximum is applied.
   *
   * @default Duration.minutes(1)
   */
  period?: Duration;
  /**
   * The number of EBS status check failures that trigger the alarm.
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
 * This alarm helps monitor whether the EBS volumes attached to an instance are reachable and able to complete I/O operations.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#EC2}
 */
export class Ec2StatusCheckEbsAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: Ec2StatusCheckEbsAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm helps monitor whether the EBS volumes attached to an instance are reachable and able to complete I/O operations. This status check detects underlying issues with the compute or EBS infrastructure such as the following: hardware or software issues on the storage subsystems underlying the EBS volumes, hardware issues on the physical host that impact reachability of the EBS volumes, or connectivity issues between the instance and EBS volumes. Intent: This alarm is used to detect unreachable EBS volumes attached to an instance. These can cause failures in I/O operations.',
      comparisonOperator:
        props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 10,
      metric: new Metric({
        metricName: 'StatusCheckFailed_AttachedEBS',
        namespace: 'AWS/EC2',
        statistic: 'Maximum',
        period: props.period ?? Duration.minutes(1),
        dimensionsMap: { InstanceId: props.instance.instanceId },
      }),
      threshold: props.threshold ?? 1,
    });
  }
}
