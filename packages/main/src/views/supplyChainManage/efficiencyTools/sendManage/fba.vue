<template>
  <el-tabs v-model="search.status" tab-position="top" @tab-change="tableRef?.clearSelection()">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statisticsInfo[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        class="w-300px"
        placeholder="货件单号/发货单号/计划单号"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
      />
      <WarehouseSelect v-model="search.sendWarehouseCode" clearable placeholder="发货仓" />
      <el-select
        v-model="search.destinationWarehouseCode"
        filterable
        clearable
        placeholder="目的仓"
      >
        <el-option
          v-for="item in shopList"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select v-model="search.shopCode" clearable filterable placeholder="店铺">
        <el-option
          v-for="item in shopList"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="batchUpdate"
        v-if="[1, 2, 3].includes(search.status)"
        :loading="!!store.taskMap.fbaSendSync"
      >
        <div>{{ !!store?.taskMap?.fbaSendSync ? '更新中...' : '更新数据' }}</div>
      </el-button>
      <el-button
        type="primary"
        @click="batchPush"
        v-if="[1, 2, 3].includes(search.status)"
        :loading="batchPushLoading"
      >
        推送计划单
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      row-key="doCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="[1, 2, 3].includes(search.status)"
        type="selection"
        min-width="40"
        reserve-selection
      />
      <el-table-column label="发货单号" prop="doCode" min-width="160" />
      <el-table-column label="货件单号" prop="shipmentCode" min-width="160" />
      <el-table-column label="货件名称" prop="shipmentName" min-width="160" />
      <el-table-column label="计划单号" prop="planCode" min-width="160" />
      <el-table-column label="店铺" prop="shopName" min-width="140" />
      <!--      <el-table-column label="状态" prop="status" min-width="120">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>-->
      <el-table-column label="配送地址" prop="deliveryAddress" min-width="180">
        <template #default="{ row }">
          <OverflowTooltip :content="row.deliveryAddress" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="发货仓/目的仓" min-width="180">
        <template #default="{ row }">
          {{ row?.sendWarehouseDesc || '--' }} / {{ row?.destinationWarehouseDesc || '--' }}
        </template>
      </el-table-column>

      <el-table-column label="SKU种类" prop="skuCount" />
      <el-table-column label="计划量" prop="planQty" />
      <el-table-column label="重量（KG）" prop="totalWeight" min-width="100" />
      <el-table-column label="体积（m³）" prop="totalVolume" min-width="100" />
      <el-table-column label="物流方式" prop="shippingMethod" />
      <el-table-column label="创建时间" prop="createTime" min-width="120" />
      <el-table-column label="接口信息" prop="xingyunSyncDesc" min-width="100">
        <template #default="{ row }">
          <div class="info-box">
            <OverflowTooltip :content="row.xingyunSyncDesc" :line="1" />
            <Copy :content="row.xingyunSyncDesc" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="兴运计划单号" prop="xingyunPlanCode" min-width="110">
        <template #default="{ row }">
          {{ row.xingyunPlanCode ? `JH${row.xingyunPlanCode}` : '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row,
                permissionCode: '',
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
  <FbaDetailDialog ref="fbaDetailDialogRef" />
  <BatchUpdateDialog
    ref="batchUpdateDialogRef"
    @success="handleBatchUpdate"
    placeholder="发货单号"
  />
  <BatchUpdateDialog
    ref="batchPushDialogRef"
    @success="handleBatchPush"
    placeholder="发货单号"
    title="推送计划单"
  />
</template>

<script setup lang="ts" name="fbaSendManage">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, platformApi, shopApi } from '@/api';
  import FbaDetailDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/fbaDetailDialog.vue';
  import { ElMessage } from 'element-plus';
  import BatchUpdateDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/batchUpdateDialog.vue';
  import { fbaSendRefresh, stopFbaSendRefresh } from '@/worker/controls/notice';
  import useTask from '@/store/modules/task';
  import { useStore } from '@/store/modules/useStore';

  const store = useTask();
  const user = useStore();

  const statusColorMap = {
    1: 'blue',
    2: 'purple',
    3: 'green',
    4: 'red',
  };

  const visibleCopy = ref(false);
  const tabStatusList = [
    // { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 1, code: 'waitingConfirm', statusName: '待确认', count: '' },
    { status: 2, code: 'waitSend', statusName: '待发货', count: '' },
    { status: 3, code: 'send', statusName: '已发货', count: '' },
    { status: 4, code: 'abandon', statusName: '已作废', count: '' },
  ];

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
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpShipmentQueryFbaSendList.RequestBody,
    ErpApi.LuteosErpShipmentQueryFbaSendList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopCode: undefined,
      sendWarehouseCode: undefined,
      destinationWarehouseCode: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      status: 1,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpShipmentQueryFbaSendList,
  });

  watch(
    () => store.taskMap.fbaSendSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  const time = ref();
  const handleTimeChange = (val) => {
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };

  const fbaDetailDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      fbaDetailDialogRef.value?.open(row);
    }
  };

  const batchUpdateDialogRef = ref(null);
  const batchUpdate = async () => {
    if (!codeList.value.length) {
      batchUpdateDialogRef.value?.open();
      return;
    }
    handleBatchUpdate(codeList.value);
  };

  const batchPushLoading = ref(false);
  const batchPushDialogRef = ref(null);

  const batchPush = async () => {
    if (!codeList.value.length) {
      batchPushDialogRef.value?.open();
      return;
    }
    handleBatchPush(codeList.value);
  };

  const handleBatchPush = async (val) => {
    try {
      batchPushLoading.value = true;
      const res = await erpApi.luteosErpShipmentPushOverSeaList({
        codeList: val,
        type: 1,
      });
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
        refreshList();
      }
    } finally {
      batchPushLoading.value = false;
    }
  };

  const handleBatchUpdate = async (val) => {
    await erpApi.luteosErpPlatformRefresh({
      modelCode: 'FBA_SHIP',
      forceRefresh: false,
      sleepTime: 1,
      param: {
        codeList: val,
      },
    });
    batchUpdateDialogRef.value?.close();
    // ElMessage.success('更新成功');
    tableRef.value?.clearSelection();
    // refreshList();

    store.taskMap.fbaSendSync = true;
    fbaSendRefresh(user.token as string);
  };

  const shopList = ref([]);
  const queryShopList = async () => {
    const res = await shopApi.luteosShopSelectEcShopList({});
    shopList.value = res;
  };

  queryShopList();

  const reset = () => {
    time.value = [];
    resetSearch();
  };

  onMounted(() => {
    fbaSendRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    stopFbaSendRefresh();
  });
</script>

<style scoped lang="scss">
  .info-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover .copy {
      display: inline-flex;
    }
    .copy {
      display: none;
      margin-left: 4px;
      color: #02b96b;
      cursor: pointer;
    }
  }
</style>
