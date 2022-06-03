/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import { execSync } from 'child_process';
import { basename, join, resolve } from 'path';

import { AssetCode, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Loader, BuildOptions } from 'esbuild';
import { copySync, ensureFileSync, existsSync, readJsonSync, writeJsonSync } from 'fs-extra';
import { FunctionBundleProps } from './types';

const addExtensionToHandler = (handler: string, extension: string): string =>
  handler.replace(/\.[\w\d]+$/, extension);
const getHandlerFullPosixPath = (srcPath: string, handler: string): string =>
  srcPath === '.' ? handler : `${srcPath}/${handler}`;
const getHandlerHash = (posixPath: string): string =>
  `${posixPath.replace(/[/.]/g, '-')}-${Date.now()}`;

// A map of supported runtimes and esbuild targets
const esbuildTargetMap = {
  [Runtime.NODEJS.toString()]: 'node12',
  [Runtime.NODEJS_4_3.toString()]: 'node4',
  [Runtime.NODEJS_6_10.toString()]: 'node6',
  [Runtime.NODEJS_8_10.toString()]: 'node8',
  [Runtime.NODEJS_10_X.toString()]: 'node10',
  [Runtime.NODEJS_12_X.toString()]: 'node12',
  [Runtime.NODEJS_14_X.toString()]: 'node14',
  [Runtime.NODEJS_16_X.toString()]: 'node16',
};

interface BuilderProps {
  readonly srcPath: string;
  readonly handler: string;
  readonly buildDir: string;
  readonly runtime: Runtime;
  readonly bundle: boolean | FunctionBundleProps;
}

interface BuilderOutput {
  readonly outCode: AssetCode;
  readonly outHandler: string;
}

export function getEsbuildMetafileName(handler: string): string {
  const key = handler.replace(/[/.]/g, '-');
  return `.esbuild.${key}.json`;
}

function getEsbuildExternal(srcPath: string, bundle: boolean | FunctionBundleProps): Array<string> {
  let externals = ['aws-sdk'];

  if (bundle) {
    return [
      ...externals,
      ...((bundle as FunctionBundleProps).externalModules || []),
      ...((bundle as FunctionBundleProps).nodeModules || []),
    ];
  }

  try {
    const packageJson = readJsonSync(join(srcPath, 'package.json'));
    externals = Object.keys({
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
      ...(packageJson.peerDependencies || {}),
    });
  } catch (e) {
    console.log(`No package.json found in ${srcPath}`);
  }

  return externals;
}

function getEsbuildLoader(
  bundle: boolean | FunctionBundleProps,
): { [ext: string]: Loader } | undefined {
  if (bundle) {
    return (bundle as FunctionBundleProps).loader || {};
  }
  return undefined;
}

/**
 * Extract versions for a list of modules.
 *
 * First lookup the version in the package.json and then fallback to requiring
 * the module's package.json. The fallback is needed for transitive dependencies.
 */
