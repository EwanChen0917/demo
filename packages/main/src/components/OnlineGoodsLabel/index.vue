<template>
  <el-select
    v-model="labelCode"
    :placeholder="placeholder"
    :clearable="clearable"
    :allow-create="allowCreate"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in labelOptions"
      :key="item.tagCode"
      :label="item.tagDesc"
      :value="item.tagCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      allowCreate?: boolean;
      multiple?: boolean;
      platform: any;
    }>(),
    {
      placeholder: '标签',
      clearable: false,
      multiple: false,
    }
  );

  const labelCode = ref();
  const labelOptions = ref<any[]>([]);
  const getLabelOptions = async () => {
    const res = await productApi.luteosProductAmazonListingQueryTagV2({
      platform: props.platform,
    });
    labelOptions.value = res?.tagList || [];
  };
  getLabelOptions();
</script>

<style scoped lang="scss"></style>
