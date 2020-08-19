const Benchmark = require("benchmark");

const Big = require("big.js");
const b = require("../src");

new Benchmark.Suite()
  .add("big.js", () => new Big(0.1).add(0.2).toString())
  .add("bigjs-literal", () => b`0.1 + 0.2`.toString())
  .add("bigjs-literal interpolation", () => b`0.1 + ${0.2}`.toString())
  .on("cycle", event => console.log(String(event.target)))
  .run();
