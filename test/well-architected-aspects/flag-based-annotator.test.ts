import { App } from 'aws-cdk-lib';
import {
  FlagBasedAnnotator,
  WellArchitectedAspectsFeatureFlags,
} from '../../src/well-architected-aspects';

describe('FlagBasedAnnotator', () => {
  test('FlagBasedAnnotator, no errors.', () => {
    expect(
      new FlagBasedAnnotator(new App(), WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS),
    ).toBeDefined;
  });
});
