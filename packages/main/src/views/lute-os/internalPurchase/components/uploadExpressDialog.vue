<template>
  <el-dialog width="750px" :title="title" :model-value="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="120px" :rules="rules" label-position="left">
      <el-form-item v-if="oldTrackingNum" label="原快递单号">
        <div style="word-break: break-word">{{ oldTrackingNum }}</div>
      </el-form-item>
      <el-form-item :label="oldTrackingNum ? '新快递单号' : '快递单号'" prop="trackingNum">
        <el-input
          v-model="form.trackingNum"
          placeholder="请输入快递单号，多个快递单号以','隔开"
          clearable
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const form = ref({
    trackingNum: '',
  });
  const formRef = ref();
  const rules = reactive({
    trackingNum: [
      { required: true, message: '请输入快递单号' },
      {
        pattern: /^([A-Z0-9]{5,20})(,[A-Z0-9]{5,20})*$/,
        message: '请输入正确格式的快递单号',
      },
    ],
  });

  const visible = ref(false);
  const emit = defineEmits(['success']);

  const orderCode = ref('');
  const title = ref('上传快递单号');
  const oldTrackingNum = ref('');
  const open = (code: string, trackingNum: string, label: string) => {
    orderCode.value = code;
    oldTrackingNum.value = trackingNum;
    title.value = label;
    formRef.value?.resetFields();
    visible.value = true;
  };

  const submit = async () => {
    formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        console.log(form.value);
        try {
          const res = await productApi.luteosProductMallOperateOrder({
            orderCode: orderCode.value,
            operateType: 'update_tracking_num',
            trackingNum: form.value.trackingNum,
          });
          ElMessage.success('上传成功');
          emit('success');
        } finally {
          visible.value = false;
        }
      }
    });
  };

  defineExpose({
    open,
  });
</script>
