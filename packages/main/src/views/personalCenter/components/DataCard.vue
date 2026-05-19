<template>
  <div class="data-card">
    <div class="data-card__header">
      <div class="title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <slot name="actions"></slot>
    </div>
    <div class="data-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<style lang="scss" scoped>
  .data-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 16px;
    .data-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title {
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 14px;
          border-radius: 15px;
          background-color: var(---P6, #02b96b);
          margin-right: 8px;
          position: relative;
          top: 1px;
        }
      }
    }
  }
</style>
