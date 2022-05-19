# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ConfiguredStage <a name="ConfiguredStage" id="@kikoda/constructs.ConfiguredStage"></a>

A {@link Stage} with resolved constructs for prexisting infrastructure.

#### Initializers <a name="Initializers" id="@kikoda/constructs.ConfiguredStage.Initializer"></a>

```typescript
import { ConfiguredStage } from '@kikoda/constructs'

new ConfiguredStage(scope: Construct, id: string, props: ConfiguredStageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.ConfiguredStageProps">ConfiguredStageProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.ConfiguredStageProps">ConfiguredStageProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStage.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.synth">synth</a></code> | Synthesize this stage into a cloud assembly. |

---

##### `toString` <a name="toString" id="@kikoda/constructs.ConfiguredStage.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@kikoda/constructs.ConfiguredStage.synth"></a>

```typescript
public synth(options?: StageSynthesisOptions): CloudAssembly
```

Synthesize this stage into a cloud assembly.

Once an assembly has been synthesized, it cannot be modified. Subsequent
calls will return the same assembly.

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/constructs.ConfiguredStage.synth.parameter.options"></a>

- *Type:* aws-cdk-lib.StageSynthesisOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStage.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.isStage">isStage</a></code> | Test whether the given construct is a stage. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.of">of</a></code> | Return the stage this construct is contained with, if available. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/constructs.ConfiguredStage.isConstruct"></a>

```typescript
import { ConfiguredStage } from '@kikoda/constructs'

ConfiguredStage.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.ConfiguredStage.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStage` <a name="isStage" id="@kikoda/constructs.ConfiguredStage.isStage"></a>

```typescript
import { ConfiguredStage } from '@kikoda/constructs'

ConfiguredStage.isStage(x: any)
```

Test whether the given construct is a stage.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.ConfiguredStage.isStage.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@kikoda/constructs.ConfiguredStage.of"></a>

```typescript
import { ConfiguredStage } from '@kikoda/constructs'

ConfiguredStage.of(construct: IConstruct)
```

Return the stage this construct is contained with, if available.

If called
on a nested stage, returns its parent.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/constructs.ConfiguredStage.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.artifactId">artifactId</a></code> | <code>string</code> | Artifact ID of the assembly if it is a nested stage. The root stage (app) will return an empty string. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.assetOutdir">assetOutdir</a></code> | <code>string</code> | The cloud assembly asset output directory. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.outdir">outdir</a></code> | <code>string</code> | The cloud assembly output directory. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.stageName">stageName</a></code> | <code>string</code> | The name of the stage. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.account">account</a></code> | <code>string</code> | The default account for all resources defined within this stage. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.parentStage">parentStage</a></code> | <code>aws-cdk-lib.Stage</code> | The parent stage or `undefined` if this is the app. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.region">region</a></code> | <code>string</code> | The default region for all resources defined within this stage. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.config">config</a></code> | <code><a href="#@kikoda/constructs.StageConfig">StageConfig</a></code> | The configuration for the stage. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The vpc as configured via {@link StageConfig.vpcId} this vpc must be created as a predicate for the application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/constructs.ConfiguredStage.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@kikoda/constructs.ConfiguredStage.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

Artifact ID of the assembly if it is a nested stage. The root stage (app) will return an empty string.

Derived from the construct path.

---

##### `assetOutdir`<sup>Required</sup> <a name="assetOutdir" id="@kikoda/constructs.ConfiguredStage.property.assetOutdir"></a>

```typescript
public readonly assetOutdir: string;
```

- *Type:* string

The cloud assembly asset output directory.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@kikoda/constructs.ConfiguredStage.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

The cloud assembly output directory.

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/constructs.ConfiguredStage.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

The name of the stage.

Based on names of the parent stages separated by
hypens.

---

##### `account`<sup>Optional</sup> <a name="account" id="@kikoda/constructs.ConfiguredStage.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The default account for all resources defined within this stage.

---

##### `parentStage`<sup>Optional</sup> <a name="parentStage" id="@kikoda/constructs.ConfiguredStage.property.parentStage"></a>

```typescript
public readonly parentStage: Stage;
```

- *Type:* aws-cdk-lib.Stage

The parent stage or `undefined` if this is the app.

*

---

##### `region`<sup>Optional</sup> <a name="region" id="@kikoda/constructs.ConfiguredStage.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The default region for all resources defined within this stage.

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.ConfiguredStage.property.config"></a>

```typescript
public readonly config: StageConfig;
```

- *Type:* <a href="#@kikoda/constructs.StageConfig">StageConfig</a>

The configuration for the stage.

> [{@link StageConfig}]({@link StageConfig})

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@kikoda/constructs.ConfiguredStage.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The vpc as configured via {@link StageConfig.vpcId} this vpc must be created as a predicate for the application.

---


### StageAlarmTopic <a name="StageAlarmTopic" id="@kikoda/constructs.StageAlarmTopic"></a>

An alarm topic and optional cfn export of the topic name.

#### Initializers <a name="Initializers" id="@kikoda/constructs.StageAlarmTopic.Initializer"></a>

```typescript
import { StageAlarmTopic } from '@kikoda/constructs'

