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


### ComponentPipelineStack <a name="ComponentPipelineStack" id="@kikoda/cdk-constructs.ComponentPipelineStack"></a>

An individual component deployment pipeline stack.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.ComponentPipelineStack.Initializer"></a>

```typescript
import { ComponentPipelineStack } from '@kikoda/cdk-constructs'

new ComponentPipelineStack(scope: Construct, id: string, props: ComponentPipelineStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps">ComponentPipelineStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.ComponentPipelineStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps">ComponentPipelineStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a value. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.ComponentPipelineStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@kikoda/cdk-constructs.ComponentPipelineStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@kikoda/cdk-constructs.ComponentPipelineStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@kikoda/cdk-constructs.ComponentPipelineStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addTransform` <a name="addTransform" id="@kikoda/cdk-constructs.ComponentPipelineStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="@kikoda/cdk-constructs.ComponentPipelineStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportValue` <a name="exportValue" id="@kikoda/cdk-constructs.ComponentPipelineStack.exportValue"></a>

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@kikoda/cdk-constructs.ComponentPipelineStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.ComponentPipelineStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@kikoda/cdk-constructs.ComponentPipelineStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="@kikoda/cdk-constructs.ComponentPipelineStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@kikoda/cdk-constructs.ComponentPipelineStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="@kikoda/cdk-constructs.ComponentPipelineStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@kikoda/cdk-constructs.ComponentPipelineStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="@kikoda/cdk-constructs.ComponentPipelineStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@kikoda/cdk-constructs.ComponentPipelineStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@kikoda/cdk-constructs.ComponentPipelineStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@kikoda/cdk-constructs.ComponentPipelineStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@kikoda/cdk-constructs.ComponentPipelineStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@kikoda/cdk-constructs.ComponentPipelineStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@kikoda/cdk-constructs.ComponentPipelineStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@kikoda/cdk-constructs.ComponentPipelineStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@kikoda/cdk-constructs.ComponentPipelineStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@kikoda/cdk-constructs.ComponentPipelineStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@kikoda/cdk-constructs.ComponentPipelineStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@kikoda/cdk-constructs.ComponentPipelineStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@kikoda/cdk-constructs.ComponentPipelineStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@kikoda/cdk-constructs.ComponentPipelineStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@kikoda/cdk-constructs.ComponentPipelineStack.toJsonString.parameter.space"></a>

- *Type:* number

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.ComponentPipelineStack.isConstruct"></a>

```typescript
import { ComponentPipelineStack } from '@kikoda/cdk-constructs'

ComponentPipelineStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.ComponentPipelineStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@kikoda/cdk-constructs.ComponentPipelineStack.isStack"></a>

```typescript
import { ComponentPipelineStack } from '@kikoda/cdk-constructs'

ComponentPipelineStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.ComponentPipelineStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@kikoda/cdk-constructs.ComponentPipelineStack.of"></a>

```typescript
import { ComponentPipelineStack } from '@kikoda/cdk-constructs'

ComponentPipelineStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/cdk-constructs.ComponentPipelineStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack.property.codePipeline">codePipeline</a></code> | <code>aws-cdk-lib.pipelines.CodePipeline</code> | Instance of the CDK.CodePipeline created. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.account"></a>

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

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.region"></a>

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

##### `stackId`<sup>Required</sup> <a name="stackId" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `codePipeline`<sup>Required</sup> <a name="codePipeline" id="@kikoda/cdk-constructs.ComponentPipelineStack.property.codePipeline"></a>

```typescript
public readonly codePipeline: CodePipeline;
```

- *Type:* aws-cdk-lib.pipelines.CodePipeline

Instance of the CDK.CodePipeline created.

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
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.extOf">extOf</a></code> | Return the `ConfiguredStage` this construct is contained with, if available. |
| <code><a href="#@kikoda/cdk-constructs.ConfiguredStage.isConfiguredStage">isConfiguredStage</a></code> | Test whether the given construct is a ConfiguredStage. |

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

##### `extOf` <a name="extOf" id="@kikoda/cdk-constructs.ConfiguredStage.extOf"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

ConfiguredStage.extOf(construct: IConstruct)
```

Return the `ConfiguredStage` this construct is contained with, if available.

If called
on a nested stage, returns its parent. This method is most useful when you need to
load the configuration in a nested construct. This works exactly like Stage.of() but
returns the ConfiguredStage instead of the Stage.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/cdk-constructs.ConfiguredStage.extOf.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isConfiguredStage` <a name="isConfiguredStage" id="@kikoda/cdk-constructs.ConfiguredStage.isConfiguredStage"></a>

