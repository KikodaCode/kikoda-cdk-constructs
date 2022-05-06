import { FileBase, FileBaseOptions, Project } from 'projen';
import { AwsCdkConstructLibrary, AwsCdkConstructLibraryOptions } from 'projen/lib/awscdk';
import { ArrowParens, EndOfLine, TrailingComma } from 'projen/lib/javascript';

interface NoticeFileOptions extends FileBaseOptions {
  /**
   * Contents of the NOTICE file
   */
  content: string;
}
class NoticeFile extends FileBase {
  readonly options: NoticeFileOptions;

  constructor(project: Project, options: NoticeFileOptions) {
    super(project, 'NOTICE', options);
    this.options = options;
  }

  synthesizeContent() {
    return this.options.content;
  }
}
interface KikodaCdkConstructLibraryOptions extends AwsCdkConstructLibraryOptions {
  /**
   * Generate a NOTICE file for use in conjunction with licenses like Apache-2.0
   */
  notice: true;
}
class KikodaCdkConstructLibrary extends AwsCdkConstructLibrary {
  constructor(options: KikodaCdkConstructLibraryOptions) {
    super(options);

    new NoticeFile(this, {
      marker: false,
      content: `Kikoda Open Source Software - Platform Constructs Library
Copyright ${options.copyrightPeriod} ${options.copyrightOwner ?? options.author}`,
    });
  }
}

const project = new KikodaCdkConstructLibrary({
  author: 'Kikoda, LLC',
  authorAddress: 'platform@kikoda.com',
  description:
    'Collection of useful platform constructs for use with modern applications deployed with AWS',
  license: 'Apache-2.0',
  notice: true,
  copyrightPeriod: '2022-2022',
  cdkVersion: '2.22.0',
  defaultReleaseBranch: 'main',
  devContainer: true,
  docgen: true,
  name: 'kikoda-constructs',
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
  repositoryUrl: 'https://github.com/KikodaCode/kikoda-constructs.git',
  vscode: true,
  bundledDeps: ['md5', 'uuid'],
  tsconfig: { compilerOptions: { esModuleInterop: true } },

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: ['@types/md5', '@types/uuid'] /* Build dependencies for this module. */,
  packageName: '@kikoda/constructs',
  gitignore: ['spa_local_build_artifact'],
});

project.synth();
