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
    include: ['src/typescript-function/esbuild.js'],
  },
  deps: ['@kikoda/generated-config'] /* Runtime dependencies of this module. */,
  peerDeps: ['@kikoda/generated-config'] /* Peer dependencies of this module. */,
  bundledDeps: [
    'esbuild@~0.13',
    '@yarnpkg/esbuild-plugin-pnp',
    'lodash',
    'fs-extra',
  ] /* Dependencies that must be bundled into this module. */,
  devDeps: [
    '@kikoda/generated-config',
    '@kikoda/projen-templates',
    '@types/md5',
    '@types/uuid',
    '@types/lodash',
    '@types/fs-extra',
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
  dotnet: {
    dotNetNamespace: 'Kikoda.CdkConstructs',
    packageId: 'Kikoda.CdkConstructs',
  },
});

project.compileTask.exec('cp src/typescript-function/esbuild.js lib/typescript-function/');

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
