import { convertNxGenerator } from '@nrwl/devkit';
import generator from './generator';

const generatorSchematic = convertNxGenerator(generator);

export default generatorSchematic;

export { generatorSchematic };
