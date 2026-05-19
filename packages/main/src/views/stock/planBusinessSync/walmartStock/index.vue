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
              v-for="item in searchTypes.walmartSearchTypes"
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
        platformCode="WALMART"
        v-model="search.warehouseCodeList"
        clearable
        multiple
      />
    </template>
    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpPlanInventoryWalmartExportList"
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
          <div>
            1.可用库存、在库存库数据来源为积加-库存-平台库存-Walmart库存
            <br />
            2.在途库存和计划库存数据来源为自研ERP物流跟踪表和积加调拨单计算
            <br />
            3.数据每小时整点更新一次
            <br />
          </div>
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
      <el-table-column prop="warehouse" label="仓库" min-width="120" fixed="left">
        <template #default="{ row }">
          <OverflowTooltip :content="row.warehouse" :line="2" />
        </template>
      </el-table-column>
      <el-table-column prop="itemId" label="ItemID" min-width="120" fixed="left" />
      <el-table-column prop="countryCode" label="国家" min-width="100" fixed="left" />
      <el-table-column prop="msku" label="MSKU" min-width="100" fixed="left" />
      <el-table-column prop="gtin" label="GTIN" min-width="100" fixed="left" />
      <el-table-column prop="productName" label="产品名称" min-width="120" fixed="left" />
      <el-table-column prop="supplySku" label="供应链SKU" min-width="120" fixed="left" />
      <el-table-column prop="skuCode" label="产品SKU" min-width="120" fixed="left" />
      <el-table-column v-for="col in planStockTableColumns" :key="col.prop" v-bind="col">
        <template #header>
          {{ col.label }}
          <el-tooltip placement="top">
            <template #content>
              <component :is="col.tips['walmart']" />
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

<script setup lang="ts" name="planWalmartStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { searchTypes } from '../../components/searchTypes';
  import WarehouseSelect from '../../components/warehouseSelect.vue';
  import { planStockTableColumns } from '../components/tableColumns';
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
      itemId: undefined,
      msku: undefined,
      gtin: undefined,
      skuCode: undefined,
      supplySku: undefined,
      productName: undefined,
      warehouseCodeList: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.walmartSearchTypes.forEach((item) => {
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
    service: erpApi.luteosErpPlanInventoryWalmartQueryList,
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
