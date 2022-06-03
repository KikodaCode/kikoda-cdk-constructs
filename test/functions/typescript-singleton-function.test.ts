import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TypescriptSingletonFunction } from '../../src';

describe('TypescriptSingletonFunction', () => {
  class TestStack extends Stack {
    constructor() {
      super();
    }
  }

  test('contains Lambda Functions', () => {
    const stack = new TestStack();

    new TypescriptSingletonFunction(stack, 'TypescriptSingletonFunction', {
      uuid: 'singleton-function',
      handler: 'test/functions/hello.handler.main',
      bundle: {
        copyFiles: [{ from: 'test/functions/hello.handler.ts', to: '../' }],
      },
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  test('No bundling when srcPath is root should throw and error', () => {
    const stack = new TestStack();

    expect(
      () =>
        new TypescriptSingletonFunction(stack, 'TypescriptSingletonFunctionNoBundle', {
          uuid: 'singleton-function',
          handler: 'test/functions/hello.handler.main',
          bundle: false,
        }),
    ).toThrowError();
  });

  test('No bundling when srcPath is root should throw and error', () => {
    const stack = new TestStack();

    expect(
      () =>
        new TypescriptSingletonFunction(stack, 'TypescriptSingletonFunctionInvalidCopy', {
          uuid: 'singleton-function',
          handler: 'test/functions/hello.handler.main',
          bundle: {
            copyFiles: [{ from: '/tmp/does/not/exist', to: '../' }],
          },
        }),
    ).toThrowError();
  });
});
