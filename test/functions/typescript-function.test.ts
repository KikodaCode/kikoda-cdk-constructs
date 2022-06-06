import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TypescriptFunction } from '../../src';

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
        copyFiles: [{ from: 'test/functions/', to: '../cp' }],
      },
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
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

  test('No bundling when srcPath is root should throw and error', () => {
    const stack = new TestStack();

    expect(
      () =>
        new TypescriptFunction(stack, 'TypescriptFunctionInvalidCopy', {
          handler: 'test/functions/hello.handler.main',
          bundle: {
            copyFiles: [{ from: '/tmp/does/not/exist', to: '../cp' }],
          },
        }),
    ).toThrowError();
  });
});
