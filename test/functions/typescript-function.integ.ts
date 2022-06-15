#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
// import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { TypescriptFunction } from '../../src/typescript-function';

const app = new App();
const stack = new Stack(app, 'TestStack');

// new TypescriptFunction(stack, 'Function', {
//   handler: 'test/functions/hello.handler.main',
// });

new TypescriptFunction(stack, 'newfunc', {
  entry: 'test/functions/hello.handler.ts',
  handler: 'main',
});

app.synth();
