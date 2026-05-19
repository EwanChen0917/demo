<template>
  <el-dialog :model-value="visible" @close="handleCancel" width="75%" top="1vh">
    <template #header><h2>添加产品</h2></template>

    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-select
              v-model="warehouseCode"
              placeholder="请选择仓库"
              clearable
              style="width: 220px"
              filterable
            >
              <el-option
                v-for="warehouse of warehouseMap"
                :key="warehouse.warehouseCode"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseCode"
              />
            </el-select>
            <el-input
              v-model="searchInputValue"
              clearable
              placeholder="请输入"
              style="width: 420px"
            >
              <template #prepend>
                <el-select
                  v-model="searchType"
                  style="width: 120px"
                  @change="handleSearchTypeChange"
                >
                  <el-option
                    v-for="item in searchPrepend.stockSearchTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <template #suffix>
                <i class="iconfont icon-sousuo"></i>
              </template>
              <template #append>
                <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button class="button" type="primary" @click="requestList">查询</el-button>
            <el-button class="button" type="primary" @click="clear">清空</el-button>
          </el-space>
        </div>
      </div>

      <div class="card-body pt-0">
        <el-table
          ref="tableRef"
          max-height="400px"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData"
          :row-key="(row) => row.supplySku"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" fixed reserve-selection />
          <el-table-column
            prop="supplySku"
            label="供应链SKU"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column prop="skuDesc" label="产品名称" min-width="220" show-overflow-tooltip />
          <el-table-column prop="availableQuantity" label="可用良品" min-width="120" />
          <el-table-column prop="unsellableQuantity" label="可用次品" min-width="120" />
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- <div class="d-flex align-items-center justify-content-center mt-4">
          <el-button @click="nextRequest" :disabled="!pagination.hasNext" v-if="pagination.hasNext">
            下一页
          </el-button>
        </div> -->
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer-custom">
        <div>已选择{{ totalList?.length || 0 }}商品</div>
        <div>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </div>
      </div>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage, ElTable as ElTableType } from 'element-plus/es';
  import { cisApi } from '@/api';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';
  // import type { StockItem } from '@/api/oms/data-contracts';
  import { searchPrepend } from '@/views/stock/stockCenter/config';
  import { useOmsBase } from '@/views/supplyChainManage/efficiencyTools/bound/hooks/useOmsBase';
  import { debounce } from 'lodash-es';
  import usePagination from '@/hooks/list/usePagination';
  import { InventoryQueryListItem } from '@/api/cis/data-contracts';

  export interface StockItemWithId extends InventoryQueryListItem {
    id: any;
  }

  interface WarehouseItem {
    warehouseCode: string;
    warehouseName: string;
  }

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'confirm', rows: StockItemWithId[], warehouseCode?: string): void;
  }>();

  const visible = ref(false);
  const isDialogClosed = ref(true);
  const listLoading = ref(false);

  const { warehouseMap: rawWarehouseMap, getWarehouseMap } = useOmsBase();

  const warehouseCode = ref<string>('');
  const warehouseMap = computed<WarehouseItem[]>(() => {
    return (rawWarehouseMap.value || []) as WarehouseItem[];
  });

  const PAGE_SIZE = 10;
  const searchType = ref('skuCodeList');
  const search = reactive<{
    skuCodeList?: string[];
    supplySkuList?: string[];
    skuNameList?: string[];
  }>({
    skuCodeList: undefined,
    supplySkuList: undefined,
    skuNameList: undefined,
  });
  const batchSearchRef = ref<InstanceType<typeof BatchSearchPopover> | null>(null);
  const searchInputValue = computed({
    get: () => {
      const searchKey = searchType.value as keyof typeof search;
      const value = search[searchKey];
      if (Array.isArray(value)) {
        return value.filter(Boolean).join(',');
      }
      return '';
    },
    set: (val: string) => {
      const searchKey = searchType.value as keyof typeof search;
      const arrayValue = val
        ? val
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : undefined;

      searchPrepend.stockSearchTypes.forEach((item) => {
        if (item.value !== searchType.value) {
          search[item.value as keyof typeof search] = undefined;
        }
      });

      search[searchKey] = arrayValue as any;
    },
  });
  const listData = ref<StockItemWithId[]>([]);
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const pagination = ref({
    hasNext: false,
    nextCursor: '',
    pageSize: PAGE_SIZE,
  });
  const total = ref(0);
  const { current, pageSize, pageSizeOption, handlePageSizeChange, handleCurrentChange } =
    usePagination();
  // 跨页/跨搜索保留勾选
  const totalList = ref<StockItemWithId[]>();
  const isRestoringSelection = ref(false);
  const setSelectedRows = async () => {
    await nextTick();
    if (!tableRef.value || !listData.value || listData.value.length === 0) return;
    if (totalList.value && totalList.value.length > 0) {
      isRestoringSelection.value = true;
      tableRef.value.clearSelection();
      listData.value.forEach((item) => {
        const isSelected = totalList.value?.some(
          (selectedRow) => selectedRow.supplySku === item.supplySku
        );
        if (isSelected) {
          tableRef.value!.toggleRowSelection(item, true);
        }
      });
      isRestoringSelection.value = false;
    }
  };

  const open = async () => {
    isDialogClosed.value = false;
    visible.value = true;
    if (
      !rawWarehouseMap.value ||
      (Array.isArray(rawWarehouseMap.value) && rawWarehouseMap.value.length === 0)
    ) {
      await getWarehouseMap('ALL', {
        status: 1,
        centerWarehouse: 1,
      });
    }
    if (!totalList.value) totalList.value = [];
  };

  const close = () => {
    isDialogClosed.value = true;
    visible.value = false;
    // resetAll();
    tableRef.value?.clearSelection();
    batchSearchRef.value?.clear();
  };

  const clear = () => {
    searchInputValue.value = '';
    pagination.value.nextCursor = '';
    pagination.value.hasNext = false;
    listData.value = [];
    totalList.value = [];
    tableRef.value?.clearSelection();
    batchSearchRef.value?.clear();
  };
  const resetAll = () => {
    // 弹窗关闭/再次打开时，确保内部状态完全重置，避免残留上次搜索/勾选数据
    warehouseCode.value = '';
    // searchInputValue.value = '';
    listLoading.value = false;
    // pagination.value.nextCursor = '';
    // pagination.value.hasNext = false;
    listData.value = [];
    totalList.value = [];
    tableRef.value?.clearSelection();
    batchSearchRef.value?.clear();
    pagination.value.pageNum = 1;
    pagination.value.pageSize = PAGE_SIZE;
    total.value = 0;
    current.value = 1;
    pageSize.value = PAGE_SIZE;
  };

  // const nextRequest = async () => {
  //   if (!warehouseCode.value) {
  //     ElMessage.warning('请先选择仓库');
  //     return;
  //   }
  //   try {
  //     listLoading.value = true;
  //     const res = (await omsApi.omsCommonStockQueryStocks({
  //       keyword: searchInputValue.value,
  //       warehouseCode: warehouseCode.value,
  //       pageSize: PAGE_SIZE,
  //       nextCursor: pagination.value.nextCursor,
  //     })) as any;
  //     pagination.value.nextCursor = res.nextCursor;
  //     pagination.value.hasNext = res.hasNext;
  //     if (res.items && res.items.length) {
  //       listData.value.push(...res.items);
  //     }
  //     setSelectedRows();
  //   } catch (e) {
  //     ElMessage.error('查询失败');
  //   } finally {
  //     listLoading.value = false;
  //   }
  // };

  const requestList = async () => {
    if (!warehouseCode.value) {
      ElMessage.warning('请先选择仓库');
      return;
    }
    if (listLoading.value) return;
    try {
      listLoading.value = true;
      // const res = (await omsApi.omsCommonStockQueryStocks({
      //   keyword: keyword.value,
      //   warehouseCode: warehouseCode.value,
      //   pageSize: PAGE_SIZE,
      // })) as any;
      // pagination.value.nextCursor = res.nextCursor;
      // pagination.value.hasNext = res.hasNext;
      // listData.value = res.items || [];
      const res = await cisApi.cisInventoryQueryList({
        pageSize: pageSize.value,
        pageNum: current.value,
        skuCodeList: search.skuCodeList,
        supplySkuList: search.supplySkuList,
        skuNameList: search.skuNameList,
        warehouseCodeList: warehouseCode.value ? [warehouseCode.value] : undefined,
      });
      listData.value = (res.list || []).map((item) => ({
        ...item,
        id: item.supplySku || item.skuCode || '',
      }));
      total.value = res.total || 0;
      setSelectedRows();
    } catch (e) {
      ElMessage.error('查询失败');
    } finally {
      listLoading.value = false;
    }
  };

  // watch(
  //   keyword,
  //   debounce((newVal) => {
  //     if (!newVal) return;
  //     requestList();
  //   }, 300)
  // );
  watch(
    current,
    debounce((newVal) => {
      if (isDialogClosed.value) return;
      if (!newVal) return;
      requestList();
    }, 300)
  );
  watch(
    pageSize,
    debounce((newVal) => {
      if (isDialogClosed.value) return;
      if (!newVal) return;
      requestList();
    }, 300)
  );
  function handleSearchTypeChange() {
    searchPrepend.stockSearchTypes.forEach((item) => {
      search[item.value as keyof typeof search] = undefined;
    });
  }

  const handleBatchSearch = (val: string) => {
    if (!val) {
      searchInputValue.value = '';
      return;
    }
    searchInputValue.value = val.replace(/\n/g, ',');
  };
  watch(
    () => listData.value,
    () => {
      if (isDialogClosed.value) return;
      setSelectedRows();
    },
    { immediate: true }
  );

  const handleSelectionChange = (list: StockItemWithId[]) => {
    if (isRestoringSelection.value) return;
    const currentDataSupplySkus = new Set(
      listData.value.map((item) => item.supplySku).filter(Boolean)
    );
    const preservedItems = (totalList.value || []).filter(
      (item) => item.supplySku && !currentDataSupplySkus.has(item.supplySku)
    );
    const combined = [...preservedItems, ...list];
    const uniqueMap = new Map<string, StockItemWithId>();
    combined.forEach((item) => {
      if (item.supplySku) {
        uniqueMap.set(item.supplySku, item);
      }
    });
    totalList.value = Array.from(uniqueMap.values());
  };

  const handleSave = () => {
    if (!warehouseCode.value) {
      ElMessage.warning('请先选择仓库');
      return;
    }
    if (totalList.value && totalList.value.length) {
      emit('confirm', totalList.value, warehouseCode.value);
    } else {
      ElMessage.warning('未选择商品');
      return;
    }
    close();
  };
  const handleCancel = () => {
    close();
    emit('close');
  };

  defineExpose({
    open,
    close,
    clear,
    resetAll,
  });
</script>

<style scoped lang="scss">
  .dialog-footer-custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
