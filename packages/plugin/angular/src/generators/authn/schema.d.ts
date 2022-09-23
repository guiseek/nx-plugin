export interface AuthnGeneratorSchema {
  name: string;
  tags?: string;
  prefix?: string;
  directory?: string;
}
export interface NormalizedSchema extends AuthnGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
export interface PrefixSchema {
  componentPrefix: string;
  directivePrefix: string;
}
