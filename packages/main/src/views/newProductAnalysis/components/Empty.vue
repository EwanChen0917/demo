<template>
  <div class="empty-content">
    <el-empty :image="emptyImage" :image-size="imageSize" :description="description"></el-empty>
  </div>
</template>

<script setup lang="ts" name="Empty">
  import { computed } from 'vue';
  import emptyImage from '@/views/newProductAnalysis/assets/images/icon-empty.png';

  interface Props {
    description?: string;
    imageSize?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    description: '暂无数据',
    imageSize: 64,
  });
</script>

<style scoped lang="scss">
  .empty-content {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    :deep(.el-empty__description p) {
      font-size: 12px;
      color: var(---N6);
    }
  }
</style>
