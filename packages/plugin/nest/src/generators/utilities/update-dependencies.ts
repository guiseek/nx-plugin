import { runTasksInSerial } from '@nx/devkit';
import { NodePackages } from '../types/node-package';
import {
  Tree,
  installPackagesTask,
  addDependenciesToPackageJson,
} from '@nx/devkit';

export function updateDependencies(
  tree: Tree,
  [deps, devDeps]: [NodePackages, NodePackages]
) {
  return runTasksInSerial(
    addDependenciesToPackageJson(tree, deps, devDeps),
    () => installPackagesTask(tree)
  );
}
