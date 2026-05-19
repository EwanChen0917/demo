<template>
  <keenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input v-model="searchInputValue" clearable placeholder="请输入1" style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px" @change="resetSearch">
            <el-option
              v-for="item in searchPrepend.stockSearchTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input v-model="search.poNumber" placeholder="请输入采购单号" style="width: 200px" />
      <el-input v-model="search.inboundNo" placeholder="请输入入库单号" style="width: 200px" />
      <DateRangePicker
        v-model:start-date="search.inboundTimeStart"
        v-model:end-date="search.inboundTimeEnd"
        start-placeholder="入库时间开始"
        end-placeholder="入库时间结束"
        width="300px"
      />
      <el-select
        placeholder="选择仓库类型"
        v-model="search.warehouseTypeList"
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="item in STOCK_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>

    <template #buttons>
      <ExportBtn
        :service="cisApi.cisInventoryLedgerExport"
        :params="{
          ...search,
          downLoadSync: false,
          pageNum: current,
          pageSize: pageSize,
        }"
        :plain="false"
      >
        导出
      </ExportBtn>
    </template>
    <template #tools-prepend></template>
    <StockTable
      :data="listData?.list"
      :columns="columns"
      :loading="listLoading"
      :show-index="true"
    />
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </keenList>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import StockTable from '../components/StockTable.vue';
  import DateRangePicker from '../components/common/DateRangePicker.vue';
  import { searchPrepend, STOCK_TYPE } from '../config';
  // import { usePoolOwnerShipData } from '../hooks/usePoolOwnerShipData';
  import { getThreeMonthsAgo, getToday } from '../utils';

  // const { channelList, siteList } = usePoolOwnerShipData({
  //   autoLoad: ['getChannelList', 'getSitelList'],
  // });
  // ==================== 类型定义 ====================

  interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    slot?: string;
  }

  const columns: TableColumn[] = [
    { prop: 'taskCodeLine', label: '任务单行号', minWidth: 150 },
    { prop: 'taskTypeDesc', label: '任务类型', minWidth: 150 },
    { prop: 'inboundNo', label: '入库单行号', minWidth: 150 },
    { prop: 'supplierName', label: '供应商', minWidth: 150 },
    { prop: 'warehouseCode', label: '仓库', minWidth: 150 },
    { prop: 'warehouseType', label: '仓库类型', minWidth: 150 },
    { prop: 'poNumber', label: '采购单号', minWidth: 150 },
    // { prop: 'documentNo', label: '销售单号', minWidth: 150 },
    { prop: 'skuCode', label: '产品SKU', minWidth: 150 },
    { prop: 'supplySku', label: '供应链SKU', minWidth: 150 },
    { prop: 'category', label: '品类', minWidth: 150 },
    // { prop: 'documentNo', label: '上架未质检数量', minWidth: 150 },
    // { prop: 'bookType', label: '上架可售数量', minWidth: 120 },
    // { prop: 'warehouse', label: '上架不可售数量', minWidth: 120 },
    { prop: 'inboundTime', label: '入库日期', minWidth: 150, sortable: true },
    { prop: 'inboundDay', label: '入库天数', minWidth: 100 },
    // { prop: 'operator', label: '上架日期', minWidth: 100 },
    { prop: 'price', label: '采购单价', minWidth: 150, sortable: true },
    { prop: 'tax', label: '税额', minWidth: 150, sortable: true },
    { prop: 'amount', label: '含税金额', minWidth: 150, sortable: true },
    // { prop: 'operateTime', label: '分配池编码', minWidth: 150, sortable: true },
    // { prop: 'operateTime', label: '分配池名称', minWidth: 150, sortable: true },
  ];
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
    // runQuery,
    resetSearch,
  } = useList<
    CisApi.CisInventoryLedgerQueryList.RequestBody,
    CisApi.CisInventoryLedgerQueryList.ResponseBody
  >({
    searchDefaults: {
      inboundTimeStart: getToday(),
      inboundTimeEnd: getThreeMonthsAgo(),
      poNumber: undefined,
      inboundNo: undefined,
      skuCodeList: undefined,
      supplierCodeList: undefined,
      supplySkuList: undefined,
      warehouseList: undefined,
      warehouseTypeList: undefined,
    },
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisInventoryLedgerQueryList,
  });
  // ==================== 方法 ====================
  const searchType = ref('skuCodeList');
  const searchInputValue = computed({
    get: () => {
      const searchKey = searchType.value as keyof typeof search;
      const value = search[searchKey];
      if (Array.isArray(value)) {
        return value.filter(Boolean).join(',');
      }
      return '';
    },
    set: (val: string) => {
      const searchKey = searchType.value as keyof typeof search;
      const arrayValue = val
        ? val
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : undefined;
      searchPrepend.stockSearchTypes.forEach((item) => {
        if (item.value !== searchType.value) {
          search[item.value as keyof typeof search] = undefined;
        }
      });
      search[searchKey] = arrayValue as any;
    },
  });
  const handleBatchSearch = (val: string) => {
    if (!val) {
      searchInputValue.value = '';
      return;
    }
    searchInputValue.value = val.replace(/\n/g, ',');
  };
</script>

<style scoped lang="scss">
  // keenList 已经提供了统一的样式，这里只需要自定义样式
  .icon-sousuo {
    color: #909399;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
</style>
