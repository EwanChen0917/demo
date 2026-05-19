<template>
  <div class="data-card">
    <div class="data-card__header" @click="$emit('click')">
      <div class="title">
        <slot name="title">
          {{ title }}
        </slot>
        <slot name="ext"></slot>
      </div>
      <slot name="actions"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title?: string;
  }>();
  defineEmits<{
    click: [];
  }>();
</script>

<style lang="scss" scoped>
  .data-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 16px 24px;
    .data-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .title {
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC Medium', 'PingFang SC';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
        display: flex;
        align-items: center;
        justify-content: start;
        column-gap: 8px;
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 14px;
          border-radius: 15px;
          background-color: var(---P6, #02b96b);
        }
      }
    }
  }
</style>