```typescript
import { ConfiguredStage } from '@kikoda/cdk-constructs'

ConfiguredStage.isConfiguredStage(x: any)
```

Test whether the given construct is a ConfiguredStage.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.ConfiguredStage.isConfiguredStage.parameter.x"></a>

- *Type:* any

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


### TypescriptFunction <a name="TypescriptFunction" id="@kikoda/cdk-constructs.TypescriptFunction"></a>

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.TypescriptFunction.Initializer"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

new TypescriptFunction(scope: Construct, id: string, props?: TypescriptFunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps">TypescriptFunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.TypescriptFunctionProps">TypescriptFunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.TypescriptFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@kikoda/cdk-constructs.TypescriptFunction.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@kikoda/cdk-constructs.TypescriptFunction.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="@kikoda/cdk-constructs.TypescriptFunction.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the @aws-cdk/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="@kikoda/cdk-constructs.TypescriptFunction.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="@kikoda/cdk-constructs.TypescriptFunction.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptFunction.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="@kikoda/cdk-constructs.TypescriptFunction.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptFunction.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="@kikoda/cdk-constructs.TypescriptFunction.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="@kikoda/cdk-constructs.TypescriptFunction.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@kikoda/cdk-constructs.TypescriptFunction.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@kikoda/cdk-constructs.TypescriptFunction.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="@kikoda/cdk-constructs.TypescriptFunction.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptFunction.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="@kikoda/cdk-constructs.TypescriptFunction.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptFunction.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="@kikoda/cdk-constructs.TypescriptFunction.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="@kikoda/cdk-constructs.TypescriptFunction.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@kikoda/cdk-constructs.TypescriptFunction.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="@kikoda/cdk-constructs.TypescriptFunction.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@kikoda/cdk-constructs.TypescriptFunction.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@kikoda/cdk-constructs.TypescriptFunction.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@kikoda/cdk-constructs.TypescriptFunction.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="@kikoda/cdk-constructs.TypescriptFunction.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="@kikoda/cdk-constructs.TypescriptFunction.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="@kikoda/cdk-constructs.TypescriptFunction.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="@kikoda/cdk-constructs.TypescriptFunction.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="@kikoda/cdk-constructs.TypescriptFunction.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
   aliasName: 'Live',
   version: fn.currentVersion,
});

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="@kikoda/cdk-constructs.TypescriptFunction.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptFunction.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="@kikoda/cdk-constructs.TypescriptFunction.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="@kikoda/cdk-constructs.TypescriptFunction.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="@kikoda/cdk-constructs.TypescriptFunction.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptFunction.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="@kikoda/cdk-constructs.TypescriptFunction.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="@kikoda/cdk-constructs.TypescriptFunction.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.TypescriptFunction.isConstruct"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.TypescriptFunction.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="@kikoda/cdk-constructs.TypescriptFunction.isResource"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/cdk-constructs.TypescriptFunction.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="@kikoda/cdk-constructs.TypescriptFunction.classifyVersionProperty"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="@kikoda/cdk-constructs.TypescriptFunction.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="@kikoda/cdk-constructs.TypescriptFunction.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionArn"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionAttributes"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

###### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionName"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="@kikoda/cdk-constructs.TypescriptFunction.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="@kikoda/cdk-constructs.TypescriptFunction.metricAll"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@kikoda/cdk-constructs.TypescriptFunction.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllConcurrentExecutions"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllDuration"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllErrors"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllInvocations"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllThrottles"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { TypescriptFunction } from '@kikoda/cdk-constructs'

TypescriptFunction.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptFunction.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunction.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.TypescriptFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@kikoda/cdk-constructs.TypescriptFunction.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@kikoda/cdk-constructs.TypescriptFunction.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="@kikoda/cdk-constructs.TypescriptFunction.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="@kikoda/cdk-constructs.TypescriptFunction.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@kikoda/cdk-constructs.TypescriptFunction.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@kikoda/cdk-constructs.TypescriptFunction.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@kikoda/cdk-constructs.TypescriptFunction.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="@kikoda/cdk-constructs.TypescriptFunction.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="@kikoda/cdk-constructs.TypescriptFunction.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="@kikoda/cdk-constructs.TypescriptFunction.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="@kikoda/cdk-constructs.TypescriptFunction.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="@kikoda/cdk-constructs.TypescriptFunction.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="@kikoda/cdk-constructs.TypescriptFunction.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="@kikoda/cdk-constructs.TypescriptFunction.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="@kikoda/cdk-constructs.TypescriptFunction.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@kikoda/cdk-constructs.TypescriptFunction.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@kikoda/cdk-constructs.TypescriptFunction.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@kikoda/cdk-constructs.TypescriptFunction.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---


