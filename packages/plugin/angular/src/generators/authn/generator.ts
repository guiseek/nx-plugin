import { Tree, formatFiles } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { normalizeOptions, normalizePrefix, addFiles } from './utilities';
import { AuthnGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AuthnGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, normalizedOptions);

  const prefixOptions = normalizePrefix(tree, normalizedOptions.projectName);

  addFiles(tree, { ...normalizedOptions, ...prefixOptions });

  return formatFiles(tree);
}
