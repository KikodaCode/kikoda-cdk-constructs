import { existsSync } from 'fs';
import { dirname, join, parse, resolve } from 'path';

/**
 * Find the lowest of multiple files by walking up parent directories. If
 * multiple files exist at the same level, they will all be returned.
 */
export function findUpMultiple(names: string[], directory: string = process.cwd()): string[] {
  const absoluteDirectory = resolve(directory);

  const files = [];
  for (const name of names) {
    const file = join(directory, name);
    if (existsSync(file)) {
      files.push(file);
    }
  }

  if (files.length > 0) {
    return files;
  }

  const { root } = parse(absoluteDirectory);
  if (absoluteDirectory === root) {
    return [];
  }

  return findUpMultiple(names, dirname(absoluteDirectory));
}
