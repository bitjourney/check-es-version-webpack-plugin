
const MemoryFs = require("memory-fs");
const webpack = require("webpack");

function createCompiler(options = {}) {
  const compiler = webpack(
      {
        mode: 'production',
        bail: true,
        cache: false,
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

module.exports.createCompiler = createCompiler;
