import { WellArchitected } from '../../src';

test('CompliantApp, no errors.', () => {
  expect(new WellArchitected()).toBeDefined;
});
