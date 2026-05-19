<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.snCode"
        placeholder="产品与供应商映射码"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-model="search.keyword"
        placeholder="产品名称/产品SKU/产品SPU"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-model="search.supplierCode"
        placeholder="供应商代码"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addSnVisible = true">创建产品与供应商映射码</el-button>
      <el-button type="primary" @click="uploadVisible = true" class="import-btn">导入</el-button>
      <ExportBtn :service="productApi.luteosProductSkuSnExportSkuSn" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.skuSnList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品SKU信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo
            :title="row.skuName"
            :subtitle="row.skuCode"
            :hideImage="true"
            copy-title
            copy-subtitle
            :url="`/skulist/detail?code=${row.skuCode}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="产品SPU信息" min-width="180">
        <template #default="{ row }">
          <GoodsInfo
            :title="row.productName"
            :subtitle="row.productSpu"
            :hideImage="true"
            copy-title
            copy-subtitle
            :url="`/goodslist/detail?code=${row.productSpu}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="供应商代码" min-width="150">
        <template #default="{ row }">
          <div>{{ row.supplierName }}</div>
          <div>{{ row.supplierCode }}</div>
        </template>
      </el-table-column>
      <el-table-column label="产品与供应商映射码" prop="snCode" min-width="100" />
      <el-table-column label="创建信息" min-width="150">
        <template #default="{ row }">
          <div>{{ row.creatorName }}</div>
          <div>{{ row.createTime }}</div>
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
  </KeenList>
  <AddSn v-if="addSnVisible" :visible="addSnVisible" @close="handleAddSnClose" />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="sku_supplier_sn"
    title="导入"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="productsn">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import AddSn from './Modal/addSn.vue';

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
    ProductApi.LuteosProductSkuSnQuerySkuSnList.RequestQuery,
    ProductApi.LuteosProductSkuSnQuerySkuSnList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      snCode: undefined,
      supplierCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuSnQuerySkuSnList,
  });

  const addSnVisible = ref(false);
  const handleAddSnClose = (reload) => {
    if (reload) {
      runQuery();
    }
    addSnVisible.value = false;
  };
  const uploadVisible = ref(false);
  const batchUpdate = (reload) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .input-search {
    width: 260px !important;
    margin-right: 10px;
  }
</style>
