<template>
  <div>
    <span class="indicator-value">
      {{ valueObject.value }}
    </span>
    <span class="indicator-unit">
      {{ valueObject.unit }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { formatRate, formatNumberObj } from '@/views/bi/utils/utils';

  const props = defineProps<{
    value: number | string | null;
    isRate: boolean;
  }>();
  const valueObject = computed(() => {
    if (props.isRate) {
      return formatRate(props.value as number);
    }
    return formatNumberObj(props.value);
  });
</script>

<style lang="scss" scoped>
  .indicator-value {
    font-size: 24px;
    font-weight: 500;
    color: var(---N9, #333);
    /* 中等/Medium 24 */
    font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  }
</style>
