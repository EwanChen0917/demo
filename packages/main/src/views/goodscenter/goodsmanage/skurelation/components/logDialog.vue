<template>
  <el-dialog width="900px" title="日志" v-model="visible" @close="visible = false" align-center>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.logDetailList"
      row-key="uniqueCode"
      class-name="table-row-dashed"
    >
      <el-table-column prop="operationTypeDesc" label="操作类别" min-width="100px" />
      <el-table-column prop="content" label="操作内容" min-width="240px">
        <template #default="{ row }">
          <OverflowTooltip :content="JSON.parse(row?.content)" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="sourceDesc" label="操作入口" min-width="120px" />
      <el-table-column prop="createTime" label="操作时间" min-width="120px" />
      <el-table-column prop="operatorName" label="操作人" min-width="100px" />
    </el-table>

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer></template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, ProductApi } from '@/api';

  import useList from '@/hooks/list/useList';

  const visible = ref(false);

  const PAGE_SIZE = 10;

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
  } = useList<
    ProductApi.LuteosProductQueryProductList.RequestBody,
    ProductApi.LuteosProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      uniqueCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuQueryRelationLog,
    serviceManual: true,
  });

  const open = (uniqueCode) => {
    search.uniqueCode = uniqueCode;
    runQuery();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
