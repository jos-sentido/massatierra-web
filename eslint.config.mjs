import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Componentes traídos del registro de React Bits (código de terceros, tal cual).
  // Usan el patrón "ref.current = valor" en render, que estas reglas marcan.
  // Los componentes propios van en subcarpetas y sí pasan por las reglas completas.
  {
    files: ["src/components/*.tsx"],
    rules: {
      "react-hooks/refs": "off",
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "out-vitrina/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
