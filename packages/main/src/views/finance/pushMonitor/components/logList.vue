<template>
  <div class="monitor-log-list"></div>
  <vxe-table
    :data="logs"
    :sort-config="{ defaultSort: { field: 'operationTime', order: 'desc' } }"
    border
    height="540"
    highlight-hover-row
    class="border-line-table"
  >
    <!-- 操作时间 -->
    <vxe-column field="createTime" title="操作时间" sortable></vxe-column>

    <!-- 操作人 -->
    <vxe-column field="operator" title="操作人">
      <template #default="{ row }">
        {{ row.operator || '-' }}
      </template>
    </vxe-column>

    <!-- 操作类型 -->
    <vxe-column field="operationTypeDesc" title="操作类型"></vxe-column>

    <!-- 操作内容 -->
    <vxe-column field="pushStatus" title="推送状态">
      <template #default="{ row }">
        <el-tag :type="getStatusTag(row.itemContentObj.pushStatus)?.type" disable-transitions>
          {{ getStatusTag(row.itemContentObj.pushStatus)?.text }}
        </el-tag>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup lang="ts">
  const props = defineProps({
    logs: {
      type: Array,
      default: () => [],
    },
  });
  const getStatusTag = (pushStatus) => {
    // 0 未推送 1推送成功 2推送失败
    switch (pushStatus) {
      case 0:
        return { type: 'info', text: '单据未推送' };
      case 1:
        return { type: 'success', text: '单据推送成功' };
      case 2:
        return { type: 'danger', text: '单据推送失败' };
      default:
        return { type: 'info', text: '-' };
    }
  };
</script>

<style scoped lang="scss">
  .monitor-log-list {
    padding: 12px;
  }
</style>