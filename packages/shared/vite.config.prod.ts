import type { UserConfig, LibraryFormats, Plugin } from 'vite';
import { baseConfig, commonCssConfig, getOutDirConfig } from './vite.config.base.ts';
import compression from 'vite-plugin-compression2';
import { minify } from 'terser';

interface LibConfig {
  entry?: string;
  formats?: readonly LibraryFormats[];
  fileName?: (format: string) => string;
}

interface ProdConfigOptions {
  compress?: boolean;
}

const createEsLibMinifyPlugin = (): Plugin => {
  return {
    name: 'minify-es-lib-output',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk' || !output.fileName.endsWith('.js')) {
          continue;
        }

        const result = await minify(output.code, {
          module: true,
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true,
          format: {
            comments: /@__PURE__|#__PURE__|@__NO_SIDE_EFFECTS__/,
          },
        });

        if (result.code) {
          output.code = result.code;
        }
      }
    },
  };
};

// 生产环境配置 - 在基础配置基础上增加生产构建优化
export const createProdConfig = (
  overrides: UserConfig = {},
  packageRoot?: string,
  packageName?: string,
  libConfig?: LibConfig,
  options: ProdConfigOptions = {},
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
          element: ['@lute-root-ui/element-plus'],
        },
      },
    },
    ...buildOutDirConfig,
  };

  // 如果有 libConfig，添加到 build 中
  if (libConfig) {
    buildConfig.lib = libConfig;
  }

  // 默认仅应用构建启用预压缩；库构建可通过 options.compress 显式开启
  const shouldCompress = options.compress ?? !libConfig;
  const needsEsLibMinify = libConfig?.formats?.length === 1 && libConfig.formats[0] === 'es';
  const compressionPlugins: Plugin[] = shouldCompress
    ? [
        compression({ algorithm: 'gzip', exclude: [/\.(br)$/] }),
        compression({
          algorithm: 'brotliCompress',
          filename: '[path][base].br',
        }),
      ]
    : [];
  const libMinifyPlugins: Plugin[] = needsEsLibMinify ? [createEsLibMinifyPlugin()] : [];

  return {
    ...baseConfig,
    ...commonCssConfig,
    plugins: [
      ...((baseConfig.plugins as Plugin[]) ?? []),
      ...compressionPlugins,
      ...libMinifyPlugins,
    ],
    build: buildConfig,
    ...overrides,
  };
};
