<template>
  <el-select
    v-model="modelValue"
    :placeholder="placeholder"
    :disabled="disabled || (requireCategory && !categoryCode)"
    :clearable="clearable"
    :filterable="filterable"
    :teleported="teleported"
    :loading="loading"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    style="width: 100%"
    @change="handleChange"
  >
    <el-option
      v-for="item in materialOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="isDisabled(item.value)"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import type { DemandPurchaseMaterialBean } from '@/api/platform/data-contracts';

  const props = withDefaults(
    defineProps<{
      categoryCode?: string;
      placeholder?: string;
      disabled?: boolean;
      clearable?: boolean;
      filterable?: boolean;
      teleported?: boolean;
      multiple?: boolean;
      requireCategory?: boolean;
      disabledMaterialCodes?: string[];
    }>(),
    {
      placeholder: '请选择采购产品',
      disabled: false,
      clearable: true,
      filterable: true,
      teleported: false,
      multiple: false,
      requireCategory: true,
      disabledMaterialCodes: () => [],
    }
  );

  const emit = defineEmits<{
    (
      e: 'change',
      value?: string | string[],
      material?: DemandPurchaseMaterialBean | DemandPurchaseMaterialBean[]
    ): void;
    (
      e: 'select',
      payload: {
        value?: string | string[];
        label?: string;
        material?: DemandPurchaseMaterialBean | DemandPurchaseMaterialBean[];
      }
    ): void;
  }>();

  const modelValue = defineModel<string | string[] | undefined>();
  const materialOptions = ref<
    Array<{ value: string; label: string; raw: DemandPurchaseMaterialBean }>
  >([]);
  const loading = ref(false);
  const disabledSet = computed(() => {
    const set = new Set<string>();
    (props.disabledMaterialCodes || []).forEach((code) => {
      if (typeof code === 'string' && code) set.add(code);
    });
    return set;
  });
  const isDisabled = (code?: string) => (code ? disabledSet.value.has(code) : false);

  const formatLabel = (item: DemandPurchaseMaterialBean) => {
    const name = item.materialName || '';
    const number = item.materialNumber || '';
    if (name && number) return `${name}`;
    return name || number || '';
  };

  const fetchMaterialList = async (code?: string) => {
    if (!code && props.requireCategory) {
      materialOptions.value = [];
      return;
    }
    loading.value = true;
    try {
      const res = await platformApi.platformDemandPurchaseMaterialList({
        categoryCode: code,
      });
      materialOptions.value =
        res.materialList?.map((item) => ({
          value: item.materialNumber || '',
          label: item.materialName || '',
          raw: item,
        })) || [];
    } finally {
      loading.value = false;
    }
  };

  const findMaterial = (value?: string) => {
    return materialOptions.value.find((item) => item.value === value);
  };

  const findMaterials = (values: string[]) => {
    const map = new Map(materialOptions.value.map((m) => [m.value, m.raw]));
    return values.map((val) => map.get(val)).filter(Boolean) as DemandPurchaseMaterialBean[];
  };

  const handleChange = (val?: string | string[]) => {
    if (props.multiple) {
      const values = Array.isArray(val) ? val : [];
      const materials = findMaterials(values);
      emit('change', values, materials);
      emit('select', { value: values, label: '', material: materials });
      return;
    }
    const option = findMaterial(val as string | undefined);
    emit('change', val as string | undefined, option?.raw);
    emit('select', { value: val, label: option?.label, material: option?.raw });
  };

  const lastCategoryCode = ref<string | undefined>();

  watch(
    () => props.categoryCode,
    (code) => {
      if (lastCategoryCode.value !== undefined && code !== lastCategoryCode.value) {
        modelValue.value = props.multiple ? [] : undefined;
      }
      lastCategoryCode.value = code;
      fetchMaterialList(code);
    },
    { immediate: true }
  );

  onMounted(() => {
    if (!props.requireCategory) {
      fetchMaterialList(undefined);
    }
  });
</script>
