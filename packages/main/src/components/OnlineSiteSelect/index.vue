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
      :key="item.site"
      :label="item.site + ' - ' + item.siteName"
      :value="item.site"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  const props = withDefaults(
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
    const res = await platformApi.platformSiteInfo();
    siteMap.value = res?.siteInfoList || [];
  };
  getSiteOptions();
</script>

<style scoped lang="scss"></style>
