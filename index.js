const acorn = require("acorn");

class CheckEsVersionPlugin {
  constructor({ esVersion } = { esVersion: 5 }) {
    this.esVersion = esVersion;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("CheckEsVersionPlugin", (compilation) => {
      for (const [filename, asset] of Object.entries(compilation.assets)) {

        if (!/\.js$/.test(filename)) {
          continue;
        }

        const source = asset.source();

        try {
          acorn.parse(source, {
            ecmaVersion: this.esVersion,
          });
        } catch (err) {
          if (err instanceof SyntaxError) {
            compilation.errors.push(this.buildError({
              err,
              source,
              filename,
            }));
          } else {
            compilation.errors.push(err);
          }
        }
      }
    });
  }

  buildError({ err, source, filename }) {
    return new SyntaxError(`Invalid ES${this.esVersion} at ${filename}: ${err}`);
  }
}

module.exports = CheckEsVersionPlugin; // not recommended

// `const { CheckEsVersionPlugin } = require("@bitjourney/check-es-version-webpack-plugin")` is recommended:
module.exports.CheckEsVersionPlugin = CheckEsVersionPlugin;
