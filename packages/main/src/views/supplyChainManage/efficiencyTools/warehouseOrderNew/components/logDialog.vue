<template>
  <el-dialog width="900px" title="日志" v-model="visible" @close="visible = false" align-center>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.logList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column prop="operationTypeDesc" label="日志名称" min-width="120px">
        <template #default="{ row }">
          <OverflowTooltip :content="JSON.parse(row?.operationContent)" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="operationTime" label="更新时间" min-width="120px" />
      <el-table-column prop="operatorName" label="操作人" min-width="120px" />
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

  const PAGE_SIZE = 10;
  const props = defineProps<{
    itemType: string;
  }>();

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
  } = useList<PlatformApi.PlatformQueryLog.RequestBody, PlatformApi.PlatformQueryLog.ResponseBody>({
    searchDefaults: {
      itemCode: '',
      itemType: props.itemType ?? 'platform_operation',
      moduleType: 'erp',
      pageNum: 1,
      pageSize: 10,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformQueryLog,
    serviceManual: true,
  });

  const open = (uniqueCode) => {
    search.itemCode = uniqueCode;
    runQuery();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
