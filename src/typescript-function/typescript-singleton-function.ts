import { dirname, resolve } from 'path';
import {
  Architecture,
  Runtime,
  RuntimeFamily,
  SingletonFunction,
  Tracing,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { Bundling } from './bundling';
import { TypescriptFunctionProps } from './typescript-function';
import { findEntry, findLockFile } from './util';

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
    if (props.runtime && props.runtime.family !== RuntimeFamily.NODEJS) {
      throw new Error('Only `NODEJS` runtimes are supported.');
    }

    // Entry and defaults
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
