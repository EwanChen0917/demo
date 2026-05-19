<template>
  <LuteTable
    ref="EleTableRef"
    v-bind="$attrs"
    :tableData="tableData"
    :columns="tableColums"
    :pageInfo="pageInfo"
  />
</template>
<script lang="ts" setup>
  //   import { LuteTable } from 'lute_quark';
  import LuteTable from '@/packages/table';

  import { columns } from './tableColumn';
  defineProps<{
    tableData: any[];
    pageInfo: pageInfoItf;
  }>();
  const state = reactive<{
    tableColums: any[];
  }>({
    tableColums: []
  });
  const { tableColums } = toRefs(state);

  tableColums.value = [...columns];

  const EleTableRef = ref();
  defineExpose({ EleTableRef });
</script>
<style lang="scss" scoped></style>
