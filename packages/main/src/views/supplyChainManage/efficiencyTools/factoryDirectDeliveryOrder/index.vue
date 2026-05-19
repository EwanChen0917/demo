<template>
  <OrderTabs
    v-model="displayStatus"
    :tab-status-list="tabStatusList"
    :count-map="countMap"
    @tab-change="handleTabChange"
    @child-tab-change="handleChildTabChange"
  />
  <keenList @refresh="refreshList" @reset-search="handleResetSearch">
    <template #search>
      <el-input style="width: 250px" v-model="codes" placeholder="请输入工单编号" clearable>
        <template #append>
          <BatchSearchPopover
            placeholder="一行一项，按回车键换行，最多支持50行"
            ref="batchSearchCodeRef"
            @search="handleBatchSearchCode"
            @clear="handleClearCode"
            :maxLines="50"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        placeholder="请输入送货单号"
        v-model="deliveryBillCodes"
        clearable
        style="width: 250px"
      >
        <template #append>
          <BatchSearchPopover
            placeholder="一行一项，按回车键换行，最多支持50行"
            ref="batchSearchDeliveryBillCodesRef"
            @search="handleBatchSearchCodes"
            @clear="handleClearCodes"
            :maxLines="50"
          />
        </template>
      </el-input>
      <el-input
        placeholder="请输入调拨单号"
        v-model="transferOrderCodes"
        clearable
        style="width: 250px"
      >
        <template #append>
          <BatchSearchPopover
            placeholder="一行一项，按回车键换行，最多支持50行"
            ref="batchSearchTransferOrderCodesRef"
            @search="handleBatchSearchTransferOrderCodes"
            @clear="handleClearTransferOrderCodes"
            :maxLines="50"
          />
        </template>
      </el-input>
      <SrmSupplier v-model="search.supplierCode" />
      <el-select v-model="search.pickupMethod" placeholder="提货方式" clearable>
        <!-- <el-option label="需要物流安排提货" value="logistics"></el-option>
        <el-option label="工厂自送货" value="factory"></el-option> -->
        <el-option
          v-for="item in deliveryTypeMap"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.warehouseCode" placeholder="发货仓库" clearable>
        <el-option label="香港路特-越南仓_HKROOT-VN" value="OW046624" />
        <el-option label="香港路特-柬埔寨仓_HKROOT-KH" value="OW046798" />
        <el-option label="供应链公司工厂直发虚拟仓" value="OW046836" />
        <el-option label="海南路特供应商虚拟仓-工厂直发" value="OW047364" />
      </el-select>
      <DeptMember
        :style="{ width: '200px' }"
        ref="auditCodeSelectRef"
        v-model="search.createBy"
        placeholder="申请人"
      />
      <el-date-picker
        v-model="deliveryDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="提货时间开始"
        end-placeholder="提货时间结束"
        clearable
        value-format="YYYY-MM-DD"
      />
      <el-select v-model="search.logisticsPickup" placeholder="物流是否提货" clearable>
        <el-option label="是" value="Y" />
        <el-option label="否" value="N" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleClickAdd">新增工单</el-button>
      <el-button
        type="primary"
        @click="handleClickOpreate(OPERATE_TYPE_MAP.QUALITYINSPECTIONCOMPLETED.type)"
        :disabled="operateLoading"
      >
        质检完成
      </el-button>
      <el-button
        type="danger"
        @click="handleClickOpreate(OPERATE_TYPE_MAP.QUALITYINSPECTIONABNORMALITIES.type)"
        :disabled="operateLoading"
      >
        质检异常
      </el-button>
      <el-button
        type="primary"
        @click="handleClickOpreate(OPERATE_TYPE_MAP.RECEIVCOMPLETED.type)"
        :disabled="operateLoading"
      >
        收货完成
      </el-button>
      <el-button
        type="danger"
        @click="handleClickOpreate(OPERATE_TYPE_MAP.RECEIVABNORMALITIES.type)"
        :disabled="operateLoading"
      >
        收货异常
      </el-button>
      <ExportBtn
        :service="omsApi.omsDirectFactoryWorkOrderExport"
        :params="exportListInfoParams"
        :disabled="exportListInfoDisabled"
        :plain="false"
        :type="'primary'"
        openType="handle"
        @export-success="handleExportSuccess"
      >
        导出提货单
      </ExportBtn>
      <ExportBtn
        :service="omsApi.omsDirectFactoryWorkOrderExportPoInfo"
        :params="exportListParams"
        :plain="false"
        :type="'primary'"
        openType="route"
      >
        导出采购订单
      </ExportBtn>
      <!-- 原有代码保留 -->
      <!-- <el-button 
        type="primary" 
        @click="exportListInfoData" 
        :loading="exportListLoading" 
        :disabled="exportListLoading"
      >导出提货单</el-button>
      <el-button 
        type="primary" 
        @click="exportListData" 
        :loading="exportLoading" 
        :disabled="exportLoading"
      >导出采购订单</el-button> -->
    </template>
    <el-table
      :data="listData?.recordList"
      v-loading="listLoading"
      row-key="id"
      ref="tableRef"
      @selection-change="handleSelectionChangeListData"
    >
      <el-table-column type="selection" reserve-selection />
      <el-table-column label="工单编号" prop="code" min-width="200" />
      <el-table-column label="供应商" prop="supplierName" min-width="200" />
      <el-table-column label="提货时间" prop="deliveryDate" min-width="200" />
      <el-table-column label="发货仓库" prop="warehouseName" min-width="200">
        <template #default="{ row }">
          <span v-if="row.warehouseCode === 'SCM-VW-SU'">供应链公司供应商虚拟仓</span>
          <span v-else-if="row.warehouseCode === 'HNL-VW-SUP'">海南路特供应商虚拟仓</span>
          <span v-else>{{ row.warehouseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提货方式" min-width="200">
        <template #default="{ row }">
          {{
            row.pickupMethod === 'logistics'
              ? '需要物流安排提货'
              : row.pickupMethod === 'factory'
              ? '工厂自送货'
              : '工厂自送物流商仓'
          }}
        </template>
      </el-table-column>
      <el-table-column label="物流是否提货" min-width="200" prop="logisticsPickup">
        <template #default="{ row }">
          {{ row.logisticsPickup === 'Y' ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否需要出口退税" prop="exportTaxRebate" min-width="300">
        <template #default="{ row }">
          {{ row.exportTaxRebate === 'Y' ? '正式报关（需要出口退税）' : '买单出口（不需要退税）' }}
        </template>
      </el-table-column>
      <el-table-column label="申请人" prop="createName" min-width="100" />
      <el-table-column label="状态" prop="statusName" min-width="100" />
      <el-table-column label="申请时间" prop="createTime" min-width="250" />
      <el-table-column label="更新时间" prop="updateTime" min-width="250" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="{ row }">
          <KeenActions
            class="actions"
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: !(row.status === '0'),
                row: row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '确认物流提货',
                key: 'confirmLogisticsPickup',
                type: 'primary',
                text: true,
                row: row,
                hide: !(row.logisticsPickup === 'N' && ['1', '2', '3'].includes(row.status)),
              },
              {
                label: '重新上传积加调拨单',
                key: 'relateFactoryWorkOrder',
                type: 'primary',
                text: true,
                row: row,
                hide: !['1'].includes(row.status),
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'danger',
                text: true,
                hide: !(row.status === '0'),
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
  </keenList>
</template>

<script lang="ts" setup name="factoryDirectDelivery">
  import { ref, watch, computed, onMounted, onActivated } from 'vue';
  import useList from '@/hooks/list/useList';
  import { useRouter } from 'vue-router';
  import { omsApi, OmsApi } from '@/api';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { download } from '@/utils/download';
  // import { openWindow } from '@/utils';
  import ExportBtn from '@/components/ExportBtn/index.vue';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';
  import { useFactoryConfig } from './hooks/useFactoryConfig';
  import SrmSupplier from './components/srmSupplier.vue';

  const { deliveryTypeMap } = useFactoryConfig();
  const router = useRouter();
  const OPERATE_TYPE_MAP = {
    QUALITYINSPECTIONCOMPLETED: {
      type: 'QUALITYINSPECTIONCOMPLETED',
      label: '质检完成',
    },
    QUALITYINSPECTIONABNORMALITIES: {
      type: 'QUALITYINSPECTIONABNORMALITIES',
      label: '质检异常',
    },
    RECEIVCOMPLETED: {
      type: 'RECEIVCOMPLETED',
      label: '收货完成',
    },
    RECEIVABNORMALITIES: {
      type: 'RECEIVABNORMALITIES',
      label: '收货异常',
    },
  };
  const tabStatusList = ref([
    { status: 'all', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'waitConfirm', statusName: '待质检', count: '' },
    { status: '1', code: 'waitRecive', statusName: '待入库', count: '' },
    { status: '2', code: 'waitOut', statusName: '待出库', count: '' },
    { status: '3', code: 'alreadyOut', statusName: '已出库', count: '' },
    { status: '4', code: 'error', statusName: '异常', count: '' },
    { status: '5', code: 'abandon', statusName: '废弃', count: '' },
  ]);
  const countMap = ref({
    all: 0,
    waitConfirm: 0,
    waitRecive: 0,
    waitOut: 0,
    alreadyOut: 0,
    error: 0,
    abandon: 0,
  });
  const PAGE_SIZE = 10;
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
  } = useList<
    OmsApi.OmsDirectFactoryWorkOrderQueryList.RequestBody,
    OmsApi.OmsDirectFactoryWorkOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      code: undefined,
      codes: undefined,
      createBy: undefined,
      pickupMethod: undefined,
      status: undefined,
      deliveryDateStart: undefined,
      deliveryDateEnd: undefined,
      supplierCode: undefined,
      warehouseCode: undefined,
      logisticsPickup: undefined,
      deliveryBillCodes: undefined,
      transferOrderCodes: undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsDirectFactoryWorkOrderQueryList,
  });
  const innerStatus = ref('');
  // 显示用的 status（给组件用的）
  const displayStatus = computed({
    get: () => (innerStatus.value === '' ? 'all' : innerStatus.value),
    set: (val) => {
      innerStatus.value = val === 'all' ? '' : val;
    },
  });
  // 把 innerStatus 的值赋给 search.status
  watch(innerStatus, (val) => {
    search.status = val;
  });

  // 提货日期范围
  const deliveryDateRange = computed<[string, string] | null>({
    get() {
      const start = search.deliveryDateStart;
      const end = search.deliveryDateEnd;
      if (start && end) {
        return [start, end] as [string, string];
      }
      return null;
    },
    set(value: [string, string] | null) {
      if (value && Array.isArray(value) && value.length === 2) {
        search.deliveryDateStart = value[0];
        search.deliveryDateEnd = value[1];
      } else {
        search.deliveryDateStart = undefined;
        search.deliveryDateEnd = undefined;
      }
    },
  });

  // 工单编号（批量）字符串 <-> 数组
  const codes = computed<string>({
    get() {
      return (search.codes as string[] | undefined)?.join('\n') ?? '';
    },
    set(val: string) {
      if (!val) {
        // 置空时，传给后端的是 undefined
        (search as any).codes = undefined;
        return;
      }
      const list = val
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
      (search as any).codes = list.length ? list : undefined;
    },
  });

  // 送货单号（批量）字符串 <-> 数组
  const deliveryBillCodes = computed<string>({
    get() {
      return (search as any).deliveryBillCodes?.join('\n') ?? '';
    },
    set(val: string) {
      if (!val) {
        (search as any).deliveryBillCodes = undefined;
        return;
      }
      const list = val
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
      (search as any).deliveryBillCodes = list.length ? list : undefined;
    },
  });

  // 调拨单号（批量）字符串 <-> 数组
  const transferOrderCodes = computed<string>({
    get() {
      return (search as any).transferOrderCodes?.join('\n') ?? '';
    },
    set(val: string) {
      if (!val) {
        (search as any).transferOrderCodes = undefined;
        return;
      }
      const list = val
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
      (search as any).transferOrderCodes = list.length ? list : undefined;
    },
  });

  const getStatusMap = async () => {
    const res = (await omsApi.omsDirectFactoryWorkOrderQueryStatusCount()) as any;
    // 遍历后端返回的数据
    res.forEach((item) => {
      // 将后端的空字符串转换为 'all'
      const statusKey = item.status === '' ? 'all' : item.status;
      // 根据转换后的 status 在 tabStatusList 中找到对应的 tab
      const matchedTab = tabStatusList.value.find((tab) => tab.status === statusKey);
      // 如果找到了，使用它的 code 更新 countMap
      if (matchedTab) {
        countMap.value[matchedTab.code] = item.count;
      }
    });
    tabStatusList.value = tabStatusList.value.map((tab) => {
      const backendData = res.find((r) => {
        const backendStatus = r.status === '' ? 'all' : r.status;
        return backendStatus === tab.status;
      });
      return {
        ...tab,
        statusName: backendData?.statusName || tab.statusName,
        count: backendData?.count || 0,
      };
    });
  };
  // BatchSearchPopover 引用
  const batchSearchCodeRef = ref();
  const batchSearchDeliveryBillCodesRef = ref();
  const batchSearchTransferOrderCodesRef = ref();
  const tableRef = ref();
  // 存储表格选中项
  const selectedRows = ref<any[]>([]);

  // 表格选中项变化时触发
  const handleSelectionChangeListData = (selection: any[]) => {
    selectedRows.value = selection;
  };

  // 工单编号批量搜索（Popover 直接写入数组）
  const handleBatchSearchCode = (val: string) => {
    codes.value = val;
  };
  const handleClearCode = () => {
    codes.value = '';
  };

  // 送货单号批量搜索
  const handleBatchSearchCodes = (val: string) => {
    deliveryBillCodes.value = val;
  };
  const handleClearCodes = () => {
    deliveryBillCodes.value = '';
  };

  // 调拨单号批量搜索
  const handleBatchSearchTransferOrderCodes = (val: string) => {
    transferOrderCodes.value = val;
  };
  const handleClearTransferOrderCodes = () => {
    transferOrderCodes.value = '';
  };

  // 重置时需要清空所有 BatchSearchPopover 数据及对应的输入值
  const handleResetSearch = () => {
    // 重置列表搜索条件
    resetSearch();
    // 清空三个批量搜索输入的 computed 值（会同步清空 search 中对应字段）
    codes.value = '';
    deliveryBillCodes.value = '';
    transferOrderCodes.value = '';
    // 调用 BatchSearchPopover 组件暴露的 clear 方法，清空弹窗内的多行文本
    batchSearchCodeRef.value?.clear?.();
    batchSearchDeliveryBillCodesRef.value?.clear?.();
    batchSearchTransferOrderCodesRef.value?.clear?.();
  };

  const loading = ref(false);
  const handleTabChange = () => {
    tableRef.value?.clearSelection();
  };
  const handleChildTabChange = () => {};
  const handleActions = ({ key, row }) => {
    if (key === 'cancel') {
      handleCancel(row);
    } else if (key === 'detail') {
      router.push({
        name: 'factoryDirectDeliveryDetail',
        query: {
          id: row.id,
        },
      });
    } else if (key === 'edit') {
      router.push({
        name: 'factoryDirectDeliveryEdit',
        query: {
          id: row.id,
        },
      });
    } else if (key === 'confirmLogisticsPickup') {
      handleConfirmLogisticsPickup(row);
    } else if (key === 'relateFactoryWorkOrder') {
      router.push({
        name: 'factoryDirectDeliveryDetail',
        query: {
          id: row.id,
          type: 'relate',
        },
      });
    }
  };
  const handleConfirmLogisticsPickup = async (row: any) => {
    if (loading.value) return;
    loading.value = true;
    try {
      await omsApi.omsDirectFactoryWorkOrderLogisticsPickup({
        id: row.id,
      });
      ElMessage.success('确认物流提货成功');
      runQuery();
    } catch (error) {
      console.error(`handleConfirmLogisticsPickup error:`, error);
    } finally {
      loading.value = false;
    }
  };
  const handleCancel = async (row: any) => {
    if (loading.value) return;
    loading.value = true;
    try {
      await ElMessageBox.confirm('确认作废该吗？作废后将无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      await omsApi.omsDirectFactoryWorkOrderAbandon({
        id: row.id,
      });
      ElMessage.success('作废成功');
      runQuery();
      getStatusMap();
    } catch (error) {
      // 用户点击取消或关闭对话框
      /** empty */
    } finally {
      loading.value = false;
    }
  };
  const handleClickAdd = () => {
    router.push({
      name: 'factoryDirectDeliveryAdd',
    });
  };
  const operateLoading = ref(false);
  const handleClickOpreate = async (type: string) => {
    // 验证是否选中了数据
    if (!selectedRows.value || selectedRows.value.length === 0) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const ids = selectedRows.value.map((row) => row.id);
    const typeObj = OPERATE_TYPE_MAP[type as keyof typeof OPERATE_TYPE_MAP];
    if (!typeObj) return;
    try {
      operateLoading.value = true;
      await omsApi.omsDirectFactoryWorkOrderBatchQualityInspectionReceipt({
        operationType: type,
        ids,
      });
      ElMessage.success(`${typeObj.label}成功`);
      runQuery();
      getStatusMap();
      tableRef.value?.clearSelection();
    } catch (error) {
      runQuery();
      getStatusMap();
      tableRef.value?.clearSelection();
      /** empty */
    } finally {
      operateLoading.value = false;
    }
  };
  // 导出提货单相关 computed
  const exportListInfoParams = computed(() => {
    if (!selectedRows.value || selectedRows.value.length === 0) {
      return { ids: [] };
    }
    return {
      ids: selectedRows.value.map((row) => row.id),
    };
  });
  const exportListInfoDisabled = computed(() => {
    return !selectedRows.value || selectedRows.value.length === 0;
  });

  // 导出采购订单相关 computed
  const exportListParams = computed(() => {
    const ids = selectedRows.value?.map((row) => row.id) || [];
    if (ids.length) {
      return {
        ids,
      };
    }
    return {
      code: search.code,
      createBy: search.createBy,
      pickupMethod: search.pickupMethod,
      status: search.status,
      deliveryDateStart: search.deliveryDateStart,
      deliveryDateEnd: search.deliveryDateEnd,
      supplierCode: search.supplierCode,
      warehouseCode: search.warehouseCode,
      logisticsPickup: search.logisticsPickup,
      pageSize: PAGE_SIZE,
      pageNum: current.value,
    };
  });
  const handleExportSuccess = (res: any) => {
    try {
      if (!res || typeof res !== 'string') {
        ElMessage.error('导出失败，未获取到文件地址');
        return;
      }
      const urlObj = new URL(res);
      const pathParts = urlObj.pathname.split('/');
      const fileName = decodeURIComponent(pathParts[pathParts.length - 1] || 'export.xlsx');
      download(res, fileName);
      ElMessage.success('导出成功');
    } catch (error) {
      /** empty */
      ElMessage.error('导出失败');
    }
  };
  onMounted(() => {
    getStatusMap();
  });
  onActivated(() => {
    getStatusMap();
    runQuery();
  });
</script>

<style></style>
