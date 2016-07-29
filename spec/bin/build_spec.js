import Directory from 'directory-helpers';

describe('build', () => {
  it('outputs "Hello World!"', async () => {
    const directory = new Directory('.');
    expect(await directory.exec('build')).toBe('Hello World!');
  });
});
