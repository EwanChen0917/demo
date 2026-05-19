<template>
  <RtTable
    ref="EleTableRef"
    v-bind="$attrs"
    :tableData="tableData"
    :columns="tableColums"
    :pageInfo="pageInfo"
  />
</template>
<script lang="ts" setup>
  import { columns, sendEmit } from './tableColumn';
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
  const emit = defineEmits<{
    (event: 'tableBtnAction', type: string, data: any): void;
  }>();

  onMounted(() => {
    sendEmit(emit);
  });
</script>
<style lang="scss" scoped></style>
