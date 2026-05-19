<template>
  <div class="table-tip">
    <div class="tip-text">{{ text }}</div>
    <div v-if="$slots.default" class="tip-actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    text: string;
  }>();
  const { text } = props;
</script>

<style scoped lang="scss">
  .table-tip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f7fa;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 12px;
    font-size: 13px;
    color: #606266;
    margin-top: 12px;
  }

  .tip-text {
    font-weight: 600;
    color: #f53f3f;
  }

  .tip-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
