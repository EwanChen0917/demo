<template>
  <el-dialog :title="`选择SKU:${warehouseName}`" v-model="visible" width="800px">
    <el-input
      v-model="search.supplySku"
      placeholder="请输入供应商sku"
      clearable
      @keyup.enter="runQuery"
      style="width: 300px; margin-bottom: 20px"
    />
    <el-table
      ref="tableRef"
      :row-key="(row) => row.supplySku + row.sellerSku"
      :data="listData?.recordList || []"
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
      max-height="400"
    >
      <el-table-column
        type="selection"
        :selectable="
          (row) => {
            return !selectedRows?.find(
              (item) => item.supplySku === row.supplySku && item.sellerSku === row.sellerSku
            );
          }
        "
        width="55"
        reserve-selection
      />
      <el-table-column prop="supplySku" label="供应商sku" />
      <el-table-column prop="sellerSku" label="seller sku/msku" />
      <el-table-column prop="totalStock" label="库存数量" />
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { erpApi, ErpApi, ErpContracts } from '@/api';
  import useList from '@/hooks/list/useList';

  // BC001-BY00NB-A
  const props = withDefaults(
    defineProps<{
      selectedRow?: ErpContracts.TiktokStockAdjustmentQuerySkuInfoBean;
      selectedRows?: ErpContracts.TiktokStockAdjustmentQuerySkuInfoBean[];
    }>(),
    {}
  );
  const emit = defineEmits<{
    (event: 'selectSku', row: any): void;
  }>();
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const visible = ref(false);
  const warehouseName = ref('');
  // 勾选sku
  const totalList = ref([]);
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
    ErpApi.LuteosErpTiktokStockAdjustmentQuerySkuInfo.RequestQuery,
    ErpApi.LuteosErpTiktokStockAdjustmentQuerySkuInfo.ResponseBody
  >({
    searchDefaults: {
      supplySku: '',
      warehouseCode: '',
    },
    pageSize: PAGE_SIZE,
    serviceManual: true,
    service: erpApi.luteosErpTiktokStockAdjustmentQuerySkuInfo,
    onSuccess: (res) => {
      setSelectedRows();
    },
  });

  const open = async (data: { warehouseCode: string; warehouseName: string }) => {
    visible.value = true;
    search.warehouseCode = data.warehouseCode;
    warehouseName.value = data.warehouseName;
    setSelectedRows();
  };

  const setSelectedRows = async () => {
    await nextTick();
    tableRef.value?.clearSelection();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        listData.value?.recordList?.forEach((item) => {
          if (item.supplySku === row.supplySku && item.sellerSku === row.sellerSku) {
            tableRef.value!.toggleRowSelection(item);
          }
        });
      });
    }
  };

  const handleSelectionChange = (val: ErpContracts.TiktokStockAdjustmentQuerySkuInfoBean[]) => {
    totalList.value = val;
  };

  const confirm = () => {
    if (!totalList.value.length) {
      ElMessage.error('请选择一个SKU');
      return;
    }
    emit('selectSku', totalList.value);
    // 关闭弹窗
    visible.value = false;
  };

  const close = () => {
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
