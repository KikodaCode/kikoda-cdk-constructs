import { Duration } from 'aws-cdk-lib';
import { IHttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an API Gateway client error alarm.
 */
export interface ApiGatewayClientErrorAlarmProps extends CreateRecommendedAlarmProps {
  /**
   * The API Gateway HTTP API to monitor.
   */
  api: IHttpApi;
  /**
   * The period over which the average is applied.
   *
   * @default Duration.minutes(1)
   */
  period?: Duration;
  /**
   * The highest rate of client-side errors that are allowed before triggering
   * the alarm.
   *
   * @remarks
   * The threshold can be tuned to suit the traffic of the requests as well as
   * acceptable error rates. An acceptable error rate for the application
   * workload can be determined by analyzing historical data. Frequently
   * occurring 4XX errors need to be alarmed on. However, setting a very low
   * value for the threshold can cause the alarm to be too sensitive.
   *
   * @default 0.05
   */
  threshold?: number;
}

/**
 * This alarm detects a high rate of client-side errors.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#ApiGateway}
 */
export class ApiGatewayClientErrorAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: ApiGatewayClientErrorAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm detects a high rate of client-side errors. This can indicate an issue in the authorization or client request parameters. It could also mean that a resource was removed or a client is requesting one that does not exist.',
      comparisonOperator: props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 5,
      metric: props.api.metricClientError({
        period: props.period ?? Duration.minutes(1),
        statistic: 'Average',
      }),
      threshold: props.threshold ?? 0.05,
    });
  }
}
