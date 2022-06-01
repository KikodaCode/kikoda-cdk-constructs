import { Arn, ArnFormat } from 'aws-cdk-lib';

/**
 * Optional options for additional validation of the ARN.
 *
 * @export
 * @interface ValidateArnOptions
 * @typedef {ValidateArnOptions}
 */
export interface ValidateArnOptions {
  partition?: string;
  service?: string;
  region?: string;
  account?: string;
  resource?: string;
  resourceName?: string;
  /**
   * The format of the ARN.
   *
   * @default ArnFormat.SLASH_RESOURCE_NAME
   * @type {?ArnFormat}
   */
  format?: ArnFormat;
}

/**
 * Validate an arbitrary ARN. Options can be provided to validate specific parts of the ARN.
 *
 * @export
 * @param {string} arn
 * @param {ValidateArnOptions} options
 */
export function validateArn(arn: string, options?: ValidateArnOptions) {
  const {
    partition,
    service,
    region,
    account,
    resource,
    resourceName,
    format = ArnFormat.SLASH_RESOURCE_NAME,
  } = options ?? {};
  const arnParts = Arn.split(arn, format);
  if (partition && arnParts.partition !== partition) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the partition \"${partition}\" are supported.`,
    );
  }
  if (service && arnParts.service !== service) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the service \"${service}\" are supported.`,
    );
  }
  if (region && arnParts.region !== region) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the region \"${region}\" are supported.`,
    );
  }
  if (account && arnParts.account !== account) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the account \"${account}\" are supported.`,
    );
  }
  if (resource && arnParts.resource !== resource) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the resource \"${resource}\" are supported.`,
    );
  }
  if (resourceName && arnParts.resourceName !== resourceName) {
    throw new Error(
      `Invalid arn: ${arn}. Only ARNs matching the resource name \"${resourceName}\" are supported.`,
    );
  }
}
