<!-- 搜索视图弹窗 -->
<template>
  <el-dialog v-model="visible" title="保存视图" width="30%" @close="visible = false">
    <div><el-input v-model="viewData.viewName" placeholder="请输入视图名称" /></div>
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
  import { useCache } from '@/hooks/web/useCache';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    searchValue: any;
  }>();

  const visible = ref(false);
  const viewData = ref({
    id: '',
    viewName: '',
    isDefault: false,
  });

  const emit = defineEmits(['saveViewSuccess']);

  const { wsCache } = useCache('localStorage');

  const open = (item: any) => {
    // 如果是编辑视图，设置默认值
    viewData.value.viewName = item?.name || '';
    viewData.value.id = item?.id || '';
    viewData.value.isDefault = item?.isDefault || false;
    visible.value = true;
    // 获取缓存中的视图列表
  };

  const handleSave = () => {
    if (!viewData.value.viewName) {
      ElMessage.error('视图名称不能为空');
      return;
    }
    const viewList = wsCache.get('adjustSearchViewList') || [];
    // 检查视图名称是否已存在
    if (viewList.some((item: any) => item.name === viewData.value.viewName)) {
      ElMessage.error('视图名称已存在，请更换名称');
      return;
    }
    // 检查是否已存在同名视图
    const existingView = viewList.find((item: any) => item.id === viewData.value.id);

    // 编辑视图，更新缓存
    if (existingView) {
      // 更新缓存中id匹配的项
      emit(
        'saveViewSuccess',
        {
          ...existingView,
          name: viewData.value.viewName,
          isDefault: viewData.value.isDefault,
        },
        true
      );
    } else {
      const newView = {
        name: viewData.value.viewName,
        id: Date.now(), // 使用时间戳作为唯一ID
        isDefault: viewData.value.isDefault, // 是否设为默认视图
      };

      emit('saveViewSuccess', newView);
      // 清空输入框
      viewData.value.viewName = '';
    }
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>
