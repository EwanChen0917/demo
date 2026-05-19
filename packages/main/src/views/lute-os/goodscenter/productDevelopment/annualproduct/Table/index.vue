<template>
  <LuteTable
    ref="EleTableRef"
    v-bind="$attrs"
    row-key="productCode"
    :tableData="tableData"
    :columns="tableColumns"
    :pageInfo="pageInfo"
    @selection-change="handleSelectionChange"
  />
</template>

<script lang="ts" setup>
  import LuteTable from '@/packages/table';

  import { columns, sendEmit } from './tableColumn';

  defineProps<{
    tableData: any[];
    pageInfo: pageInfoItf;
  }>();
  const state = reactive<{
    tableColumns: any[];
  }>({
    tableColumns: [],
  });
  const { tableColumns } = toRefs(state);
  tableColumns.value = [...columns];

  const EleTableRef = ref();
  defineExpose({ EleTableRef });
  const emit = defineEmits<{
    (event: 'tableBtnAction', type: string, data: any): void;
    (event: 'selectionChange', data: any): void;
  }>();

  const handleSelectionChange = (val) => {
    emit('selectionChange', val);
  };

  onMounted(() => {
    sendEmit(emit);
  });
</script>

<style lang="scss" scoped></style>
