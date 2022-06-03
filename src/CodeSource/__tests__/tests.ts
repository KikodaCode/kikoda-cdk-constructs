import { Arn, Stack } from 'aws-cdk-lib';
import { CodeSource } from '../..';

describe('CodeSource', () => {
  it('should set up CodeCommit source when arn supplied.', () => {
    const stack = new Stack();
    const source = new CodeSource(stack, 'test', {
      codeCommitArn: Arn.format(
        {
          service: 'codecommit',
          resource: 'RepoName',
        },
        stack,
      ),
    });
    expect(source.source).not.toBeNull;
  });

  it('should set up GitHub source when configured.', () => {
    const stack = new Stack();
    const source = new CodeSource(stack, 'test', {
      owner: 'test/test',
      options: {
        triggerOnPush: true,
        connectionArn: Arn.format(
          {
            service: 'codestar-connections',
            resource: 'connection',
            resourceName: '3dee99b9-172f-4ebe-a257-722365a39557',
          },
          stack,
        ),
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
