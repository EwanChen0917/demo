<template>
  <el-dialog
    :model-value="visible"
    @close="handleCancel"
    title="选择供应链SKU"
    width="900px"
    top="1vh"
    @open="runQuery"
  >
    <KeenList>
      <template #search>
        <el-input v-model="searchParams.keyword" placeholder="请输入产品名称/供应链SKU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #buttons>
        <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      </template>
      <el-table
        max-height="400px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="loading"
        :data="dataList"
        row-key="productSku"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="55" align="center" v-if="selectOne">
          <template #default="scope">
            <el-radio
              v-model="currentRow"
              :label="scope.row"
              :disabled="scope.row.productSku && selectedRow?.productSku === scope.row.productSku"
            >
              {{}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column v-else type="selection" width="55" reserve-selection />
        <el-table-column label="产品信息" min-width="220">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.productImage"
              :title="row.productTitle"
              :subtitle="row.productSku"
              copy-title
              copy-subtitle
              :url="`/supplyGoods/detail?code=${row.productSku}`"
            />
          </template>
        </el-table-column>
        <el-table-column label="供应商" prop="supplierName" min-width="120" />
      </el-table>
      <KeenPagination
        :current="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-size-option="[10, 20, 50, 100]"
        :total="pagination.total"
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

<script lang="ts" setup>
    import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import { debounce } from 'lodash-es';
  import { productApi, ProductContracts } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      supplierCodeList?: Array<string>;
    }>(),
    {
      selectOne: false,
    }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const searchParams = ref({
    keyword: '',
  });

  watch(
    Object.keys(searchParams.value).map((key) => () => (searchParams.value as any)[key]),
    debounce(() => {
      runQuery();
    }, 300)
  );

  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    runQuery();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    runQuery();
  };

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const loading = ref(false);
  const dataList = ref<any[]>([]);

  const runQuery = async () => {
    try {
      loading.value = true;
      const res = await productApi
        .luteosProductSupplySkuQuerySupplySkuList({
          ...searchParams.value,
          pageSize: pagination.value.pageSize,
          pageNum: pagination.value.pageNum,
          unProductTypeList: 2,
          supplierCodeList: props.supplierCodeList?.join(',') || '',
        })
        .catch(() => {
          dataList.value = [];
          pagination.value.total = 0;
        });
      if (res) {
        dataList.value = res?.supplySkuList || [];
        pagination.value.total = res.total as number;
      } else {
        dataList.value = [];
        pagination.value.total = 0;
      }
    } finally {
      loading.value = false;
    }
  };
  runQuery();

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

  // 勾选产品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 选择产品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个产品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择产品',
        duration: 5 * 1000,
      });
    }
  };

  // 取消
  const handleCancel = () => {
    tableRef.value?.clearSelection();
    emit('close');
  };

  const resetSearch = () => {
    searchParams.value.keyword = '';
    pagination.value.pageNum = 1;
    pagination.value.pageSize = 10;
    pagination.value.total = 0;
  };

  const open = () => {
    resetSearch();
    runQuery();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
