export interface AuthnGeneratorSchema {
  name: string;
  jwt?: boolean;
  tags?: string;
  prefix?: string;
  directory?: string;
}
export interface NormalizedSchema extends AuthnGeneratorSchema {
  jwt: boolean;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
export interface PrefixSchema {
  componentPrefix: string;
  directivePrefix: string;
}
