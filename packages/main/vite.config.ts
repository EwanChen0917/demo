import { defineConfig } from "vite";
import {
  createProdConfig,
  createDevConfig,
  getOutDirConfig,
  commonCssConfig,
} from "../shared/vite.config.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
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
const commonResolveConfig = {
  dedupe: ["vue", "vue-router", "element-plus"],
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
const elementPlusPlugins = [
  AutoImport({
    imports: ["vue", "vue-router"],
    resolvers: [ElementPlusResolver()],
    dts: path.resolve(__dirname, "src/auto-imports.d.ts"),
  }),
  Components({
    dirs: ["../shared/src/components"],
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
              // 自动分包所有内部工作区包
              const pkgMatch = id.match(/\/packages\/([^\/]+)\//);
              if (pkgMatch) {
                return `feature-${pkgMatch[1]}`;
              }

              // 自动分包所有第三方模块
              if (id.includes("/node_modules/.pnpm/")) {
                const pnpmMatch = id.match(
                  /\/node_modules\/\.pnpm\/([^\/]+)\//,
                );
                if (pnpmMatch) {
                  const packageFolder = pnpmMatch[1].split("@")[0];
                  return `vendor-${packageFolder.replace(/\+/g, "-")}`;
                }
                return "vendor";
              }

              if (id.includes("/node_modules/")) {
                const match = id.match(
                  /\/node_modules\/((?:@[^\/]+\/)?[^\/]+)/,
                );
                if (match) {
                  return `vendor-${match[1].replace(/[@/]/g, "-")}`;
                }
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
