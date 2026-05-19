<template>
  <div class="shopify-label-list">
    <template v-if="!labelList || labelList.length === 0">
      <span class="empty-label">-</span>
    </template>
    <template v-else>
      <span
        v-for="label in displayLabels"
        :key="label.labelCode"
        class="label-item"
        :class="{
          'label-item-warn':
            label.warn ||
            label.labelName === 'Shopify-中风险订单' ||
            label.labelName === 'Shopify-高风险订单',
          'label-replacement': label.labelName.indexOf('replacement') > -1,
        }"
        :style="{ backgroundColor: label.color || '#e4e7ed' }"
      >
        <OverflowTooltip :content="label.labelName" :line="1" :font-size="12" />
      </span>
      <el-popover
        v-if="hasMore"
        placement="top"
        :width="200"
        trigger="hover"
        popper-class="label-list-popover"
      >
        <template #reference>
          <span class="more-label">+{{ remainingCount }}</span>
        </template>
        <div class="remaining-labels">
          <div
            v-for="label in remainingLabels"
            :key="label.labelCode"
            class="remaining-label-item"
            :style="{ backgroundColor: label.color || '#e4e7ed' }"
          >
            <OverflowTooltip :content="label.labelName" :line="1" :font-size="12" />
          </div>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  export interface LabelItem {
    labelCode: string;
    labelName: string;
    color?: string;
  }

  const props = defineProps<{
    labelList?: LabelItem[];
  }>();

  const MAX_DISPLAY = 2;

  const displayLabels = computed(() => {
    if (!props.labelList || props.labelList.length === 0) {
      return [];
    }
    return props.labelList.slice(0, MAX_DISPLAY);
  });

  const remainingLabels = computed(() => {
    if (!props.labelList || props.labelList.length <= MAX_DISPLAY) {
      return [];
    }
    return props.labelList.slice(MAX_DISPLAY);
  });

  const hasMore = computed(() => {
    return props.labelList && props.labelList.length > MAX_DISPLAY;
  });

  const remainingCount = computed(() => {
    return remainingLabels.value.length;
  });
</script>

<style scoped lang="scss">
  .shopify-label-list {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;

    .empty-label {
      color: #909399;
      font-size: 14px;
    }

    .label-item {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #606266;
      background-color: #e4e7ed;
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label-replacement {
      background-color: #caf1cf !important;
      border-color: #caf1cf !important;
    }
    .label-item-warn {
      background-color: #ffeeeb !important;
      border-color: #ffeeeb !important;
      color: #f53f3f !important;
      max-width: 130px !important;
      :deep(.content) {
        color: #f53f3f !important;
      }
    }

    .more-label {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #606266;
      background-color: #f0f2f5;
      cursor: pointer;
      border: 1px dashed #dcdfe6;
      transition: all 0.2s;

      &:hover {
        background-color: #e4e7ed;
        border-color: #c0c4cc;
      }
    }
  }
</style>

<style lang="scss">
  .label-list-popover {
    .remaining-labels {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 200px;
      overflow-y: auto;
      padding: 2px 4px;
      .remaining-label-item {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        color: #606266;
        background-color: #e4e7ed;
        white-space: nowrap;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
