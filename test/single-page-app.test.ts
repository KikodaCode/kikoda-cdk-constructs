import { existsSync } from 'fs';
import { jest, describe, test, expect } from '@jest/globals';
import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HostedZone, HostedZoneProviderProps, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { CorsRule, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { SinglePageApp, SinglePageAppProps } from '../src/single-page-app';

jest.mock('aws-cdk-lib/aws-route53', () => {
  type Route53 = typeof import('aws-cdk-lib/aws-route53');
  const original = jest.requireActual<Route53>('aws-cdk-lib/aws-route53');
  return {
    __esModule: true,
    ...original,
    HostedZone: {
      ...original.HostedZone,
      fromLookup: jest.fn((scope: Construct, id: string, props: HostedZoneProviderProps) => {
        return new original.HostedZone(scope, id, {
          zoneName: props.domainName,
        });
      }),
    },
  };
});

const givenZoneName = 'example.com';

describe('Given simple Single Page App', () => {
  class SPAStack extends Stack {
    public singlePageApp: SinglePageApp;
    constructor(props: Omit<SinglePageAppProps, 'hostedZone'>) {
      super();

      const givenZone: IHostedZone = HostedZone.fromLookup(this, 'HostedZone', {
        domainName: givenZoneName,
      });

      this.singlePageApp = new SinglePageApp(this, 'spa', {
        ...props,
        hostedZone: givenZone,
      });
    }
  }

  const corsRules = [
    {
      allowedHeaders: ['*'],
      allowedMethods: [HttpMethods.GET],
      allowedOrigins: ['*'],
      exposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2'],
      maxAge: 3000,
    },
  ];
  const spaStack = new SPAStack({
    appDir: __dirname,
    domainName: 'test.example.com',
    indexDoc: 'indexDoc',
    bucketCorsRules: corsRules,
  });
  const template = Template.fromStack(spaStack);

  test('Has only one S3 Bucket', () => {
    template.resourceCountIs('AWS::S3::Bucket', 1);
  });

  test('Has only one CF Distribution ', () => {
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  });

  test(`${givenZoneName}  is contained in the CF Distribution Alias`, () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [Match.stringLikeRegexp(givenZoneName)],
      },
    });
  });

  test(`CorsConfig contains ${corsRules}`, () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      CorsConfiguration: {
        CorsRules: corsRules.map((rule: CorsRule) => {
          return {
            AllowedHeaders: rule.allowedHeaders,
            AllowedMethods: rule.allowedMethods,
            AllowedOrigins: rule.allowedOrigins,
            ExposedHeaders: rule.exposedHeaders,
            MaxAge: rule.maxAge,
          };
        }),
      },
    });
  });

  const domainName: string = 'test.example.com';
  const domainNameSpaStack = new SPAStack({
    appDir: __dirname,
    domainName,
    indexDoc: 'indexDoc',
  });
  const domainNameTemplate = Template.fromStack(domainNameSpaStack);

  test(`CF Distribution Alias contains ${domainName}`, () => {
    domainNameTemplate.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [Match.stringLikeRegexp(`(?=.*${domainName})`)],
      },
    });
  });

  const alternateDomainName: string = 'alternate.example.com';
  const alternateDomainNameSpaStack = new SPAStack({
    appDir: __dirname,
    domainName,
    alternateDomainNames: [alternateDomainName],
    indexDoc: 'indexDoc',
  });
  const alternateDomainNameTemplate = Template.fromStack(alternateDomainNameSpaStack);

  test(`CF Distribution Alias contains alternate domain name: ${alternateDomainName}`, () => {
    alternateDomainNameTemplate.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [
          Match.stringLikeRegexp(`(?=.*${domainName})`),
          Match.stringLikeRegexp(`(?=.*${alternateDomainName})`),
        ],
      },
    });
  });

  test('local bundling', () => {
    new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
      buildCommand: 'rm -rf dist && mkdir -p dist && touch dist/spa_local_build_artifact',
      buildDir: 'dist',
    });

    expect(existsSync(`${__dirname}/dist/spa_local_build_artifact`)).toBe(true);
  });

  test('CF Distribution Comment contains description', () => {
    const descriptionSpaStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
      description: 'spa description',
    });
    const descriptionTemplate = Template.fromStack(descriptionSpaStack);

    descriptionTemplate.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Comment: 'spa description',
      },
    });
  });

  test('CF Distribution Prune defaults to false', () => {
    const defaultPruneStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
    });
    const defaultPruneTemplate = Template.fromStack(defaultPruneStack);

    defaultPruneTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      Prune: false,
    });
  });

  test('CF Distribution Prune true when pruneBucket true', () => {
    const pruneStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
      pruneBucket: true,
    });
    const pruneTemplate = Template.fromStack(pruneStack);

    pruneTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      Prune: true,
    });
  });

  test('BucketDeployment invalidates CloudFront by default', () => {
    const invalidationStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
    });
    const invalidationTemplate = Template.fromStack(invalidationStack);

    invalidationTemplate.resourceCountIs('AWS::CloudFront::Distribution', 1);
    invalidationTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionId: Match.anyValue(),
    });
  });

  test('BucketDeployment invalidates CloudFront when cloudfrontInvalidationPaths is set', () => {
    const invalidationStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
      cloudfrontInvalidationPaths: ['/index.html'],
    });
    const invalidationTemplate = Template.fromStack(invalidationStack);

    invalidationTemplate.resourceCountIs('AWS::CloudFront::Distribution', 1);
    invalidationTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionId: Match.anyValue(),
      DistributionPaths: ['/index.html'],
    });
  });

  test('BucketDeployment skips CloudFront invalidation when disableInvalidation is true', () => {
    const disabledInvalidationStack = new SPAStack({
      appDir: __dirname,
      domainName: 'test.example.com',
      indexDoc: 'indexDoc',
      cloudfrontInvalidationPaths: ['/index.html'],
      disableInvalidation: true,
    });
    const disabledInvalidationTemplate = Template.fromStack(disabledInvalidationStack);

    disabledInvalidationTemplate.resourceCountIs('AWS::CloudFront::Distribution', 1);

    disabledInvalidationTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionId: Match.absent(),
      DistributionPaths: Match.absent(),
    });
  });
});

