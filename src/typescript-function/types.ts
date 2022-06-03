import { ICommandHooks } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Loader } from 'esbuild';

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
