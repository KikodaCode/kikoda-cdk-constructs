import { App } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConfiguredStage, ConfiguredStageProps, DeploymentPipelines } from '../src';

describe('DeploymentPipelines', () => {
  interface CoreConfig {
    someBool: boolean;
  }

  class TestStage extends ConfiguredStage<CoreConfig> {
    constructor(scope: Construct, id: string, props: ConfiguredStageProps<CoreConfig>) {
      super(scope, id, props);
    }
  }

  it('should create without error.', () => {
    const statement = new DeploymentPipelines<CoreConfig, TestStage>(new App(), {
      component: 'test',
      deploymentBranches: [
        {
          branchName: 'test',
          staticPipelineIdentifier: 'test',
          stages: [
            {
              stageName: 'dev',
              manualApproval: false,
              config: {
                someBool: false,
              },
            },
          ],
        },
      ],
      repository: {
        codeCommitArn: 'yas',
      },
      getStage: (scope, id, props) => new TestStage(scope, id, props),
    });
    expect(statement).not.toBeNull;
  });
});
