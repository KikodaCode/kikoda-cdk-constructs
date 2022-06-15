import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { AssetHashType, DockerImage } from 'aws-cdk-lib';
import { AssetCode, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Loader, BuildOptions } from 'esbuild';
import { copySync, ensureFileSync, existsSync, readJsonSync, writeJsonSync } from 'fs-extra';
import { BundleProp, FunctionBundleProps } from './types';
import { copyFiles, normalizeSrcPath, validateBundle } from './util';

// A map of supported runtimes and esbuild targets
const esbuildTargetMap = {
  [Runtime.NODEJS_12_X.toString()]: 'node12',
  [Runtime.NODEJS_14_X.toString()]: 'node14',
  [Runtime.NODEJS_16_X.toString()]: 'node16',
};

export class NonExistentHandlerError extends Error {}
export class NonExistentPackageJsonError extends Error {}
export class AmbiguousPackageManagerError extends Error {}
export class HandlerTransipilationError extends Error {}

export interface BundleProps {
  readonly id: string;
  readonly srcPath?: string;
  readonly handler: string;
  readonly runtime: Runtime;
  readonly bundle?: BundleProp;
}

export interface BuilderProps {
  readonly srcPath: string;
  readonly handler: string;
  readonly buildPath: string;
  readonly runtime: Runtime;
  readonly bundle: boolean | FunctionBundleProps;
}

export class Builder {
  public static bundle({ id, srcPath = '.', bundle, handler, runtime }: BundleProps): AssetCode {
    srcPath = normalizeSrcPath(srcPath);
    const validBundle = validateBundle(id, srcPath, bundle);

    return AssetCode.fromAsset(srcPath, {
      assetHashType: AssetHashType.OUTPUT,
      bundling: {
        image: DockerImage.fromRegistry('public.ecr.aws/sam/build-nodejs16.x'), // unsupported
        local: {
          tryBundle: outputDir => {
            new Builder({
              bundle: validBundle as boolean | FunctionBundleProps,
              srcPath,
              buildPath: outputDir,
              handler,
              runtime,
            });

            copyFiles(bundle, srcPath, outputDir);

            return true;
          },
        },
      },
    });
  }

  readonly appPath: string;
  readonly buildPath: string;
  readonly metafile: string;
  readonly runtime: Runtime;
  readonly hasTsconfig: Boolean;
  readonly tsconfig: string;
  readonly srcPath: string;
  bundle: boolean | FunctionBundleProps;
  entryPath: string;

