import { ConfigManifest } from '@kikoda/generated-config';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { SinglePageApp } from './single-page-app';

export interface WebConfigProps<T> {
  /**
   * The SinglePageApp to deploy the config file to/for
   */
  readonly spa: SinglePageApp;

  /**
   * The filename that should be used for the config file
   */
  readonly configFileName: string;

  /**
   * The configuration object to be written to the config file
   */
  readonly config: T;

  /**
   * Specify the paths to invalidate after deployment to Cloudfront Distribution
   */
  readonly cloudfrontInvalidationPaths?: string[];
}

export class WebConfig<T> extends Construct {
  constructor(scope: Construct, id: string, props: WebConfigProps<T>) {
    super(scope, id);

    const spaSourceAsset = props.spa.disableBucketDeployment();

    // deploy config manifest and config file to the SPA bucket
    new BucketDeployment(this, 'WebConfigManifest', {
      sources: [
        spaSourceAsset,
        Source.jsonData(
          ConfigManifest.CONFIG_MANIFEST_FILENAME,
          new ConfigManifest(props.configFileName),
        ),
        Source.jsonData(props.configFileName, props.config),
      ],
      prune: false,
      destinationBucket: props.spa.websiteBucket,
      distribution: props.spa.distribution,
      distributionPaths: props.cloudfrontInvalidationPaths ?? ['/*'],
    });
  }
}
