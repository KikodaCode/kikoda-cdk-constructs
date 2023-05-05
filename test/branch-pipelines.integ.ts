#!/usr/bin/env node
import { App, Arn, Stack, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BranchPipelines } from '../src/branch-pipelines';

const app = new App();

class IntegStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    new Stack(this, 'IntegStack');
  }
}

new BranchPipelines(app, {
  deploymentBranches: [
    {
      branchName: 'main',
      staticPipelineIdentifier: 'production',
      stages: [
        {
          name: 'integ',
          config: {
            foo: 'bar',
          },
        },
      ],
    },
  ],
  repository: {
    source: {
      codeCommitArn: Arn.format({
        service: 'codecommit',
        resource: 'integ',
        partition: 'aws',
        account: '000000000000',
        region: 'us-east-1',
      }),
    },
  },
  pipelineConfig: {
    pruneCloudAssembly: true,
  },
  component: {
    componentName: 'integ',
    componentType: IntegStage,
  },
  env: {
    account: '000000000000',
    region: 'us-east-1',
  },
});
