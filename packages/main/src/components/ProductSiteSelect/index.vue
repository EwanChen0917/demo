<template>
  <el-select
    v-model="siteCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in siteMap"
      :key="item.value"
      :label="`${item.value} - ${item.desc}`"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
    }>(),
    {
      placeholder: '站点',
      clearable: false,
      multiple: false,
    }
  );

  const siteCode = ref<string>('');
  const siteMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['product_site'],
    });
    siteMap.value = res?.dictMap?.product_site || [];
  };
  getSiteOptions();
</script>

<style scoped lang="scss"></style>
