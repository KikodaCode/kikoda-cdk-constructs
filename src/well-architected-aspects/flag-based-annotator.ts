import { Annotations } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * Feature flags to enable specific aspect behavior.
 */
export enum WellArchitectedAspectsFeatureFlags {
  /** Enable X-Ray Tracing for Lambda functions */
  ENABLE_X_RAY_TRACING = 'well-architected-aspects:enableActiveXRayTracing',

  /** Define the behavior for regarding public access policies on S3 Buckets */
  BLOCK_PUBLIC_BUCKETS = 'well-architected-aspects:blockPublicBuckets',
}

/**
 * Level of the annotation entry to write.
 */
export enum FlagLevel {
  /** Info level annotation. */
  INFO = 'info',
  /** Warning level annotation. Causes failure when run in --strict mode. */
  WARN = 'warn',
  /** Error level annotation. Causes failure when run. */
  ERROR = 'error',
  /** Auto-fix warning level annotation. */
  FIX = 'fix',
}

/**
 * Write annotations under the given feature flag using the derived flag level.
 */
export class FlagBasedAnnotator {
  /** Level of the annotation entry to write. */
  public readonly flagLevel: FlagLevel;

  private readonly scope: IConstruct;

  constructor(scope: IConstruct, featureFlag: WellArchitectedAspectsFeatureFlags) {
    this.scope = scope;
    this.flagLevel = scope.node.tryGetContext(featureFlag);
  }

  /**
   * Adds a metadata entry with the derived `flagLevel` to this construct.
   *
   * The CLI will display the message when the app is synthesized, potentially
   * failing depending on the `flagLevel`.
   *
   * @param message The message to display.
   */
  public annotate(message: string) {
    const addEntry = {
      [FlagLevel.INFO]: (scope: IConstruct, msg: string) => Annotations.of(scope).addInfo(msg),
      [FlagLevel.WARN]: (scope: IConstruct, msg: string) => Annotations.of(scope).addWarning(msg),
      [FlagLevel.ERROR]: (scope: IConstruct, msg: string) => Annotations.of(scope).addError(msg),
      [FlagLevel.FIX]: (scope: IConstruct, msg: string) =>
        Annotations.of(scope).addWarning(`[AUTOFIX] ${msg}`),
    }[this.flagLevel];

    addEntry(this.scope, message);
  }
}
