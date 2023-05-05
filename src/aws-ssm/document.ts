import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CfnDocument } from '.';

const DocumentNameReservedPrefixes = ['aws', 'amazon', 'amzn'];

export interface IDocument extends cdk.IResource {
  /**
   * The ARN of the document.
   *
   * @attribute
   */
  readonly documentArn: string;

  /**
   * The name of the document.
   *
   * @attribute
   */
  readonly documentName: string;

  /**
   * The type of the document.
   */
  readonly type: DocumentType;

  /**
   * The version of the document.
   */
  readonly version?: string;

  /**
   * Grants read permissions to the document.
   *
   * @param grantee the principal being granted permission.
   */
  grandRead(grantee: iam.IGrantable): iam.Grant;

  /**
   * Grants execute permissions for the `grantee` on this SSM Document.
   *
   * @param grantee the role to be granted execute access for the document.
   */
  grantExecute(grantee: iam.IGrantable): iam.Grant;
}

export abstract class DocumentBase extends cdk.Resource implements IDocument {
  public abstract readonly documentArn: string;
  public abstract readonly documentName: string;
  public abstract readonly type: DocumentType;
  public abstract readonly version?: string;

  public grandRead(grantee: iam.IGrantable): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions: [
        'ssm:GetDocument',
        'ssm:DescribeDocument',
        'ssm:ListDocument',
        'ssm:ListDocumentVersions',
        'ssm:GetDocumentVersion',
        'ssm:GetAutomationExecution',
        'ssm:DescribeAutomationExecutions',
        'ssm:CancelCommand',
        'ssm:ListCommands',
        'ssm:ListCommandInvocations',
        'ssm:DescribeInstanceInformation',
        'ssm:DescribeDocumentParameters',
        'ssm:DescribeInstanceProperties',
      ],
      resourceArns: [this.documentArn],
    });
  }

  public grantExecute(grantee: iam.IGrantable): iam.Grant {
    return iam.Grant.addToPrincipal({
      grantee,
      actions: ['ssm:StartAutomationExecution', 'ssm:StopAutomationExecution', 'ssm:SendCommand'],
      resourceArns: [this.documentArn],
    });
  }
}

export enum DocumentType {
  AUTOMATION = 'Automation',
  COMMAND = 'Command',
}

export interface CommonDocumentAttributes {
  readonly documentName: string;
  /**
   * The version of the document to lookup.
   *
   * @default - no version is specified
   */
  readonly version?: string;
}

export type AutomationDocumentAttributes = CommonDocumentAttributes;

export enum UpdateMethod {
  REPLACE = 'Replace',
  NEW_VERSION = 'NewVersion',
}

export interface DocumentBaseProps {
  /**
   * A name for the SSM document. The following strings as document name prefixes.
   * These are reserved by AWS for use as document name prefixes: `aws`, `amazon`, `amzn`.
   */
  readonly documentName: string;

  /**
   * The content of the SSM document.
   */
  readonly content: object;

  /**
   * If the document resource you specify in your template already exists, this parameter
   * determines whether a new version of the existing document is created, or the existing document
   * is replaced. `UpdateMethod.REPLACE` is the default method. If you specify  `UpdateMethod.NEW_VERSION`,
   * a new parameter, and the Name of the document does not match an existing resource, a new document is
   * created. When you specify `UpdateMethod.NEW_VERSION`, the default version of the document is changed to
   * the newly created version.
   *
   * @default UpdateMethod.REPLACE
   */
  readonly updateMethod?: UpdateMethod;

  /**
   * An optional field specifying the name version of the artifact you are creating
   * with the document. For example, `Release12.1`. This value is unique across all
   * versions of a document, and can't be changed.
   *
   * @default - the version is automatically generated.
   */
  readonly versionName?: string;
}

export type AutomationDocumentProps = DocumentBaseProps;

export class AutomationDocument extends DocumentBase implements IDocument {
  public static fromAutomationDocumentName(
    scope: Construct,
    id: string,
    documentName: string,
  ): IDocument {
    return AutomationDocument.fromAutomationDocumentAttributes(scope, id, {
      documentName,
    });
  }

