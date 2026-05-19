<template>
  <!-- :filter-method="filterMethod" -->
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
    @change="
      $emit('update:modelValue', $event);
      $emit('change', $event);
    "
  >
    <el-option
      v-for="item in shopMap"
      :key="item.customerCode"
      :label="item.customerCode"
      :value="item.customerCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      teleported?: boolean;
      customerSources?: string[];
    }>(),
    {
      placeholder: '店铺',
      clearable: false,
      teleported: false,
      customerSources: ['03'],
    }
  );
  const emit = defineEmits(['update:modelValue', 'change']);
  const shopMap = ref<any[]>([]);
  const keyword = ref('');
  const getShopOptions = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 1000,
      customerSources: Array.isArray(props.customerSources) ? props.customerSources : ['03'],
      // keyword: keyword.value,
    });
    shopMap.value = res.customerList || [];
    if (!props.multiple && !shopMap.value?.find((item) => item.customerCode === props.modelValue)) {
      emit('update:modelValue', '');
    }
    if (props.multiple) {
      emit(
        'update:modelValue',
        shopMap.value
          ?.filter((item) => props.modelValue?.includes(item.customerCode))
          ?.map((item) => item.customerCode) || []
      );
    }
  };
  getShopOptions();
  const filterMethod = (query: string) => {
    keyword.value = query;
  };

  watch(
    () => [keyword.value],
    () => {
      getShopOptions();
    }
  );
</script>

<style scoped lang="scss"></style>
