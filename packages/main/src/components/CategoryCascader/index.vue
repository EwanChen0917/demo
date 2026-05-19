<template>
  <el-cascader
    ref="cascaderRef"
    :teleported="true"
    :props="optionProps"
    v-model="result"
    clearable
    filterable
    placeholder="产品分类"
    popper-class="category-cascader"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { productApi } from '@/api/index';

  const cascaderRef = ref();
  const props = defineProps(['modelValue', 'filterFlag']);
  const emits = defineEmits(['update:modelValue']);
  const result = computed({
    get() {
      return props.modelValue;
    },
    set(_val) {
      emits('update:modelValue', _val);
    },
  });
  const optionProps = {
    expandTrigger: 'hover' as const,
    label: 'categoryName',
    value: 'categoryCode',
    multiple: false,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node, resolve) {
      const { value } = node;
      getCategoryTree(value).then((res) => {
        resolve(res);
      });
    },
  };
  const loading = ref(false);
  const getCategoryTree = async (categoryCode) => {
    loading.value = true;
    try {
      const res = await productApi.luteosProductCategoryQueryCategoryTree({
        categoryCode,
        filterFlag: props.filterFlag,
      });
      // options.value = res.categoryList as [];
      return res.categoryList;
    } finally {
      loading.value = false;
    }
  };
  const clear = () => {
    cascaderRef.value.cascaderPanelRef.clearCheckedNodes();
  };
  defineExpose({ clear });
</script>

<style lang="scss">
  .category-cascader {
    .el-cascader-node:not(.is-disabled):hover,
    .el-cascader-node:not(.is-disabled):focus {
      background: none;
    }
  }
</style>
