import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CodeArtifactsAuthTokenAccessRole } from '..';

class GivenStack extends Stack {
  constructor(givenArn: string) {
    super(new App(), 'GivenStack');
    new CodeArtifactsAuthTokenAccessRole(this, 'TestRole', {
      codeArtifactRepositoryArn: givenArn,
    });
  }
}
describe('CodeArtifactsAuthTokenAccessRole', () => {
  it('should do the thing its ment to do', () => {
    const arn = 'arn:aws:codeartifact:::repository/my-repo';
    const stack = new GivenStack(arn);
    const template = Template.fromStack(stack);
    template.hasResource('AWS::IAM::Role', {
      Properties: { Policies: [{ PolicyDocument: { Statement: [{ Resource: arn }] } }] },
    });
  });
});
