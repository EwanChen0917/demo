// 统一导出所有 Vite 配置
import { commonCssConfig, getOutDirConfig } from "./vite.config.base.ts";
import { createDevConfig } from "./vite.config.dev.ts";
import { createProdConfig } from "./vite.config.prod.ts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import dts from "vite-plugin-dts";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const _require = createRequire(import.meta.url);
const _dirname = path.dirname(fileURLToPath(import.meta.url));

// 从根 package.json 的 dependencies 自动推导 workspace 级外部依赖
const rootPkg = _require(path.resolve(_dirname, "../../package.json"));
const workspaceExternals: (string | RegExp)[] = [
  ...Object.keys(rootPkg.dependencies ?? {}),
  // 覆盖所有 scoped 子包，如 @element-plus/icons-vue
  /@element-plus\/.*/,
];

export { getOutDirConfig };
export { createDevConfig };
export { createProdConfig };
export { commonCssConfig };

export const createComponentsPlugin = (dirsPath: string[], dtsPath: string) => {
  return Components({
    dirs: dirsPath,
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    dts: dtsPath,
  });
};

export const createElementPlusPlugins = (
  packageRoot: string,
  componentDirs: string[],
) => [
  AutoImport({
    imports: ["vue", "vue-router"],
    resolvers: [ElementPlusResolver()],
    dts: path.resolve(packageRoot, "src/auto-imports.d.ts"),
  }),
  createComponentsPlugin(
    componentDirs,
    path.resolve(packageRoot, "src/components.d.ts"),
  ),
];

// 创建 SVG 雪碧图插件（传入图标目录路径数组）
export const createSvgSprite = (iconDirs: string[]) =>
  createSvgIconsPlugin({
    iconDirs,
    symbolId: "icon-[dir]-[name]",
    inject: "body-last",
    customDomId: "__svg_sprite__",
  });

// 创建子包（a、b 等）的完整 Vite 配置
export const createSubPackageViteConfig = (
  packageName: string,
  packageRoot?: string,
  options: { generateDts?: boolean } = {},
) => {
  const __dirname = packageRoot || process.cwd();
  const workspaceRoot = path.resolve(__dirname, "../../");

  const libConfig = {
    entry: path.resolve(__dirname, "src/index.ts"),
    formats: ["es"] as const,
    fileName: () => "index.js",
  };

  const elementPlusPlugins = createElementPlusPlugins(__dirname, [
    path.resolve(__dirname, "./src"),
  ]);

  const dtsPlugin = options.generateDts
    ? dts({
        include: ["src/**/*.ts", "src/**/*.vue"],
        outDir: "dist/types",
        insertTypesEntry: true,
      })
    : null;

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
        envDir: workspaceRoot,
        plugins: [
          ...(prodConfig.plugins ?? []),
          ...elementPlusPlugins,
          ...(dtsPlugin ? [dtsPlugin] : []),
        ],
        ...commonCssConfig,
        build: {
          ...prodConfig.build,
          rollupOptions: {
            external: workspaceExternals,
          },
        },
      };
    } else {
      const devConfig = createDevConfig();
      return {
        ...devConfig,
        root: __dirname,
        envDir: workspaceRoot,
        plugins: [...(devConfig.plugins ?? []), ...elementPlusPlugins],
        ...commonCssConfig,
      };
    }
  };
};
