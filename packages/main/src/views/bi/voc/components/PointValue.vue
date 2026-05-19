<template>
  <div>
    <span class="point-value">{{ value.value }}</span>
    <span v-if="value.unit" class="unit">{{ value.unit }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    data: number | string | undefined;
    isRate?: boolean;
  }>();
  const value = computed(() => {
    if (props.isRate) {
      return formatRate(props.data, { maximumFractionDigits: 2 });
    }
    return formatNumberObj(props.data);
  });
</script>

<style lang="scss" scoped>
  .point-value {
    font-family: DIN;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 116.667% */
  }
  .unit {
    margin-left: 4px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: var(---N9, #1f1f1f);
  }
</style>
