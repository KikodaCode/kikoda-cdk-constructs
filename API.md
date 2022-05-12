# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CodeSource <a name="CodeSource" id="@kikoda/constructs.CodeSource"></a>

#### Initializers <a name="Initializers" id="@kikoda/constructs.CodeSource.Initializer"></a>

```typescript
import { CodeSource } from '@kikoda/constructs'

new CodeSource(scope: Construct, branchName: string, config: CodeCommitSourceConfig | GitHubSourceConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.branchName">branchName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.CodeSource.Initializer.parameter.config">config</a></code> | <code><a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> \| <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.CodeSource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="@kikoda/constructs.CodeSource.Initializer.parameter.branchName"></a>

- *Type:* string

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.CodeSource.Initializer.parameter.config"></a>

- *Type:* <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> | <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a>

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


### IndividualPipelineStack <a name="IndividualPipelineStack" id="@kikoda/constructs.IndividualPipelineStack"></a>

An individual pipeline.

#### Initializers <a name="Initializers" id="@kikoda/constructs.IndividualPipelineStack.Initializer"></a>

```typescript
import { IndividualPipelineStack } from '@kikoda/constructs'

new IndividualPipelineStack(scope: Construct, id: string, props: IndividualPipelineStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/constructs.IndividualPipelineStackProps">IndividualPipelineStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/constructs.IndividualPipelineStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/constructs.IndividualPipelineStackProps">IndividualPipelineStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a value. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |

---

##### `toString` <a name="toString" id="@kikoda/constructs.IndividualPipelineStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@kikoda/constructs.IndividualPipelineStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@kikoda/constructs.IndividualPipelineStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@kikoda/constructs.IndividualPipelineStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addTransform` <a name="addTransform" id="@kikoda/constructs.IndividualPipelineStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="@kikoda/constructs.IndividualPipelineStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportValue` <a name="exportValue" id="@kikoda/constructs.IndividualPipelineStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
   stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
   remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
   will make sure the CloudFormation Export continues to exist while the relationship
   between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@kikoda/constructs.IndividualPipelineStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/constructs.IndividualPipelineStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@kikoda/constructs.IndividualPipelineStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

   arn:{partition}:{service}:{region}:{account}:{resource}{sep}}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="@kikoda/constructs.IndividualPipelineStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@kikoda/constructs.IndividualPipelineStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="@kikoda/constructs.IndividualPipelineStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@kikoda/constructs.IndividualPipelineStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="@kikoda/constructs.IndividualPipelineStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@kikoda/constructs.IndividualPipelineStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@kikoda/constructs.IndividualPipelineStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@kikoda/constructs.IndividualPipelineStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@kikoda/constructs.IndividualPipelineStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@kikoda/constructs.IndividualPipelineStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@kikoda/constructs.IndividualPipelineStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@kikoda/constructs.IndividualPipelineStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@kikoda/constructs.IndividualPipelineStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@kikoda/constructs.IndividualPipelineStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@kikoda/constructs.IndividualPipelineStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@kikoda/constructs.IndividualPipelineStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@kikoda/constructs.IndividualPipelineStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@kikoda/constructs.IndividualPipelineStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@kikoda/constructs.IndividualPipelineStack.toJsonString.parameter.space"></a>

- *Type:* number

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/constructs.IndividualPipelineStack.isConstruct"></a>

```typescript
import { IndividualPipelineStack } from '@kikoda/constructs'

IndividualPipelineStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.IndividualPipelineStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@kikoda/constructs.IndividualPipelineStack.isStack"></a>

```typescript
import { IndividualPipelineStack } from '@kikoda/constructs'

IndividualPipelineStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/constructs.IndividualPipelineStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@kikoda/constructs.IndividualPipelineStack.of"></a>

