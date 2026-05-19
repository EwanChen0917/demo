<template>
  <el-select
    v-model="organization"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option v-for="item in organizationList" :label="item" :value="item" :key="item" />
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
      placeholder: '结算组织',
      clearable: false,
      multiple: false,
    }
  );

  const organization = ref<string>('');
  const organizationList = ref([]);
  const queryMap = async () => {
    const res = await platformApi.platformMappingQueryTargetEnums({
      mappingCode: 'finance_mapping_shop',
    });
    organizationList.value = res || [];
  };
  queryMap();
</script>

<style scoped lang="scss"></style>
