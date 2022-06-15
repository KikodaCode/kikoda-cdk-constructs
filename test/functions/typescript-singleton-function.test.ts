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
      entry: 'test/functions/hello.handler.ts',
      handler: 'main',
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });
});
