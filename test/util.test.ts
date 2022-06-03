import { defineSynthCommands } from '../src/util';

describe('defineSynthCommands', () => {
  it('properly handles npm manager', () => {
    expect(defineSynthCommands('npm').join(', ')).toMatch('npm run');
    expect(defineSynthCommands('npm', undefined, 'test').join(', ')).toMatch('-- -o test');
  });
  it('synthOutputDir', () => {
    const commands = defineSynthCommands(undefined, undefined, 'test');
    expect(commands.join(', ')).toMatch('-o test');
  });
  it('baseDir', () => {
    const commands = defineSynthCommands(undefined, 'test');
    expect(commands.join(', ')).toMatch('cd test');
  });

  it('no install required', () => {
    const commands = defineSynthCommands(undefined, undefined, undefined, false);
    expect(commands.join(', ')).not.toMatch('install');
  });
});
