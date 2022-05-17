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
    const statement = new DeploymentPipelines<CoreConfig>(new App(), {
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
      stageType: TestStage,
    });
    expect(statement).not.toBeNull;
  });
});
