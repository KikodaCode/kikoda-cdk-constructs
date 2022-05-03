/**
 * Well Architected Framework - Operational Excellence Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html
 */

import { IAspect } from "aws-cdk-lib";
import { CfnFunction } from "aws-cdk-lib/aws-lambda";
import { IConstruct } from "constructs";

import {
  FlagBasedAnnotator,
  FlagLevel,
  WellArchitectedAspectsFeatureFlags,
} from ".";

export class OperationalExcellenceAspects implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnFunction) {
      if (!node.tracingConfig) {
        const { annotate, flagLevel } = new FlagBasedAnnotator(
          node,
          WellArchitectedAspectsFeatureFlags.EnableXRayTracing
        );
        let message = "X-Ray Tracing is not enabled for this function";

        if (flagLevel === FlagLevel.FIX) {
          message += ". Automatically setting tracingConfig.mode to Active";
          node.addPropertyOverride("TracingConfig", { mode: "Active" });
        }

        annotate(message);
      }
    }
  }
}
