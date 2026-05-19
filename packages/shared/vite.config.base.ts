import vue from '@vitejs/plugin-vue';
import type { UserConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 公共 CSS 配置 - Sass silenceDeprecations
export const commonCssConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
        // Vite 5.4 默认使用 Sass legacy API（render），需用 includePaths
        includePaths: [path.resolve(__dirname, '../../node_modules')],
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
};

// 基础配置 - 所有环境共享的配置
export const baseConfig: UserConfig = {
  plugins: [vue()],
  ...commonCssConfig,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'element-plus': '@lute-root-ui/element-plus',
    },
  },
};

// 获取统一的输出目录配置
export const getOutDirConfig = (packageRoot: string, packageName?: string) => {
  const rootDir = path.resolve(packageRoot, '../../');

  if (packageName) {
    // 所有工程统一输出到 dist/{packageName}
    return {
      outDir: path.resolve(rootDir, `dist/${packageName}`),
      emptyOutDir: false,
    };
  }

  // 未指定工程名时，默认输出到根 dist
  return {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: false,
  };
};
