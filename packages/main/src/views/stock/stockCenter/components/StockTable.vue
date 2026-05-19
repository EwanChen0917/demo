<template>
  <el-table
    ref="tableRef"
    :data="data"
    v-loading="loading"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :size="size"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <!-- 多选列 -->
    <el-table-column v-if="showSelection" type="selection" width="55" align="center" fixed />
    <!-- 序号列 -->
    <el-table-column v-if="showIndex" type="index" label="序号" width="55" align="center" fixed />

    <!-- 动态列 -->
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :fixed="column.fixed"
      :sortable="column.sortable === true ? 'custom' : column.sortable"
      :align="column.align || 'left'"
    >
      <!-- 自定义列内容 -->
      <template v-if="column.slot" #default="{ row, column: col, $index }">
        <slot :name="column.slot" :row="row" :column="col" :index="$index"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { TableColumnCtx } from 'element-plus';

  // ==================== 类型定义 ====================
  export interface StockTableColumn {
    prop: string;
    label: string;
    width?: string | number;
    minWidth?: string | number;
    fixed?: 'left' | 'right';
    sortable?: boolean | 'custom';
    align?: 'left' | 'center' | 'right';
    showOverflowTooltip?: boolean;
    slot?: string; // 自定义插槽名称
    sortField?: string; // 后端排序字段名，如果不设置则使用 prop
  }

  export interface StockTableProps {
    data: any[];
    columns: StockTableColumn[];
    loading?: boolean;
    height?: string | number;
    maxHeight?: string | number;
    stripe?: boolean;
    border?: boolean;
    size?: 'large' | 'default' | 'small' | '';
    showSelection?: boolean;
    showIndex?: boolean;
  }

  export interface StockTableEmits {
    (
      event: 'sortChange',
      data: {
        column: TableColumnCtx<any>;
        prop: string;
        order: string | null;
        sortField?: string; // 后端排序字段
        sortOrder?: 'asc' | 'desc'; // 后端排序方向
      }
    ): void;
    (event: 'selectionChange', selection: any[]): void;
  }

  // ==================== Props & Emits ====================
  const props = withDefaults(defineProps<StockTableProps>(), {
    data: () => [],
    columns: () => [],
    loading: false,
    stripe: false,
    border: true,
    size: '',
    showSelection: false,
    showIndex: false,
  });

  const emit = defineEmits<StockTableEmits>();

  const tableRef = ref<InstanceType<typeof import('element-plus').ElTable>>();

  function clearSort() {
    tableRef.value?.clearSort();
  }

  defineExpose({ clearSort });

  // ==================== 事件处理 ====================
  const handleSortChange = (data: {
    column: TableColumnCtx<any>;
    prop: string;
    order: string | null;
  }) => {
    // 找到对应的列配置
    const columnConfig = props.columns.find((col) => col.prop === data.prop);

    // 获取后端排序字段名，如果列配置中指定了 sortField 则使用，否则使用 prop
    const sortField = columnConfig?.sortField || data.prop;

    // 转换排序方向：ascending -> asc, descending -> desc, null -> undefined
    let sortOrder: 'asc' | 'desc' | undefined;
    if (data.order === 'ascending') {
      sortOrder = 'asc';
    } else if (data.order === 'descending') {
      sortOrder = 'desc';
    }

    emit('sortChange', {
      ...data,
      sortField: sortOrder ? sortField : undefined, // 只有有排序方向时才传递 sortField
      sortOrder,
    });
  };

  const handleSelectionChange = (selection: any[]) => {
    emit('selectionChange', selection);
  };
</script>

<style scoped lang="scss">
  .el-table {
    :deep(.el-table__header) {
      th {
        background-color: #fafafa;
        color: #606266;
      }
    }

    :deep(.el-table__row) {
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
</style>
