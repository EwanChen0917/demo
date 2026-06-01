<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        style="width: 300px"
        placeholder="供应链产品名称/供应链SKU"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <el-table
      ref="tableRef"
      max-height="50vh"
      v-loading="listLoading"
      :data="listData?.records"
      :row-key="(item) => item.supplySku"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="供应链产品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.productImageUrl"
            :title="row.productTitle"
            :subtitle="row.supplySku"
          />
        </template>
      </el-table-column>
      <el-table-column label="产品类型" min-width="120">
        <template #default="{ row }">
          <span>{{ productTypeMap[row?.productType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可调拨量" min-width="120">
        <template #default="{ row }">
          <span>{{ row.availableInventory || 0 }}</span>
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
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { omsApi, OmsApi, ProductContracts } from '@/api';
  import { ElTable as ElTableType } from 'element-plus';

  const enum supplySkuShareType {
    personal = 2,
    shared = 1,
    all = 3,
  }
  const props = withDefaults(
    defineProps<{
      warehouseCode: string;
      productType?: number;
      selectedRows?: ProductContracts.ProductBean[];
      rowKey?: string;
    }>(),
    {
      rowKey: 'skuCode',
    }
  );

  const emit = defineEmits(['select']);

  const productTypeMap = {
    1: '产品',
    2: '物料',
    3: '用研产品',
    12: '配件',
    13: '组合产品',
    14: '虚拟产品',
  };

  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();

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
    OmsApi.OmsCommonProductQuerySupplySkuList.RequestBody,
    OmsApi.OmsCommonProductQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      searchInventory: true,
      warehouseCode: props.warehouseCode || '',
      share: supplySkuShareType.shared,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsCommonProductQuerySupplySkuList,
  });

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows();

  // 勾选产品
  let totalList = reactive([]);
  const handleSelectionChange = (list) => {
    totalList = list;
    emit('select', list);
  };

  onMounted(() => {
    runQuery();
  });

  onActivated(() => {
    runQuery();
  });
</script>

<style scoped lang="scss"></style>
