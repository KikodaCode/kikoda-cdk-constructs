import { Arn } from 'aws-cdk-lib';
import AllowCodeStarSnsPublishStatement from '../';

describe('AllowCodeStarSnsPublishStatement', () => {
  it('should create without error.', () => {
    const statement = new AllowCodeStarSnsPublishStatement(
      Arn.format({
        partition: 'aws',
        region: 'us-east-1',
        account: '123456789012',
        service: 'sns',
        resource: 'my-topic',
      }),
    );
    expect(statement).not.toBeNull;
  });
});
