import { CfnOutput } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

/**
 * The Alarm levels.
 */
export enum AlarmLevels {
  /**
   * For general information. These are typically the most verbose.
   */
  INFO = 'Information',
  /**
   * Events that indicate service degradation, inefficiency, and/or non
   * blocking errors.
   */
  WARNING = 'Warning',
  /**
   * Events that indicate system failures, data loss, and/or blocking errors.
   */
  CRITICAL = 'Critical',
}

/**
 * Configuration for StageAlarmTopic.
 */
export interface StageAlarmTopicProps {
  /**
   * The alert level. This is used in the Topic displayName and topicName, and
   * the cfn export name.
   */
  readonly level: AlarmLevels;
  /**
   * The identifier prefix. This could be a stage name or similar identifier.
   *
   * @default - no prefix is added to the identifier.
   */
  readonly prefix?: string;
  /**
   * If true, a CFN export will be created.
   *
   * @default - no CFN export is created.
   */
  readonly createCfnExport?: boolean;
}

/**
 * An alarm topic and optional cfn export of the topic name.
 *
 * @extends {Construct}
 */
export class StageAlarmTopic extends Construct {
  /**
   * The CFN Export, will be populated if createCfnExport is true.
   */
  public cfnOutput?: CfnOutput = undefined;
  /**
   * The SNS Topic
   */
  public topic: Topic;
  /**
   * Create an instance of StageAlarmTopic.
   *
   * @constructor
   * @param {Construct} scope - The scope of the construct.
   * @param {string} id - The construct's id.
   * @param {StageAlarmTopicProps} props - The configuration for the construct.
   */
  constructor(scope: Construct, id: string, props: StageAlarmTopicProps) {
    super(scope, id);
    const identifierPrefix = props.prefix ? `${props.prefix}-${props.level}` : props.level;

    this.topic = new Topic(this, `${identifierPrefix}SnsTopic`, {
      displayName: `${props.level} SNS Topic`,
      topicName: `${identifierPrefix}-alerts`,
    });

    if (props.createCfnExport) {
      this.cfnOutput = new CfnOutput(this, `${identifierPrefix}SnsTopicArn`, {
        value: this.topic.topicArn,
        exportName: `${identifierPrefix}-TopicArn`,
        description: `The base SNS topic ARN used by the services to send CloudWatch alarm notifications (${props.level} level).`,
      });
    }
  }
}
