import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InstanceClass, InstanceSize, InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
  AuroraPostgresEngineVersion,
  DatabaseCluster,
  DatabaseClusterEngine,
} from 'aws-cdk-lib/aws-rds';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { FlagLevel, WellArchitectedAspectsFeatureFlags } from '../../../src';
import { SecurityAspects } from '../../../src/well-architected-aspects/aspects';
import { getErrorAnnotations, getWarningAnnotations } from '../../util';

describe('SecurityAspects', () => {
  describe('S3 Bucket Security', () => {
    test('Block public bucket access - autofix missing config', () => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: FlagLevel.FIX,
        },
      });

      const stack = new Stack(app);
      Aspects.of(stack).add(new SecurityAspects());

      new Bucket(stack, 'Bucket', {
        bucketName: 'test-bucket',
      });

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::S3::Bucket', {
        BucketName: 'test-bucket',
        PublicAccessBlockConfiguration: {
          BlockPublicPolicy: true,
          BlockPublicAcls: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
      });
    });

    test('Block public bucket access - autofix incomplete config', () => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: FlagLevel.FIX,
        },
      });

      const stack = new Stack(app);
      Aspects.of(stack).add(new SecurityAspects());

      new Bucket(stack, 'Bucket', {
        bucketName: 'test-bucket',
        blockPublicAccess: {
          blockPublicPolicy: undefined,
          blockPublicAcls: undefined,
          ignorePublicAcls: true,
          restrictPublicBuckets: true,
        },
      });

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::S3::Bucket', {
        BucketName: 'test-bucket',
        PublicAccessBlockConfiguration: {
          BlockPublicPolicy: true,
          BlockPublicAcls: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
      });
    });

    test('Block public bucket access - warn on explicitly public', () => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: FlagLevel.FIX,
        },
      });

      const stack = new Stack(app, 'TestStack');
      Aspects.of(stack).add(new SecurityAspects());

      new Bucket(stack, 'Bucket', {
        bucketName: 'test-bucket',
        blockPublicAccess: {
          blockPublicPolicy: false,
          blockPublicAcls: false,
          ignorePublicAcls: false,
          restrictPublicBuckets: false,
        },
        versioned: true, // remove the versioning warning
      });

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::S3::Bucket', {
        BucketName: 'test-bucket',
        PublicAccessBlockConfiguration: {
          BlockPublicPolicy: false,
          BlockPublicAcls: false,
          IgnorePublicAcls: false,
          RestrictPublicBuckets: false,
        },
      });

      const warnings = getWarningAnnotations(app.synth());
      expect(warnings).toEqual([
        {
          path: '/TestStack/Bucket/Resource',
          message:
            "publicAccessBlockConfiguration.blockPublicPolicy is explicity set to False. This is not recommended, but we're assuming you have a good reason for doing so. Continuing...",
        },
        {
          path: '/TestStack/Bucket/Resource',
          message:
            "publicAccessBlockConfiguration.blockPublicAcls is explicity set to False. This is not recommended, but we're assuming you have a good reason for doing so. Continuing...",
        },
      ]);
    });
  });

  describe('IAM Policy Best Practices', () => {
    test('No wildcard policies', () => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: FlagLevel.FIX,
        },
      });

      const stack = new Stack(app, 'TestStack');
      Aspects.of(stack).add(new SecurityAspects());

      const policy = new Policy(stack, 'Policy', {
        policyName: 'name',
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['*'],
            resources: ['*'],
          }),
        ],
      });

      const role = new Role(stack, 'Role', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      });

      role.attachInlinePolicy(policy);

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyName: 'name',
      });

      const errors = getErrorAnnotations(app.synth());
      expect(errors).toEqual([
        {
          path: '/TestStack/Policy/Resource',
          message:
            'Policy statement includes "Effect": "Allow" with "Action": "*" over "Resource" with "*". If a wildcard Resource is absolutely required, scope down the Actions in the statement.',
        },
      ]);
    });
  });

  describe('RDS Best Practices', () => {
    test('Storage should be encrypted', () => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: FlagLevel.FIX,
        },
      });

      const stack = new Stack(app, 'TestStack');
      Aspects.of(stack).add(new SecurityAspects());

      new DatabaseCluster(stack, 'DBCluster', {
        engine: DatabaseClusterEngine.auroraPostgres({
          version: AuroraPostgresEngineVersion.VER_10_20,
        }),
        instances: 2,
        instanceProps: {
          vpc: new Vpc(stack, 'VPC'),
          instanceType: InstanceType.of(InstanceClass.BURSTABLE4_GRAVITON, InstanceSize.MEDIUM),
        },
        storageEncrypted: false,
      });

      Template.fromStack(stack);
      const errors = getErrorAnnotations(app.synth());
      expect(errors).toEqual([
        {
          path: '/TestStack/DBCluster/Resource',
          message: 'Encryption at rest is not enabled',
        },
        {
          path: '/TestStack/DBCluster/Instance1',
          message: 'Encryption at rest is not enabled',
        },
        {
          path: '/TestStack/DBCluster/Instance2',
          message: 'Encryption at rest is not enabled',
        },
      ]);
    });
  });
});
