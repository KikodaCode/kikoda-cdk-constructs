import { App, Aspects, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import {
  CostOptimizationAspects,
  SecurityAspects,
  ReliabilityAspects,
  SustainabilityAspects,
  OperationalExcellenceAspects,
  PerformanceEfficiencyAspects,
  FlagBasedAnnotator,
  WellArchitectedAspectsFeatureFlags,
} from ".";

describe("CostOptimizationAspects", () => {
  class CostOptimizationTestStack extends Stack {
    constructor() {
      super();
    }
  }

  test("As expected", () => {
    const stack = new CostOptimizationTestStack();
    expect(Aspects.of(stack).add(new CostOptimizationAspects())).toBeDefined;
    const template = Template.fromStack(stack);
    console.log(template.toJSON());
  });
});

test("SecurityAspects, no errors.", () => {
  expect(new SecurityAspects()).toBeDefined;
});

test("ReliabilityAspects, no errors.", () => {
  expect(new ReliabilityAspects()).toBeDefined;
});

test("SustainabilityAspects, no errors.", () => {
  expect(new SustainabilityAspects()).toBeDefined;
});

test("OperationalExcellenceAspects, no errors.", () => {
  expect(new OperationalExcellenceAspects()).toBeDefined;
});

test("PerformanceEfficiencyAspects, no errors.", () => {
  expect(new PerformanceEfficiencyAspects()).toBeDefined;
});

test("FlagBasedAnnotator, no errors.", () => {
  expect(
    new FlagBasedAnnotator(
      new App(),
      WellArchitectedAspectsFeatureFlags.BlockPublicBuckets
    )
  ).toBeDefined;
});
