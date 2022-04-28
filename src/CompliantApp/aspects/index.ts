/* eslint-disable default-case */
/**
 * Well Architected Framework CDK Aspects
 * https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
 * */

import { Annotations } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

export enum WellArchitectedAspectsFeatureFlags {
  /** Enable X-Ray Tracing for Lambda functions */
  EnableXRayTracing = 'well-architected-aspects:enableActiveXRayTracing',

  /** Define the behavior for regarding public access policies on S3 Buckets */
  BlockPublicBuckets = 'well-architected-aspects:blockPublicBuckets',
}

export enum FlagLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FIX = 'fix',
}

export class FlagBasedAnnotator {
  public flagLevel: FlagLevel;

  private scope: IConstruct;

  constructor(
    scope: IConstruct,
    featureFlag: WellArchitectedAspectsFeatureFlags,
  ) {
    this.scope = scope;
    this.flagLevel = scope.node.tryGetContext(featureFlag);
  }

  public annotate = (message: string) => {
    switch (this.flagLevel) {
      case FlagLevel.INFO:
        Annotations.of(this.scope).addInfo(message);
        break;
      case FlagLevel.WARN:
        Annotations.of(this.scope).addWarning(message);
        break;
      case FlagLevel.ERROR:
        Annotations.of(this.scope).addError(message);
        break;
      case FlagLevel.FIX:
        Annotations.of(this.scope).addWarning(`[AUTOFIX] ${message}`);
        break;
    }
  };
}

export * from './costOptimization';
export * from './operationalExcellence';
export * from './performanceEfficiency';
export * from './reliability';
export * from './security';
export * from './sustainability';
