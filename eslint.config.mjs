// @ts-check

import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**", "package-lock.json"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.strict, ...tseslint.configs.stylistic],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    plugins: { json },
    language: "json/json",
    rules: json.configs.recommended.rules,
  },
  {
    files: ["tsconfig.json", ".changeset/*.json"],
    plugins: { json },
    language: "json/jsonc",
    rules: json.configs.recommended.rules,
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    rules: css.configs.recommended.rules,
  },
  prettierConfig,
]);
