import { Aspects, Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { OperationalExcellenceAspects } from '../../../src/well-architected-aspects/aspects';

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
