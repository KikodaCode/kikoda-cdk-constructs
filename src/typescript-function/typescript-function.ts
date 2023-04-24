import { dirname, resolve } from 'path';
import { Architecture, Function, Runtime, RuntimeFamily, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { Bundling, BundlingProps } from './bundling';
import { findEntry } from './util';
import { findLockFile } from '../package-manager';

export interface TypescriptFunctionProps extends NodejsFunctionProps {
  /**
   * Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`
   */
  readonly yarnPnP?: BundlingProps['yarnPnP'];
}

/**
 * This construct was a fork of the `@aws-cdk/aws-lambda-nodejs` construct that
 * added support for TypeScript and esbuild customizations. The construct
 * provided by `@aws-cdk/aws-lambda-nodejs` now supports everything that this construct
 * does, so this construct has been deprecated and will be removed in future releases.
 *
 * @deprecated use the `NodeJsFunction` construct from the `@aws-cdk/aws-lambda-nodejs` package instead
 */
export class TypescriptFunction extends Function {
  constructor(scope: Construct, id: string, props: TypescriptFunctionProps = {}) {
    if (props.runtime && props.runtime.family !== RuntimeFamily.NODEJS) {
      throw new Error('Only `NODEJS` runtimes are supported.');
    }

    const entry = resolve(findEntry(id, props.entry));
    const handler = props.handler ?? 'handler';
    const runtime = props.runtime ?? Runtime.NODEJS_14_X;
    const architecture = props.architecture ?? Architecture.X86_64;
    const depsLockFilePath = findLockFile(props.depsLockFilePath);
    const projectRoot = props.projectRoot ?? dirname(depsLockFilePath);

    super(scope, id, {
      ...props,
      runtime,
      code: Bundling.bundle({
        ...(props.bundling ?? {}),
        entry,
        runtime,
        architecture,
        depsLockFilePath,
        projectRoot,
        yarnPnP: !!props.yarnPnP,
      }),
      handler: `index.${handler}`,
      tracing: props.tracing ?? Tracing.ACTIVE,
    });

    if (props.awsSdkConnectionReuse ?? true) {
      this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', {
        removeInEdge: true,
      });
    }
  }
}
