# big.js literal

[![Build Status](https://travis-ci.org/reu/bigjs-literal.png)](https://travis-ci.org/reu/bigjs-literal)

Template literal for [big.js](https://github.com/MikeMcl/big.js/) expressions, so complex expressions can be readable:

```javascript
import Big from "big.js";
import b from "bigjs-literal";

const x = Big(0.1);
const y = 0.2;
const z = "0.3";

// Now you can write this:
const res1 = b`0.5 * ${x} + ${y} / (${z} + 3)`;

// Instead of this:
const res2 = Big(0.5).times(Big(x)).plus(Big(y).div(Big(z).plus(Big(3))));

res1.eq(res2); // true
```

## Install

Make sure you have big.js installed:

```shell
$ npm install --save big.js bigjs-literal
```

## Usage

Use the template literal to write your expressions, interpolations will safelly be treated as Big.js objects.

```javascript
import b from "bigjs-literal";

// Same as new Big(0.1).plus(new Big(0.2))
b`0.1 + 0.2`

// Same as new Big(1).plus(new Big(10.5))
b`1 + ${10.5}`

// Expressions can be as complex as you like
b`(14 * 3) + 5 / ${10.5} - 2 * ${"3.5521"}`

// Same as new Big(1).mod(new Big(10.5))
b`1 % ${10.5}`

// Comparators are also supported
b`1 == 1`
b`2 >= ${1}`
b`2 gte 1`

// `sqrt` and `abs` can be called as functions
b`sqrt(9) + abs(-10)`

// As you might expect, you can chain all other big.js methods
b`0.1 + 0.2`.times(3).toFixed(2) === "0.90"
```

All binary operations can be written using infix notation:

```javascript
b`1 plus 2`
b`1 minus 2`
b`2 times 5`
b`2 pow 2`
```

There are also operators for both `pow` and `mod`:
```javascript
// Same as new Big(2).pow(4)
b`2^4`
b`2**4`

// Same as new Big(10).mod(new Big(3))
b`10 % 3`
```
