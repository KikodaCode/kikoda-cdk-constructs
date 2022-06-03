import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
// import { Construct } from 'constructs';
import { TypescriptFunction, TypescriptSingletonFunction } from '../../src';

// jest.mock('aws-cdk-lib/aws-lambda', () => {
//   const original = jest.requireActual('aws-cdk-lib/aws-lambda');
//   return {
//     __esModule: true,
//     ...original,
//     Vpc: {
//       ...original.Vpc,
//       fromLookup: jest.fn((scope: Construct, id: string) => {
//         return new original.Vpc(scope, id, {});
//       }),
//     },
//   };
// });

describe('TypescriptFunction', () => {
  class TestStack extends Stack {
    constructor() {
      super();
    }
  }

  test('contains Lambda Functions', () => {
    const stack = new TestStack();
    new TypescriptFunction(stack, 'RegularFunction', {
      handler: 'test/functions/hello.handler.main',
      bundle: {
        copyFiles: [{ from: 'test/functions', to: '../' }],
      },
    });

    new TypescriptSingletonFunction(stack, 'TypescriptSingletonFunction', {
      uuid: 'singleton-function',
      handler: 'test/functions/hello.handler.main',
      bundle: {
        copyFiles: [{ from: 'test/functions', to: '../' }],
      },
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('No bundling when srcPath is root should throw and error', () => {
    const stack = new TestStack();
    expect(
      () =>
        new TypescriptFunction(stack, 'TypescriptFunctionNoBundle', {
          handler: 'test/functions/hello.handler.main',
          bundle: false,
        }),
    ).toThrowError();
  });
});
