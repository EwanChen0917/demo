<template>
  <el-tooltip v-if="content" content="复制" placement="top" >
    <template #default>
      <i
        class="iconfont icon-fuzhi copy cursor-pointer"
        :style="{ fontSize: size + 'px' }"
        @click.stop="copyFn(content, tips)"
      ></i>
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
  import { copyFn } from '@/utils/copyFn';

  withDefaults(
    defineProps<{
      content: string;
      tips?: string;
      size?: number;
    }>(),
    {
      tips: '',
      size: 14,
    }
  );
</script>

<style scoped lang="scss">
  .copy {
    margin-left: 6px;

    &:hover {
      color: #02b96b !important;
    }
  }

  .icon-fuzhi {
    color: #999999;
  }
</style>
