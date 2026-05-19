<template>
  <div class="tab-switch">
    <button
      v-for="item in tabs"
      :key="item.value"
      class="tab-button"
      :class="{ active: checkValue === item.value }"
      @click="handleClick(item.value)"
    >
      <span>{{ item.label }}</span>
      <!-- <span class="tab-count">{{ item.count }}</span> -->
    </button>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      checkValue: string;
      tabs: Array<{
        label: string;
        value: string;
        count: number;
      }>;
    }>(),
    {
      tabs: () => [],
    }
  );

  const emit = defineEmits<{
    (e: 'update:checkValue', value: string): void;
    (e: 'change', value: string): void;
  }>();

  const handleClick = (value: string) => {
    emit('update:checkValue', value);
    emit('change', value);
  };
</script>

<style scoped lang="scss">
  .tab-switch {
    display: inline-flex;
    overflow: hidden;
    border-radius: 8px;
    background: #f7f7f7;
    padding: 2px;
  }

  .tab-button {
    padding: 5px 16px;
    height: 32px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 6px;
    /* 常规/Medium 14 */
    font-size: 14px;
    font-style: normal;
    line-height: 22px; /* 157.143% */
    color: var(---N8, #666);
    /* 常规/Regular 14 */
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    &.active {
      background-color: white;
      color: #000;
      color: var(---N9, #1f1f1f);
      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
      box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.06);
    }

    .tab-count {
      margin-left: 6px;
      color: var(---N8, #666);
      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
  }
</style>
