import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { SemanticReleaseGeneratorSchema } from './schema';
import generator from './generator';
import {
  Tree,
  readJson,
  writeJson,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit';

describe('semantic generator', () => {
  let appTree: Tree;
  const options: SemanticReleaseGeneratorSchema = { project: 'test' };

  beforeEach(() => {
    //
    appTree = createTreeWithEmptyWorkspace();

    // prettier-ignore
    addProjectConfiguration(
      appTree,
      'test',
      { root: 'packages/test', projectType: 'library', targets: {
          build: { executor: '@nrwl/node:package', options: {
            outputPath: 'dist/packages/test' } } }
      }
    );
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');

    expect(config.targets.release).toBeDefined();
    expect(appTree.exists('.releaserc.json')).toBeTruthy();
    expect(appTree.exists('packages/test/.releaserc.json')).toBeTruthy();
  });

  it('should skip root .releaserc.json if present', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    const releaseConfig = { value: 'a' };
    writeJson(appTree, '.releaserc.json', releaseConfig);

    expect(config.targets.release).toBeDefined();
    expect(readJson(appTree, '.releaserc.json')).toMatchObject(releaseConfig);
  });
});