```typescript
import { IndividualPipelineStack } from '@kikoda/constructs'

IndividualPipelineStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/constructs.IndividualPipelineStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/constructs.IndividualPipelineStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@kikoda/constructs.IndividualPipelineStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
    either be a concerete account (e.g. `585695031111`) or the
    `Aws.accountId` token.
3. `Aws.accountId`, which represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@kikoda/constructs.IndividualPipelineStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@kikoda/constructs.IndividualPipelineStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@kikoda/constructs.IndividualPipelineStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@kikoda/constructs.IndividualPipelineStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@kikoda/constructs.IndividualPipelineStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.account` or `Aws.region`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="@kikoda/constructs.IndividualPipelineStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@kikoda/constructs.IndividualPipelineStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@kikoda/constructs.IndividualPipelineStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@kikoda/constructs.IndividualPipelineStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.region`
    token.
3. `Aws.region`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@kikoda/constructs.IndividualPipelineStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="@kikoda/constructs.IndividualPipelineStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.stackName` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@kikoda/constructs.IndividualPipelineStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@kikoda/constructs.IndividualPipelineStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@kikoda/constructs.IndividualPipelineStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@kikoda/constructs.IndividualPipelineStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@kikoda/constructs.IndividualPipelineStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@kikoda/constructs.IndividualPipelineStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@kikoda/constructs.IndividualPipelineStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/constructs.IndividualPipelineStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

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

### Component <a name="Component" id="@kikoda/constructs.Component"></a>

The component to be deployed with {@link DeploymentPipelines}.

#### Initializer <a name="Initializer" id="@kikoda/constructs.Component.Initializer"></a>

```typescript
import { Component } from '@kikoda/constructs'

const component: Component = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.Component.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.Component.property.stage">stage</a></code> | <code><a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a></code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@kikoda/constructs.Component.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `stage`<sup>Required</sup> <a name="stage" id="@kikoda/constructs.Component.property.stage"></a>

```typescript
public readonly stage: ConfiguredStage;
```

- *Type:* <a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a>

---

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

### DeploymentBranch <a name="DeploymentBranch" id="@kikoda/constructs.DeploymentBranch"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.DeploymentBranch.Initializer"></a>

```typescript
import { DeploymentBranch } from '@kikoda/constructs'

const deploymentBranch: DeploymentBranch = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.DeploymentBranch.property.name">name</a></code> | <code>string</code> | The source branch name to deploy from. |
| <code><a href="#@kikoda/constructs.DeploymentBranch.property.stages">stages</a></code> | <code><a href="#@kikoda/constructs.EnvironmentStage">EnvironmentStage</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentBranch.property.staticPipelineIdentifier">staticPipelineIdentifier</a></code> | <code>string</code> | This is a unique string used to differentiate pipleine constructs in CDK. |

---

##### `name`<sup>Required</sup> <a name="name" id="@kikoda/constructs.DeploymentBranch.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The source branch name to deploy from.

---

##### `stages`<sup>Required</sup> <a name="stages" id="@kikoda/constructs.DeploymentBranch.property.stages"></a>

```typescript
public readonly stages: EnvironmentStage[];
```

- *Type:* <a href="#@kikoda/constructs.EnvironmentStage">EnvironmentStage</a>[]

---

##### `staticPipelineIdentifier`<sup>Required</sup> <a name="staticPipelineIdentifier" id="@kikoda/constructs.DeploymentBranch.property.staticPipelineIdentifier"></a>

```typescript
public readonly staticPipelineIdentifier: string;
```

- *Type:* string

This is a unique string used to differentiate pipleine constructs in CDK.

This is important as it's used to scope all environments
and the resources therein and their associate PhysicalIds in Cloudformation.
**!!! Changing this can result in unwanted updates/replacement to stack resources !!!**

Typically you want to set this to the type (See Git Flow) of branch being deployed

---

### DeploymentPipelinesProps <a name="DeploymentPipelinesProps" id="@kikoda/constructs.DeploymentPipelinesProps"></a>

DeploymentPipelinesProps.

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
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.baseDir">baseDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.branch">branch</a></code> | <code><a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.codeSource">codeSource</a></code> | <code><a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> \| <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.component">component</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.deploymentBranches">deploymentBranches</a></code> | <code><a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.stageType">stageType</a></code> | <code><a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.synthOuputDir">synthOuputDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.notificationTopicArn">notificationTopicArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.DeploymentPipelinesProps.property.pruneCloudAssembly">pruneCloudAssembly</a></code> | <code>boolean</code> | Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step. |

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

##### `baseDir`<sup>Required</sup> <a name="baseDir" id="@kikoda/constructs.DeploymentPipelinesProps.property.baseDir"></a>

