import { isAbsolute, join, resolve } from 'path';

import {
  Function,
  FunctionOptions,
  Runtime,
  SingletonFunction,
  Tracing,
} from 'aws-cdk-lib/aws-lambda';
import { ICommandHooks } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Loader } from 'esbuild';
import { copySync, existsSync } from 'fs-extra';

import { builder } from './builder';

export interface FunctionBundleCopyFilesProps {
  readonly from: string;
  readonly to?: string;
}

export interface FunctionBundleProps {
  readonly loader?: { [ext: string]: Loader };
  readonly externalModules?: string[];
  readonly nodeModules?: string[];
  readonly commandHooks?: ICommandHooks;
  readonly copyFiles?: FunctionBundleCopyFilesProps[];
}
export type BundleProp = FunctionBundleProps | boolean;

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

const copyFiles = (bundle: BundleProp | undefined, srcPath: string, buildPath: string) => {
  if (!bundle) return;
  if (typeof bundle === 'boolean') return;
  if (!bundle.copyFiles) return;

  bundle.copyFiles.forEach(entry => {
    const fromPath = join(srcPath, entry.from);
    if (!existsSync(fromPath))
      throw new Error(
        `Tried to copy nonexistent file from "${resolve(fromPath)}" - check copyFiles entry "${
          entry.from
        }"`,
      );
    const to = entry.to || entry.from;
    if (isAbsolute(to)) throw new Error(`Copy destination path "${to}" must be relative`);
    const toPath = join(buildPath, to);
    copySync(fromPath, toPath);
  });
};

const normalizeSrcPath = (srcPath: string): string => srcPath.replace(/\/+$/, '');

export class TypescriptFunction extends Function {
  constructor(scope: Construct, id: string, props: TypescriptFunctionProps) {
    // defaults
    const srcPath = normalizeSrcPath(props.srcPath || '.');
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;
    let { bundle } = props;
    bundle = bundle === undefined ? true : props.bundle;
    if (!bundle && srcPath === '.') {
      throw new Error(
        `Bundle cannot be disabled for the "${id}" function since the "srcPath" is set to the project root.`,
      );
    }

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

export class TypescriptSingletonFunction extends SingletonFunction {
  constructor(scope: Construct, id: string, props: TypescriptSingletonFunctionProps) {
    // defaults
    const srcPath = normalizeSrcPath(props.srcPath || '.');
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;
    let { bundle } = props;
    bundle = bundle === undefined ? true : props.bundle;
    if (!bundle && srcPath === '.') {
      throw new Error(
        `Bundle cannot be disabled for the "${id}" function since the "srcPath" is set to the project root.`,
      );
    }

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
