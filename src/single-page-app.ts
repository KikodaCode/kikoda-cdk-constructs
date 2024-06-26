import { execSync, ExecSyncOptions } from 'child_process';
import { ArnFormat, AssetStaging, DockerImage, FileCopyOptions, Stack, Token } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation,
  ICertificate,
} from 'aws-cdk-lib/aws-certificatemanager';
import {
  SecurityPolicyProtocol,
  Distribution,
  ViewerProtocolPolicy,
  IOriginRequestPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, RecordTarget, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, BucketEncryption, CorsRule } from 'aws-cdk-lib/aws-s3';
import { AssetOptions } from 'aws-cdk-lib/aws-s3-assets';
import {
  BucketDeployment,
  BucketDeploymentProps,
  ISource,
  Source,
} from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { copySync } from 'fs-extra';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import minimatch = require('minimatch');

export interface SinglePageAppProps {
  /**
   * Provide an existing Hosted Zone to use for the domain. This property is required unless `onlyDefaultDomain` is `true`, in which case it will be ignored.
   */
  readonly hostedZone?: IHostedZone;

  /**
   * The domain name to use for the SPA. This property is required unless `onlyDefaultDomain` is `true`, in which case it will be ignored.
   */
  readonly domainName?: string;

  /**
   * Specify alternate domain names to use for the Cloudfront Distribution. This property will be ignored if `onlyDefaultDomain` is `true`.
   */
  readonly alternateDomainNames?: string[];

  /**
   * Specify an ARN of an ACM certificate to use for the Cloudfront Distribution. This is
   * useful when you are deploying to a region other than `us-east-1`, as Cloudfront
   * requires the certificate to be in `us-east-1`. This property will be ignored if `onlyDefaultDomain` is `true`.
   */
  readonly acmCertificateArn?: string;

  /**
   * Do not create or look up a hosted zone or certificates for the website. The website will be served under the default CloudFront domain only.
   * Setting this to `true` will ignore the values set for `acmCertificateArn`, `domainName`, `alternateDomainNames`, and `hostedZone`.
   *
   * @default false
   */
  readonly onlyDefaultDomain?: boolean;

  readonly indexDoc: string;
  readonly errorDoc?: string;

  /** list of glob patterns to exclude from the build artifact when deploying */
  readonly buildAssetExcludes?: FileCopyOptions['exclude'];

  readonly bundling?: AssetOptions['bundling'];

  /** This should be the full absolute path of root directory of the git repository. Dependending on your repository setup
   * this may be required for Docker-based bundling. This path, if provided will be used as the mount point
   * for the Docker container during bundling. If this is not provided, the `appDir` path will be used.
   */
  readonly repoRoot?: string;

  /** The full absolute path of the Single Page App */
  readonly appDir: string;

  /** Specify with `buildCommand` to configure bundling. This should be the path relative to `appDir`
   * that contains the build output/artifacts
   */
  readonly buildDir?: string;

  /** Specify a build command to use with the default bundling options, or specify the `bundling` prop */
  readonly buildCommand?: string;
  readonly blockPublicAccess?: BlockPublicAccess;
  readonly bucketCorsRules?: CorsRule[];
  readonly viewerProtocolPolicy?: ViewerProtocolPolicy;
  readonly securityPolicy?: SecurityPolicyProtocol;
  readonly originRequestPolicy?: IOriginRequestPolicy;
  readonly cloudfrontInvalidationPaths?: BucketDeploymentProps['distributionPaths'];
}

/**
 * A construct that deploys a Single Page App using S3 and Cloudfront. This construct
 * will create a S3 bucket, deploy the contents of the specified directory to the bucket,
 * and create a Cloudfront distribution that serves the contents of the bucket.
 */
export class SinglePageApp extends Construct {
  public readonly distribution: Distribution;
  public readonly websiteBucket: Bucket;
  public bucketDeployment?: BucketDeployment;
  public sourceAsset: ISource;

