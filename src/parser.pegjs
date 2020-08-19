{
  function binaryExpression(head, tail) {
    return tail.reduce(
      (result, element) => ({
        type:"BINARY_EXPRESSION",
        operator: element[1],
        left: result,
        right: element[3],
      }),
      head
    );
  }
}

Expression = Comparative

Comparative
  = head:Additive tail:(_ (">=" / "<=" / "<>" / "==" / "~=" / ">" / "<" / "eq" / "gte" / "gt" / "lte" / "lt" / "cmp" ) _ Additive)* {
      return binaryExpression(head, tail);
    }

Additive
  = head:Multiplicative tail:(_ ("+" / "-" / "plus" / "minus" ) _ Multiplicative)* {
      return binaryExpression(head, tail);
    }

Multiplicative
  = head:Exponentiative tail:(_ ("*" / "/" / "%" / "times" / "div" / "mod" ) _ Exponentiative)* {
      return binaryExpression(head, tail);
    }

Exponentiative
  = head:Factor tail:(_ ("^" / "**" / "pow") _ Factor)* {
      return binaryExpression(head, tail);
    }

Reference
  = name:("REF" [0-9]+) { return { type: "REFERENCE", value: text() } }

Function
  = name:[a-zA-Z0-9]+ "(" _ expr:Arguments _ ")" {
    return { type: "FUNCTION", name: name.join(""), arguments: expr }
  }

Arguments
  = head:Expression tail:(_ "," _ Arguments)* {
    return tail.reduce((result, element) => [...result, ...element[3]], [head]);
  }

Factor
  = Function
  / "(" _ expr:Expression _ ")" { return expr }
  / Number
  / Reference

Number
  = _ [+-]?([0-9]+ ".")?[0-9]+("e"[+-]?[0-9]+)? { return { type: "NUMBER", value: text() } }

_ "whitespace"
  = [ \t\n\r]*
