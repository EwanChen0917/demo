<template>
  <el-dialog title="评价" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="请填写评价" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入" type="textarea" :rows="5" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { knowledgeApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);

  const formRef = ref(null);
  const form = ref({});

  const rules = reactive({
    remark: [{ required: true, message: '请输入评价', trigger: ['blur', 'change'] }],
  });

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await knowledgeApi.luteosKnowledgeEvaluate(form.value);
      ElMessage.success(`提交成功`);
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    form.value.taskCode = row.taskCode;
    form.value.remark = row.remark;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
