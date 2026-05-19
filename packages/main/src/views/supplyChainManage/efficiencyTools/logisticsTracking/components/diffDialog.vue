<template>
  <el-dialog
    width="80%"
    title="差异看板"
    v-model="visible"
    @close="visible = false"
    class="custom-dialog"
  >
    <el-tabs v-model="diffType">
      <el-tab-pane label="有差异数据" :name="1" />
      <el-tab-pane label="无差异数据" :name="0" />
    </el-tabs>
    <KeenList
      v-if="diffType === 1"
      @refresh="refreshList"
      @reset-search="reset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-date-picker
          style="margin-left: -16px"
          v-model="search.time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleTimeChange"
        />
        <el-input v-model="search.fbaId" placeholder="FBAID号" clearable style="width: 186px">
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
        </el-input>
        <el-input
          v-model="search.shippingOrderNo"
          placeholder="发货单号"
          clearable
          style="width: 186px"
        >
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
        </el-input>
      </template>
      <template #buttons>
        <el-button class="button" type="primary" @click="diffUpdateDialogRef.open()">
          导入
        </el-button>
        <ExportBtn :service="erpApi.luteosErpV2FirstLogisticsExportDiffList" :plain="false">
          导出
        </ExportBtn>
        <BatchOperatePophover name="订单处理" :options="batchOptions" :intercept="batchIntercept" />
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.diffList"
        class-name="table-row-dashed"
        max-height="300"
        :row-key="(row) => row.fbaId"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" :reserve-selection="true" />
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :fixed="column.fixed"
          :width="column.width || 120"
        >
          <template #default="scope">
            <OverflowTooltip
              v-if="['trackingNo', 'transferInfo'].includes(column.prop)"
              :content="scope.row[column.prop] || '--'"
              :line="3"
            />
            <span v-else>
              {{ scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                // {
                //   label: '编辑',
                //   key: 'edit',
                //   type: 'primary',
                //   row,
                // },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  hide: row.shippingOrderNo, // 如果有发货单号则不允许删除
                  row,
                },
                {
                  label: '确认无差异',
                  key: 'ignore',
                  type: 'primary',
                  hide: !row.shippingOrderNo, // 如果有发货单号则不允许删除
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
    <IgnoreList v-if="diffType === 0" @import="diffUpdateDialogRef.open()" />
  </el-dialog>
  <ImportUpdateDialog
    title="导入差异数据"
    type="diffUpdate"
    ref="diffUpdateDialogRef"
    @success="refreshList"
  />
  <AddDialog
    ref="addDialogRef"
    @success="refreshList"
    :shipping-type-bean-list="props.shippingTypeBeanList"
  />
  <EditDialog
    ref="editDialogRef"
    @success="refreshList"
    :shipping-type-bean-list="props.shippingTypeBeanList"
  />
</template>

<script setup lang="ts">
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import OverflowTooltip from '@/components/overflowTooltip/index.vue';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import EditDialog from './editDialog.vue';
  import AddDialog from './addDialog.vue';
  import ImportUpdateDialog from './importUpdateDialog.vue';
  import IgnoreList from './ignoreList.vue';

  type DiffRequestQuery = ErpApi.LuteosErpV2FirstLogisticsQueryDiffList.RequestQuery;
  type DiffResponseBody = ErpApi.LuteosErpV2FirstLogisticsQueryDiffList.ResponseBody;

  const props = defineProps<{
    shippingTypeBeanList: any[];
  }>();

  const columns = ref([
    { prop: 'fbaId', label: 'FBAID号', fixed: 'left' },
    { prop: 'destinationCountry', label: '目的国家' },
    { prop: 'shippingDate', label: '发货日期' },
    { prop: 'receiptDate', label: '签收日期' },
    { prop: 'referenceDuration', label: '参考时效（天）' },
    { prop: 'inspected', label: '是否查验' },
    { prop: 'isDelayed', label: '是否延误' },
    { prop: 'delayReason', label: '查验类型&延误原因', width: 150 },
    {
      prop: 'trackingNo',
      label: '物流跟踪单号',
      width: 150,
    },
    { prop: 'transferInfo', label: '转运详情', width: 150 },
    { prop: 'shipStatus', label: '物流状态' },
    { prop: 'logisticsProvider', label: '物流商' },
    { prop: 'transportType', label: '物流方式' },
    { prop: 'transportChannel', label: '物流渠道' },
    { prop: 'vatNo', label: 'VAT号' },
    { prop: 'isDeliveryDelayed', label: '是否递延' },
    { prop: 'ienNo', label: 'IEN' },
    { prop: 'billingWeight', label: '计费重' },
    { prop: 'unitPrice', label: '运费单价' },
    { prop: 'shippingOrderNo', label: '发货单号', fixed: 'right' },
  ]);

  const visible = ref(false);
  const diffUpdateDialogRef = ref();
  const totalList = ref([]);
  const PAGE_SIZE = 10;
  const emit = defineEmits(['success']);
  const diffType = ref(1); // 当前选中的tab

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
    DiffRequestQuery,
    DiffResponseBody
    // ErpApi.LuteosErpV2FirstLogisticsQueryDiffList.ResponseBody
  >({
    searchDefaults: {
      time: undefined,
      fbaId: '',
      shippingOrderNo: '',
    },
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        startTime: time ? time[0] : undefined,
        endTime: time ? dayjs(time[1]).endOf('day')?.format('YYYY-MM-DD HH:mm:ss') : undefined,
      };
    },
    serviceManual: true,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpV2FirstLogisticsQueryDiffList,
  });

  const addDialogRef = ref();
  const editDialogRef = ref();

  // const getDetalByFabId = async (fabId) => {
  //   try {
  //     const res = await erpApi.luteosErpV2FirstLogisticsQueryDetail({
  //       fbaId: fabId,
  //     });
  //     return res.detailInfo;
  //   } catch (error) {
  //     ElMessage.error('获取数据详情失败');
  //     return null;
  //   }
  // };
  // 订单处理
  const batchOptions = computed(() => {
    return [
      {
        title: '批量删除',
        hide: diffType.value === 0,
        fn: async () => {
          // 数据中包含发货单号的不能删除
          const hasInvalidData = totalList.value.some((item) => item.shippingOrderNo);
          if (hasInvalidData) {
            ElMessage.warning('请按是否有发货单号分别勾选');
            return;
          }
          await erpApi.luteosErpV2FirstLogisticsDelete({
            fbaId: totalList.value.map((item: any) => item.fbaId),
          });
          ElMessage.success('批量删除成功');
          refreshList();
        },
      },
      {
        title: '批量确认差异',
        hide: diffType.value === 0,
        fn: async () => {
          if (!batchIntercept()) return;
          const hasInvalidData = totalList.value.some((item: any) => !item.shippingOrderNo);
          if (hasInvalidData) {
            ElMessage.warning('请按是否有发货单号分别勾选');
            return;
          }
          await erpApi.luteosErpV2FirstLogisticsDiffIgnore({
            shippingNoList: totalList.value.map((item: any) => item.shippingOrderNo),
          });
          ElMessage.success('批量确认差异成功');
          refreshList();
        },
      },
    ];
  });

  // 批量操作前置校验
  const batchIntercept = () => {
    if (totalList.value.length === 0) {
      ElMessage.warning('请选择数据');
      return false;
    }
    return true;
  };
  const handleTimeChange = () => {
    localStorage.setItem('logisticsDiffTime', JSON.stringify(search.time));
  };
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      if (row.fbaId) {
        // const res = await getDetalByFabId(row.fbaId);
        editDialogRef.value?.open(row);
      } else {
        addDialogRef.value?.open(row);
      }
      return;
    }
    const isConfirmed = await swal.confirm('确认操作吗？');
    if (!isConfirmed) return;
    if (key === 'delete') {
      await erpApi.luteosErpV2FirstLogisticsDelete({
        fbaId: [row.fbaId],
      });
      refreshList();
    }
    if (key === 'ignore') {
      await erpApi.luteosErpV2FirstLogisticsDiffIgnore({
        shippingNoList: [row.shippingOrderNo],
      });
      refreshList();
    }
    ElMessage.success('操作成功');
  };

  const reset = () => {
    search.time = [];
    resetSearch();
  };

  const open = () => {
    // 缓存的时间
    const cachedTime = localStorage.getItem('logisticsDiffTime');
    if (cachedTime) {
      search.time = JSON.parse(cachedTime);
    } else {
      runQuery();
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
