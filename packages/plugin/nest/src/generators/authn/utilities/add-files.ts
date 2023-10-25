import { generateFiles, names, offsetFromRoot, Tree } from '@nx/devkit';
import { NormalizedSchema } from '../schema';
import { join } from 'path';

export function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.projectName),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'default'),
    options.projectRoot,
    templateOptions
  );

  if (options.jwt) {
    generateFiles(
      tree,
      join(__dirname, '..', 'files', 'jwt'),
      options.projectRoot,
      templateOptions
    );
  }
}
