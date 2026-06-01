<template>
  <OrderTabs
    v-model="search.status"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusStatistics"
  />
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="仓配订单/销售订单号/销售参考号/仓配系统销售单号/服务号/OA单号/领用单号"
          clearable
          style="width: 515px"
        >
          <template #prefix>
            <SvgIconSearch />
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
      <el-button type="primary" @click="markDelivery">批量标发</el-button>
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
      </el-button>
      <!-- <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button> -->
      <!--      <ExportBtn :service="erpApi.luteosErpWarehouseOrderExport" :params="search">导出</ExportBtn>-->
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
      <el-table-column label="仓配订单号" prop="code" min-width="155" fixed="left" />
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
      <el-table-column label="仓配系统销售订单号/仓配单号" min-width="200">
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
      <el-table-column label="状态" min-width="100">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
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
      <el-table-column label="自动分配裁剪附件" prop="isCutAttDesc" min-width="170" />
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row: row,
                permissionCode: 'warehouseOrderDetail',
              },
              {
                label: '标发',
                key: 'markDelivery',
                type: 'primary',
                row: row,
                hide: row?.systemType !== 2 || row?.status !== 100,
              },
              {
                label: '附件',
                key: 'attachment',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'warehouseOrderDetail',
                hide: row?.type === 2,
              },
              {
                label: '上传附件',
                key: 'upload',
                type: 'primary',
                text: true,
                row: row,
                hide: row?.type === 2,
              },
              {
                label: '备注',
                key: 'remark',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '改绑',
                key: 'changeBind',
                type: 'primary',
                text: true,
                row: row,
                hide: ![2, 4].includes(row?.systemType) || +row?.status === 300,
              },
              {
                label: '推送',
                key: 'push',
                type: 'primary',
                text: true,
                row: row,
                hide: !row.button?.showPushGc || row.button?.pushingGc,
                permissionCode: 'warehouseOrderPush',
              },
              {
                label: '推送中...',
                key: 'push',
                type: 'primary',
                text: true,
                row: row,
                hide: !row.button?.pushingGc,
                disabled: true,
                permissionCode: 'warehouseOrderPush',
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
  <ChangeBindModal ref="changeBindModalRef" @success="handleSuccess" />
</template>

<script setup lang="ts" name="warehouseOrder">
  import useList from '@/hooks/list/useList';
  import { dataApi, ErpApi, erpApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import { ElMessage } from 'element-plus';
  import AttachmentUpload from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/AttachmentUpload.vue';
  import * as swal from '@/utils/swal';
  import PushDialog from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/PushDialog.vue';
  import BatchUpdateModal from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/BatchUpdateModal.vue';
  import type { WarehouseOrderBaseInfoBean } from '@/api/erp/data-contracts';
  import RemarkDialog from './components/RemarkDialog.vue';
  import MarkDeliveryModal from './components/MarkDelivery.vue';
  import MarkDeliverySingleModal from './components/MarkDeliverySingle.vue';
  import ChangeBindModal from './components/ChangeBindModal.vue';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    { status: '200', code: 'confirm', statusName: '处理中', count: '' },
    { status: '300', code: 'outWarehouse', statusName: '已出库', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];

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
    600: 'gray',
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
    ErpApi.LuteosErpWarehouseOrderQueryList.RequestBody,
    ErpApi.LuteosErpWarehouseOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: '',
      createTimeEnd: '',
      createTimeStart: '',
      warehouseCode: '',
      systemType: '',
      orderType: '',
      isCutAtt: '',
      type: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpWarehouseOrderQueryList,
  });

  const router = useRouter();
  const remarkRef = ref();
  const pushRef = ref();
  const changeBindModalRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      router.push({
        path: '/warehouseOrder/detail',
        query: {
          code: row.code,
          type: row.type,
        },
      });
    } else if (key === 'remark') {
      remarkRef.value.open([row.code], row.remark);
    } else if (key === 'attachment') {
      const path = router.resolve({
        name: 'warehouseOrderDetail',
        query: { code: row.code, activated: 5 },
      });
      router.push(path.href);
    } else if (key === 'upload') {
      uploadRef.value?.open([row.code]);
    } else if (key === 'push') {
      // pushRef.value.open(row.code);
      router.push({
        path: '/warehouseOrder/push',
        query: {
          code: row.code,
        },
      });
      /* const isConfirmed = await swal.confirm('确定推送谷仓吗？');
      if (!isConfirmed) return;
      const res = await erpApi.luteosErpWarehouseOrderPushGc({
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
    } else if (key === 'changeBind') {
      changeBindModalRef.value.open(row);
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
  // 批量裁剪
  const batchCut = async () => {
    const isConfirmed = await swal.confirm('确定要裁剪附件吗？');
    if (!isConfirmed) return;
    await erpApi.luteosErpWarehouseOrderCutAttBatch({
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
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => !item.button?.showPushGc)
      ?.map((item) => item.code);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}不能推送，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('确定推送谷仓吗？');
    if (!isConfirmed) return;
    const res = await erpApi.luteosErpWarehouseOrderPushGcFba({
      pushDetailList: selectedList.value?.map((item) => {
        return {
          code: item.code,
          erpCode: item.saleCode,
          guChangeLabel: 0,
        };
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
    resetSearch();
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
