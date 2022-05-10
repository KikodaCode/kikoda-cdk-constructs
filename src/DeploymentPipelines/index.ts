import { App } from 'aws-cdk-lib';
import { ConfiguredStage } from '../ConfiguredStage';
import { IndividualPipelineStack, IndividualPipelineStackProps } from '../IndividualPipelineStack';

/**
 * The component to be deployed with {@link DeploymentPipelines}.
 */
export interface Component {
  readonly name: string;
  readonly stage: typeof ConfiguredStage;
}

/**
 * DeploymentPipelinesProps
 */
export interface DeploymentPipelinesProps<T> extends IndividualPipelineStackProps<T> {}

/**
 * One pipleline will be created for each stage. (eg. dev test stage prod).
 * The generic type is used to dynamically type the configuration.
 */
export class DeploymentPipelines<T> {
  constructor(app: App, props: DeploymentPipelinesProps<T>) {
    props.deploymentBranches.forEach(branch => {
      const pipelineStackId = `${props.component}-${branch.staticPipelineIdentifier}-pipeline`;

      new IndividualPipelineStack(app, pipelineStackId, { ...props, branch });
    });
  }
}
