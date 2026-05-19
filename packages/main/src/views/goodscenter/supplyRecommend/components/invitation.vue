<template>
  <el-dialog
    :title="title"
    width="600px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="130px"
      label-position="right"
      style="height: 200px"
    >
      <el-row :gutter="20">
        <el-col :span="20" :offset="0">
          <el-form-item
            prop="supplierName"
            label="推荐供应商名称："
            :rules="[{ required: true, message: '请输入推荐供应商名称', trigger: ['blur'] }]"
          >
            <el-input v-model="form.supplierName" placeholder="请输入推荐供应商名称" />
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="0">
          <el-form-item
            prop="supplierEmail"
            label="供应商接收邮箱："
            :rules="[
              { required: true, message: '请输入供应商接收邮箱', trigger: ['blur'] },
              {
                required: true,
                message: '非法输入',
                trigger: ['blur'],
                pattern: emailRule,
              },
            ]"
          >
            <el-input v-model="form.supplierEmail" placeholder="请输入供应商接收邮箱" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          发送注册邀请
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import { emailRule } from '@/utils/rulesRegExp';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    supplierEmail: '2515092131@qq.com',
    supplierName: '测试推荐供应商',
  });
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      const res = await erpApi.luteosErpInviteSupplierSendEmail(form.value).catch(() => {
        saveLoading.value = false;
      });
      if (res) {
        ElMessage.success(`操作成功`);
        emit('success');
        handleFormCancel();
      }
      saveLoading.value = false;
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    visible.value = false;
  };
  const title = ref('推荐供应商');
  const open = () => {
    form.value = {
      supplierEmail: '',
      supplierName: '',
    };
    if (formRef.value) {
      formRef.value.resetFields();
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .el-textarea.is-disabled :deep(.el-textarea__inner) {
    color: var(--el-text-color-regular);
  }
</style>
