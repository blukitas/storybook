import type { Options, CoreConfig, Builder } from '@storybook/core-common';

async function getManagerBuilder(configDir: string) {
  const builderPackage = require.resolve('@storybook/manager-webpack5', { paths: [configDir] });
  const managerBuilder = await import(builderPackage);
  return managerBuilder;
}

async function getPreviewBuilder(builderName: string, configDir: string) {
  let builderPackage: string;
  if (builderName) {
    builderPackage = require.resolve(
      ['webpack5'].includes(builderName) ? `@storybook/builder-${builderName}` : builderName,
      { paths: [configDir] }
    );
  } else {
    builderPackage = require.resolve('@storybook/builder-webpack5');
  }
  const previewBuilder = await import(builderPackage);
  return previewBuilder;
}

export async function getBuilders({
  presets,
  configDir,
}: Options): Promise<Builder<unknown, unknown>[]> {
  const core = await presets.apply<CoreConfig>('core', undefined);
  const builderName = typeof core?.builder === 'string' ? core.builder : core?.builder?.name;

  return Promise.all([getPreviewBuilder(builderName, configDir), getManagerBuilder(configDir)]);
}
