<template>
  <el-select
    v-model="warehouseCode"
    placeholder="海外第三方仓"
    :clearable="clearable"
    :multiple="multiple"
    :teleported="false"
    filterable
    remote
    :remote-method="getWarehouseList"
    :max-collapse-tags="maxCollapseTags"
    :loading="warehouseLoading"
    @change="changeWarehouse"
  >
    <el-option
      v-for="item in warehouseList"
      :key="item.warehouseId"
      :label="item.warehouseDesc"
      :value="item.warehouseCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  const props = withDefaults(
    defineProps<{
      modelValue: string | number | null;
      multiple?: boolean;
      clearable?: boolean;
      maxCollapseTags?: number;
    }>(),
    {
      placeholder: '海外第三方仓',
      clearable: false,
      multiple: false,
      maxCollapseTags: 1,
    }
  );
  const emit = defineEmits(['update:modelValue', 'changeWarehouseCode']);

  const warehouseCode = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
  const warehouseList = ref([]);
  const warehouseLoading = ref(false);
  // 获取海外第三方仓列表
  const getWarehouseList = async (query?: string) => {
    try {
      warehouseLoading.value = true;
      const res = await erpApi.luteosErpWarehouseQueryList({
        keyword: query,
        pageNum: 1,
        pageSize: 100,
        warehouseType: 3,
        status: 1,
      });
      warehouseList.value = res?.warehouseList || [];
    } finally {
      warehouseLoading.value = false;
    }
  };
  const changeWarehouse = (val: string) => {
    if (!val) return;
    const warehouse = warehouseList.value.find((item) => item.warehouseCode === val);
    emit('changeWarehouseCode', warehouse);
  };
  getWarehouseList();
</script>
