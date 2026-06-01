<template>
  <span class="word-box" :class="`word-box--${type}`" :style="customStyle">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  interface Props {
    text?: string;
    // 类型：gray 灰色 | blue 蓝色
    type?: 'gray' | 'blue';
    // 是否填充背景
    filled?: boolean;
    // 自定义颜色（会覆盖默认类型）
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    type: 'gray',
    filled: false,
  });

  // 预设颜色方案
  const typeColors = {
    gray: {
      border: '#DCDFE6',
      text: '#606266',
      bg: '#F5F7FA',
    },
    blue: {
      border: '#409EFF',
      text: '#409EFF',
      bg: '#ECF5FF',
    },
  };

  // 计算最终样式
  const customStyle = computed(() => {
    // 如果有自定义颜色，使用自定义颜色
    if (props.borderColor || props.backgroundColor || props.textColor) {
      return {
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      };
    }

    // 否则使用预设类型颜色
    const colors = typeColors[props.type];

    if (props.filled) {
      return {
        borderColor: colors.border,
        backgroundColor: colors.bg,
        color: colors.text,
      };
    }

    return {
      borderColor: colors.border,
      backgroundColor: 'transparent',
      color: colors.text,
    };
  });
</script>

<style lang="scss" scoped>
  .word-box {
    display: inline-flex;
    align-items: center;
    padding: 1px 4px;
    border: 1px solid;
    border-radius: 2px;
    font-size: 12px;
    line-height: 1.2;
    white-space: nowrap;
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
      opacity: 0.85;
    }

    // 灰色类型
    &--gray {
      // 默认样式在 computed 中处理
    }

    // 蓝色类型
    &--blue {
      // 默认样式在 computed 中处理
    }
  }
</style>
