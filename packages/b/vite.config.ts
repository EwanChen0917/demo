import { defineConfig } from "vite";
import { createProdConfig, createDevConfig } from "../shared/vite.config.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { commonCssConfig } from "../shared/vite.config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const libConfig = {
  entry: path.resolve(__dirname, "src/index.ts"),
  formats: ["es", "cjs"] as const,
  fileName: (format: string) => (format === "es" ? "index.esm.js" : "index.js"),
};

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    const prodConfig = createProdConfig({}, __dirname, "b", libConfig);
    return {
      ...prodConfig,
      root: __dirname,
      ...commonCssConfig,
      build: {
        ...prodConfig.build,
        rollupOptions: {
          external: ["vue", "vue-router", "element-plus"],
        },
      },
    };
  } else {
    return {
      ...createDevConfig(),
      root: __dirname,
      ...commonCssConfig,
    };
  }
});
