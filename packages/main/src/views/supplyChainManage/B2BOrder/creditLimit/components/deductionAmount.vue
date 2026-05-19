<template>
  <el-dialog title="客户额度调整" v-model="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item label="客户名称" required>
        <el-input v-model="form.customerName" disabled placeholder="请输入客户名称" clearable />
      </el-form-item>

      <el-form-item label="调整类型" required>
        <el-select v-model="form.operation" placeholder="调整类型" disabled>
          <el-option value="deduct_whole_credit" label="扣减" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="调整金额"
        prop="adjustAmount"
        :rules="[{ required: true, message: '调整金额不能为空', trigger: ['blur', 'change'] }]"
      >
        <NumberInput
          v-model="form.adjustAmount"
          :precision="0"
          :min="0"
          :max="999999999"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item
        label="调整原因"
        prop="remark"
        :rules="[{ required: true, message: '调整原因不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="5"
          maxlength="200"
          show-word-limit
          placeholder="输入调整原因"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api/index';
  import { ElMessage, type FormInstance } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';

  const store = useStore();
  const emit = defineEmits<{
    (event: 'closeModal'): void;
  }>();

  const visible = ref(false);
  const formRef = ref<FormInstance>();
  const form: any = ref({
    customerCode: '',
    referenceNo: '',
    customerName: '',
    operation: 'deduct_whole_credit',
    adjustAmount: undefined,
    currencyCode: '',
    remark: '',
    chargeAgainst: '',
    sourceSystem: 'ERP',
    operationDesc: '扣减整体额度',
    operatorCode: store.userInfo.memberCode,
  });

  const saveLoading = ref(false);
  const submitFn = async () => {
    formRef.value
      ?.validate((isValid) => {
        if (isValid) {
          saveLoading.value = true;
          erpApi
            .luteosErpCustomerCreditLimitOperation(form.value)
            .then(() => {
              ElMessage.success('保存成功');
              visible.value = false;
              emit('closeModal');
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
  };
  const open = (data?: any) => {
    form.value.customerName = data.customerName;
    form.value.customerCode = data.customerCode;
    form.value.currencyCode = data.currencyCode;
    form.value.referenceNo = Math.random().toString(36).substr(2, 10);
    visible.value = true;
    formRef.value?.resetFields();
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
