import { jest, describe, test, expect } from '@jest/globals';
import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HostedZone, HostedZoneProviderProps } from 'aws-cdk-lib/aws-route53';
import { CorsRule, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Website, WebsiteProps } from '../../src/website';

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

describe('Given a Website', () => {
  class WebStack extends Stack {
    public website: Website;
    constructor(props: WebsiteProps) {
      super();
      this.website = new Website(this, 'Website', props);
    }
  }
  const baseDomain = 'baseDomain';
  const subDomain = 'subDomain';
  const corsRules = [
    {
      allowedHeaders: ['*'],
      allowedMethods: [HttpMethods.GET],
      allowedOrigins: ['*'],
      exposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2'],
      maxAge: 3000,
    },
  ];

  const webStack = new WebStack({
    stage: 'test',
    appDir: __dirname,
    domainName: `${subDomain}.${baseDomain}`,
    enableCors: true,
  });

  const template = Template.fromStack(webStack);

  test(`CF Distribution Alias contains ${baseDomain} and ${subDomain}`, () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [Match.stringLikeRegexp(`(?=.*${subDomain})(?=.*${baseDomain}).*`)],
      },
    });
  });

  test('CF Distribution should have CorsConfiguration', () => {
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

  const generatedConfigStack = new WebStack({
    stage: 'test',
    appDir: __dirname,
    domainName: `${subDomain}.${baseDomain}`,
    buildDir: '',
    generateWebConfigProps: {
      configDir: 'config',
      additionalConfig: {
        configValue: true,
      },
    },
  });

  test('Generated config with additionalConfig object should be deployed to S3', () => {
    expect(
      generatedConfigStack.website.generatedWebConfig?.config.additionalConfig?.configValue,
    ).toBe(true);
  });

  test('Generated config only creates a single CDKBucketDeployment', () => {
    const generatedConfigTemplate = Template.fromStack(generatedConfigStack);

    generatedConfigTemplate.resourceCountIs('Custom::CDKBucketDeployment', 1);

    // Assert the app asset, config manifest, and config file are all deployed together.
    generatedConfigTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      SourceObjectKeys: [Match.anyValue(), Match.anyValue(), Match.anyValue()],
    });
  });

  test('CF Distribution Comment contains description', () => {
    const descriptionStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
      description: 'website description',
    });
    const descriptionTemplate = Template.fromStack(descriptionStack);

    descriptionTemplate.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Comment: 'website description',
      },
    });
  });

  test('CF Distribution Prune defaults to false', () => {
    const defaultPruneStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
    });
    const defaultPruneTemplate = Template.fromStack(defaultPruneStack);

    defaultPruneTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      Prune: false,
    });
  });

  test('CF Distribution Prune true when pruneBucket true', () => {
    const pruneStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
      pruneBucket: true,
    });
    const pruneTemplate = Template.fromStack(pruneStack);

    pruneTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      Prune: true,
    });
  });

  test('BucketDeployment invalidates CloudFront by default', () => {
    const invalidationStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
    });
    const invalidationTemplate = Template.fromStack(invalidationStack);

    invalidationTemplate.resourceCountIs('AWS::CloudFront::Distribution', 1);
    invalidationTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionId: Match.anyValue(),
    });
  });

  test('BucketDeployment invalidates CloudFront when cloudfrontInvalidationPaths is set', () => {
    const invalidationStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
      cloudfrontInvalidationPaths: ['/index.html'],
    });
    const invalidationTemplate = Template.fromStack(invalidationStack);

    invalidationTemplate.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionId: Match.anyValue(),
      DistributionPaths: ['/index.html'],
    });
  });

  test('BucketDeployment skips CloudFront invalidation when disableInvalidation is true', () => {
    const disabledInvalidationStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
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

describe('Given an only default domain Website ', () => {
  class WebStack extends Stack {
    public website: Website;
    constructor(props: WebsiteProps) {
      super();
      this.website = new Website(this, 'Website', props);
    }
  }

  test('domainName required if onlyDefaultDomain is undefined', () => {
    expect(() => {
      new WebStack({
        stage: 'test',
        appDir: __dirname,
        onlyDefaultDomain: undefined,
      });
    }).toThrow();
  });

  test('domainName required if onlyDefaultDomain is false', () => {
    expect(() => {
      new WebStack({
        stage: 'test',
        appDir: __dirname,
        onlyDefaultDomain: false,
      });
    }).toThrow();
  });

  // make sure hosted zone is not created when onlyDefaultDomain is true
  test('hostedZone and record are not created if onlyDefaultDomain prop is true', () => {
    const webStack = new WebStack({
      stage: 'test',
      appDir: __dirname,
      onlyDefaultDomain: true,
      domainName: 'example.com ',
    });

    const template = Template.fromStack(webStack);

    expect(template.findResources('AWS::Route53::HostedZone')).toEqual({});
    expect(template.findResources('AWS::Route53::RecordSet')).toEqual({});
    expect(webStack.website.endpoint).not.toEqual('https://example.com');
  });
});

describe('Website construct ', () => {
  const baseDomain = 'baseDomain';
  const subDomain = 'subDomain';

  test('uses provided hosted zone, build excludes, index doc, and CORS origins', () => {
    const stack = new Stack();
    const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
      domainName: baseDomain,
    });

    new Website(stack, 'Website', {
      stage: 'test',
      appDir: __dirname,
      domainName: `${subDomain}.${baseDomain}`,
      hostedZone,
      buildAssetExcludes: ['*.txt'],
      indexDoc: 'custom-index.html',
      enableCors: true,
      corsAllowedOrigins: ['https://allowed.example.com'],
    });

    const providedValuesTemplate = Template.fromStack(stack);

    providedValuesTemplate.resourceCountIs('AWS::Route53::HostedZone', 1);
    providedValuesTemplate.hasResourceProperties('AWS::S3::Bucket', {
      CorsConfiguration: {
        CorsRules: [Match.objectLike({ AllowedOrigins: ['https://allowed.example.com'] })],
      },
    });
    providedValuesTemplate.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        CustomErrorResponses: [
          Match.objectLike({ ResponsePagePath: '/custom-index.html' }),
          Match.objectLike({ ResponsePagePath: '/custom-index.html' }),
        ],
      },
    });
  });
});
