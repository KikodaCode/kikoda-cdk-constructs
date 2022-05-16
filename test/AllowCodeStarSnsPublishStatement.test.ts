import AllowCodeStarSnsPublishStatement from '../src/DeploymentPipelines/AllowCodeStarSnsPublishStatement';

describe('AllowCodeStarSnsPublishStatement', () => {
  it('should create without error.', () => {
    const statement = new AllowCodeStarSnsPublishStatement(
      'arn:sns:topic:us-east-1:123456789012:thing',
    );
    expect(statement).not.toBeNull;
  });
});
