[<img src="https://kikoda.com/wp-content/uploads/2019/07/Logo_White_bg.svg" width="300"/>](https://kikoda.com)
# Kikoda Constructs Library

[![NPM](https://img.shields.io/npm/v/kikoda-constructs?color=39a356&label=npm+cdk+v2)](https://www.npmjs.com/package/kikoda-constructs)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/KikodaCode/kikoda-constructs/blob/main/LICENSE)

Use this Kikoda Constructs Library to architect and model modern applications deployed with AWS.

## Install from NPM:
```
yarn add --dev @kikoda/constructs

# or

npm install @kikoda/constructs --save-dev
```

## Usage

### AWS CDK
The Kikoda Constructs library currently only supports AWS CDK v2.

Add this to your CDK stack:

```typescript
import { Website } from '@kikoda/constructs';

const website = new Website(this, 'Website', {
  stage: <DEPLOYMENT_STAGE_NAME>,
  appDir: resolve(__dirname, <RELATIVE_PATH_TO_WEB_ASSETS>),
  buildDir: <BUILD_DIR_RELATIVE_TO_APP_DIR>,
  buildCommand: <CMD_TO_BUILD_APP>,
  subdomain: <SUBDOMAIN>, // eg. dev
  baseDomain: <BASE_DOMAIN_NAME>, // eg. example.com
});
```

## Opening Issues

If you encounter a bug with this package, we want to hear about it. Before opening a new issue, search the existing issues to avoid duplicates.

When opening an issue, include the Kikoda Construct Library version, Node version, and stack trace if available. In addition, include the steps to reproduce when appropriate.

You can also open an issue for a feature request.

## Contributing

If you find an issue with this package and have a fix, please feel free to open a pull request following the [procedures](https://github.com/KikodaCode/kikoda-constructs/blob/main/CONTRIBUTING.md).

## Testing

If you contribute to this package you can run the tests using `yarn test`.

## License

Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.

This product includes software developed at Kikoda (https://www.kikoda.com). Copyright 2022 Kikoda, LLC.