import { names, offsetFromRoot } from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export function normalizeTemplateOptions(options: NormalizedSchema) {
  return {
    ...options,
    ...names(options.project),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    dot: '.',
  };
}
