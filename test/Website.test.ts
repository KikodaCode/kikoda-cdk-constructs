import { Stack } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { HostedZoneProviderProps } from "aws-cdk-lib/aws-route53";
import { CorsRule, HttpMethods } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Website, WebsiteProps } from "../src";

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

describe("Given a Website", () => {
  class WebStack extends Stack {
    public website: Website;
    constructor(props: WebsiteProps) {
      super();
      this.website = new Website(this, "website", props);
    }
  }
  const baseDomain = "baseDomain";
  const subDomain = "subDomain";
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

  const webStack = new WebStack({
    stage: "test",
    appDir: "test",
    subdomain: subDomain,
    baseDomain: baseDomain,
    enableCors: true,
  });
  const template = Template.fromStack(webStack);
  test(`CF Distribution Alias contains ${baseDomain} and ${subDomain}`, () => {
    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: {
        Aliases: [
          Match.stringLikeRegexp(`(?=.*${subDomain})(?=.*${baseDomain}).*`),
        ],
      },
    });
  });

  test("CF Distribution should have CorsConfiguration", () => {
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
});
