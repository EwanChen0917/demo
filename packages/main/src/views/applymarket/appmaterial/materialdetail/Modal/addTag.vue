<template>
  <el-dialog title="新增标签" :model-value="visible" @close="$emit('close')" align-center>
    <el-form :model="form" ref="formRef">
      <el-form-item
        prop="tag"
        label="标签名称："
        required
        :rules="[{ required: true, message: '请输入标签名称', trigger: ['blur'] }]"
      >
        <el-input v-model="form.tag" placeholder="请输入标签名称" />
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
  import { platformApi } from '@/api';

  defineProps<{
    visible: boolean;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive({
    tag: '',
  });

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await platformApi.platformLabelSaveLabelInfo({
        desc: form.tag,
        name: form.tag,
        labelType: 2,
        module: 'data_market',
      });
      ElMessage.success('添加成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>
