import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

/**
 * A PolicyStatement that grants permissions to access the CodeArtifact
 * repository authorization token.
 *
 * @extends {PolicyStatement}
 */
export class CodeArtifactAuthTokenAccessStatement extends PolicyStatement {
  /**
   * A PolicyStatement that grants permissions to access the CodeArtifact
   * repository authorization token.
   *
   * @constructor
   * @param codeArtifactRepositoryArn
   */
  constructor(codeArtifactRepositoryArn: string) {
    super({
      effect: Effect.ALLOW,
      actions: ['codeartifact:GetAuthorizationToken', 'sts:GetServiceBearerToken'],
      resources: [codeArtifactRepositoryArn],
    });
  }
}
