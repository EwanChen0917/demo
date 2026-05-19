<template>
  <el-dialog v-model="visible" title="保存视图" width="30%" @close="visible = false">
    <div>
      <el-input v-model="viewData.viewName" placeholder="请输入视图名称" />
    </div>
    <div class="mt-2">
      <el-checkbox v-model="viewData.isDefault">设为默认视图</el-checkbox>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';

  type SearchView = {
    id: number | string;
    name: string;
    isDefault: boolean;
  };

  const props = defineProps<{
    viewList: SearchView[];
  }>();

  const emit = defineEmits<{
    (e: 'saveViewSuccess', view: SearchView, isEdit?: boolean): void;
  }>();

  const visible = ref(false);
  const viewData = ref({
    id: '',
    viewName: '',
    isDefault: false,
  });

  const open = (item?: SearchView) => {
    viewData.value.id = item?.id ? String(item.id) : '';
    viewData.value.viewName = item?.name || '';
    viewData.value.isDefault = item?.isDefault || false;
    visible.value = true;
  };

  const handleSave = () => {
    const name = viewData.value.viewName.trim();
    if (!name) {
      ElMessage.error('视图名称不能为空');
      return;
    }

    const duplicate = props.viewList.some((item) => {
      return item.name === name && String(item.id) !== viewData.value.id;
    });
    if (duplicate) {
      ElMessage.error('视图名称已存在，请更换名称');
      return;
    }

    if (viewData.value.id) {
      emit(
        'saveViewSuccess',
        {
          id: viewData.value.id,
          name,
          isDefault: viewData.value.isDefault,
        },
        true
      );
    } else {
      emit('saveViewSuccess', {
        id: Date.now(),
        name,
        isDefault: viewData.value.isDefault,
      });
    }

    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>
