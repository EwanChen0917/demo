<template>
  <el-cascader
    :teleported="false"
    v-model="value"
    :options="options"
    :props="optionProps"
    :placeholder="placeholder"
    clearable
    :show-all-levels="false"
  />
</template>

<script setup lang="ts">
  import { productApi } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      filterFlag?: number;
      placeholder?: string;
      multiple?: boolean;
    }>(),
    {
      placeholder: '请选择三级分类',
      multiple: false,
    }
  );

  const loading = ref(false);
  const value = ref();
  const options = ref<any[]>([]);
  const optionProps = {
    emitPath: false,
    label: 'categoryName',
    value: 'categoryCode',
    multiple: props.multiple,
  };

  const getCategoryTree = async () => {
    loading.value = true;
    try {
      const res = await productApi.luteosProductCategoryQueryCategoryTree({
        filterLevel: 3,
        filterFlag: 1,
      });
      options.value = handleTreeData(res.categoryList) || [];
    } finally {
      loading.value = false;
    }
  };

  const handleTreeData = (data, limit = 3, count = 1) => {
    return data?.map((x) => ({
      ...x,
      children: count < limit ? handleTreeData(x.children, limit, count + 1) : null,
    }));
  };

  watchEffect(() => {
    getCategoryTree();
  });
</script>

<style scoped lang="scss"></style>
