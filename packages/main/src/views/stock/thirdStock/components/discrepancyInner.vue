<template>
  <div class="discrepancy-wrapper">
    <div class="discrepancy-item">
      <span class="label">ERP:</span>
      <el-tooltip
        v-if="formatNumber(erpCount).length > 15"
        :content="formatNumber(erpCount)"
        placement="top"
      >
        <span class="value">{{ formatNumber(erpCount) }}</span>
      </el-tooltip>
      <span v-else class="value">{{ formatNumber(erpCount) }}</span>
    </div>
    <div class="discrepancy-item">
      <span class="label">三方仓:</span>
      <el-tooltip
        v-if="formatNumber(thirdCount).length > 15"
        :content="formatNumber(thirdCount)"
        placement="top"
      >
        <span class="value">{{ formatNumber(thirdCount) }}</span>
      </el-tooltip>
      <span v-else class="value">{{ formatNumber(thirdCount) }}</span>
    </div>
    <div class="discrepancy-item">
      <span class="label">差异:</span>
      <el-tooltip
        v-if="formatNumber(difference).length > 10"
        :content="formatNumber(difference)"
        placement="top"
      >
        <span class="value" :class="differenceClass">{{ formatNumber(difference) }}</span>
      </el-tooltip>
      <span v-else class="value" :class="differenceClass">{{ formatNumber(difference) }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  
  interface Props {
    erpCount?: number | string | null;
    thirdCount?: number | string | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    erpCount: 0,
    thirdCount: 0,
  });

  const parseNumber = (value: number | string | null | undefined): number => {
    if (value === null || value === undefined) {
      return 0;
    }
    if (typeof value === 'number') {
      return isNaN(value) ? 0 : value;
    }
    if (typeof value === 'string') {
      const parsed = Number(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const erpCountNum = computed(() => parseNumber(props.erpCount));
  const thirdCountNum = computed(() => parseNumber(props.thirdCount));

  const difference = computed(() => {
    return thirdCountNum.value - erpCountNum.value;
  });

  const differenceClass = computed(() => {
    const diff = difference.value;
    if (diff > 0) {
      return 'difference-positive';
    } else if (diff < 0) {
      return 'difference-negative';
    }
    return '';
  });

  const formatNumber = (value: number | string | null | undefined): string => {
    const num = parseNumber(value);
    return num.toString();
  };
</script>
<style scoped lang="scss">
  .discrepancy-wrapper {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
    .discrepancy-item {
      display: flex;
      align-items: center;
      gap: 8px;

      .label {
        color: #666;
        font-size: 14px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .value {
        font-size: 14px;
        font-weight: 500;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }

      .difference-positive {
        color: #67c23a;
      }

      .difference-negative {
        color: #f56c6c;
      }
    }
  }
</style>
