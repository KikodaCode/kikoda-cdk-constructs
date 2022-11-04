#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { Website, WebsiteProps } from '../../src/website';

const app = new App();

class WebStack extends Stack {
  public website: Website;
  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);
    const newZone = new HostedZone(this, 'HostedZone', {
      zoneName: 'example.com',
    });

    this.website = new Website(this, 'Website', {
      ...props,
      hostedZone: newZone,
    });
  }
}

new WebStack(app, 'WebStack', {
  stage: 'test',
  appDir: `${__dirname}/dummy-app`,
  domainName: 'test.example.com',
});
