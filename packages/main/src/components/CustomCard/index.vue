<template>
  <div class="custom-card">
    <div class="card-header">
      <slot name="header">
        <div v-if="id" :id="id">{{ title }}</div>
        <div v-else>{{ title }}</div>
      </slot>
    </div>
    <div class="card-body" v-loading="loading">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      id?: string;
      title?: string;
      loading?: boolean;
    }>(),
    {
      title: '',
      loading: false,
    }
  );
</script>
<style lang="scss" scoped>
  .custom-card {
    overflow: hidden;
    .card-header {
      margin-bottom: 8px;
      color: var(---N9, var(---N9, #1e2226));

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
    .card-body {
      padding: 16px;
      border-radius: 8px;
      background-color: #fff;
    }
  }
</style>
