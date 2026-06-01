<template>
  <el-select
    v-model="warehouseId"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :filter-method="
      (query) => {
        filter = query;
      }
    "
    :teleported="teleported"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in realWarehouseMap"
      :key="item.warehouseId"
      :label="item.warehouseDesc"
      :value="item[valueKey]"
    />
  </el-select>
</template>

<script lang="ts">
  let warehouseListPromise: Promise<any[]> | null = null;
  let warehouseListCache: any[] | null = null;
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      maxCollapseTags?: number;
      teleported?: boolean;
      valueKey?: string;
    }>(),
    {
      placeholder: '请选择',
      clearable: true,
      multiple: false,
      maxCollapseTags: 1,
      teleported: false,
      valueKey: 'warehouseId',
    }
  );
  const warehouseId = ref();
  const warehouseMap = ref();
  const filter = ref('');

  const realWarehouseMap = computed(() => {
    if (!filter.value) {
      return warehouseMap.value || [];
    }

    return (warehouseMap.value || []).filter((item) => {
      return (
        (item.warehouseDesc && item.warehouseDesc.includes(filter.value)) ||
        (item.warehouseCode && item.warehouseCode.includes(filter.value))
      );
    });
  });

  const queryAllWarehouse = async () => {
    if (warehouseListCache) {
      warehouseMap.value = warehouseListCache;
      return;
    }
    if (!warehouseListPromise) {
      // luteosErpWarehouseQueryList  erp仓库资料
      warehouseListPromise = erpApi
        .luteosErpWarehouseQueryList({
          pageNum: 1,
          pageSize: 2000,
          status: 1,
        })
        .then((res) => {
          warehouseListCache = res?.warehouseList || [];
          return warehouseListCache;
        });
    }
    warehouseMap.value = await warehouseListPromise;
  };

  onMounted(() => {
    queryAllWarehouse();
  });
</script>

<style scoped lang="scss"></style>