  constructor(props: BuilderProps) {
    const { handler } = props;
    this.srcPath = props.srcPath;
    this.buildPath = props.buildPath;
    this.bundle = props.bundle;
    this.runtime = props.runtime;
    const handlerPosixPath = this.getHandlerFullPosixPath(this.srcPath, handler);

    this.appPath = process.cwd();
    this.metafile = join(this.buildPath, this.getEsbuildMetafileName(handler));

    // Check has tsconfig
    this.tsconfig = join(this.srcPath, 'tsconfig.json');
    this.hasTsconfig = existsSync(this.tsconfig);

    // Check entry path exists
    this.entryPath = '';
    const entryPathExists = ['.ts', '.tsx', '.js', '.jsx'].some(ext => {
      this.entryPath = join(this.srcPath, this.addExtensionToHandler(handler, ext));
      return existsSync(this.entryPath);
    });

    if (!entryPathExists) {
      throw new NonExistentHandlerError(`Cannot find a handler file for "${handlerPosixPath}".`);
    }

    /*
     * Four cases:
     *  1. BUNDLE + this.srcPath ROOT
     *      src       : path/to/file.method
     *      buildPath : .build/hash-$ts
     *      outCode   : .build/hash-$ts
     *      outHandler: file.method
     *
     *  2. BUNDLE + this.srcPath NON-ROOT
     *      src       : this.srcPath/path/to/file.method
     *      buildPath : this.srcPath/.build/hash-$ts
     *      outCode   : this.srcPath/.build/hash-$ts
     *      outHandler: file.method
     *
     *  3. non-BUNDLE + this.srcPath ROOT
     *      src       : path/to/file.method
     *      buildPath : .build/handlerDir
     *      outCode   : .
     *
     *     Note: This case is NOT SUPPORTED because we need to zip the app root for each
     *           handler. So after a Lambda's zip is generated, the next Lambda's zip will
     *           contain the previous Lambda's zip inside .build, and the previous Lambda's
     *           zip inside cdk.out.
     *
     *           One solution would be to cherry pick what to zip. For example, zip should
     *           only include the esbuid's output (ie. .js and .js.map files) from the
     *           .build folder.
     *
     *           Also need to clear all .build folders generated from Lambda functions that
     *           have this.srcPath.
     *
     *  4. non-BUNDLE + this.srcPath NON-ROOT
     *      src       : this.srcPath/path/to/file.method
     *      buildPath : this.srcPath/.build/hash-$ts
     *      zipInput  : this.srcPath
     *      zipOutput : .build/hash-$ts.zip
     *      outCode   : .build/hash-$ts.zip
     *      outHandler: .build/hash-$ts/file.method
     *
     *     Note:
     *       If `bundle` is disabled, we need to zip manually. Because the same
     *       `this.srcPath` is zipped for each handler, and CDK asset would only zip
     *       it once. So the rest of Lambda zips do not contain the output handler file.
     *
     *       Place outZip at the app root's .build because entire this.srcPath is zipped up.
     *       If outZip is this.srcPath's .build, a Lambda's zip would include zip files from
     *       all the previous Lambdas.
     */

    // Command hook: before bundling
    this.runBeforeBundling();

    // Transpile
    this.transpile();

    // Command hook: before install
    this.runBeforeInstall();

    // Package nodeModules
    this.installNodeModules();

    // Command hook: after bundling
    this.runAfterBundling();
  }

  transpile() {
    // Build default esbuild config
    const defaultConfig: Partial<BuildOptions> = {
      external: this.getEsbuildExternal(),
      loader: this.getEsbuildLoader(),
      metafile: true,
      bundle: true,
      format: 'cjs',
      sourcemap: true,
      platform: 'node',
      target: [esbuildTargetMap[this.runtime.toString()] || 'node12'],
      outdir: this.buildPath,
      entryPoints: [this.entryPath],
      color: process.env.NO_COLOR !== 'true',
      tsconfig: this.hasTsconfig ? this.tsconfig : undefined,
      logLevel: process.env.DEBUG ? 'warning' : 'error',
    };

    // Build esbuild command
    // Note: probably could pass JSON string also, but this felt safer.
    const esbuildScript = join(__dirname, './esbuild.js');
    const configBuffer = Buffer.from(JSON.stringify(defaultConfig));
    const { packageManager } = this.getPackageManager();

    const cmd = [
      packageManager === 'yarn' ? packageManager : 'npx',
      'node',
      esbuildScript,
      '--config',
      configBuffer.toString('base64'),
      '--metafile',
      this.metafile,
      '--pnp true',
    ].join(' ');

    // Run esbuild
    try {
      execSync(cmd, {
        cwd: this.appPath,
        stdio: 'inherit',
      });
    } catch (e) {
      console.error(e);
      throw new HandlerTransipilationError('There was a problem transpiling the Lambda handler.');
    }
  }

