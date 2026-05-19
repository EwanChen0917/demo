<template>
  <keenList @refresh="refreshList" @reset-search="resetAll" @clear-all="resetSearch">
    <template #search>
      <el-input v-model="search.poNumber" placeholder="请输入采购单号" />
    </template>
    <template #filters>
      <el-input
        v-model="supplierCodeInput"
        clearable
        placeholder="请输入供应链SKU"
        style="width: 250px"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
      <!-- <WarehouseSelect v-model="search.warehouseCodeList" multiple clearable/> -->
      <el-select
        style="width: 200px"
        placeholder="请选择目的仓"
        v-model="search.warehouseCodeList"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
        :teleported="false"
        :options="warehouseList"
        clearable
        filterable
      />
      <el-select
        placeholder="请选择状态"
        v-model="search.statusList"
        clearable
        :options="purchaseOrderStatusMap"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
      />
      <el-select
        placeholder="请选择任务类型"
        v-model="search.taskTypeList"
        clearable
        :options="purchaseOrderTypeMap"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
      />
      <DateRangePicker
        v-model:start-date="search.startDate"
        v-model:end-date="search.endDate"
        start-placeholder="下单开始时间"
        end-placeholder="下单结束时间"
        width="300px"
      />
    </template>
    <template #buttons></template>
    <template #tools-prepend></template>
    <StockTable
      :data="listData?.list"
      :columns="columns"
      :loading="listLoading"
      :show-index="true"
      @sort-change="handleSortChange"
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
  import DateRangePicker from '../components/common/DateRangePicker.vue';
  import { searchPrepend } from '../config';
  import { usePoolOwnerShipData } from '../hooks/usePoolOwnerShipData';
  import { getThreeMonthsAgo, getToday } from '../utils';
  import { purchaseOrderStatusMap, purchaseOrderTypeMap } from '../config/pool';

  const { warehouseList } = usePoolOwnerShipData({
    autoLoad: ['getWarehouseList'],
  });
  // ==================== 类型定义 ====================

  interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    slot?: string;
  }

  // ==================== 响应式状态 ====================
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
  const supplierCodeInput = computed({
    get() {
      const value = search.supplierCodeList as string[] | undefined;

      // 后端用数组，但 input 要字符串，这里做转换
      if (Array.isArray(value)) {
        // 多个用换行展示，也可以改成逗号等分隔符
        return value.join('\n');
      }
      return '';
    },
    set(newValue: string) {
      if (!newValue || !newValue.trim()) {
        // 为空时直接还原为 undefined，避免发空数组
        search.supplierCodeList = undefined;
        return;
      }

      // 支持换行 / 逗号分隔，按需调整
      const arr = newValue
        .split(/\r?\n|,/) // 按行或逗号切分
        .map((x) => x.trim())
        .filter((x) => x.length > 0);

      search.supplierCodeList = arr.length ? arr : undefined;
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
    runQuery,
    resetSearch,
  } = useList<
    CisApi.CisTaskPurchaseQueryList.RequestBody,
    CisApi.CisTaskPurchaseQueryList.ResponseBody
  >({
    searchDefaults: {
      poNumber: undefined,
      supplierCodeList: undefined,
      taskTypeList: undefined,
      warehouseCodeList: undefined,
      startDate: getThreeMonthsAgo(),
      endDate: getToday(),
      statusList: undefined,
      sortField: undefined,
      sortOrder: undefined,
    },
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisTaskPurchaseQueryList,
  });
  const searchType = ref('skuCodeList');
  const columns: TableColumn[] = [
    { prop: 'taskCode', label: '任务单号', minWidth: 200 },
    { prop: 'opTypeDesc', label: '任务类型', minWidth: 100 },
    { prop: 'priority', label: '优先级', minWidth: 100 },
    { prop: 'poNumber', label: '采购单号', minWidth: 100 },
    { prop: 'supplierName', label: '供应商', minWidth: 250 },
    { prop: 'warehouseName', label: '目的仓', minWidth: 100 },
    { prop: 'createTime', label: '下单日期', minWidth: 120, sortable: true },
    { prop: 'executeStatusDesc', label: '执行状态', minWidth: 120 },
    // { prop: 'returnStatusDesc', label: '回传状态', minWidth: 150 },
    { prop: 'updateTime', label: '执行时间', minWidth: 120 },
  ];
  /**
   * 处理排序变化
   */
  const handleSortChange = (data: any) => {
    search.sortField = data.sortField;
    search.sortOrder = data.sortOrder;
    runQuery();
  };
  const handleBatchSearch = (val: string) => {
    if (!val) {
      searchInputValue.value = '';
      return;
    }
    supplierCodeInput.value = val;
  };
  const batchSearchRef = ref<any>(null);
  const resetAll = () => {
    resetSearch();
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
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
