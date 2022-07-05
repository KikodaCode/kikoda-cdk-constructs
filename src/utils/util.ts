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
