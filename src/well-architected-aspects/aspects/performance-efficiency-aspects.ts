/**
 * Well Architected Framework - Performance Efficiency Pillar CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html
 */

import { Annotations, IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

export class PerformanceEfficiencyAspects implements IAspect {
  visit(node: IConstruct): void {
    // empty implementation
    Annotations.of(node).addInfo('PerformanceEfficiencyAspects not yet implemented.');
  }
}
