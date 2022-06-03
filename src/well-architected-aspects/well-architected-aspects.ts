import { IAspect, Aspects } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

import {
  CostOptimizationAspects,
  OperationalExcellenceAspects,
  PerformanceEfficiencyAspects,
  ReliabilityAspects,
  SecurityAspects,
  SustainabilityAspects,
} from './aspects';

/**
 * An app construct that complies with AWS well-architected standards.
 * @class
 */
export class WellArchitectedAspects implements IAspect {
  visit(node: IConstruct): void {
    Aspects.of(node).add(new CostOptimizationAspects());
    Aspects.of(node).add(new OperationalExcellenceAspects());
    Aspects.of(node).add(new PerformanceEfficiencyAspects());
    Aspects.of(node).add(new ReliabilityAspects());
    Aspects.of(node).add(new SecurityAspects());
    Aspects.of(node).add(new SustainabilityAspects());
  }
}
