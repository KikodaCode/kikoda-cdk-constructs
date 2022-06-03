import { Stack, Aspects } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { PerformanceEfficiencyAspects } from '../../../src/well-architected-aspects/aspects';

describe('PerformanceEfficiencyAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new PerformanceEfficiencyAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('not yet implemented'));
  });
});
