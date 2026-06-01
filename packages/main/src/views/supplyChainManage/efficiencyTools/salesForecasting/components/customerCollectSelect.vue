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
      v-for="item in customerCollectList"
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
    }>(),
    {
      placeholder: '客户汇总',
      clearable: false,
      multiple: false,
      teleported: false,
    }
  );

  const emit = defineEmits(['update:modelValue']);
  const customerCollectList = ref<any[]>([]);
  const getCustomerCollectList = async () => {
    const res = await erpApi.luteosErpPlanPsfccQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerCollectList.value = res?.recordList || [];
  };
  getCustomerCollectList();
</script>

<style scoped lang="scss"></style>
