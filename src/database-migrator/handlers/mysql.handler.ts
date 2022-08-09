/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import * as path from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
// @ts-ignore
import CfnLambda from 'cfn-lambda';
import * as fs from 'fs-extra';
import * as mysql from 'promise-mysql';
import { Extract } from 'unzipper';
import { MySqlDatabaseMigratorCustomResourceProps } from '../database-migrator';
import { Schema } from './schema';

// this is named NodeCacheClass because naming it NodeCache causes conflicts when resolving
// eslint-disable-next-line @typescript-eslint/no-require-imports
const NodeCacheClass = require('node-cache');

interface ConnectionDetails {
  host: string;
  port: number;
  username: string;
  password: string;
  dbname: string;
}

/** This is where temp data is stored Lambda */
const scriptPath = '/tmp';
/** How long to cache database connection secrets. Currently 5 minutes */
const connectionDetailsCacheTtlSeconds = 5 * 60;
const connectionDetailsCache = new NodeCacheClass();

// pull down sql scripts from s3 & unzip
const prepareSqlScripts = async (bucketName: string, keyName: string) => {
  console.log('Retrieving scripts from S3');

  const s3client = new S3Client({ region: process.env.AWS_REGION });

  const s3response = await s3client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: keyName,
    }),
  );

  // the temporary data folder is kept between lambda runs/invocations
  // so we clean it out here to ensure we don't run old sql scripts
  console.log(`Emptying script path ${scriptPath}`);

  await fs.emptyDir(scriptPath);

  console.log(`Unzipping scripts to script path ${scriptPath}`);

  s3response.Body.pipe(Extract({ path: scriptPath }));
};

const getDatabaseConnectionDetails = async (secretArn: string): Promise<ConnectionDetails> => {
  console.log(`Getting connection details for secret ${secretArn}`);

  const cachedConnectionDetails = connectionDetailsCache.get(secretArn) as ConnectionDetails;

  if (cachedConnectionDetails) {
    console.log('Using cached connection details');

    return cachedConnectionDetails;
  }

  console.log('No cached connection details found, pulling from secret');

  const secretsManagerClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

  const connectionDetailsSecret = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: secretArn,
    }),
  );

  if (!connectionDetailsSecret.SecretString) {
    throw new Error('Secret was empty');
  }

  const connectionDetails = JSON.parse(connectionDetailsSecret.SecretString) as ConnectionDetails;

  connectionDetailsCache.set(secretArn, connectionDetails, connectionDetailsCacheTtlSeconds);

  return connectionDetails;
};

const connectToDatabase = async (
  connectionDetails: ConnectionDetails,
): Promise<mysql.Connection> => {
  console.log('Connecting to database');

  return mysql.createConnection({
    host: connectionDetails.host,
    port: connectionDetails.port,
    user: connectionDetails.username,
    password: connectionDetails.password,
    database: connectionDetails.dbname,
    multipleStatements: true,
  });
};

const runMigrationScripts = async (connection: mysql.Connection) => {
  console.log('Listing & sorting migration scripts to run');

  const fileNames = (await fs.readdir(scriptPath, { withFileTypes: true }))
    .filter(x => x.isFile())
    .map(x => x.name)
    .sort();

  for (const fileName of fileNames) {
    console.log(`Reading & running migration script ${fileName}`);

    const fullFilePath = path.join(scriptPath, fileName);

    const sql = await fs.readFile(fullFilePath, 'utf8');

    await connection.query(sql);
  }
};

const AsyncCreate = async (params: MySqlDatabaseMigratorCustomResourceProps) => {
  console.log('Create, started');

  await prepareSqlScripts(params.scriptBucketName, params.scriptKeyName);

  const connectionDetails = await getDatabaseConnectionDetails(params.secretArn);

  if (params.dryRun === 'false') {
    const connection = await connectToDatabase(connectionDetails);

    try {
      await runMigrationScripts(connection);
    } finally {
      await connection.end();
    }
  } else console.log('DryRun set to true, skipping actual database connection and queries');

  return {
    PhysicalResourceId: params.secretArn,
  };
};

const AsyncUpdate = async (
  _physicalId: string,
  params: MySqlDatabaseMigratorCustomResourceProps,
  // oldparams: MySqlDatabaseMigratorCustomResourceProps,
) => {
  console.log('Update, calling create');

  return AsyncCreate(params);
};

const AsyncDelete = async (
  physicalId: string,
  // params: MySqlDatabaseMigratorCustomResourceProps,
) => {
  console.log('Delete, no-op');

  return {
    PhysicalResourceId: physicalId,
  };
};

export const main = CfnLambda({
  AsyncCreate,
  AsyncUpdate,
  AsyncDelete,
  Schema,
});
