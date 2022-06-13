import { isAbsolute, resolve, join } from 'path';
import { existsSync, copySync } from 'fs-extra';
import { BundleProp } from './types';

export function copyFiles(bundle: BundleProp | undefined, srcPath: string, buildPath: string) {
  if (!bundle) return;
  if (typeof bundle === 'boolean') return;
  if (!bundle.copyFiles) return;

  bundle.copyFiles.forEach(entry => {
    const fromPath = join(srcPath, entry.from);
    if (!existsSync(fromPath))
      throw new Error(
        `Tried to copy nonexistent file from "${resolve(fromPath)}" - check copyFiles entry "${
          entry.from
        }"`,
      );
    const to = entry.to || entry.from;
    if (isAbsolute(to)) throw new Error(`Copy destination path "${to}" must be relative`);
    const toPath = join(buildPath, to);
    copySync(fromPath, toPath);
  });
}

export function normalizeSrcPath(srcPath: string): string {
  return srcPath.replace(/\/+$/, '');
}

export function validateBundle(id: string, srcPath: string, bundle?: BundleProp): BundleProp {
  const retBundle = bundle === undefined ? true : bundle;
  if (!retBundle && srcPath === '.') {
    throw new Error(
      `Bundle cannot be disabled for the "${id}" function since the "srcPath" is set to the project root.`,
    );
  }

  return retBundle;
}
