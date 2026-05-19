<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input
        v-model="search.supplySku"
        clearable
        placeholder="供应链SKU"
        style="width: 350px"
        maxlength="100"
      />
    </template>

    <template #filters>
      <el-input
        v-model="search.productName"
        clearable
        placeholder="产品名称"
        style="width: 280px"
        maxlength="200"
      />
      <el-select
        v-model="search.warehouseCode"
        clearable
        filterable
        placeholder="仓库"
        style="width: 280px"
        maxlength="200"
        :options="stockOptions"
      />
    </template>

    <template #buttons>
      <!-- <el-button type="primary" :loading="generateLoading" @click="handleGenerateDiff">
        生成差异
      </el-button> -->
      <el-button type="primary" :loading="asyncLoading" @click="openSync">
        {{ syncButtonText }}
      </el-button>
      <!-- <el-button @click="handleDiffProcess">差异处理</el-button>
      <el-button @click="handleOperationLog">操作日志</el-button> -->
    </template>

    <stockTable
      :data="listData?.recordList ?? []"
      :columns="handleColumns"
      :loading="listLoading"
      :show-index="true"
    />

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>

  <HandleLogDialog ref="handleLogDialogRef" />
</template>

<script setup lang="ts" name="stockDifferenceHandle">
  import { ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import { CisApi, cisApi } from '@/api';
  import stockTable from '../../components/stockTable.vue';
  import type { stockCloumns } from '../../components/stockTable.vue';
  import HandleLogDialog from '../components/handleLogDialog.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  import { useStockOptions } from '../hooks/useStockOptions';

  const { stockOptions, getStockOptions } = useStockOptions();
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '生成差异',
    confirmButtonText: '重新比对',
    confirmTitle: '确认',
    confirmText: '确认要生成差异吗',
    successMessage: '生成差异完成',
    loadingMessage: '生成差异中',
    errorMessage: '生成差异失败',
    services: cisApi.cisInventorySnapReGenerate,
    onSuccess: () => {
      refreshList();
    },
  });
  const PAGE_SIZE = 10;
  // const generateLoading = ref(false);
  // const handleLogDialogRef = ref<InstanceType<typeof HandleLogDialog>>();

  type HandleListReq = CisApi.CisInventorySnapQueryDiffErpJijiaList.RequestBody & {
    warehouseName?: string;
  };

  const handleColumns: stockCloumns[] = [
    {
      prop: 'supplySku',
      label: '供应链SKU',
      minWidth: 140,
      fixed: 'left',
      align: 'center',
      showOverflowTooltip: true,
    },
    {
      prop: 'productName',
      label: '产品名称',
      minWidth: 200,
      align: 'center',
      showOverflowTooltip: true,
      fixed: 'left',
    },
    {
      prop: 'warehouseName',
      label: '仓库名称',
      minWidth: 200,
      align: 'center',
      fixed: 'left',
      showOverflowTooltip: true,
    },
    { prop: 'erpGoodStock', label: 'ERP良品库存', minWidth: 120, align: 'center' },
    { prop: 'jijiaGoodStock', label: '积加良品库存', minWidth: 120, align: 'center' },
    { prop: 'goodStockDiff', label: '良品差异', minWidth: 110, align: 'center' },
    { prop: 'erpReservedStock', label: 'ERP预占数量', minWidth: 120, align: 'center' },
    { prop: 'jijiaReservedStock', label: '积加预占数量', minWidth: 120, align: 'center' },
    { prop: 'reservedStockDiff', label: '预占差异', minWidth: 110, align: 'center' },
    { prop: 'erpAvailableStock', label: 'ERP可用', minWidth: 110, align: 'center' },
    { prop: 'jijiaAvailableStock', label: '积加可用', minWidth: 110, align: 'center' },
    { prop: 'availableStockDiff', label: '可用差异', minWidth: 110, align: 'center' },
    { prop: 'erpDefectiveStock', label: 'ERP不良', minWidth: 110, align: 'center' },
    { prop: 'jijiaDefectiveStock', label: '积加不良', minWidth: 110, align: 'center' },
    { prop: 'defectiveStockDiff', label: '不良差异', minWidth: 110, align: 'center' },
    { prop: 'erpPhysicalStock', label: 'ERP实物', minWidth: 110, align: 'center' },
    { prop: 'jijiaPhysicalStock', label: '积加实物', minWidth: 110, align: 'center' },
    { prop: 'physicalStockDiff', label: '实物差异', minWidth: 110, align: 'center' },
    { prop: 'snapDate', label: '生成日期', minWidth: 120, align: 'center' },
    { prop: 'snapTime', label: '生成时间', minWidth: 120, align: 'center' },
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
    resetSearch,
    refreshList,
    // runQuery,
  } = useList<
    HandleListReq & { pageSize: number; pageNum: number },
    CisApi.CisInventorySnapQueryDiffErpJijiaList.ResponseBody
  >({
    searchDefaults: {
      supplySku: undefined,
      productName: undefined,
      warehouseCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: (req) => cisApi.cisInventorySnapQueryDiffErpJijiaList(req),
  });

  // const handleGenerateDiff = async () => {
  //   generateLoading.value = true;
  //   try {
  //     await new Promise((r) => {
  //       setTimeout(r, 300);
  //     });
  //     runQuery(true);
  //   } finally {
  //     generateLoading.value = false;
  //   }
  // };

  // const handleDiffProcess = () => {
  //   // TODO: 差异处理待对接
  // };

  // const handleOperationLog = () => {
  //   handleLogDialogRef.value?.open();
  // };
  onMounted(() => {
    getStockOptions();
  });
</script>
