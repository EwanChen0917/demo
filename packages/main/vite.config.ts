import { defineConfig } from "vite";
import {
  createProdConfig,
  createDevConfig,
  getOutDirConfig,
} from "../shared/vite.config.ts";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const vueRuntimePath = require.resolve("vue/dist/vue.runtime.esm-bundler.js");
const vueRouterPath = require.resolve("vue-router/dist/vue-router.mjs");
const elementPlusPath = path.dirname(
  require.resolve("element-plus/package.json"),
);
const workspaceRoot = path.resolve(__dirname, "../../");
const buildOutDirConfig = getOutDirConfig(__dirname);
const elementPlusPlugins = [
  AutoImport({
    imports: ["vue", "vue-router"],
    resolvers: [ElementPlusResolver()],
    dts: path.resolve(__dirname, "src/auto-imports.d.ts"),
  }),
  Components({
    resolvers: [ElementPlusResolver({ importStyle: "css" })],
    dts: path.resolve(__dirname, "src/components.d.ts"),
  }),
];

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
      base: "./",
      plugins: [...(prodConfig.plugins ?? []), ...elementPlusPlugins],
      server: {
        port: 5172,
      },
      resolve: {
        dedupe: ["vue", "vue-router", "element-plus"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@app/a": path.resolve(__dirname, "../a/src"),
          "@app/b": path.resolve(__dirname, "../b/src"),
          vue: vueRuntimePath,
          "vue-router": vueRouterPath,
          "element-plus": elementPlusPath,
        },
      },
      build: {
        ...buildOutDirConfig,
        ...prodConfig.build,
        rollupOptions: {
          ...sharedRollupOptions,
          external: [],
          output: {
            ...sharedOutput,
            manualChunks(id) {
              if (id.includes("/packages/a/")) {
                return "feature-a";
              }

              if (id.includes("/packages/b/")) {
                return "feature-b";
              }

              if (id.includes("element-plus")) {
                return "element-plus";
              }

              if (id.includes("@element-plus")) {
                return "element-plus";
              }

              if (id.includes("vue-router")) {
                return "vue-router";
              }

              if (id.includes("/node_modules/vue/")) {
                return "vue-core";
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
      base: "./",
      plugins: [...(devConfig.plugins ?? []), ...elementPlusPlugins],
      build: buildOutDirConfig,
      server: {
        port: 5172,
      },
      resolve: {
        dedupe: ["vue", "vue-router", "element-plus"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@app/a": path.resolve(__dirname, "../a/src"),
          "@app/b": path.resolve(__dirname, "../b/src"),
          vue: vueRuntimePath,
          "vue-router": vueRouterPath,
          "element-plus": elementPlusPath,
        },
      },
    };
  }
});
