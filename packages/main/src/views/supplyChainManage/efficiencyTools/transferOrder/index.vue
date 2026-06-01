<template>
  <el-tabs v-model="search.tabStatus" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.code"
      :label="item.statusName"
      :name="item.code"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="resetSearchByKey"
  >
    <template #search>
      <el-select v-model="codeType" style="width: 103px" @change="selectCode">
        <el-option :value="0" label="调拨单号" />
        <el-option :value="1" label="关联发货单" />
        <el-option :value="2" label="关联货件单" />
      </el-select>
      <el-input
        v-model="search[codeMap[codeType]]"
        placeholder="批量搜索请用空格或‘,’隔开"
        style="width: 300px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        placeholder="调出仓"
        v-model="search.warehouseCodeList"
        clearable
        filterable
        remote
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        :remote-method="remoteSearchOutWarehouse"
        :loading="outWarehouseLoading"
        reserve-keyword
        @visible-change="onOutWarehouseVisible"
      >
        <el-option
          v-for="item in outWarehouseSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        placeholder="调入仓"
        v-model="search.arrivalWarehouseCodeList"
        clearable
        filterable
        remote
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        :remote-method="remoteSearchArrivalWarehouse"
        :loading="arrivalWarehouseLoading"
        reserve-keyword
        @visible-change="onArrivalWarehouseVisible"
      >
        <el-option
          v-for="item in arrivalWarehouseSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        placeholder="出库状态"
        v-model="search.outFlagList"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        class="w-175px"
        v-if="search.tabStatus === 'all'"
      >
        <el-option
          v-for="item in outFlagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        placeholder="拣货状态"
        v-model="search.pickFlagList"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        class="w-175px"
        v-if="search.tabStatus === 'all'"
        :options="pickFlagOptions"
      />
      <DeptMember v-model="search.creatorList" placeholder="创建人" multiple />
    </template>
    <template #buttons>
      <ExportBtn :service="erpApi.luteosErpDeliveryOrderExport" :params="exportParams">
        导出
      </ExportBtn>
      <el-button
        type="primary"
        @click="batchPush"
        v-if="search.tabStatus === 'all'"
        :loading="batchPushLoading"
      >
        推送调拨单
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      row-key="erpCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="search.tabStatus !== 'cancelled'"
        type="selection"
        min-width="40"
        reserve-selection
      />
      <el-table-column prop="erpCode" label="调拨单号" min-width="120" />
      <el-table-column prop="warehouseName" label="调出仓" min-width="120" />
      <el-table-column prop="arrivalWarehouseName" label="调入仓" min-width="120" />
      <el-table-column prop="statusDesc" label="单据状态" min-width="120" />
      <el-table-column prop="pickFlagDesc" label="拣货状态" min-width="120" />
      <el-table-column prop="outFlagDesc" label="出库状态" />
      <el-table-column prop="shipmentId" label="关联货件单" min-width="120" />
      <el-table-column prop="dlCode" label="关联发货单" min-width="120" />
      <el-table-column prop="quantity" label="调拨量" />
      <el-table-column prop="shipmentQuantity" label="已出运" />
      <el-table-column prop="viewLotNoQuantity" label="已调入" />
      <el-table-column prop="skuSpecies" label="产品种类" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建日期" min-width="120" />
      <el-table-column prop="expectShipmentDate" label="预计出运日期" min-width="120" />
      <el-table-column prop="pickTime" label="完成拣货日期" min-width="120" />
      <el-table-column prop="executorDate" label="操作出库日期" min-width="120" />
      <el-table-column prop="xySyncDesc" label="接口信息" min-width="100">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.xySyncDesc" :line="1" />
        </template>
      </el-table-column>
      <el-table-column prop="xyPlanCode" label="兴运计划单号" min-width="110" />
      <el-table-column width="120px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '产品明细',
                key: 'log',
                type: 'primary',
                permissionCode: '',
                row,
              },
            ]"
            @click="handleActions"
          />
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
  <Detail ref="logRef" />
  <BatchUpdateDialog ref="batchPushDialogRef" title="推送调拨单" @success="handleBatchPush" />
</template>

