<template>
  <el-dialog title="新增模块" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="模块名称" prop="moduleDesc">
        <el-input v-model="form.moduleDesc" placeholder="请输入模块名称" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const loading = ref(false);

  const formRef = ref();
  const form = ref({
    moduleDesc: '',
  });

  const rules = reactive({
    moduleDesc: [{ required: true, message: '请输入模块名称', trigger: ['blur', 'change'] }],
  });

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      loading.value = true;
      await platformApi.platformSaveLabelModel({
        moduleDesc: form.value.moduleDesc,
      });
      ElMessage.success('新增成功');
      visible.value = false;
      emit('success');
    } finally {
      loading.value = false;
    }
  };

  const open = () => {
    visible.value = true;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
