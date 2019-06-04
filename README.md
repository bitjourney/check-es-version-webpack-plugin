# check-es-version-webpack-plugin [![Build Status](https://travis-ci.org/bitjourney/check-es-version-webpack-plugin.svg?branch=master)](https://travis-ci.org/bitjourney/check-es-version-webpack-plugin)

This plugin checks if the ES version of the webpack outputs is compatible with the specified version of ES.

For example, if your project supports IE11, which supports up to ES5, you have to ensure your JavaScript bundles does not include ES2015+ syntax such as classes, async/await, and so on.

## SYNOPSIS

```js
// in webpack.config.js

const { CheckEsVersionPlugin } = require("@bitjourney/check-es-version-webpack-plugin");

const config = {
  // ...
};

if (productionMode) {
  // this plugin works only for production mode,
  // because webpack wraps the input with eval() in development mode.
  config.plugins.push(
    new CheckEsVersionPlugin({
      esVersion: 5,
    }),
  ;
}

// ...
```

## Install

This is published to npmjs.com:

https://www.npmjs.com/package/@bitjourney/check-es-version-webpack-plugin

```
npm install @bitjourney/check-es-version-webpack-plugin
```

## How it works

This module uses [acorn](https://github.com/acornjs/acorn) to parse sources with a specified ES version.

That is, `acorn.parse(source, { ecmaVersion: 5 })` throws `SyntaxError` if the `source` includes ES2015 syntax.

## Related Tools

* https://www.npmjs.com/package/es-check

## LICENSE

ISC License

Copyright (c) 2018, Bit Journey, Inc.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
