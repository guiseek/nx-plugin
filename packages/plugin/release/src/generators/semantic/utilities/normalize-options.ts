import { Tree, getWorkspaceLayout, readProjectConfiguration } from '@nx/devkit';
import { NormalizedSchema, SemanticReleaseGeneratorSchema } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: SemanticReleaseGeneratorSchema
): NormalizedSchema {
  const config = readProjectConfiguration(tree, options.project);

  const { libsDir } = getWorkspaceLayout(tree);

  const distPath = `dist/${libsDir}/${options.project}`;
  const outputPath = config.targets.build.options.outputPath;

  const projectDist = outputPath ?? distPath;
  const projectRoot = config.root;

  return { ...options, projectRoot, projectDist };
}
