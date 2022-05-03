import {
  OriginRequestPolicy,
  SecurityPolicyProtocol,
} from "aws-cdk-lib/aws-cloudfront";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { HttpMethods } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { AssetOptions, Stack } from "aws-cdk-lib/core";
import {
  AwsCustomResource,
  PhysicalResourceId,
  AwsCustomResourcePolicy,
} from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";

import md5 from "md5";
import { v4 as uuid } from "uuid";
import { GeneratedConfig } from "./GeneratedConfig";
import { SinglePageApp } from "./SinglePageApp";

/** Presets used for invalidation after deployments to Cloudfront Distributions */
export const DistributionPathsConfig = {
  /** Typical React app build with Create React App/react-scripts
   * that includes a custom config file and config-manifest.json
   */
  ReactApp: [
    "/asset-manifest.json",
    "/config-manifest.json",
    "/index.html",
    "/manifest.json",
    "/robots.txt",
  ],
};

export interface GenerateWebConfigProps {
  /** The directory where base (optional) and stage level config (json) files are stored. This
   * should be relative to `appDir`. When using `generateConfig`, there needs to at least be a
   * `${stage}.config.json` in this directory. You can optionally include a `base.config.json`
   * file that all stage configs will inherit from (likewise you can override base config values
   * in stage level configs if needed).
   */
  readonly configDir: string;

  /** Provide any additional configuration items to add to the generated configuration file. This
   * will be added to the config as the `additionalConfig` attribute.
   */
  readonly additionalConfig?: object;
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

  readonly bundling?: AssetOptions["bundling"];

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

    const website = new SinglePageApp(this, "Spa", {
      zoneName: baseDomain,
      subdomain,
      appDir,
      buildDir,
      buildAssetExcludes: !!generateWebConfigProps
        ? ["config-manifest.json"]
        : undefined,
      buildCommand,
      bundling,
      indexDoc: indexDoc ?? "index.html",
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
      originRequestPolicy: props.enableCors
        ? OriginRequestPolicy.CORS_S3_ORIGIN
        : undefined,
      bucketCorsRules: props.enableCors
        ? [
            {
              allowedHeaders: ["*"],
              allowedMethods: [HttpMethods.GET],
              allowedOrigins: props.corsAllowedOrigins ?? ["*"],
              exposedHeaders: [
                "x-amz-server-side-encryption",
                "x-amz-request-id",
                "x-amz-id-2",
              ],
              maxAge: 3000,
            },
          ]
        : undefined,
    });

    // create frontend config file asset
    if (!!generateWebConfigProps) {
      // generate dynamic config
      const { configDir, additionalConfig } = generateWebConfigProps;
      const generatedWebConfig = new GeneratedConfig({
        stage,
        servicePath: appDir,
        configDir,
        additionalConfig,
      });

      const hashedContents = md5(JSON.stringify(generatedWebConfig.config));

      const s3ActionConfigManifest = {
        action: "putObject",
        parameters: {
          Body: Stack.of(this).toJsonString({
            files: {
              "config.json": generatedWebConfig.fileName,
            },
          }),
          Bucket: website.websiteBucket.bucketName,
          CacheControl: "max-age=0, no-cache, no-store, must-revalidate",
          ContentType: "application/json",
          Key: "config-manifest.json",
        },
        /** Generate a unique uuid on every single deployment to ensure this file gets replaced
         * every time
         */
        physicalResourceId: PhysicalResourceId.of(uuid()),
        service: "S3",
      };

      const configManifest = new AwsCustomResource(this, "ConfigManifest", {
        onCreate: s3ActionConfigManifest,
        onUpdate: s3ActionConfigManifest,
        policy: AwsCustomResourcePolicy.fromStatements([
          new PolicyStatement({
            actions: ["s3:PutObject"],
            resources: [
              website.websiteBucket.arnForObjects("config-manifest.json"),
            ],
          }),
        ]),
      });

      const s3Action = {
        action: "putObject",
        parameters: {
          Body: Stack.of(this).toJsonString(generatedWebConfig.config),
          Bucket: website.websiteBucket.bucketName,
          CacheControl: "max-age=0, no-cache, no-store, must-revalidate",
          ContentType: "application/json",
          Key: generatedWebConfig.fileName,
        },
        // hash the contents of the config file to use as physical id. This will ensure replacement
        // when the contents change, even if the name does not.
        physicalResourceId: PhysicalResourceId.of(
          `${hashedContents}-config-file`
        ),
        service: "S3",
      };

      const configFile = new AwsCustomResource(this, "ConfigFile", {
        onCreate: s3Action,
        onUpdate: s3Action,
        policy: AwsCustomResourcePolicy.fromStatements([
          new PolicyStatement({
            actions: ["s3:PutObject"],
            resources: [
              website.websiteBucket.arnForObjects(generatedWebConfig.fileName),
            ],
          }),
        ]),
      });

      // Be sure to deploy the config file after the initial website deployment
      configManifest.node.addDependency(website);
      configFile.node.addDependency(website);

      // Create an cloudfront invalidation.
      new BucketDeployment(this, "Invalidation", {
        sources: [
          Source.asset(`${appDir}/${buildDir}`, {
            exclude: ["*", "!index.html"],
          }),
        ],
        destinationBucket: website.websiteBucket,
        prune: false,
        distribution: website.distribution,
        distributionPaths: props.cloudfrontInvalidationPaths ?? ["/*"],
      }).node.addDependency(configFile);
    }
  }
}
