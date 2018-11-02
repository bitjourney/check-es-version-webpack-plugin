"use strict";

const MemoryFs = require("memory-fs");
const webpack = require("webpack");
const ValidateEs5Plugin = require("..");

function createCompiler(options = {}) {
  const compiler = webpack(
      {
        mode: 'production',
        bail: true,
        cache: false,
        entry: `${__dirname}/fixtures/es2015.js`,
        optimization: {
          minimize: false,
        },
        output: {
          pathinfo: false,
          path: `${__dirname}/dist`,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[id].[name].[chunkhash].js',
        },
        ...options,
      }
  );
  compiler.outputFileSystem = new MemoryFs();
  return compiler;
}

const compiler = createCompiler({
  plugins: [
    new ValidateEs5Plugin(),
  ],
})

compiler.run((err, stats) => {
  if (stats.compilation.errors) {
    console.error("not ok:", stats.compilation.errors.map((err) => err.toString()).join(" "));
  } else {
    if (err) {
      throw err;
    }
    console.error("no syntax errors occur.")
    process.abort();
  }
});
