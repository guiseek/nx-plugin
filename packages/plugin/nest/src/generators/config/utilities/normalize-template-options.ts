import { names, offsetFromRoot } from '@nx/devkit';
import { ConfigGeneratorNormalizedSchema } from '../schema';

export function normalizeTemplateOptions(
  options: ConfigGeneratorNormalizedSchema
) {
  return {
    ...options,
    ...names(options.projectName),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
}
