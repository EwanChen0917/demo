<template>
  <el-select
    v-model="gtmCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    @change="$emit('change', gtmCode)"
  >
    <el-option
      v-for="item in gtmList"
      :key="item.deptId"
      :label="item.deptName"
      :value="item.deptId"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';

  withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      parentId?: string | number;
    }>(),
    {
      placeholder: 'GTM组',
      clearable: false,
      multiple: false,
      parentId: 662388969,
    }
  );

  const gtmCode = ref<string>('');
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };
  queryGtmList();
</script>

<style scoped lang="scss"></style>
