import { Stack, Aspects } from 'aws-cdk-lib';
import { Match, Annotations } from 'aws-cdk-lib/assertions';
import { CostOptimizationAspects } from '../../../src/well-architected-aspects/aspects';

describe('CostOptimizationAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new CostOptimizationAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('not yet implemented'));
  });
});
