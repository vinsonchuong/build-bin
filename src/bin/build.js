/* eslint-disable global-require */
import {run} from 'esnext-async';
import Directory from 'directory-helpers';

const project = new Directory('.');

run(async () => {
  await project.remove('dist');

  const packageJson = await project.read('package.json');

  const plugins = Object.keys(packageJson.devDependencies)
    .filter((dependency) => dependency.startsWith('build-'));
  const pluginTypes = {
    compile: [],
    compress: [],
    config: []
  };
  for (const plugin of plugins) {
    const {stage} = require(await project.resolve(`${plugin}/package.json`));
    if (stage in pluginTypes) {
      pluginTypes[stage].push(plugin);
    }
  }
  for (const pluginGroup of Object.values(pluginTypes)) {
    for (const plugin of pluginGroup) {
      await require(await project.resolve(plugin)).default();
    }
  }
});
