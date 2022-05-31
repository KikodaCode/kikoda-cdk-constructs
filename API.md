# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CodeSource <a name="CodeSource" id="@kikoda/cdk-constructs.CodeSource"></a>

Configuration properties for the code source repository.

Currently supports CodeCommit and GitHub Sources.
GitHub source requrires a preexisting CodeStarConnection.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.CodeSource.Initializer"></a>

```typescript
import { CodeSource } from '@kikoda/cdk-constructs'

new CodeSource(scope: Construct, branchName: string, config: CodeCommitSourceConfig | GitHubSourceConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.Initializer.parameter.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.Initializer.parameter.config">config</a></code> | <code><a href="#@kikoda/cdk-constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> \| <a href="#@kikoda/cdk-constructs.GitHubSourceConfig">GitHubSourceConfig</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.CodeSource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="@kikoda/cdk-constructs.CodeSource.Initializer.parameter.branchName"></a>

- *Type:* string

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/cdk-constructs.CodeSource.Initializer.parameter.config"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> | <a href="#@kikoda/cdk-constructs.GitHubSourceConfig">GitHubSourceConfig</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.CodeSource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.CodeSource.isConstruct"></a>

```typescript
import { CodeSource } from '@kikoda/cdk-constructs'

CodeSource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.CodeSource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.CodeSource.property.source">source</a></code> | <code>aws-cdk-lib.pipelines.CodePipelineSource</code> | The Source of the pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.CodeSource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `source`<sup>Required</sup> <a name="source" id="@kikoda/cdk-constructs.CodeSource.property.source"></a>

```typescript
public readonly source: CodePipelineSource;
```

- *Type:* aws-cdk-lib.pipelines.CodePipelineSource

The Source of the pipeline.

---


### ConfiguredStage <a name="ConfiguredStage" id="@kikoda/cdk-constructs.ConfiguredStage"></a>

A Stage that has a specific configuration.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

