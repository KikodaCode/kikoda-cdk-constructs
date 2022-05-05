import { awscdk } from 'projen';
import { ArrowParens, EndOfLine, TrailingComma } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Timothy Harris',
  authorAddress: 'timothy.harris@kikoda.com',
  cdkVersion: '2.22.0',
  defaultReleaseBranch: 'main',
  devContainer: true,
  docgen: true,
  name: 'kikoda-cdk-constructs',
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.AVOID,
      endOfLine: EndOfLine.LF,
    },
  },
  projenrcTs: true,
  repositoryUrl: 'https://github.com/KikodaCode/kikoda-cdk-constructs.git',
  vscode: true,
  bundledDeps: ['md5', 'uuid'],
  tsconfig: { compilerOptions: { esModuleInterop: true } },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['@types/md5', '@types/uuid'] /* Build dependencies for this module. */,
  packageName: '@kikoda/cdk-constructs',
  gitignore: ['spa_local_build_artifact'],
});
project.synth();
