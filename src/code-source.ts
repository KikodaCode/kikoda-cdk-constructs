import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodePipelineSource, ConnectionSourceOptions } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

/**
 * Configuration for specifying a codecommit repository as the source.
 *
 * @export
 * @interface CodeCommitSourceConfig
 * @typedef {CodeCommitSourceConfig}
 */
export interface CodeCommitSourceConfig {
  /**
   * ARN of the CodeCommit repository to use.
   *
   * @readonly
   * @type {string}
   */
  readonly codeCommitArn: string;
}

/**
 * Configuration for specifying a GitHub repository as the source.
 *
 * @export
 * @interface GitHubSourceConfig
 * @typedef {GitHubSourceConfig}
 */
export interface GitHubSourceConfig {
  /**
   * The owner of the GitHub repository.
   *
   * @readonly
   * @type {string}
   */
  readonly owner: string;
  /**
   * CodeStar connection options. GitHub sources require use of a CodeStar connection.
   *
   * @readonly
   * @type {ConnectionSourceOptions}
   */
  readonly options: ConnectionSourceOptions;
}

/**
 * The configuration for the source of the pipeline.
 *
 * @export
 * @typedef {RepositoryConfig}
 */
export interface RepositoryConfig {
  /**
   * Base directory for the repository.
   *
   * @readonly
   * @type {?string}
   * @default '.'
   */
  readonly baseDir?: string;
  /**
   * Output directory for the cloudformation synthisis.
   *
   * @readonly
   * @type {?string}
   * @default './out'
   */
  readonly synthOuputDir?: string;
  readonly source: GitHubSourceConfig | CodeCommitSourceConfig;
}

/**
 * Configuration properties for the code source repository. Currently supports CodeCommit and GitHub Sources.
 * GitHub source requrires a preexisting CodeStarConnection.
 * @export
 * @class CodeSource
 * @typedef {CodeSource}
 * @extends {Construct}
 */
export class CodeSource extends Construct {
  /**
   * The Source of the pipeline.
   *
   * @public
   * @readonly
   * @type {CodePipelineSource}
   */
  public readonly source: CodePipelineSource;
  /**
   * This CodeSource is intended to be used in conjunction with a CodePipeline.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} branchName
   * @param {RepositoryConfig} config
   */
  constructor(
    scope: Construct,
    branchName: string,
    config: CodeCommitSourceConfig | GitHubSourceConfig,
  ) {
    super(scope, 'CodeSource');
    let codeCommitSource = config as CodeCommitSourceConfig;
    let githubSource = config as GitHubSourceConfig;
    if (codeCommitSource && codeCommitSource.codeCommitArn) {
      this.source = CodePipelineSource.codeCommit(
        Repository.fromRepositoryArn(this, 'Repository', codeCommitSource.codeCommitArn),
        branchName,
      );
    } else if (githubSource && githubSource.owner) {
      this.source = CodePipelineSource.connection(
        githubSource.owner,
        branchName,
        githubSource.options,
      );
    } else {
      throw new Error('Improper configuration');
    }
  }
}
