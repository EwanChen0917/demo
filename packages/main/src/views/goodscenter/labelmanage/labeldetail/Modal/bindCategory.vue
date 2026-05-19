<template>
  <el-dialog title="关联分类" width="75%" :model-value="visible" @close="$emit('close')">
    <KeenList
      @refresh="queryCategoryTree"
      @reset-search="queryCategoryTree"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-space>
          <el-input v-model="search.categoryName" placeholder="分类名称" @input="queryCategoryTree">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </el-space>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.categoryList"
        row-key="categoryCode"
        :tree-props="{
          hasChildren: 'hasChildren',
          children: 'children',
        }"
        class-name="table-row-dashed"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column prop="categoryName" label="分类名称" min-width="150">
          <template #default="{ row }">
            <span class="cursor-pointer">
              {{ row.categoryName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="分类等级">
          <template #default="scope">
            <span>{{ LEVEL_NAMES[scope.row.level - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span v-if="scope.row.status" class="badge badge-light-success">已生效</span>
            <span v-else class="badge badge-light-danger">未生效</span>
          </template>
        </el-table-column>
      </el-table>
    </KeenList>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          关联分类
        </el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { productApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { CategoryConnectBean } from '@/api/product/data-contracts';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  // 常量
  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];

  const props = defineProps<{
    tagCode: string;
    visible: boolean;
    selectedRows: CategoryConnectBean[];
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const tableRef = ref<InstanceType<typeof ElTableType>>();

  const listData = ref({
    categoryList: [],
  });
  const search = ref({
    categoryName: undefined,
    tagCode: props.tagCode,
  });
  const queryCategoryTree = async () => {
    listData.value = await productApi.luteosProductCategoryQueryCategoryTree({
      categoryName: search.value.categoryName,
      tagCode: search.value.tagCode,
    });
  };

  // 表格选择
  // 处理单行勾选事件
  const handleSelect = (selection, row) => {
    if (row.children && row.children.length > 0) {
      toggleChildrenSelection(row, selection.includes(row));
    }
  };

  // 处理全选事件
  const handleSelectAll = (selection) => {
    listData.value?.categoryList?.forEach((row: any) => {
      if (row.children && row.children?.length > 0) {
        toggleChildrenSelection(row, selection.includes(row));
      }
    });
  };

  // 递归勾选或取消勾选子级
  const toggleChildrenSelection = (row, selected) => {
    if (row.children && row.children.length > 0) {
      row.children.forEach((child) => {
        toggleRowSelection(child, selected);
        toggleChildrenSelection(child, selected);
      });
    }
  };

  const setInitialSelection = async () => {
    await nextTick();
    // 清除之前的所有勾选（如果有的话）
    tableRef.value?.clearSelection();
    if (props.selectedRows && props.selectedRows.length > 0) {
      const selectedRows = props.selectedRows.map((row) => row.categoryCode);
      initDefaultSelectedRows(selectedRows);
    } else {
      initSelection();
    }
  };

  const initSelection = () => {
    const traverse = (rows) => {
      rows.forEach((row) => {
        if (row.selected) {
          toggleRowSelection(row, true);
        }
        if (row.children && row.children.length > 0) {
          traverse(row.children); // 递归遍历子节点
        }
      });
    };
    traverse(listData.value?.categoryList); // 从根节点开始遍历
  };

  const initDefaultSelectedRows = (list) => {
    const traverse = (rows) => {
      rows.forEach((row) => {
        if (list.includes(row.categoryCode)) {
          toggleRowSelection(row, true);
        } else {
          toggleRowSelection(row, false);
        }
        if (row.children && row.children.length > 0) {
          traverse(row.children); // 递归遍历子节点
        }
      });
    };
    traverse(listData.value?.categoryList); // 从根节点开始遍历
  };

  const toggleRowSelection = (row, selected) => {
    tableRef.value?.toggleRowSelection(row, selected);
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const list = tableRef.value?.getSelectionRows();
    if (list && list.length) {
      emit('close', true, list);
    } else {
      ElMessage.warning({
        message: '未选择分类',
        duration: 5 * 1000,
      });
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    if (tableRef.value?.getSelectionRows()?.length) {
      const isConfirmed = await swal.confirm('确认要取消关联分类吗？');
      if (!isConfirmed) return;
    }

    emit('close');
    resetModal();
  };

  // 重置
  const resetModal = () => {};

  onMounted(async () => {
    await queryCategoryTree();
    setInitialSelection();
  });
</script>
