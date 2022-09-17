import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { NodePackages } from '../../types/node-package';
import {
  Tree,
  installPackagesTask,
  addDependenciesToPackageJson,
} from '@nrwl/devkit';

export function updateDependencies(
  tree: Tree,
  [deps, devDeps]: [NodePackages, NodePackages]
) {
  return runTasksInSerial(
    addDependenciesToPackageJson(tree, deps, devDeps),
    () => installPackagesTask(tree)
  );
}
