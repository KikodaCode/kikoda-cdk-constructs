/* eslint-disable no-console */
import { execSync, ExecSyncOptions } from 'child_process';
import { DockerImage, IgnoreMode } from 'aws-cdk-lib';
import { Function, FunctionOptions, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface DotnetFunctionProps extends FunctionOptions {
  handler: string;
  runtime: Runtime;
  repoRoot: string;
  projectDir: string;
  buildCmd: string;
  targetRuntimeString: '3.1' | '5' | '6';
  bundlingImage?: DockerImage;
}

export class DotnetFunction extends Function {
  constructor(scope: Construct, id: string, props: DotnetFunctionProps) {
    super(scope, id, {
      ...props,
      code: Code.fromAsset(props.repoRoot, {
        ignoreMode: IgnoreMode.DOCKER,
        bundling: {
          image: props.bundlingImage ?? props.runtime.bundlingImage,
          local: {
            tryBundle: outputDir => {
              const execOptions: ExecSyncOptions = {
                shell: 'bash',
                cwd: props.repoRoot,
                stdio: ['ignore', process.stderr, 'inherit'],
              };

              try {
                execSync(`dotnet --list-sdks | grep ${props.targetRuntimeString}`, execOptions);
                execSync(
                  'dotnet tool install -g Amazon.Lambda.Tools || echo "Amazon.Lambda.Tools already installed, skipping..."',
                  execOptions,
                );
                execSync('dotnet lambda help package 1> /dev/null', execOptions);
                console.log('Bundling locally...');
              } catch {
                console.log(
                  "Can't find local bundling required assets, falling back to docker-based bundling...",
                );
                return false;
              }

              execSync(
                `cd ${props.projectDir} && ${props.buildCmd} && cp -a bin/Release/netcoreapp${props.targetRuntimeString}/publish/* ${outputDir}/`,
                execOptions,
              );
              return true;
            },
          },
          command: [
            'bash',
            '-c',
            [
              'export DOTNET_CLI_HOME="/tmp/DOTNET_CLI_HOME"',
              'export PATH="$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools"',
              'dotnet tool install -g Amazon.Lambda.Tools',
              'dotnet --list-sdks',
              `cd ${props.projectDir}`,
              `${props.buildCmd} -o output.zip`,
              'unzip -o -d /asset-output output.zip',
            ].join(' && '),
          ],
        },
      }),
    });
  }
}
