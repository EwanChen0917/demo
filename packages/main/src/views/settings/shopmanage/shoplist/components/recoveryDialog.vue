<template>
  <el-dialog title="回收标签" v-model="visibility" width="500px" :before-close="cancel">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
      <el-form-item label="回收标签" prop="recoveryLabel">
        <el-select v-model="form.recoveryLabel" style="width: 100%">
          <el-option label="预计回收" :value="0" />
          <el-option label="回收中" :value="1" />
          <el-option label="已回收" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="预计回收时间" prop="expectedRecoveryTime">
        <el-date-picker
          style="width: 100%"
          v-model="form.expectedRecoveryTime"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择预计回收时间"
        />
      </el-form-item>
      <el-form-item label="实际回收时间" prop="realRecoveryTime">
        <el-date-picker
          style="width: 100%"
          v-model="form.realRecoveryTime"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择预计回收时间"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { shopApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const visibility = ref(false);
  const form = ref({
    expectedRecoveryTime: '',
    realRecoveryTime: '',
    recoveryLabel: null,
    remark: '',
    shopCode: '',
  });
  const formRef = ref();
  const rules = reactive({
    recoveryLabel: [{ required: true, message: '请选择回收标签', trigger: 'change' }],
    expectedRecoveryTime: [{ required: true, message: '请选择预计回收时间', trigger: 'change' }],
    // realRecoveryTime: [{ required: true, message: '请选择实际回收时间', trigger: 'change' }],
  });
  const cancel = () => {
    form.value = {
      expectedRecoveryTime: '',
      realRecoveryTime: '',
      recoveryLabel: null,
      remark: '',
      shopCode: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const save = async () => {
    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validate) {
      await shopApi.luteosShopRecycleLabel(form.value);
      ElMessage.success('操作成功');
      cancel();
      emits('success');
    }
  };
  const open = (shopCode: string, row: any) => {
    form.value.shopCode = shopCode;
    form.value.expectedRecoveryTime = row.expectedRecoveryTime;
    form.value.realRecoveryTime = row.realRecoveryTime;
    form.value.recoveryLabel = row.recycleLabel;
    form.value.remark = row.recoveryRemark;
    visibility.value = true;
  };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
