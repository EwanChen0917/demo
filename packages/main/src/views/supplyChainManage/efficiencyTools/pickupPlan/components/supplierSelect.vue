<template>
  <el-select
    :model-value="modelValue"
    @update:modelValue="onUpdate"
    placeholder="供应商"
    clearable
    filterable
    remote
    :remote-method="filterMethod"
    @focus="filterMethod('')"
    @change="onChange"
    style="width: 100%"
  >
    <el-option
      v-for="item in filterOptions"
      :key="item.code"
      :label="`${item.code}_${item.name}`"
      :value="item.code"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api/index';
  const props = defineProps<{ modelValue: any }>();
  const emit = defineEmits<{
    (e: 'update:modelValue', val: any): void;
    (e: 'change', val: any): void;
  }>();
  const options = ref<any[]>([]);
  const getOptions = async () => {
    const res = await erpApi.luteosErpPlanPickupGetSupplierList({});
    options.value = res.supplierList as any[];
  };
  getOptions();
  const filterOptions = ref<any[]>([]);
  const filterMethod = (query: string) => {
    if (query) {
      filterOptions.value = options.value.filter((item) => {
        const label = `${item.code}_${item.name}`.toLowerCase();
        return label.includes(query.toLowerCase());
      });
    } else {
      filterOptions.value = options.value;
    }
  };
  const onUpdate = (val: any) => {
    emit('update:modelValue', val);
  };
  const onChange = (val: any) => {
    const selectedOption = options.value.find((item) => item.code === val);
    emit('change', selectedOption);
  };
</script>

<style scoped lang="scss"></style>
