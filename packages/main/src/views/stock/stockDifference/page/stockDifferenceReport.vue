<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input
        v-model="search.supplySku"
        clearable
        placeholder="供应链SKU"
        style="width: 350px"
        maxlength="50"
      />
    </template>

    <template #filters>
      <el-input
        v-model="search.productName"
        clearable
        placeholder="产品名称"
        style="width: 280px"
        maxlength="50"
      />
    </template>

    <template #buttons>
      <!-- <el-button type="primary" :loading="generateLoading" @click="handleGenerateDiff">
        生成差异
      </el-button> -->
      <el-button type="primary" :loading="asyncLoading" @click="openSync">
        {{ syncButtonText }}
      </el-button>
      <!-- <el-button @click="handleExport">导出</el-button> -->
    </template>

    <stockTable
      :data="listData?.recordList ?? []"
      :columns="reportColumns"
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
</template>

<script setup lang="ts" name="stockDifferenceReport">
  import { ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import { CisApi, cisApi } from '@/api';
  import stockTable from '../../components/stockTable.vue';
  import type { stockCloumns } from '../../components/stockTable.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';

  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '生成差异',
    confirmButtonText: '生成差异',
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
  const generateLoading = ref(false);

  const reportColumns: stockCloumns[] = [
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
      fixed: 'left',
      showOverflowTooltip: true,
    },
    { prop: 'fluxGoodStock', label: '富勒良品库存', minWidth: 120, align: 'center' },
    { prop: 'erpGoodStock', label: 'ERP良品库存', minWidth: 120, align: 'center' },
    { prop: 'goodStockDiff', label: '良品库存差异', minWidth: 120, align: 'center' },
    { prop: 'fluxReservedStock', label: '富勒预占', minWidth: 110, align: 'center' },
    { prop: 'erpReservedStock', label: 'ERP预占', minWidth: 110, align: 'center' },
    { prop: 'reservedStockDiff', label: '预占差异', minWidth: 110, align: 'center' },
    { prop: 'fluxAvailableStock', label: '富勒可用', minWidth: 110, align: 'center' },
    { prop: 'erpAvailableStock', label: 'ERP可用', minWidth: 110, align: 'center' },
    { prop: 'availableStockDiff', label: '可用差异', minWidth: 110, align: 'center' },
    { prop: 'fluxDefectiveStock', label: '富勒次品', minWidth: 110, align: 'center' },
    { prop: 'erpDefectiveStock', label: 'ERP次品', minWidth: 110, align: 'center' },
    { prop: 'defectiveStockDiff', label: '次品差异', minWidth: 110, align: 'center' },
    { prop: 'fluxPhysicalStock', label: '富勒实物', minWidth: 110, align: 'center' },
    { prop: 'erpPhysicalStock', label: 'ERP实物', minWidth: 110, align: 'center' },
    { prop: 'physicalStockDiff', label: '实物差异', minWidth: 110, align: 'center' },
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
    runQuery,
  } = useList<
    CisApi.CisInventorySnapQueryDiffErpFluxList.RequestBody & { pageSize: number; pageNum: number },
    CisApi.CisInventorySnapQueryDiffErpFluxList.ResponseBody
  >({
    searchDefaults: {
      supplySku: undefined,
      productName: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventorySnapQueryDiffErpFluxList,
  });

  const handleGenerateDiff = async () => {
    generateLoading.value = true;
    try {
      await new Promise((r) => {
        setTimeout(r, 300);
      });
      runQuery(true);
    } finally {
      generateLoading.value = false;
    }
  };

  const handleExport = () => {
    // TODO: 导出接口待对接
  };
</script>
