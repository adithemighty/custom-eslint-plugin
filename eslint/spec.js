const { RuleTester } = require("eslint");

const rule = require("./");

const ruleTester = new RuleTester({});

const errors = [{ message: "Consider using the Z_INDEX constant." }];

ruleTester.run(
  "prefer-z-index-constant",
  rule.rules["prefer-z-index-constant"].create,
  {
    valid: [{ code: "var style = {zIndex: Z_INDEX.NOTIFICATION}" }],
    invalid: [{ code: "var style = {zIndex: 9999}", errors }],
  }
);
