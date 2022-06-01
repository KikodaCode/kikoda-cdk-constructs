import { validateArn } from '../arnValidators';
import { createAssumeRoleCommands, defineSynthCommands } from '../cliCommandUtils';

describe('defineSynthCommands', () => {
  it('properly handles npm manager', () => {
    expect(defineSynthCommands('npm').join(', ')).toMatch('npm run');
    expect(defineSynthCommands('npm', undefined, 'test').join(', ')).toMatch('-- -o test');
  });
  it('synthOutputDir', () => {
    const commands = defineSynthCommands(undefined, undefined, 'test');
    expect(commands.join(', ')).toMatch('-o test');
  });
  it('assumeRole', () => {
    const roleArn = 'arn:aws:iam::123456789012:role/my-role';
    const commands = defineSynthCommands(undefined, undefined, undefined, roleArn);
    expect(commands.join(', ')).toMatch(roleArn);
  });
  it('baseDir', () => {
    const commands = defineSynthCommands(undefined, 'test');
    expect(commands.join(', ')).toMatch('cd test');
  });

  it('no install required', () => {
    const commands = defineSynthCommands(undefined, undefined, undefined, undefined, false);
    expect(commands.join(', ')).not.toMatch('install');
  });
});

describe('createAssumeRoleCommands', () => {
  it('works', () => {
    const roleArn = 'arn:aws:iam::123456789012:role/my-role';
    const commands = createAssumeRoleCommands(roleArn);
    expect(commands.join(', ')).toMatch(roleArn);
  });
});

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
