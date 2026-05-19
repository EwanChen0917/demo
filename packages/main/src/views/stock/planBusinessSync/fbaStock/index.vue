<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search[searchType]" clearable placeholder="请输入" style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px">
            <el-option
              v-for="item in searchTypes.fbaSearchTypes"
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
      <WarehouseSelect
        platformCode="AMAZON"
        v-model="search.warehouseCodeList"
        clearable
        multiple
      />
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpPlanInventoryAmazonExportList"
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
          1.数据源为积加平台库存--FBA库存
          <br />
          2.数据每小时整点更新一次
        </template>
        <div>上次更新时间：{{ listData?.lastSyncTime || '--' }}</div>
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
      <el-table-column prop="asin" label="ASIN" min-width="150" fixed="left" />
      <el-table-column prop="msku" label="MSKU" min-width="140" fixed="left" />
      <el-table-column prop="fnsku" label="FNSKU" min-width="140" fixed="left" />
      <el-table-column prop="productName" label="产品名称" min-width="140" fixed="left" />
      <el-table-column prop="supplySku" label="供应链SKU" min-width="140" fixed="left" />
      <el-table-column v-for="col in planStockTableColumns" :key="col.prop" v-bind="col">
        <template #header>
          {{ col.label }}
          <el-tooltip placement="top">
            <template #content>
              <component :is="col.tips['fba']" />
            </template>
            <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)" />
          </el-tooltip>
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
</template>

<script setup lang="ts" name="planFbaStock">
import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import WarehouseSelect from '../../components/warehouseSelect.vue';
  import { searchTypes } from '../../components/searchTypes';
  import { planStockTableColumns } from '../components/tableColumns.tsx';
  import { pick } from 'lodash-es';

  const searchType = ref('msku');
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
    ErpApi.LuteosErpLogisticsTransportQueryList.RequestQuery,
    ErpApi.LuteosErpLogisticsTransportQueryList.ResponseBody
  >({
    searchDefaults: {
      asin: undefined,
      msku: undefined,
      fnsku: undefined,
      supplySku: undefined,
      productName: undefined,
      warehouseCodeList: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.fbaSearchTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });

        return {
          ...pick(data, [[searchType.value], 'warehouseCodeList', 'orderBy', 'asc']),
        };
      }
      return data;
    },
    service: erpApi.luteosErpPlanInventoryAmazonQueryList,
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
