import { names as makeNames, offsetFromRoot as offset } from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export function normalizeTemplateOptions(options: NormalizedSchema) {
  const offsetFromRoot = offset(options.projectRoot);
  const names = makeNames(options.project);
  return { ...options, ...names, offsetFromRoot, template: '', dot: '.' };
}
