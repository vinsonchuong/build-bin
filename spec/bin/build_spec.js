import Directory from 'directory-helpers';

async function writePlugin(name, stage) {
  await this.write({
    [`node_modules/${name}/package.json`]: {
      name, stage
    },
    [`node_modules/${name}/index.js`]: `
      module.exports = function() {
        console.log('${name}');
      };
    `
  });
}

async function build() {
  const output = await this.exec('npm', ['run', 'build']);
  return output.split('\n\n')[1].split('\n');
}

function withProject(test) {
  return async () => {
    const directory = new Directory('project');
    try {
      await test(directory);
    } finally {
      await directory.remove();
    }
  };
}

describe('build', () => {
  it('detects and sorts plugins by stage', withProject(async (project) => {
    await project.write({
      'package.json': {
        name: 'project',
        scripts: {
          build: 'build'
        },
        devDependencies: {
          'build-esnext': '^0.0.1',
          'build-compress': '^0.0.1',
          'build-styles': '^0.0.1'
        }
      }
    });
    await project::writePlugin('build-esnext', 'compile');
    await project::writePlugin('build-styles', 'compile');
    await project::writePlugin('build-compress', 'compress');

    expect(await project::build()).toEqual([
      'build-esnext',
      'build-styles',
      'build-compress'
    ]);
  }));

  it('ignores plugins that do not specify a stage', withProject(async (project) => {
    await project.write({
      'package.json': {
        name: 'project',
        scripts: {
          build: 'build'
        },
        devDependencies: {
          'build-esnext': '^0.0.1',
          'build-styles': '^0.0.1'
        }
      }
    });
    await project::writePlugin('build-esnext', 'compile');
    await project::writePlugin('build-styles');

    expect(await project::build()).toEqual([
      'build-esnext'
    ]);
  }));
});
