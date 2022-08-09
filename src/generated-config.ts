/* eslint-disable @typescript-eslint/no-require-imports */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
// import { DefaultConfigDir } from './constants';
// @ts-ignore
import md5 = require('md5');
import { LayeredConfig } from './layered-config';

const SUPPORTED_CONFIG_EXTENSIONS = ['.json', '.js', '.ts'];

export const DefaultConfigDir: string = 'config';

export interface GeneratedConfigProps {
  /**
   * Target deployment stage
   */
  readonly stage: string;

  /**
   * Full absolute path of the service/app
   */
  readonly servicePath: string;

  /** path relative to servicePath where *.config.* files are stored */
  readonly configDir?: string;

  /**
   * Base config file name (if applicable)
   *
   * @default `base.config.ts`
   */
  readonly baseConfigFileName?: string;

  /** write the generated config file to a directory; relative to servicePath */
  readonly outDir?: string;

  /** Provide any additional configuration items to add to the generated configuration file. This
   * will be added to the config as the `additionalConfig` attribute.
   */
  readonly additionalConfig?: any;
}

export interface IAdditionalConfig {
  readonly additionalConfig?: any;
}

export class GeneratedConfig<T extends IAdditionalConfig> {
  /** Represents the generated config object */
  public config: T;

  /** Represents the eventual generated output file name */
  public fileName: string;

  private readonly props: GeneratedConfigProps;

  constructor(props: GeneratedConfigProps) {
    this.props = props;

    // generate config
    this.config = this.generate();

    // set filename as md5 of contents
    this.fileName = `${md5(JSON.stringify(this.config))}.config.json`;

    // optionally write to file
    if (props.outDir) this.writeToFile();
  }

  private generate = (): T => {
    const configDir = `${this.props.servicePath}/${this.props.configDir ?? DefaultConfigDir}`;
    const baseConfigFilePath = `${configDir}/${this.props.baseConfigFileName ?? 'base.config.ts'}`;
    const stageConfigFilePath = `${configDir}/${this.props.stage}.config`;

    let finalConfig;
    let baseConfig;
    let stageConfig;

    if (
      SUPPORTED_CONFIG_EXTENSIONS.map(ext =>
        existsSync(`${baseConfigFilePath.replace(ext, '')}${ext}`),
      ).reduce((prev, curr) => prev || curr, false)
    ) {
      baseConfig = require(baseConfigFilePath);
      baseConfig = baseConfig.default || baseConfig;
    } else {
      console.log(
        `No base config found... skipping inheritence. Expected to find ${baseConfigFilePath}`,
      );
    }

    if (
      SUPPORTED_CONFIG_EXTENSIONS.map(ext => existsSync(`${stageConfigFilePath}${ext}`)).reduce(
        (prev, curr) => prev || curr,
        false,
      )
    ) {
      stageConfig = require(stageConfigFilePath);
      stageConfig = stageConfig.default || stageConfig;
    } else {
      console.log(
        `Missing config file for stage: ${this.props.stage}. Expected ${stageConfigFilePath}... moving on without config`,
      );
    }

    // layer configs and add additional config
    finalConfig = new LayeredConfig({}, baseConfig, stageConfig, {
      additionalConfig: this.props.additionalConfig ?? {},
    });

    return finalConfig as T;
  };

  private writeToFile = () => {
    const fullDestinationPath = `${this.props.servicePath}/${this.props.outDir}`;

    if (!existsSync(fullDestinationPath)) mkdirSync(fullDestinationPath, { recursive: true });

    writeFileSync(`${fullDestinationPath}/${this.fileName}`, JSON.stringify(this.config, null, 2));
  };
}
