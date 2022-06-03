import { AccountRootPrincipal, PolicyDocument, Role, RoleProps } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { merge } from 'lodash';
import { validateArn } from '../../../utils/arnValidators';
import { CodeArtifactsAuthTokenAccessPolicy } from '../CodeArtifactsAuthTokenAccessPolicy';

export interface CodeArtifactsAuthTokenAccessRoleProps {
  /**
   * The arn of the CodeArtifacts repository. The CodeArtifactsAuthTokenAccessPolicy is added as an inline policy.
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
 * @class CodeArtifactsAuthTokenAccessRole
 * @typedef {CodeArtifactsAuthTokenAccessRole}
 * @extends {Role}
 */
export class CodeArtifactsAuthTokenAccessRole extends Role {
  /**
   * Creates an instance of CodeArtifactsAuthTokenAccessRole.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {CodeArtifactsAuthTokenAccessRoleProps} props
   */
  constructor(scope: Construct, id: string, props: CodeArtifactsAuthTokenAccessRoleProps) {
    validateArn(props.codeArtifactRepositoryArn, {
      service: 'codeartifact',
      resource: 'repository',
    });
    const { assumedBy = new AccountRootPrincipal(), inlinePolicies } = props ?? {};
    super(scope, id, {
      ...props,
      assumedBy,
      inlinePolicies: merge(inlinePolicies, {
        CodeArtifactsAuthTokenAccessPolicy: new PolicyDocument({
          statements: [new CodeArtifactsAuthTokenAccessPolicy(props.codeArtifactRepositoryArn)],
        }),
      }),
    });
  }
}
