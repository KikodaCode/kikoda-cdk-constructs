import { Stack } from 'aws-cdk-lib';
import { CodeSource } from '../src';

describe('CodeSource', () => {
  it('should set up CodeCommit source when arn supplied.', () => {
    const source = new CodeSource(new Stack(), 'test', {
      codeCommitArn: 'arn:aws:codecommit:us-east-1:123456789012:RepoName',
    });
    expect(source.source).not.toBeNull;
  });

  it('should set up GitHub source when configured.', () => {
    const source = new CodeSource(new Stack(), 'test', {
      owner: 'test/test',
      options: {
        triggerOnPush: true,
        connectionArn:
          'arn:aws:codestar-connections:us-east-1:connection:3dee99b9-172f-4ebe-a257-722365a39557',
      },
    });
    expect(source.source).not.toBeNull;
  });

  it('should throw an error when configuration is invalid.', () => {
    expect(
      () =>
        new CodeSource(new Stack(), '', {
          test: 'invalid',
        } as any),
    ).toThrowError();
  });
});
