import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { AuthnGeneratorSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: AuthnGeneratorSchema
): NormalizedSchema {
  const jwt = options.jwt ?? false;
  const name = names(options.name).fileName;
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
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    jwt,
  };
}
