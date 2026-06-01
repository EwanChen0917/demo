<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="采购单号/采购仓库/供应链SKU"
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <!-- <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
    </template> -->
    <div class="ps-3">{{ code }}【{{ name }}】</div>
    <vxe-table border="inner" :data="listData?.recordList" v-loading="listLoading">
      <vxe-column field="code" title="采购单号" />
      <vxe-column field="warehouseDesc" title="采购仓库" />
      <vxe-column field="supplySku" title="供应链SKU" />
      <vxe-column field="productName" title="产品名称" />
      <vxe-column field="expectQty" title="预期数量" />
      <vxe-column field="realReceivedQty" title="实收数量" />
      <vxe-column field="purchaseWaitPickQty" title="未交数量" />
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
</template>

<script setup lang="ts" name="supplierManageWaitPick">
  import useList from '@/hooks/list/useList';
  import { supplierApi, SupplierApi } from '@/api';

  const route = useRoute();
  const { code, name } = route.query as {
    code?: string;
    name?: string;
  };

  const PAGE_SIZE = 10;
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
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    SupplierApi.LuteosSupplierPurchaseQueryList.RequestQuery,
    SupplierApi.LuteosSupplierPurchaseQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      supplierCode: code,
    },
    pageSize: PAGE_SIZE,
    service: supplierApi.luteosSupplierPurchaseQueryList,
  });
</script>

<style scoped lang="scss"></style>
