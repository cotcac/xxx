module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: "babel-eslint", // need package for this
  env: {
    node: true,
    es6: true
  },
  extends: "eslint:recommended",
  rules: {
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "no-console": "warn",
    "prefer-const": "error"
  }
};
