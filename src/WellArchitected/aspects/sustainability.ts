/**
 * Well Architected Framework - Sustainability Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html
 */

import { IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs";

export class SustainabilityAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    if (!node) throw new Error("Method not implemented.");
  }
}
