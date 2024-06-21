import { Duration } from 'aws-cdk-lib';
import { ComparisonOperator, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { IInstance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an EC2 CPU utilization alarm.
 */
export interface Ec2CpuUtilizationAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The EC2 instance to monitor.
   */
  instance: IInstance;
  /**
   * The period over which the average is applied.
   *
   * @default Duration.minutes(5)
   */
  period?: Duration;
  /**
   * The highest percentage of CPU utilization that is allowed before
   * triggering the alarm.
   *
   * @remarks
   * Typically, the threshold for CPU utilization should be around 70-80%.
   * However, this can be adjusted based on acceptable performance level and
   * workload characteristics. For some systems, consistently high CPU
   * utilization may be normal and not indicate a problem, while for others, it
   * may be cause for concern.
   *
   * @default 80
   */
  threshold?: number;
}

/**
 * This alarm helps to monitor the CPU utilization of an EC2 instance.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#EC2}
 */
export class Ec2CpuUtilizationAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: Ec2CpuUtilizationAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm helps to monitor the CPU utilization of an EC2 instance. Depending on the application, consistently high utilization levels might be normal. But if performance is degraded, and the application is not constrained by disk I/O, memory, or network resources, then a maxed-out CPU might indicate a resource bottleneck or application performance problems. High CPU utilization might indicate that an upgrade to a more CPU intensive instance is required.',
      comparisonOperator: props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 3,
      metric: new Metric({
        metricName: 'CPUUtilization',
        namespace: 'AWS/EC2',
        statistic: 'Average',
        period: props.period ?? Duration.minutes(5),
        dimensionsMap: { InstanceId: props.instance.instanceId },
      }),
      threshold: props.threshold ?? 80,
    });
  }
}
