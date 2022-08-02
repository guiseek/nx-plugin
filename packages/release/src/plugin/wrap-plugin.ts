import { getPathCommitHashes } from './git-utils';
import { getProjectChangePaths } from './nx-util';
import { Context } from 'semantic-release';

type ReleaseType = string;

type PluginConfig = Record<string, unknown>;

type PluginFunction = (
  pluginConfig: PluginConfig,
  context: Context
) => Promise<ReleaseType>;

export interface WrappedPluginConfig extends PluginConfig {
  project: string;
}

export const wrapPlugin = (plugin: PluginFunction) => {
  return async (
    { project, ...pluginConfig }: WrappedPluginConfig,
    context: Context
  ) => {
    const { commits, logger } = context;
    let filteredCommits = commits;

    if (!project) {
      logger.log(
        "Skipping filtering of commits; no 'project' in configuration..."
      );
    } else {
      logger.log(`Filtering commits to those affecting ${project}...`);

      const paths = await getProjectChangePaths(project);
      logger.log(`Resolved to paths: ${paths.join(', ')}...`);

      const from = context.lastRelease?.gitHead;
      const to = context.nextRelease?.gitHead;

      const hashes = await getPathCommitHashes(project, paths, from, to);

      filteredCommits = commits.filter((commit) => {
        const match = hashes.includes(commit.commit.long);
        if (match) {
          logger.log(
            `Including commit ${commit.commit.short}: ${commit.message}`
          );
        }
        return match;
      });
    }

    return await plugin(pluginConfig, { ...context, commits: filteredCommits });
  };
};
