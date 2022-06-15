import { basename } from 'path';
import { Runtime, SingletonFunction, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { Builder } from './builder';
import { TypescriptFunctionProps } from './typescript-function';

export interface TypescriptSingletonFunctionProps extends TypescriptFunctionProps {
  /**
   * A unique identifier to identify this lambda
   *
   * The identifier should be unique across all custom resource providers.
   * We recommend generating a UUID per provider.
   */
  readonly uuid: string;
  /**
   * A descriptive name for the purpose of this Lambda.
   *
   * If the Lambda does not have a physical name, this string will be
   * reflected its generated name. The combination of lambdaPurpose
   * and uuid must be unique.
   *
   * @default SingletonLambda
   */
  readonly lambdaPurpose?: string;
}

export class TypescriptSingletonFunction extends SingletonFunction {
  constructor(scope: Construct, id: string, props: TypescriptSingletonFunctionProps) {
    // defaults
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;
    const handler = basename(props.handler);

    super(scope, id, {
      ...props,
      runtime,
      handler,
      code: Builder.bundle({
        id,
        srcPath: props.srcPath,
        bundle: props.bundle,
        handler: props.handler,
        runtime,
      }),
      tracing: props.tracing ?? Tracing.ACTIVE,
    });

    this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', {
      removeInEdge: true,
    });
  }
}
