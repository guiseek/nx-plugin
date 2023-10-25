import { convertNxGenerator } from '@nx/devkit';
import generator from './generator';

const generatorSchematic = convertNxGenerator(generator);

export default generatorSchematic;

export { generatorSchematic };
