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
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { libraryGenerator } from '@nrwl/nest';
import { ConfigGeneratorSchema } from './schema';
import { join } from 'path';

interface NormalizedSchema extends ConfigGeneratorSchema {
  configFileName: string;
  configConstName: string;
  configPropertyName: string;
  configClassName: string;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ConfigGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const isGlobal = options.isGlobal ?? false;

  const config = names(options.envConfig ?? 'env');
  const {
    fileName: configFileName,
    constantName: configConstName,
    propertyName: configPropertyName,
    className: configClassName,
  } = config;

  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    isGlobal,
    configFileName,
    configConstName,
    configPropertyName,
    configClassName,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.projectName),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const dirRootFiles = join(__dirname, 'root-files');
  generateFiles(tree, dirRootFiles, '.', templateOptions);

  const dirFiles = join(__dirname, 'files');
  generateFiles(tree, dirFiles, options.projectRoot, templateOptions);
}

function updateDependencies(tree: Tree) {
  const [deps, devDeps] = [
    { '@nestjs/config': '^2.2.0', 'js-yaml': '^4.1.0' },
    { '@types/js-yaml': '^4.0.5' },
  ];
  return addDependenciesToPackageJson(tree, deps, devDeps);
}

function addAssetToProjectConfiguration(
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

export default async function (tree: Tree, options: ConfigGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...options,
    standaloneConfig: true,
    buildable: true,
  });

  addFiles(tree, normalizedOptions);

  addAssetToProjectConfiguration(
    tree,
    normalizedOptions.project
      ? normalizedOptions.project
      : normalizedOptions.projectName,
    {
      input: 'config',
      glob: '**/*.yaml',
      output: 'config',
    }
  );

  await formatFiles(tree);

  return runTasksInSerial(updateDependencies(tree), () => {
    installPackagesTask(tree);
  });
}
