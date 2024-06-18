import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodePipelineSource, ConnectionSourceOptions } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

/**
 * Configuration for specifying a codecommit repository as the source.
 */
export interface CodeCommitSourceConfig {
  /**
   * ARN of the CodeCommit repository to use.
   */
  readonly codeCommitArn: string;
}

/**
 * Configuration for specifying a GitHub repository as the source.
 */
export interface GitHubSourceConfig {
  /**
   * The owner of the GitHub repository.
   */
  readonly owner: string;
  /**
   * CodeStar connection options. GitHub sources require use of a CodeStar
   * connection.
   */
  readonly options: ConnectionSourceOptions;
}

/**
 * The configuration for the source of the pipeline.
 */
export interface RepositoryConfig {
  /**
   * Base directory for the repository.
   *
   * @default '.'
   */
  readonly baseDir?: string;
  /**
   * Output directory for the cloudformation synthesis.
   *
   * @default './out'
   */
  readonly synthOuputDir?: string;
  /**
   * Configuration for specifying the source repository.
   */
  readonly source: GitHubSourceConfig | CodeCommitSourceConfig;
}

/**
 * Configuration properties for the code source repository. Currently supports CodeCommit and GitHub Sources.
 * GitHub source requires a preexisting CodeStarConnection.
 *
 * @extends {Construct}
 */
export class CodeSource extends Construct {
  /**
   * The Source of the pipeline.
   */
  public readonly source: CodePipelineSource;
  /**
   * This CodeSource is intended to be used in conjunction with a CodePipeline.
   *
   * @constructor
   * @param scope
   * @param branchName
   * @param config
   */
  constructor(
    scope: Construct,
    branchName: string,
    config: CodeCommitSourceConfig | GitHubSourceConfig,
  ) {
    super(scope, 'CodeSource');
    const codeCommitSource = config as CodeCommitSourceConfig;
    const githubSource = config as GitHubSourceConfig;
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
