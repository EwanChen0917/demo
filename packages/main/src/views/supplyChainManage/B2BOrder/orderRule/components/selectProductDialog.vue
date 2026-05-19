<template>
  <el-dialog
    append-to-body
    width="900px"
    title="添加产品"
    v-model="visible"
    @close="visible = false"
    align-center
    class="sku-select-dialog"
  >
    <KeenList @resetSearch="keyword = ''">
      <template #search>
        <el-input
          v-model="keyword"
          placeholder="供应链产品名称/供应链SKU"
          clearable
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters></template>
      <template #buttons>
        <!--        <el-button type="primary" @click="runQuery">查询</el-button>-->
        <!--        <el-button type="primary" @click="resetSearch">重置</el-button>-->
      </template>
      <el-table
        ref="tableRef"
        :data="currentList"
        class-name="table-row-dashed"
        row-key="value"
        max-height="47vh"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column label="供应链产品信息">
          <template #default="{ row }">
            <GoodsInfo
              :src="row?.params?.productImages?.split(',')?.[0]"
              :title="row?.desc"
              :subtitle="row?.value"
              copy-title
              copy-subtitle
              :url="`/supplyGoods/detail?code=${row?.value}`"
            />
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="tableData?.length"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const tableRef = ref();
  const PAGE_SIZE = 10;
  const current = ref(1);
  const pageSize = ref(PAGE_SIZE);
  const pageSizeOption = [PAGE_SIZE, 20, 50, 100];
  const keyword = ref('');

  const save = async () => {
    const selectedRows = tableRef.value?.getSelectionRows();
    if (!selectedRows?.length) {
      ElMessage.warning('请选择要添加的产品');
      return;
    }
    emit('success', selectedRows);
    visible.value = false;
  };

  const listData = ref([]);
  const open = async (selectProductList, data) => {
    keyword.value = '';
    listData.value = data;
    tableRef.value?.clearSelection();
    visible.value = true;
    await nextTick();
    selectProductList?.forEach((item) => {
      tableRef.value?.toggleRowSelection({
        value: item.productSku,
        desc: item.productTitle,
        params: {
          productImages: item.productImage,
        },
        quantity: item.quantity,
      });
    });
  };
  // 前端分页
  const tableData = computed(() => {
    return listData.value?.filter((item) => {
      return item.value.includes(keyword.value) || item.desc.includes(keyword.value);
    });
  });

  const currentList = computed(() => {
    const startIndex = (current.value - 1) * pageSize.value;
    return tableData.value?.slice(startIndex, startIndex + pageSize.value);
  });

  const handleCurrentChange = (val) => {
    current.value = val;
  };
  const handlePageSizeChange = (value: number) => {
    pageSize.value = value;
  };

  const close = () => {
    tableRef.value?.clearSelection();
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped>
  .keen-ui .sku-select-dialog .el-dialog__body {
    height: 624px !important;
    max-height: 900px !important;
  }
</style>
