# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CodeSource <a name="CodeSource" id="@kikoda/constructs.CodeSource"></a>

#### Initializers <a name="Initializers" id="@kikoda/constructs.CodeSource.Initializer"></a>

```typescript
import { CodeSource } from '@kikoda/constructs'

new CodeSource(scope: Construct, branchName: string, config: GitHubSourceConfig | CodeCommitSourceConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.config">config</a></code> | <code><a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a> \| <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.CodeSource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="@kikoda/constructs.CodeSource.Initializer.parameter.branchName"></a>

- *Type:* string

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.CodeSource.Initializer.parameter.config"></a>

- *Type:* <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a> | <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.CodeSource.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@kikoda/constructs.CodeSource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.CodeSource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/constructs.CodeSource.isConstruct"></a>

```typescript
import { CodeSource } from '@kikoda/constructs'

CodeSource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.CodeSource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.CodeSource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/constructs.CodeSource.property.source">source</a></code> | <code>aws-cdk-lib.pipelines.CodePipelineSource</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/constructs.CodeSource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `source`<sup>Required</sup> <a name="source" id="@kikoda/constructs.CodeSource.property.source"></a>

```typescript
public readonly source: CodePipelineSource;
```

- *Type:* aws-cdk-lib.pipelines.CodePipelineSource

---


### ConfiguredStage <a name="ConfiguredStage" id="@kikoda/constructs.ConfiguredStage"></a>

A Stage that is configured with a specific configuration.

#### Initializers <a name="Initializers" id="@kikoda/constructs.ConfiguredStage.Initializer"></a>

```typescript
import { ConfiguredStage } from '@kikoda/constructs'

new ConfiguredStage(scope: Construct, id: string, props: ConfiguredStageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - The scope of the construct. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.id">id</a></code> | <code>string</code> | - The construct's id. |
| <code><a href="#@kikoda/constructs.ConfiguredStage.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.ConfiguredStageProps">ConfiguredStageProps</a></code> | - The configuration based upon a generic type. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.id"></a>

- *Type:* string

The construct's id.

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.ConfiguredStage.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.ConfiguredStageProps">ConfiguredStageProps</a>

The configuration based upon a generic type.

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
| <code><a href="#@kikoda/constructs.ConfiguredStage.property.config">config</a></code> | <code>any</code> | The configuration for the stage. |

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
public readonly config: any;
```

- *Type:* any

The configuration for the stage.

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

### CodeCommitSourceConfig <a name="CodeCommitSourceConfig" id="@kikoda/constructs.CodeCommitSourceConfig"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.CodeCommitSourceConfig.Initializer"></a>

```typescript
import { CodeCommitSourceConfig } from '@kikoda/constructs'

const codeCommitSourceConfig: CodeCommitSourceConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.CodeCommitSourceConfig.property.codeCommitArn">codeCommitArn</a></code> | <code>string</code> | *No description.* |

---

##### `codeCommitArn`<sup>Required</sup> <a name="codeCommitArn" id="@kikoda/constructs.CodeCommitSourceConfig.property.codeCommitArn"></a>

```typescript
public readonly codeCommitArn: string;
```

- *Type:* string

---

### ConfiguredStageProps <a name="ConfiguredStageProps" id="@kikoda/constructs.ConfiguredStageProps"></a>

Configured Stage Properties.

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
| <code><a href="#@kikoda/constructs.ConfiguredStageProps.property.config">config</a></code> | <code>any</code> | *No description.* |

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
public readonly config: any;
```

- *Type:* any

---

### DeploymentPipelinesProps <a name="DeploymentPipelinesProps" id="@kikoda/constructs.DeploymentPipelinesProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.DeploymentPipelinesProps.Initializer"></a>

