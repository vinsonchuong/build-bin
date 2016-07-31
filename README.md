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
    "build-bin": "^0.0.1"
  }
}
```

From the command line, run:
```bash
npm run build
```

## Writing Plugins

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
