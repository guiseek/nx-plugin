export interface ConfigGeneratorSchema {
  name: string;
  tags?: string;
  project?: string;
  isGlobal?: boolean;
  envConfig?: string;
  directory?: string;
}

export interface ConfigGeneratorNormalizedSchema extends ConfigGeneratorSchema {
  configFileName: string;
  configConstName: string;
  configPropertyName: string;
  configClassName: string;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
