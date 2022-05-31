import { App, Arn, Stack, Stage } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IndividualPipelineStack } from '../src/DeploymentPipelines/IndividualPipelineStack';

describe('IndividualPipelineStack', () => {
  class TestStage extends Stage {
    public constructor() {
      super(new App(), 'TestStage');
      new Stack(this, 'testStack', {});
    }
  }
  it('should synth without error.', () => {
    const pipeline = new IndividualPipelineStack(new App(), 'test', {
      branch: {
        branchName: 'test',
        staticPipelineIdentifier: 'test',
        stages: [{ stageName: 'test', config: {} }],
      },
      component: {
        componentName: 'test',
        componentType: TestStage,
      },
      pipelineConfig: {},
      repository: {
        source: {
          codeCommitArn: Arn.format({
            partition: 'aws',
            region: 'us-east-1',
            account: '123456789012',
            service: 'codecommit',
            resource: 'my-repo',
          }),
        },
      },
      env: {
        region: 'us-east-1',
        account: '123456789012',
      },
    });
    const template = Template.fromStack(pipeline);
    template.hasResource('AWS::CodePipeline::Pipeline', {});
  });
});
