import { Duration } from 'aws-cdk-lib';
import { IHttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import { CreateRecommendedAlarmProps, RecommendedAlarm } from './recommended-alarm';

/**
 * Properties needed to create an API Gateway server error alarm.
 */
export interface ApiGatewayServerErrorAlarmProps extends CreateRecommendedAlarmProps {
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
   * The highest rate of server-side errors that are allowed before triggering
   * the alarm.
   *
   * @remarks
   * The threshold can be tuned to suit the traffic of the requests as well as
   * acceptable error rates. An acceptable error rate for the application
   * workload can be determined by analyzing historical data. Frequently
   * occurring 5XX errors need to be alarmed on. However, setting a very low
   * value for the threshold can cause the alarm to be too sensitive.
   *
   * @default 0.05
   */
  threshold?: number;
}

/**
 * This alarm detects a high rate of server-side errors.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Best_Practice_Recommended_Alarms_AWS_Services.html#ApiGateway}
 */
export class ApiGatewayServerErrorAlarm extends RecommendedAlarm {
  constructor(scope: Construct, id: string, props: ApiGatewayServerErrorAlarmProps) {
    super(scope, id, {
      ...props,
      alarmDescription:
        props.alarmDescription ??
        'This alarm detects a high rate of server-side errors. This can indicate that there is something wrong on the API backend, the network, or the integration between the API gateway and the backend API.',
      comparisonOperator: props.comparisonOperator ?? ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods ?? 3,
      metric: props.api.metricServerError({
        period: props.period ?? Duration.minutes(1),
        statistic: 'Average',
      }),
      threshold: props.threshold ?? 0.05,
    });
  }
}
