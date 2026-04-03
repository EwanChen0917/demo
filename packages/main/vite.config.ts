import { defineConfig } from "vite";
import {
  createProdConfig,
  createDevConfig,
  getOutDirConfig,
  commonCssConfig,
  createElementPlusPlugins,
} from "../shared/vite.config.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const vueRuntimePath = require.resolve("vue/dist/vue.runtime.esm-bundler.js");
const vueRouterPath = require.resolve("vue-router/dist/vue-router.mjs");
const elementPlusPath = path.dirname(
  require.resolve("element-plus/package.json"),
);
const workspaceRoot = path.resolve(__dirname, "../../");
const buildOutDirConfig = getOutDirConfig(__dirname);
const commonResolveConfig = {
  dedupe: ["vue", "vue-router", "pinia", "element-plus"],
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@app/a": path.resolve(__dirname, "../a/src"),
    "@app/b": path.resolve(__dirname, "../b/src"),
    "@app/shared": path.resolve(__dirname, "../shared/src"),
    vue: vueRuntimePath,
    "vue-router": vueRouterPath,
    "element-plus": elementPlusPath,
  },
};
const elementPlusPlugins = createElementPlusPlugins(__dirname, [
  "../shared/src/components",
]);

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    const prodConfig = createProdConfig({}, __dirname);
    const sharedRollupOptions = prodConfig.build?.rollupOptions ?? {};
    const sharedOutput =
      typeof sharedRollupOptions.output === "object" &&
      !Array.isArray(sharedRollupOptions.output)
        ? sharedRollupOptions.output
        : {};

    return {
      ...prodConfig,
      root: workspaceRoot,
      base: "/",
      plugins: [...(prodConfig.plugins ?? []), ...elementPlusPlugins],
      resolve: commonResolveConfig,
      ...commonCssConfig,
      build: {
        ...buildOutDirConfig,
        ...prodConfig.build,
        rollupOptions: {
          ...sharedRollupOptions,
          external: [],
          output: {
            ...sharedOutput,
            manualChunks(id) {
              // 自动按业务包聚合源码 chunk：
              // 命中 packages/<pkg>/src 下任意文件，避免对命名和目录结构有硬性要求
              const pkgChunkMatch = id.match(/\/packages\/([^/]+)\/src\//);
              if (pkgChunkMatch) {
                const pkgName = pkgChunkMatch[1];
                if (pkgName !== "main" && pkgName !== "shared") {
                  return `feature-${pkgName}`;
                }
              }

              // 第三方依赖做粗粒度分包，避免拆分过细
              if (id.includes("element-plus") || id.includes("@element-plus")) {
                return "vendor-ui";
              }

              if (
                id.includes("/node_modules/vue/") ||
                id.includes("vue-router") ||
                id.includes("/node_modules/pinia/")
              ) {
                return "vendor-vue";
              }

              if (id.includes("/node_modules/")) {
                return "vendor";
              }
            },
          },
        },
      },
    };
  } else {
    const devConfig = createDevConfig();

    return {
      ...devConfig,
      root: workspaceRoot,
      base: "/",
      plugins: [...(devConfig.plugins ?? []), ...elementPlusPlugins],
      resolve: commonResolveConfig,
      ...commonCssConfig,
      build: buildOutDirConfig,
    };
  }
});
