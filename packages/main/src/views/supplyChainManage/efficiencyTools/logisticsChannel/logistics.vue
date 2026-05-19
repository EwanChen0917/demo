<template>
  <div class="logistics-page-container">
    <ProviderList v-model="supplier" />
    <LogisticsList ref="logisticsListRef" :supplier="supplier" @handleRowAction="handleRowAction" />
    <Edit
      ref="editRef"
      :currentSupplier="supplier"
      :currentChannel="currentChannelRow"
      :dataStatus="dataStatus"
      @update:dataStatus="(val) => (dataStatus = val)"
      @success="logisticsListRef.refreshList()"
    />
  </div>
</template>

<script setup lang="ts">
  // import { checkPermission } from '@/utils/permission';
  import ProviderList from './components/ProviderList.vue';
  import LogisticsList from './components/logisticsList.vue';
  import Edit from './components/Edit.vue';

  // const router = useRouter();
  // Tab相关
  const supplier = ref({
    supplierCode: '',
    supplierName: '',
  }); // 物流商id
  const currentChannelRow = ref(); // 当前选中的渠道行
  const editRef = ref();
  const logisticsListRef = ref();
  const dataStatus = ref<'detail' | 'add' | 'edit'>('detail'); // 详情|新增|编辑

  // 选中表格行
  const handleRowAction = (row, status) => {
    dataStatus.value = status;
    if (status === 'add') {
      currentChannelRow.value = null;
      editRef.value.clearData();
    } else if (currentChannelRow.value?.id !== row?.id) {
      currentChannelRow.value = row ? { ...row } : null;
    }
    // 清除表单校验
    nextTick(() => {
      if (editRef.value?.formRef) {
        editRef.value.formRef.clearValidate();
      }
    });
  };
</script>

<style scoped lang="scss">
  .logistics-page-container {
    display: grid;
    /**
     * 说明：
     * Grid item 默认 min-width:auto，会被其内容（如 el-table 的最小内容宽度/列 min-width）撑开，
     * 导致前两列“抢宽度”，第三列看起来被压缩。
     * 用 minmax(0, fr) + 子项 min-width:0，让 fr 真正按比例分配并允许内容在列内溢出/滚动。
     */
    grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr) minmax(0, 1fr);
    gap: 6px;
    padding: 10px;
    background-color: #f5f5f5;
    height: calc(100vh - 126px);

    > * {
      min-width: 0;
    }
    :deep(.select-row) {
      color: var(--el-color-primary) !important;
    }
    :deep(.el-table__row) {
      cursor: pointer;
    }
    :deep(.list-container) {
      background-color: #fff;
      border-radius: 10px;
      .list-search-wrapper {
        border-radius: 10px;
      }
      .list-table {
        margin: auto;
      }
    }
    :deep(.el-pagination__sizes) {
      .el-select {
        height: auto !important;
      }
    }
    /**
     * 分页：支持水平滚动（不换行），避免在窄列下把父容器撑破
     * 关键点：让子项不 shrink，产生真实 overflow，配合 overflow-x:auto 才会出现滚动条
     */
    :deep(.el-pagination) {
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 6px 0;
    }
    :deep(.el-pagination > *) {
      flex: 0 0 auto;
      margin-left: 0 !important;
    }
    /* 页码区（el-pager）限制最多占 30%，超出则在页码区内横向滚动 */
    :deep(.el-pagination .el-pager) {
      // flex: 0 1 30%;
      max-width: 25%;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    }
    :deep(.el-pagination .el-pager li) {
      flex: 0 0 auto;
    }
    /* 调整“分页条数”容器宽度，避免过宽抢占空间 */
    :deep(.el-pagination__sizes) {
      flex: 0 0 80px;
      width: 80px;
      min-width: 80px;
    }
    :deep(.el-pagination__sizes .el-select) {
      width: 80px;
    }
    :deep(.btn-prev),
    :deep(.el-pagination__sizes) {
      margin-left: 6px !important;
    }
    :deep(.el-pagination__jump) {
      .el-input {
        width: auto !important;
      }
    }
    :deep(.head-tools) {
      .split-line,
      .icon-quanping {
        display: none !important;
      }
    }
  }
</style>
