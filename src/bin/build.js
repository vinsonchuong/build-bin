import {run} from 'esnext-async';
import Directory from 'directory-helpers';

const project = new Directory('.');

run(async () => {
  const packageJson = await project.read('package.json');

  const plugins = Object.keys(packageJson.devDependencies)
    .filter((dependency) => dependency.startsWith('build-'));

  for (const plugin of plugins) {
    require(await project.resolve(plugin));
  }
});
