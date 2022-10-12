/* eslint-disable no-console */
import { join, resolve } from 'path';
import * as AdmZip from 'adm-zip';
import { Duration, CustomResource } from 'aws-cdk-lib';
import { ISecurityGroup, Port, IVpc } from 'aws-cdk-lib/aws-ec2';
import { SingletonFunctionProps, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Bucket, BlockPublicAccess, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as tmp from 'tmp-promise';
import { v4 as uuidv4 } from 'uuid';
import { TypescriptSingletonFunction } from '../';

export enum DatabaseEngine {
  MYSQL = 'MYSQL',
}

export interface DatabaseMigratorCustomResourceProps {
  readonly secretArn: string;
  readonly scriptBucketName: string;
  readonly scriptKeyName: string;
  readonly dryRun: string;
}

export interface DatabaseMigratorProps {
  /**
   * The target database engine. Currently only MySQL is supported.
   *
   * @default DatabaseEngine.MYSQL
   */
  readonly engine: DatabaseEngine;
  /**
   * The secret that containts the connection details for the database
   */
  readonly secret: ISecret;

  /**
   * Path to where the SQL migration scripts are located for this database. It is easiest to pass an absolute path here
   */
  readonly scriptPath: string;

  /**
   * The VPC to place this function in so that it has network access to the database
   */
  readonly vpc: NonNullable<SingletonFunctionProps['vpc']>;

  /**
   * The VPC subnets to place this function in so that it is in the same logical group as the database
   */
  readonly vpcSubnets: NonNullable<SingletonFunctionProps['vpcSubnets']>;

  /**
   * The security group for the database to allow access from the migrator
   */
  readonly securityGroup: ISecurityGroup;

  /**
   * The port for the database to allow access from the migrator
   */
  readonly port: Port;

  /**
   * Init everything, create the resource, and log but don't actually try to run the database scripts
   *
   * @default false
   */
  readonly dryRun?: boolean;
}

const resourceType = 'Custom::CDKDatabaseMigrator';

export class DatabaseMigrator extends Construct {
  constructor(scope: Construct, id: string, props: DatabaseMigratorProps) {
    super(scope, id);

    // Get handler based on database engine
    const handlerFile = resolve(
      __dirname,
      `./handlers/${props.engine.toLocaleLowerCase()}.handler.ts`,
    );

    const handler = new TypescriptSingletonFunction(this, 'CustomResourceHandler', {
      uuid: this.renderSingletonUuid(props.vpc),
      entry: handlerFile,
      handler: 'main',
      depsLockFilePath: join(__dirname, './handlers/yarn.lock'),
      timeout: Duration.minutes(15),
      lambdaPurpose: resourceType,
      vpc: props.vpc,
      vpcSubnets: props.vpcSubnets,
      tracing: Tracing.ACTIVE,
    });

    props.securityGroup.connections.allowFrom(handler, props.port);

    props.secret.grantRead(handler);

    // zip sql migration scripts
    const { tempZipSqlDirectory, tempZipSqlFileName } = this.zipScriptFiles(props.scriptPath);

    // upload sql migration scripts to s3
    const sqlBucket = new Bucket(this, 'SqlBucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      versioned: false,
    });

    const sqlBucketDeployment = new BucketDeployment(this, 'SqlBucketDeployment', {
      sources: [Source.asset(tempZipSqlDirectory)],
      destinationBucket: sqlBucket,
    });

    sqlBucket.grantRead(handler);

    // custom resource
    const customResourceUniqueId = `CDKDatabaseMigrator${props.vpc.node.addr}`;

    const customResource = new CustomResource(this, customResourceUniqueId, {
      serviceToken: handler.functionArn,
      resourceType,
      properties: {
        secretArn: props.secret.secretArn,
        scriptBucketName: sqlBucket.bucketName,
        scriptKeyName: tempZipSqlFileName,
        dryRun: props.dryRun ? 'true' : 'false',
      } as DatabaseMigratorCustomResourceProps,
    });

    customResource.node.addDependency(sqlBucketDeployment);
  }

  private renderSingletonUuid(vpc: IVpc) {
    return `6e35b433-71eb-43f4-8547-504253c5c9dc-${vpc.node.addr}`;
  }

  private zipScriptFiles(scriptPath: string) {
    console.log(`Zipping scripts from ${scriptPath}`);

    const tempZipSqlDirectory = tmp.dirSync().name as string;
    const tempZipSqlFileName = `${uuidv4()}.zip`;

    console.log(`Temp zip directory is ${tempZipSqlDirectory}`);
    console.log(`Temp zip filename is ${tempZipSqlFileName}`);

    const zip = new AdmZip();

    zip.addLocalFolder(scriptPath, undefined, /^.*\.sql/i);

    zip.writeZip(join(tempZipSqlDirectory, tempZipSqlFileName), err => {
      if (err) {
        console.log(err);
        throw err;
      }
    });

    return {
      tempZipSqlDirectory,
      tempZipSqlFileName,
    };
  }
}
