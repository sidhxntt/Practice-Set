module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "no-var": "error",
    semi: "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
  },
  overrides: [
    {
      files: ['**/*.ts'],
      excludedFiles: ['**/*.spec.ts'], // Optionally exclude test files
    },
  ],
};
