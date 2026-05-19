<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="跟踪号" prop="trackingNumber">
        <el-input v-model="form.trackingNumber" placeholder="请输入跟踪号" clearable />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button @click="handleConfirm">确认</el-button>
      <el-button type="primary" @click="handleConfirmAndMark">确认并标发</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';

  interface Props {
    title?: string;
    width?: string | number;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '上传跟踪号',
    width: '500px',
    closeOnClickModal: false,
    closeOnPressEscape: true,
  });

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'confirm', data: { trackingNumber: string; markShipped: boolean; code: string }): void;
  }>();

  const formRef = ref<FormInstance>();
  const form = ref<{
    trackingNumber: string;
    code: string;
  }>({
    trackingNumber: '',
    code: '',
  });

  const rules = reactive<FormRules>({
    trackingNumber: [{ required: true, message: '请输入跟踪号', trigger: ['blur', 'change'] }],
  });

  const visible = ref(false);

  const open = (initialValue?: string, code?: string) => {
    reset();
    form.value.trackingNumber = initialValue || '';
    form.value.code = code || '';
    visible.value = true;
  };
  const reset = () => {
    form.value.trackingNumber = '';
    form.value.code = '';
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };
  const close = () => {
    visible.value = false;
    reset();
  };

  const handleClose = () => {
    close();
    emit('close');
  };

  const validateAndEmit = async (markShipped: boolean) => {
    if (!formRef.value) return;
    const isValid = await formRef.value.validate().catch(() => {
      return false;
    });
    console.log(`${isValid}`, isValid);
    if (!isValid) return;
    const trackingNumber = form.value.trackingNumber.trim();
    if (!trackingNumber) {
      ElMessage.warning('跟踪号不能为空');
      return;
    }
    emit('confirm', {
      trackingNumber,
      code: form.value.code,
      markShipped,
    });
    close();
  };

  const handleConfirm = () => {
    validateAndEmit(false);
  };

  const handleConfirmAndMark = () => {
    validateAndEmit(true);
  };

  defineExpose({
    open,
    close,
  });
</script>

<style lang="scss" scoped></style>
