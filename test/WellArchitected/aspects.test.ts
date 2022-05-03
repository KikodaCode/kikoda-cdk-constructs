import { App } from "aws-cdk-lib";
// import { Template } from "aws-cdk-lib/assertions";
// import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import {
  // CostOptimizationAspects,
  SecurityAspects,
  ReliabilityAspects,
  SustainabilityAspects,
  // OperationalExcellenceAspects,
  PerformanceEfficiencyAspects,
  FlagBasedAnnotator,
  WellArchitectedAspectsFeatureFlags,
} from "../../src/WellArchitected/aspects";

// describe("CostOptimizationAspects", () => {
//   test("not yet implemented", () => {
//     const stack = new Stack();
//     Aspects.of(stack).add(new CostOptimizationAspects());
//   });
// });

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
  // const stack = new Stack();
  // new Function(stack, "test", {
  //   runtime: Runtime.PYTHON_3_9,
  //   handler: "index.handler",
  //   code: Code.fromInline(
  //     "" + "def handler(event, context):" + " print(event)"
  //   ),
  // });
  // Aspects.of(stack).add(new OperationalExcellenceAspects());
  // const template = Template.fromStack(stack);
  // console.log(template.toJSON());
  // template.hasResourceProperties("AWS::Lambda::Function", {
  //   TracingConfig: {
  //     Mode: "active",
  //   },
  // });
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