```typescript
public readonly baseDir: string;
```

- *Type:* string

---

##### `branch`<sup>Required</sup> <a name="branch" id="@kikoda/constructs.DeploymentPipelinesProps.property.branch"></a>

```typescript
public readonly branch: DeploymentBranch;
```

- *Type:* <a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>

---

##### `codeSource`<sup>Required</sup> <a name="codeSource" id="@kikoda/constructs.DeploymentPipelinesProps.property.codeSource"></a>

```typescript
public readonly codeSource: CodeCommitSourceConfig | GitHubSourceConfig;
```

- *Type:* <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> | <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a>

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/constructs.DeploymentPipelinesProps.property.component"></a>

```typescript
public readonly component: string;
```

- *Type:* string

---

##### `deploymentBranches`<sup>Required</sup> <a name="deploymentBranches" id="@kikoda/constructs.DeploymentPipelinesProps.property.deploymentBranches"></a>

```typescript
public readonly deploymentBranches: DeploymentBranch[];
```

- *Type:* <a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>[]

---

##### `stageType`<sup>Required</sup> <a name="stageType" id="@kikoda/constructs.DeploymentPipelinesProps.property.stageType"></a>

```typescript
public readonly stageType: ConfiguredStage;
```

- *Type:* <a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a>

---

##### `synthOuputDir`<sup>Required</sup> <a name="synthOuputDir" id="@kikoda/constructs.DeploymentPipelinesProps.property.synthOuputDir"></a>

```typescript
public readonly synthOuputDir: string;
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

### EnvironmentStage <a name="EnvironmentStage" id="@kikoda/constructs.EnvironmentStage"></a>

#### Initializer <a name="Initializer" id="@kikoda/constructs.EnvironmentStage.Initializer"></a>

```typescript
import { EnvironmentStage } from '@kikoda/constructs'

const environmentStage: EnvironmentStage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.EnvironmentStage.property.config">config</a></code> | <code><a href="#@kikoda/constructs.StageConfig">StageConfig</a></code> | Configuration for the environment. |
| <code><a href="#@kikoda/constructs.EnvironmentStage.property.name">name</a></code> | <code>string</code> | The name of the deployment stage eg. |
| <code><a href="#@kikoda/constructs.EnvironmentStage.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | Optionally provide the deployment environment for this stage. |
| <code><a href="#@kikoda/constructs.EnvironmentStage.property.manualApproval">manualApproval</a></code> | <code>boolean</code> | Manually approve this stage's deployment before continuing the pipeline? |

---

##### `config`<sup>Required</sup> <a name="config" id="@kikoda/constructs.EnvironmentStage.property.config"></a>

```typescript
public readonly config: StageConfig;
```

- *Type:* <a href="#@kikoda/constructs.StageConfig">StageConfig</a>

Configuration for the environment.

---

##### `name`<sup>Required</sup> <a name="name" id="@kikoda/constructs.EnvironmentStage.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the deployment stage eg.

'dev', 'test, 'prod'

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/constructs.EnvironmentStage.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment

Optionally provide the deployment environment for this stage.

---

##### `manualApproval`<sup>Optional</sup> <a name="manualApproval" id="@kikoda/constructs.EnvironmentStage.property.manualApproval"></a>

```typescript
public readonly manualApproval: boolean;
```

- *Type:* boolean

Manually approve this stage's deployment before continuing the pipeline?

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

### IndividualPipelineStackProps <a name="IndividualPipelineStackProps" id="@kikoda/constructs.IndividualPipelineStackProps"></a>

Individual Pipelines.

#### Initializer <a name="Initializer" id="@kikoda/constructs.IndividualPipelineStackProps.Initializer"></a>