  constructor(scope: Construct, id: string, props: SinglePageAppProps) {
    super(scope, id);

    // check domain props
    if (
      !props.onlyDefaultDomain &&
      (props.domainName === undefined || props.hostedZone === undefined)
    ) {
      throw new Error(
        `domainName and hostedZone must be provided if onlyDefaultDomain is not true`,
      );
    }

    let certificate: ICertificate | undefined = undefined;

    if (!props.onlyDefaultDomain) {
      // Resolve the ACM certificate if provided or create one
      if (props.acmCertificateArn) {
        const certificateRegion = Stack.of(this).splitArn(
          props.acmCertificateArn,
          ArnFormat.SLASH_RESOURCE_NAME,
        ).region;

        if (!Token.isUnresolved(certificateRegion) && certificateRegion !== 'us-east-1') {
          throw new Error(
            `The certificate must be in the us-east-1 region and the certificate you provided is in ${certificateRegion}.`,
          );
        }

        certificate = Certificate.fromCertificateArn(this, 'Certificate', props.acmCertificateArn);
      }
      // Create a new certificate only if all the domain names are in the same hosted zone
      else if (
        props.alternateDomainNames?.every(domainName =>
          domainName.endsWith(props.hostedZone!.zoneName),
        ) ||
        !props.alternateDomainNames
      ) {
        certificate = new Certificate(this, 'Certificate', {
          domainName: props.domainName!,
          subjectAlternativeNames: props.alternateDomainNames,
          validation: CertificateValidation.fromDns(props.hostedZone),
        });
      }
      // If the domain names are not in the same hosted zone and no certArn was provided, throw an error
      else {
        throw new Error(
          'The alternate domain names must be in the same hosted zone as the domain name or you must provide an ACM certificate with the acmCertificateArn prop.',
        );
      }
    }

    this.websiteBucket = new Bucket(this, 'WebsiteBucket', {
      publicReadAccess: false,
      blockPublicAccess: props.blockPublicAccess,
      encryption: BucketEncryption.S3_MANAGED,
    });

    if (props.bucketCorsRules) {
      props.bucketCorsRules.forEach((rule: CorsRule) => {
        this.websiteBucket.addCorsRule(rule);
      });
    }

    this.distribution = new Distribution(this, 'CloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(this.websiteBucket),
        viewerProtocolPolicy: props.viewerProtocolPolicy ?? ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: props.originRequestPolicy,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: props.errorDoc ? `/${props.errorDoc}` : `/${props.indexDoc}`,
          responseHttpStatus: 200,
        },
        {
          httpStatus: 404,
          responsePagePath: props.errorDoc ? `/${props.errorDoc}` : `/${props.indexDoc}`,
          responseHttpStatus: 200,
        },
      ],
      domainNames: props.onlyDefaultDomain
        ? undefined
        : [props.domainName!, ...(props.alternateDomainNames ?? [])],
      certificate,
      minimumProtocolVersion: props.securityPolicy ?? SecurityPolicyProtocol.TLS_V1_2_2021,
    });
    // console.log(this.distribution);

    let assetOpts: AssetOptions = {
      exclude: props.buildAssetExcludes,
      bundling: props.bundling,
    };

    if (!assetOpts.bundling && props.buildCommand) {
      const execOptions: ExecSyncOptions = {
        stdio: ['ignore', process.stderr, 'inherit'],
      };
      const buildCmd = `cd ${props.appDir} && ${props.buildCommand}`;

      assetOpts = {
        bundling: {
          local: {
            tryBundle: outputDir => {
              try {
                execSync('node -v', execOptions);
              } catch {
                console.log(
                  'Local bundling dependencies not found, falling back to docker-based build...',
                );
                return false;
              }

              execSync(buildCmd, execOptions);
              copySync(`${props.appDir}/${props.buildDir}`, outputDir, {
                dereference: true,
                filter: (src: string) => {
                  // remove the appDir from the path
                  const relativePath = src.replace(`${props.appDir}/${props.buildDir}/`, '');

                  // check to see if props.buildAssetExcludes includes the glob pattern for src
                  if (props.buildAssetExcludes) {
                    for (const pattern of props.buildAssetExcludes) {
                      if (minimatch(relativePath, pattern)) {
                        return false;
                      }
                    }
                  }
                  return true;
                },
              });

              return true;
            },
          },
          image: DockerImage.fromRegistry('node:16'),
          command: [
            'bash',
            '-c',
            `${buildCmd}  && cp -a ${props.buildDir}/* ${AssetStaging.BUNDLING_OUTPUT_DIR}/`,
          ],
          user: 'root',
        },
      };
    }

    this.sourceAsset = Source.asset(props.repoRoot || props.appDir, assetOpts);

    this.bucketDeployment = new BucketDeployment(this, 'BucketDeployment', {
      sources: [this.sourceAsset],
      destinationBucket: this.websiteBucket,
      prune: false,
      distribution: props.cloudfrontInvalidationPaths ? this.distribution : undefined,
      distributionPaths: props.cloudfrontInvalidationPaths,
    });

    if (!props.onlyDefaultDomain) {
      // Create an ALIAS record for all the specified domain names
      [props.domainName!, ...(props.alternateDomainNames || [])].forEach(domainName => {
        // only create the record if it's in the provided hosted zone
        if (domainName.endsWith(props.hostedZone!.zoneName)) {
          new ARecord(this, `Alias-${domainName}`, {
            zone: props.hostedZone!,
            recordName: domainName,
            target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
          });
        }
      });
    }
  }

  /**
   * Disable the default bucket deployment. This method will return
   * the source asset that would have been used for the deployment.
   * This can be used to create a custom deployment.
   */
  public disableBucketDeployment() {
    this.bucketDeployment = undefined;

    return this.sourceAsset;
  }
}
