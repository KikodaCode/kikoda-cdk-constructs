import { Arn } from 'aws-cdk-lib';
import CodeStarSnsPublishAccessStatement from '../src/codestar-sns-publish-access-statement';

describe('CodeStarSnsPublishAccessStatement', () => {
  it('should create without error.', () => {
    const statement = new CodeStarSnsPublishAccessStatement(
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
