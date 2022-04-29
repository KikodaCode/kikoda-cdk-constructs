/**
 * Well Architected Framework - Cost Optimization Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html
 */

import { Annotations, IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs";

export class CostOptimizationAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo(
      "CostOptimizationAspects not yet implemented."
    );
  }
}
