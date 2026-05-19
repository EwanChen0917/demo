<template>
  <keenList @refresh="refreshList" @reset-search="resetSearch" @clear-all="resetSearch">
    <template #search>
      <el-input v-model="searchInputValue" clearable placeholder="请输入" style="width: 350px">
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
      <el-input v-model="search.sn" placeholder="请输入SN码" style="width: 200px" />
      <el-input v-model="search.inboundNo" placeholder="请输入入库单号" style="width: 200px" />
      <el-input v-model="search.poNumber" placeholder="请输入采购单号" style="width: 200px" />
      <DateRangePicker
        v-model:start-date="search.inboundTimeStart"
        v-model:end-date="search.inboundTimeEnd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        width="300px"
      />
    </template>

    <template #buttons>
      <ExportBtn
        :service="cisApi.cisInventorySnExport"
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
      :data="listData?.recordList"
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
  import { ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import StockTable from '../components/StockTable.vue';
  import { searchPrepend } from '../config';
  import DateRangePicker from '../components/common/DateRangePicker.vue';
  import { getThreeMonthsAgo, getToday } from '../utils';

  interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    slot?: string;
  }
  // ==================== 响应式状态 ====================

  // const tableData = ref<any[]>([]);
  const columns: TableColumn[] = [
    { prop: 'taskLineNo', label: '任务单行号', minWidth: 200 },
    { prop: 'taskType', label: '任务类型', minWidth: 200 },
    { prop: 'inboundLineNo', label: '入库单行号', minWidth: 200 },
    { prop: 'warehouseCode', label: '仓库', minWidth: 200 },
    { prop: 'poNumber', label: '采购单号', minWidth: 200 },
    { prop: 'soNumber', label: '销售单号', minWidth: 150 },
    { prop: 'skuCode', label: '产品SKU', minWidth: 150 },
    { prop: 'supplySku', label: '供应链SKU', minWidth: 120 },
    { prop: 'productCategory', label: '品类', minWidth: 120 },
    { prop: 'inboundTime', label: '入库日期', minWidth: 150, sortable: true },
  ];
  // const loading = ref(false);
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
    CisApi.CisInventorySnQueryList.RequestBody,
    CisApi.CisInventorySnQueryList.ResponseBody
  >({
    searchDefaults: {
      inboundNo: undefined,
      inboundTimeEnd: getToday(),
      inboundTimeStart: getThreeMonthsAgo(),
      poNumber: undefined,
      skuCodeList: undefined,
      supplySkuList: undefined,
      sn: undefined,
    },
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisInventorySnQueryList,
  });
  const searchType = ref('skuCodeList');
  /**
   * 处理批量搜索
   */
  const handleBatchSearch = (value: string) => {
    // const processedValue = value?.replace(/\n/g, ',');
    // searchForm.value.snCode = processedValue;
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
