import { KikodaOpenSourceProject } from '@kikoda/projen-templates';
import { YamlFile } from 'projen';
import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { GithubCredentials } from 'projen/lib/github';
import { ArrowParens, EndOfLine, TrailingComma } from 'projen/lib/javascript';

const project = new AwsCdkConstructLibrary({
  name: 'kikoda-cdk-constructs',
  description:
    'Collection of useful platform constructs for modern applications deployed with AWS CDK',
  author: 'Kikoda, LLC',
  authorAddress: 'platform@kikoda.com',
  repositoryUrl: 'https://github.com/KikodaCode/kikoda-cdk-constructs.git',
  defaultReleaseBranch: 'main',
  keywords: ['cdk', 'awscdk', 'compliance', 'configuration', 'websites', 'scaffolding', 'cicd'],
  stability: 'experimental',
  license: 'Apache-2.0',
  cdkVersion: '2.26.0',
  projenrcTs: true,
  devContainer: true,
  vscode: true,
  docgen: true,
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
  tsconfig: {
    compilerOptions: { esModuleInterop: true },
    exclude: ['**/node_modules'],
    include: ['src/typescript-function/esbuild.js'],
  },
  // deps: [],                /* Runtime dependencies of this module. */
  bundledDeps: [
    '@aws-sdk/client-s3',
    '@aws-sdk/client-secrets-manager',
    'promise-mysql',
    'fs-extra',
    'node-cache',
    'cfn-lambda',
    'unzipper',
    'md5',
    'uuid',
    'lodash',
    'esbuild@~0.13',
    '@yarnpkg/esbuild-plugin-pnp',
    'adm-zip',
    'tmp-promise',
  ],
  devDeps: [
    '@types/md5',
    '@types/uuid',
    '@types/lodash',
    '@types/fs-extra',
    '@types/adm-zip',
    '@types/tmp',
    '@types/unzipper',
    '@kikoda/projen-templates',
    'delay',
  ] /* Build dependencies for this module. */,
  packageName: '@kikoda/cdk-constructs',
  gitignore: ['spa_local_build_artifact'],
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  pullRequestTemplate: false,
  codeCov: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['projen-workflows[bot]'],
  },
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: ['/node_modules/', 'test/util.ts'],
    },
  },
});

project.compileTask.exec('cp src/typescript-function/esbuild.js lib/typescript-function/');

// Run Build workflow on push to main to update base code coverage
const buildWorkflow = project.github?.tryFindWorkflow('build');
buildWorkflow?.on({
  push: { branches: ['main'] },
});

new YamlFile(project, 'codecov.yml', {
  obj: {
    coverage: {
      status: {
        patch: true,
      },
    },
  },
});

new KikodaOpenSourceProject(project, {
  title: 'Kikoda CDK Constructs Library',
});

project.synth();
