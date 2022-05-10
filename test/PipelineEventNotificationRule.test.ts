import { App, Stack } from 'aws-cdk-lib';
import { CodePipeline, ShellStep } from 'aws-cdk-lib/pipelines';
import { CodeSource } from '../src';
import { PipelineEventNotificationRule } from '../src/PipelineEventNotificationRule';

const stack = new Stack(new App(), 'TestStack', {
  env: {
    region: 'us-east-1',
    account: '123456789012',
  },
});
const codePipeline = new CodePipeline(stack, 'TestPipeline', {
  synth: new ShellStep('Synth', {
    input: new CodeSource(stack, 'test', {
      codeCommitArn: 'arn:codecommit:us-east-1:us-east-1:123456789012:yes',
    }).source,
    commands: [`cd someDir`, `npm run cdk synth -o outDir`],
    primaryOutputDirectory: `someDir/outDir`,
  }),
});
codePipeline.buildPipeline();
describe('PipelineEventNotificationRule', () => {
  it('should create without error.', () => {
    const rule = new PipelineEventNotificationRule(
      codePipeline,
      'arn:sns:us-east-1:us-east-1:123456789012:yes',
    );
    expect(rule).not.toBeNull;
  });
});
