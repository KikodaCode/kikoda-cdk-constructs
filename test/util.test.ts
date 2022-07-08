import path, { resolve } from 'path';
import { defineSynthCommands, findUp, findUpMultiple } from '../src/util';

describe('defineSynthCommands', () => {
  it('properly handles npm manager', () => {
    expect(
      defineSynthCommands(
        undefined,
        undefined,
        resolve(__dirname, './test-configs/package.json'),
      ).join(', '),
    ).toMatch('npm run');
    expect(
      defineSynthCommands(
        undefined,
        'test',
        resolve(__dirname, './test-configs/package.json'),
      ).join(', '),
    ).toMatch('-- -o test');
  });
  it('properly handles yarn manager', () => {
    expect(
      defineSynthCommands(
        undefined,
        undefined,
        resolve(__dirname, './test-configs/yarn.lock'),
      ).join(', '),
    ).toMatch('yarn');
    expect(
      defineSynthCommands(undefined, 'test', resolve(__dirname, './test-configs/yarn.lock')).join(
        ', ',
      ),
    ).toMatch('-o test');
    expect(
      defineSynthCommands(
        undefined,
        undefined,
        resolve(__dirname, './test-configs/yarn.lock'),
      ).join(', '),
    ).toMatch('yarn install --no-immutable');
  });
  it('synthOutputDir', () => {
    const commands = defineSynthCommands(
      undefined,
      'test',
      resolve(__dirname, './test-configs/yarn.lock'),
    );
    expect(commands.join(', ')).toMatch('-o test');
  });
  it('baseDir', () => {
    const commands = defineSynthCommands('test');
    expect(commands.join(', ')).toMatch('cd test');
  });

  it('no install required', () => {
    const commands = defineSynthCommands(
      undefined,
      undefined,
      resolve(__dirname, './test-configs/package.json'),
      false,
    );
    expect(commands.join(', ')).not.toMatch('install');
  });
});

describe('findUp', () => {
  test('Starting at process.cwd()', () => {
    expect(findUp('README.md')).toMatch(/kikoda-cdk-constructs\/README.md$/);
  });

  test('Non existing file', () => {
    expect(findUp('non-existing-file.unknown')).toBe(undefined);
  });

  test('Starting at a specific path', () => {
    expect(findUp('util.test.ts', __dirname)).toMatch(/.*\/test\/util.test.ts$/);
  });

  test('Non existing file starting at a non existing relative path', () => {
    expect(findUp('not-to-be-found.txt', 'non-existing/relative/path')).toBe(undefined);
  });

  test('Starting at a relative path', () => {
    expect(findUp('util.test.ts', __dirname)).toMatch(/.*\/test\/util.test.ts$/);
  });
});

describe('findUpMultiple', () => {
  test('Starting at process.cwd()', () => {
    const files = findUpMultiple(['README.md', 'package.json']);
    expect(files).toHaveLength(2);
    expect(files[0]).toMatch(/kikoda-cdk-constructs\/README\.md$/);
    expect(files[1]).toMatch(/kikoda-cdk-constructs\/package\.json$/);
  });

  test('Non existing files', () => {
    expect(findUpMultiple(['non-existing-file.unknown', 'non-existing-file.unknown2'])).toEqual([]);
  });

  test('Existing and non existing files', () => {
    const files = findUpMultiple(['non-existing-file.unknown', 'README.md']);
    expect(files).toHaveLength(1);
    expect(files[0]).toMatch(/kikoda-cdk-constructs\/README\.md$/);
  });

  test('Starting at a specific path', () => {
    const files = findUpMultiple(['util.test.ts', 'util.ts'], __dirname);
    expect(files).toHaveLength(2);
    expect(files[0]).toMatch(/(.*)\/test\/util\.test\.ts$/);
    expect(files[1]).toMatch(/.*\/test\/util\.ts$/);
  });

  test('Non existing files starting at a non existing relative path', () => {
    expect(
      findUpMultiple(['not-to-be-found.txt', 'not-to-be-found2.txt'], 'non-existing/relative/path'),
    ).toEqual([]);
  });

  test('Starting at a relative path', () => {
    const files = findUpMultiple(['util.test.ts', 'util.ts'], __dirname);
    expect(files).toHaveLength(2);
    expect(files[0]).toMatch(/.*\/test\/util\.test\.ts$/);
    expect(files[1]).toMatch(/.*\/test\/util\.ts$/);
  });

  test('Files on multiple levels', () => {
    const files = findUpMultiple(
      ['README.md', 'util.test.ts'],
      path.join(__dirname, 'integ-handlers'),
    );
    expect(files).toHaveLength(1);
    expect(files[0]).toMatch(/.*\/test\/util\.test\.ts$/);
  });
});