describe('Given an only default domain Single Page App ', () => {
  class SPAStack extends Stack {
    public singlePageApp: SinglePageApp;
    constructor(props: SinglePageAppProps, addHostedZone: boolean) {
      super();

      if (addHostedZone) {
        const givenZone: IHostedZone = HostedZone.fromLookup(this, 'HostedZone', {
          domainName: givenZoneName,
        });

        this.singlePageApp = new SinglePageApp(this, 'spa', {
          ...props,
          hostedZone: givenZone,
        });
      } else {
        this.singlePageApp = new SinglePageApp(this, 'spa', props);
      }
    }
  }

  test('domainName required if onlyDefaultDomain is undefined', () => {
    expect(() => {
      new SPAStack(
        {
          appDir: __dirname,
          indexDoc: 'indexDoc',
          onlyDefaultDomain: undefined,
        },
        true,
      );
    }).toThrow();
  });

  test('domainName required if onlyDefaultDomain is false', () => {
    expect(() => {
      new SPAStack(
        {
          appDir: __dirname,
          indexDoc: 'indexDoc',
          onlyDefaultDomain: false,
        },
        true,
      );
    }).toThrow();
  });

  test('hostedZone required if onlyDefaultDomain is undefined', () => {
    expect(() => {
      new SPAStack(
        {
          appDir: __dirname,
          indexDoc: 'indexDoc',
          onlyDefaultDomain: undefined,
          domainName: 'test.example.com',
        },
        false,
      );
    }).toThrow();
  });

  test('hostedZone required if onlyDefaultDomain is false', () => {
    expect(() => {
      new SPAStack(
        {
          appDir: __dirname,
          indexDoc: 'indexDoc',
          onlyDefaultDomain: false,
          domainName: 'test.example.com',
        },
        false,
      );
    }).toThrow();
  });
});
