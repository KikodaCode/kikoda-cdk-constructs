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
  pkgManager: 'yarn' | 'npm' = 'yarn',
  baseDir?: string,
  synthOutputDir?: string,
  installRequired: boolean = true,
) {
  let commands: string[] = [];
  if (baseDir) {
    commands.push(`cd ${baseDir}`);
  }
  if (installRequired) {
    commands.push(`${pkgManager} install`);
  }
  let synthCommand = `${pkgManager}${pkgManager === 'npm' ? ' run' : ''} cdk synth`;
  if (synthOutputDir && synthOutputDir !== '') {
    synthCommand += `${pkgManager === 'npm' ? ' --' : ''} -o ${synthOutputDir}`;
  }
  commands.push(synthCommand);
  return commands;
}
