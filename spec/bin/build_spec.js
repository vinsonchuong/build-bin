import Directory from 'directory-helpers';

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
  it('detects plugins', withProject(async (project) => {
    await project.write({
      'package.json': {
        name: 'project',
        scripts: {
          build: 'build'
        },
        devDependencies: {
          "build-esnext": "^0.0.1",
          "build-styles": "^0.0.1"
        }
      },

      'node_modules/build-esnext/package.json': {
        name: 'build-esnext'
      },
      'node_modules/build-esnext/index.js': `
        console.log('build-esnext');
      `,

      'node_modules/build-styles/package.json': {
        name: 'build-styles'
      },
      'node_modules/build-styles/index.js': `
        console.log('build-styles');
      `
    });

    expect(await project.exec('build')).toBe([
      'build-esnext',
      'build-styles'
    ].join('\n'));
  }));
});
