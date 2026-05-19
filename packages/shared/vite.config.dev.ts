import type { UserConfig } from 'vite';
import { baseConfig } from './vite.config.base.ts';

// 开发环境配置 - 在基础配置基础上增加开发特有的配置
export const createDevConfig = (overrides: UserConfig = {}): UserConfig => {
  return {
    ...baseConfig,
    server: {
      middlewareMode: false,
      proxy: {
        '/api': {
          target: 'https://erp.luteos.site',
          changeOrigin: true,
        },
      },
    },
    ...overrides,
  };
};
