<template>
  <KeenList>
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
    <template #filters></template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table
      ref="tableRef"
      max-height="50vh"
      v-loading="listLoading"
      :data="listData?.supplySkuList"
      :row-key="rowKey"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="供应链产品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo :src="row.productImage" :title="row.productTitle" :subtitle="row.productSku" />
        </template>
      </el-table-column>
      <el-table-column label="产品类型" min-width="120">
        <template #default="{ row }">
          <span>{{ productTypeMap[row?.productType] }}</span>
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
  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  const props = withDefaults(
    defineProps<{
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
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.RequestQuery,
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      productStatus: undefined,
      saleStatus: undefined,
      productType: props?.productType,
      purchaser: undefined,
      supplierCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSupplySkuQuerySupplySkuList,
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
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
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
