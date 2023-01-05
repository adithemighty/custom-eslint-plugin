module.exports = {
  plugins: ["custom"],
  rules: {
    "custom/prefer-z-index-constant": 1,
  },
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    jest: true,
  },
};
