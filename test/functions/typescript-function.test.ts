import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TypescriptFunction } from '../../src';
import {
  NonExistentHandlerError,
  HandlerTransipilationError,
  AmbiguousPackageManagerError,
  NonExistentPackageJsonError,
} from '../../src/typescript-function/builder';

describe('TypescriptFunction', () => {
  class TestStack extends Stack {
    constructor() {
      super();
    }
  }

  test('contains Lambda Function', () => {
    const stack = new TestStack();
    new TypescriptFunction(stack, 'RegularFunction', {
      handler: 'test/functions/hello.handler.main',
      bundle: {
        copyFiles: [{ from: 'test/functions/', to: '../cp' }],
      },
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  describe('Bundling', () => {
    test('No bundling when srcPath is root should throw and error', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionNoBundle', {
            handler: 'test/functions/hello.handler.main',
            bundle: false,
          }),
      ).toThrowError();
    });

    test('disable bundling', () => {
      const stack = new TestStack();

      new TypescriptFunction(stack, 'TypescriptFunctionNoBundle', {
        srcPath: 'test/functions/package-managers/yarn',
        handler: 'hello.handler.main',
        bundle: false,
      });

      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
    });

    test('Copy files throws when from path doesnt exist', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionInvalidCopy', {
            handler: 'test/functions/hello.handler.main',
            bundle: {
              copyFiles: [{ from: '/tmp/does/not/exist', to: '../cp' }],
            },
          }),
      ).toThrowError();
    });
  });

  describe('Handler files', () => {
    test('Throws on non-existent handler', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionNonExistentHandler', {
            handler: 'test/functions/non-existent.handler.main',
          }),
      ).toThrow(NonExistentHandlerError);
    });

    test('Throws on bad handler', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionBadHandler', {
            handler: 'test/functions/bad.handler.main',
          }),
      ).toThrow(HandlerTransipilationError);
    });
  });

  describe('Package Managers', () => {
    test('NPM', () => {
      const stack = new TestStack();

      new TypescriptFunction(stack, 'TypescriptFunctionNpm', {
        srcPath: 'test/functions/package-managers/npm',
        handler: 'hello.handler.main',
      });

      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
    });

    test('Yarn', () => {
      const stack = new TestStack();

      new TypescriptFunction(stack, 'TypescriptFunctionYarn', {
        srcPath: 'test/functions/package-managers/yarn',
        handler: 'hello.handler.main',
      });

      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
    });

    test('Throws on non-determinate package manager', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionNoPackageManager', {
            srcPath: 'test/website/config',
            handler: 'base.config.main',
            bundle: {
              nodeModules: ['lodash'],
            },
          }),
      ).toThrow(AmbiguousPackageManagerError);
    });

    test('Throws on non-existent package.json', () => {
      const stack = new TestStack();

      expect(
        () =>
          new TypescriptFunction(stack, 'TypescriptFunctionNonExistentPackageJSON', {
            srcPath: 'test/functions/package-managers/yarn',
            handler: 'hello.handler.main',
            bundle: {
              nodeModules: ['lodash'],
            },
          }),
      ).toThrow(NonExistentPackageJsonError);
    });

    test('Installs node modules and runs hooks', () => {
      const stack = new TestStack();
      new TypescriptFunction(stack, 'TypescriptFunctionWithNodeModules', {
        handler: 'test/functions/hello.handler.main',
        bundle: {
          commandHooks: {
            beforeBundling: () => ['echo "beforeBundling"'],
            beforeInstall: () => ['echo "beforeInstall"'],
            afterBundling: () => ['echo "afterBundling"'],
          },
          nodeModules: ['lodash'],
        },
      });

      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
    });
  });
});
