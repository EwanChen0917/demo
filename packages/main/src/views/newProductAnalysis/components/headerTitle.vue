<template>
  <div class="header-title">
    <div class="title-indicator"></div>
    <h1
      class="title"
      :style="{
        fontSize: fontSize + 'px',
      }"
    >
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title: string;
      fontSize?: number;
    }>(),
    {
      fontSize: 14,
    }
  );
</script>

<style scoped lang="scss">
  .header-title {
    display: flex;
    align-items: center;
    gap: 12px;

    .title-indicator {
      width: 3px;
      height: 14px;
      background: #02b96b;
      border-radius: 2px;
    }

    .title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #1f1f1f;
      margin: 0;
    }
  }
</style>
