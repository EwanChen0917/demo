<template>
  <el-dialog
    v-if="shouldRender"
    v-model="visible"
    title="库存差异处理日志"
    width="1400px"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
    destroy-on-close
  >
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
              selectedSearchType == 'supplySkuList' ||
              selectedSearchType == 'skuCodeList' ||
              selectedSearchType == 'thirdSkuList' ||
              selectedSearchType == 'flowNo'
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
        <el-select v-model="search.statusList" placeholder="请选择处理状态" clearable multiple>
          <el-option label="成功" value="processed" />
          <el-option label="失败" value="failed" />
        </el-select>
        <!-- <el-input
          :style="{ width: '400px' }"
          v-model="warehouseGetter"
          placeholder="请输入"
          clearable
        >
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <BatchSearchPopover
              ref="warehouseBatchSearchRef"
              @search="handleWarehouseBatchSearch"
              @clear="handleWarehouseBatchClear"
            />
          </template>
        </el-input> -->
        <el-input
          style="width: 300px"
          v-model="search.thirdSpwName"
          clearable
          maxlength="100"
          placeholder="请输入三方仓库名"
        ></el-input>
        <!-- <el-select v-model="search.warehouseCodeList" placeholder="请选择仓库" clearable multiple>
          <el-option label="仓库1" value="1" />
          <el-option label="仓库2" value="2" />
        </el-select> -->
        <div class="time-range-picker-wrapper">
          <el-select
            v-model="selectedTimeType"
            style="width: 120px"
            placeholder="时间类型"
            @change="handleTimeTypeChange"
            :options="timeSelectedMap"
          />
          <el-date-picker
            v-model="timeRangeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD"
            clearable
            style="width: 240px"
            @change="handleTimeRangeChange"
          />
        </div>
      </template>
      <el-table
        :data="listData?.recordList"
        v-loading="listLoading"
        min-height="400"
        max-height="400"
      >
        <el-table-column prop="flowNo" label="日志流水编码" min-width="200" fixed="left" />
        <el-table-column label="供应链SKU/产品名称" min-width="200">
          <template #default="{ row }">
            <div>{{ row.supplySku || '-' }} / {{ row.productTitle || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="skuCode" label="产品SKU" min-width="200" />
        <el-table-column label="三方仓库名称" min-width="200">
          <template #default="{ row }">
            <span>{{ row.spwName || '-' }} - {{ row.spwCode || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="thirdProductTitle" label="三方仓SKU/三方仓产品名称" min-width="300">
          <template #default="{ row }">
            <div>{{ row.thirdSku || '-' }} / {{ row.thirdProductTitle || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="availableQuantity" label="ERP可用库存数量" min-width="200" />
        <el-table-column prop="thirdAvailableQuantity" label="三方仓可用库存数量" min-width="200" />
        <el-table-column label="差异数量" min-width="200">
          <template #default="{ row }">
            <div>{{ row.thirdAvailableQuantity - row.availableQuantity }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="处理状态" min-width="200" />
        <el-table-column label="日志信息" min-width="200">
          <template #default="{ row }">
            <overflow-tooltip :content="row.errorMessage || '处理成功'"></overflow-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="stockFlowNo" label="库存流水编码" min-width="200" />
        <el-table-column prop="checkTime" label="对账时间" min-width="230" />
        <el-table-column prop="updateTime" label="更新时间" min-width="230" />
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
    <template #footer v-if="showFooter">
      <slot name="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { nextTick } from 'vue';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api/index';
  interface Props {
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    showFooter?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: '提示',
    width: '500px',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showFooter: false,
  });

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'confirm'): void;
  }>();

  const shouldRender = ref(false);
  const visible = ref(false);

  const handleClose = () => {
    visible.value = false;
    nextTick(() => {
      shouldRender.value = false;
    });
    resetSearch();
    emit('close');
  };

  const handleConfirm = () => {
    emit('confirm');
  };

  const open = (type: 'processed' | 'failed') => {

    runQuery();
    shouldRender.value = true;
    nextTick(() => {
      visible.value = true;
    });
  };

  const close = () => {
    resetSearch();
    handleClose();
  };

  /**
   * 列表逻辑区
   */
  const PAGE_SIZE = 10;
  const selectedSearchType = ref('supplySkuList');
  const selectedTimeType = ref<'checkTime' | 'updateTime'>('checkTime');
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
      label: '日志流水编码',
      value: 'flowNo',
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
  const timeSelectedMap = [
    {
      label: '对账时间',
      value: 'checkTime',
    },
    {
      label: '更新时间',
      value: 'updateTime',
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
        return;
      }
      if (currentType === 'productTitle' || currentType === 'thirdProductTitle') {
        search[currentType] = newValue;
        return;
      }
      const arrayValue = newValue
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      search[currentType] = arrayValue.length > 0 ? arrayValue : undefined;
    },
  });
  //   const warehouseGetter = computed({
  //     get() {
  //       const value = search.warehouseCodeList;
  //       if (!value) return '';
  //       if (Array.isArray(value)) return value.join(',');
  //       return value;
  //     },
  //     set(newValue: string) {
  //       //   search.warehouseCodeList = newValue;
  //       if (!newValue) {
  //         search.warehouseCodeList = undefined;
  //       }
  //       const arrayValue = newValue
  //         .split(',')
  //         .map((item) => item.trim())
  //         .filter((item) => item.length > 0);
  //       search.warehouseCodeList = arrayValue.length > 0 ? arrayValue : undefined;
  //     },
  //   });
  //   const handleWarehouseBatchSearch = (value: string) => {
  //     if (!value) {
  //       warehouseGetter.value = '';
  //       return;
  //     }
  //     // 处理换行符：分割、去空白、过滤空值、转字符串
  //     const processedValue = value
  //       .split(/\r?\n/) // 兼容 \n 和 \r\n
  //       .map((x) => x.trim())
  //       .filter((x) => x.length > 0)
  //       .join(','); // 转成逗号分隔的字符串
  //     warehouseGetter.value = processedValue;
  //   };
  //   const handleWarehouseBatchClear = () => {
  //     warehouseGetter.value = '';
  //   };
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
    CisApi.CisTpwStorageQueryAdjustFlow.RequestBody,
    CisApi.CisTpwStorageQueryAdjustFlow.ResponseBody
  >({
    searchDefaults: {
      supplySkuList: undefined,
      skuCodeList: undefined,
      thirdSkuList: undefined,
      flowNo: undefined,
      statusList: ['processed'],
      productTitle: undefined,
      thirdProductTitle: undefined,
      checkTimeEnd: undefined,
      checkTimeStart: undefined,
      updateTimeEnd: undefined,
      updateTimeStart: undefined,
      thirdSpwName: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisTpwStorageQueryAdjustFlow,
  });
  /**
   * 文本搜索框区域
   */
  const handleSearchTypeChange = () => {
    search.supplySkuList = undefined;
    search.skuCodeList = undefined;
    search.thirdSkuList = undefined;
    search.flowNo = undefined;
    search.productTitle = undefined;
    search.thirdProductTitle = undefined;
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
    selectedTimeType.value = 'checkTime';
  };

  const timeRangeValue = computed({
    get() {
      const timeType = selectedTimeType.value;
      if (timeType === 'checkTime') {
        const start = search.checkTimeStart;
        const end = search.checkTimeEnd;
        if (start && end) {
          return [start, end] as [string, string];
        }
        return null;
      } else if (timeType === 'updateTime') {
        const start = search.updateTimeStart;
        const end = search.updateTimeEnd;
        if (start && end) {
          return [start, end] as [string, string];
        }
        return null;
      }
      return null;
    },
    set(value: [string, string] | null) {
      const timeType = selectedTimeType.value;
      if (value && Array.isArray(value) && value.length === 2 && value[0] && value[1]) {
        // 处理开始日期：确保时间为 00:00:00
        let startTime = value[0];
        if (!startTime.includes(' ')) {
          startTime = `${startTime} 00:00:00`;
        } else {
          const [datePart] = startTime.split(' ');
          startTime = `${datePart} 00:00:00`;
        }
        
        // 处理结束日期：将时间设置为 23:59:59
        let endTime = value[1];
        if (!endTime.includes(' ')) {
          endTime = `${endTime} 23:59:59`;
        } else {
          const [datePart] = endTime.split(' ');
          endTime = `${datePart} 23:59:59`;
        }
        
        if (timeType === 'checkTime') {
          search.checkTimeStart = startTime;
          search.checkTimeEnd = endTime;
        } else if (timeType === 'updateTime') {
          search.updateTimeStart = startTime;
          search.updateTimeEnd = endTime;
        }
      } else {
        if (timeType === 'checkTime') {
          search.checkTimeStart = undefined;
          search.checkTimeEnd = undefined;
        } else if (timeType === 'updateTime') {
          search.updateTimeStart = undefined;
          search.updateTimeEnd = undefined;
        }
      }
    },
  });

  const handleTimeTypeChange = () => {
    const currentTimeType = selectedTimeType.value;
    const otherTimeType = currentTimeType === 'checkTime' ? 'updateTime' : 'checkTime';

    const getCurrentValue = () => {
      if (currentTimeType === 'checkTime') {
        const start = search.checkTimeStart;
        const end = search.checkTimeEnd;
        return start && end ? [start, end] : null;
      } else {
        const start = search.updateTimeStart;
        const end = search.updateTimeEnd;
        return start && end ? [start, end] : null;
      }
    };

    const getOtherValue = () => {
      if (otherTimeType === 'checkTime') {
        const start = search.checkTimeStart;
        const end = search.checkTimeEnd;
        return start && end ? [start, end] : null;
      } else {
        const start = search.updateTimeStart;
        const end = search.updateTimeEnd;
        return start && end ? [start, end] : null;
      }
    };

    const clearOtherValue = () => {
      if (otherTimeType === 'checkTime') {
        search.checkTimeStart = undefined;
        search.checkTimeEnd = undefined;
      } else {
        search.updateTimeStart = undefined;
        search.updateTimeEnd = undefined;
      }
    };

    const otherValue = getOtherValue();
    const currentValue = getCurrentValue();

    if (otherValue) {
      timeRangeValue.value = otherValue as [string, string];
      clearOtherValue();
    } else if (!currentValue) {
      timeRangeValue.value = null;
    }
  };

  const handleTimeRangeChange = (value: [string, string] | null) => {
    timeRangeValue.value = value;
  };
  const batchSearchRef = ref();
  const resetAll = () => {
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
    handleReset();
  };
  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss">
  .time-range-picker-wrapper {
    display: flex;
    align-items: center;
    gap: 0;

    :deep(.el-select) {
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }
    }

    :deep(.el-date-editor) {
      .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
</style>
