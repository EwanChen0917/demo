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
        placeholder="头程计划单号/订单号/参考单号"
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
      <WarehouseSelect v-model="search.destinationWarehouseCode" clearable placeholder="中转仓" />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="batchUpdate"
        v-if="search.status !== -1"
        :loading="!!store.taskMap.overSeaSendSync"
      >
        <div>{{ !!store?.taskMap?.overSeaSendSync ? '更新中...' : '更新数据' }}</div>
      </el-button>
      <el-button
        type="primary"
        @click="batchPush"
        v-if="search.status !== -1"
        :loading="batchPushLoading"
      >
        推送计划单
      </el-button>
      <el-button type="primary" @click="exportDataDialogRef?.open()">导出装箱数据</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="planCode"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        min-width="40"
        reserve-selection
        v-if="search.status !== -1"
        :selectable="(row) => row.status !== -1"
      />
      <el-table-column label="头程计划单/订单号" min-width="180" fixed="left">
        <template #default="{ row }">
          {{ row?.planCode || '--' }} / {{ row?.orderCode || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="参考单号" prop="referenceCode" min-width="160" />
      <el-table-column label="下架单号" prop="shelfCode" min-width="160" />
      <el-table-column label="状态" prop="statusDesc" min-width="120">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="发货/中转仓" min-width="200">
        <template #default="{ row }">
          <span>{{ row?.sendWarehouseDesc || '--' }} / {{ row?.toWarehouseDesc || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运输方式" prop="shippingMethod" min-width="120" />
      <el-table-column label="总箱数/重量（KG）" min-width="140">
        <template #default="{ row }">{{ row?.totalBoxQty }} / {{ row?.totalWeight }}</template>
      </el-table-column>
      <el-table-column label="重量（KG）/体积（cm³）" min-width="160">
        <template #default="{ row }">{{ row?.totalWeight }} / {{ row?.totalVolume }}</template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="120" />
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
  <OverSeaDetailDialog ref="overSeaDetailDialogRef" />
  <BatchUpdateDialog
    ref="batchUpdateDialogRef"
    @success="handleBatchUpdate"
    placeholder="计划单号"
  />
  <BatchUpdateDialog
    ref="batchPushDialogRef"
    @success="handleBatchPush"
    placeholder="计划单号"
    title="推送计划单"
  />
  <ExportDataDialog ref="exportDataDialogRef" />
</template>

<script setup lang="ts" name="overSeaCargoManage">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import OverSeaDetailDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/overSeaDetailDialog.vue';
  import BatchUpdateDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/batchUpdateDialog.vue';
  import useTask from '@/store/modules/task';
  import { useStore } from '@/store/modules/useStore';
  import { overSeaSendRefresh, stopOverSeaSendRefresh } from '@/worker/controls/notice';
  import ExportDataDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/exportDataDialog.vue';

  const store = useTask();
  const user = useStore();

  const statusColorMap = {
    '-1': 'red',
    '-3': 'blue',
    0: 'yellow',
    1: 'purple',
    2: 'green',
    3: 'yellow',
    4: 'green',
    5: 'gray',
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: -3, code: 'draft', statusName: '草稿', count: '' },
    { status: 0, code: 'unboxed', statusName: '未提交装箱', count: '' },
    { status: 1, code: 'packed', statusName: '已提交装箱', count: '' },
    { status: 2, code: 'packConfirm', statusName: '装箱已确认', count: '' },
    { status: 3, code: 'unConfirmedSend', statusName: '未确认发货', count: '' },
    { status: 4, code: 'completed', statusName: '已完成', count: '' },
    { status: -1, code: 'abandoned', statusName: '作废', count: '' },
  ];

  const exportDataDialogRef = ref(null);
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
    ErpApi.LuteosErpShipmentQueryOverSeaList.RequestQuery,
    ErpApi.LuteosErpShipmentQueryOverSeaList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopCode: undefined,
      sendWarehouseCode: undefined,
      destinationWarehouseCode: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      status: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpShipmentQueryOverSeaList,
  });

  watch(
    () => store.taskMap.overSeaSendSync,
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

  const overSeaDetailDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      overSeaDetailDialogRef.value?.open(row);
    }
  };

  const batchUpdateDialogRef = ref(null);
  const batchUpdateLoading = ref(false);
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
        type: 3,
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
        refreshList();
      }
      batchPushDialogRef.value?.close();
    } finally {
      batchPushLoading.value = false;
    }
  };

  const handleBatchUpdate = async (val) => {
    try {
      await erpApi.luteosErpPlatformRefresh({
        modelCode: 'OVER_SEA_SHIP',
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

      store.taskMap.overSeaSendSync = true;
      overSeaSendRefresh(user.token as string);
    } finally {
      batchUpdateLoading.value = false;
    }
  };

  const reset = () => {
    time.value = [];
    resetSearch();
  };

  onMounted(() => {
    overSeaSendRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    stopOverSeaSendRefresh();
  });
</script>

<style scoped lang="scss"></style>
