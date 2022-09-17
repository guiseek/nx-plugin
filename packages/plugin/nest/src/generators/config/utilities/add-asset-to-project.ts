import {
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export function addAssetToProject(
  tree: Tree,
  project: string,
  assetInput: Record<string, string>
) {
  const configuration = readProjectConfiguration(tree, project);

  if (configuration.targets['build']['options']['assets']) {
    configuration.targets['build']['options']['assets'].push(assetInput);
  }

  updateProjectConfiguration(tree, project, configuration);
}
