module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends":"eslint:recommended",
  "rules": {
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const":"error"
  }
}
