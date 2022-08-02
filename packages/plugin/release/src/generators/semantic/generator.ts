import {
  Tree,
  names,
  formatFiles,
  generateFiles,
  offsetFromRoot,
  getWorkspaceLayout,
  installPackagesTask,
  readProjectConfiguration,
  updateProjectConfiguration,
  addDependenciesToPackageJson,
} from '@nrwl/devkit';
import { join } from 'path';
import { SemanticReleaseGeneratorSchema, NormalizedSchema } from './schema';

function normalizeOptions(
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

function addConfig(tree: Tree, options: NormalizedSchema) {
  const config = readProjectConfiguration(tree, options.project);

  const { build } = config.targets;

  if (config.projectType !== 'library' || !build) {
    throw 'This generator can only be run against buildable libraries.';
  }

  addDependenciesToPackageJson(tree, {}, { 'semantic-release': '~19.0.3' });

  config.targets.release = {
    executor: '@nrwl/workspace:run-commands',
    options: {
      command: `npx semantic-release -e ./${config.root}/.releaserc.json`,
    },
  };

  updateProjectConfiguration(tree, options.project, config);
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const offset = offsetFromRoot(options.projectRoot);
  const values = names(options.project);
  const tmplOpts = {
    ...options,
    ...values,
    offsetFromRoot: offset,
    template: '',
    dot: '.',
  };

  const dirRootFiles = join(__dirname, 'root-files');
  if (!tree.exists('.releaserc.json')) {
    generateFiles(tree, dirRootFiles, '.', tmplOpts);
  }

  const dirFiles = join(__dirname, 'files');
  generateFiles(tree, dirFiles, options.projectRoot, tmplOpts);
}

export default async function (
  tree: Tree,
  options: SemanticReleaseGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  addConfig(tree, normalizedOptions);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
