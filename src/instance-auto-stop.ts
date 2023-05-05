import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as events from 'aws-cdk-lib/aws-events';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as constructs from 'constructs';
import * as targets from './aws-events-targets';
import * as ssm from './aws-ssm';

export interface InstanceAutoStopProps {
  /**
   * The Instance to stop on a schedule.
   */
  readonly instance: ec2.IInstance;

  /**
   * The schedule to stop the instance.
   */
  readonly schedule: events.Schedule;
}

/**
 * `InstanceAutoStop` creates an AWS CloudWatch Event Rule that stops an EC2 instance on a schedule.
 */
export class InstanceAutoStop extends constructs.Construct {
  constructor(scope: constructs.Construct, id: string, props: InstanceAutoStopProps) {
    super(scope, id);

    const stopPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ['ec2:StopInstances', 'ec2:DescribeInstances'],
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
        EC2Stop: stopPolicy,
      },
    });

    new events.Rule(this, 'InstanceStopRule', {
      schedule: props.schedule,
      targets: [
        new targets.SsmAutomation(
          ssm.AutomationDocument.fromAutomationDocumentName(
            this,
            'StopEC2Doc',
            'AWS-StopEC2Instance:$DEFAULT',
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
