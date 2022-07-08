import * as os from 'os';
import { resolve } from 'path';
import { LogLevel } from 'aws-cdk-lib/aws-lambda-nodejs';
import { findLockFile, LockFile, PackageManager } from '../src/package-manager';
import * as fileUtils from '../src/util';

test('from a package-lock.json', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/package-lock.json');
  expect(packageManager.lockFile).toEqual(LockFile.NPM);
  expect(packageManager.argsSeparator).toBeUndefined();
  expect(packageManager.installCommand).toEqual(['npm', 'ci']);
  expect(packageManager.runCommand).toEqual(['npx', '--no-install']);

  expect(packageManager.runBinCommand('my-bin')).toBe('npx --no-install my-bin');
});

test('from a package-lock.json with LogLevel.ERROR', () => {
  const logLevel = LogLevel.ERROR;
  const packageManager = PackageManager.fromLockFile('/path/to/package-lock.json', logLevel);
  expect(packageManager.installCommand).toEqual(['npm', 'ci', '--loglevel', logLevel]);
});

test('from a yarn.lock', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/yarn.lock');
  expect(packageManager.lockFile).toEqual(LockFile.YARN);
  expect(packageManager.argsSeparator).toBeUndefined();
  expect(packageManager.installCommand).toEqual(['yarn', 'install', '--no-immutable']);
  expect(packageManager.runCommand).toEqual(['yarn', 'run']);

  expect(packageManager.runBinCommand('my-bin')).toBe('yarn run my-bin');
});

test('from a yarn.lock with LogLevel.ERROR', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/yarn.lock', LogLevel.ERROR);
  expect(packageManager.installCommand).toEqual(['yarn', 'install', '--no-immutable', '--silent']);
});

test('from a pnpm-lock.yaml', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/pnpm-lock.yaml');
  expect(packageManager.lockFile).toEqual(LockFile.PNPM);
  expect(packageManager.argsSeparator).toEqual('--');
  expect(packageManager.installCommand).toEqual(['pnpm', 'install']);
  expect(packageManager.runCommand).toEqual(['pnpm', 'exec']);

  expect(packageManager.runBinCommand('my-bin')).toBe('pnpm exec -- my-bin');
});

test('from a pnpm-lock.yaml with LogLevel.ERROR', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/pnpm-lock.yaml', LogLevel.ERROR);
  expect(packageManager.installCommand).toEqual(['pnpm', 'install', '--reporter', 'silent']);
});

test('defaults to NPM', () => {
  const packageManager = PackageManager.fromLockFile('/path/to/other.lock');
  expect(packageManager.lockFile).toEqual(LockFile.NPM);
});

test.skip('Windows', () => {
  const osPlatformMock = jest.spyOn(os, 'platform').mockReturnValue('win32');

  const packageManager = PackageManager.fromLockFile('/path/to/whatever');
  expect(packageManager.runBinCommand('my-bin')).toEqual('npx.cmd --no-install my-bin');

  osPlatformMock.mockRestore();
});

describe('findLockFile', () => {
  it('finds a direct path lock file', () => {
    expect(() => findLockFile(resolve(__dirname, './test-configs/package.json'))).not.toThrow();
  });

  it('throws error on no existant file.', () => {
    expect(() => findLockFile(resolve(__dirname, './test-configs/package-bob.json'))).toThrow();
  });

  it('throws error when it cannot find a lockfile.', () => {
    const test = () => {
      (fileUtils.findUpMultiple as jest.Mock).mockReturnValueOnce([]);

      findLockFile();
    };
    expect(test).toThrow();
  });
  it('throws error when it finds multiple lockfiles.', () => {
    const test = () => {
      (fileUtils.findUpMultiple as jest.Mock).mockReturnValueOnce(['', '']);

      findLockFile();
    };
    expect(test).toThrow();
  });
});
