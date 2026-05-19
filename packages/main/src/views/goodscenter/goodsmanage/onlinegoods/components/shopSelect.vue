<template>
  <el-select
    v-model="shopCode"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    :teleported="false"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option v-for="item in shopMap" :key="item.value" :label="item.desc" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
  import { shopApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      platform?: string;
    }>(),
    {
      placeholder: '店铺',
      clearable: false,
    }
  );
  const shopCode = ref<string>('');
  const shopMap = ref<any[]>([]);
  const getShopOptions = async () => {
    const res = await shopApi.luteosShopSelectShopList({
      platform: props.platform,
    });
    shopMap.value = res || [];
  };
  getShopOptions();
</script>

<style scoped lang="scss"></style>
