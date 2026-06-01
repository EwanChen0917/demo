<template>
  <el-dialog title="选择商品" v-model="visibility" align-center width="980px">
    <KeenList
      @refresh="refreshList"
      @reset-search-by-key="(key) => (search[key] = undefined)"
      @reset-search="resetSearch"
    >
      <template #search>
        <el-input v-model="search.keyWord" placeholder="产品SKU名称/产品SKU/产品SPU" clearable />
      </template>
      <template #filters>
        <ProductLineSelect
          style="width: 120px"
          v-model="search.productLine"
          clearable
          @change="search"
        />
        <CategoryCascader
          v-model="search.categoryCode"
          placeholder="产品分类"
          :emit-path="false"
          style="min-width: 180px"
          @change="
            (val) => {
              search.level = val.level;
            }
          "
        />
      </template>
      <span>
        已选数量:
        <b>{{ multipleSelection.length }}</b>
      </span>
      <el-popover width="600" trigger="click" placement="right">
        <template #reference>
          <el-button type="text" size="small">查看已选商品</el-button>
        </template>
        <el-table
          :data="props.allAddList || []"
          row-key="index"
          max-height="30vh"
          :header-cell-style="{ height: '24px' }"
          :cell-style="{ height: '24px' }"
        >
          <el-table-column prop="skuCode" label="产品SKU" width="120" />
          <el-table-column prop="warehouseDesc" label="目的仓库" min-width="150" />
          <el-table-column prop="customerDesc" label="客户名称" />
          <el-table-column prop="customerCollectDesc" label="客户汇总名称" min-width="120" />
        </el-table>
      </el-popover>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.productSkuBeanList"
        :row-key="(row) => row.skuCode"
        @selection-change="handleSelectionChange"
        max-height="350px"
      >
        <el-table-column
          type="selection"
          width="40"
          reserve-selection
          :selectable="
            (row) => {
              return !disabledSkuCodes.includes(row.skuCode);
            }
          "
        />
        <el-table-column prop="skuCode" label="产品SKU" min-width="120" />
        <el-table-column prop="productTitle" label="产品名称" min-width="240">
          <template #default="{ row }">
            <GoodsInfo
              hide-image
              :title="row.productTitle"
              :subtitle="row.skuCode"
              copy-title
              copy-subtitle
            />
          </template>
        </el-table-column>
        <el-table-column prop="productLineName" label="产品品线" min-width="120" />
        <el-table-column prop="categoryName" label="产品分类" min-width="120" />
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
      <el-button type="text" @click="close">取消</el-button>
      <el-button type="primary" @click="selectOk" :disabled="multipleSelection?.length === 0">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { productApi, ProductApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';

  interface Props {
    modelValue: any[];
    allAddList: any[];
  }

  const props = withDefaults(defineProps<Props>(), {});

  const emit = defineEmits<{ (e: 'update:modelValue', val: any[]): void }>();

  const PAGE_SIZE = 10;
  const visibility = ref(false);
  const tableRef = ref(null);
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
    ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
      level: undefined,
      codeList: undefined,
      productLine: undefined,
    },
    pageSize: PAGE_SIZE,
    serviceManual: true,
    service: productApi.luteosProductSkuQueryProductSkuList,
    onSuccess: () => {
      nextTick(() => {
        if (!tableRef.value || !listData.value?.productSkuBeanList) return;
        const allSelectedSkuCodes = multipleSelection.value.map((item) => item.skuCode);
        listData.value.productSkuBeanList.forEach((row) => {
          if (allSelectedSkuCodes.includes(row.skuCode)) {
            tableRef.value.toggleRowSelection(row, true);
          } else {
            tableRef.value.toggleRowSelection(row, false);
          }
        });
      });
    },
  });

  const multipleSelection = ref<any[]>([]); // 当前选中的数据
  const disabledSkuCodes = computed(() =>
    //已添加sku不可再选
    props.allAddList.filter((item) => item.disabled).map((item) => item.skuCode)
  );

  const handleSelectionChange = (val: any[]) => {
    multipleSelection.value = val;
  };

  const selectOk = async () => {
    emit('update:modelValue', multipleSelection.value);
    visibility.value = false;
  };

  const open = () => {
    visibility.value = true;
    multipleSelection.value = [...props.modelValue];
    resetSearch();
    runQuery();
  };

  const close = () => {
    multipleSelection.value = [];
    visibility.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.is-disabled > .el-checkbox__inner) {
    background-color: #f5f7fa;
    border-color: #dcdfe6;
  }
</style>
