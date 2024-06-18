import { Annotations, IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * The Performance Efficiency pillar of the Well-Architected Framework includes
 * the ability to use computing resources efficiently to meet system
 * requirements, and to maintain that efficiency as demand changes and
 * technologies evolve.
 *
 * @alpha
 * @remarks Not yet implemented
 *
 * @ref {@link https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html}
 */
export class PerformanceEfficiencyAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo('PerformanceEfficiencyAspects not yet implemented.');
  }
}
