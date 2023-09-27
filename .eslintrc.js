/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "no-console": import.meta.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": import.meta.env.NODE_ENV === "production" ? "error" : "off",
  },
};
