/**
 * Well Architected Framework - Security Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html
 */

import { Annotations, IAspect } from 'aws-cdk-lib';
import { CfnPolicy, Effect } from 'aws-cdk-lib/aws-iam';
import { CfnDBCluster } from 'aws-cdk-lib/aws-rds';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';

import { FlagBasedAnnotator, FlagLevel, WellArchitectedAspectsFeatureFlags } from '.';

interface PolicyDocument {
  statements: {
    effect: Effect;
    action: string[];
    resource: string[];
  }[];
}

export class SecurityAspects implements IAspect {
  public visit(node: IConstruct): void {
    /** S3 Bucket Security */
    if (node instanceof CfnBucket) {
      /**
       * Checks if your Amazon S3 bucket either has the Amazon S3 default encryption enabled. The rule
       * is NON_COMPLIANT if your Amazon S3 bucket is not encrypted by default.
       *
       * @link https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-server-side-encryption-enabled.html
       */
      if (!node.bucketEncryption) {
        Annotations.of(node).addError('S3 bucket encryption is not enabled');
      }

      /**
       * Check if versioning is enable for your S3 Buckets.
       *
       * @link https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-versioning-enabled.html
       */
      if (!node.versioningConfiguration) {
        Annotations.of(node).addWarning(
          'S3 bucket versioning is not enabled. Versioning is recommended however, you can explicity disable versioning for a bucket if applicable to remove this warning.',
        );
      }

      /**
       * Checks if your Amazon S3 buckets do not allow public read access. The rule checks the Block Public Access
       * settings, the bucket policy, and the bucket access control list (ACL).
       *
       * The rule is compliant when both of the following are true:
       *  - The Block Public Access setting restricts public policies or the bucket policy does not allow public read access.
       *  - The Block Public Access setting restricts public ACLs or the bucket ACL does not allow public read access.
       *
       * The rule is noncompliant when:
       *  - If the Block Public Access setting does not restrict public policies, AWS Config evaluates whether the policy allows
       *    public read access. If the policy allows public read access, the rule is noncompliant.
       *  - If the Block Public Access setting does not restrict public bucket ACLs, AWS Config evaluates whether the bucket ACL
       *    allows public read access. If the bucket ACL allows public read access, the rule is noncompliant.
       *
       * @link https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-read-prohibited.html
       */
      const { annotate, flagLevel } = new FlagBasedAnnotator(
        node,
        WellArchitectedAspectsFeatureFlags.BlockPublicBuckets,
      );
      const config =
        node.publicAccessBlockConfiguration as CfnBucket.PublicAccessBlockConfigurationProperty;

      if (!config) {
        let message = 'Block Public Access is not configured for this bucket';

        if (flagLevel === FlagLevel.FIX) {
          message +=
            '. Automatically configuring publicAccessBlockConfiguration to block public access';

          node.addPropertyOverride('PublicAccessBlockConfiguration', {
            BlockPublicPolicy: true,
            BlockPublicAcls: true,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true,
          });
        }

        annotate(message);
      } else {
        if (config.blockPublicPolicy === false) {
          Annotations.of(node).addWarning(
            "publicAccessBlockConfiguration.blockPublicPolicy is explicity set to False. This is not recommended, but we're assuming you have a good reason for doing so. Continuing...",
          );
        } else if (!config.blockPublicPolicy) {
          let message = 'Block Public Access settings do not restrict public policies';

          if (flagLevel === FlagLevel.FIX) {
            message +=
              '. Automatically setting publicAccessBlockConfiguration.blockPublicPolicy to True';

            node.addPropertyOverride('PublicAccessBlockConfiguration.BlockPublicPolicy', true);
          }

          annotate(message);
        }

        if (config.blockPublicAcls === false) {
          Annotations.of(node).addWarning(
            "publicAccessBlockConfiguration.blockPublicAcls is explicity set to False. This is not recommended, but we're assuming you have a good reason for doing so. Continuing...",
          );
        } else if (!config.blockPublicAcls) {
          let message = 'Block Public Access settings do not restrict public bucket ACLs';

          if (flagLevel === FlagLevel.FIX) {
            message +=
              '. Automatically setting publicAccessBlockConfiguration.blockPublicAcls to True';

            node.addPropertyOverride('PublicAccessBlockConfiguration.BlockPublicAcls', true);
          }

          annotate(message);
        }
      }
    }

    /** IAM Policy Best Practices */
    if (node instanceof CfnPolicy) {
      /**
       * Checks the IAM policies that you create for Allow statements that grant permissions to all actions on
       * all resources. The rule is NON_COMPLIANT if any policy statement includes:
       *
       * "Effect": "Allow" with "Action": "*" over "Resource": "*".
       *
       * @link https://docs.aws.amazon.com/config/latest/developerguide/iam-policy-no-statements-with-admin-access.html
       */
      const policy = node.policyDocument as PolicyDocument;

      // eslint-disable-next-line no-restricted-syntax
      for (const { effect, action, resource } of policy.statements) {
        if (
          effect === Effect.ALLOW &&
          !!action.find(a => a === '*') &&
          !!resource.find(r => r.includes('*'))
        ) {
          Annotations.of(node).addError(
            'Policy statement includes "Effect": "Allow" with "Action": "*" over "Resource" with "*". If a wildcard Resource is absolutely required, scope down the Actions in the statement.',
          );
        }
      }
    }

    /** RDS Best Practices */
    if (node instanceof CfnDBCluster) {
      /**
       * Checks whether storage encryption is enabled for your RDS DB instances. If a `snapshotIdentifier` is
       * specified, encryption settings will be inherited from the snapshot.
       *
       * @link https://docs.aws.amazon.com/config/latest/developerguide/rds-storage-encrypted.html
       */
      if (node.storageEncrypted !== true && node.snapshotIdentifier === undefined) {
        Annotations.of(node).addError('Encryption at rest is not enabled');
      }
    }
  }
}