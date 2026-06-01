<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="teleported"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    @change="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in warehouseList"
      :value="item.warehouseCode"
      :label="item.warehouseDesc"
      :key="item.warehouseId"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { erpApi, platformApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      teleported?: boolean;
      filterCodeDict?: string;
    }>(),
    {
      placeholder: '目的仓',
      clearable: false,
      multiple: false,
      teleported: false,
      filterCodeDict: '',
    }
  );

  const emit = defineEmits(['update:modelValue']);
  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async (filterWarehouseCodes?: string) => {
    const res = await erpApi.luteosErpWarehouseQueryList({
      warehouseTypes: '1,3',
      pageNum: 1,
      pageSize: 500,
      status: 1,
      filterWarehouseCodes: filterWarehouseCodes,
    });
    warehouseList.value = res?.warehouseList || [];
  };
  const getFilterData = async (dictCode: string) => {
    const res = await platformApi.platformDict({
      dictCodes: [dictCode],
    });
    const dictData = res.dictMap?.[dictCode] || [];
    if (dictData.length) {
      getWarehouseList(dictData.map((item) => item?.value).join(','));
    }
  };
  onMounted(() => {
    if (props.filterCodeDict) {
      getFilterData(props.filterCodeDict);
    } else {
      getWarehouseList();
    }
  });
</script>

<style scoped lang="scss"></style>
