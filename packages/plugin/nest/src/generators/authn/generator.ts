import { Tree, formatFiles } from '@nx/devkit';
import { libraryGenerator } from '@nx/nest';
import { NodePackages } from '../types/node-package';
import { normalizeOptions, addFiles } from './utilities';
import { updateDependencies } from '../utilities';
import { AuthnGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AuthnGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
    standaloneConfig: true,
    buildable: true,
  });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  const deps: NodePackages = {
    '@nestjs/passport': '^9.0.0',
    'passport-local': '^1.0.0',
    'class-transformer': '^0.5.1',
    'class-validator': '^0.13.2',
    passport: '^0.6.0',
    bcrypt: '^5.0.1',
  };
  const devDeps: NodePackages = { '@types/passport-local': '^1.0.34' };

  if (normalizedOptions.jwt) {
    deps['@nestjs/jwt'] = '^9.0.0';
    deps['passport-jwt'] = '^4.0.0';
    devDeps['@types/passport-jwt'] = '^3.0.6';
    devDeps['@types/bcrypt'] = '^5.0.0';
  }

  return updateDependencies(tree, [deps, devDeps]);
}
