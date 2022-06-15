import * as child_process from 'child_process';
import * as path from 'path';
import {
  callsites,
  exec,
  extractDependencies,
  findUp,
  findUpMultiple,
  getTsconfigCompilerOptions,
} from '../../src/typescript-function/util';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('callsites', () => {
  expect(callsites()[0].getFileName()).toMatch(/.*\/test\/functions\/util.test.ts$/);
});

describe('findUp', () => {
  test('Starting at process.cwd()', () => {
    expect(findUp('README.md')).toMatch(/kikoda-cdk-constructs\/README.md$/);
  });

  test('Non existing file', () => {
    expect(findUp('non-existing-file.unknown')).toBe(undefined);
  });

  test('Starting at a specific path', () => {
    expect(findUp('util.test.ts', __dirname)).toMatch(/.*\/test\/functions\/util.test.ts$/);
  });

  test('Non existing file starting at a non existing relative path', () => {
    expect(findUp('not-to-be-found.txt', 'non-existing/relative/path')).toBe(undefined);
  });

  test('Starting at a relative path', () => {
    expect(findUp('util.test.ts', __dirname)).toMatch(/.*\/test\/functions\/util.test.ts$/);
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
    const files = findUpMultiple(['util.test.ts', 'typescript-function.test.ts'], __dirname);
    expect(files).toHaveLength(2);
    expect(files[0]).toMatch(/(.*)\/test\/functions\/util\.test\.ts$/);
    expect(files[1]).toMatch(/.*\/test\/functions\/typescript-function\.test\.ts$/);
  });

  test('Non existing files starting at a non existing relative path', () => {
    expect(
      findUpMultiple(['not-to-be-found.txt', 'not-to-be-found2.txt'], 'non-existing/relative/path'),
    ).toEqual([]);
  });

  test('Starting at a relative path', () => {
    const files = findUpMultiple(['util.test.ts', 'typescript-function.test.ts'], __dirname);
    expect(files).toHaveLength(2);
    expect(files[0]).toMatch(/.*\/test\/functions\/util\.test\.ts$/);
    expect(files[1]).toMatch(/.*\/test\/functions\/typescript-function\.test\.ts$/);
  });

  test('Files on multiple levels', () => {
    const files = findUpMultiple(
      ['README.md', 'util.test.ts'],
      path.join(__dirname, 'integ-handlers'),
    );
    expect(files).toHaveLength(1);
    expect(files[0]).toMatch(/.*\/test\/functions\/util\.test\.ts$/);
  });
});

describe('exec', () => {
  test.skip('normal execution', () => {
    const spawnSyncMock = jest.spyOn(child_process, 'spawnSync').mockReturnValue({
      status: 0,
      stderr: Buffer.from('stderr'),
      stdout: Buffer.from('stdout'),
      pid: 123,
      output: ['stdout', 'stderr'],
      signal: null,
    });

    const proc = exec('cmd', ['arg1', 'arg2'], { env: { KEY: 'value' } });

    expect(spawnSyncMock).toHaveBeenCalledWith('cmd', ['arg1', 'arg2'], { env: { KEY: 'value' } });
    expect(proc.stdout.toString()).toBe('stdout');

    spawnSyncMock.mockRestore();
  });

  test.skip('non zero status', () => {
    const spawnSyncMock = jest.spyOn(child_process, 'spawnSync').mockReturnValue({
      status: 999,
      stderr: Buffer.from('error occured'),
      stdout: Buffer.from('stdout'),
      pid: 123,
      output: ['stdout', 'stderr'],
      signal: null,
    });

    expect(() => exec('cmd', ['arg1', 'arg2'])).toThrow('error occured');

    spawnSyncMock.mockRestore();
  });

  test.skip('with error', () => {
    const spawnSyncMock = jest.spyOn(child_process, 'spawnSync').mockReturnValue({
      error: new Error('bad error'),
      status: 0,
      stderr: Buffer.from('stderr'),
      stdout: Buffer.from('stdout'),
      pid: 123,
      output: ['stdout', 'stderr'],
      signal: null,
    });

    expect(() => exec('cmd', ['arg1', 'arg2'])).toThrow(new Error('bad error'));

    spawnSyncMock.mockRestore();
  });
});

describe('extractDependencies', () => {
  test('with dependencies referenced in package.json', () => {
    const deps = extractDependencies(path.join(__dirname, '../../package.json'), ['aws-cdk-lib']);
    expect(Object.keys(deps)).toEqual(['aws-cdk-lib']);
  });

  test('with transitive dependencies', () => {
    expect(extractDependencies(path.join(__dirname, '../../package.json'), ['typescript'])).toEqual(
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, import/no-extraneous-dependencies
        typescript: `^${require('typescript/package.json').version}`,
      },
    );
  });

  test('with unknown dependency', () => {
    expect(() =>
      extractDependencies(path.join(__dirname, '../../package.json'), ['unknown']),
    ).toThrow(/Cannot extract version for module 'unknown'/);
  });
});

describe('getTsconfigCompilerOptions', () => {
  test('should extract compiler options and returns as string', () => {
    const tsconfig = path.join(__dirname, '../..', 'tsconfig.json');
    const compilerOptions = getTsconfigCompilerOptions(tsconfig);
    expect(compilerOptions).toEqual(
      [
        '--alwaysStrict',
        '--charset utf8',
        '--declaration',
        '--experimentalDecorators',
        '--inlineSourceMap',
        '--inlineSources',
        '--lib es2020',
        '--module CommonJS',
        '--newLine lf',
        '--noEmitOnError',
        '--noFallthroughCasesInSwitch',
        '--noImplicitAny',
        '--noImplicitReturns',
        '--noImplicitThis',
        '--noUnusedLocals',
        '--noUnusedParameters',
        '--outDir ./',
        '--resolveJsonModule',
        '--rootDir ./',
        '--strict',
        '--strictNullChecks',
        '--strictPropertyInitialization',
        '--target ES2020',
      ].join(' '),
    );
  });
});
