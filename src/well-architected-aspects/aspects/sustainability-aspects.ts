import { Annotations, IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * The Sustainability pillar of the Well-Architected Framework focuses on
 * environmental impacts, especially energy consumption and efficiency, since
 * they are important levers for architects to inform direct action to reduce
 * resource usage.
 *
 * @alpha
 * @remarks Not yet implemented
 *
 * @ref {@link https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html}
 */
export class SustainabilityAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo('SustainabilityAspects not yet implemented.');
  }
}
