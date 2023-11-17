import {
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export function addConfiguration(tree: Tree, options: NormalizedSchema) {
  const config = readProjectConfiguration(tree, options.project);

  if (config.projectType !== 'library' || !config.targets.build) {
    throw 'This generator can only be run against buildable libraries.';
  }

  if (!config.targets.release) {
    throw 'There is already a release target.';
  }

  config.targets.release = {
    command: `npx semantic-release -e ./${config.root}/.releaserc.json`,
  };

  updateProjectConfiguration(tree, options.project, config);
}
