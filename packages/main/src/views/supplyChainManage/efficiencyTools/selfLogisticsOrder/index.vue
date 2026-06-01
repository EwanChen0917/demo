<template>
  <OrderTabs
    v-model="search.status"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusCount"
    @tab-change="handleTabChange"
  />
  <KeenList
    :selected-num="codeList?.length"
    :params="search"
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        :style="{ width: `${inputWidth}px` }"
        v-model="orderCode"
        placeholder="请输入"
        clearable
        @input="handleInputChange"
        @change="handleBlur"
        @blur="handleBlur"
      >
        <template #prepend>
          <el-select v-model="searchType" style="width: 96px" @change="handleChange">
            <el-option v-for="(val, key) in searchTypeMap" :value="key" :label="val" :key="key" />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <div>
        物流商编码
        <el-input v-model="search.spCode" placeholder="请输入" style="width: 150px" clearable>
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
        </el-input>
      </div>
      <div>
        创建时间
        <el-date-picker
          v-model="time"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleTimeChange"
          class="b2bdate"
        />
      </div>
    </template>
    <template #buttons>
      <ExportBtn :service="tmsApi.tmsLogisticsOrderOrderExport" :params="search" :plain="false">
        导出EXCEL
      </ExportBtn>
      <!-- <el-button type="success" @click="handleAction('push')">批量推送</el-button> -->
      <el-button
        type="success"
        @click="handleAction('refresh')"
        v-if="[10, 90, 70, 130].includes(search.status)"
      >
        批量刷新订单信息
      </el-button>
    </template>
    <template #default="{ tableHeight }">
      <el-table
        class="border-table"
        border
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
        max-height="900px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <!-- <el-table-column prop="" min-width="260px" label="平台单号" /> -->
        <!-- <el-table-column prop="refNo" min-width="260px" label="系统订单号" /> -->
        <!-- <el-table-column prop="" min-width="260px" label="物流商请求状态"></el-table-column> -->
        <el-table-column prop="refNo" min-width="260px" label="来源单号" />

        <el-table-column prop="logisticsNo" min-width="260px" label="物流下单号" />
        <!-- <el-table-column prop="" min-width="260px" label="发货时限" /> -->
        <!-- <el-table-column prop="" min-width="260px" label="报关信息" /> -->
        <!-- <el-table-column prop="" min-width="260px" label="物流商" /> -->
        <!-- <el-table-column prop="" min-width="260px" label="物流渠道" /> -->
        <el-table-column prop="waybillNo" min-width="260px" label="运单号" />
        <el-table-column prop="trackNo" min-width="260px" label="跟踪号" />
        <!-- <el-table-column prop="" min-width="260px" label="税号" /> -->

        <el-table-column prop="status" min-width="260px" label="订单状态">
          <template #default="{ row }">
            <Tag v-if="statusTypeMap[row.status]" :color="statusColorMap[row.status]" size="small">
              {{ statusTypeMap[row.status] }}
            </Tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" min-width="260px" label="发货仓库" />
             <el-table-column prop="" min-width="260px" label="实物重量" />
             <el-table-column prop="" min-width="260px" label="预估体积" />
             <el-table-column prop="" min-width="260px" label="预估运费" />
              <el-table-column prop="" min-width="260px" label="出库重量" />
             <el-table-column prop="" min-width="260px" label="出库体积" />
             <el-table-column prop="" min-width="260px" label="实际费用" />
             <el-table-column prop="" min-width="260px" label="收货信息" />

             <el-table-column prop="" min-width="260px" label="验货仓库" />-->
        <el-table-column prop="updateTime" min-width="260px" label="更新时间" />
        <el-table-column prop="shippingTime" min-width="260px" label="发货时间" />
        <el-table-column prop="invalidationTime" min-width="260px" label="作废时间" />
        <el-table-column prop="interceptTime" min-width="260px" label="拦截时间" />
        <el-table-column prop="spCode" min-width="260px" label="物流商编码" />
        <el-table-column prop="createTime" min-width="260px" label="创建时间" />
        <el-table-column label="操作" min-width="170px" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  row: row,
                },
                // {
                //   label: '取消订单',
                //   key: 'cancel',
                //   type: 'warning',
                //   text: true,
                //   row: row,
                //   hide: [30, 70, 90, 120, 130].includes(+row.status),
                // },
                {
                  label: '重新下单',
                  key: 'orderAgain',
                  type: 'primary',
                  text: true,
                  row: row,
                  hide: ![110, 90, 50].includes(+row.status),
                },
                // {
                //   label: '拦截',
                //   key: 'intercept',
                //   type: 'primary',
                //   text: true,
                //   hide: [30, 50, 90, 120, 110, 130].includes(+row.status),
                //   row: row,
                // },
                {
                  label: '刷新订单信息',
                  key: 'refresh',
                  type: 'primary',
                  text: true,
                  hide: ![10, 90, 70, 130].includes(+row.status),
                  row: row,
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
    </template>
  </KeenList>
  <LogisticsOrderDialog ref="logisticsOrderRef" @submit="refreshList" />
  <div v-loading.fullscreen.lock="fullscreenLoading" style="display: none"></div>
</template>

<script lang="ts" setup name="selfLogisticsOrder">
  import { tmsApi, TmsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import { ElMessage, ElSelect } from 'element-plus';
  import { ref } from 'vue';
  import LogisticsOrderDialog from './components/LogisticsOrderDialog.vue';
  const router = useRouter();

  const searchTypeMap = {
    waybillNo: '运单号',
    logisticsNo: '自发货物流订单号',
    refNo: '来源单号',
    // 4: '跟踪号',
  };

  const statusTypeMap = {
    30: '推送中',
    130: '推送完成',
    70: '已发货',
    90: '已拦截',
    110: '异常',
    50: '作废',
    10: '待推送',
    200: '已签收',
  };

  const statusColorMap = {
    110: 'red',
    70: 'green',
    50: 'gray',
    130: 'green',
    90: 'yellow',
    30: 'blue',
    10: 'blue',
    200: 'green',
  };

  const logisticsOrderRef = ref();
  const time = ref([]);
  const fullscreenLoading = ref(false);

  const tabStatusList = [
    { status: 0, code: 'all', statusName: '全部', count: '' },
    { status: 10, code: 'pendingPush', statusName: '待推送', count: '' },
    { status: 30, code: 'pushing', statusName: '推送中', count: '' },
    { status: 130, code: 'pushCompleted', statusName: '推送完成', count: '' },
    { status: 70, code: 'shipped', statusName: '已发货', count: '' },
    { status: 90, code: 'intercepted', statusName: '已拦截', count: '' },
    { status: 200, code: 'received', statusName: '已签收', count: '' },
    { status: 110, code: 'exception', statusName: '异常', count: '' },
    { status: 50, code: 'canceled', statusName: '作废', count: '' },
  ];

  const PAGE_SIZE = 10;
  const tableRef = ref();
  const searchType = ref('waybillNo');
  const orderCode = ref('');
  const batchSearchRef = ref();
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
    resetSearch,
    runQuery,
  } = useList<TmsApi.TmsBaseUserOrderList.RequestBody, TmsApi.TmsBaseUserOrderList.ResponseBody>({
    searchDefaults: {
      endTime: undefined,
      exportConditionCode: undefined,
      logisticsNo: undefined,
      refNo: undefined,
      spCode: undefined,
      startTime: undefined,
      status: 0,
      waybillNo: undefined,
    },
    pageSize: PAGE_SIZE,
    service: tmsApi.tmsLogisticsOrderOrderList,
  });

  const inputWidth = ref<number>(258);
  const handleInputChange = (e) => {
    if (e) {
      inputWidth.value = 310;
    } else {
      inputWidth.value = 258;
    }
  };
  const handleBlur = (e) => {
    clearSearchTypeMap();
    search[searchType.value] = orderCode.value;
    if (e.target?.value) {
      batchSearchRef.value?.clear();
    }
  };

  const handleTimeChange = (val) => {
    if (val?.length) {
      search.startTime = `${val[0]} 00:00:00`;
      search.endTime = `${val[1]} 23:59:59`;
    } else {
      search.startTime = undefined;
      search.endTime = undefined;
    }
  };

  const handleBatchClear = () => {
    clearSearchTypeMap();
  };
  const handleBatchSearch = (val) => {
    orderCode.value = '';
    clearSearchTypeMap();
    search[searchType.value] = val?.replace(/\n/g, ',');
  };

  // 表格选择
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.id);
  };
  const clearCheckBoxSelection = () => {
    tableRef.value?.clearSelection();
    codeList.value = [];
  };

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'orderAgain') {
      logisticsOrderRef.value?.open({ orderCode: row.logisticsNo, type: 'tms' });
    } else if (key === 'view') {
      const path = router.resolve({
        name: 'selfLogisticsOrderEdit',
        query: { logisticsNo: row.logisticsNo },
      });
      router.push(path.href);
    } else if (key == 'refresh') {
      fullscreenLoading.value = true;
      let res = await tmsApi.tmsLogisticsOrderRefresh([row.id]);
      res && ElMessage.success('刷新订单信息成功');
      fullscreenLoading.value = false;
      refreshList();
    }
  };

  const handleAction = async (value) => {
    if (!batchIntercept()) return;
    fullscreenLoading.value = true;
    let result;
    if (value == 'refresh') {
      result = await tmsApi.tmsLogisticsOrderRefresh(codeList.value);
    } else if (value == 'push') {
      // result = await tmsApi.tmsLogisticsOrderOrderPushBatch(codeList.value);
    }
    let message = value == 'refresh' ? '批量刷新成功' : '批量推送成功';
    result && ElMessage.success(message);
    fullscreenLoading.value = false;
    clearCheckBoxSelection();
    refreshList();
  };

  const handleTabChange = (val) => {
    if (val == search.status) return;
    clearCheckBoxSelection();
    search.status = val;
  };

  const handleChange = (val) => {
    clearSearchTypeMap();
    val && (search[val] = orderCode.value);
  };

  const clearSearchTypeMap = () => {
    for (let key in searchTypeMap) {
      delete search[key];
    }
  };

  // 批量操作前置校验
  const batchIntercept = () => {
    if (codeList.value.length === 0) {
      ElMessage.warning('请选择订单');
      return false;
    }
    return true;
  };

  const reset = () => {
    batchSearchRef.value?.clear();
    time.value = [];
    orderCode.value = '';
    resetSearch();
  };
</script>

<style scoped lang="scss">
  :global(.upload-container) {
    display: none;
  }
  :deep(.el-table__cell) {
    border-right: none !important;
  }
</style>
