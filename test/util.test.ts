import { resolve } from 'path';
import { defineSynthCommands } from '../src/utils/util';

describe('defineSynthCommands', () => {
  it('properly handles npm manager', () => {
    expect(
      defineSynthCommands(
        undefined,
        undefined,
        resolve(__dirname, './test-configs/package.json'),
      ).join(', '),
    ).toMatch('npm run');
    expect(
      defineSynthCommands(
        undefined,
        'test',
        resolve(__dirname, './test-configs/package.json'),
      ).join(', '),
    ).toMatch('-- -o test');
  });
  it('synthOutputDir', () => {
    const commands = defineSynthCommands(
      undefined,
      'test',
      resolve(__dirname, './test-configs/yarn.lock'),
    );
    expect(commands.join(', ')).toMatch('-o test');
  });
  it('baseDir', () => {
    const commands = defineSynthCommands('test');
    expect(commands.join(', ')).toMatch('cd test');
  });

  it('no install required', () => {
    const commands = defineSynthCommands(
      undefined,
      undefined,
      resolve(__dirname, './test-configs/package.json'),
      false,
    );
    expect(commands.join(', ')).not.toMatch('install');
  });
});
