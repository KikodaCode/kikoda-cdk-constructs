import { platform } from 'os';
import { dirname, join, relative, resolve } from 'path';
import { AssetHashType, DockerImage, ILocalBundling, AssetStaging } from 'aws-cdk-lib';
import { Architecture, AssetCode, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { BundlingOptions, OutputFormat, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import { BuildOptions } from 'esbuild';
import { findUp } from '../utils/file-utils';
import { PackageManager } from '../utils/package-manager';
import { PackageInstallation } from './package-installation';
import { getTsconfigCompilerOptions, extractDependencies, exec } from './util';

const ESBUILD_MAJOR_VERSION = '0';

/**
 * Bundling properties
 */
export interface BundlingProps extends BundlingOptions {
  /**
   * Path to lock file
   */
  readonly depsLockFilePath: string;

  /**
   * Entry file
   */
  readonly entry: string;

  /**
   * The runtime of the lambda function
   */
  readonly runtime: Runtime;

  /**
   * The system architecture of the lambda function
   */
  readonly architecture: Architecture;

  /**
   * Path to project root
   */
  readonly projectRoot: string;

  /**
   * Run compilation using `tsc` before bundling
   */
  readonly preCompilation?: boolean;

  /**
   * Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`
   */
  readonly yarnPnP?: boolean;
}

/**
 * Bundling with esbuild
 */
export class Bundling implements BundlingOptions {
  /**
   * esbuild bundled Lambda asset code
   */
  public static bundle(options: BundlingProps): AssetCode {
    return Code.fromAsset(options.projectRoot, {
      assetHash: options.assetHash,
      assetHashType: options.assetHash ? AssetHashType.CUSTOM : AssetHashType.OUTPUT,
      bundling: new Bundling(options),
    });
  }

  public static clearEsbuildInstallationCache(): void {
    this.esbuildInstallation = undefined;
  }

  public static clearTscInstallationCache(): void {
    this.tscInstallation = undefined;
  }

  private static esbuildInstallation?: PackageInstallation;
  private static tscInstallation?: PackageInstallation;

  // Core bundling options
  public readonly image: DockerImage;
  public readonly command: string[];
  public readonly environment?: { [key: string]: string };
  public readonly workingDirectory: string;
  public readonly local?: ILocalBundling;

  private readonly projectRoot: string;
  private readonly relativeEntryPath: string;
  private readonly relativeTsconfigPath?: string;
  private readonly relativeDepsLockFilePath: string;
  private readonly externals: string[];
  private readonly packageManager: PackageManager;

  constructor(private readonly props: BundlingProps) {
    this.packageManager = PackageManager.fromLockFile(props.depsLockFilePath, props.logLevel);

    Bundling.esbuildInstallation =
      Bundling.esbuildInstallation ?? PackageInstallation.detect('esbuild');
    Bundling.tscInstallation = Bundling.tscInstallation ?? PackageInstallation.detect('typescript');

    this.projectRoot = props.projectRoot;
    this.relativeEntryPath = relative(this.projectRoot, resolve(props.entry));
    this.relativeDepsLockFilePath = relative(this.projectRoot, resolve(props.depsLockFilePath));

    if (this.relativeDepsLockFilePath.includes('..')) {
      throw new Error(
        `Expected depsLockFilePath: ${props.depsLockFilePath} to be under projectRoot: ${this.projectRoot} (${this.relativeDepsLockFilePath})`,
      );
    }

    if (props.tsconfig) {
      this.relativeTsconfigPath = relative(this.projectRoot, resolve(props.tsconfig));
    }

    if (props.preCompilation && !/\.tsx?$/.test(props.entry)) {
      throw new Error('preCompilation can only be used with typescript files');
    }

    if (
      props.format === OutputFormat.ESM &&
      (props.runtime === Runtime.NODEJS_10_X || props.runtime === Runtime.NODEJS_12_X)
    ) {
      throw new Error(
        `ECMAScript module output format is not supported by the ${props.runtime.name} runtime`,
      );
    }

    this.externals = [
      ...(props.externalModules ?? ['aws-sdk']), // Mark aws-sdk as external by default (available in the runtime)
      ...(props.nodeModules ?? []), // Mark the modules that we are going to install as externals also
    ];

    // Docker bundling
    const shouldBuildImage = props.forceDockerBundling || !Bundling.esbuildInstallation;
    this.image = shouldBuildImage
      ? props.dockerImage ??
        DockerImage.fromBuild(join(__dirname, '../typescript-function'), {
          buildArgs: {
            ...(props.buildArgs ?? {}),
            IMAGE: props.runtime.bundlingImage.image,
            ESBUILD_VERSION: props.esbuildVersion ?? ESBUILD_MAJOR_VERSION,
          },
          platform: props.architecture.dockerPlatform,
        })
      : DockerImage.fromRegistry('dummy'); // Do not build if we don't need to

    const bundlingCommand = this.createBundlingCommand({
      inputDir: AssetStaging.BUNDLING_INPUT_DIR,
      outputDir: AssetStaging.BUNDLING_OUTPUT_DIR,
      esbuildRunner: 'esbuild', // esbuild is installed globally in the docker image
      tscRunner: 'tsc', // tsc is installed globally in the docker image
      osPlatform: 'linux', // linux docker image
    });
    this.command = ['bash', '-c', bundlingCommand];
    this.environment = props.environment;
    // Bundling sets the working directory to AssetStaging.BUNDLING_INPUT_DIR
    // and we want to force npx to use the globally installed esbuild.
    this.workingDirectory = '/';

    // Local bundling
    if (!props.forceDockerBundling) {
      // only if Docker is not forced
      this.local = this.getLocalBundlingProvider();
    }
  }

  private createBundlingCommand(options: BundlingCommandOptions): string {
    const pathJoin = osPathJoin(options.osPlatform);
    let relativeEntryPath = pathJoin(options.inputDir, this.relativeEntryPath);
    let tscCommand = '';

    if (this.props.preCompilation) {
      const tsconfig = this.props.tsconfig ?? findUp('tsconfig.json', dirname(this.props.entry));
      if (!tsconfig) {
        throw new Error(
          'Cannot find a `tsconfig.json` but `preCompilation` is set to `true`, please specify it via `tsconfig`',
        );
      }
      const compilerOptions = getTsconfigCompilerOptions(tsconfig);
      tscCommand = `${options.tscRunner} "${relativeEntryPath}" ${compilerOptions}`;
      relativeEntryPath = relativeEntryPath.replace(/\.ts(x?)$/, '.js$1');
    }

    if (this.props.sourceMap === false && this.props.sourceMapMode) {
      throw new Error('sourceMapMode cannot be used when sourceMap is false');
    }

    const sourceMapEnabled = this.props.sourceMapMode ?? this.props.sourceMap;
    const sourceMapMode = this.props.sourceMapMode ?? SourceMapMode.DEFAULT;
    const sourceMapValue =
      sourceMapMode === SourceMapMode.DEFAULT
        ? true
        : (this.props.sourceMapMode?.toString() as BuildOptions['sourcemap']);
    const sourcesContent = this.props.sourcesContent ?? true;

    const outFile = this.props.format === OutputFormat.ESM ? 'index.mjs' : 'index.js';

    const esbuildConfig: Partial<BuildOptions> = {
      bundle: true,
      entryPoints: [relativeEntryPath],
      target: this.props.target ?? toTarget(this.props.runtime),
      platform: 'node',
      format: this.props.format ?? OutputFormat.CJS,
      outfile: pathJoin(options.outputDir, outFile),
      minify: this.props.minify,
      sourcemap: sourceMapEnabled ? sourceMapValue : undefined,
      sourcesContent,
      external: this.externals,
      loader: this.props.loader as BuildOptions['loader'],
      define: this.props.define,
      logLevel: this.props.logLevel,
      keepNames: this.props.keepNames,
      tsconfig: this.relativeTsconfigPath
        ? pathJoin(options.inputDir, this.relativeTsconfigPath)
        : undefined,
      metafile: this.props.metafile,
      banner: this.props.banner ? { js: this.props.banner } : undefined,
      footer: this.props.footer ? { js: this.props.footer } : undefined,
      charset: this.props.charset,
      mainFields: this.props.mainFields,
      inject: this.props.inject,
      // outdir: options.outputDir,
    };

    // Note: probably could pass JSON string also, but this felt safer.
    const esbuildScript =
      this.props.forceDockerBundling || !Bundling.esbuildInstallation
        ? join(options.inputDir, 'src/typescript-function/esbuild.js')
        : join(__dirname, './esbuild.js');
    const configBuffer = Buffer.from(JSON.stringify(esbuildConfig));

    const esbuildCommand: string[] = [
      'node',
      esbuildScript,
      '--config',
      configBuffer.toString('base64'),
      '--metafile',
      pathJoin(options.outputDir, 'index.meta.json'),
      '--pnp',
      `${this.props.yarnPnP}`,
    ];

    let depsCommand = '';
    if (this.props.nodeModules) {
      // Find 'package.json' closest to entry folder, we are going to extract the
      // modules versions from it.
      const pkgPath = findUp('package.json', dirname(this.props.entry));
      if (!pkgPath) {
        throw new Error(
          'Cannot find a `package.json` in this project. Using `nodeModules` requires a `package.json`.',
        );
      }

      // Determine dependencies versions, lock file and installer
      const dependencies = extractDependencies(pkgPath, this.props.nodeModules);
      const osCommand = new OsCommand(options.osPlatform);

      const lockFilePath = pathJoin(
        options.inputDir,
        this.relativeDepsLockFilePath ?? this.packageManager.lockFile,
      );

      // Create dummy package.json, copy lock file if any and then install
      depsCommand = chain([
        osCommand.writeJson(pathJoin(options.outputDir, 'package.json'), { dependencies }),
        osCommand.copy(lockFilePath, pathJoin(options.outputDir, this.packageManager.lockFile)),
        osCommand.changeDirectory(options.outputDir),
        this.packageManager.installCommand.join(' '),
      ]);
    }

    return chain([
      ...(this.props.commandHooks?.beforeBundling(options.inputDir, options.outputDir) ?? []),
      tscCommand,
      esbuildCommand.join(' '),
      ...((this.props.nodeModules &&
        this.props.commandHooks?.beforeInstall(options.inputDir, options.outputDir)) ??
        []),
      depsCommand,
      ...(this.props.commandHooks?.afterBundling(options.inputDir, options.outputDir) ?? []),
    ]);
  }

  private getLocalBundlingProvider(): ILocalBundling {
    const osPlatform = platform();
    const createLocalCommand = (
      outputDir: string,
      esbuild: PackageInstallation,
      tsc?: PackageInstallation,
    ) =>
      this.createBundlingCommand({
        inputDir: this.projectRoot,
        outputDir,
        esbuildRunner: esbuild.isLocal ? this.packageManager.runBinCommand('esbuild') : 'esbuild',
        tscRunner: tsc && (tsc.isLocal ? this.packageManager.runBinCommand('tsc') : 'tsc'),
        osPlatform,
      });
    const environment = this.props.environment ?? {};
    const cwd = this.projectRoot;

    return {
      tryBundle(outputDir: string) {
        if (!Bundling.esbuildInstallation) {
          process.stderr.write('esbuild cannot run locally. Switching to Docker bundling.\n');
          return false;
        }

        if (!Bundling.esbuildInstallation.version.startsWith(`${ESBUILD_MAJOR_VERSION}.`)) {
          throw new Error(
            `Expected esbuild version ${ESBUILD_MAJOR_VERSION}.x but got ${Bundling.esbuildInstallation.version}`,
          );
        }

        const localCommand = createLocalCommand(
          outputDir,
          Bundling.esbuildInstallation,
          Bundling.tscInstallation,
        );

        exec(
          osPlatform === 'win32' ? 'cmd' : 'bash',
          [osPlatform === 'win32' ? '/c' : '-c', localCommand],
          {
            env: { ...process.env, ...environment },
            stdio: [
              // show output
              'ignore', // ignore stdio
              process.stderr, // redirect stdout to stderr
              'inherit', // inherit stderr
            ],
            cwd,
            windowsVerbatimArguments: osPlatform === 'win32',
          },
        );

        return true;
      },
    };
  }
}

interface BundlingCommandOptions {
  readonly inputDir: string;
  readonly outputDir: string;
  readonly esbuildRunner: string;
  readonly tscRunner?: string;
  readonly osPlatform: NodeJS.Platform;
}

/**
 * OS agnostic command
 */
class OsCommand {
  constructor(private readonly osPlatform: NodeJS.Platform) {}

  public writeJson(filePath: string, data: any): string {
    const stringifiedData = JSON.stringify(data);
    if (this.osPlatform === 'win32') {
      return `echo ^${stringifiedData}^ > "${filePath}"`;
    }

    return `echo '${stringifiedData}' > "${filePath}"`;
  }

  public copy(src: string, dest: string): string {
    if (this.osPlatform === 'win32') {
      return `copy "${src}" "${dest}"`;
    }

    return `cp "${src}" "${dest}"`;
  }

  public changeDirectory(dir: string): string {
    return `cd "${dir}"`;
  }
}

/**
 * Chain commands
 */
function chain(commands: string[]): string {
  return commands.filter(c => !!c).join(' && ');
}

/**
 * Platform specific path join
 */
function osPathJoin(nodePlatform: NodeJS.Platform) {
  return function (...paths: string[]): string {
    const joined = join(...paths);
    // If we are on win32 but need posix style paths
    if (platform() === 'win32' && nodePlatform !== 'win32') {
      return joined.replace(/\\/g, '/');
    }
    return joined;
  };
}

/**
 * Converts a runtime to an esbuild node target
 */
function toTarget(runtime: Runtime): string {
  const match = runtime.name.match(/nodejs(\d+)/);

  if (!match) {
    throw new Error('Cannot extract version from runtime.');
  }

  return `node${match[1]}`;
}
