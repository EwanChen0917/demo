<template>
  <OrderTabs
    v-model="search.bigTransferStatus"
    :tab-status-list="tabStatusList"
    :count-map="statusStatistics"
    :child-count-map="errorStatusCountMap"
    @tab-change="handleTabChange"
    @child-tab-change="handleChildTabChange"
    child-popover-class="transfer-order-popover"
  />
  <KeenList
    @refresh="refreshRequest"
    @reset-search="resetListParams"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="transferCodeInput"
        placeholder="调拨单号"
        clearable
        style="width: 350px"
        @change="handleCodeInputChange"
        @blur="handleCodeInputChange"
      >
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
      <warehouseSelect
        placeholder="调出仓库"
        v-model="search.warehouseCode"
        :options="outWarehouseMap"
      />
      <warehouseSelect
        placeholder="调入仓库"
        v-model="search.arrivalWarehouseCode"
        :options="inWarehouseMap"
      />
      <el-select
        v-model="search.shippingMethod"
        value-key="id"
        placeholder="请选择物流方式"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      >
        <el-option
          v-for="item in logisticsTransportList"
          :key="item.id"
          :label="item.transportName"
          :value="item.transportName"
        />
      </el-select>
      <el-input
        v-model="search.outboundNo"
        placeholder="调出仓出库单号"
        clearable
        style="width: 300px"
      />
      <el-input
        v-model="search.trackingNo"
        placeholder="物流跟踪号"
        clearable
        style="width: 300px"
      />
      <el-input
        v-model="search.inboundNo"
        placeholder="调入仓入库单号"
        clearable
        style="width: 300px"
      />
      <DeptMember v-model="search.createBy" placeholder="创建人" />
      <el-date-picker
        v-model="timeRange"
        type="datetimerange"
        value-format="YYYY-MM-DD HH:mm:ss"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        @change="handleTimeChange"
        style="width: 350px"
      />
      <el-select v-model="search.sendIdentifier" placeholder="调拨类型" clearable>
        <!-- <el-option value="OFFLINE" label="线下" />
        <el-option value="ONLINE" label="线上" /> -->
        <el-option value="CN_WAREHOUSE" label="中仓" />
        <el-option value="FACTORY_DIRECT" label="工厂直发" />
        <el-option value="VIRTUAL_TRANSFER" label="虚仓调拨" />
      </el-select>
      <!-- 调拨单状态 -->
      <!-- <el-select v-model="search.bigTransferStatus" placeholder="调拨单状态" clearable>
        <el-option value="100" label="待确认" />
        <el-option value="200" label="待拣货出库" />
        <el-option value="300" label="调拨在途" />
        <el-option value="400" label="已完成" />
        <el-option value="500" label="已作废" />
      </el-select> -->
      <!-- 推送状态 -->
      <el-select v-model="search.pushStatus" placeholder="推送状态" clearable>
        <el-option :value="0" label="未推送" />
        <el-option :value="2" label="推送成功" />
        <el-option :value="3" label="推送失败" />
      </el-select>
      <el-select v-model="search.pick" placeholder="拣货状态" clearable>
        <el-option :value="0" label="未拣货" />
        <el-option :value="1" label="已拣货" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleAdd" v-permission="'transferOrderOfflineAdd'">
        添加调拨单
      </el-button>
      <el-button
        type="primary"
        @click="handleGenerateTransferOrder"
        v-permission="'transferOrderOfflineImportOrder'"
      >
        导入调拨单
      </el-button>
      <el-button
        type="primary"
        @click="handleClickConfirm"
        :disabled="!selectedRows.length"
        :loading="confirmLoading"
        v-permission="'transferOrderOfflineMultipleSubmit'"
      >
        批量提交
      </el-button>
      <el-button
        type="primary"
        @click="batchUpdateVisible = true"
        v-permission="'transferOrderOfflineImport'"
      >
        批量上传跟踪号
      </el-button>
      <el-button type="primary" @click="handlePush">推送计划单</el-button>
      <el-button type="primary" @click="handleExport">导出装箱数据</el-button>
      <el-button
        type="danger"
        @click="handleCancel"
        :disabled="!selectedRows.length"
        :loading="cancelLoading"
        v-permission="'transferOrderOfflineMultipleCancel'"
      >
        批量作废
      </el-button>
    </template>
    <template #default="{ tableHeight }">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        @selection-change="handleSelectionChange"
        :height="tableHeight || '600px'"
      >
        <el-table-column type="selection" fixed="left" width="50" />
        <el-table-column prop="code" label="调拨单号" fixed min-width="250">
          <template #default="{ row }">
            <router-link :to="{ name: 'transferOrderOfflineDetail', params: { code: row.code } }">
              {{ row.code }}
            </router-link>
            <Copy :content="row.code + '' || '-'" v-if="row.code" />
          </template>
        </el-table-column>
        <el-table-column prop="transferBigStatusDesc" label="调拨单状态" min-width="150">
          <template #default="{ row }">
            <div :style="{ color: +row.transferBigStatus === 600 ? '#f56c6c' : '' }">
              {{ row.transferStatusDesc }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sendIdentifierDesc" label="调拨类型" min-width="80">
          <!-- <template #default="{ row }">
            <Tag :color="row.sendIdentifier === 'CN_WAREHOUSE' ? 'blue' : 'purple'" size="small">
              {{ getSendIdentifierText(row.sendIdentifier, row.sendIdentifierDesc) }}
            </Tag>
          </template> -->
        </el-table-column>
        <el-table-column prop="pushStatusDesc" label="推送状态" min-width="100">
          <template #default="{ row }">
            <Tag
              :color="{ 2: 'green', 3: 'red', 1: 'yellow', 0: 'gray' }[row.pushStatus] || 'gray'"
              size="small"
            >
              {{ row.pushStatusDesc }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column prop="pushFailureReason" label="推送失败原因" min-width="150">
          <template #default="{ row }">
            <OverflowTooltip :content="row.pushFailureReason" :line="2" />
          </template>
        </el-table-column>
        <el-table-column prop="pickDesc" label="拣货状态" min-width="100">
          <template #default="{ row }">
            <Tag :color="row.pickDesc === '已拣货' ? 'green' : 'gray'" size="small">
              {{ row.pickDesc }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column prop="jjPickErrMsg" label="拣货失败说明" min-width="140">
          <template #default="{ row }">
            <OverflowTooltip :content="row.jjPickErrMsg" :line="2" />
          </template>
        </el-table-column>
        <el-table-column prop="warehouseName" label="调出仓库" min-width="200" />
        <el-table-column prop="arrivalWarehouseName" label="调入仓库" min-width="200" />
        <el-table-column prop="shippingMethod" label="物流方式" min-width="200" />
        <el-table-column prop="executorDate" label="预计出库日期" min-width="150" />
        <el-table-column prop="actualDeliveryDate" label="实际出库日期" min-width="150" />
        <el-table-column prop="outboundNo" label="调出仓库单号" min-width="150" />
        <el-table-column prop="outboundStatusDesc" label="调出仓库单状态" min-width="150" />
        <el-table-column prop="carrierName" label="承运商" min-width="200" />
        <el-table-column prop="trackingNo" label="物流跟踪号" min-width="200" />
        <el-table-column prop="inboundNo" label="调入仓入库单" min-width="200" />
        <el-table-column prop="inboundStatusDesc" label="调入仓入库单状态" min-width="150" />
        <el-table-column prop="creatorName" label="创建人" min-width="150" />
        <el-table-column prop="createTime" label="创建时间" min-width="150" />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="child-column">
              <KeenActions
                class="actions"
                display-style="buttons"
                :actions="[
                  // {
                  //   label: '确认',
                  //   key: 'confirm',
                  //   type: 'primary',
                  //   hide: +row.transferBigStatus !== 100,
                  //   text: true,
                  //   row: row,
                  //   // permissionCode: 'transferOrderOfflineConfirm',
                  // },
                  {
                    label: '详情',
                    key: 'detail',
                    type: 'primary',
                    text: true,
                    row: row,
                    permissionCode: 'transferOrderOfflineDetail',
                  },
                  // {
                  //   label: '重试',
                  //   key: 'retry',
                  //   type: 'primary',
                  //   text: true,
                  //   row: row,
                  //   hide: +row.transferBigStatus !== 600 || +row.transferStatus === 601,
                  // },
                  {
                    label: '作废',
                    key: 'cancel',
                    type: 'danger',
                    text: true,
                    hide:
                      [
                        // ORDER_STATUS.IN_TRANSIT,
                        ORDER_STATUS.COMPLETED,
                        ORDER_STATUS.CANCELLED,
                      ].includes(+row.transferBigStatus) || row.transferType === 'ONLINE',
                    row: row,
                    permissionCode: 'transferOrderIOfflineDIsabled',
                  },
                  {
                    label: '强制完成',
                    key: 'force',
                    type: 'warning',
                    text: true,
                    hide:
                      [100, 200, 400, 500, 601].includes(+row.transferBigStatus) ||
                      row.inboundStatus !== 'FAILED',
                    row: row,
                    permissionCode: 'transferOrderOfflineForce',
                  },
                ]"
                @click="handleActions"
              />
            </div>
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
  <PushOrderListDialog ref="pushOrderListDialogRef" @success="refreshRequest" />
  <TransferOrderImportDialog ref="transferOrderImportDialogRef" @success="handleImportSuccess" />
  <ExportPackListDialog ref="exportPackListDialogRef" />
  <OmsBatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="transfer_order_import"
    title="批量上传跟踪号"
    @close="batchUpdate"
  />
</template>

<script lang="ts" setup name="transferOrderOffline">
  import { computed, ref, useTemplateRef } from 'vue';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { omsApi, OmsApi } from '@/api';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';
  import { useTransOrderOptions } from './hooks/useTransOrderOptions';
  import warehouseSelect from './components/warehouseSelect.vue';
  import OmsBatchUpdateModal from './components/omsBatchUpdateModal.vue';
  import PushOrderListDialog from './components/pushOrderListDialog.vue';
  import TransferOrderImportDialog from './components/transferOrderImportDialog.vue';
  import ExportPackListDialog from './components/exportBoxListDialog.vue';
  import { ORDER_STATUS } from './config';

  const SEND_IDENTIFIER_TEXT_MAP: Record<string, string> = {
    CN_WAREHOUSE: '中仓',
    FACTORY_DIRECT: '工厂直发',
    VIRTUAL_TRANSFER: '虚仓调拨',
  };

  const getSendIdentifierText = (sendIdentifier?: string, sendIdentifierDesc?: string) => {
    return sendIdentifierDesc || SEND_IDENTIFIER_TEXT_MAP[sendIdentifier || ''] || '--';
  };

  const router = useRouter();
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 100, code: 'pendingConfirm', statusName: '待确认', count: '' },
    { status: 200, code: 'pendingPickOutbound', statusName: '待拣货出库', count: '' },
    {
      status: '600',
      code: 'error',
      statusName: '异常',
      count: '',
      children: [
        {
          groupName: '',
          list: [
            {
              status: '602',
              code: 'REVERSE_ERROR',
              statusName: '商品库存预占失败',
              count: '',
            },
            {
              status: '603',
              code: 'INBOUND_ERROR',
              statusName: '创建海外仓入库单号失败',
              count: '',
            },
            {
              status: '605',
              code: 'INBOUND_BOX_ERROR',
              statusName: '获取海外仓入库单号箱唛附件失败',
              count: '',
            },
            {
              status: '604',
              code: 'PUSH_OUTBOUND_ERROR',
              statusName: '下发中仓出库单失败',
              count: '',
            },
            { status: '601', code: 'OUTBOUND_ERROR', statusName: '中仓出库单出库失败', count: '' },
            {
              status: '607',
              code: 'CANCEL_REVERSE_ERROR',
              statusName: '取消商品库存预占失败',
              count: '',
            },
            {
              status: '606',
              code: 'CANCEL_INBOUND_ERROR',
              statusName: '取消调入仓入库单失败',
              count: '',
            },
          ],
        },
      ],
    },
    { status: 300, code: 'transferInTransit', statusName: '调拨在途', count: '' },
    { status: 400, code: 'completed', statusName: '已完成', count: '' },
    { status: 500, code: 'abandon', statusName: '已作废', count: '' },
  ];

  // 基础配置
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const batchSearchRef = ref();
  const pushOrderListDialogRef = ref(null);
  const transferOrderImportDialogRef = useTemplateRef('transferOrderImportDialogRef');
  const exportPackListDialogRef = ref(null);
  const timeRange = ref<string[]>([]);
  const selectedRows = ref<any[]>([]);
  const { outWarehouseMap, inWarehouseMap, logisticsTransportList } = useTransOrderOptions();

  const parseCodeList = (value?: string) => {
    if (!value) return undefined;
    const codeList = value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
    return codeList.length ? codeList : undefined;
  };

  const transferCodeInput = computed({
    get: () => (Array.isArray(search.codeList) ? search.codeList.join(',') : ''),
    set: (value: string) => {
      search.codeList = parseCodeList(value);
    },
  });

  const handleCodeInputChange = (e?: { target?: { value?: string } }) => {
    if (e?.target?.value) {
      batchSearchRef.value?.clear();
    }
  };

  const handleBatchSearch = (value: string) => {
    if (!value) {
      search.codeList = undefined;
      return;
    }
    search.codeList = parseCodeList(value);
  };

  const handleBatchClear = () => {
    search.codeList = undefined;
  };

  // 列表钩子
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
  } = useList<OmsApi.OmsTransferQueryList.RequestBody, OmsApi.OmsTransferQueryList.ResponseBody>({
    searchDefaults: {
      arrivalWarehouseCode: undefined,
      code: undefined,
      codeList: undefined,
      createBy: undefined,
      bigTransferStatusList: undefined,
      transferStatusList: undefined,
      pushStatusList: undefined,
      pickList: undefined,
      warehouseCodeList: undefined,
      arrivalWarehouseCodeList: undefined,
      shippingMethodList: undefined,
      trackingNoList: undefined,
      createTimeEnd: undefined,
      createTimeStart: undefined,
      inboundNo: undefined,
      outboundNo: undefined,
      shippingMethod: undefined,
      trackingNo: undefined,
      warehouseCode: undefined,
      transferType: undefined,
      bigTransferStatus: '',
      sendIdentifier: undefined, // 调拨类型
      transferStatus: undefined,
      pushStatus: undefined,
      pick: undefined,
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      return {
        ...data,
        bigTransferStatus: data.bigTransferStatus || undefined,
      };
    },
    // TODO: 替换为实际的API服务
    service: omsApi.omsTransferQueryList,
  });
  // const selectedRows = computed(() => {});
  const statusStatistics = ref();
  const errorStatusCountMap = ref();
  const getTabCount = async () => {
    const res = await omsApi.omsTransferStatusStatistics({
      transferType: search.transferType || '',
    });
    const {
      pendingConfirm = 0,
      pendingPickOutbound = 0,
      error = 0,
      transferInTransit = 0,
    } = res?.statusStatistics ?? {};
    // statusStatistics.value = { pendingConfirm, pendingPickOutbound, error, transferInTransit };
    statusStatistics.value = res.statusStatistics;
    errorStatusCountMap.value = res.errorStatusCountMap;
  };
  getTabCount();

  const handleTabChange = (val) => {
    selectedRows.value = [];
    search.bigTransferStatus = val;
    search.transferStatus = undefined;
  };
  const handleChildTabChange = (val) => {
    selectedRows.value = [];
    search.bigTransferStatus = '600';
    search.transferStatus = val;
  };
  // 时间范围处理
  const handleTimeChange = (dateArr: string[]) => {
    search.createTimeStart = dateArr ? dateArr[0] : '';
    search.createTimeEnd = dateArr ? dateArr[1] : '';
  };
  const batchUpdateVisible = ref(false);
  // 表格选择
  const handleSelectionChange = (selection: any[]) => {
    selectedRows.value = selection;
  };
  const resetListParams = () => {
    timeRange.value = [];
    resetSearch();
    batchSearchRef.value?.clear();
  };
  // 操作方法
  const handleAdd = () => {
    router.push('/transferOrderOffline/add');
  };

  const handleGenerateTransferOrder = () => {
    transferOrderImportDialogRef.value?.open();
  };

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      router.push({ name: 'transferOrderOfflineDetail', params: { code: row.code } });
    } else if (key === 'cancel') {
      const isConfirm = await swal.confirm(`是否确认作废调拨单-${row?.code}？`);
      if (!isConfirm) return;
      await omsApi.omsTransferAbandon({ code: row.code });
      ElMessage.success('作废成功');
      refreshRequest();
    } else if (key === 'force') {
      const isConfirm = await swal.confirm(`是否确认强制完成调拨单-${row?.code}？`);
      if (!isConfirm) return;
      await omsApi.omsTransferForceComplete({ code: row.code });
      ElMessage.success('强制完成成功');
      refreshRequest();
    } else if (key === 'confirm') {
      confirmTransferOrder([row]);
    }
  };
  const batchUpdate = (reload) => {
    if (reload) {
      refreshRequest();
    }
    batchUpdateVisible.value = false;
  };
  const confirmLoading = ref(false);
  const handleClickConfirm = async () => {
    const pendingRows = selectedRows.value.filter(
      (item) => item.transferBigStatus === ORDER_STATUS.PENDING_CONFIRMATION
    );
    if (!pendingRows.length) {
      ElMessage.warning('请选择待确认的调拨单');
      return;
    }
    await confirmTransferOrder(pendingRows);
  };
  const buildSubmitItemFromRow = (row: any) => {
    const cartonList =
      row?.itemList
        ?.map((item: any) => {
          const list = item?.cartonList || [];
          return list.map((carton: any) => ({
            boxNo: carton?.boxNo,
            boxNum: carton?.boxNum,
            roughWeight: carton?.roughWeight,
            length: carton?.length,
            wide: carton?.wide,
            high: carton?.high,
            skuCode: item?.skuCode,
            supplySku: item?.supplySku,
          }));
        })
        .flat() || [];

    return {
      id: row?.id,
      code: row?.code,
      remark: row?.remark,
      encaseType: row?.encaseType || 1,
      cartonList,
    };
  };
  const confirmTransferOrder = async (rows: any[]) => {
    try {
      if (confirmLoading.value) return;
      confirmLoading.value = true;
      const items = rows.map((row) => buildSubmitItemFromRow(row));
      await omsApi.omsTransferSubmitBatch({ items });
      ElMessage.success('提交成功');
      refreshRequest();
    } catch (error) {
      /** empty */
    } finally {
      confirmLoading.value = false;
    }
  };
  const cancelLoading = ref(false);
  const handleCancel = async () => {
    const ids = selectedRows.value
      .filter(
        (item) =>
          item.transferBigStatus !== ORDER_STATUS.IN_TRANSIT &&
          item.transferBigStatus !== ORDER_STATUS.COMPLETED &&
          item.transferBigStatus !== ORDER_STATUS.CANCELLED
      )
      .map((item) => item.code);
    if (!ids.length) {
      ElMessage.warning('请选择非在途、已完成、已作废的调拨单');
      return;
    }
    await cancelTransferOrder(ids);
  };
  const cancelTransferOrder = async (ids: number[]) => {
    if (cancelLoading.value) return;
    cancelLoading.value = true;
    try {
      await omsApi.omsTransferAbandonBatch({ codes: ids.map((item) => item.toString()) });
      ElMessage.success('作废成功');
      refreshRequest();
    } catch (error) {
      /** empty */
    } finally {
      cancelLoading.value = false;
    }
  };
  // 导出装箱数据
  const handleExport = async () => {
    try {
      exportPackListDialogRef.value?.open();
    } catch (error) {}
  };
  // 推送计划单
  const handlePush = async () => {
    try {
      pushOrderListDialogRef.value?.open();
    } catch (e) {}
  };
  const clearSelect = () => {
    selectedRows.value = [];
    tableRef.value?.clearSelection();
  };
  const refreshRequest = () => {
    clearSelect();
    runQuery();
  };
  const handleImportSuccess = async () => {
    const isConfirmed = await swal.confirm({
      title: '上传完成，是否去查看上传日志?',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
    });
    if (!isConfirmed) {
      refreshList();
      return;
    }
    await nextTick();
    router.push('/salesForecastingLog');
  };
  onActivated(() => {
    refreshRequest();
  });
</script>

<style scoped lang="scss">
  // 可以在这里添加页面特定的样式
  :deep(.children-tabs-item) {
    width: auto !important;
  }
</style>
