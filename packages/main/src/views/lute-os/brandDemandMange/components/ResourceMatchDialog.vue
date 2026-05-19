<!-- ResourceTableDialog.vue -->
<template>
  <el-dialog v-model="dialogVisible" width="80%" :before-close="handleClose">
    <!-- #header 插槽: 用于自定义对话框的整个头部区域 -->
    <template #header>
      <slot name="header"></slot>
    </template>
    <el-table
      ref="tableRef"
      :data="tableData"
      :row-key="rowKey"
      border
      align="center"
      maxHeight="520"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选列: 根据模式和数据动态显示 -->
      <el-table-column
        v-if="tableData.length > 0 && mode === 'create'"
        type="selection"
        fixed="left"
        width="55"
        align="center"
        reserve-selection
      />
      <!-- 默认插槽: 用于父组件传入所有 el-table-column 定义 -->
      <slot></slot>
    </el-table>

    <!-- 分页组件 -->
    <KeenPagination
      :current="pageNum"
      :total="total"
      :pageSize="pageSize"
      :pageSizeOption="[10, 20, 50, 100]"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    />

    <!-- #footer 插槽: 用于自定义底部区域，并提供了一个默认实现 -->
    <template #footer>
      <slot name="footer">
        <span v-if="mode === 'create'" class="dialog-footer">
          <el-button type="primary" @click="confirmSelection">确认选择</el-button>
          <el-button @click="dialogVisible = false">不选了</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, watch, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';

  // --- Props Definition ---
  const props = defineProps({
    tableData: { type: Array, required: true },
    rowKey: { type: String, required: true }, // 必须指定row-key以支持跨页选择
    mode: { type: String, default: 'create' }, // 'create'模式显示选择框和按钮
    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    initialSelectionKeys: { type: Array, default: () => [] }, // 用于回显的已选项的key数组
    maxSelection: { type: Number, default: 10 }, // 最大可选数量
  });

  // --- Emits Definition ---
  const emit = defineEmits(['page-change', 'size-change', 'select', 'close']);

  // --- Component State ---
  const dialogVisible = defineModel('visible');
  const tableRef = ref(null);
  let selectionLock = false; // 防止因超选而连续触发警告的锁

  // --- Logic ---

  // 监听对话框的显示状态，用于处理数据回显
  watch(dialogVisible, (isVisible) => {
    if (isVisible) {
      nextTick(() => {
        updateSelection();
      });
    }
  });

  // 更新表格的选中状态
  const updateSelection = () => {
    tableRef.value?.clearSelection(); // 先清空当前页的所有选择
    if (Array.isArray(props.initialSelectionKeys) && props.initialSelectionKeys.length > 0) {
      console.log(props.initialSelectionKeys, 'props.initialSelectionKeys');

      props.tableData.forEach((row) => {
        console.log(props.rowKey);
        // 如果当前行的数据key存在于回显列表中，则选中它
        if (props.initialSelectionKeys.includes(row[props.rowKey])) {
          tableRef.value?.toggleRowSelection(row, true);
          console.log(row[props.rowKey], 'row[props.rowKey]');
        }
      });
    }
  };

  const handleClose = () => {
    dialogVisible.value = false;
    emit('close');
  };

  const handlePageChange = (page) => emit('page-change', page);
  const handlePageSizeChange = (size) => emit('size-change', size);

  const confirmSelection = () => {
    const selectedRows = tableRef.value.getSelectionRows();
    if (selectedRows.length > props.maxSelection) {
      ElMessage.warning(`最多选择${props.maxSelection}条`);
      return;
    }
    emit('select', selectedRows);
    dialogVisible.value = false;
  };

  const handleSelectionChange = (selection) => {
    console.log(selection);
    if (selection.length > props.maxSelection) {
      if (!selectionLock) {
        selectionLock = true;
        ElMessage.warning(`最多选择${props.maxSelection}条`);

        // 从后向前取消选择，直到数量符合要求
        const overSelectedRows = selection.slice(props.maxSelection);
        overSelectedRows.forEach((row) => {
          tableRef.value.toggleRowSelection(row, false);
        });

        // 稍微延迟后解锁，以避免在toggleRowSelection期间再次触发此事件
        setTimeout(() => {
          selectionLock = false;
        }, 300);
      }
    }
  };

  // 暴露 open 方法不再是最佳实践，使用 v-model 和 watch props 是更推荐的Vue3数据流模式
</script>

<style scoped>
  /* 确保固定列的层级正确 */
  :deep(.el-table__fixed),
  :deep(.el-table__fixed-right) {
    z-index: 1;
  }
  :deep(.el-scrollbar__bar.is-horizontal) {
    display: flex;
  }
</style>
