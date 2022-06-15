import { dirname, resolve } from 'path';
import { Architecture, Function, Runtime, RuntimeFamily, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { Bundling, BundlingProps } from './bundling';
import { findEntry, findLockFile } from './util';

export interface TypescriptFunctionProps extends NodejsFunctionProps {
  readonly yarnPnP?: BundlingProps['yarnPnP'];
}

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
