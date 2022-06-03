import { validateArn } from '../src/validate-arn';

describe('validateArn', () => {
  it('validates generic arns', () => {
    const predicate = () => validateArn('arn:::::');
    expect(predicate).toThrowError();
  });
  it('throws for non arns', () => {
    const predicate = () => validateArn('this:is:not/an/arn');
    expect(predicate).toThrowError();
  });
  it('throws for invalid partition in arn', () => {
    const predicate = () => validateArn('arn:aws-cn:test:::role', { partition: 'aws' });
    expect(predicate).toThrowError();
  });
  it('throws for invalid service in arn', () => {
    const predicate = () => validateArn('arn:aws:test:::role', { service: 'iam' });
    expect(predicate).toThrowError();
  });
  it('throws for invalid region in arn', () => {
    const predicate = () => validateArn('arn:aws:us-east-2:::role', { region: 'us-east-1' });
    expect(predicate).toThrowError();
  });
  it('throws for invalid account in arn', () => {
    const predicate = () =>
      validateArn('arn:aws:test::12345678901:role', { account: '123456789012' });
    expect(predicate).toThrowError();
  });
  it('throws for invalid resource in arn', () => {
    const predicate = () => validateArn('arn:aws:test:::roles', { resource: 'role' });
    expect(predicate).toThrowError();
  });
  it('throws for invalid resource name in arn', () => {
    const predicate = () =>
      validateArn('arn:aws:test:::role/my-roles', { resourceName: 'my-role' });
    expect(predicate).toThrowError();
  });
});
