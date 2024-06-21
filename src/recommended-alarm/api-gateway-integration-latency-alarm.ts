import { Duration } from 'aws-cdk-lib';
import { IHttpApi, IWebSocketApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an API Gateway integration latency alarm.
 */
export interface ApiGatewayIntegrationLatencyAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The API Gateway HTTP API to monitor.
   */
  api: IHttpApi | IWebSocketApi;
  /**
   * The period over which the statistic is applied.
   *
   * @default Duration.minutes(1)
   */
  period?: Duration;
  /**
   * The highest integration latency that is allowed before triggering the
   * alarm.
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
   * @default 2000
   */
  threshold?: number;
}

/**
 * This alarm helps to detect if there is high integration latency for the API
 * requests in a stage.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#ApiGateway}
 */
export class ApiGatewayIntegrationLatencyAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: ApiGatewayIntegrationLatencyAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm helps to detect if there is high integration latency for the API requests in a stage. The IntegrationLatency metric value can be correlated with the corresponding latency metric of the backend such as the Duration metric for Lambda integrations to determine whether the API backend is taking more time to process requests from clients due to performance issues, or if there is some other overhead from initialization or cold start. Intent: This alarm can detect when the API Gateway requests in a stage have a high integration latency. This alarm is recommended for WebSocket APIs, and considered optional for HTTP APIs because HTTP APIs already have separate alarm recommendations for the Latency metric.',
      comparisonOperator:
        props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 5,
      metric: props.api.metric('IntegrationLatency', {
        period: props.period ?? Duration.minutes(1),
        statistic: 'p90',
      }),
      threshold: props.threshold ?? 2000,
    });
  }
}
