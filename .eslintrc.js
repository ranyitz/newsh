module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-ignore": "off"
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  overrides: [{
    files: ["*.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  }]
};