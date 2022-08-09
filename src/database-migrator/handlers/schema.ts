export const Schema = {
  _$schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  required: ['secretArn'],
  properties: {
    secretArn: {
      type: 'string',
    },
    scriptBucketName: {
      type: 'string',
    },
    scriptKeyName: {
      type: 'string',
    },
    dryRun: {
      type: 'string',
    },
  },
};
