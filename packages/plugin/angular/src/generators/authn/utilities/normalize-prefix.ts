import {
  Tree,
  names,
  ProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit';
import { PrefixSchema } from '../schema';

interface AngularProjectConfiguration extends ProjectConfiguration {
  prefix: string;
}

export function normalizePrefix(tree: Tree, projectName: string): PrefixSchema {
  const project = readProjectConfiguration(
    tree,
    projectName
  ) as AngularProjectConfiguration;

  const prefix = names(project.prefix);

  return {
    componentPrefix: prefix.fileName,
    directivePrefix: prefix.propertyName,
  };
}
