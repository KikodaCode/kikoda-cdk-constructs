import { Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { CodeConfig, Runtime } from 'aws-cdk-lib/aws-lambda';
import { TypescriptFunction } from '../../src/typescript-function';
import { Bundling } from '../../src/typescript-function/bundling';

jest.mock('../../src/typescript-function/bundling', () => {
  return {
    Bundling: {
      bundle: jest.fn().mockReturnValue({
        bind: (): CodeConfig => {
          return {
            s3Location: {
              bucketName: 'my-bucket',
              objectKey: 'my-key',
            },
          };
        },
        bindToResource: () => {
          return;
        },
      }),
    },
  };
});

let stack: Stack;
beforeEach(() => {
  stack = new Stack();
  jest.clearAllMocks();
});

test('TypescriptFunction with .ts handler', () => {
  // WHEN
  new TypescriptFunction(stack, 'handler1');

  expect(Bundling.bundle).toHaveBeenCalledWith(
    expect.objectContaining({
      entry: expect.stringContaining('function.test.handler1.ts'), // Automatically finds .ts handler file
    }),
  );

  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'nodejs14.x',
  });
});

test('TypescriptFunction with container env vars', () => {
  // WHEN
  new TypescriptFunction(stack, 'handler1', {
    bundling: {
      environment: {
        KEY: 'VALUE',
      },
    },
  });

  expect(Bundling.bundle).toHaveBeenCalledWith(
    expect.objectContaining({
      environment: {
        KEY: 'VALUE',
      },
    }),
  );
});

test('throws when entry is not ts', () => {
  expect(
    () =>
      new TypescriptFunction(stack, 'Fn', {
        entry: 'handler.py',
      }),
  ).toThrow(/Only TypeScript entry files are supported/);

  expect(
    () =>
      new TypescriptFunction(stack, 'Fn', {
        entry: 'handler1.js',
      }),
  ).toThrow(/Only TypeScript entry files are supported/);
});

test('throws when entry does not exist', () => {
  expect(
    () =>
      new TypescriptFunction(stack, 'Fn', {
        entry: 'notfound.ts',
      }),
  ).toThrow(/Cannot find entry file at/);
});

test('throws when entry cannot be automatically found', () => {
  expect(() => new TypescriptFunction(stack, 'Fn')).toThrow(
    /Cannot find handler file .*function.test.Fn.ts/,
  );
});

test('throws with the wrong runtime family', () => {
  expect(
    () =>
      new TypescriptFunction(stack, 'handler1', {
        runtime: Runtime.PYTHON_3_8,
      }),
  ).toThrow(/Only `NODEJS` runtimes are supported/);
});

test('throws with non existing lock file', () => {
  expect(
    () =>
      new TypescriptFunction(stack, 'handler1', {
        depsLockFilePath: '/does/not/exist.lock',
      }),
  ).toThrow(/Lock file at \/does\/not\/exist.lock doesn't exist/);
});

test('throws when depsLockFilePath is not a file', () => {
  expect(
    () =>
      new TypescriptFunction(stack, 'handler1', {
        depsLockFilePath: __dirname,
      }),
  ).toThrow(/\`depsLockFilePath\` should point to a file/);
});

test('resolves depsLockFilePath to an absolute path', () => {
  new TypescriptFunction(stack, 'handler1', {
    depsLockFilePath: './package.json',
  });

  expect(Bundling.bundle).toHaveBeenCalledWith(
    expect.objectContaining({
      depsLockFilePath: expect.stringMatching(/kikoda-cdk-constructs\/package.json$/),
    }),
  );
});

test('resolves entry to an absolute path', () => {
  // WHEN
  new TypescriptFunction(stack, 'fn', {
    entry: 'src/index.ts',
  });

  expect(Bundling.bundle).toHaveBeenCalledWith(
    expect.objectContaining({
      entry: expect.stringMatching(/kikoda-cdk-constructs\/src\/index.ts$/),
    }),
  );
});

test('configures connection reuse for aws sdk', () => {
  // WHEN
  new TypescriptFunction(stack, 'handler1');

  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    },
  });
});

test('can opt-out of connection reuse for aws sdk', () => {
  // WHEN
  new TypescriptFunction(stack, 'handler1', {
    awsSdkConnectionReuse: false,
  });

  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: Match.absent(),
  });
});

test('TypescriptFunction in a VPC', () => {
  // GIVEN
  const vpc = new Vpc(stack, 'Vpc');

  // WHEN
  new TypescriptFunction(stack, 'handler1', { vpc });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    VpcConfig: {
      SecurityGroupIds: [
        {
          'Fn::GetAtt': ['handler1SecurityGroup30688A62', 'GroupId'],
        },
      ],
      SubnetIds: [
        {
          Ref: 'VpcPrivateSubnet1Subnet536B997A',
        },
        {
          Ref: 'VpcPrivateSubnet2Subnet3788AAA1',
        },
      ],
    },
  });
});
