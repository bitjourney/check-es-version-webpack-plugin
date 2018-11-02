"use strict";

const { CheckEsVersionPlugin } = require("..");

const { createCompiler } = require("./helper");

const compiler = createCompiler({
  entry: `${__dirname}/fixtures/es2015.js`,
  plugins: [
    new CheckEsVersionPlugin({
      esVersion: 5, // ES5 has no classes
    }),
  ],
})

compiler.run((err, stats) => {
  if (err) {
    throw err;
  }

  if (stats.compilation.errors.length > 0) {
    console.error("ok:", stats.compilation.errors.join("\n"));
  } else {
    console.error("not ok: no syntax errors occur.")
    process.exit(1);
  }
});
