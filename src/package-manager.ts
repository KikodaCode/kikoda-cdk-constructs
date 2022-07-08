import { existsSync, statSync } from 'fs';
import { platform } from 'os';
import { basename, resolve } from 'path';
import { LogLevel } from 'aws-cdk-lib/aws-lambda-nodejs';
import { findUpMultiple } from './util';

/**
 * PackageManager properties.
 *
 * @interface PackageManagerProps
 * @typedef {PackageManagerProps}
 */
interface PackageManagerProps {
  /**
   * Lockfile filename.
   *
   * @readonly
   * @type {string}
   */
  readonly lockFile: string;
  /**
   * Install command parts.
   *
   * @readonly
   * @type {string[]}
   */
  readonly installCommand: string[];
  /**
   * Run command parts.
   *
   * @readonly
   * @type {string[]}
   */
  readonly runCommand: string[];
  /**
   * Run command parts.
   *
   * @readonly
   * @type {string[]}
   */
  readonly scriptCommand: string[];
  /**
   * The separator for passing arguments to commands.
   *
   * @readonly
   * @type {?string}
   */
  readonly argsSeparator?: string;
  /**
   * The separator for passing arguments to commands.
   *
   * @readonly
   * @type {?string}
   */
  readonly scriptArgFlag?: string;
}

export enum LockFile {
  NPM = 'package-lock.json',
  YARN = 'yarn.lock',
  PNPM = 'pnpm-lock.yaml',
}

/**
 * Checks given lock file or searches for a lock file
 */
export function findLockFile(depsLockFilePath?: string): string {
  if (depsLockFilePath) {
    if (!existsSync(depsLockFilePath)) {
      throw new Error(`Lock file at ${depsLockFilePath} doesn't exist`);
    }

    if (!statSync(depsLockFilePath).isFile()) {
      throw new Error('`depsLockFilePath` should point to a file');
    }

    return resolve(depsLockFilePath);
  }

  const lockFiles = findUpMultiple([LockFile.PNPM, LockFile.YARN, LockFile.NPM]);

  if (lockFiles.length === 0) {
    throw new Error(
      'Cannot find a package lock file (`pnpm-lock.yaml`, `yarn.lock` or `package-lock.json`). Please specify it with `depsLockFilePath`.',
    );
  }
  if (lockFiles.length > 1) {
    throw new Error(
      `Multiple package lock files found: ${lockFiles.join(
        ', ',
      )}. Please specify the desired one with \`depsLockFilePath\`.`,
    );
  }

  return lockFiles[0];
}

/**
 * A node package manager
 */
export class PackageManager {
  /**
   * Use a lock file path to determine the package manager to use. Optionally, specify a log level to
   * control its verbosity.
   * @param lockFilePath Path of the lock file
   * @param logLevel optional log level @default LogLevel.INFO
   * @returns the right PackageManager for that lock file
   */
  public static fromLockFile(lockFilePath: string, logLevel?: LogLevel): PackageManager {
    const lockFile = basename(lockFilePath);

    switch (lockFile) {
      case LockFile.YARN:
        return new PackageManager({
          lockFile: LockFile.YARN,
          installCommand:
            logLevel && logLevel !== LogLevel.INFO
              ? ['yarn', 'install', '--no-immutable', '--silent']
              : ['yarn', 'install', '--no-immutable'],
          runCommand: ['yarn', 'run'],
          scriptCommand: ['yarn'],
        });
      case LockFile.PNPM:
        return new PackageManager({
          lockFile: LockFile.PNPM,
          installCommand:
            logLevel && logLevel !== LogLevel.INFO
              ? ['pnpm', 'install', '--reporter', 'silent']
              : ['pnpm', 'install'],
          runCommand: ['pnpm', 'exec'],
          scriptCommand: ['pnpm', 'run'],
          argsSeparator: '--',
        });
      default:
        return new PackageManager({
          lockFile: LockFile.NPM,
          installCommand: logLevel ? ['npm', 'ci', '--loglevel', logLevel] : ['npm', 'ci'],
          runCommand: ['npx', '--no-install'],
          scriptCommand: ['npm', 'run'],
          scriptArgFlag: '--',
        });
    }
  }

  public readonly lockFile: string;
  public readonly installCommand: string[];
  public readonly runCommand: string[];
  public readonly scriptCommand: string[];
  public readonly argsSeparator?: string;
  public readonly scriptArgFlag?: string;

  constructor(props: PackageManagerProps) {
    this.lockFile = props.lockFile;
    this.installCommand = props.installCommand;
    this.runCommand = props.runCommand;
    this.scriptCommand = props.scriptCommand;
    this.argsSeparator = props.argsSeparator;
    this.scriptArgFlag = props.scriptArgFlag;
  }

  public runBinCommand(bin: string): string {
    const [runCommand, ...runArgs] = this.runCommand;
    return [
      platform() === 'win32' ? `${runCommand}.cmd` : runCommand,
      ...runArgs,
      ...(this.argsSeparator ? [this.argsSeparator] : []),
      bin,
    ].join(' ');
  }

  public runScript(script: string, ...additonalArgs: string[]): string {
    return [
      ...this.scriptCommand,
      script,
      ...(additonalArgs.length > 0
        ? this.scriptArgFlag
          ? [this.scriptArgFlag, ...additonalArgs]
          : [...additonalArgs]
        : []),
    ].join(' ');
  }
}
