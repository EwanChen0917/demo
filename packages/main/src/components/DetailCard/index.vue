<template>
  <div class="card detail-card">
    <div class="card-header">
      <span class="card-title">{{ title }}</span>
      <slot name="operation"></slot>
    </div>
    <div class="card-content p-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['title']);
</script>

<style scoped lang="scss">
  .detail-card {
    margin-bottom: 20px;
    .card-header {
      align-items: center;
    }
  }
</style>
