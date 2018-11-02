const acorn = require("acorn");

class ValidateEs5WebpackPlugin {
  constructor({ esVersion } = { esVersion: 5 }) {
    this.esVersion = esVersion;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("ValidateEs5WebpackPlugin", (compilation) => {
      for (const [filename, asset] of Object.entries(compilation.assets)) {

        if (!/\.js/.test(filename)) {
          continue;
        }

        const source = asset.source();

        try {
          acorn.parse(source, {
            ecmaVersion: this.esVersion,
          });
        } catch (err) {
          if (err instanceof SyntaxError) {
            compilation.errors.push(this.buildError(err));
          } else {
            compilation.errors.push(err);
          }
        }
      }
    });
  }

  buildError(err) {
    const { line, column } = err.loc;
    const sourceLine = source.split(/\n/)[line - 1];
    const marker = new Array(column + 1).fill(' ');
    marker[column] = '^';


    return new SyntaxError(`Invalid ES${this.esVersion} at ${filename}: ${err}\n${sourceLine}\n${marker}`)
  }
}

module.exports = ValidateEs5WebpackPlugin;
