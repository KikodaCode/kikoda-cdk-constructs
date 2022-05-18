import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

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
    this.config = props.config;
  }
}
