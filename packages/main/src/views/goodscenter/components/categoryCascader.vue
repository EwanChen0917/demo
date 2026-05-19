<template>
  <el-cascader
    :teleported="false"
    v-model="value"
    :options="options"
    :props="optionProps"
    :placeholder="placeholder"
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    @change="handleChange"
    clearable
    :show-all-levels="!filterFlag"
  />
</template>

<script setup lang="ts">
  import { productApi } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      filterFlag?: number;
      placeholder?: string;
      emitPath?: boolean;
      multiple?: boolean;
    }>(),
    {
      placeholder: '请选择产品分类',
      emitPath: true,
      multiple: false
    }
  );
  const emit = defineEmits<{
    (event: 'change', val: any);
  }>();
  const loading = ref(false);
  const value = ref();
  const options = ref<any[]>([]);
  const optionProps = {
    label: 'categoryName',
    value: 'categoryCode',
    checkStrictly: props.multiple ? false: !props?.filterFlag,
    emitPath: props.emitPath,
    multiple: props.multiple,
    leafOnly: true
  };

  const getCategoryTree = async () => {
    loading.value = true;
    try {
      const res = await productApi.luteosProductCategoryQueryCategoryTree({
        filterFlag: props.filterFlag,
      });
      options.value = res.categoryList || [];
    } finally {
      loading.value = false;
    }
  };

  const findPath = (options, value, path = []) => {
    for (const option of options) {
      const currentPath = [...path, { categoryCode: option.categoryCode }];
      if (option.categoryCode === value) {
        return currentPath;
      }
      if (option.children) {
        const result = findPath(option.children, value, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const handleChange = (val: any) => {
    emit('change', {
      categoryCode: val ? (props.emitPath ? val : val[val.length - 1]) : '',
      level: props.emitPath ? val?.length : findPath(options.value, val)?.length ?? '',
    });
  };
  watchEffect(() => {
    getCategoryTree();
  });
</script>

<style scoped lang="scss"></style>
