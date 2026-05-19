<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        style="width: 450px"
        placeholder="产品SKU/供应链SKU/产品名称"
        clearable
      >
        <template #prepend v-if="multiple">
          <el-select v-model="search.searchType" style="width: 120px">
            <el-option
              v-for="(val, key) in searchTypeMap"
              :value="val.value"
              :label="val.label"
              :key="key"
            />
          </el-select>
        </template>
        <template #prefix>
          <SvgIconSearch />
        </template>
        <template #append v-if="multiple && !(search.searchType === '3')">
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
            placeholder="一行一项，按回车键换行，最多支持500行,仅支持搜索产品sku/供应链SKU"
          />
        </template>
      </el-input>
    </template>
    <el-table
      ref="tableRef"
      height="400px"
      v-loading="listLoading"
      :data="listData?.records"
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
      <el-table-column label="仓库类型" min-width="120" v-if="columnsConfig.warehouseMapName">
        <template #default="{ row }">
          <span>{{ warehouseMapName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调出分配池" min-width="120" v-if="columnsConfig.poolCodeName">
        <template #default="{ row }">
          <span>{{ poolCodeName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用良品数量" min-width="120" v-if="columnsConfig.availableInventory">
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
  import { type columnsConfig } from '../type';

  const props = withDefaults(
    defineProps<{
      warehouseCode: string;
      productType?: number;
      selectedRows?: ProductContracts.ProductBean[];
      rowKey?: string;
      poolCode?: string;
      warehouseMapName?: string;
      poolCodeName?: string;
      multiple?: boolean;

      columnsConfig?: columnsConfig;
    }>(),
    {
      rowKey: 'skuCode',
      multiple: true,

      columnsConfig: () => ({
        availableInventory: true,
        poolCodeName: true,
        warehouseMapName: true,
      }),
    }
  );

  const searchTypeMap = [
    {
      label: '供应链SKU',
      value: '2',
    },
    {
      label: '产品sku',
      value: '1',
    },
    {
      label: '产品名称',
      value: '3',
    },
  ];
  const emit = defineEmits(['select']);
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const batchSearchRef = ref();
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
    runQuery,
    resetSearch,
  } = useList<
    OmsApi.OmsCommonProductQuerySupplySkuList.RequestBody,
    OmsApi.OmsCommonProductQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      skuList: undefined,
      searchInventory: true,
      warehouseCode: props.warehouseCode || undefined,
      poolCodes: props.poolCode ? [props.poolCode] : undefined,
      searchType: props.multiple ? '1' : undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsCommonProductQuerySupplySkuList,
  });

  // 🔥 批量搜索处理
  const handleBatchSearch = (val: string) => {
    if (!val || !val.trim()) {
      search.skuList = undefined;
      return;
    }
    batchSearchRef.value.hide();
    const item = val?.replace(/\n/g, ',').trim();
    search.keyword = undefined;
    search.skuList = item
      .split(',')
      .map((sku) => sku.trim())
      .filter((sku) => sku);
  };
  // 🔥 清空批量搜索
  const handleBatchClear = () => {
    search.skuList = undefined;
  };
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows();
  const handleSelectionChange = (list) => {
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
