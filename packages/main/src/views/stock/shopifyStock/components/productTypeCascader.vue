<template>
  <el-cascader
    ref="cascaderRef"
    :teleported="true"
    :options="options"
    :props="optionProps"
    v-model="result"
    clearable
    filterable
    placeholder="产品类型"
    popper-class="product-type-cascader"
  >
    <template #default="{ node, data }">
      <overflowTooltip :content="data.categoryName" :line="1" />
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue';
  import { productApi } from '@/api/index';

  const cascaderRef = ref();
  const MAX_LEVEL = 5;

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      filterFlag?: number;
      maxLevel?: number;
    }>(),
    {
      maxLevel: 3,
    }
  );
  const emits = defineEmits(['update:modelValue']);

  const result = computed({
    get() {
      return props.modelValue;
    },
    set(_val) {
      emits('update:modelValue', _val);
    },
  });

  const options = ref<any[]>([]);
  const loading = ref(false);

  const optionProps = {
    expandTrigger: 'hover' as const,
    label: 'categoryName',
    value: 'categoryCode',
    multiple: false,
    checkStrictly: true,
  };

  const filterTreeByLevel = (nodes: any[], currentLevel = 1): any[] => {
    const actualMaxLevel = Math.min(props.maxLevel, MAX_LEVEL);
    if (!nodes || nodes.length === 0) return [];

    return nodes.map((node) => {
      const newNode = { ...node };

      if (currentLevel < actualMaxLevel && node.children && node.children.length > 0) {
        newNode.children = filterTreeByLevel(node.children, currentLevel + 1);
      } else {
        delete newNode.children;
      }

      return newNode;
    });
  };

  const getCategoryTree = async () => {
    loading.value = true;
    try {
      const res = await productApi.luteosProductCategoryQueryCategoryTree({
        filterFlag: props.filterFlag,
      });
      const rawData = res.categoryList || [];
      options.value = filterTreeByLevel(rawData, 1);
    } finally {
      loading.value = false;
    }
  };

  const clear = () => {
    cascaderRef.value?.cascaderPanelRef?.clearCheckedNodes();
  };

  watchEffect(() => {
    getCategoryTree();
  });

  defineExpose({ clear });
</script>

<style lang="scss">
  .product-type-cascader {
    .el-cascader-node:not(.is-disabled):hover,
    .el-cascader-node:not(.is-disabled):focus {
      background: none;
    }
    .el-cascader-node {
      width: 200px;
    }
  }
</style>
