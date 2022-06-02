import { App, Arn, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Runtime, Tracing, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ConfiguredStage, ConfiguredStageProps, BranchPipelines } from '../..';

describe('BranchPipelines', () => {
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
    const statement = new BranchPipelines<CoreConfig>(app, {
      component: {
        componentName: 'test',
        componentType: TestStage,
      },
      deploymentBranches: [
        {
          branchName: 'test',
          stages: [
            {
              stageName: 'dev',
              config: {
                activeTracing: Tracing.ACTIVE,
              },
            },
          ],
        },
      ],
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
    expect(statement).not.toBeNull;
  });
});
