<template>
  <div class="cell-percent">
    <div class="device-percent">
      <div :style="{ width: `${percent * 100}%`, backgroundColor: '#02B96B' }"></div>
    </div>
    <div class="percent-value">
      {{ String(formatPercent(percent)).padStart(3, ' ') }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import {formatPercent} from "../../bi/utils/utils";

withDefaults(
  defineProps<{
    percent: number;
  }>(),
  {
    percent: 0
  }
);
</script>

<style scoped lang="scss">
.cell-percent {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .device-percent {
    min-width: 0;
    flex: 1;
    height: 6px;
    display: flex;
    box-sizing: content-box;
    background: var(---N3, #EDEDED);
  }

  .percent-value {
    word-break: keep-all;
  }
}
</style>