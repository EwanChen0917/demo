<template>
  <el-select
    v-model="warehouseCode"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    collapse-tags
    collapse-tags-tooltip
    @change="handleChange"
  >
    <el-option
      v-for="warehouse of warehouseMap"
      :key="warehouse.warehouseCode"
      :label="`${warehouse.warehouseName} - ${warehouse.warehouseCode}`"
      :value="warehouse.warehouseCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      filters?: string[];
    }>(),
    {
      placeholder: '仓库',
      clearable: false,
      multiple: false,
      filterFBA: true,
    }
  );

  const emit = defineEmits(['change']);

  const warehouseCode = ref<string>('');
  // 仓库
  const warehouseMap = ref([]);
  const queryAllWarehouse = async () => {
    const res = await financeSystemApi.financeBasicQueryWarehouseList({
      status: 1,
      pageNum: 1,
      pageSize: 1000,
    });
    warehouseMap.value = res?.warehouseList || [];
  };

  queryAllWarehouse();

  const handleChange = (val: any) => {
    if (!Array.isArray(val)) {
      emit('change', warehouseMap.value?.find((item) => item.warehouseCode === val)?.warehouseName);
    }
  };
</script>

<style scoped lang="scss"></style>
