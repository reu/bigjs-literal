const { parse } = require("./parser");

const Big = require("big.js");

function bigjsLiteral(exps, ...numbers) {
  const refs = numbers
    .reduce((refs, n, i) => ({ ...refs, [`REF${i}`]: new Big(n) }), {});

  const refExp = exps
    .map(part => part.toLowerCase())
    .map((part, i) => refs[`REF${i}`] ? `${part} REF${i}` : part)
    .join(" ")
    .trim();

  const eval = ast => {
    switch (ast.type) {
      case "NUMBER":
        return new Big(ast.value);

      case "REFERENCE":
        return new Big(refs[ast.value]);

      case "FUNCTION": {
        switch (ast.name) {
          case "sqrt":
            return eval(ast.arguments[0]).sqrt();

          case "abs":
            return eval(ast.arguments[0]).abs();

          default:
            throw new Error(`Unsupported function: ${ast.name}`);
        }
      }

      case "BINARY_EXPRESSION": {
        switch (ast.operator) {
          case "+":
          case "plus":
            return eval(ast.left).plus(eval(ast.right));

          case "-":
          case "minus":
            return eval(ast.left).minus(eval(ast.right));

          case "*":
          case "times":
            return eval(ast.left).times(eval(ast.right));

          case "/":
          case "div":
            return eval(ast.left).div(eval(ast.right));

          case "%":
          case "mod":
            return eval(ast.left).mod(eval(ast.right));

          case "^":
          case "**":
          case "pow":
            return eval(ast.left).pow(parseInt(eval(ast.right), 10));

          case "==":
          case "eq":
            return eval(ast.left).eq(eval(ast.right));

          case ">=":
          case "gte":
            return eval(ast.left).gte(eval(ast.right));

          case ">":
          case "gt":
            return eval(ast.left).gt(eval(ast.right));

          case "<=":
          case "lte":
            return eval(ast.left).lte(eval(ast.right));

          case "<":
          case "lt":
            return eval(ast.left).lt(eval(ast.right));

          case "cmp":
            return eval(ast.left).cmp(eval(ast.right));

          default:
            throw new Error(`Unsupported operator: ${ast.operator}`);
        }
      }
    }
  }

  return eval(parse(refExp));
}

module.exports = bigjsLiteral;
