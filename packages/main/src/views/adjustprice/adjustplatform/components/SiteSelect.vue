<template>
  <el-select
    v-model="siteCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
  >
    <el-option
      v-for="item in siteMap"
      :key="item.siteId"
      :label="item.siteName"
      :value="item.siteId?.toString()"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { priceApi } from '@/api';

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
    const res = await priceApi.luteosPriceSiteQueryAsinSiteList();
    siteMap.value = res?.siteList || [];
  };
  getSiteOptions();
</script>

<style scoped lang="scss"></style>
