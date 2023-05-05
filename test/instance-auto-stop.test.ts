import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { InstanceAutoStop } from '../src';

describe('InstanceAutoStop', () => {
  const stack = new Stack();
  const instance = new Instance(stack, 'Instance', {
    vpc: new Vpc(stack, 'Vpc'),
    instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
    machineImage: MachineImage.latestAmazonLinux2(),
  });

  new InstanceAutoStop(stack, 'InstanceAutoStop', {
    instance,
    schedule: Schedule.cron({ minute: '0', hour: '8' }),
  });

  const template = Template.fromStack(stack);

  it('should create an IAM role with correct permissions', () => {
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'ssm.amazonaws.com',
            },
          },
        ],
      },
      Policies: [
        Match.objectLike({
          PolicyDocument: {
            Statement: [
              {
                Action: ['ec2:StopInstances', 'ec2:DescribeInstances'],
              },
            ],
          },
        }),
      ],
    });
  });

  it('should create an Event Rule using the correct SSM document and Schedule expression', () => {
    template.hasResourceProperties('AWS::Events::Rule', {
      ScheduleExpression: 'cron(0 8 * * ? *)',
      Targets: [
        {
          Arn: {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':ssm:',
                {
                  Ref: 'AWS::Region',
                },
                '::automation-definition/AWS-StopEC2Instance:$DEFAULT',
              ],
            ],
          },
          // make sure the instance id and ssm role are passed as parameters
          Input: {
            'Fn::Join': [
              '',
              [
                '{"InstanceId":["',
                {
                  Ref: Match.stringLikeRegexp('Instance*'),
                },
                '"],"AutomationAssumeRole":["',
                {
                  'Fn::GetAtt': [
                    Match.stringLikeRegexp('InstanceAutoStopSSMAutomationRole*'),
                    'Arn',
                  ],
                },
                '"]}',
              ],
            ],
          },
        },
      ],
    });
  });
});
