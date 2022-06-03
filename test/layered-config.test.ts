import { Stack } from 'aws-cdk-lib';
import { LayeredConfig } from '../src';

describe('Layered Config', () => {
  class TestStack extends Stack {
    public readonly config: LayeredConfig;

    constructor({ base, layer }: { base: any; layer: any }) {
      super();
      this.config = new LayeredConfig(base, layer);
    }
  }

  /**
   * Stage must expose the custom type config.
   */
  test('Layers configuration objects in order', () => {
    const stack = new TestStack({
      base: {
        components: {
          componentOne: {
            globalConfigValue: true,
            shouldBeOverwritten: false,
          },
        },
      },
      layer: {
        components: {
          componentOne: {
            stageConfigValue: true,
            shouldBeOverwritten: true,
          },
        },
      },
    });

    expect(stack.config).toStrictEqual({
      components: {
        componentOne: {
          globalConfigValue: true,
          stageConfigValue: true,
          shouldBeOverwritten: true,
        },
      },
    });
  });
});
