import { SecurityAspects } from '../../../src/well-architected-aspects/aspects';

describe('SecurityAspects', () => {
  test('SecurityAspects, no errors.', () => {
    expect(new SecurityAspects()).toBeDefined;
  });
});
