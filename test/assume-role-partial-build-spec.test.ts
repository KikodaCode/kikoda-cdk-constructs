import { AssumeRolePartialBuildSpec } from '../src/assume-role-partial-build-spec.ts';

describe('AssumeRolePartialBuildSpec', () => {
  it('should do the thing its meant to do', () => {
    new AssumeRolePartialBuildSpec('arn:aws:iam:::role');
  });
});
