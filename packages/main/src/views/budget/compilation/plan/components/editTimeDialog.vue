<template>
  <el-dialog :title="title" :model-value="visibility" @close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100">
      <el-form-item label="推迟天数：" prop="delayDays">
        <NumberInput
          v-model="form.delayDays"
          :precision="0"
          :min="1"
          :max="9999999999"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="变更原因：" prop="changeReason">
        <el-input type="textarea" :rows="3" v-model="form.changeReason" :maxlength="200" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { budgetApi } from '@/api';
  import * as swal from '@/utils/swal';

  const title = ref('上报时间-变更');
  const schemeCode = ref('');
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    delayDays: null,
    changeReason: null,
  });
  const rules = ref({
    delayDays: [{ required: true, message: '请输入延迟天数', trigger: ['blur'] }],
  });
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const confirm = await swal.confirm('是否确认变更上报时间？');
      if (confirm) {
        await budgetApi.financeBudgetSchemeChangeReportTime({
          delayDays: form.value.delayDays,
          changeReason: form.value.changeReason,
          schemeCodeList: schemeCode.value,
        });
        ElMessage.success('上报时间变更成功');
        emit('success');
        close();
      }
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    close();
  };
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const open = async (ids) => {
    if (ids) {
      form.value.delayDays = null;
      form.value.changeReason = null;
      schemeCode.value = ids;
      visibility.value = true;
    }
  };
  defineExpose({ open });
</script>
