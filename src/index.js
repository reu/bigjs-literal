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

  const evaluate = ast => {
    switch (ast.type) {
      case "NUMBER":
        return new Big(ast.value);

      case "REFERENCE":
        return new Big(refs[ast.value]);

      case "FUNCTION": {
        switch (ast.name) {
          case "sqrt":
            return evaluate(ast.arguments[0]).sqrt();

          case "abs":
            return evaluate(ast.arguments[0]).abs();

          default:
            throw new Error(`Unsupported function: ${ast.name}`);
        }
      }

      case "BINARY_EXPRESSION": {
        switch (ast.operator) {
          case "+":
          case "plus":
            return evaluate(ast.left).plus(evaluate(ast.right));

          case "-":
          case "minus":
            return evaluate(ast.left).minus(evaluate(ast.right));

          case "*":
          case "times":
            return evaluate(ast.left).times(evaluate(ast.right));

          case "/":
          case "div":
            return evaluate(ast.left).div(evaluate(ast.right));

          case "%":
          case "mod":
            return evaluate(ast.left).mod(evaluate(ast.right));

          case "^":
          case "**":
          case "pow":
            return evaluate(ast.left).pow(parseInt(evaluate(ast.right), 10));

          case "==":
          case "eq":
            return evaluate(ast.left).eq(evaluate(ast.right));

          case ">=":
          case "gte":
            return evaluate(ast.left).gte(evaluate(ast.right));

          case ">":
          case "gt":
            return evaluate(ast.left).gt(evaluate(ast.right));

          case "<=":
          case "lte":
            return evaluate(ast.left).lte(evaluate(ast.right));

          case "<":
          case "lt":
            return evaluate(ast.left).lt(evaluate(ast.right));

          case "cmp":
            return evaluate(ast.left).cmp(evaluate(ast.right));

          default:
            throw new Error(`Unsupported operator: ${ast.operator}`);
        }
      }
    }
  }

  return evaluate(parse(refExp));
}

module.exports = bigjsLiteral;
