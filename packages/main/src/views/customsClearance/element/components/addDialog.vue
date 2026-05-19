<template>
  <el-dialog :title="title" :model-value="visibility" @close="close" label-position="left">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="140">
      <el-form-item label="海关编码：" prop="declarationCode">
        <el-input v-model="form.declarationCode" />
      </el-form-item>
      <el-form-item label="报关要素：" prop="declarationElement">
        <el-input v-model="form.declarationElement" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="form.remark" type="textarea" :rows="5" />
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
  import { erpApi } from '@/api';

  const props = defineProps<{
    id: number | string;
    visibility: boolean;
  }>();
  const title = ref('新增报关要素');
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    declarationCode: '',
    declarationElement: '',
    remark: '',
  });
  const rules = ref({
    declarationCode: [{ required: true, message: '请输入海关编码', trigger: ['blur'] }],
    declarationElement: [{ required: true, message: '请输入报关要素', trigger: ['blur'] }],
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
      // TODO 调接口
      await erpApi.luteosErpCustomsSaveOrUpdateElement({ ...form.value });
      const text = props.id ? '编辑成功' : '新增成功';
      ElMessage.success(text);
      emit('success');
      close();
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    close();
  };
  const getDetailData = async () => {
    if (props.id) {
      title.value = '编辑报关要素';
      const res = await erpApi.luteosErpCustomsQueryElementDetail({ id: props.id });
      if (res) {
        form.value = res.detailBean;
      }
    } else {
      title.value = '新增报关要素';
    }
  };
  getDetailData();
  const close = () => {
    emit('close');
  };
  defineExpose({ open });
</script>
