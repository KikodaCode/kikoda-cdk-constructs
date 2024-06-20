import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CodeBuildStep } from 'aws-cdk-lib/pipelines';

/**
 * CodeBuild step for trimming the cloud assembly to reduce the size of the
 * artifact.
 *
 * @extends {CodeBuildStep}
 */
export class TrimCloudAssemblyStep extends CodeBuildStep {
  /**
   * Creates an instance of TrimCloudAssemblyStep.
   *
   * @constructor
   * @param {string} stackId
   * @param {string} pipelineName
   */
  constructor(stackId: string, pipelineName: string) {
    // for grep'ing, truncate to 24 chars; if not already ends in dash, then add one
    let bucketPrefix = stackId.substring(0, 24);
    bucketPrefix = bucketPrefix.slice(-1) === '-' ? bucketPrefix : `${bucketPrefix}-`;

    super('TrimCloudAssemblyStep', {
      rolePolicyStatements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:ListAllMyBuckets', 's3:PutObject'],
          resources: ['*'],
        }),
      ],
      commands: [
        `CLOUDASM_PATH=$(aws s3api list-buckets | grep '${bucketPrefix}' | awk '{print $2}' | sed 's/"//g' | sed 's/,//g')/${pipelineName.substring(
          0,
          20,
        )}/Synth_Outp`,
        "LATEST=$(aws s3 ls s3://$CLOUDASM_PATH/ | sort | tail -n 1 | awk '{print $4}')",
        'aws s3 cp s3://$CLOUDASM_PATH/$LATEST .',
        'unzip $LATEST -d tmp',
        'cd tmp',
        'rm -rf asset.*',
        'zip -r -A $LATEST *',
        'aws s3 cp $LATEST s3://$CLOUDASM_PATH/',
      ],
    });
  }
}
