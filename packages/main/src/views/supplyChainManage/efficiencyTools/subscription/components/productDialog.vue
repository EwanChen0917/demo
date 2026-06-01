<template>
  <el-dialog
    :model-value="visible"
    @close="$emit('close')"
    width="65%"
    title="添加产品"
    align-center
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model="search.keyword"
          placeholder="产品名称/产品SKU/供应链SKU"
          clearable
          style="width: 325px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          style="width: 170px"
          v-model="search.skuStateList"
          multiple
          collapse-tags
          :max-collapse-tags="1"
          placeholder="产品状态"
          clearable
          :options="skuStateLists"
          :props="{ label: 'name', value: 'id' }"
        />
      </template>
      <el-table
        row-key="productSku"
        ref="tableRef"
        max-height="500px"
        v-loading="listLoading"
        :data="listData?.eccangSkuList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column prop="productSku" label="供应链SKU" />
        <el-table-column prop="skuName" label="产品名称" />
        <el-table-column prop="skuCode" label="产品SKU" />
        <el-table-column prop="skuStateDesc" label="产品状态" />
        <el-table-column prop="supplierName" label="供应商名称" />
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api';
  import { ElTable as ElTableType } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    selectedRows?: ProductContracts.ProductBean[];
  }>();

  const emit = defineEmits<{
    (event: 'close');
    (event: 'save', val: any): void;
  }>();

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const PAGE_SIZE = 10;
  const skuStateLists = [
    { id: 1, name: '待上架' },
    { id: 2, name: '在销售' },
    { id: 3, name: '清仓中' },
    { id: 4, name: '已退市' },
    { id: 0, name: '已取消' },
  ];
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
    ProductApi.LuteosProductEccangSkuV2QueryEccangSkuList.RequestQuery,
    ProductApi.LuteosProductEccangSkuV2QueryEccangSkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      filterProductMateriel: false,
      skuStateList: [],
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      return {
        keyword: searchData.keyword,
        filterProductMateriel: false,
        skuStateList: searchData.skuStateList?.join(','),
      };
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductEccangSkuV2QueryEccangSkuList,
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

  // 勾选商品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const handleSave = () => {
    emit('save', totalList.value);
  };
  const handleCancel = () => {
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
