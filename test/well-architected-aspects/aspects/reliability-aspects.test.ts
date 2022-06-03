import { Stack, Aspects } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { ReliabilityAspects } from '../../../src/well-architected-aspects/aspects';

describe('ReliabilityAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new ReliabilityAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('not yet implemented'));
  });
});
