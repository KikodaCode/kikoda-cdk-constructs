import { Stage, StageProps } from 'aws-cdk-lib';
import { IVpc, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

/**
 * Configuration for the stage.
 */
export interface StageConfig<T> {
  /** The subdomain for the stage. */
  readonly subDomain?: string;
  /** The vpcId of a prexisting vpc. */
  readonly vpcId: string;
  /** The name of this stage. */
  readonly stageName: string;
  /** Enable stage level alarms. */
  readonly enableAlarms: boolean;
  /** Stack specific configs. */
  readonly stackConfigs: T;
}

export interface ConfiguredStageProps<T> extends StageProps {
  readonly config: StageConfig<T>;
}

/**
 * A {@link Stage} with resolved constructs for prexisting infrastructure.
 * @class
 */
export class ConfiguredStage<T> extends Stage {
  /**
   * The vpc as configured via {@link StageConfig.vpcId} this vpc must be created as a predicate for the application.
   * @public
   */
  readonly vpc: IVpc;
  /**
   * The configuration for the stage.
   * @public
   * @see {@link StageConfig}
   */
  readonly config: StageConfig<T>;

  constructor(scope: Construct, id: string, props: ConfiguredStageProps<T>) {
    super(scope, id, props);
    this.config = props.config;
    this.vpc = Vpc.fromLookup(scope, `${this.config.stageName}Vpc`, {
      vpcId: this.config.vpcId,
    });
  }
}
