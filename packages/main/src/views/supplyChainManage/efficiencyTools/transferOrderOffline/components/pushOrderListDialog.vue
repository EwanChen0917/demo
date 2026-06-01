<template>
  <el-dialog title="推送计划单" v-model="visible">
    <el-input
      v-model="form.inputValue"
      placeholder="请输入调拨单号，用逗号分割。例如：TF2601090272、TF260190270。已生成的计划单将同步发货单最新信息"
      type="textarea"
      :rows="5"
    />
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { ElMessage } from 'element-plus';

  interface Props {}
  const props = defineProps<Props>();
  const visible = ref(false);
  const form = reactive({
    inputValue: '',
  });
  const formRef = ref();
  const emit = defineEmits<{
    (event: 'success'): void;
  }>();
  const rules = reactive({
    inputValue: [{ required: true, message: '请输入调拨单号', trigger: 'blur' }],
  });
  const cancel = () => {
    reset();
    visible.value = false;
  };
  const confirm = () => {
    submit();
  };
  const submit = async () => {
    try {
      const res = await omsApi.omsTransferPushXy({
        codeList: form.inputValue.split(',').map((item) => item.trim()),
      });

      const result = res || {};
      const successList = result.successList || [];
      const failList = result.failList || [];

      const hasSuccess = successList.length > 0;
      const hasFail = failList.length > 0;
      if (hasSuccess && !hasFail) {
        ElMessage.success(`推送成功，共${successList.length}条`);
        emit('success');
        cancel();
      } else if (!hasSuccess && hasFail) {
        const failMessages = failList
          .map((item) => `${item.orderCode}: ${item.message}`)
          .join('；');
        ElMessage.error(`推送失败，共${failList.length}条。${failMessages}`);
      } else if (hasSuccess && hasFail) {
        const failMessages = failList
          .map((item) => `${item.orderCode}: ${item.message}`)
          .join('；');
        ElMessage.warning(
          `部分推送成功：成功${successList.length}条，失败${failList.length}条。失败详情：${failMessages}`
        );
        emit('success');
        cancel();
      } else {
        ElMessage.warning('未返回处理结果');
      }
    } catch (e) {
      console.log(e);
      ElMessage.error('推送失败');
    }
  };
  const reset = () => {
    form.inputValue = '';
    formRef.value?.resetFields();
  };
  const open = () => {
    visible.value = true;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
