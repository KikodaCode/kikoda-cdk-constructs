import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SecurityAspects, WellArchitectedAspects } from '../../src';

describe('WellArchitectedAspects', () => {
  const app = new App();
  Aspects.of(app).add(new WellArchitectedAspects());

  test('adds root aspect', () => {
    expect(Aspects.of(app).all.find(x => x instanceof WellArchitectedAspects)).toBeDefined;
  });

  test('adds supporting aspects', () => {
    const stack = new Stack(app, 'Test');

    let aspects = Aspects.of(app).all.length;
    expect(aspects).toEqual(1);

    // synth and run visit() which will add the rest of the aspects
    Template.fromStack(stack);
    aspects = Aspects.of(app).all.length;

    expect(aspects).toEqual(7);
  });
});

describe('Single Aspect', () => {
  const app = new App();

  test('adds supporting aspects', () => {
    const stack = new Stack(app, 'Test');
    Aspects.of(stack).add(new SecurityAspects());

    // synth and run visit() which will add the rest of the aspects
    Template.fromStack(stack);
    const aspects = Aspects.of(stack).all.length;

    expect(aspects).toEqual(1);
  });
});
