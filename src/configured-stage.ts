import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct, IConstruct } from 'constructs';

const CONFIGURED_STAGE_SYMBOL = Symbol.for('@kikoda/cdk-constructs.ConifiguredStage');

/**
 * Configured Stage Properties.
 * @author Kikoda
 *
 * @export
 * @interface ConfiguredStageProps
 * @typedef {ConfiguredStageProps}
 * @template T
 * @extends {StageProps}
 */
export interface ConfiguredStageProps<T> extends StageProps {
  readonly config: T;
}

/**
 * A Stage that has a specific configuration.
 *
 * @export
 * @class ConfiguredStage
 * @typedef {ConfiguredStage}
 * @template TConfig - a generic type that represents the configuration for the stage.
 * @extends {Stage}
 */
export class ConfiguredStage<TConfig> extends Stage {
  /**
   * Return the `ConfiguredStage` this construct is contained with, if available. If called
   * on a nested stage, returns its parent. This method is most useful when you need to
   * load the configuration in a nested construct. This works exactly like Stage.of() but
   * returns the ConfiguredStage instead of the Stage.
   *
   */
  public static extOf<K>(construct: IConstruct): ConfiguredStage<K> | undefined {
    return construct.node.scopes.reverse().slice(1).find(ConfiguredStage.isConfiguredStage);
  }

  /**
   * Test whether the given construct is a ConfiguredStage.
   *
   */
  public static isConfiguredStage(x: any): x is ConfiguredStage<any> {
    return x !== null && typeof x === 'object' && CONFIGURED_STAGE_SYMBOL in x;
  }

  /**
   * The configuration for the stage.
   *
   * @readonly
   */
  readonly config: TConfig;

  /**
   * Configured Stage construct to be used with the Deployment Piplelines construct.
   * This stage allows for use of the specified generic type to be made available as the config property.
   *
   * @constructor
   * @param {Construct} scope - The scope of the construct.
   * @param {string} id - The construct's id.
   * @param {ConfiguredStageProps<TConfig>} props - The configuration based upon a generic type.
   */
  constructor(scope: Construct, id: string, props: ConfiguredStageProps<TConfig>) {
    super(scope, id, props);
    Object.defineProperty(this, CONFIGURED_STAGE_SYMBOL, { value: true });
    this.config = props.config;
  }
}
