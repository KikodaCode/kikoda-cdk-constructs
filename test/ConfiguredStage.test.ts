import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { ConfiguredStage, ConfiguredStageProps } from '../src';

jest.mock('aws-cdk-lib/aws-ec2', () => {
  const original = jest.requireActual('aws-cdk-lib/aws-ec2');
  return {
    __esModule: true,
    ...original,
    Vpc: {
      ...original.Vpc,
      fromLookup: jest.fn((scope: Construct, id: string) => {
        return new original.Vpc(scope, id, {});
      }),
    },
  };
});

describe('Configured Stage', () => {
  class TestStack<T> extends Stack {
    public readonly stage: ConfiguredStage<T>;
    constructor(props: ConfiguredStageProps<T>) {
      super();
      this.stage = new ConfiguredStage(this, 'test', props);
    }
  }

  /**
   * Stage must expose the custom type config.
   */
  test.each`
    bespokeConfig
    ${{ test: 1 }}
    ${{ test: 'yes' }}
    ${{ test: { nestedConfig: true } }}
  `('assigns $bespokeConfig to config', bespokeConfig => {
    const stack = new TestStack<typeof bespokeConfig>({
      config: {
        vpcId: 'test',
        enableAlarms: true,
        stackConfigs: bespokeConfig,
        stageName: 'test',
      },
    });

    expect(stack.stage.config.stackConfigs).toStrictEqual(bespokeConfig);
  });

  test('contains Vpc', () => {
    const stack = new TestStack<{}>({
      config: {
        vpcId: 'test',
        enableAlarms: true,
        stackConfigs: {},
        stageName: 'test',
      },
    });
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::EC2::VPC', 1);
  });
});
