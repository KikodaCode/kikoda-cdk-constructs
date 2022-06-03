import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { validateArn } from '../../../utils/arnValidators';

/**
 * A role that grants permissions to access the CodeArtifacts repository authorization token.
 *
 * @export
 * @class CodeArtifactsTokenAccessRole
 * @typedef {CodeArtifactsTokenAccessRole}
 * @extends {Role}
 */
export class CodeArtifactsAuthTokenAccessPolicy extends PolicyStatement {
  /**
   * A role that grants permissions to access the CodeArtifacts repository authorization token.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {string} codeArtifactRepositoryArn
   * @param {?CodeArtifactsTokenAccessRoleProps} [props]
   */
  constructor(codeArtifactRepositoryArn: string) {
    validateArn(codeArtifactRepositoryArn, { service: 'codeartifact', resource: 'repository' });
    super({
      effect: Effect.ALLOW,
      actions: ['codeartifacts:GetAuthorizationToken', 'sts:GetServiceBearerToken'],
      resources: [codeArtifactRepositoryArn],
    });
  }
}
