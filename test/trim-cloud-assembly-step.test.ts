import { TrimCloudAssemblyStep } from '../src/trim-cloud-assembly-step';

describe('TrimCloudAssemblyStep', () => {
  it('should create without error.', () => {
    const step = new TrimCloudAssemblyStep('someStack', 'yoooo');
    expect(step.commands).not.toBeNull;
  });
});
