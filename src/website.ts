import { ConfigManifest, GeneratedConfig, IAdditionalConfig } from '@kikoda/generated-config';
import { AssetOptions } from 'aws-cdk-lib';
import { OriginRequestPolicy, SecurityPolicyProtocol } from 'aws-cdk-lib/aws-cloudfront';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { SinglePageApp } from './single-page-app';
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

export interface GenerateWebConfigProps extends IAdditionalConfig {
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

  readonly bundling?: AssetOptions['bundling'];

  /** The name of the index document to load, typically 'index.html'
   *
   * @default "index.html"
   */
  readonly indexDoc?: string;

  /** Specify options for gernerating a web config from base and stage level configs. Must
   * enable `generateWebConfig`
   */
  readonly generateWebConfigProps?: GenerateWebConfigProps;

  /** Top level domain for the site. This should match an existing hosted zone in R53. eg. example.com */
  readonly baseDomain: string;

  /** Sub-domain for the site. eg <subdomain>.example.com */
  readonly subdomain: string;

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
  public readonly generatedWebConfig?: GeneratedConfig<IAdditionalConfig>;

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    const {
      stage,
      baseDomain,
      subdomain,
      appDir,
      buildDir,
      indexDoc,
      generateWebConfigProps,
      bundling,
      buildCommand,
    } = props;

    // export endpoint
    this.endpoint = `https://${subdomain}.${baseDomain}`;

    const spa = new SinglePageApp(this, 'Spa', {
      zoneName: baseDomain,
      subdomain,
      appDir,
      buildDir,
      buildAssetExcludes: [ConfigManifest.CONFIG_MANIFEST_FILENAME, '*.config.json'],
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
        config: this.generatedWebConfig,
        configFileName: this.generatedWebConfig.fileName,
        cloudfrontInvalidationPaths: props.cloudfrontInvalidationPaths ?? ['/*'],
      });
    }
  }
}
