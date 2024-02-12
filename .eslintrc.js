module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Add your rules here
    indent: ['error', 2], // enforce 2 space indentation
    semi: ['error', 'always'], // enforce semicolons
    quotes: ['error', 'single'], // enforce single quotes
    'comma-dangle': ['error', 'never'], // disallow trailing commas
    'no-console': 'off', // allow console usage
    'no-unused-vars': 'warn', // warn about unused variables
  },
};
