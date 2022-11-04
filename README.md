[<img src="https://kikoda.com/wp-content/uploads/2019/07/Logo_White_bg.svg" width="300"/>](https://kikoda.com)
# Kikoda CDK Constructs Library

[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/KikodaCode/kikoda-constructs/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/@kikoda%2Fcdk-constructs.svg)](https://badge.fury.io/js/@kikoda%2Fcdk-constructs)
[![NuGet version](https://badge.fury.io/nu/Kikoda.CdkConstructs.svg)](https://badge.fury.io/nu/Kikoda.CdkConstructs)

Use this Kikoda CDK Constructs Library to architect and model modern applications deployed with AWS CDK.

## Install from NPM:
```
yarn add --dev @kikoda/cdk-constructs

# or

npm install @kikoda/cdk-constructs --save-dev
```

## Usage

### AWS CDK
The Kikoda Constructs library currently only supports AWS CDK v2.

Add this to your CDK stack to create a new Cloudfront/S3 backed website:

```typescript
import { Website } from '@kikoda/cdk-constructs';

const website = new Website(this, 'Website', {
  stage: <DEPLOYMENT_STAGE_NAME>,
  appDir: resolve(__dirname, <RELATIVE_PATH_TO_WEB_ASSETS>),
  buildDir: <BUILD_DIR_RELATIVE_TO_APP_DIR>,
  buildCommand: <CMD_TO_BUILD_APP>,
  domainName: <DOMAIN_NAME>,
});
```

#### Configured Stages
With the `ConfiguredStage` construct you can pass arbitrary environmental configuration to your CDK App. This is useful when you want to define and use a configuration object in your nested Stacks and Constructs.

```typescript
import { CodePipeline } from 'aws-cdk-lib/pipeines';
import { ConfiguredStage } from '@kikoda/cdk-constructs';

interface Config {
  foo: string;
}

class MyStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    /*
     * Get a config value in a child stack or construct
     */
    const stage = ConfiguredStage.extOf(this) as ConfiguredStage<Config>;

    const new MyConstruct(this, 'MyConstruct', {
      foo: stage.config.foo,
    });
  }
}

class MyStage<T> extends ConfiguredStage<T> {
  constructor(scope: Construct, id: string, props: ConfiguredStageProps<T>) {
    super(scope, id, props);

    new MyStack(this, 'MyStack');
  }
}

/*
 * Use the stage with CDK Pipelines
 */
const stage = new MyStage<Config>(this, 'DevStage', {
  stageName: 'dev',
  config: {
    foo: 'bar',
  },
});

const pipeline = new CodePipeline(this, 'Pipeline', {
  synth: new ShellStep('Synth', {
    input: CodePipelineSource.gitHub('owner/repo', 'main'),
    commands: [
      'yarn install',
      'yarn build',
      'npx cdk synth',
    ],
  }),
});

pipeline.addStage(stage);
```
```
```

## Opening Issues

If you encounter a bug with this package, we want to hear about it. Before opening a new issue, search the existing issues to avoid duplicates.

When opening an issue, include the Kikoda Construct Library version, Node version, and stack trace if available. In addition, include the steps to reproduce when appropriate.

You can also open an issue for a feature request.

## Contributing

If you find an issue with this package and have a fix, please feel free to open a pull request following the [procedures](CONTRIBUTING.md).

## Testing

If you contribute to this package you can run the tests using `yarn test`.

## License

Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.

This product includes software developed at Kikoda (https://www.kikoda.com). Copyright 2022 Kikoda, LLC.