  public static fromAutomationDocumentArn(
    scope: Construct,
    id: string,
    documentArn: string,
  ): IDocument {
    const parts = arnParts(documentArn);

    // must be an automation document
    if (parts.resource !== 'automation-definition') {
      throw new Error(`Invalid SSM Automation Document ARN: ${documentArn}`);
    }

    if (!parts.resourceName) {
      throw new Error(`Invalid Automation SSM Document ARN: ${documentArn}`);
    }

    // extract version if exists
    if (parts.resourceName.includes(':')) {
      const [documentName, version] = parts.resourceName.split(':');
      return AutomationDocument.fromAutomationDocumentAttributes(scope, id, {
        documentName,
        version,
      });
    } else {
      return AutomationDocument.fromAutomationDocumentAttributes(scope, id, {
        documentName: parts.resourceName,
      });
    }
  }

  public static fromAutomationDocumentAttributes(
    scope: Construct,
    id: string,
    attrs: AutomationDocumentAttributes,
  ): IDocument {
    class Import extends DocumentBase {
      public readonly documentName = attrs.documentName;
      public readonly version = attrs.version;
      public readonly type = DocumentType.AUTOMATION;
      public readonly documentArn = makeDocumentArn(this, this);
    }

    return new Import(scope, id);
  }

  public readonly documentArn: string;
  public readonly documentName: string;
  public readonly type: DocumentType = DocumentType.AUTOMATION;
  public readonly version?: string;

  constructor(scope: Construct, id: string, props: AutomationDocumentProps) {
    super(scope, id, {
      physicalName: props.documentName,
    });

    // validate document name
    validateDocumentName(props.documentName);
    validateVersionName(props.versionName);

    const resource = new CfnDocument(this, 'Resource', {
      content: props.content,
      name: this.physicalName,
      documentType: this.type,
      updateMethod: props.updateMethod,
      versionName: props.versionName,
    });

    this.documentName = resource.ref;
    this.documentArn = makeDocumentArn(this, this);
  }
}

const DocumentResourceIdentifier = {
  [DocumentType.AUTOMATION]: 'automation-definition',
};

function arnParts(documentArn: string): cdk.ArnComponents {
  return cdk.Arn.split(documentArn, cdk.ArnFormat.SLASH_RESOURCE_NAME);
}

function makeDocumentArn(construct: Construct, attrs: IDocument): string {
  return cdk.Arn.format(
    {
      service: 'ssm',
      resource: DocumentResourceIdentifier[attrs.type as keyof typeof DocumentResourceIdentifier],
      resourceName: `${attrs.documentName}${attrs.version ? `:${attrs.version}` : ''}`,
      account: containsReservedPrefix(attrs.documentName) ? '' : undefined,
    },
    cdk.Stack.of(construct),
  );
}

function validateDocumentName(documentName: string) {
  if (cdk.Token.isUnresolved(documentName)) {
    return;
  } // validation is not possible
  if (documentName.length < 3 || documentName.length > 128) {
    throw new Error(
      `Document name must be between 3 and 128 characters. Received name: ${documentName} with length: ${documentName.length}`,
    );
  }

  if (containsReservedPrefix(documentName)) {
    throw new Error(
      `Document name ${documentName} is not allowed. Document name prefixes aws, amazon, amzn are reserved by AWS.`,
    );
  }

  if (!documentName.match(/^[a-zA-Z0-9_\-.]{3,128}$/)) {
    throw new Error(
      `name must only contain letters, numbers, and the following 3 symbols _-.; got ${documentName}`,
    );
  }
}

function containsReservedPrefix(name: string) {
  return DocumentNameReservedPrefixes.some(prefix => name.toLowerCase().startsWith(prefix));
}

function validateVersionName(version?: string) {
  if (!version || cdk.Token.isUnresolved(version)) {
    return;
  } // version is optional
  if (version.length < 1 || version.length > 128) {
    throw new Error(
      `Version must be between 1 and 128 characters. Received version: ${version} with length: ${version.length}`,
    );
  }

  if (!version.match(/^[a-zA-Z0-9_\-.]$/)) {
    throw new Error(
      `Version must only contain letters, numbers, and the following 3 symbols _-.; got ${version}`,
    );
  }
}
