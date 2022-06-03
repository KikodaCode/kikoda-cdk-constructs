import { Aspects, Stack } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { SustainabilityAspects } from '../../../src/well-architected-aspects/aspects';

describe('SustainabilityAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new SustainabilityAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('implemented'));
  });
});
