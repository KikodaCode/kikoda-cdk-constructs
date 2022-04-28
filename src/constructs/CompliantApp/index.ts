import { App, AppProps, Aspects, Tags } from 'aws-cdk-lib';

import {
  CostOptimizationAspects,
  OperationalExcellenceAspects,
  PerformanceEfficiencyAspects,
  ReliabilityAspects,
  SecurityAspects,
  SustainabilityAspects,
} from './aspects';

export interface CompliantAppProps extends AppProps {}

/**
 * An app construct that complies with AWS well-architected standards.
 * @class
 */
export class CompliantApp extends App {
  constructor(props?: CompliantAppProps) {
    super(props);
    // Standard Tags
    Tags.of(this).add('well-architected', 'true');

    // Service Stack Aspects
    Aspects.of(this).add(new CostOptimizationAspects());
    Aspects.of(this).add(new OperationalExcellenceAspects());
    Aspects.of(this).add(new PerformanceEfficiencyAspects());
    Aspects.of(this).add(new ReliabilityAspects());
    Aspects.of(this).add(new SecurityAspects());
    Aspects.of(this).add(new SustainabilityAspects());
  }
}
