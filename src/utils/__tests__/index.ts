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
  it('throws for non arns', () => {
    const predicate = () => createAssumeRoleCommands('blah');
    expect(predicate).toThrowError();
  });
  it('throws for invalid service in arn', () => {
    const predicate = () => createAssumeRoleCommands('arn:aws:test:::role');
    expect(predicate).toThrowErrorMatchingInlineSnapshot(
      '"Invalid assumeRoleArn: arn:aws:test:::role Only IAM ARNs are supported."',
    );
  });
  it('throws for invalid resource in arn', () => {
    const predicate = () => createAssumeRoleCommands('arn:aws:iam:::blah');
    expect(predicate).toThrowErrorMatchingInlineSnapshot(
      '"Invalid assumeRoleArn: arn:aws:iam:::blah Only IAM role ARNs are supported."',
    );
  });
});
