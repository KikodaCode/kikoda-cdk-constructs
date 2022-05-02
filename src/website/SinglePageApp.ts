import { execSync, ExecSyncOptions } from "child_process";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  SecurityPolicyProtocol,
  Distribution,
  ViewerProtocolPolicy,
  IOriginRequestPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  HostedZone,
  ARecord,
  RecordTarget,
  HostedZoneProviderProps,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  CorsRule,
} from "aws-cdk-lib/aws-s3";
import { AssetOptions } from "aws-cdk-lib/aws-s3-assets";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { DockerImage, FileCopyOptions } from "aws-cdk-lib/core";
import { Construct } from "constructs";

export interface SinglePageAppProps {
  readonly zoneName: HostedZoneProviderProps["domainName"];
  readonly subdomain?: string;
  readonly indexDoc: string;
  readonly errorDoc?: string;

  /** list of files to exclude from the build artifact when deploying */
  readonly buildAssetExcludes?: FileCopyOptions["exclude"];

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
  readonly bundling?: AssetOptions["bundling"];
  readonly blockPublicAccess?: BlockPublicAccess;
  readonly bucketCorsRules?: CorsRule[];
  readonly viewerProtocolPolicy?: ViewerProtocolPolicy;
  readonly securityPolicy?: SecurityPolicyProtocol;
  readonly originRequestPolicy?: IOriginRequestPolicy;
}

/**
 * S3 Deployment, cloudfront distribution, ssl cert and error forwarding auto
 * configured by using the details in the hosted zone provided
 */
export class SinglePageApp extends Construct {
  public readonly distribution: Distribution;
  public readonly websiteBucket: Bucket;

  constructor(scope: Construct, id: string, props: SinglePageAppProps) {
    super(scope, id);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: props.zoneName,
    });
    const domainName = props.subdomain
      ? `${props.subdomain}.${props.zoneName}`
      : props.zoneName;

    const cert = new DnsValidatedCertificate(this, "Certificate", {
      hostedZone,
      domainName,
    });

    this.websiteBucket = new Bucket(this, "WebsiteBucket", {
      publicReadAccess: false,
      blockPublicAccess: props.blockPublicAccess,
      encryption: BucketEncryption.S3_MANAGED,
    });

    if (props.bucketCorsRules) {
      props.bucketCorsRules.forEach((rule: CorsRule) => {
        this.websiteBucket.addCorsRule(rule);
      });
    }

    this.distribution = new Distribution(this, "CloudfrontDistribution", {
      defaultBehavior: {
        origin: new S3Origin(this.websiteBucket),
        viewerProtocolPolicy:
          props.viewerProtocolPolicy ?? ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: props.originRequestPolicy,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: props.errorDoc
            ? `/${props.errorDoc}`
            : `/${props.indexDoc}`,
          responseHttpStatus: 200,
        },
        {
          httpStatus: 404,
          responsePagePath: props.errorDoc
            ? `/${props.errorDoc}`
            : `/${props.indexDoc}`,
          responseHttpStatus: 200,
        },
      ],
      domainNames: [domainName],
      certificate: cert,
      minimumProtocolVersion:
        props.securityPolicy ?? SecurityPolicyProtocol.TLS_V1_2_2021,
    });

    let assetOpts: AssetOptions = {
      exclude: props.buildAssetExcludes,
      bundling: props.bundling,
    };

    if (!assetOpts.bundling && props.buildCommand) {
      const execOptions: ExecSyncOptions = {
        stdio: ["ignore", process.stderr, "inherit"],
      };
      const buildCmd = `cd ${props.appDir} && ${props.buildCommand}`;

      assetOpts = {
        bundling: {
          local: {
            tryBundle: (outputDir) => {
              try {
                execSync("node -v", execOptions);
              } catch {
                console.log(
                  "Local bundling dependencies not found, falling back to docker-based build..."
                );
                return false;
              }

              execSync(
                `${buildCmd} && cp -a ${props.buildDir}/* ${outputDir}/`,
                execOptions
              );
              return true;
            },
          },
          image: DockerImage.fromRegistry("node:16"),
          command: [
            "bash",
            "-c",
            `${buildCmd}  && cp -a ${props.buildDir}/* /asset-output/`,
          ],
          user: "root",
        },
      };
    }

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset(props.repoRoot || props.appDir, assetOpts)],
      destinationBucket: this.websiteBucket,
      prune: false,
    });

    new ARecord(this, "Alias", {
      zone: hostedZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
    });
  }
}