```typescript
import { IndividualPipelineStackProps } from '@kikoda/constructs'

const individualPipelineStackProps: IndividualPipelineStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.baseDir">baseDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.branch">branch</a></code> | <code><a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.codeSource">codeSource</a></code> | <code><a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> \| <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.component">component</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.deploymentBranches">deploymentBranches</a></code> | <code><a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.stageType">stageType</a></code> | <code><a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a></code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.synthOuputDir">synthOuputDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.notificationTopicArn">notificationTopicArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.IndividualPipelineStackProps.property.pruneCloudAssembly">pruneCloudAssembly</a></code> | <code>boolean</code> | Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@kikoda/constructs.IndividualPipelineStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/constructs.IndividualPipelineStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/constructs.IndividualPipelineStackProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="@kikoda/constructs.IndividualPipelineStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@kikoda/constructs.IndividualPipelineStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@kikoda/constructs.IndividualPipelineStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/constructs.IndividualPipelineStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `baseDir`<sup>Required</sup> <a name="baseDir" id="@kikoda/constructs.IndividualPipelineStackProps.property.baseDir"></a>

```typescript
public readonly baseDir: string;
```

- *Type:* string

---

##### `branch`<sup>Required</sup> <a name="branch" id="@kikoda/constructs.IndividualPipelineStackProps.property.branch"></a>

```typescript
public readonly branch: DeploymentBranch;
```

- *Type:* <a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>

---

##### `codeSource`<sup>Required</sup> <a name="codeSource" id="@kikoda/constructs.IndividualPipelineStackProps.property.codeSource"></a>

```typescript
public readonly codeSource: CodeCommitSourceConfig | GitHubSourceConfig;
```

- *Type:* <a href="#@kikoda/constructs.CodeCommitSourceConfig">CodeCommitSourceConfig</a> | <a href="#@kikoda/constructs.GitHubSourceConfig">GitHubSourceConfig</a>

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/constructs.IndividualPipelineStackProps.property.component"></a>

```typescript
public readonly component: string;
```

- *Type:* string

---

##### `deploymentBranches`<sup>Required</sup> <a name="deploymentBranches" id="@kikoda/constructs.IndividualPipelineStackProps.property.deploymentBranches"></a>

```typescript
public readonly deploymentBranches: DeploymentBranch[];
```

- *Type:* <a href="#@kikoda/constructs.DeploymentBranch">DeploymentBranch</a>[]

---

##### `stageType`<sup>Required</sup> <a name="stageType" id="@kikoda/constructs.IndividualPipelineStackProps.property.stageType"></a>

```typescript
public readonly stageType: ConfiguredStage;
```

- *Type:* <a href="#@kikoda/constructs.ConfiguredStage">ConfiguredStage</a>

---

##### `synthOuputDir`<sup>Required</sup> <a name="synthOuputDir" id="@kikoda/constructs.IndividualPipelineStackProps.property.synthOuputDir"></a>

```typescript
public readonly synthOuputDir: string;
```

- *Type:* string

---

##### `notificationTopicArn`<sup>Optional</sup> <a name="notificationTopicArn" id="@kikoda/constructs.IndividualPipelineStackProps.property.notificationTopicArn"></a>

```typescript
public readonly notificationTopicArn: string;
```

- *Type:* string

---

##### `pruneCloudAssembly`<sup>Optional</sup> <a name="pruneCloudAssembly" id="@kikoda/constructs.IndividualPipelineStackProps.property.pruneCloudAssembly"></a>

```typescript
public readonly pruneCloudAssembly: boolean;
```

- *Type:* boolean
- *Default:* true

Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step.

This is usefull when you have a lot of resources and are hitting the CFN limit for input
artifact size.

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

### DeploymentPipelines <a name="DeploymentPipelines" id="@kikoda/constructs.DeploymentPipelines"></a>

One pipleline will be created for each stage.

(eg. dev test stage prod).
The generic type is used to dynamically type the configuration.

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





### TrimCloudAssemblyStep <a name="TrimCloudAssemblyStep" id="@kikoda/constructs.TrimCloudAssemblyStep"></a>

#### Initializers <a name="Initializers" id="@kikoda/constructs.TrimCloudAssemblyStep.Initializer"></a>

```typescript
import { TrimCloudAssemblyStep } from '@kikoda/constructs'

