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
        <customSelectTable
          ref="tableRef"
          row-key="supplySku"
          :columns="columns"
          :data="listData"
          :total="total"
          :current="current"
          :page-size="pageSize"
          :loading="listLoading"
          :table-props="{ maxHeight: '50vh' }"
          :page-size-option="pageSizeOption"
          @page-change="handleCurrentChange"
          @size-change="handlePageSizeChange"
          @selection-change="handleSelectionChange"
        >
          <template #product="{ row }">
            <GoodsInfo
              :src="row.productImageUrl"
              :title="row.productTitle"
              :subtitle="row.supplySku"
            />
          </template>
          <template #inventory="{ row }">
            <span>{{ row.availableInventory ?? '-' }}</span>
          </template>
        </customSelectTable>
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
  import { ref, reactive, nextTick } from 'vue';
  import { debounce } from 'lodash-es';

  import { omsApi } from '@/api';
  import type { SupplySkuListBean } from '@/api/oms/data-contracts';
  import GoodsInfo from '@/components/GoodsInfo/index.vue';
  import customSelectTable from '@/components/customSelectTable/index.vue';
  import { ElMessage } from 'element-plus';

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
  const tableRef = ref<InstanceType<typeof customSelectTable>>();

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
    shop: undefined as string | undefined,
    site: undefined as string | undefined,
  });

  const columns = [
    { label: '产品名称/供应链SKU', slot: 'product', minWidth: 220 },
    { label: '产品sku', prop: 'skuCode' },
    { label: 'MSKU', prop: 'sellerSku' },
    { label: '可用库存', slot: 'inventory', width: 100 },
  ];

  async function fetchList() {
    try {
      listLoading.value = true;
      // console.log('添加赠品 选择订单', orderInfo.value);
      const res = await omsApi.omsCommonProductQueryAddGiftSupplySkuList({
        ...search,
        pageNum: current.value,
        pageSize: pageSize.value,
        buyerCountryCode: orderInfo.value?.buyerCountryCode,
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

  function handleSelectionChange(selection: SupplySkuListBean[]) {
    console.log('选中项变化：', selection);
  }

  function handleConfirm() {
    const selected = tableRef.value?.getSelected() ?? [];
    if (selected.length === 0) {
      ElMessage.warning('请至少选择一条产品');
      return;
    }
    confirmLoading.value = true;
    try {
      emit('success', selected);
      visible.value = false;
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleClosed() {
    tableRef.value?.clearSelected();
    listData.value = [];
    search.keyword = undefined;
    search.warehouseCode = undefined;
    search.poolCodes = undefined;
    search.skuList = undefined;
    search.shop = undefined;
    search.site = undefined;
    current.value = 1;
    pageSize.value = PAGE_SIZE;
  }

  const orderInfo: any = ref({});
  function open(
    initialSelected?: SupplySkuListBean[],
    warehouseCode?: string,
    shop?: string,
    site?: string,
    allInfo?: any
  ) {
    visible.value = true;
    search.keyword = undefined;
    search.warehouseCode = warehouseCode ?? props.warehouseCode;
    search.poolCodes = props.poolCode ? [props.poolCode] : undefined;
    search.searchInventory = true;
    search.shop = shop ?? undefined;
    search.site = site ?? undefined;
    search.skuList = undefined;
    current.value = 1;
    orderInfo.value = allInfo;

    nextTick(() => {
      if (initialSelected && initialSelected.length > 0) {
        tableRef.value?.setSelected(initialSelected);
      }
      fetchList();
    });
  }

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
