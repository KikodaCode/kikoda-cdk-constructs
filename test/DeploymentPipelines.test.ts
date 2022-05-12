import { App, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConfiguredStage, DeploymentPipelines, StageConfig, StageConfigBase } from '../src';

describe('DeploymentPipelines', () => {
  const base: StageConfigBase = {
    baseDomain: 'test.com',
  };
  interface TestConfig {
    someBool: boolean;
  }
  type ConfigType = TestConfig & StageConfig;
  const testConfig: ConfigType = {
    ...base,
    stageName: 'test',
    vpcId: 'testVpc',
    enableAlarms: false,
    someBool: false,
  };
  interface TestStackProps extends StageProps, StageConfig, TestConfig {}
  class TestStage extends ConfiguredStage<TestConfig> {
    constructor(scope: Construct, id: string, props: TestStackProps) {
      super(scope, id, props);
      props.someBool;
      this.additonalConfig.someBool;
    }
  }

  it('should create without error.', () => {
    const statement = new DeploymentPipelines<TestConfig>(new App(), {
      component: { name: 'yes', stage: TestStage },
      deploymentBranches: [
        {
          name: 'test',
          staticPipelineIdentifier: 'test',
          stages: [{ name: 'test', config: { ...testConfig } }],
        },
      ],
      repoConfig: {
        baseDir: '',
        pruneCloudAssembly: true,
        repository: {
          codeCommitArn: 'arn:codecommit:thing:us-east-1:123456789012:thing',
        },
      },
    });
    expect(statement).not.toBeNull;
  });
});
