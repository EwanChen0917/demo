<template>
  <el-dialog title="更改绑定单号" v-model="visible">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <!-- <el-form-item label="来源系统" prop="systemTypeDesc">
        <span>{{ form.systemTypeDesc }}</span>
      </el-form-item> -->
      <el-form-item label="当前绑定单号" prop="sourceOrderCode">
        <span>{{ form.sourceOrderCode || '-' }}</span>
      </el-form-item>
      <el-form-item label="新绑定单号" prop="targetOrderCode">
        <el-input v-model="form.targetOrderCode" maxlength="100" show-word-limit />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="ChangeBindModal">
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';

  enum SystemTypeEnum {
    'systemSaleCode' = 4,
    'serviceCode' = 2,
    'systemCode' = 2,
  }
  const visible = ref(false);
  const emit = defineEmits<{
    (event: 'success'): void;
  }>();
  const formRef = ref<any>(null);
  const form = ref({
    erpCode: '',
    sourceOrderCode: '',
    targetOrderCode: '',
    // systemTypeDesc: '',
    systemType: undefined,
  });
  const rules = ref({
    targetOrderCode: [{ required: true, message: '请输入新绑定单号', trigger: 'blur' }],
  });

  const loading = ref(false);
  const handleSubmit = () => {
    formRef.value
      .validate(async (valid) => {
        if (valid) {
          try {
            loading.value = true;
            await erpApi.luteosErpWarehouseOrderUnbindOrderNo(form.value);
            ElMessage.success('操作成功');
            visible.value = false;
            emit('success');
          } finally {
            loading.value = false;
            formRef.value.resetFields();
          }
        }
      })
      .catch(() => false);
  };
  const open = (row) => {
    const { systemType, saleCode } = row;
    form.value = {
      erpCode: saleCode || '',
      sourceOrderCode: row[SystemTypeEnum[systemType]],
      systemType,
      targetOrderCode: '',
    };
    visible.value = true;
  };
  defineExpose({
    open,
  });
</script>
