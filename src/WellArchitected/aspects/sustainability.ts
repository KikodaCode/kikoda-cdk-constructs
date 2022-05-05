/**
 * Well Architected Framework - Sustainability Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html
 */

import { Annotations, IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs";

export class SustainabilityAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo("SustainabilityAspects not yet implemented.");
  }
}
