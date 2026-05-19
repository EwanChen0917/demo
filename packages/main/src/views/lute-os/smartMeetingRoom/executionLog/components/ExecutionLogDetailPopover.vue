<template>
  <el-popover placement="left" width="360" trigger="hover" :show-arrow="true">
    <template #reference>
      <el-button type="primary" link>详情</el-button>
    </template>

    <div class="detail-popover">
      <div class="detail-line">
        <span class="label">执行流水号:</span>
        <span class="value">{{ row.executionSerialNo || '-' }}</span>
      </div>
      <div class="detail-line">
        <span class="label">任务编号:</span>
        <span class="value">{{ row.taskCode || '-' }}</span>
      </div>
      <div class="detail-line">
        <span class="label">触发源:</span>
        <span class="value">{{ row.triggerSource || '-' }}</span>
      </div>
      <div class="detail-line">
        <span class="label">触发条件:</span>
        <span class="value">{{ row.triggerCondition || '-' }}</span>
      </div>
      <div class="detail-line">
        <span class="label">执行动作:</span>
        <span class="value">{{ row.executeAction || '-' }}</span>
      </div>
      <div class="detail-line">
        <span class="label">执行状态:</span>
        <span class="value">{{ row.statusDesc || '-' }}</span>
      </div>
      <div class="detail-line error">
        <span class="label">错误原因:</span>
        <span class="value">{{ row.errorMsg || '-' }}</span>
      </div>
      <div class="detail-line detail-json">
        <span class="label">详细信息:</span>
        <pre class="json-value">{{ detailText }}</pre>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts" name="ExecutionLogDetailPopover">
  import { isEmpty, isNil } from 'lodash-es';
  import type { ExecutionLogListItem } from '../types';

  const { row } = defineProps<{
    row: ExecutionLogListItem;
  }>();

  const detailText = computed(() => {
    if (isNil(row.detail) || isEmpty(row.detail.trim())) return '-';

    try {
      return JSON.stringify(JSON.parse(row.detail), null, 2);
    } catch {
      return row.detail;
    }
  });
</script>

<style lang="scss" scoped>
  .detail-popover {
    font-size: 12px;
    color: #333;
    padding: 3px 6px;
  }

  .detail-line {
    display: flex;
    gap: 8px;
    line-height: 18px;
    margin-bottom: 6px;
    .label {
      width: 80px;
      color: #999;
      flex-shrink: 0;
    }
    .value {
      color: #333;
      word-break: break-word;
    }
  }

  .detail-line.error .value {
    color: #f56c6c;
    font-weight: 600;
  }

  .detail-line.detail-json {
    align-items: flex-start;
  }

  .json-value {
    margin: 0;
    flex: 1;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #ebeef5;
    background: #f5f7fa;
    color: #606266;
    line-height: 18px;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 180px;
    overflow: auto;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }
</style>
