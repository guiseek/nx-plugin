import {
  Tree,
  getWorkspaceLayout,
  readProjectConfiguration,
} from '@nrwl/devkit';
import {
  NormalizedSchema,
  SemanticReleaseGeneratorSchema,
} from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: SemanticReleaseGeneratorSchema
): NormalizedSchema {
  const config = readProjectConfiguration(tree, options.project);

  const { libsDir } = getWorkspaceLayout(tree);

  const { build } = config.targets;

  const projectDist = `dist/${libsDir}/${options.project}`;

  return {
    ...options,
    projectRoot: config.root,
    projectDist: build.options.outputPath ?? projectDist,
  };
}
