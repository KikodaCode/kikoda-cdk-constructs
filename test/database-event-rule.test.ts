import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from 'aws-cdk-lib/aws-rds';
import { DatabaseEventCategories, DatabaseEventRule } from '../src';

function initialize() {
  const stack = new Stack();
  const vpc = new Vpc(stack, 'VPC');
  const database = new DatabaseInstance(stack, 'Database', {
    engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_15_2 }),
    vpc,
  });

  return { database, stack, vpc };
}

describe('DatabaseEventRule', () => {
  test('with default props', () => {
    const { database, stack } = initialize();

    new DatabaseEventRule(stack, 'DatabaseEventRule', { database });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Events::Rule', {
      EventPattern: {
        source: ['aws.rds'],
        detail: Match.objectEquals({ EventCategories: ['availability', 'failover'] }),
      },
    });
  });

  test('with specific event category filtering', () => {
    const eventCategories = [
      DatabaseEventCategories.FAILURE,
      DatabaseEventCategories.LOW_STORAGE,
      DatabaseEventCategories.MAINTENANCE_FAILURE,
    ];
    const { database, stack } = initialize();

    new DatabaseEventRule(stack, 'DatabaseEventRule', { database, eventCategories });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Events::Rule', {
      EventPattern: {
        source: ['aws.rds'],
        detail: Match.objectEquals({
          EventCategories: eventCategories,
        }),
      },
    });
  });

  test('with event id filtering', () => {
    const eventIds = ['RDS-EVENT-004', 'RDS-EVENT-006', 'RDS-EVENT-008'];
    const { database, stack } = initialize();

    new DatabaseEventRule(stack, 'DatabaseEventRule', { database, eventIds });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Events::Rule', {
      EventPattern: {
        source: ['aws.rds'],
        detail: Match.objectEquals({
          EventCategories: ['availability', 'failover'],
          EventID: eventIds,
        }),
      },
    });
  });

  test('with no filtering', () => {
    const { database, stack } = initialize();

    new DatabaseEventRule(stack, 'DatabaseEventRule', {
      database,
      eventCategories: [],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Events::Rule', {
      EventPattern: {
        source: ['aws.rds'],
        detail: Match.absent(),
      },
    });
  });
});
