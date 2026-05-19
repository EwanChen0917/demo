# Vue 多窗口组件 使用说明

## 介绍
`Multipane` 是一个 Vue 组件，用于创建多窗口布局。它允许用户通过拖动分隔条来调整窗口大小。

## 使用方法

### 引入组件
在你的 Vue 文件中引入并注册组件：
```vue
<template>
  <Multipane>
    <div>窗口 1</div>
    <MultipaneResizer>
      自定义拓展分割符
    </MultipaneResizer>
    <div>窗口 2</div>
  </Multipane>
</template>

<script lang='ts' setup>
import Multipane from '@/components/MultiPane' // 已自动引入，无需手动引入
import MultipaneResizer from '@/components/MultiPane/MultipaneResizer.vue';
</script>
```

### 配置选项
`Multipane` 组件支持以下配置选项：

- `layout`: 布局方向，可选值为 `horizontal` 或 `vertical`，默认为 `horizontal`。
- `resizer`: 自定义分隔条样式。

### 示例
```vue
<template>
  <Multipane layout="vertical">
    <div>窗口 1</div>
    <MultipaneResizer>
      自定义拓展分割符
    </MultipaneResizer>
    <div>窗口 2</div>
    <MultipaneResizer>
      自定义拓展分割符
    </MultipaneResizer>
    <div>窗口 3</div>
  </Multipane>
</template>
```

## 事件
`Multipane` 组件提供以下事件：
- `pane-resize-start`: 当窗口改变开始时触发
- `pane-resize`: 当窗口大小改变时触发
- `pane-resize-end`: 当窗口改变结束时触发

### 示例
```vue
<template>
  <multipane @pane-resize="onPaneResize">
    <pane>窗口 1</pane>
    <pane>窗口 2</pane>
  </multipane>
</template>

<script lang='ts' setup>
  const onPaneResize = () => {
    console.log('窗口大小:', size);
  }
</script>
```

## 结论
`Multipane` 是一个强大的 Vue 组件，适用于需要多窗口布局的应用程序。通过简单的配置和事件处理，可以轻松实现复杂的布局需求。

## 注意
为了保证拖拽时，窗口改变的正确性，请使用`box-sizing: border-box`
