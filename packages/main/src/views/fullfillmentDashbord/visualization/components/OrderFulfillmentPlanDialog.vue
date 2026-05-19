<template>
  <el-dialog
    v-model="visible"
    width="560px"
    title="计划编辑"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="120px">
      <el-form-item label="预计齐套日期" prop="expectedKitDate">
        <el-date-picker
          v-model="formModel.expectedKitDate"
          type="date"
          clearable
          :disabled-date="disabledBeforeToday"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="请选择预计齐套日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="实际齐套日期" prop="actualKitDate">
        <el-date-picker
          v-model="formModel.actualKitDate"
          type="date"
          clearable
          :disabled-date="disabledBeforeToday"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="请选择实际齐套日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="齐套号" prop="kitNo">
        <el-input
          v-model="formModel.kitNo"
          placeholder="请输入齐套号"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>

      <!--<el-form-item label="预计发货日期" prop="expectedShipTime">
        <el-date-picker
          v-model="formModel.expectedShipTime"
          type="date"
          clearable
          :disabled-date="disabledBeforeToday"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="请选择预计发货日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="预计到货日期" prop="expectedArrivalTime">
        <el-date-picker
          v-model="formModel.expectedArrivalTime"
          type="date"
          clearable
          :disabled-date="disabledBeforeToday"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="请选择预计到货日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="实际到货日期" prop="actualArrivalTime">
        <el-date-picker
          v-model="formModel.actualArrivalTime"
          type="date"
          clearable
          :disabled-date="disabledBeforeToday"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="请选择实际到货日期"
          style="width: 100%"
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  // import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api';

  type OpenPayload = {
    row?: Record<string, any>;
  };

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const visible = ref(false);
  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  const currentRow = ref<Record<string, any>>();
  const disabledBeforeToday = (date: Date) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return date.getTime() < todayStart.getTime();
  };

  const createInitialFormModel = () => {
    return {
      expectedKitDate: '',
      actualKitDate: '',
      // expectedShipTime: '',
      // expectedArrivalTime: '',
      // actualArrivalTime: '',
      kitNo: '',
    };
  };

  const formModel = ref(createInitialFormModel());
  const rules: FormRules = {
    // expectedKitDate: [{ required: true, message: '请选择预计齐套日期', trigger: 'change' }],
    // actualKitDate: [{ required: true, message: '请选择实际齐套日期', trigger: 'change' }],
    // expectedShipTime: [{ required: true, message: '请选择预计发货日期', trigger: 'change' }],
    // expectedArrivalTime: [{ required: true, message: '请选择预计到货日期', trigger: 'change' }],
    // actualArrivalTime: [{ required: true, message: '请选择实际到货日期', trigger: 'change' }],
  };

  const resetForm = async () => {
    currentRow.value = undefined;
    formModel.value = createInitialFormModel();
    await nextTick();
    formRef.value?.clearValidate();
  };

  const open = async (payload?: OpenPayload) => {
    await resetForm();
    currentRow.value = payload?.row;
    formModel.value.expectedKitDate = payload?.row?.expectedKitDate ?? '';
    formModel.value.actualKitDate = payload?.row?.actualKitDate ?? '';
    // formModel.value.expectedShipTime = payload?.row?.expectedShipTime ?? '';
    // formModel.value.expectedArrivalTime = payload?.row?.expectedArrivalTime ?? '';
    // formModel.value.actualArrivalTime = payload?.row?.actualArrivalTime ?? '';
    formModel.value.kitNo = payload?.row?.kitNo ?? '';
    visible.value = true;
    await nextTick();
    formRef.value?.clearValidate();
  };

  const close = async () => {
    visible.value = false;
    await resetForm();
  };

  const handleClose = () => {
    close();
  };

  const submit = async () => {
    if (saveLoading.value) return;
    // const ok = await formRef.value?.validate().catch(() => false);
    // if (!ok) return;
    saveLoading.value = true;
    try {
      await omsApi.omsFulfillmentBiEdit({
        id: currentRow.value?.id,
        expectedKitDate: formModel.value.expectedKitDate,
        actualKitDate: formModel.value.actualKitDate,
        // expectedShipTime: formModel.value.expectedShipTime,
        // expectedArrivalTime: formModel.value.expectedArrivalTime,
        // actualArrivalTime: formModel.value.actualArrivalTime,
        kitNo: formModel.value.kitNo,
      });
      emit('success');
      await close();
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss"></style>