### TypescriptSingletonFunction <a name="TypescriptSingletonFunction" id="@kikoda/cdk-constructs.TypescriptSingletonFunction"></a>

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer"></a>

```typescript
import { TypescriptSingletonFunction } from '@kikoda/cdk-constructs'

new TypescriptSingletonFunction(scope: Construct, id: string, props: TypescriptSingletonFunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps">TypescriptSingletonFunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps">TypescriptSingletonFunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addDependency">addDependency</a></code> | Using node.addDependency() does not work on this method as the underlying lambda function is modeled as a singleton across the stack. Use this method instead to declare dependencies. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.dependOn">dependOn</a></code> | The SingletonFunction construct cannot be added as a dependency of another construct using node.addDependency(). Use this method instead to declare this as a dependency of another construct. |

---

##### `toString` <a name="toString" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the @aws-cdk/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addPermission"></a>

```typescript
public addPermission(name: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

###### `name`<sup>Required</sup> <a name="name" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addPermission.parameter.name"></a>

- *Type:* string

---

###### `permission`<sup>Required</sup> <a name="permission" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addDependency` <a name="addDependency" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addDependency"></a>

```typescript
public addDependency(up: IDependable): void
```

Using node.addDependency() does not work on this method as the underlying lambda function is modeled as a singleton across the stack. Use this method instead to declare dependencies.

###### `up`<sup>Required</sup> <a name="up" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addDependency.parameter.up"></a>

- *Type:* constructs.IDependable

---

##### `addEnvironment` <a name="addEnvironment" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `dependOn` <a name="dependOn" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.dependOn"></a>

```typescript
public dependOn(down: IConstruct): void
```

The SingletonFunction construct cannot be added as a dependency of another construct using node.addDependency(). Use this method instead to declare this as a dependency of another construct.

###### `down`<sup>Required</sup> <a name="down" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.dependOn.parameter.down"></a>

- *Type:* constructs.IConstruct

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.isConstruct"></a>

```typescript
import { TypescriptSingletonFunction } from '@kikoda/cdk-constructs'

TypescriptSingletonFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.isResource"></a>

```typescript
import { TypescriptSingletonFunction } from '@kikoda/cdk-constructs'

TypescriptSingletonFunction.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.functionArn">functionArn</a></code> | <code>string</code> | The ARN fo the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.functionName">functionName</a></code> | <code>string</code> | The name of the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role associated with this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this singleton Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunction.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment for the Lambda function. |

---

##### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

The ARN fo the function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

The name of the function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The IAM role associated with this function.

Undefined if the function was imported without a role.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this singleton Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.SingletonFunction`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="@kikoda/cdk-constructs.TypescriptSingletonFunction.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime environment for the Lambda function.

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
| <code><a href="#@kikoda/cdk-constructs.Website.property.generatedWebConfig">generatedWebConfig</a></code> | <code>@kikoda/generated-config.GeneratedConfig</code> | *No description.* |

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

##### `generatedWebConfig`<sup>Optional</sup> <a name="generatedWebConfig" id="@kikoda/cdk-constructs.Website.property.generatedWebConfig"></a>

```typescript
public readonly generatedWebConfig: GeneratedConfig;
```

- *Type:* @kikoda/generated-config.GeneratedConfig

---


## Structs <a name="Structs" id="Structs"></a>

### BranchPipelinesProps <a name="BranchPipelinesProps" id="@kikoda/cdk-constructs.BranchPipelinesProps"></a>

Configuration for the BranchPipelines construct.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.BranchPipelinesProps.Initializer"></a>

```typescript
import { BranchPipelinesProps } from '@kikoda/cdk-constructs'

const branchPipelinesProps: BranchPipelinesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.component">component</a></code> | <code><a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.deploymentBranches">deploymentBranches</a></code> | <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>[]</code> | An interface representing the configutation for each branch and its related stage. |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.pipelineConfig">pipelineConfig</a></code> | <code><a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps.property.repository">repository</a></code> | <code><a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a></code> | Configuration for the source code repository. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.component"></a>

```typescript
public readonly component: ComponentConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a>

---

##### `deploymentBranches`<sup>Required</sup> <a name="deploymentBranches" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.deploymentBranches"></a>

```typescript
public readonly deploymentBranches: IDeploymentBranch[];
```

- *Type:* <a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>[]

An interface representing the configutation for each branch and its related stage.

---

##### `pipelineConfig`<sup>Required</sup> <a name="pipelineConfig" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.pipelineConfig"></a>

```typescript
public readonly pipelineConfig: PipelineConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a>

---

##### `repository`<sup>Required</sup> <a name="repository" id="@kikoda/cdk-constructs.BranchPipelinesProps.property.repository"></a>

```typescript
public readonly repository: RepositoryConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a>

Configuration for the source code repository.

Currently supports GitHub and CodeArtifacts.

---

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

### ComponentPipelineStackProps <a name="ComponentPipelineStackProps" id="@kikoda/cdk-constructs.ComponentPipelineStackProps"></a>

The properties for the ComponentPipelineStack construct.

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.Initializer"></a>

```typescript
import { ComponentPipelineStackProps } from '@kikoda/cdk-constructs'

const componentPipelineStackProps: ComponentPipelineStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.branch">branch</a></code> | <code><a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a></code> | The deployment branch that this stack represents. |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.component">component</a></code> | <code><a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.pipelineConfig">pipelineConfig</a></code> | <code><a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStackProps.property.repository">repository</a></code> | <code><a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a></code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `branch`<sup>Required</sup> <a name="branch" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.branch"></a>

```typescript
public readonly branch: IDeploymentBranch;
```

- *Type:* <a href="#@kikoda/cdk-constructs.IDeploymentBranch">IDeploymentBranch</a>

The deployment branch that this stack represents.

---

##### `component`<sup>Required</sup> <a name="component" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.component"></a>

```typescript
public readonly component: ComponentConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.ComponentConfig">ComponentConfig</a>

---

##### `pipelineConfig`<sup>Required</sup> <a name="pipelineConfig" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.pipelineConfig"></a>

```typescript
public readonly pipelineConfig: PipelineConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.PipelineConfig">PipelineConfig</a>

---

##### `repository`<sup>Required</sup> <a name="repository" id="@kikoda/cdk-constructs.ComponentPipelineStackProps.property.repository"></a>

```typescript
public readonly repository: RepositoryConfig;
```

- *Type:* <a href="#@kikoda/cdk-constructs.RepositoryConfig">RepositoryConfig</a>

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

### FunctionBundleCopyFilesProps <a name="FunctionBundleCopyFilesProps" id="@kikoda/cdk-constructs.FunctionBundleCopyFilesProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.FunctionBundleCopyFilesProps.Initializer"></a>

```typescript
import { FunctionBundleCopyFilesProps } from '@kikoda/cdk-constructs'

const functionBundleCopyFilesProps: FunctionBundleCopyFilesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleCopyFilesProps.property.from">from</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleCopyFilesProps.property.to">to</a></code> | <code>string</code> | *No description.* |

---

##### `from`<sup>Required</sup> <a name="from" id="@kikoda/cdk-constructs.FunctionBundleCopyFilesProps.property.from"></a>

```typescript
public readonly from: string;
```

- *Type:* string

---

##### `to`<sup>Optional</sup> <a name="to" id="@kikoda/cdk-constructs.FunctionBundleCopyFilesProps.property.to"></a>

```typescript
public readonly to: string;
```

- *Type:* string

---

### FunctionBundleProps <a name="FunctionBundleProps" id="@kikoda/cdk-constructs.FunctionBundleProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.FunctionBundleProps.Initializer"></a>

```typescript
import { FunctionBundleProps } from '@kikoda/cdk-constructs'

const functionBundleProps: FunctionBundleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleProps.property.commandHooks">commandHooks</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.ICommandHooks</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleProps.property.copyFiles">copyFiles</a></code> | <code><a href="#@kikoda/cdk-constructs.FunctionBundleCopyFilesProps">FunctionBundleCopyFilesProps</a>[]</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleProps.property.externalModules">externalModules</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleProps.property.loader">loader</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FunctionBundleProps.property.nodeModules">nodeModules</a></code> | <code>string[]</code> | *No description.* |

---

##### `commandHooks`<sup>Optional</sup> <a name="commandHooks" id="@kikoda/cdk-constructs.FunctionBundleProps.property.commandHooks"></a>

```typescript
public readonly commandHooks: ICommandHooks;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.ICommandHooks

---

##### `copyFiles`<sup>Optional</sup> <a name="copyFiles" id="@kikoda/cdk-constructs.FunctionBundleProps.property.copyFiles"></a>

```typescript
public readonly copyFiles: FunctionBundleCopyFilesProps[];
```

- *Type:* <a href="#@kikoda/cdk-constructs.FunctionBundleCopyFilesProps">FunctionBundleCopyFilesProps</a>[]

---

##### `externalModules`<sup>Optional</sup> <a name="externalModules" id="@kikoda/cdk-constructs.FunctionBundleProps.property.externalModules"></a>

```typescript
public readonly externalModules: string[];
```

- *Type:* string[]

---

##### `loader`<sup>Optional</sup> <a name="loader" id="@kikoda/cdk-constructs.FunctionBundleProps.property.loader"></a>

```typescript
public readonly loader: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `nodeModules`<sup>Optional</sup> <a name="nodeModules" id="@kikoda/cdk-constructs.FunctionBundleProps.property.nodeModules"></a>

```typescript
public readonly nodeModules: string[];
```

- *Type:* string[]

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
| <code><a href="#@kikoda/cdk-constructs.GenerateWebConfigProps.property.additionalConfig">additionalConfig</a></code> | <code>any</code> | Provide any additional configuration items to add to the generated configuration file. |
| <code><a href="#@kikoda/cdk-constructs.GenerateWebConfigProps.property.configDir">configDir</a></code> | <code>string</code> | The directory where base (optional) and stage level config (json) files are stored. |

---

##### `additionalConfig`<sup>Optional</sup> <a name="additionalConfig" id="@kikoda/cdk-constructs.GenerateWebConfigProps.property.additionalConfig"></a>

```typescript
public readonly additionalConfig: any;
```

- *Type:* any

Provide any additional configuration items to add to the generated configuration file.

This
will be added to the config as the `additionalConfig` attribute.

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
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.codeArtifactRepositoryArn">codeArtifactRepositoryArn</a></code> | <code>string</code> | Specifying a codeartifact ARN here will enable asset phase of the pipeline to access that codeartifact repository. |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.notificationTopicArn">notificationTopicArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.PipelineConfig.property.pruneCloudAssembly">pruneCloudAssembly</a></code> | <code>boolean</code> | Add a step to pull down and remove asset zips from the cloud assembly output from the Synth step. |

---

##### `codeArtifactRepositoryArn`<sup>Optional</sup> <a name="codeArtifactRepositoryArn" id="@kikoda/cdk-constructs.PipelineConfig.property.codeArtifactRepositoryArn"></a>

```typescript
public readonly codeArtifactRepositoryArn: string;
```

- *Type:* string

Specifying a codeartifact ARN here will enable asset phase of the pipeline to access that codeartifact repository.

This includes adding approprate roles and leveraging an assumed role for the docker build so that the docker build can pull from codeartifact.

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

### TypescriptFunctionProps <a name="TypescriptFunctionProps" id="@kikoda/cdk-constructs.TypescriptFunctionProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.TypescriptFunctionProps.Initializer"></a>

```typescript
import { TypescriptFunctionProps } from '@kikoda/cdk-constructs'

const typescriptFunctionProps: TypescriptFunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.awsSdkConnectionReuse">awsSdkConnectionReuse</a></code> | <code>boolean</code> | Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.BundlingOptions</code> | Bundling options. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.depsLockFilePath">depsLockFilePath</a></code> | <code>string</code> | The path to the dependencies lock file (`yarn.lock` or `package-lock.json`). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.entry">entry</a></code> | <code>string</code> | Path to the entry file (JavaScript or TypeScript). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.handler">handler</a></code> | <code>string</code> | The name of the exported handler in the entry file. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.projectRoot">projectRoot</a></code> | <code>string</code> | The path to the directory containing project config files (`package.json` or `tsconfig.json`). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptFunctionProps.property.yarnPnP">yarnPnP</a></code> | <code>boolean</code> | Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`. |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

Only used if 'vpc' is supplied. Note: internet access for Lambdas
requires a NAT gateway, so picking Public subnets is not allowed.

---

##### `awsSdkConnectionReuse`<sup>Optional</sup> <a name="awsSdkConnectionReuse" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.awsSdkConnectionReuse"></a>

```typescript
public readonly awsSdkConnectionReuse: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript.

This sets the `AWS_NODEJS_CONNECTION_REUSE_ENABLED` environment variable
to `1`.

> [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html)

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.BundlingOptions
- *Default:* use default bundling options: no minify, no sourcemap, all modules are bundled.

Bundling options.

---

##### `depsLockFilePath`<sup>Optional</sup> <a name="depsLockFilePath" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.depsLockFilePath"></a>

```typescript
public readonly depsLockFilePath: string;
```

- *Type:* string
- *Default:* the path is found by walking up parent directories searching for a `yarn.lock` or `package-lock.json` file

The path to the dependencies lock file (`yarn.lock` or `package-lock.json`).

This will be used as the source for the volume mounted in the Docker
container.

Modules specified in `nodeModules` will be installed using the right
installer (`npm` or `yarn`) along with this lock file.

---

##### `entry`<sup>Optional</sup> <a name="entry" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string
- *Default:* Derived from the name of the defining file and the construct's id. If the `NodejsFunction` is defined in `stack.ts` with `my-handler` as id (`new NodejsFunction(this, 'my-handler')`), the construct will look at `stack.my-handler.ts` and `stack.my-handler.js`.

Path to the entry file (JavaScript or TypeScript).

---

##### `handler`<sup>Optional</sup> <a name="handler" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string
- *Default:* handler

The name of the exported handler in the entry file.

---

##### `projectRoot`<sup>Optional</sup> <a name="projectRoot" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.projectRoot"></a>

```typescript
public readonly projectRoot: string;
```

- *Type:* string
- *Default:* the directory containing the `depsLockFilePath`

The path to the directory containing project config files (`package.json` or `tsconfig.json`).

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* Runtime.NODEJS_14_X

The runtime environment.

Only runtimes of the Node.js family are
supported.

---

##### `yarnPnP`<sup>Optional</sup> <a name="yarnPnP" id="@kikoda/cdk-constructs.TypescriptFunctionProps.property.yarnPnP"></a>

```typescript
public readonly yarnPnP: boolean;
```

- *Type:* boolean

Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`.

---

### TypescriptSingletonFunctionProps <a name="TypescriptSingletonFunctionProps" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps"></a>

#### Initializer <a name="Initializer" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.Initializer"></a>

```typescript
import { TypescriptSingletonFunctionProps } from '@kikoda/cdk-constructs'

const typescriptSingletonFunctionProps: TypescriptSingletonFunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.awsSdkConnectionReuse">awsSdkConnectionReuse</a></code> | <code>boolean</code> | Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.BundlingOptions</code> | Bundling options. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.depsLockFilePath">depsLockFilePath</a></code> | <code>string</code> | The path to the dependencies lock file (`yarn.lock` or `package-lock.json`). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.entry">entry</a></code> | <code>string</code> | Path to the entry file (JavaScript or TypeScript). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.handler">handler</a></code> | <code>string</code> | The name of the exported handler in the entry file. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.projectRoot">projectRoot</a></code> | <code>string</code> | The path to the directory containing project config files (`package.json` or `tsconfig.json`). |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.yarnPnP">yarnPnP</a></code> | <code>boolean</code> | Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.uuid">uuid</a></code> | <code>string</code> | A unique identifier to identify this lambda. |
| <code><a href="#@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.lambdaPurpose">lambdaPurpose</a></code> | <code>string</code> | A descriptive name for the purpose of this Lambda. |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

Only used if 'vpc' is supplied. Note: internet access for Lambdas
requires a NAT gateway, so picking Public subnets is not allowed.

---

##### `awsSdkConnectionReuse`<sup>Optional</sup> <a name="awsSdkConnectionReuse" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.awsSdkConnectionReuse"></a>

```typescript
public readonly awsSdkConnectionReuse: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript.

This sets the `AWS_NODEJS_CONNECTION_REUSE_ENABLED` environment variable
to `1`.

> [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html)

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.BundlingOptions
- *Default:* use default bundling options: no minify, no sourcemap, all modules are bundled.

Bundling options.

---

##### `depsLockFilePath`<sup>Optional</sup> <a name="depsLockFilePath" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.depsLockFilePath"></a>

```typescript
public readonly depsLockFilePath: string;
```

- *Type:* string
- *Default:* the path is found by walking up parent directories searching for a `yarn.lock` or `package-lock.json` file

The path to the dependencies lock file (`yarn.lock` or `package-lock.json`).

This will be used as the source for the volume mounted in the Docker
container.

Modules specified in `nodeModules` will be installed using the right
installer (`npm` or `yarn`) along with this lock file.

---

##### `entry`<sup>Optional</sup> <a name="entry" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string
- *Default:* Derived from the name of the defining file and the construct's id. If the `NodejsFunction` is defined in `stack.ts` with `my-handler` as id (`new NodejsFunction(this, 'my-handler')`), the construct will look at `stack.my-handler.ts` and `stack.my-handler.js`.

Path to the entry file (JavaScript or TypeScript).

---

##### `handler`<sup>Optional</sup> <a name="handler" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string
- *Default:* handler

The name of the exported handler in the entry file.

---

##### `projectRoot`<sup>Optional</sup> <a name="projectRoot" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.projectRoot"></a>

```typescript
public readonly projectRoot: string;
```

- *Type:* string
- *Default:* the directory containing the `depsLockFilePath`

The path to the directory containing project config files (`package.json` or `tsconfig.json`).

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* Runtime.NODEJS_14_X

The runtime environment.

Only runtimes of the Node.js family are
supported.

---

##### `yarnPnP`<sup>Optional</sup> <a name="yarnPnP" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.yarnPnP"></a>

```typescript
public readonly yarnPnP: boolean;
```

- *Type:* boolean

Enable esbuild Yarn PnP support through `@yarnpkg/esbuild-plugin-pnp`.

---

##### `uuid`<sup>Required</sup> <a name="uuid" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.uuid"></a>

```typescript
public readonly uuid: string;
```

- *Type:* string

A unique identifier to identify this lambda.

The identifier should be unique across all custom resource providers.
We recommend generating a UUID per provider.

---

##### `lambdaPurpose`<sup>Optional</sup> <a name="lambdaPurpose" id="@kikoda/cdk-constructs.TypescriptSingletonFunctionProps.property.lambdaPurpose"></a>

```typescript
public readonly lambdaPurpose: string;
```

- *Type:* string
- *Default:* SingletonLambda

A descriptive name for the purpose of this Lambda.

If the Lambda does not have a physical name, this string will be
reflected its generated name. The combination of lambdaPurpose
and uuid must be unique.

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

### BranchPipelines <a name="BranchPipelines" id="@kikoda/cdk-constructs.BranchPipelines"></a>

Branch  pipelines creates an individual component deployment pipeline stack for each branch.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.BranchPipelines.Initializer"></a>

```typescript
import { BranchPipelines } from '@kikoda/cdk-constructs'

new BranchPipelines(app: App, props: BranchPipelinesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelines.Initializer.parameter.app">app</a></code> | <code>aws-cdk-lib.App</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelines.Initializer.parameter.props">props</a></code> | <code><a href="#@kikoda/cdk-constructs.BranchPipelinesProps">BranchPipelinesProps</a></code> | *No description.* |

---

##### `app`<sup>Required</sup> <a name="app" id="@kikoda/cdk-constructs.BranchPipelines.Initializer.parameter.app"></a>

- *Type:* aws-cdk-lib.App

---

##### `props`<sup>Required</sup> <a name="props" id="@kikoda/cdk-constructs.BranchPipelines.Initializer.parameter.props"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.BranchPipelinesProps">BranchPipelinesProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.BranchPipelines.property.componentPipelineStacks">componentPipelineStacks</a></code> | <code><a href="#@kikoda/cdk-constructs.ComponentPipelineStack">ComponentPipelineStack</a>[]</code> | Instance(s) of ComponentPipelineStacks created. |

---

##### `componentPipelineStacks`<sup>Required</sup> <a name="componentPipelineStacks" id="@kikoda/cdk-constructs.BranchPipelines.property.componentPipelineStacks"></a>

```typescript
public readonly componentPipelineStacks: ComponentPipelineStack[];
```

- *Type:* <a href="#@kikoda/cdk-constructs.ComponentPipelineStack">ComponentPipelineStack</a>[]

Instance(s) of ComponentPipelineStacks created.

---


### CostOptimizationAspects <a name="CostOptimizationAspects" id="@kikoda/cdk-constructs.CostOptimizationAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.CostOptimizationAspects.Initializer"></a>

```typescript
import { CostOptimizationAspects } from '@kikoda/cdk-constructs'

new CostOptimizationAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.CostOptimizationAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.CostOptimizationAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.CostOptimizationAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### FlagBasedAnnotator <a name="FlagBasedAnnotator" id="@kikoda/cdk-constructs.FlagBasedAnnotator"></a>

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.FlagBasedAnnotator.Initializer"></a>

```typescript
import { FlagBasedAnnotator } from '@kikoda/cdk-constructs'

new FlagBasedAnnotator(scope: IConstruct, featureFlag: WellArchitectedAspectsFeatureFlags)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FlagBasedAnnotator.Initializer.parameter.scope">scope</a></code> | <code>constructs.IConstruct</code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FlagBasedAnnotator.Initializer.parameter.featureFlag">featureFlag</a></code> | <code><a href="#@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags">WellArchitectedAspectsFeatureFlags</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@kikoda/cdk-constructs.FlagBasedAnnotator.Initializer.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `featureFlag`<sup>Required</sup> <a name="featureFlag" id="@kikoda/cdk-constructs.FlagBasedAnnotator.Initializer.parameter.featureFlag"></a>

- *Type:* <a href="#@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags">WellArchitectedAspectsFeatureFlags</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FlagBasedAnnotator.annotate">annotate</a></code> | *No description.* |

---

##### `annotate` <a name="annotate" id="@kikoda/cdk-constructs.FlagBasedAnnotator.annotate"></a>

```typescript
public annotate(message: string): void
```

###### `message`<sup>Required</sup> <a name="message" id="@kikoda/cdk-constructs.FlagBasedAnnotator.annotate.parameter.message"></a>

- *Type:* string

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FlagBasedAnnotator.property.flagLevel">flagLevel</a></code> | <code><a href="#@kikoda/cdk-constructs.FlagLevel">FlagLevel</a></code> | *No description.* |

---

##### `flagLevel`<sup>Required</sup> <a name="flagLevel" id="@kikoda/cdk-constructs.FlagBasedAnnotator.property.flagLevel"></a>

```typescript
public readonly flagLevel: FlagLevel;
```

- *Type:* <a href="#@kikoda/cdk-constructs.FlagLevel">FlagLevel</a>

---


### OperationalExcellenceAspects <a name="OperationalExcellenceAspects" id="@kikoda/cdk-constructs.OperationalExcellenceAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.OperationalExcellenceAspects.Initializer"></a>

```typescript
import { OperationalExcellenceAspects } from '@kikoda/cdk-constructs'

new OperationalExcellenceAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.OperationalExcellenceAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.OperationalExcellenceAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.OperationalExcellenceAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### PerformanceEfficiencyAspects <a name="PerformanceEfficiencyAspects" id="@kikoda/cdk-constructs.PerformanceEfficiencyAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.PerformanceEfficiencyAspects.Initializer"></a>

```typescript
import { PerformanceEfficiencyAspects } from '@kikoda/cdk-constructs'

new PerformanceEfficiencyAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.PerformanceEfficiencyAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.PerformanceEfficiencyAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.PerformanceEfficiencyAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### ReliabilityAspects <a name="ReliabilityAspects" id="@kikoda/cdk-constructs.ReliabilityAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.ReliabilityAspects.Initializer"></a>

```typescript
import { ReliabilityAspects } from '@kikoda/cdk-constructs'

new ReliabilityAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.ReliabilityAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.ReliabilityAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.ReliabilityAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### SecurityAspects <a name="SecurityAspects" id="@kikoda/cdk-constructs.SecurityAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.SecurityAspects.Initializer"></a>

```typescript
import { SecurityAspects } from '@kikoda/cdk-constructs'

new SecurityAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.SecurityAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.SecurityAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.SecurityAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### SustainabilityAspects <a name="SustainabilityAspects" id="@kikoda/cdk-constructs.SustainabilityAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.SustainabilityAspects.Initializer"></a>

```typescript
import { SustainabilityAspects } from '@kikoda/cdk-constructs'

new SustainabilityAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.SustainabilityAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.SustainabilityAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.SustainabilityAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### WellArchitectedAspects <a name="WellArchitectedAspects" id="@kikoda/cdk-constructs.WellArchitectedAspects"></a>

- *Implements:* aws-cdk-lib.IAspect

An app construct that complies with AWS well-architected standards.

#### Initializers <a name="Initializers" id="@kikoda/cdk-constructs.WellArchitectedAspects.Initializer"></a>

```typescript
import { WellArchitectedAspects } from '@kikoda/cdk-constructs'

new WellArchitectedAspects()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.WellArchitectedAspects.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@kikoda/cdk-constructs.WellArchitectedAspects.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@kikoda/cdk-constructs.WellArchitectedAspects.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

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


### FlagLevel <a name="FlagLevel" id="@kikoda/cdk-constructs.FlagLevel"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.FlagLevel.INFO">INFO</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FlagLevel.WARN">WARN</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FlagLevel.ERROR">ERROR</a></code> | *No description.* |
| <code><a href="#@kikoda/cdk-constructs.FlagLevel.FIX">FIX</a></code> | *No description.* |

---

##### `INFO` <a name="INFO" id="@kikoda/cdk-constructs.FlagLevel.INFO"></a>

---


##### `WARN` <a name="WARN" id="@kikoda/cdk-constructs.FlagLevel.WARN"></a>

---


##### `ERROR` <a name="ERROR" id="@kikoda/cdk-constructs.FlagLevel.ERROR"></a>

---


##### `FIX` <a name="FIX" id="@kikoda/cdk-constructs.FlagLevel.FIX"></a>

---


### WellArchitectedAspectsFeatureFlags <a name="WellArchitectedAspectsFeatureFlags" id="@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags.ENABLE_X_RAY_TRACING">ENABLE_X_RAY_TRACING</a></code> | Enable X-Ray Tracing for Lambda functions. |
| <code><a href="#@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS">BLOCK_PUBLIC_BUCKETS</a></code> | Define the behavior for regarding public access policies on S3 Buckets. |

---

##### `ENABLE_X_RAY_TRACING` <a name="ENABLE_X_RAY_TRACING" id="@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags.ENABLE_X_RAY_TRACING"></a>

Enable X-Ray Tracing for Lambda functions.

---


##### `BLOCK_PUBLIC_BUCKETS` <a name="BLOCK_PUBLIC_BUCKETS" id="@kikoda/cdk-constructs.WellArchitectedAspectsFeatureFlags.BLOCK_PUBLIC_BUCKETS"></a>

Define the behavior for regarding public access policies on S3 Buckets.

---