new ConfiguredStage(scope: Construct, id: string, props: ConfiguredStageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - The scope of the construct. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.id">id</a></code> | <code>string</code> | - The construct's id. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps">ConfiguredStageProps</a></code> | - The configuration based upon a generic type. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.id"></a>

- *Type:* string

The construct's id.

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.ConfiguredStage.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.ConfiguredStageProps">ConfiguredStageProps</a>

The configuration based upon a generic type.

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
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.property.config">config</a></code> | <code>any</code> | The configuration for the stage. |

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
public readonly config: any;
```

- *Type:* any

The configuration for the stage.

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
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - The scope of the construct. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.id">id</a></code> | <code>string</code> | - The construct's id. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps">StageAlarmTopicProps</a></code> | - The configuration for the construct. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.id"></a>

- *Type:* string

The construct's id.

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.StageAlarmTopic.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.StageAlarmTopicProps">StageAlarmTopicProps</a>

The configuration for the construct.

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
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | The SNS Topic. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopic.property.cfnOutput">cfnOutput</a></code> | <code>aws-cdk-lib.CfnOutput</code> | The CFN Export, will be populated if createCfnExport is true. |

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

The SNS Topic.

---

##### `cfnOutput`<sup>Optional</sup> <a name="cfnOutput" id="@kikoda/cdk-constructs.StageAlarmTopic.property.cfnOutput"></a>

```typescript
public readonly cfnOutput: CfnOutput;
```

- *Type:* aws-cdk-lib.CfnOutput

The CFN Export, will be populated if createCfnExport is true.

---


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

### CodeCommitSourceConfig <a name="CodeCommitSourceConfig" id="@kikoda/cdk-constructs.CodeCommitSourceConfig"></a>

Configuration for specifying a codecommit repository as the source.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.CodeCommitSourceConfig.Initializer"></a>

```typescript
import { CodeCommitSourceConfig } from '@kikoda/cdk-constructs'

const codeCommitSourceConfig: CodeCommitSourceConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CodeCommitSourceConfig.property.codeCommitArn">codeCommitArn</a></code> | <code>string</code> | ARN of the CodeCommit repository to use. |

---

##### `codeCommitArn`<sup>Required</sup> <a name="codeCommitArn" id="@kikoda/cdk-constructs.CodeCommitSourceConfig.property.codeCommitArn"></a>

```typescript
public readonly codeCommitArn: string;
```

- *Type:* string

ARN of the CodeCommit repository to use.

---

### ComponentConfig <a name="ComponentConfig" id="@kikoda/cdk-constructs.ComponentConfig"></a>

Configuration for the component to be deployed.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.ComponentConfig.Initializer"></a>

```typescript
import { ComponentConfig } from '@kikoda/cdk-constructs'

const componentConfig: ComponentConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentConfig.property.componentName">componentName</a></code> | <code>string</code> | The name of this component. |
| <code><a href="#@kikoda/cdk-constructs.ComponentConfig.property.componentType">componentType</a></code> | <code>aws-cdk-lib.Stage</code> | A class that extends Stage. |

---

##### `componentName`<sup>Required</sup> <a name="componentName" id="@kikoda/cdk-constructs.ComponentConfig.property.componentName"></a>

```typescript
public readonly componentName: string;
```

- *Type:* string

The name of this component.

---

##### `componentType`<sup>Required</sup> <a name="componentType" id="@kikoda/cdk-constructs.ComponentConfig.property.componentType"></a>

```typescript
public readonly componentType: Stage;
```

- *Type:* aws-cdk-lib.Stage

A class that extends Stage.

This class will be used to create the individual component stages for each specified stage configuration.

---

### ConfiguredStageProps <a name="ConfiguredStageProps" id="@kikoda/cdk-constructs.ConfiguredStageProps"></a>

Configured Stage Properties.

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
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStageProps.property.config">config</a></code> | <code>any</code> | *No description.* |

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
public readonly config: any;
```

- *Type:* any

---

### DeploymentPipelinesProps <a name="DeploymentPipelinesProps" id="@kikoda/cdk-constructs.DeploymentPipelinesProps"></a>

Configuration for the DeploymentPipelines construct.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.Initializer"></a>

```typescript
import { DeploymentPipelinesProps } from '@kikoda/cdk-constructs'

const deploymentPipelinesProps: DeploymentPipelinesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.component">component</a></code> | <code><a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.deploymentBranches">deploymentBranches</a></code> | <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>[]</code> | An interface representing the configutation for each branch and its related stage. |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.pipelineConfig">pipelineConfig</a></code> | <code><a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps.property.repository">repository</a></code> | <code><a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a></code> | Configuration for the source code repository. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `stackName`<sup>Optional</sup> <a name="stackName" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.component"></a>

```typescript
public readonly component: ComponentConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a>

---

##### `deploymentBranches`<sup>Required</sup> <a name="deploymentBranches" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.deploymentBranches"></a>

```typescript
public readonly deploymentBranches: IDeploymentBranch[];
```

- *Type:* <a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>[]

An interface representing the configutation for each branch and its related stage.

---

##### `pipelineConfig`<sup>Required</sup> <a name="pipelineConfig" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.pipelineConfig"></a>

```typescript
public readonly pipelineConfig: PipelineConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a>

---

##### `repository`<sup>Required</sup> <a name="repository" id="@kikoda/cdk-constructs.DeploymentPipelinesProps.property.repository"></a>

```typescript
public readonly repository: RepositoryConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a>

Configuration for the source code repository.

Currently supports GitHub and CodeArtifacts.

---

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

### GitHubSourceConfig <a name="GitHubSourceConfig" id="@kikoda/cdk-constructs.GitHubSourceConfig"></a>

Configuration for specifying a GitHub repository as the source.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.GitHubSourceConfig.Initializer"></a>

```typescript
import { GitHubSourceConfig } from '@kikoda/cdk-constructs'

const gitHubSourceConfig: GitHubSourceConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.GitHubSourceConfig.property.options">options</a></code> | <code>aws-cdk-lib.pipelines.ConnectionSourceOptions</code> | CodeStar connection options. |
| <code><a href="#@kikoda/cdk-constructs.GitHubSourceConfig.property.owner">owner</a></code> | <code>string</code> | The owner of the GitHub repository. |

---

##### `options`<sup>Required</sup> <a name="options" id="@kikoda/cdk-constructs.GitHubSourceConfig.property.options"></a>

```typescript
public readonly options: ConnectionSourceOptions;
```

- *Type:* aws-cdk-lib.pipelines.ConnectionSourceOptions

CodeStar connection options.

GitHub sources require use of a CodeStar connection.

---

##### `owner`<sup>Required</sup> <a name="owner" id="@kikoda/cdk-constructs.GitHubSourceConfig.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

The owner of the GitHub repository.

---

### PipelineConfig <a name="PipelineConfig" id="@kikoda/cdk-constructs.PipelineConfig"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.PipelineConfig.Initializer"></a>

```typescript
import { PipelineConfig } from '@kikoda/cdk-constructs'

const pipelineConfig: PipelineConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.builderAssumeRole">builderAssumeRole</a></code> | <code>string</code> | An optional role that can be assumed to perform the build. |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.codeArtifactRepositoryArn">codeArtifactRepositoryArn</a></code> | <code>string</code> | Specifying a codeartifacts ARN here will enable asset phase of the pipeline to access that codeartifacts repository. |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.notificationTopicArn">notificationTopicArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.pruneCloudAssembly">pruneCloudAssembly</a></code> | <code>boolean</code> | Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step. |

---

##### `builderAssumeRole`<sup>Optional</sup> <a name="builderAssumeRole" id="@kikoda/cdk-constructs.PipelineConfig.property.builderAssumeRole"></a>

```typescript
public readonly builderAssumeRole: string;
```

- *Type:* string

An optional role that can be assumed to perform the build.

---

##### `codeArtifactRepositoryArn`<sup>Optional</sup> <a name="codeArtifactRepositoryArn" id="@kikoda/cdk-constructs.PipelineConfig.property.codeArtifactRepositoryArn"></a>

```typescript
public readonly codeArtifactRepositoryArn: string;
```

- *Type:* string

Specifying a codeartifacts ARN here will enable asset phase of the pipeline to access that codeartifacts repository.

This includes adding approprate roles and leveraging an assumed role for the docker build so that the docker build can pull from codeartifacts.

---

##### `notificationTopicArn`<sup>Optional</sup> <a name="notificationTopicArn" id="@kikoda/cdk-constructs.PipelineConfig.property.notificationTopicArn"></a>

```typescript
public readonly notificationTopicArn: string;
```

- *Type:* string

---

##### `pruneCloudAssembly`<sup>Optional</sup> <a name="pruneCloudAssembly" id="@kikoda/cdk-constructs.PipelineConfig.property.pruneCloudAssembly"></a>

```typescript
public readonly pruneCloudAssembly: boolean;
```

- *Type:* boolean

Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step.

This is usefull when you have a lot of resources and are hitting the CFN limit for input
artifact size.

---

### RepositoryConfig <a name="RepositoryConfig" id="@kikoda/cdk-constructs.RepositoryConfig"></a>

The configuration for the source of the pipeline.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.RepositoryConfig.Initializer"></a>

```typescript
import { RepositoryConfig } from '@kikoda/cdk-constructs'

const repositoryConfig: RepositoryConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.RepositoryConfig.property.source">source</a></code> | <code><a href="#@kikoda/cdk-constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> \| <a href="#@kikoda/cdk-constructs.GitHubSourceConfig">GitHubSourceConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.RepositoryConfig.property.baseDir">baseDir</a></code> | <code>string</code> | Base directory for the repository. |
| <code><a href="#@kikoda/cdk-constructs.RepositoryConfig.property.synthOuputDir">synthOuputDir</a></code> | <code>string</code> | Output directory for the cloudformation synthisis. |

---

##### `source`<sup>Required</sup> <a name="source" id="@kikoda/cdk-constructs.RepositoryConfig.property.source"></a>

```typescript
public readonly source: CodeCommitSourceConfig | GitHubSourceConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> | <a href="#@kikoda/cdk-constructs.GitHubSourceConfig">GitHubSourceConfig</a>

---

##### `baseDir`<sup>Optional</sup> <a name="baseDir" id="@kikoda/cdk-constructs.RepositoryConfig.property.baseDir"></a>

```typescript
public readonly baseDir: string;
```

- *Type:* string
- *Default:* '.'

Base directory for the repository.

---

##### `synthOuputDir`<sup>Optional</sup> <a name="synthOuputDir" id="@kikoda/cdk-constructs.RepositoryConfig.property.synthOuputDir"></a>

```typescript
public readonly synthOuputDir: string;
```

- *Type:* string
- *Default:* './out'

Output directory for the cloudformation synthisis.

---

### StageAlarmTopicProps <a name="StageAlarmTopicProps" id="@kikoda/cdk-constructs.StageAlarmTopicProps"></a>

Configuration for StageAlarmTopic.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.StageAlarmTopicProps.Initializer"></a>

```typescript
import { StageAlarmTopicProps } from '@kikoda/cdk-constructs'

const stageAlarmTopicProps: StageAlarmTopicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.level">level</a></code> | <code><a href="#@kikoda/cdk-constructs.AlarmLevels">AlarmLevels</a></code> | The alert level. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.createCfnExport">createCfnExport</a></code> | <code>boolean</code> | If true a CFN export will be created. |
| <code><a href="#@kikoda/cdk-constructs.StageAlarmTopicProps.property.prefix">prefix</a></code> | <code>string</code> | The identifier prefix. |

---

##### `level`<sup>Required</sup> <a name="level" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.level"></a>

```typescript
public readonly level: AlarmLevels;
```

- *Type:* <a href="#@kikoda/cdk-constructs.AlarmLevels">AlarmLevels</a>

The alert level.

This is used in the Topic displayName and topicName, and the cfn export name.

---

##### `createCfnExport`<sup>Optional</sup> <a name="createCfnExport" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.createCfnExport"></a>

```typescript
public readonly createCfnExport: boolean;
```

- *Type:* boolean

If true a CFN export will be created.

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="@kikoda/cdk-constructs.StageAlarmTopicProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

The identifier prefix.

This could be a stage name or similar identifier.

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
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | Default AWS environment (account/region) for `Stack`s in this `Stage`. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to emit synthesized artifacts. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.config">config</a></code> | <code>any</code> | The generic config. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.stageName">stageName</a></code> | <code>string</code> | The name of the stage. |
| <code><a href="#@kikoda/cdk-constructs.StageConfig.property.manualApproval">manualApproval</a></code> | <code>boolean</code> | Add a manual approval step when deploying this stage. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/cdk-constructs.StageConfig.property.env"></a>

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


##### `outdir`<sup>Optional</sup> <a name="outdir" id="@kikoda/cdk-constructs.StageConfig.property.outdir"></a>

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

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/cdk-constructs.StageConfig.property.config"></a>

```typescript
public readonly config: any;
```

- *Type:* any

The generic config.

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/cdk-constructs.StageConfig.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

The name of the stage.

---

##### `manualApproval`<sup>Optional</sup> <a name="manualApproval" id="@kikoda/cdk-constructs.StageConfig.property.manualApproval"></a>

```typescript
public readonly manualApproval: boolean;
```

- *Type:* boolean

Add a manual approval step when deploying this stage.

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

## Classes <a name="Classes" id="Classes"></a>

### DeploymentPipelines <a name="DeploymentPipelines" id="@kikoda/cdk-constructs.DeploymentPipelines"></a>

Deployment pipelines creates an individual deployment pipeline stack for each branch.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.DeploymentPipelines.Initializer"></a>

```typescript
import { DeploymentPipelines } from '@kikoda/cdk-constructs'

new DeploymentPipelines(app: App, props: DeploymentPipelinesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelines.Initializer.parameter.app">app</a></code> | <code>aws-cdk-lib.App</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.DeploymentPipelines.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps">DeploymentPipelinesProps</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="@kikoda/cdk-constructs.DeploymentPipelines.Initializer.parameter.app"></a>

- *Type:* aws-cdk-lib.App

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.DeploymentPipelines.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.DeploymentPipelinesProps">DeploymentPipelinesProps</a>

---





### LayeredConfig <a name="LayeredConfig" id="@kikoda/cdk-constructs.LayeredConfig"></a>

This construct current only wraps the lodash.merge() functionality but is intended to be a placeholder for future logic like: global defaults, type enforcement and error handling, dynamic values (custom compute logic), etc.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.LayeredConfig.Initializer"></a>

```typescript
import { LayeredConfig } from '@kikoda/cdk-constructs'

new LayeredConfig(base: any, layers: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.LayeredConfig.Initializer.parameter.base">base</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.LayeredConfig.Initializer.parameter.layers">layers</a></code> | <code>any</code> | *No description.* |

---

##### `base`<sup>Required</sup> <a name="base" id="@kikoda/cdk-constructs.LayeredConfig.Initializer.parameter.base"></a>

- *Type:* any

---

##### `layers`<sup>Required</sup> <a name="layers" id="@kikoda/cdk-constructs.LayeredConfig.Initializer.parameter.layers"></a>

- *Type:* any

---





## Protocols <a name="Protocols" id="Protocols"></a>

### IDeploymentBranch <a name="IDeploymentBranch" id="@kikoda/cdk-constructs.IDeploymentBranch"></a>

- *Implemented By:* <a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>

Configuration for the specific deployment.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch.property.branchName">branchName</a></code> | <code>string</code> | The name of the code branch that this deployment branch represents. |
| <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch.property.stages">stages</a></code> | <code><a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a>[]</code> | Configuration for the stages represented by this deployment branch. |
| <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch.property.staticPipelineIdentifier">staticPipelineIdentifier</a></code> | <code>string</code> | The name to be used by the pipeline stack, it is possible to configure this sperately from the branch name so that updating the branch name does not require destroy/recreate. |

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="@kikoda/cdk-constructs.IDeploymentBranch.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

The name of the code branch that this deployment branch represents.

---

##### `stages`<sup>Required</sup> <a name="stages" id="@kikoda/cdk-constructs.IDeploymentBranch.property.stages"></a>

```typescript
public readonly stages: StageConfig[];
```

- *Type:* <a href="#@kikoda/cdk-constructs.StageConfig">StageConfig</a>[]

Configuration for the stages represented by this deployment branch.

---

##### `staticPipelineIdentifier`<sup>Optional</sup> <a name="staticPipelineIdentifier" id="@kikoda/cdk-constructs.IDeploymentBranch.property.staticPipelineIdentifier"></a>

```typescript
public readonly staticPipelineIdentifier: string;
```

- *Type:* string

The name to be used by the pipeline stack, it is possible to configure this sperately from the branch name so that updating the branch name does not require destroy/recreate.

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

