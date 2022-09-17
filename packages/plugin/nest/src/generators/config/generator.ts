import { Tree, formatFiles, generateFiles } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/nest';
import { join } from 'path';
import {
  normalizeOptions,
  addAssetToProject,
  updateDependencies,
  normalizeTemplateOptions,
} from './utilities';
import { ConfigGeneratorSchema } from './schema';

export default async function (tree: Tree, options: ConfigGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
    standaloneConfig: true,
    buildable: true,
  });

  const templateOptions = normalizeTemplateOptions(normalizedOptions);
  generateFiles(tree, join(__dirname, 'root-files'), '.', templateOptions);
  generateFiles(
    tree,
    join(__dirname, 'files'),
    normalizedOptions.projectRoot,
    templateOptions
  );

  addAssetToProject(
    tree,
    normalizedOptions.project
      ? normalizedOptions.project
      : normalizedOptions.projectName,
    {
      input: 'config',
      glob: '**/*.yaml',
      output: 'config',
    }
  );

  await formatFiles(tree);

  return updateDependencies(tree, [
    { '@nestjs/config': '^2.2.0', 'js-yaml': '^4.1.0' },
    { '@types/js-yaml': '^4.0.5' },
  ]);
}
