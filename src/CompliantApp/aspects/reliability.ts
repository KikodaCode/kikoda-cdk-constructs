/**
 * Well Architected Framework - Reliability Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
 */

import { IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs";

export class ReliabilityAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    if (!node) throw new Error("Method not implemented.");
  }
}
