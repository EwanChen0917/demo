<template>
  <el-dialog :title="modalTitle" v-model="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
      :disabled="status === 'view'"
    >
      <el-form-item
        label="编码"
        prop="code"
        :rules="[{ required: true, message: '编码不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.code" placeholder="请输入编码" clearable />
      </el-form-item>

      <el-form-item
        label="名称"
        prop="name"
        :rules="[{ required: true, message: '名称不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="使用场景说明" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="输入描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          :disabled="status === 'view'"
          type="primary"
          @click="submitFn"
          :loading="saveLoading"
        >
          保存
        </el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { BusinessDictItemBean } from '@/api/finance/data-contracts';
  import { financeApi } from '@/api/index';
  import { ElMessage, type FormInstance } from 'element-plus';

  const props = defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const visible = ref(false);
  const status = ref('');
  const statusDesc = computed(() => {
    switch (status.value) {
      case 'add':
        return '新增';
      case 'edit':
        return '编辑';
      case 'view':
        return '查看';
      default:
        return '';
    }
  });
  const modalTitle = computed(() => `${props.title}-${statusDesc.value}`);

  const formRef = ref<FormInstance>();
  const form: any = reactive({
    id: undefined as unknown as number,
    code: '',
    name: '',
    remark: '',
  });

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value
      ?.validate((isValid) => {
        if (isValid) {
          saveLoading.value = true;
          financeApi
            .luteosFinanceBusinessDictItemSave({
              ...form,
            })
            .then(() => {
              ElMessage.success('保存成功');
              visible.value = false;
              emit('closeModal', 'reload');
            })
            .finally(() => {
              saveLoading.value = false;
            });
        }
      })
      .catch(() => false);
  };

  const handleClose = () => {
    visible.value = false;
    emit('closeModal');
  };
  const open = (data: BusinessDictItemBean, s: 'edit' | 'add' | 'view') => {
    visible.value = true;
    status.value = s;
    formRef.value?.resetFields();
    if (data.id) {
      Object.assign(form, data);
    } else {
      // dictId一直都要存在
      Object.assign(
        form,
        {
          id: undefined,
          code: '',
          name: '',
          remark: '',
        },
        data
      );
    }
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
