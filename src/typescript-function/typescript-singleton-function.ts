import { Runtime, SingletonFunction, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { Builder } from './builder';
import { FunctionBundleProps } from './types';
import { TypescriptFunctionProps } from './typescript-function';
import { normalizeSrcPath, copyFiles, validateBundle } from './util';

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
    const srcPath = normalizeSrcPath(props.srcPath || '.');
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;

    const bundle = validateBundle(id, srcPath, props.bundle);

    const builder = new Builder({
      bundle: bundle as boolean | FunctionBundleProps,
      srcPath,
      handler: props.handler,
      runtime,
      buildDir: '.build',
    });

    const { outCode, outHandler } = builder;

    copyFiles(bundle, srcPath, outCode.path);

    super(scope, id, {
      ...props,
      runtime,
      handler: outHandler,
      code: outCode,
      tracing: props.tracing ?? Tracing.ACTIVE,
    });

    this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', {
      removeInEdge: true,
    });
  }
}
