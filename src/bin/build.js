/* eslint-disable global-require */
import {run} from 'esnext-async';
import Directory from 'directory-helpers';

const project = new Directory('.');

run(async () => {
  const packageJson = await project.read('package.json');

  const plugins = Object.keys(packageJson.devDependencies)
    .filter((dependency) => dependency.startsWith('build-'));
  const pluginTypes = {
    compile: [],
    compress: []
  };
  for (const plugin of plugins) {
    const {stage} = require(await project.resolve(`${plugin}/package.json`));
    if (stage in pluginTypes) {
      pluginTypes[stage].push(plugin);
    }
  }
  for (const pluginGroup of Object.values(pluginTypes)) {
    for (const plugin of pluginGroup) {
      require(await project.resolve(plugin))();
    }
  }
});
