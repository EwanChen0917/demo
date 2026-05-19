<!-- 搜索视图弹窗 -->
<template>
  <el-dialog
    v-model="visible"
    title="保存视图"
    :width="480"
    align-center
    @close="visible = false"
    destroy-on-close
  >
    <el-form ref="formRef" :model="viewData" label-position="top" require-asterisk-position="right">
      <el-form-item label="视图名称" prop="viewName" :rules="viewNameRules">
        <el-input v-model="viewData.viewName" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-checkbox :true-value="1" :false-value="0" v-model="viewData.isDefault">
          设为默认视图
        </el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { type PlatformContracts } from '@/api';

  const visible = ref(false);
  const viewData = reactive({
    id: undefined,
    viewName: '',
    isDefault: 0,
  });
  let viewList: Array<PlatformContracts.SearchConditionBean> = [];
  const emit = defineEmits(['saveView']);
  const viewNameRules = [
    { required: true, message: '视图名称不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '视图名称长度必须在 1-50 字符之间', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (viewList.some((item: any) => item.conditionName === value)) {
          callback(new Error('视图名称已存在，请更换名称'));
        } else {
          callback();
        }
      },
    },
  ];
  const open = (payload: any) => {
    // 如果是编辑视图，设置默认值
    viewData.viewName = payload?.conditionName || '';
    viewData.id = payload?.conditionCode || undefined;
    viewData.isDefault = payload?.isDefault || 0;
    viewList = payload?.viewList || [];
    visible.value = true;
  };
  const formRef = ref();
  const handleSave = async () => {
    const valid = await formRef.value.validate();
    if (!valid) return;

    // 更新缓存中id匹配的项
    emit('saveView', {
      name: viewData.viewName,
      isDefault: viewData.isDefault,
      code: viewData.id,
    });
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>
