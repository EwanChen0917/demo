<template>
  <el-dialog v-model="visible" title="新建分类" top="30vh">
    <el-form :model="form" ref="formRef" label-position="top">
      <el-form-item label="分类名">
        <template #label>
          <div>分类名</div>
          <div class="el-form-item__info">新建分类默认排在最后</div>
        </template>
        <el-input
          v-model="form.labelName"
          :maxlength="10"
          placeholder="请输入分类名称(限10个字符)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save" :loading="loading">创建</el-button>
      <el-button @click="visible = false" :disable="loading">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { platformApi } from '@/api';
  import { ElMessage, type FormInstance } from 'element-plus';

  const emit = defineEmits<{
    (e: 'success', data: any): void;
  }>();
  const visible = ref(false);
  const form = reactive({
    labelName: '',
  });
  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate();
    if (valid) {
      loading.value = true;
      const res = await platformApi
        .platformLabelSaveLabelInfo({
          name: form.labelName,
          module: 'lute_agent',
        })
        .finally(() => {
          loading.value = false;
        });
      if (res) {
        ElMessage.success('创建成功');
        visible.value = false;
        emit('success', res);
      }
    }
  };
  const open = () => {
    visible.value = true;
  };
  defineExpose({ open });
</script>

<style lang="scss" scoped>
  .el-form-item__info {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
</style>
