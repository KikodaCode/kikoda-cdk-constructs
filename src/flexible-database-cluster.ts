import { Alarm, ComparisonOperator } from '@aws-cdk/aws-cloudwatch';
import { SnsAction } from '@aws-cdk/aws-cloudwatch-actions';
import { ISecurityGroup, SecurityGroup } from '@aws-cdk/aws-ec2';
import {
  DatabaseCluster,
  DatabaseClusterFromSnapshot,
  DatabaseClusterFromSnapshotProps,
  DatabaseClusterProps,
  DatabaseSecret,
  CfnEventSubscription,
} from '@aws-cdk/aws-rds';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import { ITopic } from '@aws-cdk/aws-sns';
import { Construct } from '@aws-cdk/core';

export interface FlexibleDatabaseClusterProps extends DatabaseClusterProps {
  readonly snapshotIdentifier?: DatabaseClusterFromSnapshotProps['snapshotIdentifier'];

  /**
   * Must be provided if `snapshotIdentifier` is set, and match admin username of snapshot.
   * This will be used to create a new secret with details from the database restored from the snapshot.
   */
  readonly username?: string;

  /**
   * Whether to enable CloudWatch alarms
   */
  readonly enableAlarms: boolean;

  /**
   * The low disk space threshold, in GB, that triggers an alarm
   */
  readonly diskAlarmThresholdGB?: number;

  /**
   * The low RAM threshold, in MB, that triggers an alarm
   */
  readonly ramAlarmThresholdMB?: number;

  /**
   * The SNS topic to send alarm notifications to
   */
  readonly alarmNotificationTopic?: ITopic;

  /**
   * Array of Security Groups to add to the DB Clusters, often to grant admin access from external networks
   */
  readonly adminSecurityGroups?: ISecurityGroup[];
}

export class FlexibleDatabaseCluster extends Construct {
  public cluster: DatabaseCluster | DatabaseClusterFromSnapshot;

  public secret?: ISecret;

  public defaultSecurityGroup: ISecurityGroup;

  constructor(scope: Construct, id: string, props: FlexibleDatabaseClusterProps) {
    super(scope, id);

    /** Create default db security group. This would normally be done by default by the DatabaseCluster construct, however
     * that construct doesn't export a usable sg attribute. This is important when we want to provide access to
     */
    this.defaultSecurityGroup = new SecurityGroup(this, 'DatabaseClusterSecurityGroup', {
      vpc: props.instanceProps.vpc,
    });

    // add to instance props
    const instanceProps = {
      ...props.instanceProps,
      securityGroups: [this.defaultSecurityGroup, ...(props.adminSecurityGroups || [])],
    };

    if (!!props.snapshotIdentifier) {
      this.cluster = new DatabaseClusterFromSnapshot(this, 'DatabaseCluster', {
        ...props,
        instanceProps,
        snapshotIdentifier: props.snapshotIdentifier,
      });

      if (!props.username)
        throw new Error('Must provide username prop when setting snapshotIdentfier');

      const dbSecret = new DatabaseSecret(this, 'DatabaseSecret', {
        username: props.username,
      });

      this.secret = dbSecret.attach(this.cluster);
    } else {
      const cluster = new DatabaseCluster(this, 'DatabaseCluster', {
        ...props,
        instanceProps,
      });
      this.cluster = cluster;
      this.secret = cluster.secret;
    }

    // observability alarms
    if (props.enableAlarms) {
      if (!props.alarmNotificationTopic)
        throw new Error('Must provide alarmNotificationTopic prop when alarms are enabled');

      const diskAlarm = new Alarm(this, 'DiskAlarm', {
        metric: this.cluster.metricFreeLocalStorage(),
        evaluationPeriods: 1, // 5 minutes
        // convert GB to bytes
        threshold: (props.diskAlarmThresholdGB || 10) * 1024 * 1024 * 1024,
        comparisonOperator: ComparisonOperator.LESS_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      diskAlarm.addAlarmAction(new SnsAction(props.alarmNotificationTopic));

      const ramAlarm = new Alarm(this, 'RamAlarm', {
        metric: this.cluster.metricFreeableMemory(),
        evaluationPeriods: 6, // 30 minutes
        // convert MB to bytes
        threshold: (props.ramAlarmThresholdMB || 10) * 1024 * 1024,
        comparisonOperator: ComparisonOperator.LESS_THAN_OR_EQUAL_TO_THRESHOLD,
      });

      ramAlarm.addAlarmAction(new SnsAction(props.alarmNotificationTopic));

      new CfnEventSubscription(this, 'EventSubscription', {
        snsTopicArn: props.alarmNotificationTopic.topicArn,
        enabled: true,
        eventCategories: [
          'creation',
          'deletion',
          'failover',
          'failure',
          'global-failover',
          'maintenance',
          'notification',
        ],
        sourceIds: [this.cluster.clusterIdentifier],
        sourceType: 'db-cluster',
      });
    }
  }
}
