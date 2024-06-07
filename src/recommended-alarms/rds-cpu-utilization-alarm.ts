import { Duration } from 'aws-cdk-lib';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarms';

/**
 * Properties needed to create an RDS CPU utilization alarm.
 */
export interface RdsCpuUtilizationAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The database instance to monitor.
   */
  database: DatabaseInstance;
  /**
   * The period over which the average is applied.
   *
   * @default Duration.minutes(1)
   */
  period?: Duration;
}

/**
 * This alarm helps to monitor consistent high CPU utilization.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#RDS}
 */
export class RdsCpuUtilizationAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: RdsCpuUtilizationAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm helps to monitor consistent high CPU utilization. CPU utilization measures non-idle time. Intent: This alarm is used to detect consistent high CPU utilization in order to prevent very high response time and time-outs. If you want to check micro-bursting of CPU utilization you can set a lower alarm evaluation time.',
      comparisonOperator: props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 5,
      metric: props.database.metricCPUUtilization({ period: props.period ?? Duration.minutes(1) }),
      threshold: props.threshold ?? 90,
    });
  }
}
