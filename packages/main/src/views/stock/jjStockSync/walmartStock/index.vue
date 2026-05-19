<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search[searchType]" clearable style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px">
            <el-option
              v-for="item in searchTypes.jjWalmartSeachTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo" />
        </template>
        <template #append v-if="searchType !== 'productName'">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <WarehouseSelect platformCode="WALMART" v-model="search.warehouseCodes" clearable multiple />
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpJiJiaInventorySyncWalmartListExport"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>1.数据源为积加平仓库存-WFS库存</div>
          <div>2.数据实时更新</div>
        </template>
        <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)" />
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="warehouseName" label="仓库" min-width="120" fixed="left" />
      <el-table-column prop="itemId" label="ItemID" min-width="140" fixed="left" />
      <el-table-column prop="msku" label="MSKU" min-width="140" fixed="left" />
      <el-table-column prop="gtin" label="GTIN" min-width="140" fixed="left" />
      <el-table-column prop="skuName" label="产品名称" min-width="150" fixed="left" />
      <el-table-column prop="sku" label="供应链SKU" min-width="140" fixed="left" />
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <Tag :color="row.status ? 'success' : 'yellow'" size="small">
            {{ row.status ? '正常' : '异常' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="brandName" label="品牌名称" min-width="120" />
      <el-table-column prop="availableQuantity" label="可售" min-width="100" sortable />
      <el-table-column prop="damagedQuantity" label="拒收(损坏)" min-width="120" sortable />
      <el-table-column prop="inboundQuantity" label="入库量" min-width="100" sortable />
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
</template>

<script setup lang="ts" name="walmartStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import WarehouseSelect from '@/views/stock/components/warehouseSelect.vue';
  import { searchTypes } from '@/views/stock/components/searchTypes';
  import { pick } from 'lodash-es';

  const searchType = ref('mskus');
  const batchSearchRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();

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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpJiJiaInventorySyncQueryWalmartList.RequestQuery,
    ErpApi.LuteosErpJiJiaInventorySyncQueryWalmartList.ResponseBody
  >({
    searchDefaults: {
      mskus: undefined,
      gtins: undefined,
      itemIds: undefined,
      skus: undefined,
      skuName: undefined,
      warehouseCodes: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.jjWalmartSeachTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });
        return {
          ...pick(data, [[searchType.value], 'warehouseCodes', 'orderBy', 'asc']),
        };
      }
      return data;
    },
    service: erpApi.luteosErpJiJiaInventorySyncQueryWalmartList,
  });
  const handleSortChange = (sort) => {
    if (sort.order) {
      search.orderBy = sort.prop;
      search.asc = sort.order === 'ascending';
    } else {
      search.orderBy = undefined;
      search.asc = undefined;
    }
  };
  const handleBatchSearch = (val) => {
    search[searchType.value] = val?.replace(/\n/g, ',');
  };
  const reset = () => {
    batchSearchRef.value?.clear();
    resetSearch();
  };
</script>

<style scoped></style>
