import { existsSync } from 'fs';
import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HostedZone, HostedZoneProviderProps, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { CorsRule, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { SinglePageApp, SinglePageAppProps } from '../src/single-page-app';

jest.mock('aws-cdk-lib/aws-route53', () => {
  const original = jest.requireActual('aws-cdk-lib/aws-route53');
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

  it('Has only one S3 Bucket', () => {
    template.resourceCountIs('AWS::S3::Bucket', 1);
  });

  it('Has only one CF Distribution ', () => {
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

  let spaStack1 = new SPAStack({
    appDir: __dirname,
    domainName: 'test.example.com',
    indexDoc: 'indexDoc',
    buildCommand: 'rm -rf dist && mkdir -p dist && touch dist/spa_local_build_artifact',
    buildDir: 'dist',
  });

  test('local bundling', () => {
    expect(existsSync(`${__dirname}/dist/spa_local_build_artifact`)).toBe(true);
  });

  test('disable default bucket deployment', () => {
    spaStack1.singlePageApp.disableBucketDeployment();

    expect(spaStack1.singlePageApp.bucketDeployment).toBeUndefined();
  });
});
