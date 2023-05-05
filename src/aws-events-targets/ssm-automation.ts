import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from '../aws-ssm';

/**
 * Create an SSM Automation Event Target
 */
export interface SsmAutomationProps extends targets.TargetBaseProps {
  /**
   * Role to be used for invoking the Automation from the Rule. This should be a
   * role that allows the the events.amazonaws.com service principal to assume
   * and execute the Automation. This role is not used by the Automation itself,
   * to execute the actions in the document, see `automationAssumeRole`.
   *
   * @default - a new role is created.
   */
  readonly role?: iam.IRole;

  /**
   * The parameters for the Automation document.
   */
  readonly parameters?: object;

  /**
   * Role to be used to run the Automation on your behalf. This should be a role
   * that allows the Automation service principal (ssm.amazonaws.com) to assume
   * and run the actions in your Automation document. Only required if the
   * document type is `Automation`.
   */
  readonly ssmAssumeRole?: iam.IRole;
}

export class SsmAutomation implements events.IRuleTarget {
  constructor(
    public readonly document: ssm.IDocument,
    private readonly props: SsmAutomationProps,
  ) {}

  /**
   * Returns a RuleTarget that can be used to trigger this SSM Automation as a
   * result from an EventBridge event.
   *
   * @see https://docs.aws.amazon.com/eventbridge/latest/userguide/resource-based-policies-eventbridge.html
   */
  public bind(rule: events.IRule): events.RuleTargetConfig {
    const role = this.props.role ?? targets.singletonEventRole(rule);
    this.document.grantExecute(role);

    if (this.props.ssmAssumeRole) {
      this.props.ssmAssumeRole.grantPassRole(role);
    }

    if (this.props.deadLetterQueue) {
      targets.addToDeadLetterQueueResourcePolicy(rule, this.props.deadLetterQueue);
    }

    return {
      ...targets.bindBaseTargetConfig(this.props),
      arn: this.document.documentArn,
      input: events.RuleTargetInput.fromObject({
        ...this.props.parameters,
        AutomationAssumeRole: [this.props.ssmAssumeRole?.roleArn],
      }),
      role,
      targetResource: this.document,
    };
  }
}
