import type { NextConfig } from "next";

// Exportación estática de la vitrina (/lab) para publicarla en propuestas.sentido.mx:
//   VITRINA_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/propuestas/massatierra/vitrina npm run build
const vitrina = process.env.VITRINA_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(vitrina
    ? {
        output: "export" as const,
        distDir: "out-vitrina",
        basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        trailingSlash: true,
      }
    : {}),
  // La exportación estática no admite prerenderizado parcial.
  cacheComponents: !vitrina,
  partialPrefetching: !vitrina,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
