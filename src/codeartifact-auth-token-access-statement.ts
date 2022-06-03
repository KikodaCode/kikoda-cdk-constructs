import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { validateArn } from './validate-arn';

/**
 * A PolicyStatement that grants permissions to access the CodeArtifact repository authorization token.
 *
 * @export
 * @class CodeArtifactAuthTokenAccessStatement
 * @typedef {CodeArtifactAuthTokenAccessStatement}
 * @extends {PolicyStatement}
 */
export class CodeArtifactAuthTokenAccessStatement extends PolicyStatement {
  /**
   * A PolicyStatement that grants permissions to access the CodeArtifact repository authorization token.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {string} codeArtifactRepositoryArn
   * @param {?CodeArtifactAuthTokenAccessStatementProps} [props]
   */
  constructor(codeArtifactRepositoryArn: string) {
    validateArn(codeArtifactRepositoryArn, { service: 'codeartifact', resource: 'repository' });
    super({
      effect: Effect.ALLOW,
      actions: ['codeartifact:GetAuthorizationToken', 'sts:GetServiceBearerToken'],
      resources: [codeArtifactRepositoryArn],
    });
  }
}
