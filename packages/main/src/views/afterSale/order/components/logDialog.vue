<template>
  <el-dialog title="日志" v-model="visible" @close="visible = false">
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <el-table ref="tableRef" v-loading="listLoading" :data="listData?.logList" max-height="60vh">
        <el-table-column prop="operationTypeDesc" label="日志名称" />
        <el-table-column prop="operationTime" label="更新时间" />
        <el-table-column prop="operatorName" label="操作人" />
        <el-table-column prop="operationContent" label="备注" />
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi } from '@/api';

  const PAGE_SIZE = 100;

  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<PlatformApi.PlatformQueryLog.RequestQuery, PlatformApi.PlatformQueryLog.ResponseBody>(
    {
      searchDefaults: {
        moduleType: 'erp',
        itemType: undefined,
        itemCode: undefined,
        transferKfOperator: true,
      },
      // eslint-disable-next-line no-shadow
      // interceptSearchData: (searchData) => searchData,
      pageSize: PAGE_SIZE,
      service: platformApi.platformQueryLog,
      serviceManual: false,
    }
  );

  const visible = ref(false);

  const open = (itemCode, itemType) => {
    search.itemCode = itemCode;
    search.itemType = itemType;
    visible.value = true;
    refreshList();
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
