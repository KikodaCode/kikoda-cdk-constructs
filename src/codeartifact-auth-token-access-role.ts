import { AccountRootPrincipal, PolicyDocument, Role, RoleProps } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { merge } from 'lodash';
import { CodeArtifactAuthTokenAccessStatement } from './codeartifact-auth-token-access-statement';
import { validateArn } from './validate-arn';

export interface CodeArtifactAuthTokenAccessRoleProps {
  /**
   * The arn of the CodeArtifacts repository. The CodeArtifactAuthTokenAccessStatement is added as an inline policy.
   * The assumedBy principal defaults to AccountRootPrincipal.
   *
   * @readonly
   * @type {string}
   */
  readonly codeArtifactRepositoryArn: string;
  readonly assumedBy?: RoleProps['assumedBy'];
  readonly externalIds?: RoleProps['externalIds'];
  readonly managedPolicies?: RoleProps['managedPolicies'];
  readonly inlinePolicies?: RoleProps['inlinePolicies'];
  readonly path?: RoleProps['path'];
  readonly permissionsBoundary?: RoleProps['permissionsBoundary'];
  readonly roleName?: RoleProps['roleName'];
  readonly maxSessionDuration?: RoleProps['maxSessionDuration'];
  readonly description?: RoleProps['description'];
}

/**
 * Access role for a CodeArtifacts repository.
 *
 * @export
 * @class CodeArtifactAuthTokenAccessRole
 * @typedef {CodeArtifactAuthTokenAccessRole}
 * @extends {Role}
 */
export class CodeArtifactAuthTokenAccessRole extends Role {
  /**
   * Creates an instance of CodeArtifactAuthTokenAccessRole.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {CodeArtifactAuthTokenAccessRoleProps} props
   */
  constructor(scope: Construct, id: string, props: CodeArtifactAuthTokenAccessRoleProps) {
    validateArn(props.codeArtifactRepositoryArn, {
      service: 'codeartifact',
      resource: 'repository',
    });
    const { assumedBy = new AccountRootPrincipal(), inlinePolicies } = props ?? {};
    super(scope, id, {
      ...props,
      assumedBy,
      inlinePolicies: merge(inlinePolicies, {
        CodeArtifactAuthTokenAccessStatement: new PolicyDocument({
          statements: [new CodeArtifactAuthTokenAccessStatement(props.codeArtifactRepositoryArn)],
        }),
      }),
    });
  }
}
