# Vue3 Monorepo

## 项目说明

这是一个基于 pnpm workspace 的 Vue 3 Monorepo，包含主应用、业务子包和共享组件库。

- @app/main: 主应用入口，负责菜单、路由和页面装配
- @app/a: A 业务模块，导出视图组件
- @app/b: B 业务模块，导出视图组件
- @app/shared: 共享能力包，包含通用组件和复用的 Vite 配置

当前架构下，main 是唯一浏览器入口，a 和 b 以模块方式被 main 加载。

## 环境要求

根 package 已声明 engines。

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## 技术栈

- Vue 3
- TypeScript
- Vite 5
- Vue Router 4
- Element Plus
- Sass
- pnpm workspace

## 目录结构

```text
packages/
  a/        A 业务模块
  b/        B 业务模块
  main/     主应用
  shared/   共享组件与共享配置
dist/       统一构建输出目录
```

## 路由说明

主应用使用 Hash 路由。

- / 加载 Home 页面
- /a/a1 加载 A1 页面
- /a/a2 加载 A2 页面
- /b 加载 B 页面

路由管理策略。

- main 只做路由聚合
- a、b 子包分别维护自己的路由定义

main 对 A、B 模块采用懒加载，构建时会拆分业务 chunk 和 vendor chunk。

## 共享组件策略

shared 组件放在 `packages/shared/src/components`，通过统一 Vite 配置在 main、a、b 中自动注册。

这意味着在各包的 Vue 模板里可以直接使用组件标签，无需手写 import。

shared 目前包含示例组件。

- BaseButton
- BaseInput

注意: shared 仍然保留 `src/index.ts` 作为库构建导出入口，新增组件时需要在该文件补充导出。

## 样式策略

项目已接入 Sass，Vue SFC 样式统一使用 `lang="scss"`。

同时在 Vite 配置中统一启用了 `silenceDeprecations: ["legacy-js-api"]`，用于静默 Sass legacy-js-api 警告。

## 开发命令

在仓库根目录执行。

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm run dev
```

该命令只启动 @app/main。

### 启动局域网访问

```bash
pnpm run dev:host
```

## 构建命令

### 全量构建

```bash
pnpm run build
```

构建顺序。

1. 构建 @app/shared
2. 构建 @app/a
3. 构建 @app/b
4. 构建 @app/main

### 分包构建

```bash
pnpm run build:shared
pnpm run build:a
pnpm run build:b
pnpm run build:main
```

## 构建输出

所有构建产物统一输出到仓库根目录下的 dist。

典型输出结构如下。

```text
dist/
  index.html
  assets/
  a/
    index.js
    style.css
    index.d.ts
  b/
    index.js
    style.css
    index.d.ts
```

说明。

- dist/index.html 是主应用浏览器入口
- dist/assets 是主应用资源
- dist/a 和 dist/b 是业务子包库产物

## 预览与静态运行

### 推荐方式

```bash
pnpm run preview
```

该命令使用 Vite preview，和构建配置保持一致。

### 使用 live-server

如果使用 live-server，请把 dist 作为站点根目录启动。

```bash
cd dist
live-server
```

或

```bash
live-server dist/
```

不要直接双击打开 index.html。

## 部署说明

当前部署对象是主应用产物，也就是整个 dist 目录。

部署时建议保持目录结构不变。

- dist/index.html
- dist/assets/\*
- dist/a/\*
- dist/b/\*

原因是 main 在构建和类型解析过程中会依赖 a、b 的产物。

## 配置复用策略

Vite 配置尽量复用 shared 中的公共能力。

- 公共基础配置在 `packages/shared/vite.config.base.ts`
- 公共生产构建能力在 `packages/shared/vite.config.prod.ts`
- 公共 CSS 配置通过 `commonCssConfig` 复用
- a、b 子包通过 `createSubPackageViteConfig` 复用统一构建与插件配置
- 自动导入能力（`unplugin-auto-import`）与组件自动注册（`unplugin-vue-components`）由 shared 统一下发

main、a、b 仅保留必要的覆盖项，避免重复配置。

## 分包策略

main 在生产构建时采用自动分包策略。

- 业务源码命中 `packages/<pkg>/src/` 时自动归并到 `feature-<pkg>`
- 第三方依赖归并到 `vendor-ui`、`vendor-vue`、`vendor`

该策略不依赖页面文件命名规则，新增业务子包时无需再手动修改分包配置。

## 注意事项

- 不要通过 `pnpm run dev -- --host ...` 透传参数，直接使用 `dev:host`
- main 在开发和构建时通过别名直接引用 a、b、shared 源码
- 构建后建议优先使用 `pnpm run preview` 验证产物
