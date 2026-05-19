<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    filterable
    clearable
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item of operatorOptions"
      :label="item.name"
      :value="item.memberCode"
      :key="item.memberCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const props = defineProps<{
    placeholder?: string;
    teleported?: boolean;
  }>();

  const value = ref();
  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await productApi.luteosProductSupplySkuQuerySupplyPurchaserList();
    operatorOptions.value = res.memberList;
  };
  getOperatorOptions();
</script>

<style scoped lang="scss"></style>
