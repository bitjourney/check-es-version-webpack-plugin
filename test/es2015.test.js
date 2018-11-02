"use strict";

const { CheckEsVersionPlugin } = require("..");

const { createCompiler } = require("./helper");

const compiler = createCompiler({
  entry: `${__dirname}/fixtures/es2017.js`,
  plugins: [
    new CheckEsVersionPlugin({
      esVersion: 2015, // ES2015 has no async/wait yet
    }),
  ],
})

compiler.run((err, stats) => {
  if (err) {
    throw err;
  }

  if (stats.compilation.errors.length > 0) {
    console.error("ok:", stats.compilation.errors.join(" "));
  } else {
    console.error("no syntax errors occur.")
    process.exit(1);
  }
});
