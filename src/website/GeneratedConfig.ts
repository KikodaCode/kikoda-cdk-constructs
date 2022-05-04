/* eslint-disable @typescript-eslint/no-require-imports */
import { existsSync, mkdirSync, writeFileSync } from "fs";
// import { DefaultConfigDir } from './constants';
import md5 = require("md5");

export const DefaultConfigDir: string = "config";

export interface GeneratedConfigProps {
  /** target deployment stage */
  readonly stage: string;

  /** full absolute path of the service/app */
  readonly servicePath: string;

  /** path relative to servicePath where *.config.json files are stored */
  readonly configDir?: string;

  /** write the generated config file to a directory; relative to servicePath */
  readonly outDir?: string;

  /** Provide any additional configuration items to add to the generated configuration file. This
   * will be added to the config as the `additionalConfig` attribute.
   */
  readonly additionalConfig?: object;
}

interface AdditionalConfig {
  additionalConfig?: object;
}

export class GeneratedConfig<T extends AdditionalConfig> {
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
    const configDir = `${this.props.servicePath}/${
      this.props.configDir ?? DefaultConfigDir
    }`;
    const baseConfigFilePath = `${configDir}/base.config.js`;
    const stageConfigFilePath = `${configDir}/${this.props.stage}.config.js`;

    let finalConfig = {};

    if (existsSync(baseConfigFilePath)) {
      const baseConfig = require(baseConfigFilePath);
      finalConfig = Object.assign({}, finalConfig, baseConfig);
    } else {
      console.log(
        `No base config found... skipping inheritence. Expected to find ${baseConfigFilePath}`
      );
    }

    if (existsSync(stageConfigFilePath)) {
      // layer config
      const stageConfig = require(stageConfigFilePath);
      finalConfig = Object.assign({}, finalConfig, stageConfig, {
        additionalConfig: this.props.additionalConfig,
      });

      return finalConfig as T;
    } else {
      throw new Error(
        `Missing config file for stage: ${this.props.stage}. Expected ${stageConfigFilePath}`
      );
    }
  };

  private writeToFile = () => {
    const fullDestinationPath = `${this.props.servicePath}/${this.props.outDir}`;

    if (!existsSync(fullDestinationPath))
      mkdirSync(fullDestinationPath, { recursive: true });

    writeFileSync(
      `${fullDestinationPath}/${this.fileName}`,
      JSON.stringify(this.config, null, 2)
    );
  };
}
