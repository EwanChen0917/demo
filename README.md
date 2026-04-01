# Vue3 Monorepo

## 项目说明

这是一个基于 pnpm workspace 的 Vue 3 Monorepo，包含一个主应用和两个业务子包：

- @app/main：唯一运行入口，负责菜单、路由和页面装配
- @app/a：A 业务模块，导出视图组件
- @app/b：B 业务模块，导出视图组件
- @app/shared：共享 Vite 配置和构建能力

当前架构下，a 和 b 不作为独立应用启动，统一由 main 在运行时按路由加载。

## 技术栈

- Vue 3
- TypeScript
- Vite 5
- Vue Router 4
- Element Plus
- pnpm workspace

## 目录结构

```text
packages/
  a/        A 业务模块
  b/        B 业务模块
  main/     主应用
  shared/   共享 Vite 配置
dist/       统一构建输出目录
```

## 路由说明

主应用使用 Hash 路由：

- / 重定向到 /a/a1
- /a/a1 加载 A1 页面
- /a/a2 加载 A2 页面
- /b 加载 B 页面

main 对 A、B 模块采用懒加载，构建时会拆分为独立业务 chunk，避免首屏一次性加载全部模块。

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

### 生产构建

```bash
pnpm run build
```

构建顺序：

1. 构建 @app/a
2. 构建 @app/b
3. 构建 @app/main

## 构建输出

所有构建产物统一输出到仓库根目录下的 dist。

典型输出结构如下：

```text
dist/
  index.html
  assets/
  a/
    index.esm.js
    index.js
    style.css
    index.d.ts
  b/
    index.esm.js
    index.js
    style.css
    index.d.ts
```

说明：

- dist/index.html 是主应用浏览器入口
- dist/a 和 dist/b 是两个子包的库产物
- 主应用资源输出在 dist/assets 下

## 运行与预览

完成构建后，可以直接预览主应用产物：

```bash
pnpm run preview
```

如果只是查看打包后的静态入口，主页面文件位于 dist/index.html。

注意：当前主应用使用 Hash 路由，预览访问时请使用 `/#/` 形式的路径，例如：

- `http://127.0.0.1:4173/#/a/a1`
- `http://127.0.0.1:4173/#/a/a2`
- `http://127.0.0.1:4173/#/b`

## 部署说明

当前部署对象是主应用产物，也就是整个 dist 目录。

部署时建议保持以下目录结构不变：

- dist/a/\*
- dist/b/\*
- dist/index.html
- dist/assets/\*

原因是 main 在构建和运行过程中会引用 a、b 的构建产物，虽然浏览器入口位于 dist/index.html，但 dist/a 和 dist/b 仍然属于完整产物的一部分，不应在部署时删掉。

如果使用静态资源服务器部署，只需要把仓库根目录下的 dist 作为站点根目录即可。

## 产物角色

- dist/index.html 和 dist/assets 是主应用可直接访问的静态资源
- dist/a 和 dist/b 是 workspace 子包的库产物，主要用于主应用构建期和类型解析
- @app/a 和 @app/b 在当前架构下不是独立站点，没有各自单独的浏览器入口页

这意味着当前仓库的交付单位是一个站点，而不是三个独立前端应用。

## 共享配置策略

Vite 配置尽量复用 @app/shared 中的公共能力：

- 公共插件和基础配置放在 shared
- 统一管理生产构建配置
- 统一管理 dist 输出目录

各业务包只保留自身必要的 root、端口、别名和少量覆盖项。

## 开发联调说明

当前开发模式下，只启动 @app/main，但编辑 a 和 b 的源码也会直接影响主应用页面。

原因有两层：

- Vite 在 main 中通过别名把 @app/a 和 @app/b 指向 packages/a/src 和 packages/b/src
- TypeScript 在根 tsconfig.json 中通过 paths 把 @app/a 和 @app/b 指向 dist 下生成的声明文件

这套设计的作用是：

- 运行时直接使用源码，开发联调响应更快
- 类型系统优先使用构建产物中的声明文件，避免 main 把 a、b 的全部源码项目直接吞进去

如果你修改了 a 或 b 的导出接口，而编辑器里没有立刻拿到新类型，可以先重新执行一次：

```bash
pnpm run build
```

这样会重新生成 dist/a 和 dist/b 下的声明文件。

## 新增子模块接入

如果后续要新增一个类似 @app/c 的业务模块，建议按下面的顺序接入。

1. 在 packages 下新增 c 包，并提供统一导出入口，例如在 src/index.ts 中导出页面组件。
2. 参考 a 或 b 的写法，为 c 配置独立的 vite.config.ts，并复用 shared 中的公共构建配置。
3. 在根 package.json 中补充对应的构建脚本，例如 build:c，并把它加入总 build 流程。
4. 在根 tsconfig.json 的 paths 中加入 @app/c 到 dist/c/index.d.ts 的映射。
5. 在 main 的 Vite 别名中加入 @app/c 到 packages/c/src 的映射。
6. 在 main 路由中通过动态 import("@app/c") 的方式接入页面，保持和现有懒加载模式一致。
7. 执行 pnpm run build，确认 dist/c 产物和声明文件生成正常。

接入原则：

- 运行时优先引用源码
- 类型系统优先引用声明文件
- 构建输出统一落到根目录 dist
- 公共 Vite 能力尽量沉淀到 shared，而不是在各业务包里重复配置

## 注意事项

- 不要再通过 pnpm run dev -- --host ... 透传参数，直接使用现成的 dev:host 脚本
- main 在开发和构建时通过别名直接引用 a、b 源码，编辑体验更直接
- TypeScript 通过根 tsconfig.json 中的 paths 映射解析子包声明文件
