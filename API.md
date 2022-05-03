# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Website <a name="Website" id="@kikoda/cdk-constructs.Website"></a>

Deploy a single page app with a standard static website architecture to AWS using CloudFront, S3, and Route53.

This is typically
coupled with the `configProvider` hooks in the `@kikoda/delivery-hooks` package using the `generateWebConfig`
and `generateWebConfigProps` options.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.Website.Initializer"></a>

```typescript
import { Website } from '@kikoda/cdk-constructs'

new Website(scope: Construct, id: string, props: WebsiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.Website.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.Website.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.Website.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.WebsiteProps">WebsiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.Website.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.Website.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.Website.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.WebsiteProps">WebsiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.Website.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.Website.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.Website.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.Website.isConstruct"></a>

```typescript
import { Website } from '@kikoda/cdk-constructs'

Website.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.Website.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.Website.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.Website.property.endpoint">endpoint</a></code> | <code>string</code> | Full website endpoint w/protocol. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.Website.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="@kikoda/cdk-constructs.Website.property.endpoint"></a>

```typescript
public readonly endpoint: string;
```

- *Type:* string

Full website endpoint w/protocol.

---


## Structs <a name="Structs" id="Structs"></a>

### GenerateWebConfigProps <a name="GenerateWebConfigProps" id="@kikoda/cdk-constructs.GenerateWebConfigProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.GenerateWebConfigProps.Initializer"></a>

```typescript
import { GenerateWebConfigProps } from '@kikoda/cdk-constructs'

const generateWebConfigProps: GenerateWebConfigProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.GenerateWebConfigProps.property.configDir">configDir</a></code> | <code>string</code> | The directory where base (optional) and stage level config (json) files are stored. |
| <code><a href="#@kikoda/cdk-constructs.GenerateWebConfigProps.property.additionalConfig">additionalConfig</a></code> | <code>object</code> | Provide any additional configuration items to add to the generated configuration file. |

---

##### `configDir`<sup>Required</sup> <a name="configDir" id="@kikoda/cdk-constructs.GenerateWebConfigProps.property.configDir"></a>

```typescript
public readonly configDir: string;
```

- *Type:* string

The directory where base (optional) and stage level config (json) files are stored.

This
should be relative to `appDir`. When using `generateConfig`, there needs to at least be a
`${stage}.config.json` in this directory. You can optionally include a `base.config.json`
file that all stage configs will inherit from (likewise you can override base config values
in stage level configs if needed).

---

##### `additionalConfig`<sup>Optional</sup> <a name="additionalConfig" id="@kikoda/cdk-constructs.GenerateWebConfigProps.property.additionalConfig"></a>

```typescript
public readonly additionalConfig: object;
```

- *Type:* object

Provide any additional configuration items to add to the generated configuration file.

This
will be added to the config as the `additionalConfig` attribute.

---

### WebsiteProps <a name="WebsiteProps" id="@kikoda/cdk-constructs.WebsiteProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.WebsiteProps.Initializer"></a>

```typescript
import { WebsiteProps } from '@kikoda/cdk-constructs'

const websiteProps: WebsiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.appDir">appDir</a></code> | <code>string</code> | The full absolute path of the Single Page App. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.baseDomain">baseDomain</a></code> | <code>string</code> | Top level domain for the site. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.stage">stage</a></code> | <code>string</code> | String indicator of which environment/stage is being deployed ex. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.subdomain">subdomain</a></code> | <code>string</code> | Sub-domain for the site. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.buildCommand">buildCommand</a></code> | <code>string</code> | The command for building the website (e.g. "yarn run build"). |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.buildDir">buildDir</a></code> | <code>string</code> | Path to the build output, relative to the `appDir`. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.BundlingOptions</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.cloudfrontInvalidationPaths">cloudfrontInvalidationPaths</a></code> | <code>string[]</code> | Specify the paths to be invalidated in the Cloudfront Distribution at the end of the deployment. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.corsAllowedOrigins">corsAllowedOrigins</a></code> | <code>string[]</code> | Specify a list of allowed request origins to use when configuring CORS (must also specify `enableCors`). |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.enableCors">enableCors</a></code> | <code>boolean</code> | Setup S3 bucket and Cloudfront distribution to allow CORS requests. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.generateWebConfigProps">generateWebConfigProps</a></code> | <code><a href="#@kikoda/cdk-constructs.GenerateWebConfigProps">GenerateWebConfigProps</a></code> | Specify options for gernerating a web config from base and stage level configs. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.indexDoc">indexDoc</a></code> | <code>string</code> | The name of the index document to load, typically 'index.html'. |
| <code><a href="#@kikoda/cdk-constructs.WebsiteProps.property.repoRoot">repoRoot</a></code> | <code>string</code> | This should be the root directory of the git repository. |

