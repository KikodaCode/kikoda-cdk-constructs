import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HostedZoneProviderProps } from 'aws-cdk-lib/aws-route53';
import { CorsRule, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Website, WebsiteProps } from '../../src/website';

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
