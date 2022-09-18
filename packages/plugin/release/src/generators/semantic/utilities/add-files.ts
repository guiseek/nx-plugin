import { normalizeTemplateOptions } from './normalize-template-options';
import { generateFiles, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';
import { join } from 'path';

export function addFiles(tree: Tree, options: NormalizedSchema) {
  const tmplOpts = normalizeTemplateOptions(options);
  const dirFiles = join(__dirname, '..', 'files');
  generateFiles(tree, dirFiles, options.projectRoot, tmplOpts);
}
