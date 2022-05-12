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
  config: T;
}

/**
 * A Stage that is configured with a specific configuration.
 * @author Kikoda
 *
 * @export
 * @class ConfiguredStage
 * @typedef {ConfiguredStage}
 * @template T
 * @extends {Stage}
 */
export class ConfiguredStage<T> extends Stage {
  /**
   * The configuration for the stage.
   * @author Kikoda
   *
   * @readonly
   */
  readonly config: T;
  /**
   * Configured Stage construct to be used with the Deployment Piplelines construct.
   * This stage allows for use of the specified generic type to be made available as the config property.
   * @author Kikoda
   *
   * @constructor
   * @param {Construct} scope - The scope of the construct.
   * @param {string} id - The construct's id.
   * @param {ConfiguredStageProps<T>} props - The configuration based upon a generic type.
   */
  constructor(scope: Construct, id: string, props: ConfiguredStageProps<T>) {
    super(scope, id, props);
    this.config = props.config;
  }
}
