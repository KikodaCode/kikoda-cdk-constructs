import { WellArchitectedAspects } from '../../src';

test('CompliantApp, no errors.', () => {
  expect(new WellArchitectedAspects()).toBeDefined;
});
