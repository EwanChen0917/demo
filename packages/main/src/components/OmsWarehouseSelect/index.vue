<template>
  <el-select
    v-model="warehouseCode"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    :teleported="false"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="warehouse of warehouseMap"
      :key="warehouse.warehouseCode"
      :label="warehouse.warehouseName"
      :value="warehouse.warehouseCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      status?: number;
    }>(),
    {
      placeholder: '发货仓库',
      clearable: false,
      multiple: false,
      status: 1,
    }
  );

  const warehouseCode = ref<string>('');
  // 发货仓库
  const warehouseMap = ref([]);
  const queryAllWarehouse = async () => {
    const res = await omsApi.omsCommonWarehouseList({
      status: props.status,
      pageNum: 1,
      pageSize: 1000,
    });
    warehouseMap.value = res || [];
  };

  queryAllWarehouse();
</script>

<style scoped lang="scss"></style>
