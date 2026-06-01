<template>
  <el-dialog title="修改密码" :model-value="visible" @close="handleClose" width="25%">
    <el-form v-if="!modifypwdSuc" ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="修改登录密码" prop="password" required>
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
    <template #footer v-if="!modifypwdSuc">
      <span class="dialog-footer">
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          确认修改
        </el-button>
        <el-button @click="handleFormCancel">取消</el-button>
      </span>
    </template>
    <template v-if="modifypwdSuc">
      <div class="pwd-tips">修改成功，最新密码为：{{ form.password }}</div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { userApi, UserApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  // import { fa } from 'element-plus/es/locale';

  defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const route = useRoute();
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<UserApi.LuteosUserChangePassword.RequestBody>({
    password: '',
    uid: '',
  });
  const rules = reactive<FormRules>({
    password: [
      {
        required: true,
        message: '请填写登录密码',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 提交操作
  const saveLoading = ref(false);
  const modifypwdSuc = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        const res: any = await userApi.luteosUserChangePassword({
          password: encryptByBase64(form.password),
          uid: route.query.uid,
        });
        if (res.password) {
          saveLoading.value = false;
          modifypwdSuc.value = true;
        }
      } catch (e) {
        saveLoading.value = false;
      }
    }
  };
  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };
  const handleClose = () => {
    modifypwdSuc.value = false;
    form.password = '';
    emit('close');
  };
</script>

<style scoped>
  .pwd-tips {
    margin-bottom: 20px;
  }
</style>
