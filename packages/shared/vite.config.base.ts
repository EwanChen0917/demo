import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import type { UserConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 基础配置 - 所有环境共享的配置
export const baseConfig: UserConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

// 获取统一的输出目录配置
export const getOutDirConfig = (packageRoot: string, packageName?: string) => {
  const rootDir = path.resolve(packageRoot, "../../");

  if (packageName) {
    // 所有工程统一输出到 dist/{packageName}
    return {
      outDir: path.resolve(rootDir, `dist/${packageName}`),
      emptyOutDir: false,
    };
  }

  // 未指定工程名时，默认输出到根 dist
  return {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: false,
  };
};
