export interface SemanticReleaseGeneratorSchema {
  project: string;
  name?: string;
  dist?: string;
  directory?: string;
}

export interface Schema {
  project: string;
}

export interface NormalizedSchema extends Schema {
  projectRoot: string;
  projectDist: string;
}
