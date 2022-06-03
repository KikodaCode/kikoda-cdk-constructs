import { Function, FunctionOptions, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { builder } from './builder';
import { BundleProp, FunctionBundleProps } from './types';
import { normalizeSrcPath, copyFiles, validateBundle } from './util';

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
    const srcPath = normalizeSrcPath(props.srcPath || '.');
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;

    const bundle = validateBundle(id, srcPath, props.bundle);

    const ret = builder({
      bundle: bundle as boolean | FunctionBundleProps,
      srcPath,
      handler: props.handler,
      runtime,
      buildDir: '.build',
    });

    const { outCode, outHandler } = ret;

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
