<template>
  <el-dialog title="关闭原因" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form">
      <el-form-item
        label="关闭原因"
        prop="reason"
        :rules="[{ required: true, message: '请输入关闭原因', trigger: ['blur', 'change'] }]"
      >
        <el-input type="textarea" :rows="5" v-model="form.reason" placeholder="请输入关闭原因" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { productApi } from '@/api';

  const emits = defineEmits(['success']);
  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    reason: '',
  });
  const orderCode = ref('');

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductMallOperateOrder({
        orderCode: orderCode.value,
        operateType: 'close_order',
        reason: form.value.reason,
      });
      ElMessage.success('关闭成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (code) => {
    orderCode.value = code;
    formRef.value?.resetFields();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
