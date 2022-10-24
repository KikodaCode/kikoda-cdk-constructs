#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Website, WebsiteProps } from '../../src/website';

const app = new App();

class WebStack extends Stack {
  public website: Website;
  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);
    this.website = new Website(this, 'Website', props);
  }
}
const baseDomain = 'baseDomain';
const subDomain = 'subDomain';

new WebStack(app, 'WebStack', {
  stage: 'test',
  appDir: `${__dirname}/dummy-app`,
  subdomain: subDomain,
  baseDomain: baseDomain,
});
