import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import { Website, WebsiteProps } from "../src";

jest.mock("aws-cdk-lib/aws-route53", () => {
  const original = jest.requireActual("aws-cdk-lib/aws-route53");
  return {
    __esModule: true,
    ...original,
    HostedZone: {
      ...original.HostedZone,
      fromLookup: jest.fn((scope: Construct, id: string) => {
        return new original.HostedZone(scope, id, { zoneName: "zoneName" });
      }),
    },
  };
});

describe("Website", () => {
  class WebStack extends Stack {
    public website: Website;
    constructor(props: WebsiteProps) {
      super();
      this.website = new Website(this, "test", props);
    }
  }
  test("web endpoint", () => {
    const webStack = new WebStack({
      stage: "test",
      appDir: "/",
      subdomain: "subDomain",
      baseDomain: "baseDomain",
    });
    const template = Template.fromStack(webStack);
    template.hasResourceProperties("AWS::SNS::Website", {
      Endpoint: `https://subdomain.baseDomain`,
    });
  });

  //   test.each`
  //     subdomain | baseDomain
  //     ${}
  //   `("web endpoint", (subdomain, baseDomain) => {
  //     const webStack = new WebStack({
  //       stage: "test",
  //       appDir: "/",
  //       subdomain,
  //       baseDomain,
  //     });
  //     const template = Template.fromStack(webStack);
  //     template.hasResourceProperties("AWS::SNS::Website", {
  //       Endpoint: `https://${subdomain}.${baseDomain}`,
  //     });
  //   });
});
