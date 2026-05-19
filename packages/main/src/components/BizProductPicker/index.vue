<template>
  <el-dialog title="商品选择" width="75%" :model-value="visible" @close="handleCancel">
    <KeenList
      @refresh="refreshList"
      @reset-search="reset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyWord" placeholder="商品名称/SPU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <div>
          <el-tree-select
            ref="catTreeSelectRef"
            :loading="catTreeLoading"
            v-model="categoryCode"
            :data="catTree"
            :filter-node-method="catFilterNodeMethod"
            filterable
            clearable
            check-strictly
            class="w-350px"
            popper-class="picker-cat-tree-select"
            highlight-current
          />
        </div>
      </template>
      <!-- <template #buttons>
        <el-button class="button" type="primary" @click="refreshList">查询</el-button>
      </template> -->

      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.productBeanList"
        row-key="productSpu"
        highlight-current-row
        @current-change="handleTableCurrentChange"
      >
        <el-table-column width="55" align="center">
          <template #default="scope">
            <el-icon v-if="scope.row.productSpu === selectedKey" color="var(--el-color-primary)">
              <SelectIcon />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="商品" min-width="200">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <!--begin::Thumbnail-->
              <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.productImage" />
              <!--end::Thumbnail-->
              <div class="ms-5">
                <!--begin::Title-->
                <span class="text-gray-800 fs-5 fw-bold">{{ scope.row.name }}</span>
                <!--end::Title-->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productSpu" label="SPU" />
        <el-table-column prop="categoryLevel" label="分类" min-width="150" />
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
        <el-button type="primary" @click="handleSubmit" :disabled="!selectedKey">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { Select as SelectIcon } from '@element-plus/icons-vue';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api';

  const props = defineProps<{
    visible: boolean;
    pickedKey?: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', product?: ProductContracts.ProductBean): void;
  }>();

  const {
    data: catTreeData,
    loading: catTreeLoading,
    refresh: queryCatTree,
  } = useRequest(productApi.luteosProductCategoryQueryCategoryTree, {
    manual: true,
  });

  const categoryCode = ref<string>();
  const catTreeSelectRef = ref();
  const catTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.categoryCode,
      label: item.categoryName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return catTreeData.value?.categoryList?.map((item) => mapNode(item));
  });
  const catFilterNodeMethod = (value, data) => data.label.includes(value);

  watch(categoryCode, (val) => {
    const node = catTreeSelectRef.value.getCurrentNode();
    if (val && node) {
      search.categoryCode = val;
      search.level = node.level;
    } else {
      search.categoryCode = undefined;
      search.level = undefined;
    }
  });

  const {
    search,
    resetSearch,
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
    tableRef,
    selectedKey,
    handleTableCurrentChange,
  } = useList<
    ProductApi.LuteosProductQueryProductList.RequestQuery,
    ProductApi.LuteosProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: productApi.luteosProductQueryProductList,
    serviceManual: true,
  });
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        runQuery(true);

        if (!catTreeData.value?.categoryList?.length) {
          queryCatTree();
        }
      }
    }
  );
  watch(listData, (val) => {
    const list = val?.productBeanList;
    if (props.pickedKey && list?.length) {
      const row = list.find((item) => item.productSpu === props.pickedKey);
      if (row) {
        nextTick(() => {
          tableRef.value?.setCurrentRow(row);
        });
      }
    }
  });

  // 确认
  const handleSubmit = async () => {
    const product = listData.value?.productBeanList?.find(
      (item) => item.productSpu === selectedKey.value
    );
    emit('close', product);
    reset();
  };

  // 取消操作
  const handleCancel = async () => {
    emit('close');
    reset();
  };

  const reset = () => {
    resetSearch();
    categoryCode.value = undefined;
    tableRef.value?.setCurrentRow(null);
  };
</script>

<style lang="scss">
  .picker-cat-tree-select {
    .el-select-dropdown__wrap {
      max-height: 400px;
    }
  }
</style>
