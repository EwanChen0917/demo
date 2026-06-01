<template>
  <OrderTabs2
    v-model="search.status"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusStatistics"
    :child-count-map="listData?.errorStatusCountMap"
    @tab-change="handleTabChange"
    @child-tab-change="handleChildTabChange"
  />
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    :selected-list="selectedList2"
    @clear-all="clearAll"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入"
          clearable
          style="width: 360px"
          @change="handleBlur2"
          @blur="handleBlur2"
        >
          <template #prepend>
            <el-select v-model="search.searchType" style="width: 148px">
              <el-option
                v-for="(val, key) in searchTypeMap"
                :value="parseInt(key)"
                :label="val"
                :key="key"
              />
            </el-select>
          </template>
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <BatchSearchPopover
              ref="batchSearchRef2"
              @search="handleBatchSearch2"
              @clear="handleBatchClear2"
            />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.createTimeStart = dateArr ? dateArr[0] : '';
            search.createTimeEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-select v-model="search.type" placeholder="仓配类型" clearable style="width: 120px">
        <el-option label="销售仓配" :value="1" />
        <el-option label="领用仓配" :value="2" />
      </el-select>
      <el-select
        v-model="search.warehouseCode"
        clearable
        filterable
        placeholder="发货仓库"
        style="width: 140px"
      >
        <el-option
          v-for="item in warehouseList"
          :key="item.warehouseCode"
          :label="item.warehouseDesc"
          :value="item.warehouseCode"
        />
      </el-select>
      <el-select v-model="search.systemType" clearable placeholder="仓配系统" style="width: 120px">
        <el-option label="积加" :value="3" />
        <el-option label="易仓" :value="1" />
        <el-option label="谷仓" :value="2" />
        <el-option label="AMOS" :value="4" />
        <el-option label="CIS" :value="5" />
      </el-select>
      <el-select v-model="search.orderType" clearable placeholder="销售订单" style="width: 120px">
        <el-option label="B2B订单" :value="1" />
        <el-option label="发样订单" :value="0" />
        <el-option label="tiktok订单" :value="2" />
      </el-select>
      <el-select
        v-model="search.isCutAtt"
        clearable
        placeholder="自动分配裁剪附件"
        style="width: 160px"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
    </template>
    <template #buttons>
      <BatchOperatePophover
        name="批量处理"
        :options="batchOptions"
        :intercept="batchIntercept"
        v-if="search.orderBigStatus !== '400'"
        :loading="batchOptionsLoading2"
      />
      <!-- <el-button type="primary" @click="markDelivery">批量标发</el-button>
      <el-button type="primary" :disabled="codeList.length === 0" @click="batchUpload">
        批量上传附件
      </el-button>
      <el-button type="primary" :disabled="codeList.length === 0" @click="batchCut">
        批量裁剪附件
      </el-button>
      <el-button
        type="primary"
        :disabled="codeList.length === 0"
        @click="batchPush"
        v-permission="'warehouseOrderPush'"
      >
        批量推送
      </el-button>
      <el-button type="primary" :disabled="codeList.length === 0" @click="batchRemark">
        批量备注
      </el-button> -->
      <!-- <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button> -->
      <!--      <ExportBtn :service="omsApi.omsWarehouseOrderExport" :params="search">导出</ExportBtn>-->
      <el-button type="primary" @click="batchUpdateVisible = true">导出</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="销售出库单号" prop="code" min-width="155" fixed="left" />
      <el-table-column label="销售订单号/参考单号" min-width="170">
        <template #default="{ row }">
          <span v-if="row?.type === 1">{{ row.saleCode || '--' }}</span>
          <span v-else>--</span>
          / {{ row.saleCodeRefNum || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="跟踪号/运单号" min-width="120">
        <template #default="{ row }">
          {{ row.saleCodeTrackNum || '--' }}
          <span v-if="row.moreSaleCodeTrackNum && row.saleCodeTrackNum" class="text-danger">
            （多）
          </span>
          / {{ row?.waybillNo || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="仓配系统" prop="systemTypeDesc" />
      <el-table-column label="第三方销售订单号/第三方出库单号" min-width="226">
        <template #default="{ row }">
          {{ row.systemSaleCode || '--' }} / {{ row.systemCode || '--' }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="OA单号" prop="erpCode" min-width="150">
        <template #default="{ row }">
          <span v-if="row.type === 2">{{ row?.erpCode || '--' }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column> -->
      <el-table-column label="仓配类型" prop="typeDesc" />
      <el-table-column label="服务号" prop="serviceCode" min-width="120" />
      <el-table-column label="仓库" prop="warehouseDesc" min-width="140" />
      <el-table-column label="配送方式" prop="shippingDesc" min-width="140" />
      <el-table-column label="重量" prop="weight" />
      <el-table-column label="时间" min-width="150">
        <template #default="{ row }">
          <div class="fs-7">创建：{{ row.createTime }}</div>
          <div class="fs-7">出库：{{ row.outTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="188">
        <template #default="{ row }">
          <Tag :color="tagColor(row.status)">{{ row.statusDesc }}</Tag>
          <!--          <el-tooltip effect="dark" :content="row.errorRemark" placement="top">
            <div class="ellipsis mt-2">{{ row.errorRemark }}</div>
          </el-tooltip>-->
          <el-popover placement="top" :width="600" trigger="hover" :content="row.errorRemark">
            <template #reference>
              <div class="ellipsis mt-2">{{ row.errorRemark }}</div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="自动分配裁剪附件" prop="isCutAttDesc" min-width="128" />
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row: row,
                permissionCode: 'warehouseOrderNewDetail',
              },
              // {
              //   label: '日志',
              //   key: 'log',
              //   type: 'primary',
              //   permissionCode: '',
              //   row,
              //   hide: true,
              // },
              {
                label: '标发',
                key: 'markDelivery',
                type: 'primary',
                row: row,
                hide: row?.status !== 100 && row?.status !== 516,
              },
              {
                label: '附件',
                key: 'attachment',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'warehouseOrderNewDetail',
                hide: row?.type === 2 || row?.sourceType === 'JJ',
              },
              {
                label: '下单',
                key: 'orderAdd',
                type: 'primary',
                text: true,
                row: row,
                // permissionCode: 'warehouseOrderDetail',
                hide: row?.status !== 516 || row?.button?.showPushGc !== true,
              },
              {
                label: '上传附件',
                key: 'upload',
                type: 'primary',
                text: true,
                row: row,
                hide: row?.type === 2 || row?.sourceType === 'JJ',
              },
              {
                label: '备注',
                key: 'remark',
                type: 'primary',
                text: true,
                hide: row?.sourceType === 'JJ',
                row: row,
              },
              {
                label: '推送',
                key: 'push',
                type: 'primary',
                text: true,
                row: row,
                hide: !row.button?.showPushGc || row.button?.pushingGc || row?.sourceType === 'JJ',
                permissionCode: 'warehouseOrderNewPush',
              },
              {
                label: '推送中...',
                key: 'push',
                type: 'primary',
                text: true,
                row: row,
                hide: !row.button?.pushingGc || row?.sourceType === 'JJ',
                disabled: true,
                permissionCode: 'warehouseOrderNewPush',
              },
              {
                label: '更新物流跟踪号',
                key: 'updateDeliveryCode',
                type: 'primary',
                row: row,
                hide: row?.status !== 300 || row?.sourceType === 'JJ',
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
  <RemarkDialog ref="remarkRef" @success="handleSuccess" />
  <PushDialog ref="pushRef" @success="handleSuccess" />
  <AttachmentUpload ref="uploadRef" @success="handleSuccess" />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :params="search"
    title="导出"
    @close="batchUpdateVisible = false"
  />
  <MarkDeliveryModal
    title="批量标发"
    importScene="erp_wo_mark_delivery_import"
    ref="markDeliveryModalRef"
    @success="handleSuccess"
  />
  <MarkDeliverySingleModal ref="markDeliverySingleModalRef" title="标发" @success="handleSuccess" />
  <EditNoticeModal ref="EditNoticeRef" @close="handleClose" />
  <OrderAddDialog ref="OrderAddDialogRef" @success="handleSuccess" />
  <LogDialog ref="logDialogRef" itemType2="warehouseNew" />
</template>

<script setup lang="ts" name="warehouseOrderNew">
  import useList from '@/hooks/list/useList';
  import { dataApi, ErpApi, erpApi, omsApi, OmsApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import { ElMessage } from 'element-plus';
  import AttachmentUpload from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/AttachmentUpload.vue';
  import * as swal from '@/utils/swal';
  import PushDialog from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/PushDialog.vue';
  import BatchUpdateModal from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/BatchUpdateModal.vue';
  import type { WarehouseOrderBaseInfoBean } from '@/api/erp/data-contracts';
  import { checkPermission } from '@/utils/permission';
  import RemarkDialog from './components/RemarkDialog.vue';
  import MarkDeliveryModal from './components/MarkDelivery.vue';
  import MarkDeliverySingleModal from './components/MarkDeliverySingle.vue';
  import EditNoticeModal from './components/EditNoticeModal.vue';
  import OrderAddDialog from './components/OrderAddDialog.vue';
  import LogDialog from './components/logDialog.vue';
  // 1-销售出库单 2-销售订单号 3-销售参考号 4-第三方销售订单号 5-第三方出库单号 6-服务号 7-OA单号 8-领用单号 9-跟踪号 10-运单号"
  const searchTypeMap = {
    2: '销售订单号',
    1: '销售出库单',
    3: '销售参考号',
    4: '第三方销售订单号',
    5: '第三方出库单号',
    6: '服务号',
    7: 'OA单号',
    8: '领用单号',
    9: '跟踪号',
    10: '运单号',
  };
  const selectedList2 = computed(() => {
    return [
      {
        label: searchTypeMap[search?.searchType],
        key: 'searchCodeList',
        value: search?.searchCodeList,
      },
    ];
  });

  const batchSearchRef2 = ref();
  const handleBatchClear2 = (val) => {
    search.searchCodeList = [];
  };
  const handleBatchSearch2 = (val) => {
    search.keyword = undefined;
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    // console.log(arr);
    if (arr.length === 0) {
      ElMessage.warning('请输入');
      return;
    }
    search.searchCodeList = arr;
  };
  const handleBlur2 = (e) => {
    if (e.target?.value) {
      search.searchCodeList = [];
      batchSearchRef2.value?.clear();
    }
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    // { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    // { status: '200', code: 'confirm', statusName: '处理中', count: '' },
    { status: '100', code: 'waitOut', statusName: '待处理', count: '' },
    { status: '400', code: 'processing', statusName: '处理中', count: '' },
    { status: '200', code: 'confirm', statusName: '待出库', count: '' },
    { status: '300', code: 'outWarehouse', statusName: '已出库', count: '' },
    {
      status: '500',
      code: 'error',
      statusName: '异常',
      count: '',
      children: [
        {
          groupName: '异常类型',
          list: [
            { status: '515', code: 'REVERSE_ERROR', statusName: '预占失败', count: '' },
            { status: '516', code: 'COMMIT_OUT_ERROR', statusName: '提交出库失败', count: '' },
            { status: '517', code: 'OUTBOUND_FAILED_ERROR', statusName: '仓库出库失败', count: '' },
            {
              status: '518',
              code: 'UPDATE_JJ_OUT_ERROR',
              statusName: '更新积加销售出库单状态失败',
              count: '',
            },
            {
              status: '519',
              code: 'GET_JJ_OUTBOUND_ERROR',
              statusName: '未获取到积加出库单',
              count: '',
            },
          ],
        },
      ],
    },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  // 批量处理
  const batchOptions = computed(() => {
    return [
      {
        title: '批量标发',
        fn: markDelivery,
        hide: search.orderBigStatus === '400',
      },
      {
        title: '批量上传附件',
        fn: batchUpload,
        hide: search.orderBigStatus === '400',
      },
      {
        title: '批量裁剪附件',
        fn: batchCut,
        hide: search.orderBigStatus === '400',
      },
      {
        title: '批量推送',
        hide: !checkPermission('warehouseOrderNewPush') || search.orderBigStatus !== '500',
        fn: batchPush,
      },
      {
        title: '批量备注',
        fn: batchRemark,
        hide: search.orderBigStatus === '400',
      },
      {
        title: '提交出库',
        hide:
          search.orderBigStatus !== '100' &&
          search.orderBigStatus !== '200' &&
          search.orderBigStatus !== '500',
        fn: submitOutbound,
      },
      {
        title: '确认出库',
        hide: search.orderBigStatus !== '500',
        fn: comfirmOutbound,
      },
      {
        title: '取消出库',
        hide:
          search.orderBigStatus !== '100' &&
          search.orderBigStatus !== '200' &&
          search.orderBigStatus !== '500',
        fn: cancelOutbound,
      },
    ];
  });
  // 提交出库
  const submitOutbound = async () => {
    // const illegalList = getCheckedList();
    // if (illegalList.length > 1) {
    //   ElMessage.warning(`请选择一个订单`);
    //   return;
    // }
    // console.log(codeList.value);
    const res = await omsApi.omsWarehouseOrderSubmitOutbound({
      codes: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('提交出库成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };
  // 取消出库
  const batchOptionsLoading2 = ref(false);
  const cancelOutbound = async () => {
    const illegalList = selectedList.value.filter((item) => item?.status === 518);
    // console.log(selectedList.value, illegalList);
    if (illegalList.length > 0) {
      // ElMessage.warning('存在非取消预占失败订单，请重新选择');
      ElMessage.warning('更新积加销售出库单状态失败订单不支持【取消出库】操作，请重新选择');
      // ElMessage.warning('只有取消预占失败的订单支持【取消出库】操作');
      return;
    }
    const isConfirmed = await swal.confirm('确定要全部取消出库吗？');
    if (!isConfirmed) return;
    try {
      const res = await omsApi.omsWarehouseOrderCancelOutbound({
        codes: codeList.value,
      });
      if (res?.failList.length > 0) {
        const content = res.failList
          .map((item) => {
            return `订单号：${item.orderCode}，失败原因：${item.message}`;
          })
          ?.join('\n');
        ElMessage.error(content);
      } else {
        ElMessage.success('取消出库成功');
      }
      clearCheckBoxSelection();
      refreshList();
      batchOptionsLoading2.value = true;
    } finally {
      batchOptionsLoading2.value = false;
    }
  };
  // 确认出库
  const comfirmOutbound = async () => {
    const res = await omsApi.omsWarehouseOrderConfirmOutbound({
      codes: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('确认出库成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };
  // 批量操作前置校验
  const batchIntercept = (item) => {
    if (item.title === '批量标发') {
      return true;
    }
    if (codeList.value.length === 0) {
      ElMessage.warning('请选择订单');
      return false;
    }
    return true;
  };

  const EditNoticeRef = ref();
  const OrderAddDialogRef = ref();
  // 更新物流跟踪号
  const handleDeliveryNotice = (row: any) => {
    // console.log('row', row);
    // // 配送方式是否 全部快递
    // const isAllExpress = tableRef.value
    //   ?.getCheckboxRecords()
    //   ?.filter((item: any) => item.spsShipCodeExpress === true);
    // // console.log('isAllExpress', isAllExpress);
    // if (isAllExpress.length > 0 && isAllCar.length > 0) {
    //   ElMessage.warning('订单存在多个物流方式，请重新勾选！');
    //   return;
    // }
    EditNoticeRef.value?.open(row);
  };
  // 下单弹窗
  const handleOrderAdd = (row: any) => {
    // console.log('handleOrderAdd');
    OrderAddDialogRef.value?.open(row);
  };
  const handleClose = () => {
    // clearCheckBoxSelection();
    refreshList();
  };

  const statusColorMap = {
    100: 'blue',
    200: 'purple',
    300: 'yellow',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    515: 'red',
    516: 'red',
    517: 'red',
    518: 'red',
    519: 'red',
    600: 'gray',
  };
  const tagColor = (status: any) => {
    if (statusColorMap[status]) {
      return statusColorMap[status];
    }
    if (status > 500 && status < 600) {
      return 'red';
    }
    return '';
  };

  const time: any = ref([]);
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
    // selectedKeys,
  } = useList<
    // ErpApi.LuteosErpWarehouseOrderQueryList.RequestBody,
    // ErpApi.LuteosErpWarehouseOrderQueryList.ResponseBody
    OmsApi.OmsWarehouseOrderQueryList.RequestBody,
    OmsApi.OmsWarehouseOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      searchType: 2,
      searchCodeList: undefined,
      keyword: undefined,
      status: '',
      createTimeEnd: '',
      createTimeStart: '',
      warehouseCode: '',
      systemType: '',
      orderType: '',
      isCutAtt: '',
      type: undefined,
      orderBigStatus: '',
      statusList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    // service: erpApi.luteosErpWarehouseOrderQueryList,
    service: omsApi.omsWarehouseOrderQueryList,
  });

  const router = useRouter();
  const remarkRef = ref();
  const pushRef = ref();
  const logDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      router.push({
        path: '/warehouseOrderNew/detail',
        query: {
          code: row.code,
          type: row.type,
        },
      });
    } else if (key === 'log') {
      logDialogRef.value?.open(row.id);
    } else if (key === 'remark') {
      remarkRef.value.open([row.code], row.remark);
    } else if (key === 'attachment') {
      const path = router.resolve({
        name: 'warehouseOrderNewDetail',
        query: { code: row.code, activated: 5 },
      });
      router.push(path.href);
    } else if (key === 'upload') {
      uploadRef.value?.open([row.code]);
    } else if (key === 'push') {
      // pushRef.value.open(row.code);
      router.push({
        path: '/warehouseOrderNew/push',
        query: {
          code: row.code,
        },
      });
      /* const isConfirmed = await swal.confirm('确定推送谷仓吗？');
       if (!isConfirmed) return;
       const res = await omsApi.omsWarehouseOrderPushGc({
         codeList: [row.code],
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
       } */
    } else if (key === 'markDelivery') {
      markDeliverySingle(row);
    } else if (key === 'updateDeliveryCode') {
      handleDeliveryNotice(row);
    } else if (key === 'orderAdd') {
      handleOrderAdd(row);
      // router.push({
      //   path: '/warehouseOrderNew/add',
      //   query: {
      //     code: row.code,
      //   },
      // });
    }
  };

  // 勾选列表
  const codeList = ref([]);
  const selectedList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.code);
    selectedList.value = list;
  };

  const tableRef = ref();
  const clearCheckBoxSelection = () => {
    tableRef.value.clearSelection();
    codeList.value = [];
  };
  const handleTabChange = (val) => {
    clearCheckBoxSelection();
    search.statusList = undefined;
    search.orderBigStatus = val;
    // search.meReview = val === '200' ? true : undefined;
  };
  const handleChildTabChange = (val) => {
    // console.log('handleChildTabChange', val);
    clearCheckBoxSelection();
    search.orderBigStatus = '500';
    search.statusList = [val];
  };
  // 批量裁剪
  const batchCut = async () => {
    const isConfirmed = await swal.confirm('确定要裁剪附件吗？');
    if (!isConfirmed) return;
    await omsApi.omsWarehouseOrderCutAttBatch({
      codeList: codeList.value,
    });
    ElMessage.success('批量裁剪成功');
    tableRef.value?.clearSelection();
    refreshList();
  };

  // 批量上传
  const uploadRef = ref();
  const batchUpload = () => {
    uploadRef.value?.open(codeList.value);
  };

  // 批量推送
  const batchPush = async () => {
    // const illegalList = tableRef.value
    //   ?.getSelectionRows()
    //   ?.filter((item) => !item.button?.showPushGc)
    //   ?.map((item) => item.code);
    // if (illegalList.length > 0) {
    //   ElMessage.warning(`订单号：${illegalList?.join(',')}不能推送，请重新选择`);
    //   return;
    // }
    const isConfirmed = await swal.confirm('确定是否推送吗？');
    if (!isConfirmed) return;
    // const res = await omsApi.omsWarehouseOrderPushGcFba({codes: selectedList.value?.map((item) => {
    //     return {
    //       code: item.code,
    //       erpCode: item.saleCode,
    //       guChangeLabel: 0,
    //     };
    //   }),
    // });
    const res = await omsApi.omsWarehouseOrderBatchPush({
      codes: selectedList.value?.map((item) => {
        return item.code;
      }),
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('推送成功');
      refreshList();
    }
  };

  // 批量备注
  const batchRemark = () => {
    remarkRef.value?.open(codeList.value);
  };

  // 导出
  const batchUpdateVisible = ref(false);

  const handleSuccess = () => {
    tableRef.value?.clearSelection();
    refreshList();
  };

  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      page: 1,
      pageSize: 1000,
      filterFBA: true,
    });
    warehouseList.value = res?.warehouseList;
  };
  getWarehouseList();

  const markDeliveryModalRef = ref<InstanceType<typeof MarkDeliveryModal>>();
  const markDelivery = () => {
    markDeliveryModalRef.value?.open();
  };
  const markDeliverySingleModalRef = ref<InstanceType<typeof MarkDeliverySingleModal>>();

  const markDeliverySingle = (row: WarehouseOrderBaseInfoBean) => {
    markDeliverySingleModalRef.value?.open(row);
  };
  const resetSearchData = () => {
    time.value = [];
    search.searchCodeList = undefined;
    batchSearchRef2.value?.clear();
    resetSearch();
  };
  const clearAll = () => {
    selectedList2.value?.forEach((item) => {
      search[item?.key] = undefined;
    });
    batchSearchRef2.value?.clear();
  };
</script>

<style scoped lang="scss">
  .ellipsis {
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的文本 */
    text-overflow: ellipsis; /* 显示省略号 */
    max-width: 150px; /* 列内容的最大宽度，根据需要调整 */
  }
</style>
