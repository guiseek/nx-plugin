import { getWorkspaceLayout, names, Tree } from '@nx/devkit';
import {
  ConfigGeneratorNormalizedSchema,
  ConfigGeneratorSchema,
} from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: ConfigGeneratorSchema
): ConfigGeneratorNormalizedSchema {
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
