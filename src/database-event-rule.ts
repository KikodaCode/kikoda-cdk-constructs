import { IEventBus, IRuleTarget, Rule, Schedule } from 'aws-cdk-lib/aws-events';
// @ts-ignore
// eslint-disable-next-line no-duplicate-imports
import type { RuleProps } from 'aws-cdk-lib/aws-events';
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

/**
 * Properties for defining a database EventBridge rule.
 *
 * @see {@link RuleProps}
 */
export interface DatabaseEventRuleProps {
  /**
   * The scope to use if the source of the rule and its target are in different Stacks
   * (but in the same account & region).
   * This helps dealing with cycles that often arise in these situations.
   *
   * @default - none (the main scope will be used, even for cross-stack Events)
   */
  readonly crossStackScope?: Construct;

  /**
   * Database instance to monitor.
   */
  readonly database: DatabaseInstance;

  /**
   * A description of the rule's purpose.
   *
   * @default - No description
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
  readonly eventCategories?: DatabaseEventCategories[];

  /**
   * Event ids to include in the event filter.
   *
   * @example ['RDS-EVENT-0004', 'RDS-EVENT-0006', etc.]
   *
   * @default No additional filtering
   */
  readonly eventIds?: string[];

  /**
   * A name for the rule.
   *
   * @default AWS CloudFormation generates a unique physical ID.
   */
  readonly ruleName?: string;

  /**
   * The schedule or rate (frequency) that determines when EventBridge
   * runs the rule.
   *
   * You must specify this property, the `eventPattern` property, or both.
   *
   * For more information, see Schedule Expression Syntax for
   * Rules in the Amazon EventBridge User Guide.
   *
   * @see https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html
   *
   * @default - None.
   */
  readonly schedule?: Schedule;

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
