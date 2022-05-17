import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodePipelineSource, ConnectionSourceOptions } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export interface CodeCommitSourceConfig {
  readonly codeCommitArn: string;
}

export interface GitHubSourceConfig {
  readonly owner: string;
  readonly options: ConnectionSourceOptions;
}

/**
 * Configuration properties for the code source repository. Currently supports CodeCommit and GitHub Sources.
 * GitHub source requrires a preexisting CodeStarConnection.
 */
export type RepositoryConfig = GitHubSourceConfig | CodeCommitSourceConfig;

export class CodeSource extends Construct {
  public readonly source: CodePipelineSource;
  constructor(scope: Construct, branchName: string, config: RepositoryConfig) {
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
