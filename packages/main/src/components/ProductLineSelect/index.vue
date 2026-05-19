<template>
  <el-select
    v-model="lineCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    @change="$emit('change', lineCode)"
  >
    <el-option
      v-for="item in lineMap"
      :key="item.code"
      :label="item.productLine"
      :value="item.code"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
    }>(),
    {
      placeholder: '产品品线',
      clearable: false,
      multiple: false,
    }
  );

  const lineCode = ref<string>('');
  const lineMap = ref<any[]>([]);
  const getLineOptions = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    lineMap.value = res?.recordList || [];
  };
  getLineOptions();
</script>

<style scoped lang="scss"></style>
