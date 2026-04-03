import type { UserConfig, LibraryFormats, Plugin } from 'vite';
import { baseConfig, commonCssConfig, getOutDirConfig } from './vite.config.base.ts';
import compression from 'vite-plugin-compression2';

interface LibConfig {
  entry?: string;
  formats?: readonly LibraryFormats[];
  fileName?: (format: string) => string;
}

// 生产环境配置 - 在基础配置基础上增加生产构建优化
export const createProdConfig = (
  overrides: UserConfig = {},
  packageRoot?: string,
  packageName?: string,
  libConfig?: LibConfig,
): UserConfig => {
  const buildOutDirConfig = packageRoot ? getOutDirConfig(packageRoot, packageName) : {};

  const buildConfig: any = {
    minify: 'terser',
    reportCompressedSize: false,
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
          vue: ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
        },
      },
    },
    ...buildOutDirConfig,
  };

  // 如果有 libConfig，添加到 build 中
  if (libConfig) {
    buildConfig.lib = libConfig;
  }

  // 应用构建时启用预压缩（库构建由消费方决定，不预压缩）
  const compressionPlugins: Plugin[] = !libConfig
    ? [
        compression({ algorithm: 'gzip', exclude: [/\.(br)$/] }),
        compression({
          algorithm: 'brotliCompress',
          filename: '[path][base].br',
        }),
      ]
    : [];

  return {
    ...baseConfig,
    ...commonCssConfig,
    plugins: [...((baseConfig.plugins as Plugin[]) ?? []), ...compressionPlugins],
    build: buildConfig,
    ...overrides,
  };
};
