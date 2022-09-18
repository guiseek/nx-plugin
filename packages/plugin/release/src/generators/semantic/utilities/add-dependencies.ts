import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';

export function addDependencies(tree: Tree, deps = {}, devDeps = {}) {
  addDependenciesToPackageJson(tree, deps, devDeps);
}
