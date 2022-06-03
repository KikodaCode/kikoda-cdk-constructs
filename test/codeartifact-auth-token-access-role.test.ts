import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CodeArtifactAuthTokenAccessRole } from '../src/codeartifact-auth-token-access-role';

class GivenStack extends Stack {
  constructor(givenArn: string) {
    super(new App(), 'GivenStack');
    new CodeArtifactAuthTokenAccessRole(this, 'TestRole', {
      codeArtifactRepositoryArn: givenArn,
    });
  }
}
describe('CodeArtifactAuthTokenAccessRole', () => {
  it('should do the thing its meant to do', () => {
    const arn = 'arn:aws:codeartifact:::repository/my-repo';
    const stack = new GivenStack(arn);
    const template = Template.fromStack(stack);
    template.hasResource('AWS::IAM::Role', {
      Properties: { Policies: [{ PolicyDocument: { Statement: [{ Resource: arn }] } }] },
    });
  });
});
