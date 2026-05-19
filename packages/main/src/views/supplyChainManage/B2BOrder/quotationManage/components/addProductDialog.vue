<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="75%" top="1vh">
    <template #header><h2>添加产品</h2></template>
    <slot></slot>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input
              v-model="search.keyWord"
              placeholder="产品名称/产品SKU/供应链SKU"
              style="width: 325px"
            >
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button class="button" type="primary" @click="runQuery">查询</el-button>
          </el-space>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          max-height="400px"
          ref="tableRef"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData?.productSkuBeanList"
          row-key="skuCode"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" fixed reserve-selection />
          <el-table-column label="产品信息" min-width="350">
            <template #default="scope">
              <div class="d-flex align-items-center pe-5">
                <KeenImagePreview :src="scope.row.productImageUrl" />
                <div class="ms-5 fs-5">
                  <div class="text-gray-800 fw-bold">
                    {{ scope.row.productTitle }}
                  </div>
                  <div>{{ scope.row.productSku }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="建议售价" width="120">
            <template #default="scope">
              <span>
                {{ scope.row.price ? scope.row.price?.toFixed(3) : '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="currency" label="币种" width="100" />
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
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';

  const props = defineProps<{
    visible: boolean;
    selectedRows: ProductContracts.ProductBean[];
  }>();

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const PAGE_SIZE = 10;
  console.log('selectedRows', props.selectedRows);
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
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody
  >({
    searchDefaults: {
      searchErpQuotation: true,
      keyWord: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryProductSkuList,
  });

  const currentRow = ref<any[]>([]);

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
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };

  // 选择商品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择商品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };

  /* const getOptions = async (categoryCode: string, level: number) => {
const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
categoryCode,
});
optionsMap[`options${level}`] = res.categoryLevelBeanList;
};
getOptions('', 1); */
</script>

<style scoped lang="scss"></style>
