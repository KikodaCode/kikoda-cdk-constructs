import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AlarmLevels, StageAlarmTopic, StageAlarmTopicProps } from '../src';

describe('StageAlarmTopic', () => {
  class TopicStack extends Stack {
    public alarm: StageAlarmTopic;
    constructor(props: StageAlarmTopicProps) {
      super();
      this.alarm = new StageAlarmTopic(this, 'test', props);
    }
  }
  test('has topic', () => {
    const topicsStack = new TopicStack({
      level: AlarmLevels.INFO,
    });

    const template = Template.fromStack(topicsStack);
    template.resourceCountIs('AWS::SNS::Topic', 1);
  });

  test.each`
    level
    ${AlarmLevels.INFO}
    ${AlarmLevels.WARNING}
    ${AlarmLevels.CRITICAL}
  `('when level is: $level display name and topic name contain $level', ({ level }) => {
    const topicsStack = new TopicStack({
      level,
    });

    // Prepare the stack for assertions.
    const template = Template.fromStack(topicsStack);
    template.hasResourceProperties('AWS::SNS::Topic', {
      DisplayName: Match.stringLikeRegexp(`${level}`),
      TopicName: Match.stringLikeRegexp(`${level}`),
    });
  });

  test.each`
    prefix
    ${'test'}
    ${'AnotherPrefix'}
    ${'1a2B3%'}
  `('when prefix is: $prefix display name and topic name contain $prefix', prefix => {
    const topicsStack = new TopicStack({
      level: AlarmLevels.INFO,
      prefix,
    });

    // Prepare the stack for assertions.
    const template = Template.fromStack(topicsStack);
    template.hasResourceProperties('AWS::SNS::Topic', {
      DisplayName: Match.stringLikeRegexp(`${prefix}`),
      TopicName: Match.stringLikeRegexp(`${prefix}`),
    });
  });

  test('creates export when createCfnExport is true', () => {
    const topicsStack = new TopicStack({
      level: AlarmLevels.INFO,
      createCfnExport: true,
    });

    // Prepare the stack for assertions.
    const template = Template.fromStack(topicsStack);
    template.hasOutput('*', {
      Export: { Name: topicsStack.alarm.cfnOutput?.exportName },
    });
  });
});
