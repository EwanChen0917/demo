<template>
  <el-dialog
    width="900px"
    title="操作日志"
    class="logDialog"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.logList"
      row-key="id"
      class-name="table-row-dashed"
      max-height="500px"
    >
      <el-table-column prop="operationTime" label="操作时间" min-width="100px" />
      <el-table-column prop="operationTypeDesc" label="操作类别" min-width="60px" />
      <el-table-column prop="operatorName" label="操作人" min-width="60px" />
      <el-table-column prop="operationContent" label="操作内容" min-width="160px">
        <template #default="{ row }">
          <OverflowTooltip :content="JSON.parse(row?.operationContent)" :line="3" />
        </template>
      </el-table-column>
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
  import { OmsApi, omsApi, platformApi, PlatformApi } from '@/api';

  import useList from '@/hooks/list/useList';

  const visible = ref(false);

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
  } = useList<OmsApi.OmsCommonLogQueryLog.RequestBody, OmsApi.OmsCommonLogQueryLog.ResponseBody>({
    searchDefaults: {
      itemCode: '',
      itemType: 'erp_order',
      moduleType: 'erp',
      pageNum: 1,
      pageSize: PAGE_SIZE,
      countFlag: 1,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: omsApi.omsCommonLogQueryLog,
    serviceManual: true,
  });

  const open = (uniqueCode) => {
    search.itemCode = uniqueCode;
    runQuery();
    setTimeout(() => {
      visible.value = true;
    }, 150);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
