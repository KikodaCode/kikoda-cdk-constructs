import { TextFile } from 'projen';
import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { ArrowParens, EndOfLine, TrailingComma } from 'projen/lib/javascript';

const project = new AwsCdkConstructLibrary({
  name: 'kikoda-constructs',
  description:
    'Collection of useful platform constructs for use with modern applications deployed with AWS',
  author: 'Kikoda, LLC',
  authorAddress: 'platform@kikoda.com',
  repositoryUrl: 'https://github.com/KikodaCode/kikoda-constructs.git',
  defaultReleaseBranch: 'main',
  keywords: ['cdk', 'awscdk', 'compliance', 'configuration', 'websites', 'scaffolding', 'cicd'],
  stability: 'experimental',
  license: 'Apache-2.0',
  minNodeVersion: '16.0.0',
  cdkVersion: '2.22.0',
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
  bundledDeps: ['md5', 'uuid', 'lodash'],
  tsconfig: { compilerOptions: { esModuleInterop: true } },

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: ['@types/md5', '@types/uuid', '@types/lodash'] /* Build dependencies for this module. */,
  packageName: '@kikoda/constructs',
  gitignore: ['spa_local_build_artifact'],
});

// Generate a NOTICE file for license
new TextFile(project, 'NOTICE', {
  marker: false,
  lines: [
    'Kikoda Constructs Library',
    'Copyright 2022-2022 Kikoda, LLC',
    '',
    'This product includes software developed at Kikoda (https://www.kikoda.com)',
  ],
});

project.synth();
