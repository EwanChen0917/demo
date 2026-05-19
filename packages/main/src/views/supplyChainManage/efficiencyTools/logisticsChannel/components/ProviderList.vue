<template>
  <div class="provider-list-container">
    <el-radio-group v-model="search.status">
      <el-radio-button label="启用" :value="1" />
      <el-radio-button label="禁用" :value="0" />
    </el-radio-group>
    <KeenList @refresh="refreshList">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        :row-class-name="tableRowClassName"
        @row-click="(row) => handleRowClick(row)"
      >
        <el-table-column label="物流商列表" prop="supplierName" min-width="150" />
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        size="small"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';

  const props = defineProps<{
    modelValue?: {
      supplierCode: string;
      supplierName: string;
    };
  }>();

  const emit = defineEmits(['update:modelValue', 'change']);
  const tableRef = ref();
  const selectedProvider = ref(props.modelValue);
  const PAGE_SIZE = 50;
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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpLogisticsSupplierQueryList.RequestBody,
    ErpApi.LuteosErpLogisticsSupplierQueryList.ResponseBody
  >({
    searchDefaults: {
      status: 1, // 根据选中的Tab设置状态
      supplierType: 'supplier_first',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsSupplierQueryList,
    onSuccess: (res) => {
      selectedProvider.value = res?.recordList?.[0]
        ? {
            ...res?.recordList?.[0],
          }
        : null;
      emit('update:modelValue', res?.recordList?.[0]);
    },
  });

  const tableRowClassName = ({ row }: { row: any }) => {
    if (row.supplierCode === selectedProvider.value?.supplierCode) {
      return 'select-row';
    }

    return '';
  };
  // 选中表格行
  const handleRowClick = (row) => {
    if (selectedProvider.value?.supplierCode !== row.supplierCode) {
      selectedProvider.value = { ...row };
      emit('update:modelValue', row);
    }
  };
</script>

<style scoped lang="scss">
  :deep(.actions) {
    display: none !important;
  }
  :deep(.list-table) {
    margin: 0 !important;
  }
  .provider-list-container {
    background-color: #fff;
    border-radius: 10px;
    .el-radio-group {
      padding: 10px 0 0 10px;
    }
  }
</style>