  installNodeModules() {
    // Validate 'nodeModules' is defined in bundle options
    this.bundle = this.bundle as FunctionBundleProps;
    if (!this.bundle || !this.bundle.nodeModules || this.bundle.nodeModules.length === 0) {
      return;
    }

    // Find 'package.json' at handler's srcPath.
    const pkgPath = join(this.srcPath, 'package.json');
    if (!existsSync(pkgPath)) {
      throw new NonExistentPackageJsonError(
        `Cannot find a "package.json" in the function's srcPath: ${resolve(this.srcPath)}`,
      );
    }

    // Determine dependencies versions, lock file and packageManager
    const dependencies = this.extractDependencies(pkgPath, this.bundle.nodeModules);
    const { packageManager, lockFile } = this.getPackageManager();

    // Create dummy package.json, copy lock file if any and then install
    const outputPath = join(this.buildPath, 'package.json');
    ensureFileSync(outputPath);
    writeJsonSync(outputPath, { dependencies });
    if (lockFile) {
      copySync(join(this.srcPath, lockFile), join(this.buildPath, lockFile));
    }

    try {
      execSync(`${packageManager} install`, {
        cwd: this.buildPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.error('There was a problem installing nodeModules.');
      throw e;
    }
  }

  runBeforeBundling() {
    // Build command
    this.bundle = this.bundle as FunctionBundleProps;
    const cmds = this.bundle?.commandHooks?.beforeBundling(this.srcPath, this.buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: this.srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "beforeBundling" command.');
      throw e;
    }
  }

  runBeforeInstall() {
    // Build command
    this.bundle = this.bundle as FunctionBundleProps;
    const cmds = this.bundle?.commandHooks?.beforeInstall(this.srcPath, this.buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: this.srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "beforeInstall" command.');
      throw e;
    }
  }

  runAfterBundling() {
    // Build command
    this.bundle = this.bundle as FunctionBundleProps;
    const cmds = this.bundle?.commandHooks?.afterBundling(this.srcPath, this.buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: this.srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "afterBundling" command.');
      throw e;
    }
  }

  /**
   * Extract versions for a list of modules.
   *
   * First lookup the version in the package.json and then fallback to requiring
   * the module's package.json. The fallback is needed for transitive dependencies.
   */
  private extractDependencies(pkgPath: string, modules: string[]): { [key: string]: string } {
    const dependencies: { [key: string]: string } = {};

    const pkgJson = readJsonSync(pkgPath);

    const pkgDependencies: { [k: string]: string } = {
      ...(pkgJson.dependencies ?? {}),
      ...(pkgJson.devDependencies ?? {}),
      ...(pkgJson.peerDependencies ?? {}),
    };

    modules.forEach(async mod => {
      try {
        if (pkgDependencies[mod]) {
          dependencies[mod] = pkgDependencies[mod];
        } else {
          const module = await import(`${mod}/package.json`);
          dependencies[mod] = module.version;
        }
      } catch (err) {
        throw new Error(
          `Cannot extract version for module '${mod}'. Check that it's referenced in your package.json or installed.`,
        );
      }
    });

    return dependencies;
  }

  private getEsbuildLoader(): { [ext: string]: Loader } | undefined {
    if (this.bundle) {
      return (this.bundle as FunctionBundleProps).loader || {};
    }
    return undefined;
  }

  private getEsbuildExternal(): Array<string> {
    let externals = ['aws-sdk'];

    if (this.bundle) {
      return [
        ...externals,
        ...((this.bundle as FunctionBundleProps).externalModules || []),
        ...((this.bundle as FunctionBundleProps).nodeModules || []),
      ];
    }

    try {
      const packageJson = readJsonSync(join(this.srcPath, 'package.json'));
      externals = Object.keys({
        ...(packageJson.dependencies || {}),
        ...(packageJson.devDependencies || {}),
        ...(packageJson.peerDependencies || {}),
      });
    } catch (e) {
      console.log(`No package.json found in ${this.srcPath}`);
    }

    return externals;
  }

  private addExtensionToHandler(handler: string, extension: string): string {
    return handler.replace(/\.[\w\d]+$/, extension);
  }

  private getHandlerFullPosixPath(srcPath: string, handler: string): string {
    return srcPath === '.' ? handler : `${srcPath}/${handler}`;
  }

  private getEsbuildMetafileName(handler: string): string {
    const key = handler.replace(/[/.]/g, '-');
    return `.esbuild.${key}.json`;
  }

  private getPackageManager(): { packageManager?: string; lockFile?: string } {
    let packageManager;
    let lockFile;

    if (existsSync(join(this.srcPath, 'package-lock.json'))) {
      packageManager = 'npm';
      lockFile = 'package-lock.json';
    } else if (existsSync(join(this.srcPath, 'yarn.lock'))) {
      packageManager = 'yarn';
      lockFile = 'yarn.lock';
    }

    if (!packageManager) {
      throw new AmbiguousPackageManagerError(
        `Could not determine package manager.. a lockfile should existing in ${this.srcPath}`,
      );
    }

    return { packageManager, lockFile };
  }
}
