import { App, Aspects, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  FlagLevel,
  WellArchitectedAspectsFeatureFlags,
} from '../../../src/well-architected-aspects';
import { OperationalExcellenceAspects } from '../../../src/well-architected-aspects/aspects';

describe('OperationalExcellenceAspects', () => {
  test('Enables X-Ray tracing on lambda fns when flagLevel is fix', () => {
    const app = new App({
      context: {
        [WellArchitectedAspectsFeatureFlags.ENABLE_X_RAY_TRACING]: FlagLevel.FIX,
      },
    });

    const stack = new Stack(app, 'TestStack');
    Aspects.of(stack).add(new OperationalExcellenceAspects());

    new Function(stack, 'test1', {
      runtime: Runtime.PYTHON_3_9,
      handler: 'index.handler',
      code: Code.fromInline('' + 'def handler(event, context):' + ' print(event)'),
      tracing: undefined,
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
      TracingConfig: {
        mode: 'Active',
      },
    });
  });
});
