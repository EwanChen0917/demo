<template>
  <el-tag :size="size" :class="[type === 'light' ? 'status-tag' : 'basic-tag', color]">
    <slot></slot>
  </el-tag>
</template>

<script setup lang="ts">
  defineProps({
    color: {
      type: String,
      // red blue yellow green purple gray black
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      default: 'light',
    },
  });
</script>

<style scoped lang="scss">
  .status-tag {
    height: 20px;
    padding: 0 4px;
    font-family: 'PingFang SC';
    min-width: 48px;
    // border: none;
    // height: 28px;
    &.red {
      color: var(---C7, #f53f3f);
      background-color: var(---l7, #ffeeeb);
      border-color: var(---l7, #ffeeeb);
    }

    &.blue {
      color: var(---C2, #258dff);
      background-color: var(---l2, #e8f4ff);
      border-color: var(---l2, #e8f4ff);
    }

    &.yellow {
      color: var(---C5, #ff9f22);
      background-color: var(---l5, #fffaeb);
      border-color: var(---l5, #fffaeb);
    }

    &.green {
      color: var(---P6, #02b96b);
      // background-color: #ffffff;
      // border-color: var(---P6, #02b96b);
    }

    &.gray {
      color: var(---N9, #1f1f1f);
      background-color: #ededed;
      border-color: #ededed;
    }

    &.orange {
      color: var(---C6, #ff663e);
      background-color: var(---l6, #fff1e8);
      border-color: var(---l6, #fff1e8);
    }

    &.purple {
      color: var(---C1, #a55bf5);
      background-color: var(---l1, #f7e8ff);
      border-color: var(---l1, #f7e8ff);
    }

    &.pink {
      color: var(---C8, #ff4eaf);
      background-color: var(---l8, #ffe8f1);
      border-color: var(---l8, #ffe8f1);
    }

    &.black {
      color: #78829d;
      background-color: #dbdfe9;
      border-color: #dbdfe9;
    }
  }

  .basic-tag {
    &.red {
      color: #ffffff;
      background-color: #f53f3f;
      border-color: #f53f3f;
    }

    &.blue {
      color: #ffffff;
      background-color: #009ef7;
      border-color: #009ef7;
    }

    &.yellow {
      color: #ffffff;
      background-color: #ff9f22;
      border-color: #ff9f22;
    }

    &.green {
      color: #ffffff;
      background-color: #02b96b;
      border-color: #02b96b;
    }

    &.gray {
      color: #ffffff;
      background-color: #b6babf;
      border-color: #b6babf;
    }

    &.purple {
      color: #ffffff;
      background-color: #a55bf5;
      border-color: #a55bf5;
    }

    &.black {
      color: #ffffff;
      background-color: #071437;
      border-color: #071437;
    }
  }
</style>