function extractDependencies(pkgPath: string, modules: string[]): { [key: string]: string } {
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

export function builder(builderProps: BuilderProps): BuilderOutput {
  const { runtime, bundle, srcPath, handler, buildDir } = builderProps;
  const handlerPosixPath = getHandlerFullPosixPath(srcPath, handler);

  console.log(`Building Lambda function ${handlerPosixPath}`);

  // Check has tsconfig
  const tsconfig = join(srcPath, 'tsconfig.json');
  const hasTsconfig = existsSync(tsconfig);

  // Check entry path exists
  let entryPath = '';
  const entryPathExists = ['.ts', '.tsx', '.js', '.jsx'].some(ext => {
    entryPath = join(srcPath, addExtensionToHandler(handler, ext));
    return existsSync(entryPath);
  });

  if (!entryPathExists) {
    throw new Error(`Cannot find a handler file for "${handlerPosixPath}".`);
  }

  // Four cases:
  //  1. BUNDLE + srcPath ROOT
  //      src       : path/to/file.method
  //      buildPath : .build/hash-$ts
  //      outCode   : .build/hash-$ts
  //      outHandler: file.method
  //
  //  2. BUNDLE + srcPath NON-ROOT
  //      src       : srcPath/path/to/file.method
  //      buildPath : srcPath/.build/hash-$ts
  //      outCode   : srcPath/.build/hash-$ts
  //      outHandler: file.method
  //
  //  3. non-BUNDLE + srcPath ROOT
  //      src       : path/to/file.method
  //      buildPath : .build/handlerDir
  //      outCode   : .
  //
  //     Note: This case is NOT SUPPORTED because we need to zip the app root for each
  //           handler. So after a Lambda's zip is generated, the next Lambda's zip will
  //           contain the previous Lambda's zip inside .build, and the previous Lambda's
  //           zip inside cdk.out.
  //
  //           One solution would be to cherry pick what to zip. For example, zip should
  //           only include the esbuid's output (ie. .js and .js.map files) from the
  //           .build folder.
  //
  //           Also need to clear all .build folders generated from Lambda functions that
  //           has srcPath.
  //
  //  4. non-BUNDLE + srcPath NON-ROOT
  //      src       : srcPath/path/to/file.method
  //      buildPath : srcPath/.build/hash-$ts
  //      zipInput  : srcPath
  //      zipOutput : .build/hash-$ts.zip
  //      outCode   : .build/hash-$ts.zip
  //      outHandler: .build/hash-$ts/file.method
  //
  //     Note:
  //       If `bundle` is disabled, we need to zip manually. Because the same
  //       `srcPath` is zipped for each handler, and CDK asset would only zip
  //       it once. So the rest of Lambda zips do not contain the output handler file.
  //
  //       Place outZip at the app root's .build because entire srcPath is zipped up.
  //       If outZip is srcPath's .build, a Lambda's zip would include zip files from
  //       all the previous Lambdas.

  const appPath = process.cwd();
  const handlerHash = getHandlerHash(handlerPosixPath);
  const buildPath = join(srcPath, buildDir, handlerHash);
  const metafile = join(srcPath, buildDir, getEsbuildMetafileName(handler));

  // Command hook: before bundling
  runBeforeBundling(bundle);

  // Transpile
  transpile(entryPath, bundle);

  // Command hook: before install
  runBeforeInstall(bundle);

  // Package nodeModules
  installNodeModules(srcPath, bundle);

  // Command hook: after bundling
  runAfterBundling(bundle);

  // Format response
  const outCode = Code.fromAsset(buildPath);
  const outHandler = basename(handler);

  return { outCode, outHandler };

  /// ////////////
  // Functions //
  /// ////////////

  function transpile(entryPath: string, bundle: boolean | FunctionBundleProps) {
    // Build default esbuild config
    const defaultConfig: Partial<BuildOptions> = {
      external: getEsbuildExternal(srcPath, bundle),
      loader: getEsbuildLoader(bundle),
      metafile: true,
      bundle: true,
      format: 'cjs',
      sourcemap: true,
      platform: 'node',
      target: [esbuildTargetMap[runtime.toString()] || 'node12'],
      outdir: buildPath,
      entryPoints: [entryPath],
      color: process.env.NO_COLOR !== 'true',
      tsconfig: hasTsconfig ? tsconfig : undefined,
      logLevel: process.env.DEBUG ? 'warning' : 'error',
    };

    // Build esbuild command
    // Note: probably could pass JSON string also, but this felt safer.
    const esbuildScript = join(__dirname, './esbuild.js');
    const configBuffer = Buffer.from(JSON.stringify(defaultConfig));
    const cmd = [
      'yarn node',
      esbuildScript,
      '--config',
      configBuffer.toString('base64'),
      '--metafile',
      metafile,
      '--pnp true',
    ].join(' ');

    // const cmd = `yarn node ${resolve(__dirname)}/esbuild.js ${handler}`;

    // Run esbuild
    try {
      execSync(cmd, {
        cwd: appPath,
        stdio: 'inherit',
      });
    } catch (e) {
      throw new Error('There was a problem transpiling the Lambda handler.');
    }
  }

  function installNodeModules(srcPath: string, bundle: boolean | FunctionBundleProps) {
    // Validate 'nodeModules' is defined in bundle options
    bundle = bundle as FunctionBundleProps;
    if (!bundle || !bundle.nodeModules || bundle.nodeModules.length === 0) {
      return;
    }

    // Find 'package.json' at handler's srcPath.
    const pkgPath = join(srcPath, 'package.json');
    if (!existsSync(pkgPath)) {
      throw new Error(
        `Cannot find a "package.json" in the function's srcPath: ${resolve(srcPath)}`,
      );
    }

    // Determine dependencies versions, lock file and installer
    const dependencies = extractDependencies(pkgPath, bundle.nodeModules);
    let installer = 'npm';
    let lockFile;
    if (existsSync(join(srcPath, 'package-lock.json'))) {
      installer = 'npm';
      lockFile = 'package-lock.json';
    } else if (existsSync(join(srcPath, 'yarn.lock'))) {
      installer = 'yarn';
      lockFile = 'yarn.lock';
    }

    // Create dummy package.json, copy lock file if any and then install
    const outputPath = join(buildPath, 'package.json');
    ensureFileSync(outputPath);
    writeJsonSync(outputPath, { dependencies });
    if (lockFile) {
      copySync(join(srcPath, lockFile), join(buildPath, lockFile));
    }

    try {
      execSync(`${installer} install`, {
        cwd: buildPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem installing nodeModules.');
      throw e;
    }
  }

  function runBeforeBundling(bundle: boolean | FunctionBundleProps) {
    // Build command
    bundle = bundle as FunctionBundleProps;
    const cmds = bundle?.commandHooks?.beforeBundling(srcPath, buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "beforeBundling" command.');
      throw e;
    }
  }

  function runBeforeInstall(bundle: boolean | FunctionBundleProps) {
    // Build command
    bundle = bundle as FunctionBundleProps;
    const cmds = bundle?.commandHooks?.beforeInstall(srcPath, buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "beforeInstall" command.');
      throw e;
    }
  }

  function runAfterBundling(bundle: boolean | FunctionBundleProps) {
    // Build command
    bundle = bundle as FunctionBundleProps;
    const cmds = bundle?.commandHooks?.afterBundling(srcPath, buildPath) ?? [];
    if (cmds.length === 0) {
      return;
    }

    try {
      execSync(cmds.join(' && '), {
        cwd: srcPath,
        stdio: 'pipe',
      });
    } catch (e) {
      console.log('There was a problem running "afterBundling" command.');
      throw e;
    }
  }
}
