<template>
  <el-table
    ref="tableRef"
    :data="data"
    v-loading="loading"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :size="size"
    :show-index="showIndex"
    :row-key="rowKey"
    :tree-props="treeProps"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="showSelection" type="selection" width="55" fixed reserve-selection />
    <el-table-column v-if="showIndex" type="index" label="序号" width="" align="center" fixed />
    <el-table-column
      v-for="col in computedColumns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :min-width="col.minWidth"
      :fixed="col.fixed"
      :align="col.align"
      :sortable="col.sortable === true ? 'custom' : col.sortable"
    >
      <template v-if="col.tips" #header>
        {{ col.label }}
        <el-tooltip placement="top">
          <template #content>
            <component :is="col.tips" />
          </template>
          <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)"></i>
        </el-tooltip>
      </template>
      <template
        v-if="col.slot || col.allowCopy || col.showOverflowTooltip"
        #default="{ row, column: cols, $index }"
      >
        <slot v-if="col.slot" :name="col.slot" :row="row" :column="cols" :index="$index"></slot>
        <template v-else>
          <OverflowTooltip
            :content="row[col.prop]"
            :line="2"
            :font-size="13"
            v-if="col.showOverflowTooltip && !col.allowCopy"
          />
          <span v-if="col.allowCopy && !col.showOverflowTooltip">
            {{ row[col.prop] }}
            <Copy :content="row[col.prop]" />
          </span>
          <span v-if="col.allowCopy && col.showOverflowTooltip" class="d-flex">
            <OverflowTooltip :content="row[col.prop]" :line="2" />
            <Copy :content="row[col.prop]" />
          </span>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  import { TableColumnCtx } from 'element-plus';

  export interface stockCloumns {
    prop: string;
    label: string;
    width?: number | string;
    minWidth?: number | string;
    fixed?: 'left' | 'right';
    align?: 'left' | 'right' | 'center';
    showOverflowTooltip?: boolean;
    allowCopy?: boolean;
    slot?: string;
    sortable?: boolean | 'custom';
    sortField?: string;
    tips?: any;
  }
  export interface stockTableProps {
    data: any[];
    columns: stockCloumns[];
    loading: boolean;
    height?: number | string;
    maxHeight?: number | string;
    stripe?: boolean;
    size?: 'large' | 'default' | 'small';
    showIndex?: boolean;
    showSelection?: boolean;
    rowKey?: string | ((row: any) => string);
    treeProps?: { children?: string; hasChildren?: string };
  }
  type stockTableSortOrder = 'asc' | 'desc' | null;
  interface stockTableEmits {
    (
      event: 'sortChange',
      data: {
        column: any;
        prop: string;
        order: string | null;
        sortField?: string;
        sortOrder?: stockTableSortOrder;
      }
    ): void;
    (event: 'selectionChange', selection: any[]): void;
  }
  const props = withDefaults(defineProps<stockTableProps>(), {
    data: () => [],
    columns: () => [],
    loading: false,
    stripe: false,
    showIndex: false,
    showSelection: false,
  });
  const emit = defineEmits<stockTableEmits>();
  const tableRef = ref();
  const computedColumns = computed(() => {
    return props.columns.map((col) => ({
      showOverflowTooltip: false,
      minWidth: 100,
      ...col,
    }));
  });
  const handleSortChange = (data: {
    column: TableColumnCtx<any>;
    prop: string;
    order: string | null;
  }) => {
    const { column, prop, order } = data;
    const columnConfig = props.columns.find((col) => col.prop === prop);
    if (!columnConfig) return;
    const sortField = columnConfig.sortField || prop;
    let sortOrder: stockTableSortOrder;
    if (order === 'ascending') {
      sortOrder = 'asc';
    } else if (order === 'descending') {
      sortOrder = 'desc';
    } else {
      sortOrder = null;
    }
    emit('sortChange', { column, prop, order, sortField, sortOrder });
  };
  const handleSelectionChange = (selection: any[]) => {
    emit('selectionChange', selection);
  };

  const clearSelection = () => {
    if (tableRef.value?.clearSelection) {
      tableRef.value.clearSelection();
    }
  };

  const clearSort = () => {
    if (tableRef.value?.clearSort) {
      tableRef.value.clearSort();
    }
  };
  const getCheckedRows = () => {
    return tableRef.value?.getSelectionRows?.();
  };
  defineExpose({
    clearSelection,
    clearSort,
    getCheckedRows,
  });
</script>

<style lang="scss" scoped></style>
