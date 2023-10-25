import { addDependenciesToPackageJson, Tree } from '@nx/devkit';

export function addDependencies(tree: Tree, deps = {}, devDeps = {}) {
  addDependenciesToPackageJson(tree, deps, devDeps);
}
