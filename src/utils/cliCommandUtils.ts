import { validateArn } from './arnValidators';

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
  assumeRoleArn?: string,
  installRequired: boolean = true,
) {
  let commands: string[] = [];
  if (assumeRoleArn) {
    commands = [...commands, ...createAssumeRoleCommands(assumeRoleArn)];
  }
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

/**
 * Linux commands for assuming a role.
 *
 * @private
 * @param {string} [roleArn]
 * @returns {string[]}
 */
export function createAssumeRoleCommands(roleArn: string) {
  validateArn(roleArn, { service: 'iam', resource: 'role' });
  return [
    `ASSUME_ROLE_ARN=${roleArn}`,
    'TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)',
    'export TEMP_ROLE',
    'export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.AccessKeyId\')',
    'export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SecretAccessKey\')',
    'export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r \'.Credentials.SessionToken\')',
  ];
}
