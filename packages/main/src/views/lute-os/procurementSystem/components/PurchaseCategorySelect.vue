<template>
  <el-tree-select
    v-model="modelValue"
    :data="renderOptions"
    :props="treeProps"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :teleported="teleported"
    :multiple="multiple"
    :check-strictly="checkStrictly"
    :check-on-click-node="true"
    :expand-on-click-node="true"
    :render-after-expand="false"
    collapse-tags
    collapse-tags-tooltip
    node-key="value"
    :loading="loading"
    @change="handleChange"
    popper-class="product-line-category-select"
  />
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import type { CategoryNodeBean } from '@/api/platform/data-contracts';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      disabled?: boolean;
      clearable?: boolean;
      filterable?: boolean;
      teleported?: boolean;
      disabledCategoryCodes?: string[];
      multiple?: boolean;
      checkStrictly?: boolean;
    }>(),
    {
      placeholder: '请选择采购类型',
      disabled: false,
      clearable: true,
      filterable: true,
      teleported: false,
      disabledCategoryCodes: () => [],
      multiple: false,
      checkStrictly: false,
    }
  );

  const emit = defineEmits<{
    (e: 'change', value?: string | string[], node?: CategoryNodeBean | CategoryNodeBean[]): void;
    (
      e: 'select',
      payload: {
        value?: string | string[];
        label?: string;
        node?: CategoryNodeBean | CategoryNodeBean[];
      }
    ): void;
  }>();

  const modelValue = defineModel<string | string[] | undefined>();
  const treeOptions = ref<Array<{ label: string; value: string; children?: any[]; raw: any }>>([]);

  const disabledSet = computed(() => {
    const set = new Set<string>();
    (props.disabledCategoryCodes || []).forEach((code) => {
      if (typeof code === 'string' && code) set.add(code);
    });
    return set;
  });

  const renderOptions = computed(() => {
    const mapDisabled = (list: any[]): any[] =>
      list.map((item) => ({
        ...item,
        disabled: disabledSet.value.has(item.value) || disabledSet.value.has(item.label),
        children: item.children ? mapDisabled(item.children) : undefined,
      }));
    return mapDisabled(treeOptions.value);
  });

  const loading = ref(false);
  const treeProps = {
    label: 'label',
    value: 'value',
    children: 'children',
  };

  const mapNode = (node: CategoryNodeBean) => {
    const label = node.fullCategoryName || node.categoryName || '';
    const value = node.categoryCode || label;

    return {
      label,
      value,
      children: (node.children || []).map(mapNode),
      raw: node,
    };
  };

  const findNode = (value?: string) => {
    const stack = [...treeOptions.value];
    while (stack.length) {
      const current = stack.pop();
      if (current?.value === value) return current;
      if (current?.children?.length) {
        stack.push(...current.children);
      }
    }
    return undefined;
  };

  const findNodes = (values: string[]) => {
    const result: CategoryNodeBean[] = [];
    const valueSet = new Set(values);

    const traverse = (nodes: any[]) => {
      for (const node of nodes) {
        if (valueSet.has(node.value) && node.raw) {
          result.push(node.raw);
        }
        if (node.children) traverse(node.children);
      }
    };
    traverse(treeOptions.value);
    return result;
  };

  const handleChange = (val?: string | string[]) => {
    if (props.multiple) {
      const values = Array.isArray(val) ? val : val ? [val] : [];
      const nodes = findNodes(values);
      emit('change', values, nodes);
      emit('select', { value: values, label: '', node: nodes });
      return;
    }
    const node = findNode(val as string | undefined);
    emit('change', val as string | undefined, node?.raw);
    emit('select', { value: val, label: node?.label, node: node?.raw });
  };

  watch(
    () => props.multiple,
    (isMultiple) => {
      if (isMultiple) {
        if (!Array.isArray(modelValue.value)) {
          modelValue.value = modelValue.value ? [modelValue.value as string] : [];
        }
      } else {
        if (Array.isArray(modelValue.value)) {
          modelValue.value = modelValue.value[0] ?? undefined;
        }
      }
    },
    { immediate: true }
  );

  const cacheKey = '__purchase_category_cache__';
  const sharedCache =
    (globalThis as any)[cacheKey] ||
    ((globalThis as any)[cacheKey] = {
      options: [] as any[],
      promise: null as Promise<void> | null,
    });

  const ensureCategories = async () => {
    if (sharedCache.options.length) {
      treeOptions.value = sharedCache.options;
      return;
    }
    if (sharedCache.promise) {
      loading.value = true;
      await sharedCache.promise;
      loading.value = false;
      treeOptions.value = sharedCache.options;
      return;
    }
    loading.value = true;
    sharedCache.promise = platformApi
      .platformDemandPurchaseCategoryTree()
      .then((res) => {
        const mapped = (res.categoryList || []).map(mapNode);
        mapped.push({ label: '其它', value: '0', children: [], raw: null });
        sharedCache.options = mapped;
        treeOptions.value = sharedCache.options;
      })
      .finally(() => {
        loading.value = false;
        sharedCache.promise = null;
      });
    await sharedCache.promise;
  };

  onMounted(() => {
    ensureCategories();
  });
</script>

<style lang="scss">
  :global(.product-line-category-select .el-tree-select__popper .el-select-dropdown__item) {
    height: fit-content;
  }
</style>
