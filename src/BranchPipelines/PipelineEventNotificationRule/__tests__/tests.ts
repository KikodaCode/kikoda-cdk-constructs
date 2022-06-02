import { App, Arn, Stack } from 'aws-cdk-lib';
import { CodePipeline, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineEventNotificationRule } from '..';
import { CodeSource } from '../../..';

const stack = new Stack(new App(), 'TestStack', {
  env: {
    region: 'us-east-1',
    account: '123456789012',
  },
});
const codePipeline = new CodePipeline(stack, 'TestPipeline', {
  synth: new ShellStep('Synth', {
    input: new CodeSource(stack, 'test', {
      codeCommitArn: Arn.format({ service: 'codecommit', resource: 'my-repo' }, stack),
    }).source,
    commands: [`cd someDir`, `npm run cdk synth -o outDir`],
    primaryOutputDirectory: `someDir/outDir`,
  }),
});
codePipeline.buildPipeline();
describe('PipelineEventNotificationRule', () => {
  it('should create without error.', () => {
    const rule = new PipelineEventNotificationRule(codePipeline, {
      notificationTopicArn: Arn.format({ service: 'sns', resource: 'my-topic' }, stack),
    });
    expect(rule).not.toBeNull;
  });
});
