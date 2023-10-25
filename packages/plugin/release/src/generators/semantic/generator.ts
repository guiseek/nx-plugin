import { Tree, formatFiles, installPackagesTask } from '@nx/devkit';
import { SemanticReleaseGeneratorSchema } from './schema';
import {
  addFiles,
  addDependencies,
  addConfiguration,
  normalizeOptions,
} from './utilities';

export default async function (
  tree: Tree,
  options: SemanticReleaseGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  addConfiguration(tree, normalizedOptions);

  const devDeps = {
    'semantic-release': '^17.4.2',
    '@semantic-release/changelog': '^5.0.1',
    '@semantic-release/commit-analyzer': '^8.0.1',
    '@semantic-release/exec': '^5.0.0',
    '@semantic-release/git': '^9.0.0',
    '@semantic-release/github': '^7.2.2',
    '@semantic-release/npm': '^7.1.3',
    '@semantic-release/release-notes-generator': '^9.0.2',
  };

  addDependencies(tree, {}, devDeps);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
