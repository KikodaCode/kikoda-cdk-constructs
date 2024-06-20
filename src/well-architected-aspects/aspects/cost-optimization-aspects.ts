import { Annotations, IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * The Cost Optimization pillar of the Well-Architected Framework includes the
 * ability to run systems to deliver business value at the lowest price point.
 *
 * @alpha
 * @remarks Not yet implemented
 *
 * @ref {@link https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html}
 */
export class CostOptimizationAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo('CostOptimizationAspects not yet implemented.');
  }
}
