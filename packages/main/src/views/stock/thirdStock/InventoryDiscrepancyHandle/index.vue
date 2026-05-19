<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input :style="{ width: '400px' }" v-model="searchValue" placeholder="请输入" clearable>
        <template #prepend>
          <el-select
            v-model="selectedSearchType"
            style="width: 136px"
            :options="searchTypeMap"
            @change="handleSearchTypeChange"
          ></el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template
          #append
          v-if="
            !(selectedSearchType == 'thirdProductTitle' || selectedSearchType == 'productTitle')
          "
        >
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        v-model="search.thirdSpwName"
        clearable
        :maxlength="100"
        style="width: 300px"
        placeholder="请输入三方仓库名"
      />
      <el-select
        v-model="search.warehouseCodeList"
        :style="{ width: '300px', marginLeft: '10px' }"
        placeholder="请选择路特仓库"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :options="warehouseOptions"
      >
      </el-select>
      <!-- <warehouse-select
        :multiple="true"
        v-model="search.warehouseCodeList"
        :style="{ width: '300px', marginLeft: '10px' }"
        placeholder="请选择路特仓库"
        clearable
      /> -->
    </template>
    <template #buttons>
      <el-button type="primary" @click="openSync" :disabled="asyncLoading">
        <el-icon v-if="asyncLoading">
          <Loading />
        </el-icon>
        {{ syncButtonText }}
      </el-button>
      <el-button type="primary" @click="openSyncHandle" :disabled="asyncLoadingHandle">
        <el-icon v-if="asyncLoadingHandle">
          <Loading />
        </el-icon>
        {{ syncButtonTextHandle }}
      </el-button>
      <el-button type="primary" @click="openLogDialog">查看日志</el-button>
    </template>
    <el-table :data="listData?.recordList" v-loading="listLoading">
      <el-table-column label="供应链SKU/产品名称" min-width="200">
        <template #default="{ row }">
          <div>{{ row.supplySku || '-' }} / {{ row.productTitle || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" label="产品SKU" min-width="200" />
      <el-table-column prop="productStatus" label="产品状态" min-width="200" />
      <el-table-column prop="warehouseName" label="路特仓库名" min-width="200"></el-table-column>
      <el-table-column label="三方仓仓库名称" min-width="200">
        <template #default="{ row }">
          <span>{{ row.spwName || '-' }} - {{ row.spwCode || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="thirdProductTitle" label="三方仓SKU/三方仓产品名称" min-width="300">
        <template #default="{ row }">
          <div>{{ row.thirdSku || '-' }} / {{ row.thirdProductTitle || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="thirdProductStatus" label="三方仓产品状态" min-width="200" />
      <el-table-column prop="checkTime" label="对账时间" min-width="200" />
      <el-table-column label="在途量" min-width="250">
        <template #default="{ row }">
          <DiscrepancyInner :erpCount="row.onWayQuantity" :thirdCount="row.thirdOnWayQuantity" />
        </template>
      </el-table-column>
      <el-table-column label="良品量" min-width="250">
        <template #default="{ row }">
          <DiscrepancyInner
            :erpCount="row.availableQuantity"
            :thirdCount="row.thirdAvailableQuantity"
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
  <LogDialog ref="logDialog" />
</template>

<script lang="ts" setup name="inventoryDiscrepancyHandle">
  import { cisApi, CisApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessageBox } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useSyncButton } from '../hooks/useSyncButton';
  import DiscrepancyInner from '../components/discrepancyInner.vue';
  import LogDialog from '../components/logDialog.vue';
  
  const router = useRouter();
  const PAGE_SIZE = 10;
  import { useBaseThirdStockOptions } from '../hooks/useBaseOptions';
  const { warehouseOptions, getWarehouseOptions } = useBaseThirdStockOptions();

  const selectedSearchType = ref('supplySkuList');
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新库存差异',
    confirmButtonText: '更新库存差异',
    confirmTitle: '确认',
    confirmText: '确认要更新库存差异吗',
    successMessage: '库存差异更新完成',
    loadingMessage: '库存差异更新中',
    errorMessage: '库存差异更新失败',
    services: cisApi.cisTpwStorageRefreshVariance,
  });
  const {
    asyncLoading: asyncLoadingHandle,
    syncButtonText: syncButtonTextHandle,
    openSync: openSyncHandle,
  } = useSyncButton({
    loadingButtonText: '库存差异处理',
    confirmButtonText: '库存差异处理',
    confirmTitle: '确认',
    confirmText: '确认要处理库存差异吗',
    successMessage: '库存差异处理完成',
    loadingMessage: '库存差异处理中',
    errorMessage: '库存差异处理失败',
    services: cisApi.cisTpwStorageProcessVariance,
    onSuccess: (result: any) => {
      if (result && typeof result === 'object') {
        const { success = 0, failed = 0 } = result;
        ElMessageBox({
          title: '库存差异处理结果',
          message: `<div style="text-align: center; padding: 20px 0;">
          <p style="font-size: 16px; margin-bottom: 12px;">差异处理成功 <span style="color: #67c23a; font-weight: bold;">${success}</span> 条，失败 <span style="color: #f56c6c; font-weight: bold;">${failed}</span> 条</p>
        </div>`,
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '关闭',
        })
          .then(() => {
            // 点击确认按钮后的操作
            openLogDialog();
          })
          .catch(() => {
            // 点击关闭按钮或取消的操作（可选）
          });
      }
    },
  });
  const searchTypeMap = [
    {
      label: '供应链SKU',
      value: 'supplySkuList',
    },
    {
      label: '产品SKU',
      value: 'skuCodeList',
    },
    {
      label: '三方仓SKU',
      value: 'thirdSkuList',
    },
    {
      label: '产品名称',
      value: 'productTitle',
    },
    {
      label: '三方仓产品名称',
      value: 'thirdProductTitle',
    },
  ];
  const searchValue = computed({
    get() {
      const value = search[selectedSearchType.value];
      const currentType = selectedSearchType.value;
      if (currentType === 'productTitle' || currentType === 'thirdProductTitle') {
        return typeof value === 'string' ? value : '';
      }
      if (Array.isArray(value)) {
        return value.join(',');
      }
      if (typeof value === 'string') {
        return value;
      }
      return '';
    },
    set(newValue: string) {
      const currentType = selectedSearchType.value;
      if (!newValue) {
        search[currentType] = undefined;
      }
      if (currentType === 'productTitle' || currentType === 'thirdProductTitle') {
        search[currentType] = newValue;
        return;
      }
      const arrayValue = newValue
        .split('.')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      search[currentType] = arrayValue.length > 0 ? arrayValue : undefined;
    },
  });
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
    CisApi.CisTpwStorageQueryVarianceList.RequestBody,
    CisApi.CisTpwStorageQueryVarianceList.ResponseBody
  >({
    searchDefaults: {
      productTitle: undefined,
      queryParam: undefined,
      skuCodeList: undefined,
      supplySkuList: undefined,
      thirdProductTitle: undefined,
      thirdSkuList: undefined,
      thirdSpwName: undefined,
      warehouseCodeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisTpwStorageQueryVarianceList,
  });
  /**
   * 文本搜索框区域
   */
  const handleSearchTypeChange = () => {
    search.productTitle = undefined;
    search.thirdProductTitle = undefined;
    search.skuCodeList = undefined;
    search.supplySkuList = undefined;
    search.thirdSkuList = undefined;
  };

  const handleBatchSearch = (value: string) => {
    if (!value) {
      searchValue.value = '';
      return;
    }
    // 处理换行符：分割、去空白、过滤空值、转字符串
    const processedValue = value
      .split(/\r?\n/) // 兼容 \n 和 \r\n
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .join(','); // 转成逗号分隔的字符串

    searchValue.value = processedValue;
  };
  const handleBatchClear = () => {
    handleSearchTypeChange();
  };
  const handleReset = () => {
    resetSearch();
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
    } else if (key === 'cancel') {
    }
  };
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确认导出列表吗？');
    if (!isConfirmed) return;
    const res = await cisApi.cisTpwStorageExportList({
      pageNum: current.value,
      pageSize: pageSize.value,
      ...search,
    });
    const isConfirmedSwitch = await swal.confirm({
      title: '导出成功，具体请前往下载中心查看',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
    });
    if (isConfirmedSwitch) {
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    }
  };
  const logDialog = ref();
  const openLogDialog = () => {
    logDialog.value.open();
  };
  const batchSearchRef = ref();
  const resetAll = () => {
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
    resetSearch();
  };

  onMounted(() => {
    getWarehouseOptions();
  });
  onActivated(() => {
    refreshList();
  });
</script>

<style scoped lang="scss"></style>
