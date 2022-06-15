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
  bundledDeps: [
    'md5',
    'uuid',
    'lodash',
    'esbuild@~0.13',
    'fs-extra',
    '@yarnpkg/esbuild-plugin-pnp',
  ],
  tsconfig: { compilerOptions: { esModuleInterop: true } },
  eslintOptions: {
    dirs: ['./'],
    ignorePatterns: [
      '*.js',
      '!.projenrc.ts',
      '*.d.ts',
      'node_modules/',
      '*.generated.ts',
      'coverage',
      'bad.handler.ts',
    ],
  },

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: [
    '@types/md5',
    '@types/uuid',
    '@types/lodash',
    '@types/fs-extra',
    '@kikoda/projen-templates',
  ] /* Build dependencies for this module. */,
  packageName: '@kikoda/cdk-constructs',
  gitignore: ['spa_local_build_artifact'],
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  pullRequestTemplate: false,
  codeCov: true,
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: ['/node_modules/', 'test/util.ts'],
    },
  },
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
