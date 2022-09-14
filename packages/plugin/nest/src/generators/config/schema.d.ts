export interface ConfigGeneratorSchema {
  name: string;
  tags?: string;
  project?: string;
  isGlobal?: boolean;
  envConfig?: string;
  directory?: string;
}
