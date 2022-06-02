import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { Code, Function, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import {
  CostOptimizationAspects,
  SecurityAspects,
  ReliabilityAspects,
  SustainabilityAspects,
  OperationalExcellenceAspects,
  PerformanceEfficiencyAspects,
  FlagBasedAnnotator,
  WellArchitectedAspectsFeatureFlags,
} from '../';

describe('CostOptimizationAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new CostOptimizationAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('implemented'));
  });
});

describe('SecurityAspects', () => {
  test('SecurityAspects, no errors.', () => {
    expect(new SecurityAspects()).toBeDefined;
  });
});

describe('ReliabilityAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new ReliabilityAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('implemented'));
  });
});

describe('SustainabilityAspects', () => {
  test('not yet implemented', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new SustainabilityAspects());
    Annotations.fromStack(stack).hasInfo('*', Match.stringLikeRegexp('implemented'));
  });
});

describe('OperationalExcellenceAspects', () => {
  test('OperationalExcellenceAspects, no errors.', () => {
    const stack = new Stack();
    new Function(stack, 'test', {
      runtime: Runtime.PYTHON_3_9,
      handler: 'index.handler',
      code: Code.fromInline('' + 'def handler(event, context):' + ' print(event)'),
      tracing: Tracing.ACTIVE,
    });
    Aspects.of(stack).add(new OperationalExcellenceAspects());
  });
});

describe('PerformanceEfficiencyAspects', () => {
  test('PerformanceEfficiencyAspects, no errors.', () => {
    expect(new PerformanceEfficiencyAspects()).toBeDefined;
  });
});
test('FlagBasedAnnotator, no errors.', () => {
  expect(new FlagBasedAnnotator(new App(), WellArchitectedAspectsFeatureFlags.BlockPublicBuckets))
    .toBeDefined;
});