new StageAlarmTopic(scope: Construct, id: string, props: StageAlarmTopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.StageAlarmTopicProps">StageAlarmTopicProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.StageAlarmTopic.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.StageAlarmTopic.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.StageAlarmTopic.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.StageAlarmTopicProps">StageAlarmTopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/constructs.StageAlarmTopic.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/constructs.StageAlarmTopic.isConstruct"></a>

```typescript
import { StageAlarmTopic } from '@kikoda/constructs'

StageAlarmTopic.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.StageAlarmTopic.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageAlarmTopic.property.cfnOutput">cfnOutput</a></code> | <code>aws-cdk-lib.CfnOutput</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/constructs.StageAlarmTopic.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `topic`<sup>Required</sup> <a name="topic" id="@kikoda/constructs.StageAlarmTopic.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---

##### `cfnOutput`<sup>Optional</sup> <a name="cfnOutput" id="@kikoda/constructs.StageAlarmTopic.property.cfnOutput"></a>

```typescript
public readonly cfnOutput: CfnOutput;
```

- *Type:* aws-cdk-lib.CfnOutput

---


### Website <a name="Website" id="@kikoda/constructs.Website"></a>

Deploy a single page app with a standard static website architecture to AWS using CloudFront, S3, and Route53.

This is typically
coupled with the `configProvider` hooks in the `@kikoda/delivery-hooks` package using the `generateWebConfig`
and `generateWebConfigProps` options.

#### Initializers <a name="Initializers" id="@kikoda/constructs.Website.Initializer"></a>

```typescript
import { Website } from '@kikoda/constructs'

new Website(scope: Construct, id: string, props: WebsiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.Website.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.Website.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.Website.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.WebsiteProps">WebsiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.Website.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.Website.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.Website.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.WebsiteProps">WebsiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.Website.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/constructs.Website.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.Website.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/constructs.Website.isConstruct"></a>

```typescript
import { Website } from '@kikoda/constructs'

Website.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.Website.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.Website.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/constructs.Website.property.endpoint">endpoint</a></code> | <code>string</code> | Full website endpoint w/protocol. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/constructs.Website.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="@kikoda/constructs.Website.property.endpoint"></a>

```typescript
public readonly endpoint: string;
```

- *Type:* string

Full website endpoint w/protocol.

---


## Structs <a name="Structs" id="Structs"></a>

### ConfiguredStageProps <a name="ConfiguredStageProps" id="@kikoda/constructs.ConfiguredStageProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.ConfiguredStageProps.Initializer"></a>

```typescript
import { ConfiguredStageProps } from '@kikoda/constructs'

const configuredStageProps: ConfiguredStageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStageProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | Default AWS environment (account/region) for `Stack`s in this `Stage`. |
| <code><a href="#@kikoda/constructs.ConfiguredStageProps.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to emit synthesized artifacts. |
| <code><a href="#@kikoda/constructs.ConfiguredStageProps.property.config">config</a></code> | <code><a href="#@kikoda/constructs.StageConfig">StageConfig</a></code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/constructs.ConfiguredStageProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environments should be configured on the `Stack`s.

Default AWS environment (account/region) for `Stack`s in this `Stage`.

Stacks defined inside this `Stage` with either `region` or `account` missing
from its env will use the corresponding field given here.

If either `region` or `account`is is not configured for `Stack` (either on
the `Stack` itself or on the containing `Stage`), the Stack will be
*environment-agnostic*.

Environment-agnostic stacks can be deployed to any environment, may not be
able to take advantage of all features of the CDK. For example, they will
not be able to use environmental context lookups, will not automatically
translate Service Principals to the right format based on the environment's
AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this Stage to
new Stage(app, 'Stage1', {
  env: { account: '123456789012', region: 'us-east-1' },
});

// Use the CLI's current credentials to determine the target environment
new Stage(app, 'Stage2', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
```


##### `outdir`<sup>Optional</sup> <a name="outdir" id="@kikoda/constructs.ConfiguredStageProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* for nested stages, outdir will be determined as a relative directory to the outdir of the app. For apps, if outdir is not specified, a temporary directory will be created.

The output directory into which to emit synthesized artifacts.

Can only be specified if this stage is the root stage (the app). If this is
specified and this stage is nested within another stage, an error will be
thrown.

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.ConfiguredStageProps.property.config"></a>

```typescript
public readonly config: StageConfig;
```

- *Type:* <a href="#@kikoda/constructs.StageConfig">StageConfig</a>

---

### GenerateWebConfigProps <a name="GenerateWebConfigProps" id="@kikoda/constructs.GenerateWebConfigProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.GenerateWebConfigProps.Initializer"></a>

```typescript
import { GenerateWebConfigProps } from '@kikoda/constructs'

const generateWebConfigProps: GenerateWebConfigProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.GenerateWebConfigProps.property.configDir">configDir</a></code> | <code>string</code> | The directory where base (optional) and stage level config (json) files are stored. |
| <code><a href="#@kikoda/constructs.GenerateWebConfigProps.property.additionalConfig">additionalConfig</a></code> | <code>object</code> | Provide any additional configuration items to add to the generated configuration file. |

---

##### `configDir`<sup>Required</sup> <a name="configDir" id="@kikoda/constructs.GenerateWebConfigProps.property.configDir"></a>

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

##### `additionalConfig`<sup>Optional</sup> <a name="additionalConfig" id="@kikoda/constructs.GenerateWebConfigProps.property.additionalConfig"></a>

```typescript
public readonly additionalConfig: object;
```

- *Type:* object

Provide any additional configuration items to add to the generated configuration file.

This
will be added to the config as the `additionalConfig` attribute.

---

### StageAlarmTopicProps <a name="StageAlarmTopicProps" id="@kikoda/constructs.StageAlarmTopicProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.StageAlarmTopicProps.Initializer"></a>

```typescript
import { StageAlarmTopicProps } from '@kikoda/constructs'

const stageAlarmTopicProps: StageAlarmTopicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.StageAlarmTopicProps.property.level">level</a></code> | <code><a href="#@kikoda/constructs.AlarmLevels">AlarmLevels</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageAlarmTopicProps.property.createCfnExport">createCfnExport</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageAlarmTopicProps.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |

---

##### `level`<sup>Required</sup> <a name="level" id="@kikoda/constructs.StageAlarmTopicProps.property.level"></a>

```typescript
public readonly level: AlarmLevels;
```

- *Type:* <a href="#@kikoda/constructs.AlarmLevels">AlarmLevels</a>

---

##### `createCfnExport`<sup>Optional</sup> <a name="createCfnExport" id="@kikoda/constructs.StageAlarmTopicProps.property.createCfnExport"></a>

```typescript
public readonly createCfnExport: boolean;
```

- *Type:* boolean

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="@kikoda/constructs.StageAlarmTopicProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

---

### StageConfig <a name="StageConfig" id="@kikoda/constructs.StageConfig"></a>

Configuration for the stage.

#### Initializer <a name="Initializer" id="@kikoda/constructs.StageConfig.Initializer"></a>

```typescript
import { StageConfig } from '@kikoda/constructs'

const stageConfig: StageConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.StageConfig.property.enableAlarms">enableAlarms</a></code> | <code>boolean</code> | Enable stage level alarms. |
| <code><a href="#@kikoda/constructs.StageConfig.property.stackConfigs">stackConfigs</a></code> | <code>any</code> | Stack specific configs. |
| <code><a href="#@kikoda/constructs.StageConfig.property.stageName">stageName</a></code> | <code>string</code> | The name of this stage. |
| <code><a href="#@kikoda/constructs.StageConfig.property.vpcId">vpcId</a></code> | <code>string</code> | The vpcId of a prexisting vpc. |
| <code><a href="#@kikoda/constructs.StageConfig.property.subDomain">subDomain</a></code> | <code>string</code> | The subdomain for the stage. |

---

##### `enableAlarms`<sup>Required</sup> <a name="enableAlarms" id="@kikoda/constructs.StageConfig.property.enableAlarms"></a>

```typescript
public readonly enableAlarms: boolean;
```

- *Type:* boolean

Enable stage level alarms.

---

##### `stackConfigs`<sup>Required</sup> <a name="stackConfigs" id="@kikoda/constructs.StageConfig.property.stackConfigs"></a>

```typescript
public readonly stackConfigs: any;
```

- *Type:* any

Stack specific configs.

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/constructs.StageConfig.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

The name of this stage.

---

##### `vpcId`<sup>Required</sup> <a name="vpcId" id="@kikoda/constructs.StageConfig.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* string

The vpcId of a prexisting vpc.

---

##### `subDomain`<sup>Optional</sup> <a name="subDomain" id="@kikoda/constructs.StageConfig.property.subDomain"></a>

```typescript
public readonly subDomain: string;
```

- *Type:* string

The subdomain for the stage.

---

### WebsiteProps <a name="WebsiteProps" id="@kikoda/constructs.WebsiteProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.WebsiteProps.Initializer"></a>

```typescript
import { WebsiteProps } from '@kikoda/constructs'

const websiteProps: WebsiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.appDir">appDir</a></code> | <code>string</code> | The full absolute path of the Single Page App. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.baseDomain">baseDomain</a></code> | <code>string</code> | Top level domain for the site. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.stage">stage</a></code> | <code>string</code> | String indicator of which environment/stage is being deployed ex. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.subdomain">subdomain</a></code> | <code>string</code> | Sub-domain for the site. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.buildCommand">buildCommand</a></code> | <code>string</code> | The command for building the website (e.g. "yarn run build"). |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.buildDir">buildDir</a></code> | <code>string</code> | Path to the build output, relative to the `appDir`. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.BundlingOptions</code> | *No description.* |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.cloudfrontInvalidationPaths">cloudfrontInvalidationPaths</a></code> | <code>string[]</code> | Specify the paths to be invalidated in the Cloudfront Distribution at the end of the deployment. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.corsAllowedOrigins">corsAllowedOrigins</a></code> | <code>string[]</code> | Specify a list of allowed request origins to use when configuring CORS (must also specify `enableCors`). |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.enableCors">enableCors</a></code> | <code>boolean</code> | Setup S3 bucket and Cloudfront distribution to allow CORS requests. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.generateWebConfigProps">generateWebConfigProps</a></code> | <code><a href="#@kikoda/constructs.GenerateWebConfigProps">GenerateWebConfigProps</a></code> | Specify options for gernerating a web config from base and stage level configs. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.indexDoc">indexDoc</a></code> | <code>string</code> | The name of the index document to load, typically 'index.html'. |
| <code><a href="#@kikoda/constructs.WebsiteProps.property.repoRoot">repoRoot</a></code> | <code>string</code> | This should be the root directory of the git repository. |

---

##### `appDir`<sup>Required</sup> <a name="appDir" id="@kikoda/constructs.WebsiteProps.property.appDir"></a>

```typescript
public readonly appDir: string;
```

- *Type:* string

The full absolute path of the Single Page App.

---

##### `baseDomain`<sup>Required</sup> <a name="baseDomain" id="@kikoda/constructs.WebsiteProps.property.baseDomain"></a>

```typescript
public readonly baseDomain: string;
```

- *Type:* string

Top level domain for the site.

This should match an existing hosted zone in R53. eg. example.com

---

##### `stage`<sup>Required</sup> <a name="stage" id="@kikoda/constructs.WebsiteProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

String indicator of which environment/stage is being deployed ex.

'dev', 'test', 'prod'

---

##### `subdomain`<sup>Required</sup> <a name="subdomain" id="@kikoda/constructs.WebsiteProps.property.subdomain"></a>

```typescript
public readonly subdomain: string;
```

- *Type:* string

Sub-domain for the site.

eg <subdomain>.example.com

---

##### `buildCommand`<sup>Optional</sup> <a name="buildCommand" id="@kikoda/constructs.WebsiteProps.property.buildCommand"></a>

```typescript
public readonly buildCommand: string;
```

- *Type:* string

The command for building the website (e.g. "yarn run build").

---

##### `buildDir`<sup>Optional</sup> <a name="buildDir" id="@kikoda/constructs.WebsiteProps.property.buildDir"></a>

```typescript
public readonly buildDir: string;
```

- *Type:* string

Path to the build output, relative to the `appDir`.

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="@kikoda/constructs.WebsiteProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.BundlingOptions

---

##### `cloudfrontInvalidationPaths`<sup>Optional</sup> <a name="cloudfrontInvalidationPaths" id="@kikoda/constructs.WebsiteProps.property.cloudfrontInvalidationPaths"></a>

```typescript
public readonly cloudfrontInvalidationPaths: string[];
```

- *Type:* string[]
- *Default:* wildcard invalidation ['/*']

Specify the paths to be invalidated in the Cloudfront Distribution at the end of the deployment.

---

##### `corsAllowedOrigins`<sup>Optional</sup> <a name="corsAllowedOrigins" id="@kikoda/constructs.WebsiteProps.property.corsAllowedOrigins"></a>

```typescript
public readonly corsAllowedOrigins: string[];
```

- *Type:* string[]
- *Default:* ['*']

Specify a list of allowed request origins to use when configuring CORS (must also specify `enableCors`).

---

##### `enableCors`<sup>Optional</sup> <a name="enableCors" id="@kikoda/constructs.WebsiteProps.property.enableCors"></a>

```typescript
public readonly enableCors: boolean;
```

- *Type:* boolean

Setup S3 bucket and Cloudfront distribution to allow CORS requests.

Optionally specificy the allowed Origins with `corsAllowedOrigins`

---

##### `generateWebConfigProps`<sup>Optional</sup> <a name="generateWebConfigProps" id="@kikoda/constructs.WebsiteProps.property.generateWebConfigProps"></a>

```typescript
public readonly generateWebConfigProps: GenerateWebConfigProps;
```

- *Type:* <a href="#@kikoda/constructs.GenerateWebConfigProps">GenerateWebConfigProps</a>

Specify options for gernerating a web config from base and stage level configs.

Must
enable `generateWebConfig`

---

##### `indexDoc`<sup>Optional</sup> <a name="indexDoc" id="@kikoda/constructs.WebsiteProps.property.indexDoc"></a>

```typescript
public readonly indexDoc: string;
```

- *Type:* string
- *Default:* "index.html"

The name of the index document to load, typically 'index.html'.

---

##### `repoRoot`<sup>Optional</sup> <a name="repoRoot" id="@kikoda/constructs.WebsiteProps.property.repoRoot"></a>

```typescript
public readonly repoRoot: string;
```

- *Type:* string

This should be the root directory of the git repository.

Dependending on your repository setup
this may be required for Docker-based bundling. This path, if provided will be used as the mount point
for the Docker container during bundling. If this is not provided, the `appDir` path will be used.

---

## Classes <a name="Classes" id="Classes"></a>

### LayeredConfig <a name="LayeredConfig" id="@kikoda/constructs.LayeredConfig"></a>

This construct current only wraps the lodash.merge() functionality but is intended to be a placeholder for future logic like: global defaults, type enforcement and error handling, dynamic values (custom compute logic), etc.

#### Initializers <a name="Initializers" id="@kikoda/constructs.LayeredConfig.Initializer"></a>

```typescript
import { LayeredConfig } from '@kikoda/constructs'

new LayeredConfig(base: any, layers: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.LayeredConfig.Initializer.parameter.base">base</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@kikoda/constructs.LayeredConfig.Initializer.parameter.layers">layers</a></code> | <code>any</code> | *No description.* |

---

##### `base`<sup>Required</sup> <a name="base" id="@kikoda/constructs.LayeredConfig.Initializer.parameter.base"></a>

- *Type:* any

---

##### `layers`<sup>Required</sup> <a name="layers" id="@kikoda/constructs.LayeredConfig.Initializer.parameter.layers"></a>

- *Type:* any

---






## Enums <a name="Enums" id="Enums"></a>

### AlarmLevels <a name="AlarmLevels" id="@kikoda/constructs.AlarmLevels"></a>

The Alarm levels.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.AlarmLevels.INFO">INFO</a></code> | For general information these are typically the most verbose. |
| <code><a href="#@kikoda/constructs.AlarmLevels.WARNING">WARNING</a></code> | Events that indicate service degredation, inefficency, and/or non blocking errors. |
| <code><a href="#@kikoda/constructs.AlarmLevels.CRITICAL">CRITICAL</a></code> | Events that indicate system failures, data loss, and/or blocking errors. |

---

##### `INFO` <a name="INFO" id="@kikoda/constructs.AlarmLevels.INFO"></a>

For general information these are typically the most verbose.

---


##### `WARNING` <a name="WARNING" id="@kikoda/constructs.AlarmLevels.WARNING"></a>

Events that indicate service degredation, inefficency, and/or non blocking errors.

---


##### `CRITICAL` <a name="CRITICAL" id="@kikoda/constructs.AlarmLevels.CRITICAL"></a>

Events that indicate system failures, data loss, and/or blocking errors.

---

