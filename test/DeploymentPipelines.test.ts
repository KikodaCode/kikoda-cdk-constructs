import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Runtime, Tracing, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ConfiguredStage, ConfiguredStageProps, DeploymentPipelines } from '../src';

describe('DeploymentPipelines', () => {
  interface CoreConfig {
    activeTracing: Tracing;
  }

  interface TestStackProps extends StackProps, CoreConfig {}

  class TestStack extends Stack {
    constructor(scope: Construct, id: string, props: TestStackProps) {
      super(scope, id, props);
      new Function(this, 'test', {
        runtime: Runtime.PYTHON_3_9,
        handler: 'index.handler',
        code: Code.fromInline('def handler(event, context): print(event)'),
        tracing: props.activeTracing,
      });
    }
  }

  class TestStage extends ConfiguredStage<CoreConfig> {
    constructor(scope: Construct, id: string, props: ConfiguredStageProps<CoreConfig>) {
      super(scope, id, props);
      new TestStack(this, 'newStack', { ...props.config, env: props.env });
    }
  }

  it('should create without error.', () => {
    const app = new App();
    const statement = new DeploymentPipelines<CoreConfig>(app, {
      component: 'test',
      deploymentBranches: [
        {
          branchName: 'test',
          staticPipelineIdentifier: 'test',
          stages: [
            {
              stageName: 'dev',
              manualApproval: false,
              config: {
                activeTracing: Tracing.ACTIVE,
              },
            },
          ],
        },
      ],
      env: {
        region: 'us-east-1',
        account: '123456789012',
      },
      repository: {
        codeCommitArn: 'arn:codecommit:us-east-1:us-east-1:123456789012:yes',
      },
      stageType: TestStage,
    });
    expect(statement).not.toBeNull;
  });
});
