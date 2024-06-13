import { Duration } from 'aws-cdk-lib';
import { IHttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an API Gateway latency alarm.
 */
export interface ApiGatewayLatencyAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The API Gateway HTTP API to monitor.
   */
  api: IHttpApi;
  /**
   * The period over which the statistic is applied.
   *
   * @default Duration.minutes(1)
   */
  period?: Duration;
  /**
   * The highest latency that is allowed before triggering the alarm.
   *
   * @remarks
   * The suggested threshold value does not work for all API workloads. A
   * different threshold value can be chosen based on the workload and
   * acceptable latency, performance, and SLA requirements for the API. If it
   * is acceptable for the API to have a higher latency in general, a higher
   * threshold value can be set to make the alarm less sensitive. However, if
   * the API is expected to provide near real-time responses, set a lower
   * threshold value. The threshold value can also be tuned based on an
   * analysis of historical data.
   *
   * @default 2500
   */
  threshold?: number;
}

/**
 * This alarm detects high latency in a stage.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#ApiGateway}
 */
export class ApiGatewayLatencyAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: ApiGatewayLatencyAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm detects high latency in a stage. Find the IntegrationLatency metric value to check the API backend latency. If the two metrics are mostly aligned, the API backend is the source of higher latency and it should be investigated for issues. Intent: This alarm can detect when the API Gateway requests in a stage have high latency.',
      comparisonOperator:
        props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 5,
      metric: props.api.metricLatency({
        period: props.period ?? Duration.minutes(1),
        statistic: 'p90',
      }),
      threshold: props.threshold ?? 2500,
    });
  }
}
