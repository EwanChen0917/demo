<!-- 创建模板 -->
<template>
  <el-tabs v-model="search.status" @tab-change="handleTabChange">
    <el-tab-pane label="全部" :name="-1" />
    <el-tab-pane label="未确认" :name="0" />
    <el-tab-pane label="已确认" :name="1" />
  </el-tabs>

  <KeenList @refresh="refreshList" @reset-search="reset">
    <template #search>
      <el-date-picker
        v-model="search.addTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD HH:mm:ss"
        clearable
      />
    </template>
    <template #filters>
      <!-- <el-select
        v-model="search.calculateFeeStatus"
        placeholder="请选择计算状态"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      >
        <el-option
          v-for="item in calculateFeeStatusList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select> -->
      <CountrySelect
        v-model="search.destinationCountry"
        placeholder="请选择目的国家"
        filterable
        clearable
      />
      <el-select
        v-model="transport"
        value-key="id"
        placeholder="请选择物流方式"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        @change="
          (val) => {
            search.logisticsTransport = Array.isArray(val)
              ? val.map((item) => item.transportName).join(',')
              : val?.transportName || '';
          }
        "
      >
        <el-option
          v-for="item in logisticsTransportList"
          :key="item.id"
          :label="item.transportName"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="search.fbaWarehouseCode"
        placeholder="请输入FBA仓库代码"
        clearable
        style="width: 210px"
      />
      <el-input style="width: 310px" v-model="search[searchType]" placeholder="请输入" clearable>
        <template #prepend>
          <el-select style="width: 100px" v-model="searchType" placeholder="请选择">
            <el-option
              v-for="item in searchTypes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </template>
    <template #buttons>
      <KeenFileUpload
        accept=".xlsx,.xls"
        v-model="file"
        :showOperate="false"
        directory="erp/template"
        @success="confirmUpload"
        :showFileList="false"
        :overflowHidden="false"
      >
        <el-button type="primary">导入账单</el-button>
      </KeenFileUpload>
      <el-button
        type="primary"
        :loading="exportLoading"
        :disabled="!listData?.recordList?.length"
        @click="downloadBill"
      >
        导出账单
      </el-button>
      <el-button type="primary" @click="createEstimatedFee" :loading="downloadLoading">
        生成预估账单
      </el-button>
      <el-button type="primary" plain @click="billOrderModalRef.open()">应付单</el-button>
      <el-button
        type="danger"
        plain
        @click="destroyBillOrder"
        :loading="destroyLoading"
        :disabled="!selectedList?.length"
      >
        作废应付单
      </el-button>
      <el-button
        v-show="search.status === 1"
        type="primary"
        @click="() => batchChangeConfirmStatus('批量撤回')"
        :disabled="!listData?.recordList?.length"
      >
        批量撤回
      </el-button>
      <el-button
        v-show="search.status === 0"
        type="primary"
        @click="() => batchChangeConfirmStatus('批量确认')"
        :disabled="!listData?.recordList?.length"
      >
        批量确认
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed="left" />
      <el-table-column prop="billNo" label="账单号" min-width="120" fixed="left" />
      <el-table-column prop="xyLogisticsNo" label="物流单单号" min-width="120" />
      <el-table-column prop="addTime" label="兴运物流单添加时间" min-width="160" />
      <el-table-column prop="freightForwarderNo" label="货代运单号" min-width="120" />
      <el-table-column prop="logisticsProvider" label="物流商" min-width="110" />
      <el-table-column prop="logisticsMethod" label="物流方式" min-width="110" />
      <el-table-column prop="logisticsChannel" label="物流渠道名称" min-width="140" />
      <el-table-column prop="destinationCountryName" label="目的地国家" min-width="110" />
      <el-table-column prop="fbaWarehouseCode" label="FBA仓库代码" min-width="110" />
      <el-table-column prop="fbaId" label="FBA ID" min-width="120" />
      <el-table-column prop="payableNo" label="应付帐单号" min-width="120" />
      <el-table-column prop="statusDesc" label="状态">
        <template #default="{ row }">
          <Tag class="ms-2" :color="row.status === 1 ? 'green' : 'yellow'">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="calculateFeeStatusDesc" label="计费状态" min-width="110" />
      <el-table-column prop="contractNo" label="合同协议号" min-width="100" />
      <el-table-column prop="taxId" label="税金单号" />
      <el-table-column prop="totalVolume" label="总体积" />

      <template v-for="col in feeColums" :key="col.prop">
        <el-table-column :prop="col.prop" :label="col.label" :min-width="150">
          <template #default="{ row, $index }">
            <div>
              <span class="fee-title">{{ col.prop === 'totalFee' ? '预估: ' : '' }}</span>
              <OverflowTooltip
                :content="row?.estimatedFee?.[col.prop] ?? '--'"
                :line="1"
                v-show="col.prop === 'feeRemark'"
              />
              <span v-show="col.prop !== 'feeRemark'">
                {{ row?.estimatedFee?.[col.prop] ?? '--' }}
              </span>
            </div>
            <div class="fee-input">
              <span class="fee-title">{{ col.prop === 'totalFee' ? '实际: ' : '' }}</span>
              <template v-if="row.isEditting">
                <el-input-number
                  v-if="col.prop !== 'feeRemark'"
                  v-model="(row.actualFee || (row.actualFee = {}))[col.prop]"
                  :min="0"
                  :precision="2"
                  :controls="false"
                  :placeholder="col.placeholder"
                  style="width: 70%"
                  @change="
                    (val) => {
                      if (val === '' || val === null) row.actualFee[col.prop] = 0;
                    }
                  "
                />
                <div v-if="col.prop === 'feeRemark'" style="display: flex; align-items: center">
                  <OverflowTooltip :content="row?.actualFee?.[col.prop] || '--'" :line="1" />
                  <el-popover placement="bottom" :visible="remarkRowId === row.id">
                    <template #reference>
                      <!-- <el-input
                      v-model="(row.actualFee || (row.actualFee = {}))[col.prop]"
                      clearable
                      :maxlength="100"
                      :placeholder="col.placeholder"
                      style="width: 100px"
                    /> -->
                      <i class="iconfont icon-bianji" @click="handleRemark(row, col.prop)" />
                    </template>
                    <div style="width: 300px; padding: 10px">
                      <el-input
                        type="textarea"
                        v-model="currentRemark"
                        :maxlength="100"
                        show-word-limit
                        :placeholder="col.placeholder"
                        style="width: 100%"
                        :rows="5"
                      />
                      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
                        <el-button type="text" size="small" @click="cancelSaveRemark">
                          取消
                        </el-button>
                        <el-button size="small" type="primary" @click="saveRemark(row, col.prop)">
                          确定
                        </el-button>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </template>
              <template v-else>
                <OverflowTooltip
                  :content="row?.actualFee?.[col.prop] ?? '--'"
                  :line="1"
                  v-show="col.prop === 'feeRemark'"
                />
                <span v-show="col.prop !== 'feeRemark'">
                  {{ row?.actualFee?.[col.prop] ?? '--' }}
                </span>
              </template>
            </div>
            <div>
              <span class="fee-title">{{ col.prop === 'totalFee' ? '差值: ' : '' }}</span>
              <!-- 负值高亮？ -->
              <span>
                {{
                  col.prop === 'feeRemark'
                    ? '--'
                    : Number(
                        (
                          (row?.actualFee?.[col.prop] || 0) - (row?.estimatedFee?.[col.prop] || 0)
                        ).toFixed(2)
                      )
                }}
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
                hide: row.isEditting || row.status === 1,
              },
              {
                label: '保存',
                key: 'save',
                type: 'primary',
                permissionCode: '',
                row,
                hide: !row.isEditting,
              },
              {
                label: '取消',
                key: 'cancel',
                type: 'danger',
                permissionCode: '',
                row,
                hide: !row.isEditting,
              },
              {
                label: '确认',
                key: 'confirm',
                type: 'primary',
                permissionCode: '',
                row,
                hide: row.isEditting || row.status,
              },
              {
                label: '重新计费',
                key: 'recalculate',
                type: 'primary',
                permissionCode: '',
                row,
                hide: ![2, 3].includes(row.calculateFeeStatus),
              },

              {
                label: '撤回',
                key: 'withdraw',
                type: 'primary',
                permissionCode: '',
                row,
                hide: !row.status,
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
  <BillOrderModal ref="billOrderModalRef" @success="handleBillOrderSuccess" />
</template>

<script setup lang="ts" name="fbaTrackingBill">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit, pick } from 'lodash-es';
  import dayjs from 'dayjs';
  import { openWindow } from '@/utils';
  import BillOrderModal from './components/billOrderModal.vue';
  const searchTypes = [
    { label: 'FBA ID', value: 'fbaId' },
    { label: '物流单号', value: 'xyLogisticsNo' },
    { label: '货代运单号', value: 'freightForwarderNo' },
    { label: '费用说明备注', value: 'feeRemark' },
  ];
  const feeColums = [
    {
      prop: 'totalFee',
      label: '总费用',
    },
    {
      prop: 'billingWeight',
      label: '计费重（kg）',
      placeholder: '请输入计费重',
    },
    {
      prop: 'billingUnitPrice',
      label: '计费单价（元/kg）',
      placeholder: '请输入单价',
    },
    {
      prop: 'totalBoxes',
      label: '总箱数',
      placeholder: '请输入总箱数',
    },
    {
      prop: 'freightFee',
      label: '运费',
      placeholder: '请输入运费',
    },
    {
      prop: 'customsFee',
      label: '报关费',
      placeholder: '请输入报关费',
    },
    {
      prop: 'customsContinuationFee',
      label: '报关续页费',
      placeholder: '请输入报关续页费',
    },
    {
      prop: 'personalAddrFee',
      label: '私人/商业地址附加费',
      placeholder: '请输入私人/商业地址附加费',
    },
    {
      prop: 'dutyFee',
      label: '关税',
      placeholder: '请输入关税',
    },
    {
      prop: 'dutyPrepaymentFee',
      label: '关税预付手续费',
      placeholder: '请输入关税预付手续费',
    },
    {
      prop: 'customsClearanceFee',
      label: '清关费',
      placeholder: '请输入清关费',
    },
    {
      prop: 'portCrossingFee',
      label: '过港费',
      placeholder: '请输入过港费',
    },
    {
      prop: 'handlingFee',
      label: '操作费',
      placeholder: '请输入操作费',
    },

    {
      prop: 'compensationAmount',
      label: '赔付金额',
      placeholder: '请输入赔付金额',
    },
    {
      prop: 'additionalFee',
      label: '产品附加费',
      placeholder: '请输入产品附加费',
    },
    {
      prop: 'remoteAdditionalFee',
      label: '偏远附加费',
      placeholder: '请输入偏远附加费',
    },
    {
      prop: 'productAdditionalFee',
      label: '品名附加费',
      placeholder: '请输入品名附加费',
    },
    {
      prop: 'otherFee',
      label: '其他费用',
      placeholder: '请输入其他费用',
    },
    {
      prop: 'feeRemark',
      label: '费用说明备注',
      placeholder: '请输入费用说明备注',
    },
  ];
  const currentRemark = ref('');
  const remarkRowId = ref(-1);
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const transport = ref({}); // 物流方式
  const searchType = ref('fbaId'); // 默认搜索类型
  const billOrderModalRef = ref();
  const downloadLoading = ref(false);
  const logisticsTransportList = ref<any[]>([]); // 物流方式列表
  const file = ref<any[]>([]);

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
    ErpApi.LuteosErpLogisticsReconciliationQueryList.RequestBody,
    ErpApi.LuteosErpLogisticsReconciliationQueryList.ResponseBody
  >({
    searchDefaults: {
      addTime: [
        dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ],
      destinationCountry: undefined, // 目的国家
      logisticsTransport: undefined, // 物流方式
      fbaWarehouseCode: undefined, // FBA仓库代码
      fbaId: undefined, // FBA ID
      xyLogisticsNo: undefined, // 兴运物流单号
      freightForwarderNo: undefined, // 货代运单号
      feeRemark: undefined, //  费用说明备注
      status: -1,
    },
    interceptSearchData: (searchData) => {
      const { addTime, status } = searchData;

      return {
        ...pick(searchData, [
          'destinationCountry',
          'logisticsTransport',
          'fbaWarehouseCode',
          `${searchType.value}`,
        ]),
        addTimeStart: addTime ? addTime[0] : undefined,
        addTimeEnd: addTime
          ? dayjs(addTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        status: status === -1 ? undefined : status,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsReconciliationQueryList,
  });

  watch(
    () => search.addTime,
    (val) => {
      if (val && val.length === 2) {
        const [start, end] = val;
        if (dayjs(end).diff(dayjs(start), 'month', true) > 3) {
          ElMessage.warning('日期区间最多支持选择3个月！');
          search.addTime = [
            dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
            dayjs(start).add(3, 'month').format('YYYY-MM-DD HH:mm:ss'),
          ];
        }
      }
    }
  );
  const getLogisticsTransportList = async () => {
    const res = await erpApi.luteosErpLogisticsTransportQueryList({
      pageSize: 1000,
      pageNum: 1,
      // status: 1, // 只查询启用的物流方式
    });
    logisticsTransportList.value = res?.recordList || [];
  };
  getLogisticsTransportList();

  const handleParams = () => {
    const { addTime, status } = search;
    const data = {
      ...search,
      addTimeStart: addTime ? addTime[0] : undefined,
      addTimeEnd: addTime ? addTime[1] : undefined,
      pageSize: pageSize.value,
      pageNum: current.value,
      status: status === -1 ? undefined : status,
    };
    return { ...omit(data, 'addTime') };
  };
  const handleBillOrderSuccess = () => {
    runQuery();
    selectedList.value = [];
    tableRef.value?.clearSelection();
  };
  const handleFileSuccess = async (type) => {
    const routeName = type === '上传' ? '/salesForecastingLog' : '/downloadmanage';
    const isConfirmed = await swal.confirm({
      title: `${type}成功，是否去查看${type}日志?`,
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (isConfirmed) {
      openWindow(routeName);
    }
  };

  const confirmUpload = async () => {
    const res = await erpApi.luteosErpLogisticsReconciliationUpload({
      fileName: file.value[0].name,
      fileUrl: file.value[0].ossKey,
      ossKey: file.value[0].ossKey,
    });
    file.value = [];

    if (res) {
      handleFileSuccess('上传');
      runQuery();
    }
  };
  const exportLoading = ref(false);
  const downloadBill = async () => {
    exportLoading.value = true;
    const res = await erpApi
      .luteosErpLogisticsReconciliationDownload(handleParams())
      .finally(() => {
        exportLoading.value = false;
      });
    if (res) {
      handleFileSuccess('下载');
    }
  };

  const createEstimatedFee = async () => {
    downloadLoading.value = true;
    try {
      await erpApi.luteosErpLogisticsReconciliationGenerateEstimate().finally(() => {
        downloadLoading.value = false;
      });
      ElMessage.success('操作成功');
      runQuery();
    } catch (error) {}
  };

  const handleTabChange = (val) => {
    search.status = val;
    tableRef.value?.clearSelection();
  };

  const selectedList = ref();
  const handleSelectionChange = (selection: any[]) => {
    selectedList.value = selection;
  };

  const changeConfirmStatus = async (billNoList, type) => {
    const isConfirmed = await swal.confirm({
      title: `是否${type}${type === '撤回' ? '已确认' : ''}账单？`,
      icon: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    });
    if (!isConfirmed) return;
    const api = type.includes('确认')
      ? erpApi.luteosErpLogisticsReconciliationConfirm
      : erpApi.luteosErpLogisticsReconciliationCancelConfirm;
    try {
      await api({
        billNoList,
      });
      ElMessage.success(`${type}成功`);
    } finally {
      runQuery();
    }
  };

  const batchChangeConfirmStatus = async (type) => {
    if (!selectedList.value?.length) {
      ElMessage.warning('请先选择要操作的账单');
      return;
    }
    const billNoList = selectedList.value.map((item) => item.billNo);
    console.log('billNoList', billNoList);
    await changeConfirmStatus(billNoList, type);
  };

  const handleActions = async ({ key, row }) => {
    switch (key) {
      case 'edit':
        // 编辑逻辑
        row.isEditting = true;
        row.beforeActualFee = { ...row.actualFee };
        break;
      case 'cancel':
        row.isEditting = false;
        row.actualFee = { ...row.beforeActualFee };
        delete row.beforeActualFee;
        break;
      case 'confirm':
        // 确认逻辑
        changeConfirmStatus([row.billNo], '确认');
        break;
      case 'save':
        try {
          const params = {
            billNo: row.billNo,
            actualFee: row.actualFee || {},
          };
          await erpApi.luteosErpLogisticsReconciliationUpdate(params);
          ElMessage.success('保存成功');
        } finally {
          row.isEditting = false;
        }
        break;

      case 'withdraw':
        // 撤回逻辑
        changeConfirmStatus([row.billNo], '撤回');
        break;
      case 'recalculate':
        try {
          const isConfirmed = await swal.confirm({
            title: '是否重新计费？',
            icon: 'warning',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          });
          if (!isConfirmed) return;
          await erpApi.luteosErpLogisticsReconciliationRecomputeFee({
            xyLogisticsNo: row.xyLogisticsNo,
          });
          ElMessage.success('重新计费成功');
          runQuery();
        } finally {
        }
        break;
      default:
        break;
    }
  };
  const destroyLoading = ref(false);
  const destroyBillOrder = async () => {
    if (!selectedList.value?.length) {
      ElMessage.warning('请先选择要作废的应付单');
      return;
    }
    const payableNoList: string[] = selectedList.value
      .filter((item) => +item.calculateFeeStatus === 4 && item.payableNo)
      ?.map((item) => item.payableNo); // 需要过滤已生成账单的数据
    if (!payableNoList.length) {
      ElMessage.warning('所选数据没有符合条件的应付单');
      return;
    }
    const isConfirmed = await swal.confirm({
      title: '是否作废应付单？',
      icon: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    });
    if (!isConfirmed) return;

    try {
      destroyLoading.value = true;
      await erpApi.luteosErpLogisticsReconciliationCancelPayable(payableNoList);
      ElMessage.success('作废成功');
      selectedList.value = [];
      tableRef.value?.clearSelection();
      runQuery();
    } finally {
      destroyLoading.value = false;
    }
  };
  const reset = () => {
    transport.value = {};
    resetSearch();
  };
  const handleRemark = (row, prop) => {
    remarkRowId.value = row.id;
    currentRemark.value = row?.actualFee?.[prop] || '';
  };
  const cancelSaveRemark = () => {
    remarkRowId.value = -1;
    currentRemark.value = '';
  };
  const saveRemark = (row, prop) => {
    row.actualFee[prop] = currentRemark.value;
    remarkRowId.value = -1;
    currentRemark.value = '';
  };
</script>

<style lang="scss" scoped>
  .fee-title {
    color: #999;
  }
  .fee-input {
    padding: 10px 0;
    :deep(.el-input__wrapper) {
      padding: 0 !important;
    }
  }
</style>
