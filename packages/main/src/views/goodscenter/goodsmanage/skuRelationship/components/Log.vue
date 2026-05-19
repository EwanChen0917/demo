<template>
  <el-dialog title="日志" v-model="visible" @close="visible = false">
    <el-table :data="logList" v-loading="listLoading" max-height="500">
      <el-table-column label="操作类型" prop="operationTypeDesc" />
      <el-table-column label="操作员" prop="operatorName" />
      <el-table-column label="操作时间" prop="operationTime" />
      <el-table-column label="操作内容" prop="operationContent" />
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi, PlatformApi } from '@/api';
  import useList from '@/hooks/list/useList';

  const visible = ref(false);
  const PAGE_SIZE = 100;
  const logList = ref([]);
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listLoading,
  } = useList<PlatformApi.PlatformQueryLog.RequestQuery, PlatformApi.PlatformQueryLog.ResponseBody>(
    {
      searchDefaults: {
        itemCode: '',
        itemType: 'product_sku_old_new',
        moduleType: 'erp',
      },
      pageSize: PAGE_SIZE,
      serviceManual: true,
      service: platformApi.platformQueryLog,
      onSuccess: (res) => {
        logList.value = res.logList || [];
      },
    }
  );

  const open = (skuCode) => {
    visible.value = true;
    if (skuCode) {
      search.itemCode = skuCode;
    }
  };

  defineExpose({
    open,
  });
</script>
<style scoped lang="scss">
:deep(.el-pagination__total.is-first) {
  display: none;
}
</style>
