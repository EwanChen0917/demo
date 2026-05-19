<template>
  <div class="custom-select-table">
    <!-- 表格 -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="data"
      :row-key="rowKey"
      v-bind="tableProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="40"
        reserve-selection
        :selectable="selectableRow"
      />

      <!-- 动态列渲染 -->
      <el-table-column
        v-for="col in columns"
        :key="col.prop || col.label"
        v-bind="col"
      >
        <template v-if="col.slot" #default="scope">
          <slot :name="col.slot" v-bind="scope"></slot>
        </template>
        <template v-else-if="col.formatter" #default="{ row }">
          {{ col.formatter(row) }}
        </template>
      </el-table-column>

      <!-- 额外的操作列插槽 -->
      <template v-if="$slots.actions" #default="scope">
        <slot name="actions" v-bind="scope"></slot>
      </template>
    </el-table>

    <!-- 分页 -->
    <KeenPagination
      v-if="showPagination"
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import type { ElTable } from 'element-plus';

export interface ColumnConfig {
  prop?: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  slot?: string;
  formatter?: (row: any) => string | number;
  [key: string]: any;
}

interface Props {
  rowKey: string | ((row: any) => string | number);
  columns: ColumnConfig[];
  data: any[];
  total?: number;
  current?: number;
  pageSize?: number;
  loading?: boolean;
  showSelection?: boolean;
  showPagination?: boolean;
  maxSelection?: number;
  selectableRow?: (row: any, index: number) => boolean;
  tableProps?: Record<string, any>;
  pageSizeOption?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  showSelection: true,
  showPagination: true,
  loading: false,
  current: 1,
  pageSize: 10,
  total: 0,
  selectableRow: () => true,
  tableProps: () => ({}),
  pageSizeOption: () => [10, 20, 50, 100],
});

const emit = defineEmits<{
  (event: 'selection-change', selection: any[]): void;
  (event: 'update:current', page: number): void;
  (event: 'update:pageSize', size: number): void;
  (event: 'page-change', page: number): void;
  (event: 'size-change', size: number): void;
}>();

const tableRef = ref<InstanceType<typeof ElTable>>();
const selectedList = ref<any[]>([]);
const isSyncing = ref(false);

const getRowKey = (row: any): string | number => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row);
  }
  return row[props.rowKey];
};

function setSelectedRows() {
  nextTick(() => {
    const table = tableRef.value;
    const list = props.data ?? [];
    if (!table) return;

    isSyncing.value = true;

    list.forEach((item) => {
      const itemKey = getRowKey(item);
      const isSelected = selectedList.value.some(
        (selectedRow) => getRowKey(selectedRow) === itemKey
      );
      table.toggleRowSelection(item, isSelected);
    });

    isSyncing.value = false;
  });
}

watch(
  () => props.data,
  () => setSelectedRows(),
  { deep: true }
);

function handleSelectionChange(selection: any[]) {
  if (isSyncing.value) return;

  if (props.maxSelection && selection.length > props.maxSelection) {
    const table = tableRef.value;
    if (table) {
      const lastItem = selection[selection.length - 1];
      table.toggleRowSelection(lastItem, false);
    }
    return;
  }

  const list = props.data ?? [];
  const currentDataKeys = new Set(list.map((item) => getRowKey(item)));

  const preservedItems = selectedList.value.filter(
    (item) => !currentDataKeys.has(getRowKey(item))
  );

  const combined = [...preservedItems, ...selection];

  const uniqueMap = new Map<string | number, any>();
  combined.forEach((item) => {
    const key = getRowKey(item);
    uniqueMap.set(key, item);
  });

  selectedList.value = Array.from(uniqueMap.values());
  emit('selection-change', selectedList.value);
}

function handleCurrentChange(page: number) {
  emit('update:current', page);
  emit('page-change', page);
}

function handlePageSizeChange(size: number) {
  emit('update:pageSize', size);
  emit('size-change', size);
}

function getSelected() {
  return selectedList.value;
}

function setSelected(items: any[]) {
  selectedList.value = items ?? [];
  setSelectedRows();
}

function clearSelected() {
  selectedList.value = [];
  tableRef.value?.clearSelection();
}

function toggleRowSelection(row: any, selected: boolean) {
  tableRef.value?.toggleRowSelection(row, selected);
}

defineExpose({
  getSelected,
  setSelected,
  clearSelected,
  toggleRowSelection,
  tableRef,
});
</script>

<style scoped lang="scss">
.custom-select-table {
  width: 100%;
}
</style>