<script lang="ts" setup name="transferOrder">
  import { ElMessage } from 'element-plus';
  import { debounce } from 'lodash-es';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, dataApi } from '@/api';
  import BatchUpdateDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/batchUpdateDialog.vue';
  import Detail from './components/detail.vue';

  const PAGE_SIZE = 10;

  const outFlagOptions = [
    { label: '未出库', value: 0 },
    { label: '已出库', value: 1 },
  ];

  const pickFlagOptions = [
    { label: '未拣货', value: 0 },
    { label: '已拣货', value: 1 },
    { label: '拣货中', value: 2 },
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
    runQuery,
    resetSearch,
    refreshList,
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    ErpApi.LuteosErpDeliveryOrderQueryList.RequestQuery,
    ErpApi.LuteosErpDeliveryOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      erpCode: undefined,
      dlCode: undefined,
      shipmentId: undefined,
      warehouseCodeList: [],
      pickFlagList: [],
      outFlagList: [],
      arrivalWarehouseCodeList: [],
      creatorList: [],
      tabStatus: 'all',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpDeliveryOrderQueryList,
    // serviceManual: true,
  });

  const tabStatusList = [
    { code: 'all', statusName: '全部', count: '' },
    { code: 'notAudit', statusName: '待提交', count: '' },
    { code: 'waitAudit', statusName: '审核中', count: '' },
    { code: 'auditPass', statusName: '待拣货', count: '' },
    { code: 'waitOutbound', statusName: '待出库', count: '' },
    { code: 'outbound', statusName: '调拨在途', count: '' },
    { code: 'finish', statusName: '已完成', count: '' },
    { code: 'cancelled', statusName: '已作废', count: '' },
  ];

  const getQueryParam = () => {};

  const exportParams = computed(() => ({
    ...search,
    queryParam: getQueryParam(),
  }));

  const resetSearchByKey = (key: string) => {
    (search as Record<string, unknown>)[key] = undefined;
  };

  const codeType = ref(0);
  const logRef = ref();
  const batchPushLoading = ref(false);
  const batchPushDialogRef = ref(null);
  const normalizePushCodes = (val: string | (string | number)[]): string[] => {
    if (Array.isArray(val)) {
      return val.map((s) => String(s).trim()).filter(Boolean);
    }
    return String(val)
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const batchPush = async () => {
    if (!codeList.value.length) {
      batchPushDialogRef.value?.open();
      return;
    }
    handleBatchPush(codeList.value);
  };
  const handleBatchPush = async (val: string | (string | number)[]) => {
    try {
      const params = normalizePushCodes(val);
      if (!params.length) {
        ElMessage.error('调拨单号不能为空');
        return;
      }
      if (params.length > 50) {
        ElMessage.error('最多输入50条');
        return;
      }
      batchPushLoading.value = true;
      const res = await erpApi.luteosErpDeliveryOrderPushXyPlan(params);
      if (res?.failList.length > 0) {
        const content = res.failList
          .map((fail) => {
            return `订单号：${fail.orderCode}，失败原因：${fail.message}`;
          })
          ?.join('\n');
        ElMessage.error(content);
      } else {
        ElMessage.success('推送成功');
        batchPushDialogRef.value?.close();
        tableRef.value?.clearSelection();
        codeList.value = [];
        refreshList();
      }
    } finally {
      batchPushLoading.value = false;
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    logRef.value?.open(row?.skuList);
  };

  const codeMap = { 0: 'erpCode', 1: 'dlCode', 2: 'shipmentId' };

  const selectCode = () => {
    const arr = ['erpCode', 'dlCode', 'shipmentId'];
    arr.forEach((i) => {
      if (i !== codeMap[codeType.value]) {
        search[i] = undefined;
      }
    });
  };

  const WAREHOUSE_PAGE_SIZE = 100;

  type WarehouseOption = { label: string; value: string };

  const warehouseLabelByCode = ref<Record<string, string>>({});

  const rememberWarehouseLabels = (list: { warehouseDesc?: string; warehouseCode?: string }[]) => {
    const map = warehouseLabelByCode.value;
    for (const item of list) {
      const v = item.warehouseCode ?? '';
      if (!v) continue;
      map[v] = `${item.warehouseDesc ?? ''} - ${v}`;
    }
    warehouseLabelByCode.value = { ...map };
  };

  const toWarehouseOptions = (
    list: { warehouseDesc?: string; warehouseCode?: string }[] | undefined
  ): WarehouseOption[] => {
    if (!list?.length) return [];
    rememberWarehouseLabels(list);
    return list.map((item) => ({
      label: `${item.warehouseDesc ?? ''} - ${item.warehouseCode ?? ''}`,
      value: item.warehouseCode ?? '',
    }));
  };

  const mergeOptionsForSelected = (
    remoteList: WarehouseOption[],
    selectedCodes: string[] | undefined
  ): WarehouseOption[] => {
    const map = new Map(remoteList.map((o) => [o.value, o]));
    for (const code of selectedCodes ?? []) {
      if (!code || map.has(code)) continue;
      const label = warehouseLabelByCode.value[code];
      if (label) map.set(code, { value: code, label });
    }
    return [...map.values()];
  };

  const outWarehouseRemoteOptions = ref<WarehouseOption[]>([]);
  const outWarehouseLoading = ref(false);
  const arrivalWarehouseRemoteOptions = ref<WarehouseOption[]>([]);
  const arrivalWarehouseLoading = ref(false);

  const outWarehouseSelectOptions = computed(() =>
    mergeOptionsForSelected(outWarehouseRemoteOptions.value, search.warehouseCodeList as string[])
  );
  const arrivalWarehouseSelectOptions = computed(() =>
    mergeOptionsForSelected(
      arrivalWarehouseRemoteOptions.value,
      search.arrivalWarehouseCodeList as string[]
    )
  );

  const fetchWarehouseRemote = async (keyword: string) => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      pageNum: 1,
      pageSize: WAREHOUSE_PAGE_SIZE,
      ...(keyword.trim() ? { warehouseDesc: keyword.trim() } : {}),
    });
    return toWarehouseOptions(res?.warehouseList);
  };

  const doRemoteSearchOut = async (query: string) => {
    outWarehouseLoading.value = true;
    try {
      outWarehouseRemoteOptions.value = await fetchWarehouseRemote(query);
    } finally {
      outWarehouseLoading.value = false;
    }
  };

  const doRemoteSearchArrival = async (query: string) => {
    arrivalWarehouseLoading.value = true;
    try {
      arrivalWarehouseRemoteOptions.value = await fetchWarehouseRemote(query);
    } finally {
      arrivalWarehouseLoading.value = false;
    }
  };

  const remoteSearchOutWarehouse = debounce((query: string) => {
    doRemoteSearchOut(query);
  }, 300);

  const remoteSearchArrivalWarehouse = debounce((query: string) => {
    doRemoteSearchArrival(query);
  }, 300);

  const onOutWarehouseVisible = (visible: boolean) => {
    if (visible && outWarehouseRemoteOptions.value.length === 0) {
      remoteSearchOutWarehouse.cancel();
      doRemoteSearchOut('');
    }
  };

  const onArrivalWarehouseVisible = (visible: boolean) => {
    if (visible && arrivalWarehouseRemoteOptions.value.length === 0) {
      remoteSearchArrivalWarehouse.cancel();
      doRemoteSearchArrival('');
    }
  };

  /** 进入页面拉一次首屏仓库列表（一次请求，两个下拉共用） */
  const prefetchWarehouseOptionsOnMount = async () => {
    outWarehouseLoading.value = true;
    arrivalWarehouseLoading.value = true;
    try {
      const opts = await fetchWarehouseRemote('');
      outWarehouseRemoteOptions.value = opts;
      arrivalWarehouseRemoteOptions.value = opts;
    } finally {
      outWarehouseLoading.value = false;
      arrivalWarehouseLoading.value = false;
    }
  };

  onMounted(() => {
    prefetchWarehouseOptionsOnMount();
  });
</script>

<style scoped lang="scss">
  .old-product-sku-list {
    &:last-child {
      margin: 0;
    }
  }

  .fa-copy {
    margin-top: -4px;
    margin-left: 10px;
  }

  .platform-sku {
    color: #3e97ff;
    text-decoration: underline;
    cursor: pointer;
  }

  .text-primary {
    color: #3e97ff;
  }

  .platform-wrap {
    display: flex;
    flex-direction: row;
  }

  .path4 {
    display: inline-block;
    width: 20px;
    height: 16px;
    line-height: 8px;
    text-align: center;
    color: #999;
    border-radius: 5px;
    background: #ccc;
    margin-left: 10px;
    margin-top: 2px;
    cursor: pointer;
  }

  .sku-popover {
    padding: 20px;

    div {
      margin-bottom: 5px;
    }
  }
</style>
