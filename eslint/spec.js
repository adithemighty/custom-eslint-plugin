const { RuleTester } = require("eslint");

const rule = require("./");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const errors = [{ message: "Consider using the Z_INDEX constant." }];

const VALID_VALUES = [
  '"auto"',
  '"inherit"',
  '"initial"',
  '"revert"',
  '"revert-layer"',
  '"unset"',
  "undefined",
  "Z_INDEX.BODY",
];

ruleTester.run(
  "prefer-z-index-constant",
  rule.rules["prefer-z-index-constant"].create,
  {
    valid: [
      ...VALID_VALUES.map((value) => `var style = { zIndex: ${value} }`),
      `var style = { zIndex: props.isActive ? Z_INDEX.BODY : Z_INDEX.NOTIFICATION };`,
      `var style = { zIndex: props.isActive ? undefined : Z_INDEX.NOTIFICATION};`,
      `interface Props { zIndex: number }`,
    ],
    invalid: [
      { code: "var style = { zIndex: 9999 }", errors },
      ...VALID_VALUES.map((value) => ({
        code: `var style = { zIndex: props.isActive ? ${value} : 9999 };`,
        errors,
      })),
      ...VALID_VALUES.map((value) => ({
        code: `var style = { zIndex: props.isActive ? 9999 : ${value} };`,
        errors,
      })),
    ],
  }
);
