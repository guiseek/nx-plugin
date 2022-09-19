export interface AuthGeneratorSchema {
  name: string;
  jwt?: boolean;
  tags?: string;
  directory?: string;
}
export interface NormalizedSchema extends AuthGeneratorSchema {
  jwt: boolean;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
