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
      v-for="item in customerList"
      :key="item.code"
      :label="item.name"
      :value="item.code"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      teleported?: boolean;
      returnLabel?: boolean;
    }>(),
    {
      placeholder: '客户',
      clearable: false,
      multiple: false,
      teleported: false,
      returnLabel: false,
    }
  );

  const emit = defineEmits(['update:modelValue']);
  const customerList = ref<any[]>([]);
  const getCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };

  getCustomerList();
</script>

<style scoped lang="scss"></style>
