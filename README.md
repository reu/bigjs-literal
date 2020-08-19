# big.js literal

[![Build Status](https://travis-ci.org/reu/bigjs-literal.png)](https://travis-ci.org/reu/bigjs-literal)

Template literal for [https://www.npmjs.com/package/big.js](Big.js) expressions.

## Install

Make sure you have big.js installed:

```shell
$ npm install --save big.js bigjs-literal
```

## Usage

Use the template literal to write your expressions, interpolations will safelly be treated as Big.js objects.

```javascript
import b from "bigjs-literal";

// Same as new Big(0.1).add(new Big(0.2))
b`0.1 + 0.2`

// Same as new Big(1).add(new Big(10.5))
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
```
