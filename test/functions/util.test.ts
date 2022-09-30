import * as child_process from 'child_process';
import * as path from 'path';
import {
  callsites,
  exec,
  extractDependencies,
  getTsconfigCompilerOptions,
} from '../../src/typescript-function/util';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('callsites', () => {
  expect(callsites()[0].getFileName()).toMatch(/.*\/test\/functions\/util.test.ts$/);
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
        '--skipLibCheck',
        '--strict',
        '--strictNullChecks',
        '--strictPropertyInitialization',
        '--target ES2020',
      ].join(' '),
    );
  });
});
