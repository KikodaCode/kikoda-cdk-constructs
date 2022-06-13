import { App } from 'aws-cdk-lib';
import {
  FlagBasedAnnotator,
  FlagLevel,
  WellArchitectedAspectsFeatureFlags,
} from '../../src/well-architected-aspects';

describe('FlagBasedAnnotator', () => {
  test.each([[FlagLevel.INFO], [FlagLevel.WARN], [FlagLevel.ERROR], [FlagLevel.FIX]])(
    '%s annotations',
    flagLevel => {
      const app = new App({
        context: {
          [WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS]: flagLevel,
        },
      });

      const annotator = new FlagBasedAnnotator(
        app,
        WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS,
      );

      annotator.annotate('unit test');

      expect(annotator.flagLevel).toBe(flagLevel);
    },
  );
});
