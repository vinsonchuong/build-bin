# build-bin
[![Build Status](https://travis-ci.org/vinsonchuong/build-bin.svg?branch=master)](https://travis-ci.org/vinsonchuong/build-bin)

A zero-configuration plugin system for building assets for production release

## Installing
`build-bin` is available as an
[npm package](https://www.npmjs.com/package/build-bin).

## Usage
Add `build-bin` to the `package.json` as follows:
```json
{
  "name": "project",
  "private": true,
  "scripts": {
    "build": "build"
  },
  "devDependencies": {
    "build-bin": "^0.0.2"
  }
}
```

Then add plugins for each desired build workflow. Existing plugins are listed
below.

From the command line, run:
```bash
npm run build
```

## Plugins
* [build-html](https://github.com/vinsonchuong/build-html) compiles and minifies
  an HTML entry point.
* [build-esnext](https://github.com/vinsonchuong/build-esnext) compiles,
  concatenates, and minifies ES.next modules.
* [build-gzip](https://github.com/vinsonchuong/build-gzip) gzips all static
  assets after compilation.
* [build-cloudfoundry](https://github.com/vinsonchuong/build-cloudfoundry)
  configures a static frontend for deployment on Cloud Foundry.
* [build-heroku](https://github.com/vinsonchuong/build-heroku)
  configures a static frontend for deployment on Heroku.

## Writing Plugins
Plugins must have a `name` that starts with `build-` and declare a `stage` in
`package.json`. Valid stages include `compile`, `compress`, and `config`. All
plugins from the `compile` stage are run first, followed by plugins in the
`compress` stage, and finally, followed by plugins in the `config` stage.

```json
{
  "name": "build-esnext",
  "stage": "compile",
  "main": "src/index.js"
}
```

Plugins must export a `function` or `async function` and must write into the
`dist` directory.

```js
import {fs} from 'node-promise-es6';

export default async function() {
  await fs.writeFile('dist.js', 'console.log("Hello World!");');
}
```

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
