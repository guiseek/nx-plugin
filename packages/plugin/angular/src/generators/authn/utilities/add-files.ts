import { generateFiles, names, offsetFromRoot, Tree } from '@nx/devkit';
import { NormalizedSchema, PrefixSchema } from '../schema';
import { join } from 'path';

export function addFiles(tree: Tree, options: NormalizedSchema & PrefixSchema) {
  const templateOptions = {
    ...options,
    ...names(options.projectName),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    tree,
    join(__dirname, '..', 'files'),
    options.projectRoot,
    templateOptions
  );
}
