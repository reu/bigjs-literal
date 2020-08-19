const assert = require("assert");
const Big = require("big.js");

const b = require("../src");

describe("big.js template literal", () => {
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
