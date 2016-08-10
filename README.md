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
* [build-esnext](https://github.com/vinsonchuong/build-esnext) compiles,
  concatenates, and minifies ES.next modules.

## Writing Plugins
Plugins must have a `name` that starts with `build-` and declare a `stage` in
`package.json`. Valid stages include `compile` and `compress`. All plugins from
the `compile` stage are run first, followed by plugins in the `compress` stage.

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
