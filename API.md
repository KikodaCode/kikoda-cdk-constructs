# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ConfiguredStage <a name="ConfiguredStage" id="@kikoda/cdk-constructs.ConfiguredStage"></a>

A {@link Stage} with resolved constructs for prexisting infrastructure.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

new ConfiguredStage(scope: Construct, id: string, props: ConfiguredStageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps">ConfiguredStageProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.ConfiguredStageProps">ConfiguredStageProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.synth">synth</a></code> | Synthesize this stage into a cloud assembly. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.ConfiguredStage.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@kikoda/cdk-constructs.ConfiguredStage.synth"></a>

```typescript
public synth(options?: StageSynthesisOptions): CloudAssembly
```

Synthesize this stage into a cloud assembly.

Once an assembly has been synthesized, it cannot be modified. Subsequent
calls will return the same assembly.

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.ConfiguredStage.synth.parameter.options"></a>

- *Type:* aws-cdk-lib.StageSynthesisOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.isStage">isStage</a></code> | Test whether the given construct is a stage. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.of">of</a></code> | Return the stage this construct is contained with, if available. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.ConfiguredStage.isConstruct"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

ConfiguredStage.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.ConfiguredStage.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStage` <a name="isStage" id="@kikoda/cdk-constructs.ConfiguredStage.isStage"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

ConfiguredStage.isStage(x: any)
```

Test whether the given construct is a stage.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.ConfiguredStage.isStage.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@kikoda/cdk-constructs.ConfiguredStage.of"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

ConfiguredStage.of(construct: IConstruct)
```

Return the stage this construct is contained with, if available.

If called
on a nested stage, returns its parent.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/cdk-constructs.ConfiguredStage.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.artifactId">artifactId</a></code> | <code>string</code> | Artifact ID of the assembly if it is a nested stage. The root stage (app) will return an empty string. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.assetOutdir">assetOutdir</a></code> | <code>string</code> | The cloud assembly asset output directory. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.outdir">outdir</a></code> | <code>string</code> | The cloud assembly output directory. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.stageName">stageName</a></code> | <code>string</code> | The name of the stage. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.account">account</a></code> | <code>string</code> | The default account for all resources defined within this stage. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.parentStage">parentStage</a></code> | <code>aws-cdk-lib.Stage</code> | The parent stage or `undefined` if this is the app. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.region">region</a></code> | <code>string</code> | The default region for all resources defined within this stage. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.config">config</a></code> | <code><a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a></code> | The configuration for the stage. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The vpc as configured via {@link StageConfig.vpcId} this vpc must be created as a predicate for the application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.ConfiguredStage.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@kikoda/cdk-constructs.ConfiguredStage.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

Artifact ID of the assembly if it is a nested stage. The root stage (app) will return an empty string.

Derived from the construct path.

---

##### `assetOutdir`<sup>Required</sup> <a name="assetOutdir" id="@kikoda/cdk-constructs.ConfiguredStage.property.assetOutdir"></a>

```typescript
public readonly assetOutdir: string;
```

- *Type:* string

The cloud assembly asset output directory.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@kikoda/cdk-constructs.ConfiguredStage.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

The cloud assembly output directory.

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/cdk-constructs.ConfiguredStage.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

The name of the stage.

Based on names of the parent stages separated by
hypens.

---

##### `account`<sup>Optional</sup> <a name="account" id="@kikoda/cdk-constructs.ConfiguredStage.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The default account for all resources defined within this stage.

---

##### `parentStage`<sup>Optional</sup> <a name="parentStage" id="@kikoda/cdk-constructs.ConfiguredStage.property.parentStage"></a>

```typescript
public readonly parentStage: Stage;
```

- *Type:* aws-cdk-lib.Stage

The parent stage or `undefined` if this is the app.

*

---

##### `region`<sup>Optional</sup> <a name="region" id="@kikoda/cdk-constructs.ConfiguredStage.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The default region for all resources defined within this stage.

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/cdk-constructs.ConfiguredStage.property.config"></a>

```typescript
public readonly config: StageConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a>

The configuration for the stage.

> [{@link StageConfig}]({@link StageConfig})

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@kikoda/cdk-constructs.ConfiguredStage.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The vpc as configured via {@link StageConfig.vpcId} this vpc must be created as a predicate for the application.

---


### StageAlarmTopic <a name="StageAlarmTopic" id="@kikoda/cdk-constructs.StageAlarmTopic"></a>

An alarm topic and optional cfn export of the topic name.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer"></a>

```typescript
import { StageAlarmTopic } from '@kikoda/cdk-constructs'

new StageAlarmTopic(scope: Construct, id: string, props: StageAlarmTopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps">StageAlarmTopicProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.StageAlarmTopicProps">StageAlarmTopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.StageAlarmTopic.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.StageAlarmTopic.isConstruct"></a>

```typescript
import { StageAlarmTopic } from '@kikoda/cdk-constructs'

StageAlarmTopic.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.StageAlarmTopic.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.property.cfnOutput">cfnOutput</a></code> | <code>aws-cdk-lib.CfnOutput</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.StageAlarmTopic.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `topic`<sup>Required</sup> <a name="topic" id="@kikoda/cdk-constructs.StageAlarmTopic.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---

##### `cfnOutput`<sup>Optional</sup> <a name="cfnOutput" id="@kikoda/cdk-constructs.StageAlarmTopic.property.cfnOutput"></a>

```typescript
public readonly cfnOutput: CfnOutput;
```

- *Type:* aws-cdk-lib.CfnOutput

---


## Structs <a name="Structs" id="Structs"></a>

### ConfiguredStageProps <a name="ConfiguredStageProps" id="@kikoda/cdk-constructs.ConfiguredStageProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.ConfiguredStageProps.Initializer"></a>

```typescript
import { ConfiguredStageProps } from '@kikoda/cdk-constructs'

const configuredStageProps: ConfiguredStageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | Default AWS environment (account/region) for `Stack`s in this `Stage`. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to emit synthesized artifacts. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps.property.config">config</a></code> | <code><a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a></code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/cdk-constructs.ConfiguredStageProps.property.env"></a>

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


##### `outdir`<sup>Optional</sup> <a name="outdir" id="@kikoda/cdk-constructs.ConfiguredStageProps.property.outdir"></a>

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

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/cdk-constructs.ConfiguredStageProps.property.config"></a>

```typescript
public readonly config: StageConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a>

---

### StageAlarmTopicProps <a name="StageAlarmTopicProps" id="@kikoda/cdk-constructs.StageAlarmTopicProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.StageAlarmTopicProps.Initializer"></a>

```typescript
import { StageAlarmTopicProps } from '@kikoda/cdk-constructs'

const stageAlarmTopicProps: StageAlarmTopicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.level">level</a></code> | <code><a href="#@kikoda/cdk-constructs.AlarmLevels">AlarmLevels</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.createCfnExport">createCfnExport</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |

---

##### `level`<sup>Required</sup> <a name="level" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.level"></a>

```typescript
public readonly level: AlarmLevels;
```

- *Type:* <a href="#@kikoda/cdk-constructs.AlarmLevels">AlarmLevels</a>

---

##### `createCfnExport`<sup>Optional</sup> <a name="createCfnExport" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.createCfnExport"></a>

```typescript
public readonly createCfnExport: boolean;
```

- *Type:* boolean

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

---

### StageConfig <a name="StageConfig" id="@kikoda/cdk-constructs.StageConfig"></a>

Configuration for the stage.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.StageConfig.Initializer"></a>

```typescript
import { StageConfig } from '@kikoda/cdk-constructs'

const stageConfig: StageConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.enableAlarms">enableAlarms</a></code> | <code>boolean</code> | Enable stage level alarms. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.stackConfigs">stackConfigs</a></code> | <code>any</code> | Stack specific configs. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.stageName">stageName</a></code> | <code>string</code> | The name of this stage. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.vpcId">vpcId</a></code> | <code>string</code> | The vpcId of a prexisting vpc. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.subDomain">subDomain</a></code> | <code>string</code> | The subdomain for the stage. |

---

##### `enableAlarms`<sup>Required</sup> <a name="enableAlarms" id="@kikoda/cdk-constructs.StageConfig.property.enableAlarms"></a>

```typescript
public readonly enableAlarms: boolean;
```

- *Type:* boolean

Enable stage level alarms.

---

##### `stackConfigs`<sup>Required</sup> <a name="stackConfigs" id="@kikoda/cdk-constructs.StageConfig.property.stackConfigs"></a>

```typescript
public readonly stackConfigs: any;
```

- *Type:* any

Stack specific configs.

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/cdk-constructs.StageConfig.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

The name of this stage.

---

##### `vpcId`<sup>Required</sup> <a name="vpcId" id="@kikoda/cdk-constructs.StageConfig.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* string

The vpcId of a prexisting vpc.

---

##### `subDomain`<sup>Optional</sup> <a name="subDomain" id="@kikoda/cdk-constructs.StageConfig.property.subDomain"></a>

```typescript
public readonly subDomain: string;
```

- *Type:* string

The subdomain for the stage.

---



## Enums <a name="Enums" id="Enums"></a>

### AlarmLevels <a name="AlarmLevels" id="@kikoda/cdk-constructs.AlarmLevels"></a>

The Alarm levels.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.AlarmLevels.INFO">INFO</a></code> | For general information these are typically the most verbose. |
| <code><a href="#@kikoda/cdk-constructs.AlarmLevels.WARNING">WARNING</a></code> | Events that indicate service degredation, inefficency, and/or non blocking errors. |
| <code><a href="#@kikoda/cdk-constructs.AlarmLevels.CRITICAL">CRITICAL</a></code> | Events that indicate system failures, data loss, and/or blocking errors. |

---

##### `INFO` <a name="INFO" id="@kikoda/cdk-constructs.AlarmLevels.INFO"></a>

For general information these are typically the most verbose.

---


##### `WARNING` <a name="WARNING" id="@kikoda/cdk-constructs.AlarmLevels.WARNING"></a>

Events that indicate service degredation, inefficency, and/or non blocking errors.

---


##### `CRITICAL` <a name="CRITICAL" id="@kikoda/cdk-constructs.AlarmLevels.CRITICAL"></a>

Events that indicate system failures, data loss, and/or blocking errors.

---

