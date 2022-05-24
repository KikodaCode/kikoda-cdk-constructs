import { TextFile } from 'projen';
import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
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
  cdkVersion: '2.25.0',
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
  packageName: '@kikoda/cdk-constructs',
  gitignore: ['spa_local_build_artifact'],
  pullRequestTemplateContents: [
    `## Proposed changes`,
    '',
    `_Describe the big picture of your changes here to communicate to the maintainers why we should accept this pull request.If it fixes a bug or resolves a feature request, be sure to link to that issue._`,
    '',
    `### Commentary`,
    '',
    `_Anything else we should know when reviewing?_`,
    '',
    `### Types of Changes`,
    '',
    `What types of changes does your code introduce? _Chedk all the boxes that apply_`,
    '',
    `- [ ] Bugfix(non - breaking change which fixes an issue)`,
    `- [ ] New feature or Enhancement(non - breaking change which adds functionality)`,
    `- [ ] Breaking change(fix or feature that would cause existing functionality to not work as expected)`,
    `- [ ] Chore(documentation, refactoring, dependency upgrade, etc.)`,
    '',
    `### Chores`,
    '',
    `_Check all the boxes that apply_`,
    '',
    `- [ ] This PR includes breaking changes which are documented in the description and associated commit messages(see the[Contributing Guide](../ CONTRIBUTING.md) for more information on how this should be done)`,
    `- [ ] This PR impacts documentation, and it has been updated(or an issue has been created and linked)`,
    `- [ ] This PR's changes are covered by the automated tests`,
  ],
});

// Generate a NOTICE file for license
new TextFile(project, 'NOTICE', {
  marker: false,
  lines: [
    'Kikoda CDK Constructs Library',
    'Copyright 2022-2022 Kikoda, LLC',
    '',
    'This product includes software developed at Kikoda (https://www.kikoda.com)',
  ],
});

project.synth();
