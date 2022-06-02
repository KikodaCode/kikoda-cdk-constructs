import { existsSync } from 'fs';
import { tmpdir } from 'os';
import { resolve } from 'path';
import { v4 as uuid } from 'uuid';
import { GeneratedConfig } from '../GeneratedConfig';

describe('GeneratedConfig', () => {
  test('config writes to file when outDir provided', () => {
    const outDir = uuid();
    const configToFile = new GeneratedConfig({
      stage: 'unitTest',
      servicePath: tmpdir(),
      outDir,
    });

    expect(existsSync(`${tmpdir()}/${outDir}/${configToFile.fileName}`)).toBe(true);
  });

  describe('supported config extensions', () => {
    type InheritedConfig = {
      baseConfigValue?: boolean;
      stageConfigValue?: boolean;
      additionalConfig?: object;
    };

    test('json files', () => {
      const inheritedJSONConfig = new GeneratedConfig<InheritedConfig>({
        stage: 'unitTestInheritedJson',
        servicePath: resolve(__dirname, '../'),
        configDir: 'test_configs',
        baseConfigFileName: 'base.config.json',
        additionalConfig: {
          hasValue: true,
        },
      });

      expect(inheritedJSONConfig.config.baseConfigValue).toBe(true);
      expect(inheritedJSONConfig.config.stageConfigValue).toBe(true);
      expect(inheritedJSONConfig.config.additionalConfig).not.toBeNull();
    });

    test('JS files', () => {
      const inheritedJSConfig = new GeneratedConfig<InheritedConfig>({
        stage: 'unitTestInheritedJs',
        servicePath: resolve(__dirname, '../'),
        configDir: 'test_configs',
        baseConfigFileName: 'base.config.js',
        additionalConfig: {
          hasValue: true,
        },
      });

      expect(inheritedJSConfig.config.baseConfigValue).toBe(true);
      expect(inheritedJSConfig.config.stageConfigValue).toBe(true);
      expect(inheritedJSConfig.config.additionalConfig).not.toBeNull();
    });

    test('TS files', () => {
      const inheritedTSConfig = new GeneratedConfig<InheritedConfig>({
        stage: 'unitTestInheritedTs',
        servicePath: resolve(__dirname, '../'),
        configDir: 'test_configs',
        baseConfigFileName: 'base.config.ts',
        additionalConfig: {
          hasValue: true,
        },
      });

      expect(inheritedTSConfig.config.baseConfigValue).toBe(true);
      expect(inheritedTSConfig.config.stageConfigValue).toBe(true);
      expect(inheritedTSConfig.config.additionalConfig).not.toBeNull();
    });
  });

  test('still returns base config when no stage config present', () => {
    type OnlyBaseConfig = {
      baseConfigValue?: boolean;
      additionalConfig: {
        hasValue: boolean;
      };
    };

    const nonExistentStageConfig = new GeneratedConfig<OnlyBaseConfig>({
      stage: 'nonExistentStage',
      servicePath: resolve(__dirname, '../'),
      configDir: 'test_configs',
      baseConfigFileName: 'base.config.ts',
      additionalConfig: {
        hasValue: true,
      },
    });

    expect(nonExistentStageConfig.config.baseConfigValue).toBe(true);
    expect(nonExistentStageConfig.config.additionalConfig.hasValue).toBe(true);
  });
});
