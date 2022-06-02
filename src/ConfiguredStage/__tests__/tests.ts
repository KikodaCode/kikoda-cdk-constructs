import { Stack } from 'aws-cdk-lib';
import { ConfiguredStage, ConfiguredStageProps } from '../..';

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
});
