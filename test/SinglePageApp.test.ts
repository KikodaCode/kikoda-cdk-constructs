import { Stack } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { HostedZoneProviderProps } from "aws-cdk-lib/aws-route53";
import { CorsRule, HttpMethods } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import {
  SinglePageApp,
  SinglePageAppProps,
} from "../src/website/SinglePageApp";

jest.mock("aws-cdk-lib/aws-route53", () => {
  const original = jest.requireActual("aws-cdk-lib/aws-route53");
  return {
    __esModule: true,
    ...original,
    HostedZone: {
      ...original.HostedZone,
      fromLookup: jest.fn(
        (scope: Construct, id: string, props: HostedZoneProviderProps) => {
          return new original.HostedZone(scope, id, {
            zoneName: props.domainName,
          });
        }
      ),
    },
  };
});

describe("Given simple Single Page App", () => {
  class SPAStack extends Stack {
    public singlePageApp: SinglePageApp;
    constructor(props: SinglePageAppProps) {
      super();
      this.singlePageApp = new SinglePageApp(this, "spa", props);
    }
  }
  const givenZoneName: string = "zoneName";
  const corsRules = [
    {
      allowedHeaders: ["*"],
      allowedMethods: [HttpMethods.GET],
      allowedOrigins: ["*"],
      exposedHeaders: [
        "x-amz-server-side-encryption",
        "x-amz-request-id",
        "x-amz-id-2",
      ],
      maxAge: 3000,
    },
  ];
  const spaStack = new SPAStack({
    appDir: "test",
    zoneName: givenZoneName,
    indexDoc: "indexDoc",
    bucketCorsRules: corsRules,
  });
  const template = Template.fromStack(spaStack);

  it("Has only one S3 Bucket", () => {
    template.resourceCountIs("AWS::S3::Bucket", 1);
  });

  it("Has only one CF Distribution ", () => {
    template.resourceCountIs("AWS::CloudFront::Distribution", 1);
  });

  test(`${givenZoneName}  is contained in the CF Distribution Alias`, () => {
    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: {
        Aliases: [Match.stringLikeRegexp(givenZoneName)],
      },
    });
  });

  test(`CorsConfig contains ${corsRules}`, () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
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

  const subDomain: string = "subDomain";
  const subDomainSpaStack = new SPAStack({
    appDir: "test",
    zoneName: givenZoneName,
    subdomain: subDomain,
    indexDoc: "indexDoc",
  });
  const subDomainTemplate = Template.fromStack(subDomainSpaStack);

  test(`CF Distribution Alias contains ${subDomain}`, () => {
    subDomainTemplate.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: {
        Aliases: [
          Match.stringLikeRegexp(`(?=.*${subDomain})(?=.*${givenZoneName}).*`),
        ],
      },
    });
  });
});
