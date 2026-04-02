// 统一导出所有 Vite 配置
import type { UserConfig } from "vite";
import { baseConfig, getOutDirConfig } from "./vite.config.base.ts";
import { createDevConfig } from "./vite.config.dev.ts";
import { createProdConfig } from "./vite.config.prod.ts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "node:path";

export { baseConfig, getOutDirConfig };
export { createDevConfig };
export { createProdConfig };

// 公共配置常量
export const commonCssConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
};

export const createComponentsPlugin = (dirsPath: string[], dtsPath: string) => {
  return Components({
    dirs: dirsPath,
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    dts: dtsPath,
  });
};

// 创建子包（a、b 等）的完整 Vite 配置
export const createSubPackageViteConfig = (
  packageName: string,
  packageRoot?: string,
) => {
  const __dirname = packageRoot || process.cwd();

  const libConfig = {
    entry: path.resolve(__dirname, "src/index.ts"),
    formats: ["es"] as const,
    fileName: () => "index.js",
  };

  const componentsPlugin = createComponentsPlugin(
    [path.resolve(__dirname, "./src")],
    path.resolve(__dirname, "src/components.d.ts"),
  );
  const autoImportPlugin = AutoImport({
    imports: ["vue", "vue-router"],
    resolvers: [ElementPlusResolver()],
    dts: path.resolve(__dirname, "src/auto-imports.d.ts"),
  });

  return ({ mode }: { mode?: string }) => {
    if (mode === "production") {
      const prodConfig = createProdConfig(
        {},
        __dirname,
        packageName,
        libConfig,
      );
      return {
        ...prodConfig,
        root: __dirname,
        plugins: [
          ...(prodConfig.plugins ?? []),
          autoImportPlugin,
          componentsPlugin,
        ],
        ...commonCssConfig,
        build: {
          ...prodConfig.build,
          rollupOptions: {
            external: ["vue", "vue-router", "element-plus"],
          },
        },
      };
    } else {
      const devConfig = createDevConfig();
      return {
        ...devConfig,
        root: __dirname,
        plugins: [
          ...(devConfig.plugins ?? []),
          autoImportPlugin,
          componentsPlugin,
        ],
        ...commonCssConfig,
      };
    }
  };
};

// 自动环境选择配置
interface LibConfig {
  entry?: string;
  formats?: any[];
  fileName?: (format: string) => string;
}

export const createAutoConfig = (
  overrides: UserConfig = {},
  packageRoot?: string,
  packageName?: string,
  libConfig?: LibConfig,
) => {
  return ({ mode }: { mode?: string }) => {
    if (mode === "development") {
      return {
        ...createDevConfig(),
        ...overrides,
      };
    } else if (mode === "production") {
      return {
        ...createProdConfig({}, packageRoot, packageName, libConfig),
        ...overrides,
      };
    }

    // 默认使用开发配置
    return {
      ...createDevConfig(),
      ...overrides,
    };
  };
};
