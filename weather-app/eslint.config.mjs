import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/order": [
        "error", // or "warn"
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // Packages from node_modules
            "internal", // Aliased modules (e.g., '@/components')
            "parent", // Parent imports (../)
            "sibling", // Sibling imports (./)
            "index", // Index imports (./index)
            "object", // Imports using `type {} from ''`
            "type", // Type imports (import type {} from '')
          ],
          pathGroups: [
            // Optional: for custom grouping of aliased paths
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always", // Adds newlines between groups
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      // Important for eslint-plugin-import to resolve paths, especially with TypeScript
      "import/resolver": {
        typescript: {}, // if you use TypeScript
        node: {},
      },
    },
  },
];

export default eslintConfig;
