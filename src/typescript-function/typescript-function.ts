import { basename } from 'path';
import { Function, FunctionOptions, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { Builder } from './builder';
import { BundleProp } from './types';

export interface TypescriptFunctionProps extends FunctionOptions {
  /** Path to the entry point and handler function. Uses the format, /path/to/file.function.
   * Where the first part is the path to the file, followed by the name of the function that's
   * exported in that file.
   */
  readonly handler: string;
  readonly runtime?: Runtime;
  /**
   * Disable bundling with esbuild.
   *
   * @default - Defaults to true
   */
  readonly bundle?: BundleProp;
  /**
   * The source directory where the entry point is located. The node_modules in this
   * directory is used to generate the bundle.
   *
   * @default - Defaults to the app directory.
   */
  readonly srcPath?: string;
}

export class TypescriptFunction extends Function {
  constructor(scope: Construct, id: string, props: TypescriptFunctionProps) {
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
