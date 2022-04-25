import { CfnOutput } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

/**
 * The Alarm levels.
 */
export enum AlarmLevels {
  /** For general information these are typically the most verbose. */
  INFO = 'Information',
  /** Events that indicate service degredation, inefficency, and/or non blocking errors. */
  WARNING = 'Warning',
  /** Events that indicate system failures, data loss, and/or blocking errors. */
  CRITICAL = 'Critical',
}

/**
 * @param {AlarmLevel} level The alert level. This is used in the Topic displayName and topicName, and the cfn export name.
 * @param {string} prefix The identifier prefix. This could be a stage name or similar identifier.
 * @param {boolean} createCfnExport If true a CFN export will be created available at: {@link EnvironmentAlarmTopic.exportName}.
 */
export interface EnvironmentAlarmTopicProps {
  level: AlarmLevels;
  prefix?: string;
  createCfnExport?: boolean;
}

/**
 * An alarm topic and optional cfn export of the topic name.
 * @class
 * @property {string} exportName The CFN Export name, will be populated if {@link EnvironmentAlarmTopicProps.createCfnExport} is true.
 */
export class EnvironmentAlarmTopic extends Construct {
  public exportName: string;
  constructor(scope: Construct, id: string, props: EnvironmentAlarmTopicProps) {
    super(scope, id);
    const identifierPrefix = props.prefix ? `${props.prefix}-${props.level}` : props.level;

    const topic = new Topic(this, `${identifierPrefix}SnsTopic`, {
      displayName: `${props.level} SNS Topic`,
      topicName: `${identifierPrefix}-alerts`,
    });

    if (props.createCfnExport) {
      this.exportName = `${identifierPrefix}-TopicArn`;
      new CfnOutput(this, `${identifierPrefix}SnsTopicArn`, {
        value: topic.topicArn,
        exportName: this.exportName,
        description: `The base SNS topic ARN used by the services to send CloudWatch alarm notifications (${props.level} level).`,
      });
    }
  }
}
