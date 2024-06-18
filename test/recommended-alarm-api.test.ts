import { Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { HttpApi, WebSocketApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import {
  ApiGatewayClientErrorAlarm,
  ApiGatewayIntegrationLatencyAlarm,
  ApiGatewayLatencyAlarm,
  ApiGatewayServerErrorAlarm,
} from '../src/recommended-alarm';

function initialize() {
  const stack = new Stack();
  const api = new HttpApi(stack, 'HttpApi');
  return { api, stack };
}

function initializeWebSocketApi() {
  const stack = new Stack();
  const api = new WebSocketApi(stack, 'WebSocketApi');
  return { api, stack };
}

describe('ApiGatewayClientErrorAlarm', () => {
  test('with default props', () => {
    const { api, stack } = initialize();

    new ApiGatewayClientErrorAlarm(stack, 'ApiGatewayClientErrorAlarm', { api });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      Dimensions: [{ Name: 'ApiId' }],
      MetricName: '4xx',
      Namespace: 'AWS/ApiGateway',
      Statistic: 'Average',
      Threshold: 0.05,
    });
  });

  test('with specific props', () => {
    const { api, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(5),
      threshold: 0.1,
    };

    new ApiGatewayClientErrorAlarm(stack, 'ApiGatewayClientErrorAlarm', { api, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'ApiId' }],
      EvaluationPeriods: props.evaluationPeriods,
      MetricName: '4xx',
      Namespace: 'AWS/ApiGateway',
      Period: props.period.toSeconds(),
      Statistic: 'Average',
      Threshold: props.threshold,
    });
  });
});

describe('ApiGatewayIntegrationLatencyAlarm', () => {
  test('with default props', () => {
    const { api, stack } = initialize();

    new ApiGatewayIntegrationLatencyAlarm(stack, 'ApiGatewayIntegrationLatencyAlarm', { api });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      Dimensions: [{ Name: 'ApiId' }],
      ExtendedStatistic: 'p90',
      MetricName: 'IntegrationLatency',
      Namespace: 'AWS/ApiGateway',
      Threshold: 2000,
    });
  });

  test('with specific props', () => {
    const { api, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(5),
      threshold: 1000,
    };

    new ApiGatewayIntegrationLatencyAlarm(stack, 'ApiGatewayIntegrationLatencyAlarm', {
      api,
      ...props,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'ApiId' }],
      EvaluationPeriods: props.evaluationPeriods,
      ExtendedStatistic: 'p90',
      MetricName: 'IntegrationLatency',
      Namespace: 'AWS/ApiGateway',
      Period: props.period.toSeconds(),
      Threshold: props.threshold,
    });
  });

  test('using websocket api', () => {
    const { api, stack } = initializeWebSocketApi();

    new ApiGatewayIntegrationLatencyAlarm(stack, 'ApiGatewayIntegrationLatencyAlarm', { api });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      Dimensions: [{ Name: 'ApiId' }],
      ExtendedStatistic: 'p90',
      MetricName: 'IntegrationLatency',
      Namespace: 'AWS/ApiGateway',
    });
  });
});

describe('ApiGatewayLatencyAlarm', () => {
  test('with default props', () => {
    const { api, stack } = initialize();

    new ApiGatewayLatencyAlarm(stack, 'ApiGatewayLatencyAlarm', { api });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      Dimensions: [{ Name: 'ApiId' }],
      ExtendedStatistic: 'p90',
      MetricName: 'Latency',
      Namespace: 'AWS/ApiGateway',
      Threshold: 2500,
    });
  });

  test('with specific props', () => {
    const { api, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(5),
      threshold: 1500,
    };

    new ApiGatewayLatencyAlarm(stack, 'ApiGatewayLatencyAlarm', { api, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'ApiId' }],
      EvaluationPeriods: props.evaluationPeriods,
      ExtendedStatistic: 'p90',
      MetricName: 'Latency',
      Namespace: 'AWS/ApiGateway',
      Period: props.period.toSeconds(),
      Threshold: props.threshold,
    });
  });
});

describe('ApiGatewayServerErrorAlarm', () => {
  test('with default props', () => {
    const { api, stack } = initialize();

    new ApiGatewayServerErrorAlarm(stack, 'ApiGatewayServerErrorAlarm', { api });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      Dimensions: [{ Name: 'ApiId' }],
      MetricName: '5xx',
      Namespace: 'AWS/ApiGateway',
      Statistic: 'Average',
      Threshold: 0.05,
    });
  });

  test('with specific props', () => {
    const { api, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(5),
      threshold: 0.1,
    };

    new ApiGatewayServerErrorAlarm(stack, 'ApiGatewayServerErrorAlarm', { api, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'ApiId' }],
      EvaluationPeriods: props.evaluationPeriods,
      MetricName: '5xx',
      Namespace: 'AWS/ApiGateway',
      Period: props.period.toSeconds(),
      Statistic: 'Average',
      Threshold: props.threshold,
    });
  });
});
