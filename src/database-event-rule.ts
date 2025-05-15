import { IEventBus, IRuleTarget, Rule } from 'aws-cdk-lib/aws-events';
// @ts-ignore
// eslint-disable-next-line no-duplicate-imports
import type { RuleProps } from 'aws-cdk-lib/aws-events';
import { IDatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

/**
 * Category of the database instance event.
 *
 * Useful for filtering down to specific event types.
 *
 * @ref {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.Messages.html#USER_Events.Messages.instance}
 */
export enum DatabaseEventCategory {
  /** Database availability event: shutdown, restart, etc. */
  AVAILABILITY = 'availability',
  /** Database backup event: started backup, finished backup, etc. */
  BACKUP = 'backup',
  /**
   * Database configuration change event: updated parameter group, modified
   * instance class, reset credentials, etc.
   */
  CONFIGURATION_CHANGE = 'configuration change',
  /** Database creation event: instance created. */
  CREATION = 'creation',
  /** Database deletion event: instance deleted. */
  DELETION = 'deletion',
  /** Database failover event: failover started, failover complete, etc. */
  FAILOVER = 'failover',
  /** Database failure event: instance failure, etc. */
  FAILURE = 'failure',
  /** Database low storage event: storage exhausted, etc. */
  LOW_STORAGE = 'low storage',
  /** Database maintenance event: instance patched, version upgrade, etc. */
  MAINTENANCE = 'maintenance',
  /** Database maintenance failure event: update of Oracle time zone failed. */
  MAINTENANCE_FAILURE = 'maintenance, failure',
  /** Database maintenance notification event: time zone update, etc. */
  MAINTENANCE_NOTIFICATION = 'maintenance, notification',
  /**
   * Database notification event: patching delayed, operator issued
   * notification, exceeding best practices, etc. */
  NOTIFICATION = 'notification',
  /** Database read replica event: replication started, stopped, etc. */
  READ_REPLICA = 'read replica',
  /** Database recovery event: recovery started, complete. etc. */
  RECOVERY = 'recovery',
  /** Database restoration event: restored instance. */
  RESTORATION = 'restoration',
  /** Database security event: decrypting HSM password to update instance. */
  SECURITY = 'security',
  /** Database security patching event: system update available. */
  SECURITY_PATCHING = 'security patching',
}

/**
 * Properties for defining a database EventBridge rule.
 *
 * @see {@link RuleProps}
 */
export interface DatabaseEventRuleProps {
  /**
   * The scope to use if the source of the rule and its target are in
   * different Stacks (but in the same account & region). This helps dealing
   * with cycles that often arise in these situations.
   *
   * @default - none (the main scope will be used, even for cross-stack Events)
   */
  readonly crossStackScope?: Construct;

  /**
   * Database instance to monitor.
   */
  readonly database: IDatabaseInstance;

  /**
   * A description of the rule's purpose.
   *
   * @default - No description.
   */
  readonly description?: string;

  /**
   * Indicates whether the rule is enabled.
   *
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * The event bus to associate with this rule.
   *
   * @default - The default event bus.
   */
  readonly eventBus?: IEventBus;

  /**
   * Event categories to include in the event filter.
   *
   * @remarks
   * Set to an empty array include all event categories.
   *
   * @default [AVAILABILITY, FAILOVER]
   */
  readonly eventCategories?: DatabaseEventCategory[];

  /**
   * Event ids to include in the event filter.
   *
   * @example ['RDS-EVENT-0004', 'RDS-EVENT-0006', etc.]
   *
   * @default - No additional filtering.
   */
  readonly eventIds?: string[];

  /**
   * A name for the rule.
   *
   * @default - AWS CloudFormation generates a unique physical ID.
   */
  readonly ruleName?: string;

  /**
   * Targets to invoke when this rule matches an event.
   *
   * Input will be the full matched event. If you wish to specify custom
   * target input, use `addTarget(target[, inputOptions])`.
   *
   * @default - No targets.
   */
  readonly targets?: IRuleTarget[];
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
        DatabaseEventCategory.AVAILABILITY,
        DatabaseEventCategory.FAILOVER,
      ];

      const detail = {
        ...(categories.length > 0 ? { EventCategories: categories } : null),
        ...(eventIds ? { EventID: eventIds } : null),
      };

      return Object.keys(detail).length > 0 ? detail : null;
    }

    const detail = getDetail(props);

    super(scope, id, {
      crossStackScope: props.crossStackScope,
      description: props.description,
      enabled: props.enabled,
      eventBus: props.eventBus,
      ruleName: props.ruleName,
      targets: props.targets,
      eventPattern: {
        source: ['aws.rds'],
        detailType: ['RDS DB Instance Event'],
        resources: [props.database.instanceArn],
        ...(detail ? { detail } : null),
      },
    });
  }
}
