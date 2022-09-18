import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { SemanticReleaseGeneratorSchema } from './schema';
import {
  Tree,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit';
import generator from './generator';

describe('semantic generator', () => {
  let appTree: Tree;
  const options: SemanticReleaseGeneratorSchema = { project: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(appTree, 'test', {
      root: 'packages/test',
      projectType: 'library',
      targets: {
        build: {
          executor: '@nrwl/node:package',
          options: {
            outputPath: 'dist/packages/test',
          },
        },
      },
    });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');

    expect(config.targets.release).toBeDefined();
    expect(appTree.exists('packages/test/.releaserc.json')).toBeTruthy();
  });
});
