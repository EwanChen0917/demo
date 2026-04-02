import type { UserConfig, LibraryFormats } from "vite";
import { baseConfig, getOutDirConfig } from "./vite.config.base.ts";

interface LibConfig {
  entry?: string;
  formats?: readonly LibraryFormats[];
  fileName?: (format: string) => string;
}

// 公共 CSS 配置 - 与 baseConfig 中保持一致
const commonCssConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
};

// 生产环境配置 - 在基础配置基础上增加生产构建优化
export const createProdConfig = (
  overrides: UserConfig = {},
  packageRoot?: string,
  packageName?: string,
  libConfig?: LibConfig,
): UserConfig => {
  const buildOutDirConfig = packageRoot
    ? getOutDirConfig(packageRoot, packageName)
    : {};

  const buildConfig: any = {
    minify: "terser",
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-router"],
          "element-plus": ["element-plus"],
        },
      },
    },
    ...buildOutDirConfig,
  };

  // 如果有 libConfig，添加到 build 中
  if (libConfig) {
    buildConfig.lib = libConfig;
  }

  return {
    ...baseConfig,
    ...commonCssConfig,
    build: buildConfig,
    ...overrides,
  };
};
