<template>
  <keenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @clear-all="resetSearch"
    auto-custom-fields
    :custom-fields-base="customFields"
    custom-fields-item-type="availableStockPage"
    v-model:hide-list="hideList"
  >
    <template #search>
      <el-input v-model="searchInputValue" clearable placeholder="请输入" style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px" @change="handleSearchTypeChange">
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
      <DeptMember v-model="search.salesmanCodeList" placeholder="业务员" multiple />
      <el-select
        v-model="search.siteCodeList"
        placeholder="门店/站点"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
        :options="siteList"
        label-prop="label"
        value-prop="value"
      />
      <CountrySelect
        ref="countryCodeListSelectRef"
        v-model="search.countryCodeList"
        placeholder="请选择国家"
        filterable
        clearable
        multiple
      />

      <el-select
        style="width: 200px"
        placeholder="选择仓库类型"
        v-model="search.warehouseTypeList"
        multiple
        clearable
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

      <el-select
        style="width: 200px"
        placeholder="选择平台"
        v-model="search.channelCodeList"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="search.warehouseCodeList"
        placeholder="仓库"
        clearable
        multiple
        style="width: 200px"
        collapse-tags
        collapse-tags-tooltip
        filterable
        :options="warehouseMap"
      />
    </template>

    <template #buttons>
      <ExportBtn
        :service="cisApi.cisInventoryAvailableExport"
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
      ref="stockTableRef"
      :data="listData?.list"
      :columns="showColumns"
      :loading="listLoading"
      :show-index="true"
      @sort-change="handleSortChange"
    >
      <template #poolName="{ row }">
        <OverflowTooltip :content="row.poolName + '_' + row.poolCode" :line="2" />
      </template>
      <template #reservedQuantity="{ row }">
        <div v-if="row.reservedQuantity > 0">
          <template v-if="reservedPopoverOpenKey === getReservedRowKey(row)">
            <el-popover :width="700" trigger="manual" :visible="true">
              <template #reference>
                <span style="color: #409eff; cursor: pointer" @click="handleHideReserved">
                  {{ row.reservedQuantity }}
                </span>
              </template>
              <div style="padding: 12px">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                  "
                >
                  <span style="font-size: 14px; font-weight: bold">预占明细</span>
                  <el-button link type="primary" size="small" @click="handleHideReserved">
                    关闭
                  </el-button>
                </div>
                <ReservedListTable ref="ReservedListTableRef" />
              </div>
            </el-popover>
          </template>
          <span
            v-else
            style="color: #409eff; cursor: pointer"
            @click="handleReservedQuantityClick(row)"
          >
            {{ row.reservedQuantity }}
          </span>
        </div>
        <span v-else>{{ row.reservedQuantity }}</span>
      </template>
    </StockTable>
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
  import { computed, ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import customFields from '@/views/stock/stockCenter/customFields/availableStockFields';
  import StockTable from '../components/StockTable.vue';
  import { STOCK_TYPE, searchPrepend } from '../config/index';
  import { usePoolOwnerShipData } from '../hooks/usePoolOwnerShipData';
  import { useBaseStock } from '../hooks/useBaseStock';
  import ReservedListTable from '../components/reservedListTable.vue';

  const { warehouseMap, getWarehouseMap } = useBaseStock();
  const { channelList, siteList } = usePoolOwnerShipData({
    autoLoad: ['getChannelList', 'getSiteList'],
  });
  // ==================== 类型定义 ====================
  interface TableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    slot?: string;
    sortField?: string;
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
  function handleSearchTypeChange() {
    searchPrepend.stockSearchTypes.forEach((item) => {
      search[item.value as keyof typeof search] = undefined;
    });
    current.value = 1;
    runQuery();
  }

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
    CisApi.CisInventoryAvailableQueryList.RequestBody,
    CisApi.CisInventoryAvailableQueryList.ResponseBody
  >({
    searchDefaults: {
      poolCodeList: undefined,
      skuCodeList: undefined,
      supplySkuList: undefined,
      warehouseCodeList: undefined,
      warehouseTypeList: ['SELF'],
      salesmanCodeList: undefined,
      countryCodeList: undefined,
      channelCodeList: undefined,
      siteCodeList: undefined,
      sortField: undefined,
      sortOrder: undefined,
    },
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisInventoryAvailableQueryList,
  });
  const searchType = ref('skuCodeList');
  const hideList = ref<string[]>([]);
  const columns: TableColumn[] = [
    { prop: 'supplySku', label: '供应链SKU', minWidth: 150, fixed: true },
    { prop: 'skuCode', label: '产品SKU', minWidth: 200 },
    { prop: 'skuName', label: '产品名称', minWidth: 300 },
    { prop: 'poolName', label: '分配池名称', minWidth: 250, slot: 'poolName' },
    // { prop: 'category', label: '品类', minWidth: 100 },
    { prop: 'warehouseName', label: '仓库', minWidth: 300 },
    { prop: 'warehouseTypeDesc', label: '仓库类型', minWidth: 100 },
    // { prop: 'totalQuantity', label: '在途在制数量', minWidth: 150 },
    { prop: 'unShelveQuantity', label: '收货未上架数量', minWidth: 150 },
    {
      prop: 'unsellableQuantity',
      label: '不可售数量',
      minWidth: 120,
      sortField: 'unsellableQuantity',
      sortable: true,
    },
    {
      prop: 'availableQuantity',
      label: '可售数量',
      minWidth: 120,
      sortField: 'availableQuantity',
      sortable: true,
    },
    {
      prop: 'reservedQuantity',
      label: '预占数量',
      minWidth: 120,
      sortField: 'reservedQuantity',
      sortable: true,
      slot: 'reservedQuantity',
    },
    {
      prop: 'lockedQuantity',
      label: '锁库数量',
      minWidth: 120,
      sortField: 'lockedQuantity',
      sortable: true,
    },
    // { prop: 'remainingQuantity', label: '剩余可售数量', minWidth: 150, sortField:'remainingQuantity',sortable: true },
    { prop: 'unit', label: '单位', minWidth: 120 },
    { prop: 'channelName', label: '平台', minWidth: 120 },
    { prop: 'countryName', label: '国家', minWidth: 120 },
    { prop: 'siteName', label: '店铺/站点', minWidth: 120 },
    { prop: 'salesmanName', label: '业务员', minWidth: 120 },
    { prop: 'isSharedDesc', label: '是否共享', minWidth: 120 },
    { prop: 'statusDesc', label: '状态', minWidth: 100 },
  ];

  const showColumns = computed(() => {
    return columns.filter((item) => !hideList.value.includes(item.prop));
  });

  /**
   * 处理排序变化
   */
  const handleSortChange = (data: any) => {
    // console.log(`${data.sortField} ${data.sortOrder}`);
    search.sortField = data.sortField;
    search.sortOrder = data.sortOrder;
    // 处理排序逻辑
  };
  const handleBatchSearch = (val: string) => {
    if (!val) {
      searchInputValue.value = '';
      return;
    }
    searchInputValue.value = val.replace(/\n/g, ',');
  };
  const batchSearchRef = ref<any>(null);
  const stockTableRef = ref<InstanceType<typeof StockTable> | null>(null);
  const resetAll = () => {
    resetSearch();
    stockTableRef.value?.clearSort();
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
  };
  const ReservedListTableRef = ref<InstanceType<typeof ReservedListTable> | null>(null);
  const reservedPopoverOpenKey = ref<string | null>(null);

  function getReservedRowKey(row: any) {
    return `${row?.supplySku ?? ''}_${row?.warehouseCode ?? ''}`;
  }

  function handleReservedQuantityClick(row: any) {
    const key = getReservedRowKey(row);
    if (reservedPopoverOpenKey.value === key) {
      return;
    }
    reservedPopoverOpenKey.value = key;
    nextTick(() => {
      ReservedListTableRef.value?.open({
        supplySku: row.supplySku,
        warehouseCode: row.warehouseCode,
        poolCode: row.poolCode,
      });
    });
  }

  function handleHideReserved() {
    reservedPopoverOpenKey.value = null;
    ReservedListTableRef.value?.close();
  }
  onMounted(() => {
    getWarehouseMap();
  });
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
