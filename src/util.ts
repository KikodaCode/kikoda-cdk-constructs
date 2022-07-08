import { existsSync } from 'fs';
import { dirname, join, parse, resolve } from 'path';
import { findLockFile, PackageManager } from './package-manager';

/**
 * Creates synth commands based on input parameters.
 *
 * @private
 * @param {?string} [synthOutputDir]
 * @param {?string} [baseDir]
 * @param {?string} [assumeRoleArn]
 * @param {boolean} [installRequired=true]
 * @param {string} [pkgManager='yarn']
 * @returns {{}}
 */
export function defineSynthCommands(
  baseDir?: string,
  synthOutputDir?: string,
  depsLockFilePath?: string,
  installRequired: boolean = true,
) {
  let commands: string[] = [];
  const lockFilePath = findLockFile(depsLockFilePath);
  const pkgManager = PackageManager.fromLockFile(lockFilePath);
  if (baseDir) {
    commands.push(`cd ${baseDir}`);
  }
  if (installRequired) {
    for (const cmd of pkgManager.installCommand) {
      commands.push(cmd);
    }
  }
  if (synthOutputDir) {
    commands.push(pkgManager.runScript('cdk synth', `-o ${synthOutputDir}`));
  } else {
    commands.push(pkgManager.runScript('cdk synth'));
  }
  return commands;
}
/**
 * Find a file by walking up parent directories
 */
export function findUp(name: string, directory: string = process.cwd()): string | undefined {
  return findUpMultiple([name], directory)[0];
}

/**
 * Find the lowest of multiple files by walking up parent directories. If
 * multiple files exist at the same level, they will all be returned.
 */
export function findUpMultiple(names: string[], directory: string = process.cwd()): string[] {
  const absoluteDirectory = resolve(directory);

  const files: string[] = [];
  for (const name of names) {
    const file = join(directory, name);
    if (existsSync(file)) {
      files.push(file);
    }
  }

  if (files.length > 0) {
    return files;
  }

  const { root } = parse(absoluteDirectory);
  if (absoluteDirectory === root) {
    return [];
  }

  return findUpMultiple(names, dirname(absoluteDirectory));
}