new TrimCloudAssemblyStep(stackId: string, pipelineName: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.Initializer.parameter.stackId">stackId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.Initializer.parameter.pipelineName">pipelineName</a></code> | <code>string</code> | *No description.* |

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@kikoda/constructs.TrimCloudAssemblyStep.Initializer.parameter.stackId"></a>

- *Type:* string

---

##### `pipelineName`<sup>Required</sup> <a name="pipelineName" id="@kikoda/constructs.TrimCloudAssemblyStep.Initializer.parameter.pipelineName"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.addStepDependency">addStepDependency</a></code> | Add a dependency on another step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.toString">toString</a></code> | Return a string representation of this Step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.addOutputDirectory">addOutputDirectory</a></code> | Add an additional output FileSet based on a directory. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.primaryOutputDirectory">primaryOutputDirectory</a></code> | Configure the given output directory as primary output. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.exportedVariable">exportedVariable</a></code> | Reference a CodePipeline variable defined by the CodeBuildStep. |

---

##### `addStepDependency` <a name="addStepDependency" id="@kikoda/constructs.TrimCloudAssemblyStep.addStepDependency"></a>

```typescript
public addStepDependency(step: Step): void
```

Add a dependency on another step.

###### `step`<sup>Required</sup> <a name="step" id="@kikoda/constructs.TrimCloudAssemblyStep.addStepDependency.parameter.step"></a>

- *Type:* aws-cdk-lib.pipelines.Step

---

##### `toString` <a name="toString" id="@kikoda/constructs.TrimCloudAssemblyStep.toString"></a>

```typescript
public toString(): string
```

Return a string representation of this Step.

##### `addOutputDirectory` <a name="addOutputDirectory" id="@kikoda/constructs.TrimCloudAssemblyStep.addOutputDirectory"></a>

```typescript
public addOutputDirectory(directory: string): FileSet
```

Add an additional output FileSet based on a directory.

After running the script, the contents of the given directory
will be exported as a `FileSet`. Use the `FileSet` as the
input to another step.

Multiple calls with the exact same directory name string (not normalized)
will return the same FileSet.

###### `directory`<sup>Required</sup> <a name="directory" id="@kikoda/constructs.TrimCloudAssemblyStep.addOutputDirectory.parameter.directory"></a>

- *Type:* string

---

##### `primaryOutputDirectory` <a name="primaryOutputDirectory" id="@kikoda/constructs.TrimCloudAssemblyStep.primaryOutputDirectory"></a>

```typescript
public primaryOutputDirectory(directory: string): FileSet
```

Configure the given output directory as primary output.

If no primary output has been configured yet, this directory
will become the primary output of this ShellStep, otherwise this
method will throw if the given directory is different than the
currently configured primary output directory.

###### `directory`<sup>Required</sup> <a name="directory" id="@kikoda/constructs.TrimCloudAssemblyStep.primaryOutputDirectory.parameter.directory"></a>

- *Type:* string

---

##### `exportedVariable` <a name="exportedVariable" id="@kikoda/constructs.TrimCloudAssemblyStep.exportedVariable"></a>

```typescript
public exportedVariable(variableName: string): string
```

Reference a CodePipeline variable defined by the CodeBuildStep.

The variable must be set in the shell of the CodeBuild step when
it finishes its `post_build` phase.

*Example*

```typescript
// Access the output of one CodeBuildStep in another CodeBuildStep
declare const pipeline: pipelines.CodePipeline;

const step1 = new pipelines.CodeBuildStep('Step1', {
  commands: ['export MY_VAR=hello'],
});

const step2 = new pipelines.CodeBuildStep('Step2', {
  env: {
    IMPORTED_VAR: step1.exportedVariable('MY_VAR'),
  },
  commands: ['echo $IMPORTED_VAR'],
});
```


###### `variableName`<sup>Required</sup> <a name="variableName" id="@kikoda/constructs.TrimCloudAssemblyStep.exportedVariable.parameter.variableName"></a>

- *Type:* string

the name of the variable for reference.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.sequence">sequence</a></code> | Define a sequence of steps to be executed in order. |

---

##### `sequence` <a name="sequence" id="@kikoda/constructs.TrimCloudAssemblyStep.sequence"></a>

```typescript
import { TrimCloudAssemblyStep } from '@kikoda/constructs'

TrimCloudAssemblyStep.sequence(steps: Step[])
```

Define a sequence of steps to be executed in order.

If you need more fine-grained step ordering, use the `addStepDependency()`
API. For example, if you want `secondStep` to occur after `firstStep`, call
`secondStep.addStepDependency(firstStep)`.

###### `steps`<sup>Required</sup> <a name="steps" id="@kikoda/constructs.TrimCloudAssemblyStep.sequence.parameter.steps"></a>

- *Type:* aws-cdk-lib.pipelines.Step[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Return the steps this step depends on, based on the FileSets it requires. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.dependencyFileSets">dependencyFileSets</a></code> | <code>aws-cdk-lib.pipelines.FileSet[]</code> | The list of FileSets consumed by this Step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.id">id</a></code> | <code>string</code> | Identifier for this step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.isSource">isSource</a></code> | <code>boolean</code> | Whether or not this is a Source step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.primaryOutput">primaryOutput</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The primary FileSet produced by this Step. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.commands">commands</a></code> | <code>string[]</code> | Commands to run. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to set. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.envFromCfnOutputs">envFromCfnOutputs</a></code> | <code>{[ key: string ]: aws-cdk-lib.pipelines.StackOutputReference}</code> | Set environment variables based on Stack Outputs. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.inputs">inputs</a></code> | <code>aws-cdk-lib.pipelines.FileSetLocation[]</code> | Input FileSets. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.installCommands">installCommands</a></code> | <code>string[]</code> | Installation commands to run before the regular commands. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.outputs">outputs</a></code> | <code>aws-cdk-lib.pipelines.FileSetLocation[]</code> | Output FileSets. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The CodeBuild Project's principal. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.project">project</a></code> | <code>aws-cdk-lib.aws_codebuild.IProject</code> | CodeBuild Project generated for the pipeline. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.buildEnvironment">buildEnvironment</a></code> | <code>aws-cdk-lib.aws_codebuild.BuildEnvironment</code> | Build environment. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.partialBuildSpec">partialBuildSpec</a></code> | <code>aws-cdk-lib.aws_codebuild.BuildSpec</code> | Additional configuration that can only be configured via BuildSpec. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.projectName">projectName</a></code> | <code>string</code> | Name for the generated CodeBuild project. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Custom execution role to be used for the CodeBuild project. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.rolePolicyStatements">rolePolicyStatements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Policy statements to add to role used during the synth. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Which security group to associate with the script's project network interfaces. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.subnetSelection">subnetSelection</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Which subnets to use. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The number of minutes after which AWS CodeBuild stops the build if it's not complete. |
| <code><a href="#@kikoda/constructs.TrimCloudAssemblyStep.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where to execute the SimpleSynth. |

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@kikoda/constructs.TrimCloudAssemblyStep.property.dependencies"></a>

```typescript
public readonly dependencies: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]

Return the steps this step depends on, based on the FileSets it requires.

---

##### `dependencyFileSets`<sup>Required</sup> <a name="dependencyFileSets" id="@kikoda/constructs.TrimCloudAssemblyStep.property.dependencyFileSets"></a>

```typescript
public readonly dependencyFileSets: FileSet[];
```

- *Type:* aws-cdk-lib.pipelines.FileSet[]

The list of FileSets consumed by this Step.

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/constructs.TrimCloudAssemblyStep.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Identifier for this step.

---

##### `isSource`<sup>Required</sup> <a name="isSource" id="@kikoda/constructs.TrimCloudAssemblyStep.property.isSource"></a>

```typescript
public readonly isSource: boolean;
```

- *Type:* boolean

Whether or not this is a Source step.

What it means to be a Source step depends on the engine.

---

##### `primaryOutput`<sup>Optional</sup> <a name="primaryOutput" id="@kikoda/constructs.TrimCloudAssemblyStep.property.primaryOutput"></a>

```typescript
public readonly primaryOutput: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The primary FileSet produced by this Step.

Not all steps produce an output FileSet--if they do
you can substitute the `Step` object for the `FileSet` object.

---

##### `commands`<sup>Required</sup> <a name="commands" id="@kikoda/constructs.TrimCloudAssemblyStep.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

Commands to run.

---

##### `env`<sup>Required</sup> <a name="env" id="@kikoda/constructs.TrimCloudAssemblyStep.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables

Environment variables to set.

---

##### `envFromCfnOutputs`<sup>Required</sup> <a name="envFromCfnOutputs" id="@kikoda/constructs.TrimCloudAssemblyStep.property.envFromCfnOutputs"></a>

```typescript
public readonly envFromCfnOutputs: {[ key: string ]: StackOutputReference};
```

- *Type:* {[ key: string ]: aws-cdk-lib.pipelines.StackOutputReference}
- *Default:* No environment variables created from stack outputs

Set environment variables based on Stack Outputs.

---

##### `inputs`<sup>Required</sup> <a name="inputs" id="@kikoda/constructs.TrimCloudAssemblyStep.property.inputs"></a>

```typescript
public readonly inputs: FileSetLocation[];
```

- *Type:* aws-cdk-lib.pipelines.FileSetLocation[]

Input FileSets.

A list of `(FileSet, directory)` pairs, which are a copy of the
input properties. This list should not be modified directly.

---

##### `installCommands`<sup>Required</sup> <a name="installCommands" id="@kikoda/constructs.TrimCloudAssemblyStep.property.installCommands"></a>

```typescript
public readonly installCommands: string[];
```

- *Type:* string[]
- *Default:* No installation commands

Installation commands to run before the regular commands.

For deployment engines that support it, install commands will be classified
differently in the job history from the regular `commands`.

---

##### `outputs`<sup>Required</sup> <a name="outputs" id="@kikoda/constructs.TrimCloudAssemblyStep.property.outputs"></a>

```typescript
public readonly outputs: FileSetLocation[];
```

- *Type:* aws-cdk-lib.pipelines.FileSetLocation[]

Output FileSets.

A list of `(FileSet, directory)` pairs, which are a copy of the
input properties. This list should not be modified directly.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@kikoda/constructs.TrimCloudAssemblyStep.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The CodeBuild Project's principal.

---

##### `project`<sup>Required</sup> <a name="project" id="@kikoda/constructs.TrimCloudAssemblyStep.property.project"></a>

```typescript
public readonly project: IProject;
```

- *Type:* aws-cdk-lib.aws_codebuild.IProject

CodeBuild Project generated for the pipeline.

Will only be available after the pipeline has been built.

---

##### `buildEnvironment`<sup>Optional</sup> <a name="buildEnvironment" id="@kikoda/constructs.TrimCloudAssemblyStep.property.buildEnvironment"></a>

```typescript
public readonly buildEnvironment: BuildEnvironment;
```

- *Type:* aws-cdk-lib.aws_codebuild.BuildEnvironment
- *Default:* No value specified at construction time, use defaults

Build environment.

---

##### `partialBuildSpec`<sup>Optional</sup> <a name="partialBuildSpec" id="@kikoda/constructs.TrimCloudAssemblyStep.property.partialBuildSpec"></a>

```typescript
public readonly partialBuildSpec: BuildSpec;
```

- *Type:* aws-cdk-lib.aws_codebuild.BuildSpec
- *Default:* Contains the exported variables

Additional configuration that can only be configured via BuildSpec.

Contains exported variables

---

##### `projectName`<sup>Optional</sup> <a name="projectName" id="@kikoda/constructs.TrimCloudAssemblyStep.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string
- *Default:* No value specified at construction time, use defaults

Name for the generated CodeBuild project.

---

##### `role`<sup>Optional</sup> <a name="role" id="@kikoda/constructs.TrimCloudAssemblyStep.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* No value specified at construction time, use defaults

Custom execution role to be used for the CodeBuild project.

---

##### `rolePolicyStatements`<sup>Optional</sup> <a name="rolePolicyStatements" id="@kikoda/constructs.TrimCloudAssemblyStep.property.rolePolicyStatements"></a>

```typescript
public readonly rolePolicyStatements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No value specified at construction time, use defaults

Policy statements to add to role used during the synth.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@kikoda/constructs.TrimCloudAssemblyStep.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* No value specified at construction time, use defaults

Which security group to associate with the script's project network interfaces.

---

##### `subnetSelection`<sup>Optional</sup> <a name="subnetSelection" id="@kikoda/constructs.TrimCloudAssemblyStep.property.subnetSelection"></a>

```typescript
public readonly subnetSelection: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* No value specified at construction time, use defaults

Which subnets to use.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@kikoda/constructs.TrimCloudAssemblyStep.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(1)

The number of minutes after which AWS CodeBuild stops the build if it's not complete.

For valid values, see the timeoutInMinutes field in the AWS
CodeBuild User Guide.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@kikoda/constructs.TrimCloudAssemblyStep.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* No value specified at construction time, use defaults

The VPC where to execute the SimpleSynth.

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

