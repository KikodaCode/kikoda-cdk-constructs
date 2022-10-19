import { Stack, App } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConfiguredStage, ConfiguredStageProps } from '../src';

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
        stackConfigs: bespokeConfig,
        stageName: 'test',
      },
    });

    expect(stack.stage.config.stackConfigs).toStrictEqual(bespokeConfig);
  });

  test('finds ConfiguredStage in a child construct', () => {
    interface Config {
      foo: string;
    }

    class MyStack extends Stack {
      readonly stage: ConfiguredStage<Config>;

      constructor(scope: Construct, id: string) {
        super(scope, id);

        /*
         * Get a config value in a child stack or construct
         */
        this.stage = ConfiguredStage.extOf(this) as ConfiguredStage<Config>;
      }
    }

    class MyStage<T> extends ConfiguredStage<T> {
      readonly myStack: MyStack;

      constructor(scope: Construct, id: string, props: ConfiguredStageProps<T>) {
        super(scope, id, props);

        this.myStack = new MyStack(this, 'MyStack');
      }
    }

    const stage = new MyStage(new App(), 'MyStage', {
      config: {
        foo: 'bar',
      },
    });

    expect(stage.myStack.stage.config.foo).toBe('bar');
  });
});
