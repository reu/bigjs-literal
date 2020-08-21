const babel = require("@babel/core");

const transform = file =>
  babel
    .transformFileSync(file, {
      babelrc: false,
      plugins: [require.resolve("babel-plugin-macros")],
      filename: __filename,
    })
    .code
    .trim();

describe("bigjs-literal/macro", () => {
  it("transforms basic expressions", () => {
    expect(transform("./test/macro/basic.js")).toMatchSnapshot();
  });

  it("transforms interpolated expressions", () => {
    expect(transform("./test/macro/interpolation.js")).toMatchSnapshot();
  });
});
