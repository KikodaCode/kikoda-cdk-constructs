import { Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import {
  AmazonLinuxImage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import {
  Ec2CpuUtilizationAlarm,
  Ec2StatusCheckAlarm,
  Ec2StatusCheckEbsAlarm,
} from '../src/recommended-alarm';

function initialize() {
  const stack = new Stack();
  const vpc = new Vpc(stack, 'VPC');
  const instance = new Instance(stack, 'Instance', {
    instanceType: InstanceType.of(InstanceClass.BURSTABLE4_GRAVITON, InstanceSize.MICRO),
    machineImage: new AmazonLinuxImage(),
    vpc,
  });

  return { instance, stack, vpc };
}

describe('Ec2CpuUtilizationAlarm', () => {
  test('with default props', () => {
    const { instance, stack } = initialize();

    new Ec2CpuUtilizationAlarm(stack, 'Ec2CpuUtilizationAlarm', { instance });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      Dimensions: [{ Name: 'InstanceId' }],
      MetricName: 'CPUUtilization',
      Namespace: 'AWS/EC2',
      Statistic: 'Average',
      Threshold: 80,
    });
  });

  test('with specific props', () => {
    const { instance, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(1),
      threshold: 60,
    };

    new Ec2CpuUtilizationAlarm(stack, 'Ec2CpuUtilizationAlarm', { instance, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'InstanceId' }],
      EvaluationPeriods: props.evaluationPeriods,
      MetricName: 'CPUUtilization',
      Namespace: 'AWS/EC2',
      Period: props.period.toSeconds(),
      Statistic: 'Average',
      Threshold: props.threshold,
    });
  });
});

describe('Ec2StatusCheckAlarm', () => {
  test('with default props', () => {
    const { instance, stack } = initialize();

    new Ec2StatusCheckAlarm(stack, 'Ec2StatusCheckAlarm', { instance });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      Dimensions: [{ Name: 'InstanceId' }],
      MetricName: 'StatusCheckFailed',
      Namespace: 'AWS/EC2',
      Statistic: 'Maximum',
      Threshold: 1,
    });
  });

  test('with specific props', () => {
    const { instance, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(1),
      threshold: 2,
    };

    new Ec2StatusCheckAlarm(stack, 'Ec2StatusCheckAlarm', { instance, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'InstanceId' }],
      EvaluationPeriods: props.evaluationPeriods,
      MetricName: 'StatusCheckFailed',
      Namespace: 'AWS/EC2',
      Period: props.period.toSeconds(),
      Statistic: 'Maximum',
      Threshold: props.threshold,
    });
  });
});

describe('Ec2StatusCheckEbsAlarm', () => {
  test('with default props', () => {
    const { instance, stack } = initialize();

    new Ec2StatusCheckEbsAlarm(stack, 'Ec2StatusCheckEbsAlarm', { instance });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      ComparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      Dimensions: [{ Name: 'InstanceId' }],
      MetricName: 'StatusCheckFailed_AttachedEBS',
      Namespace: 'AWS/EC2',
      Statistic: 'Maximum',
      Threshold: 1,
    });
  });

  test('with specific props', () => {
    const { instance, stack } = initialize();
    const props = {
      alarmDescription: 'alarmDescription',
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      period: Duration.minutes(5),
      threshold: 2,
    };

    new Ec2StatusCheckEbsAlarm(stack, 'Ec2StatusCheckEbsAlarm', { instance, ...props });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmDescription: props.alarmDescription,
      ComparisonOperator: props.comparisonOperator,
      Dimensions: [{ Name: 'InstanceId' }],
      EvaluationPeriods: props.evaluationPeriods,
      MetricName: 'StatusCheckFailed_AttachedEBS',
      Namespace: 'AWS/EC2',
      Period: props.period.toSeconds(),
      Statistic: 'Maximum',
      Threshold: props.threshold,
    });
  });
});
