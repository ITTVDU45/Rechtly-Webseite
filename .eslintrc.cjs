module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // global rules
  },
  overrides: [
    {
      files: ["src/lib/services/**", "src/lib/config/**", "src/lib/db/**"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
};






