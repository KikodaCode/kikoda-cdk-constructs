import { IAspect } from 'aws-cdk-lib';
import { CfnFunction } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';
import {
  FlagBasedAnnotator,
  WellArchitectedAspectsFeatureFlags,
  FlagLevel,
} from '../flag-based-annotator';

/**
 * The Operational Excellence pillar of the Well-Architected Framework includes
 * the ability to support development and run workloads effectively, gain
 * insight into their operations, and to continuously improve supporting
 * processes and procedures to deliver business value.
 *
 * @ref {@link https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html}
 */
export class OperationalExcellenceAspects implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnFunction) {
      if (!node.tracingConfig) {
        const antr = new FlagBasedAnnotator(
          node,
          WellArchitectedAspectsFeatureFlags.ENABLE_X_RAY_TRACING,
        );
        let message = 'X-Ray Tracing is not enabled for this function';

        if (antr.flagLevel === FlagLevel.FIX) {
          message += '. Automatically setting tracingConfig.mode to Active';
          node.addPropertyOverride('TracingConfig', { mode: 'Active' });
        }

        antr.annotate(message);
      }
    }
  }
}
