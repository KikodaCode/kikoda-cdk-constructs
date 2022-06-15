#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { TypescriptFunction } from '../../src/typescript-function';

const app = new App();
const stack = new Stack(app, 'TestStack');

new TypescriptFunction(stack, 'HelloWorld', {
  entry: 'test/functions/integ-handlers/hello.handler.ts',
  handler: 'main',
});

app.synth();
