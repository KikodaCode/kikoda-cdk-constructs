import { AssumeRolePartialBuildSpec } from '../src/assume-role-partial-build-spec';

describe('AssumeRolePartialBuildSpec', () => {
  it('should do the thing its meant to do', () => {
    new AssumeRolePartialBuildSpec('arn:aws:iam:::role');
  });
});
