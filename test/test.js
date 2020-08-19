const assert = require("assert");
const Big = require("big.js");

const b = require("../src");

describe("big.js template literal", () => {
  describe("number parsing", () => {
    it("parses positive numbers", () => {
      assert(b`10`.eq(new Big("10")));
      assert(b`10.123`.eq(new Big("10.123")));
      assert(b`010`.eq(new Big("010")));
    });

    it("parses negative numbers", () => {
      assert(b`-10`.eq(new Big("-10")));
      assert(b`-10.123`.eq(new Big("-10.123")));
    });

    it("parses exponential numbers", () => {
      assert(b`4.321e+4`.eq(new Big("4.321e+4")));
      assert(b`4.321e-4`.eq(new Big("4.321e-4")));
      assert(b`-4.321E+4`.eq(new Big("-4.321E+4")));
    });
  });

  describe("precedence", () => {
    it("multiplication has precedence over addition", () => {
      assert(b`1 + 2 * 3 == 7`);
      assert(b`3 - 3 / 3 == 2`);
      assert(b`(1 + 2) * 3 == 9`);
    });

    it("exponentiation has precedence over multiplication", () => {
      assert(b`2 * 2 ** 3 == 16`);
      assert(b`4 / 2 ** 2 == 1`);
      assert(b`(2 * 2) ** 3 == 64`);
    });
  });

  describe("interpolation", () => {
    it("interpolates Big.js numbers", () => {
      assert(b`2 == ${2}`);
      assert(b`2 == ${"2"}`);
      assert(b`2 == ${new Big("2")}`);
    });
  });

  describe("sqrt", () => {
    it("is supported as function call", () => {
      assert(b`sqrt(9) == 3`);
    });
  });

  describe("abs", () => {
    it("is supported as function call", () => {
      assert(b`abs(-10) == 10`);
    });
  });
});
