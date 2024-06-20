import { Annotations, IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * The Reliability pillar of the Well-Architected Framework encompasses the
 * ability of a workload to perform its intended function correctly and
 * consistently when it is expected to. This includes the ability to operate
 * and test the workload through its total lifecycle.
 *
 * @alpha
 * @remarks Not yet implemented
 *
 * @ref {@link https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html}
 */
export class ReliabilityAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo('ReliabilityAspects not yet implemented.');
  }
}
