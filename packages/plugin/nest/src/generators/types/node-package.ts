export type PackageVersionPrefix = `^` | '~' | '';
export type PackageVersion =
  | `${PackageVersionPrefix}${number}.${number}.${number}`
  | `${PackageVersionPrefix}${number}.${number}`
  | `${PackageVersionPrefix}${number}`
  | `latest`;

export type NodePackages = Record<string, PackageVersion>;