```typescript
import { DeploymentPipelinesProps } from '@kikoda/constructs'

const deploymentPipelinesProps: DeploymentPipelinesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.component">component</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.deploymentBranches">deploymentBranches</a></code> | <code><a href="#@kikoda/constructs.IDeploymentBranch">IDeploymentBranch</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.repository">repository</a></code> | <code><a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a> \| <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.stageType">stageType</a></code> | <code>aws-cdk-lib.Stage</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.additionalBuildRolePolicies">additionalBuildRolePolicies</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatementProps[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.baseDir">baseDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.builderAssumeRole">builderAssumeRole</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.codeArtifactRepositoryArn">codeArtifactRepositoryArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.notificationTopicArn">notificationTopicArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.pruneCloudAssembly">pruneCloudAssembly</a></code> | <code>boolean</code> | Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step. |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.synthOuputDir">synthOuputDir</a></code> | <code>string</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@kikoda/constructs.DeploymentPipelinesProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/constructs.DeploymentPipelinesProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/constructs.DeploymentPipelinesProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="@kikoda/constructs.DeploymentPipelinesProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@kikoda/constructs.DeploymentPipelinesProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@kikoda/constructs.DeploymentPipelinesProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/constructs.DeploymentPipelinesProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/constructs.DeploymentPipelinesProps.property.component"></a>

```typescript
public readonly component: string;
```

- *Type:* string

---

##### `deploymentBranches`<sup>Required</sup> <a name="deploymentBranches" id="@kikoda/constructs.DeploymentPipelinesProps.property.deploymentBranches"></a>

```typescript
public readonly deploymentBranches: IDeploymentBranch[];
```

- *Type:* <a href="#@kikoda/constructs.IDeploymentBranch">IDeploymentBranch</a>[]

---

##### `repository`<sup>Required</sup> <a name="repository" id="@kikoda/constructs.DeploymentPipelinesProps.property.repository"></a>

```typescript
public readonly repository: GitHubSourceConfig | CodeCommitSourceConfig;
```

- *Type:* <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a> | <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a>

---

##### `stageType`<sup>Required</sup> <a name="stageType" id="@kikoda/constructs.DeploymentPipelinesProps.property.stageType"></a>

```typescript
public readonly stageType: Stage;
```

- *Type:* aws-cdk-lib.Stage

---

##### `additionalBuildRolePolicies`<sup>Optional</sup> <a name="additionalBuildRolePolicies" id="@kikoda/constructs.DeploymentPipelinesProps.property.additionalBuildRolePolicies"></a>

```typescript
public readonly additionalBuildRolePolicies: PolicyStatementProps[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatementProps[]

---

##### `baseDir`<sup>Optional</sup> <a name="baseDir" id="@kikoda/constructs.DeploymentPipelinesProps.property.baseDir"></a>

```typescript
public readonly baseDir: string;
```

- *Type:* string

---

##### `builderAssumeRole`<sup>Optional</sup> <a name="builderAssumeRole" id="@kikoda/constructs.DeploymentPipelinesProps.property.builderAssumeRole"></a>

```typescript
public readonly builderAssumeRole: string;
```

- *Type:* string

---

##### `codeArtifactRepositoryArn`<sup>Optional</sup> <a name="codeArtifactRepositoryArn" id="@kikoda/constructs.DeploymentPipelinesProps.property.codeArtifactRepositoryArn"></a>

```typescript
public readonly codeArtifactRepositoryArn: string;
```

- *Type:* string

---

##### `notificationTopicArn`<sup>Optional</sup> <a name="notificationTopicArn" id="@kikoda/constructs.DeploymentPipelinesProps.property.notificationTopicArn"></a>

```typescript
public readonly notificationTopicArn: string;
```

- *Type:* string

---

##### `pruneCloudAssembly`<sup>Optional</sup> <a name="pruneCloudAssembly" id="@kikoda/constructs.DeploymentPipelinesProps.property.pruneCloudAssembly"></a>

```typescript
public readonly pruneCloudAssembly: boolean;
```

- *Type:* boolean
- *Default:* true

Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step.

This is usefull when you have a lot of resources and are hitting the CFN limit for input
artifact size.

---

##### `synthOuputDir`<sup>Optional</sup> <a name="synthOuputDir" id="@kikoda/constructs.DeploymentPipelinesProps.property.synthOuputDir"></a>

```typescript
public readonly synthOuputDir: string;
```

- *Type:* string

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

### GitHubSourceConfig <a name="GitHubSourceConfig" id="@kikoda/constructs.GitHubSourceConfig"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.GitHubSourceConfig.Initializer"></a>

```typescript
import { GitHubSourceConfig } from '@kikoda/constructs'

const gitHubSourceConfig: GitHubSourceConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.GitHubSourceConfig.property.options">options</a></code> | <code>aws-cdk-lib.pipelines.ConnectionSourceOptions</code> | *No description.* |
| <code><a href="#@kikoda/constructs.GitHubSourceConfig.property.owner">owner</a></code> | <code>string</code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@kikoda/constructs.GitHubSourceConfig.property.options"></a>

```typescript
public readonly options: ConnectionSourceOptions;
```

- *Type:* aws-cdk-lib.pipelines.ConnectionSourceOptions

---

##### `owner`<sup>Required</sup> <a name="owner" id="@kikoda/constructs.GitHubSourceConfig.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

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

#### Initializer <a name="Initializer" id="@kikoda/constructs.StageConfig.Initializer"></a>

```typescript
import { StageConfig } from '@kikoda/constructs'

const stageConfig: StageConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.StageConfig.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | Default AWS environment (account/region) for `Stack`s in this `Stage`. |
| <code><a href="#@kikoda/constructs.StageConfig.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to emit synthesized artifacts. |
| <code><a href="#@kikoda/constructs.StageConfig.property.config">config</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageConfig.property.stageName">stageName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.StageConfig.property.manualApproval">manualApproval</a></code> | <code>boolean</code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/constructs.StageConfig.property.env"></a>

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


##### `outdir`<sup>Optional</sup> <a name="outdir" id="@kikoda/constructs.StageConfig.property.outdir"></a>

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

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.StageConfig.property.config"></a>

```typescript
public readonly config: any;
```

- *Type:* any

---

##### `stageName`<sup>Required</sup> <a name="stageName" id="@kikoda/constructs.StageConfig.property.stageName"></a>

```typescript
public readonly stageName: string;
```

- *Type:* string

---

##### `manualApproval`<sup>Optional</sup> <a name="manualApproval" id="@kikoda/constructs.StageConfig.property.manualApproval"></a>

```typescript
public readonly manualApproval: boolean;
```

- *Type:* boolean

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

### DeploymentPipelines <a name="DeploymentPipelines" id="@kikoda/constructs.DeploymentPipelines"></a>

#### Initializers <a name="Initializers" id="@kikoda/constructs.DeploymentPipelines.Initializer"></a>

```typescript
import { DeploymentPipelines } from '@kikoda/constructs'

new DeploymentPipelines(app: App, props: DeploymentPipelinesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.DeploymentPipelines.Initializer.parameter.app">app</a></code> | <code>aws-cdk-lib.App</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelines.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.DeploymentPipelinesProps">DeploymentPipelinesProps</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="@kikoda/constructs.DeploymentPipelines.Initializer.parameter.app"></a>

- *Type:* aws-cdk-lib.App

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.DeploymentPipelines.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.DeploymentPipelinesProps">DeploymentPipelinesProps</a>

---





## Protocols <a name="Protocols" id="Protocols"></a>

### IDeploymentBranch <a name="IDeploymentBranch" id="@kikoda/constructs.IDeploymentBranch"></a>

- *Implemented By:* <a href="#@kikoda/constructs.IDeploymentBranch">IDeploymentBranch</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.IDeploymentBranch.property.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IDeploymentBranch.property.stages">stages</a></code> | <code><a href="#@kikoda/constructs.StageConfig">StageConfig</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IDeploymentBranch.property.staticPipelineIdentifier">staticPipelineIdentifier</a></code> | <code>string</code> | *No description.* |

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="@kikoda/constructs.IDeploymentBranch.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

---

##### `stages`<sup>Required</sup> <a name="stages" id="@kikoda/constructs.IDeploymentBranch.property.stages"></a>

```typescript
public readonly stages: StageConfig[];
```

- *Type:* <a href="#@kikoda/constructs.StageConfig">StageConfig</a>[]

---

##### `staticPipelineIdentifier`<sup>Required</sup> <a name="staticPipelineIdentifier" id="@kikoda/constructs.IDeploymentBranch.property.staticPipelineIdentifier"></a>

```typescript
public readonly staticPipelineIdentifier: string;
```

- *Type:* string

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

