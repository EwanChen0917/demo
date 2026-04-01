// 统一导出所有 Vite 配置
export { baseConfig, getOutDirConfig } from "./vite.config.base.ts";
export { createDevConfig } from "./vite.config.dev.ts";
export { createProdConfig } from "./vite.config.prod.ts";

// 自动环境选择配置
import type { UserConfig } from "vite";
import { createDevConfig } from "./vite.config.dev.ts";
import { createProdConfig } from "./vite.config.prod.ts";

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
