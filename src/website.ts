import { ConfigManifest, GeneratedConfig, AdditionalConfigObject } from '@kikoda/generated-config';
import { OriginRequestPolicy, SecurityPolicyProtocol } from 'aws-cdk-lib/aws-cloudfront';
import { HostedZone, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { SinglePageApp, SinglePageAppProps } from './single-page-app';
import { WebConfig } from './web-config';

/** Presets used for invalidation after deployments to Cloudfront Distributions */
export const DistributionPathsConfig = {
  /** Typical React app build with Create React App/react-scripts
   * that includes a custom config file and config-manifest.json
   */
  REACT_APP: [
    '/asset-manifest.json',
    '/config-manifest.json',
    '/index.html',
    '/manifest.json',
    '/robots.txt',
  ],
};

export interface GenerateWebConfigProps extends AdditionalConfigObject {
  /** The directory where base (optional) and stage level config (json) files are stored. This
   * should be relative to `appDir`. When using `generateConfig`, there needs to at least be a
   * `${stage}.config.json` in this directory. You can optionally include a `base.config.json`
   * file that all stage configs will inherit from (likewise you can override base config values
   * in stage level configs if needed).
   */
  readonly configDir: string;
}

export interface WebsiteProps {
  /** String indicator of which environment/stage is being deployed ex. 'dev', 'test', 'prod' */
  readonly stage: string;

  /** This should be the root directory of the git repository. Dependending on your repository setup
   * this may be required for Docker-based bundling. This path, if provided will be used as the mount point
   * for the Docker container during bundling. If this is not provided, the `appDir` path will be used.
   */
  readonly repoRoot?: string;

  /** The full absolute path of the Single Page App */
  readonly appDir: string;

  /** The command for building the website (e.g. "yarn run build"). */
  readonly buildCommand?: string;

  /** Path to the build output, relative to the `appDir` */
  readonly buildDir?: string;

  /**
   * Provide an array of glob patterns to exclude from the build output. This is useful if you have
   * files that are generated during the build process that you don't want to include in the
   * final build output.
   */
  readonly buildAssetExcludes?: string[];

  readonly bundling?: SinglePageAppProps['bundling'];

  /** The name of the index document to load, typically 'index.html'
   *
   * @default "index.html"
   */
  readonly indexDoc?: string;

  /** Specify options for gernerating a web config from base and stage level configs. Must
   * enable `generateWebConfig`
   */
  readonly generateWebConfigProps?: GenerateWebConfigProps;

  /**
   * Specify a domain name to use for the website.
   */
  readonly domainName: string;

  /**
   * Specify an existing hosted zone to use for the website.
   *
   * @default - This construct will try to lookup an existing hosted zone for the domain name provided.
   */
  readonly hostedZone?: IHostedZone;

  /** Setup S3 bucket and Cloudfront distribution to allow CORS requests. Optionally specificy the allowed Origins with `corsAllowedOrigins` */
  readonly enableCors?: boolean;

  /** Specify a list of allowed request origins to use when configuring CORS (must also specify `enableCors`)
   * @default ['*']
   */
  readonly corsAllowedOrigins?: string[];

  /** Specify the paths to be invalidated in the Cloudfront Distribution at the end of the deployment
   * @default - wildcard invalidation ['/*']
   */
  readonly cloudfrontInvalidationPaths?: string[];
}

/** Deploy a single page app with a standard static website architecture to AWS using CloudFront, S3, and Route53. This is typically
 * coupled with the `configProvider` hooks in the `@kikoda/delivery-hooks` package using the `generateWebConfig`
 * and `generateWebConfigProps` options.
 */
export class Website extends Construct {
  /** Full website endpoint w/protocol. */
  public readonly endpoint: string;
  public readonly generatedWebConfig?: GeneratedConfig<AdditionalConfigObject>;

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    const {
      stage,
      domainName,
      hostedZone,
      appDir,
      buildDir,
      indexDoc,
      generateWebConfigProps,
      bundling,
      buildCommand,
    } = props;

    // export endpoint
    this.endpoint = `https://${domainName}`;

    const spa = new SinglePageApp(this, 'Spa', {
      hostedZone: hostedZone ?? HostedZone.fromLookup(this, 'HostedZone', { domainName }),
      domainName,
      appDir,
      buildDir,
      buildAssetExcludes: [
        ...(props.buildAssetExcludes ?? []),
        ...[ConfigManifest.CONFIG_MANIFEST_FILENAME, '*.config.json'],
      ],
      buildCommand,
      bundling,
      indexDoc: indexDoc ?? 'index.html',
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
      originRequestPolicy: props.enableCors ? OriginRequestPolicy.CORS_S3_ORIGIN : undefined,
      bucketCorsRules: props.enableCors
        ? [
            {
              allowedHeaders: ['*'],
              allowedMethods: [HttpMethods.GET],
              allowedOrigins: props.corsAllowedOrigins ?? ['*'],
              exposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2'],
              maxAge: 3000,
            },
          ]
        : undefined,
      // If we're not deploying a webconfig, we'll pass the invalidation paths through to the SPA construct
      cloudfrontInvalidationPaths: !generateWebConfigProps
        ? props.cloudfrontInvalidationPaths
        : undefined,
    });

    // create frontend config file asset
    if (!!generateWebConfigProps) {
      // generate dynamic config
      const { configDir, additionalConfig } = generateWebConfigProps;
      this.generatedWebConfig = new GeneratedConfig({
        stage,
        srcPath: appDir,
        configDir,
        additionalConfig,
      });

      new WebConfig(this, 'WebConfig', {
        spa,
        config: this.generatedWebConfig.config,
        configFileName: this.generatedWebConfig.fileName,
        cloudfrontInvalidationPaths: props.cloudfrontInvalidationPaths ?? ['/*'],
      });
    }
  }
}
