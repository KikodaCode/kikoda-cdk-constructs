import { Rule, RuleProps } from 'aws-cdk-lib/aws-events';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

export enum DatabaseEventCategories {
  AVAILABILITY = 'availability',
  BACKUP = 'backup',
  CONFIGURATION_CHANGE = 'configuration change',
  CREATION = 'creation',
  DELETION = 'deletion',
  FAILOVER = 'failover',
  FAILURE = 'failure',
  LOW_STORAGE = 'low storage',
  MAINTENANCE = 'maintenance',
  MAINTENANCE_FAILURE = 'maintenance, failure',
  MAINTENANCE_NOTIFICATION = 'maintenance, notification',
  NOTIFICATION = 'notification',
  READ_REPLICA = 'read replica',
  RECOVERY = 'recovery',
  RESTORATION = 'restoration',
  SECURITY = 'security',
  SECURITY_PATCHING = 'security patching',
}

export interface DatabaseEventRuleProps extends Omit<RuleProps, 'eventPattern'> {
  /**
   * Database instance to monitor.
   */
  database: DatabaseInstance;

  /**
   * Event categories to include in the event filter.
   *
   * @remarks
   * Set to an empty array include all event categories.
   *
   * @default [AVAILABILITY, FAILOVER]
   */
  eventCategories?: DatabaseEventCategories[];

  /**
   * Event ids to include in the event filter.
   *
   * @example ['RDS-EVENT-0004', 'RDS-EVENT-0006', etc.]
   *
   * @default No additional filtering
   */
  eventIds?: string[];
}

/**
 * Create a CloudWatch event rule which triggers for database instance events.
 *
 * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.Messages.html} for a listing of the RDS event categories and event messages.
 */
export class DatabaseEventRule extends Rule {
  constructor(scope: Construct, id: string, props: DatabaseEventRuleProps) {
    function getDetail({ eventCategories, eventIds }: DatabaseEventRuleProps) {
      const categories = eventCategories ?? [
        DatabaseEventCategories.AVAILABILITY,
        DatabaseEventCategories.FAILOVER,
      ];

      const detail = {
        ...(categories.length > 0 ? { EventCategories: categories } : null),
        ...(eventIds ? { EventID: eventIds } : null),
      };

      return Object.keys(detail).length > 0 ? detail : null;
    }

    const detail = getDetail(props);

    super(scope, id, {
      ...props,
      eventPattern: {
        source: ['aws.rds'],
        detailType: ['RDS DB Instance Event'],
        resources: [props.database.instanceArn],
        ...(detail ? { detail } : null),
      },
    });
  }
}
