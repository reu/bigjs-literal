const { createMacro } = require("babel-plugin-macros");
const { parse } = require("./parser");

function bigjsLiteralMacro({ references, babel, source }) {
  references.default.forEach(({ parentPath }) => {
    if (parentPath.type === "TaggedTemplateExpression") {
      parentPath.replaceWith(generateAST(babel.types, parentPath));
    }
  });
}

function generateAST(t, path) {
  const refs = path.node.quasi.expressions
    .reduce((refs, n, i) => ({ ...refs, [`REF${i}`]: n }), {});

  const expr = path.node.quasi.quasis
    .map(quasi => quasi.value.raw.toLowerCase())
    .map((part, i) => refs[`REF${i}`] ? `${part} REF${i}` : part)
    .join(" ")
    .trim();

  const bigJS = t.callExpression(t.identifier("require"), [t.stringLiteral("big.js")]);

  const evaluate = ast => {
    switch (ast.type) {
      case "NUMBER":
        return t.callExpression(bigJS, [t.stringLiteral(ast.value)]);

      case "REFERENCE":
        return t.callExpression(bigJS, [refs[ast.value]]);

      case "FUNCTION": {
        return t.callExpression(t.memberExpression(evaluate(ast.arguments[0]), t.identifier(ast.name)), []);
      }

      case "BINARY_EXPRESSION": {
        const binaryExpression = method =>
          t.callExpression(t.memberExpression(evaluate(ast.left), t.identifier(method)), [evaluate(ast.right)]);

        switch (ast.operator) {
          case "+":
            return binaryExpression("plus");
          case "-":
            return binaryExpression("minus");
          case "*":
            return binaryExpression("times");
          case "/":
            return binaryExpression("div");
          case "%":
            return binaryExpression("mod");
          case "^":
          case "**":
          case "pow":
            return binaryExpression("pow");
          case "==":
            return binaryExpression("eq");
          case ">=":
            return binaryExpression("gte");
          case ">":
            return binaryExpression("gt");
          case "<=":
            return binaryExpression("lte");
          case "<":
            return binaryExpression("lt");

          case "plus":
          case "minus":
          case "times":
          case "div":
          case "mod":
          case "eq":
          case "gte":
          case "gt":
          case "lte":
          case "lt":
          case "cmp":
            return binaryExpression(ast.operator);

          default:
            throw new Error(`[bigjs-literal] Unsupported big.js operator: ${ast.operator}`);
        }
      }
    }
  }

  return evaluate(parse(expr));
}

module.exports = createMacro(bigjsLiteralMacro);
