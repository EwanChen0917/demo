<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="65%"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-input
            v-model="search.keyword"
            placeholder="产品SKU/供应链SKU/产品名称"
            clearable
            style="width: 300px"
            @input="handleInputChange"
            @keyup.enter="runQuery"
          >
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button type="primary" @click="runQuery">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-space>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          max-height="50vh"
          :data="listData"
          :row-key="(item) => item.supplySku"
          class-name="table-row-dashed"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" reserve-selection />
          <el-table-column label="产品名称/供应链SKU" min-width="220">
            <template #default="{ row }">
              <GoodsInfo
                :src="row.productImageUrl"
                :title="row.productTitle"
                :subtitle="row.supplySku"
              />
            </template>
          </el-table-column>
          <el-table-column label="产品sku" prop="skuCode" />
          <el-table-column label="可用库存" prop="availableInventory" width="100">
            <template #default="{ row }">
              <span>{{ row.availableInventory ?? '-' }}</span>
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
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, nextTick } from 'vue';
  import { debounce } from 'lodash-es';

  import { omsApi } from '@/api';
  import type { SupplySkuListBean } from '@/api/oms/data-contracts';
  import GoodsInfo from '@/components/GoodsInfo/index.vue';
  import { ElMessage } from 'element-plus';
  import type { ElTable } from 'element-plus';

  const emit = defineEmits<{
    (event: 'success', rows: SupplySkuListBean[]): void;
  }>();

  const props = withDefaults(
    defineProps<{
      title?: string;
      warehouseCode?: string;
      poolCode?: string;
    }>(),
    {
      title: '选择供应链产品',
    }
  );

  const PAGE_SIZE = 10;

  const visible = ref(false);
  const confirmLoading = ref(false);
  const tableRef = ref<InstanceType<typeof ElTable>>();

  const totalList = ref<SupplySkuListBean[]>([]);
  const isSyncing = ref(false);

  const listData = ref<SupplySkuListBean[]>([]);
  const listLoading = ref(false);
  const total = ref(0);
  const current = ref(1);
  const pageSize = ref(PAGE_SIZE);
  const pageSizeOption = [10, 20, 50, 100];

  const search = reactive({
    keyword: undefined as string | undefined,
    skuList: undefined as string[] | undefined,
    searchInventory: true,
    warehouseCode: undefined as string | undefined,
    poolCodes: undefined as string[] | undefined,
  });

  const searchDefaults = {
    keyword: undefined,
    skuList: undefined,
    searchInventory: true,
    warehouseCode: props.warehouseCode ?? undefined,
    poolCodes: props.poolCode ? [props.poolCode] : undefined,
  };

  async function fetchList() {
    try {
      listLoading.value = true;
      const res = await omsApi.omsCommonProductQuerySupplySkuList({
        ...search,
        pageNum: current.value,
        pageSize: pageSize.value,
      });
      listData.value = res?.records ?? [];
      total.value = res?.total ?? 0;
    } catch (error) {
      console.error(error);
      listData.value = [];
      total.value = 0;
    } finally {
      listLoading.value = false;
    }
  }

  function runQuery() {
    current.value = 1;
    fetchList();
  }

  const debouncedQuery = debounce(() => {
    runQuery();
  }, 500);

  function handleInputChange() {
    debouncedQuery();
  }

  function resetSearch() {
    search.keyword = undefined;
    search.skuList = undefined;
    current.value = 1;
    fetchList();
  }

  function handleCurrentChange(page: number) {
    current.value = page;
    fetchList();
  }

  function handlePageSizeChange(size: number) {
    pageSize.value = size;
    current.value = 1;
    fetchList();
  }

  function setSelectedRows() {
    nextTick(() => {
      const table = tableRef.value;
      const list = listData.value ?? [];
      if (!table || !list.length) return;

      isSyncing.value = true;
      table.clearSelection();
      list.forEach((item) => {
        const isSelected = totalList.value.some(
          (selectedRow) => selectedRow.supplySku === item.supplySku
        );
        if (isSelected) {
          table.toggleRowSelection(item, true);
        }
      });
      isSyncing.value = false;
    });
  }

  watch(
    () => listData.value,
    () => setSelectedRows()
  );

  function handleSelectionChange(selection: SupplySkuListBean[]) {
    if (isSyncing.value) return;

    const list = listData.value ?? [];
    const currentDataSupplySkus = new Set(list.map((item) => item.supplySku).filter(Boolean));

    const preservedItems = totalList.value.filter(
      (item) => item.supplySku && !currentDataSupplySkus.has(item.supplySku)
    );

    const combined = [...preservedItems, ...selection];
    const uniqueMap = new Map<string, SupplySkuListBean>();
    combined.forEach((item) => {
      if (item.supplySku) {
        uniqueMap.set(item.supplySku, item);
      }
    });

    totalList.value = Array.from(uniqueMap.values());
  }

  function handleConfirm() {
    if (totalList.value.length === 0) {
      ElMessage.warning('请至少选择一条产品');
      return;
    }
    confirmLoading.value = true;
    try {
      emit('success', totalList.value);
      visible.value = false;
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleClosed() {
    totalList.value = [];
    listData.value = [];
    tableRef.value?.clearSelection();

    search.keyword = undefined;
    search.warehouseCode = undefined;
    search.poolCodes = undefined;
    search.skuList = undefined;
    current.value = 1;
    pageSize.value = PAGE_SIZE;
  }

  function open(initialSelected?: SupplySkuListBean[], warehouseCode?: string) {
    console.log(`supplyProductSelectDialog open`, warehouseCode);
    visible.value = true;
    totalList.value = initialSelected && initialSelected.length > 0 ? [...initialSelected] : [];

    search.keyword = undefined;
    search.warehouseCode = warehouseCode ?? props.warehouseCode;
    search.poolCodes = props.poolCode ? [props.poolCode] : undefined;
    search.searchInventory = true;
    search.skuList = undefined;

    current.value = 1;

    nextTick(() => {
      fetchList();
    });
  }

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
