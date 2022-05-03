import { Stack } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { HostedZoneProviderProps } from "aws-cdk-lib/aws-route53";
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

  const webStack = new WebStack({
    stage: "test",
    appDir: "test",
    subdomain: subDomain,
    baseDomain: baseDomain,
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
});
