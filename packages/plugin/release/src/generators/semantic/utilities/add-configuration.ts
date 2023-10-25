import {
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export function addConfiguration(tree: Tree, options: NormalizedSchema) {
  const config = readProjectConfiguration(tree, options.project);

  const { build } = config.targets;

  if (config.projectType !== 'library' || !build) {
    throw 'This generator can only be run against buildable libraries.';
  }

  config.targets.release = {
    executor: '@nx/workspace:run-commands',
    options: {
      command: `npx semantic-release -e ./${config.root}/.releaserc.json`,
    },
  };

  updateProjectConfiguration(tree, options.project, config);
}
