import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as events from 'aws-cdk-lib/aws-events';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as constructs from 'constructs';
import * as targets from './aws-events-targets';
import * as ssm from './aws-ssm';

export interface InstanceAutoStartProps {
  /**
   * The Instance to start on a schedule.
   */
  readonly instance: ec2.IInstance;

  /**
   * The schedule to start the instance.
   */
  readonly schedule: events.Schedule;
}

/**
 * `InstanceAutoStart` creates an AWS CloudWatch Event Rule that starts an EC2 instance on a schedule.
 */
export class InstanceAutoStart extends constructs.Construct {
  constructor(scope: constructs.Construct, id: string, props: InstanceAutoStartProps) {
    super(scope, id);

    const startPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ['ec2:StartInstances', 'ec2:DescribeInstances'],
          resources: [
            cdk.Arn.format(
              { service: 'ec2', resource: 'instance', resourceName: props.instance.instanceId },
              cdk.Stack.of(this),
            ),
          ],
        }),
      ],
    });

    const ssmAssumeRole = new iam.Role(this, 'SSMAutomationRole', {
      assumedBy: new iam.ServicePrincipal('ssm.amazonaws.com'),
      inlinePolicies: {
        EC2Start: startPolicy,
      },
    });

    new events.Rule(this, 'InstanceStartRule', {
      schedule: props.schedule,
      targets: [
        new targets.SsmAutomation(
          ssm.AutomationDocument.fromAutomationDocumentName(
            this,
            'StartEC2Doc',
            'AWS-StartEC2Instance:$DEFAULT',
          ),
          {
            parameters: {
              InstanceId: [props.instance.instanceId],
            },
            ssmAssumeRole,
          },
        ),
      ],
    });
  }
}
