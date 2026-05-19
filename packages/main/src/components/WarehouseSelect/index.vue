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
      :label="`${warehouse.warehouseDesc} - ${warehouse.warehouseCode}`"
      :value="warehouse.warehouseCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { dataApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      filterFBA?: boolean;
      type: number;
      filters?: string[];
    }>(),
    {
      placeholder: '仓库',
      clearable: false,
      multiple: false,
      filterFBA: true,
      type: 1,
    }
  );

  const warehouseCode = ref<string>('');
  // 发货仓库
  const warehouseMap = ref([]);
  const queryAllWarehouse = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      filterFBA: props.filterFBA,
      pageNum: 1,
      pageSize: 1000,
    });
    warehouseMap.value = res?.warehouseList || [];
  };

  queryAllWarehouse();
</script>

<style scoped lang="scss"></style>
