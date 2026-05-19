<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" label-position="left">
    <el-form :model="form" ref="formRef" label-width="80">
      <el-form-item label="编码：" required v-if="title == '编辑品线'">
        <el-input v-model="form.gtmPlCode" :disabled="title == '编辑品线'" />
      </el-form-item>
      <el-form-item label="名称：" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { gtmApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    gtmPlCode: string;
    title: string;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    gtmPlCode: '',
    name: '',
  });

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();
  const detailData = async () => {
    if (props.title == '编辑品线') {
      const res = await gtmApi.luteosGtmPlQueryDetail({ gtmPlCode: props.gtmPlCode });
      form.value.gtmPlCode = res.gtmPlCode;
      form.value.name = res.name;
    } else {
      form.value.gtmPlCode = '';
      form.value.name = '';
    }
  };
  detailData();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      // TODO 调接口
      await gtmApi.luteosGtmPlSaveOrUpdate({ ...form.value });
      const text = props.title == '编辑品线' ? '编辑成功' : '新增成功';
      ElMessage.success(text);
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>