---

##### `appDir`<sup>Required</sup> <a name="appDir" id="@kikoda/cdk-constructs.WebsiteProps.property.appDir"></a>

```typescript
public readonly appDir: string;
```

- *Type:* string

The full absolute path of the Single Page App.

---

##### `baseDomain`<sup>Required</sup> <a name="baseDomain" id="@kikoda/cdk-constructs.WebsiteProps.property.baseDomain"></a>

```typescript
public readonly baseDomain: string;
```

- *Type:* string

Top level domain for the site.

This should match an existing hosted zone in R53. eg. example.com

---

##### `stage`<sup>Required</sup> <a name="stage" id="@kikoda/cdk-constructs.WebsiteProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

String indicator of which environment/stage is being deployed ex.

'dev', 'test', 'prod'

---

##### `subdomain`<sup>Required</sup> <a name="subdomain" id="@kikoda/cdk-constructs.WebsiteProps.property.subdomain"></a>

```typescript
public readonly subdomain: string;
```

- *Type:* string

Sub-domain for the site.

eg <subdomain>.example.com

---

##### `buildCommand`<sup>Optional</sup> <a name="buildCommand" id="@kikoda/cdk-constructs.WebsiteProps.property.buildCommand"></a>

```typescript
public readonly buildCommand: string;
```

- *Type:* string

The command for building the website (e.g. "yarn run build").

---

##### `buildDir`<sup>Optional</sup> <a name="buildDir" id="@kikoda/cdk-constructs.WebsiteProps.property.buildDir"></a>

```typescript
public readonly buildDir: string;
```

- *Type:* string

Path to the build output, relative to the `appDir`.

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="@kikoda/cdk-constructs.WebsiteProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.BundlingOptions

---

##### `cloudfrontInvalidationPaths`<sup>Optional</sup> <a name="cloudfrontInvalidationPaths" id="@kikoda/cdk-constructs.WebsiteProps.property.cloudfrontInvalidationPaths"></a>

```typescript
public readonly cloudfrontInvalidationPaths: string[];
```

- *Type:* string[]
- *Default:* wildcard invalidation ['/*']

Specify the paths to be invalidated in the Cloudfront Distribution at the end of the deployment.

---

##### `corsAllowedOrigins`<sup>Optional</sup> <a name="corsAllowedOrigins" id="@kikoda/cdk-constructs.WebsiteProps.property.corsAllowedOrigins"></a>

```typescript
public readonly corsAllowedOrigins: string[];
```

- *Type:* string[]
- *Default:* ['*']

Specify a list of allowed request origins to use when configuring CORS (must also specify `enableCors`).

---

##### `enableCors`<sup>Optional</sup> <a name="enableCors" id="@kikoda/cdk-constructs.WebsiteProps.property.enableCors"></a>

```typescript
public readonly enableCors: boolean;
```

- *Type:* boolean

Setup S3 bucket and Cloudfront distribution to allow CORS requests.

Optionally specificy the allowed Origins with `corsAllowedOrigins`

---

##### `generateWebConfigProps`<sup>Optional</sup> <a name="generateWebConfigProps" id="@kikoda/cdk-constructs.WebsiteProps.property.generateWebConfigProps"></a>

```typescript
public readonly generateWebConfigProps: GenerateWebConfigProps;
```

- *Type:* <a href="#@kikoda/cdk-constructs.GenerateWebConfigProps">GenerateWebConfigProps</a>

Specify options for gernerating a web config from base and stage level configs.

Must
enable `generateWebConfig`

---

##### `indexDoc`<sup>Optional</sup> <a name="indexDoc" id="@kikoda/cdk-constructs.WebsiteProps.property.indexDoc"></a>

```typescript
public readonly indexDoc: string;
```

- *Type:* string
- *Default:* "index.html"

The name of the index document to load, typically 'index.html'.

---

##### `repoRoot`<sup>Optional</sup> <a name="repoRoot" id="@kikoda/cdk-constructs.WebsiteProps.property.repoRoot"></a>

```typescript
public readonly repoRoot: string;
```

- *Type:* string

This should be the root directory of the git repository.

Dependending on your repository setup
this may be required for Docker-based bundling. This path, if provided will be used as the mount point
for the Docker container during bundling. If this is not provided, the `appDir` path will be used.

---



