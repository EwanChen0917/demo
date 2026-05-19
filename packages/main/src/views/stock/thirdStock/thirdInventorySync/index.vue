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
      <!-- <warehouse-select
        :multiple="true"
        v-model="search.warehouseCodeList"
        :style="{ width: '300px', marginLeft: '10px' }"
        placeholder="请选择路特仓库"
        clearable /> -->
      <el-select
        v-model="search.warehouseCodeList"
        filterable
        :style="{ width: '320px', marginLeft: '10px' }"
        placeholder="请选择路特仓库"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :options="warehouseOptions"
      ></el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="openSync" :disabled="asyncLoading">
        <el-icon v-if="asyncLoading"><Loading /></el-icon>
        {{ syncButtonText }}
      </el-button>
      <el-button type="primary" @click="handleExport">导出</el-button>
    </template>
    <el-table
      :data="listData?.recordList"
      v-loading="listLoading"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column label="供应链SKU/产品名称" min-width="200">
        <template #default="{ row }">
          <div>{{ row.supplySku || '-' }} / {{ row.productTitle || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" label="产品SKU" min-width="200" />
      <el-table-column prop="productStatus" label="产品状态" min-width="200" />
      <el-table-column prop="warehouseName" label="路特仓库名" min-width="200"></el-table-column>
      <el-table-column prop="checkTime" label="三方仓库名" min-width="200">
        <template #default="{ row }">
          <span>{{ row.spwName || '-' }} - {{ row.spwCode || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="thirdProductTitle" label="三方仓SKU/三方仓产品名称" min-width="300">
        <template #default="{ row }">
          <div>{{ row.thirdSku || '-' }} / {{ row.thirdProductTitle || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="thirdProductState" label="三方仓产品状态" min-width="200" />

      <el-table-column prop="onWayQuantity" label="在途量" min-width="130" />
      <el-table-column prop="preAllocateQuantity" label="预占量" min-width="100" />
      <el-table-column prop="availableQuantity" label="可用量" min-width="100" />
      <el-table-column prop="unsellableQuantity" label="次品量" min-width="100" />
      <el-table-column prop="inStockQuantity" label="在库量" min-width="100" />
      <el-table-column prop="updateTime" label="更新时间" min-width="160" />
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
</template>

<script lang="ts" setup name="thirdInventorySync">
  import { cisApi, CisApi, erpApi, memberApi, omsApi, OmsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import { useSyncButton } from '../hooks/useSyncButton';
  const createTime = ref([]);
  const outTime = ref([]);
  const router = useRouter();
  const route = useRoute();
  const PAGE_SIZE = 10;
  import { useBaseThirdStockOptions } from '../hooks/useBaseOptions';
  const { warehouseOptions, getWarehouseOptions } = useBaseThirdStockOptions();
  const selectedSearchType = ref('supplySkuList');
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新SKU和库存',
    confirmButtonText: '更新SKU和库存',
    confirmTitle: '确认',
    confirmText: '确认要更新三方仓库存吗',
    successMessage: '三方仓库存更新完成',
    loadingMessage: '三方仓库存更新中',
    errorMessage: '三方仓库存更新失败',
    services: cisApi.cisTpwStorageManualSync,
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
      value: 'thirdSkuSku',
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
      console.log(`new ser result`, arrayValue);
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
    CisApi.CisTpwStorageQueryList.RequestBody,
    CisApi.CisTpwStorageQueryList.ResponseBody
  >({
    searchDefaults: {
      warehouseCodeList: undefined,
      productTitle: undefined,
      queryParam: undefined,
      skuCodeList: undefined,
      supplySkuList: undefined,
      thirdProductTitle: undefined,
      thirdSpwName: undefined,

      thirdSkuSku: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisTpwStorageQueryList,
  });
  /**
   * 文本搜索框区域
   */
  const handleSearchTypeChange = () => {
    search.productTitle = undefined;
    search.thirdProductTitle = undefined;
    search.skuCodeList = undefined;
    search.supplySkuList = undefined;
    search.thirdSkuSku = undefined;
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

  const getSummaries = (param: { columns: any[]; data: any[] }) => {
    const { columns, data } = param;
    const sums: string[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const property = column.property;
      if (
        [
          'inStockQuantity',
          'preAllocateQuantity',
          'availableQuantity',
          'unsellableQuantity',
          'onWayQuantity',
        ].includes(property)
      ) {
        const values = data.map((item) => Number(item[property]) || 0);
        const sum = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + value;
          }
          return prev;
        }, 0);
        sums[index] = sum.toString();
      } else {
        sums[index] = '';
      }
    });
    return sums;
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
