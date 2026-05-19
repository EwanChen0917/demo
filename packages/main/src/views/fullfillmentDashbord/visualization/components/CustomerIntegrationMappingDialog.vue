<template>
  <el-dialog
    v-model="visible"
    width="800px"
    :title="dialogTitle"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      class="mapping-form"
      :model="formModel"
      :rules="rules"
      label-width="100px"
    >
      <div class="mapping-form-grid">
        <el-form-item label="客户名称" prop="customerCode">
          <el-select
            v-model="formModel.customerCode"
            clearable
            placeholder="请选择客户名称"
            filterable
            @change="handleCustomerCodeChange"
          >
            <el-option
              v-for="item in customerList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客户状态" prop="customerStatus">
          <el-select
            v-model="formModel.customerStatus"
            clearable
            placeholder="请选择客户"
            disabled
            filterable
          >
            <el-option label="终止" :value="1" />
            <el-option label="合作" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售运营" prop="salesOperationsCode">
          <DeptMember
            v-model="formModel.salesOperationsCode"
            placeholder="销售运营"
            clearable
            :manual="true"
            :manual-options="props.memberList"
            :teleported="true"
          />
        </el-form-item>
        <el-form-item label="销售" prop="salesCode">
          <DeptMember
            v-model="formModel.salesCode"
            placeholder="销售"
            clearable
            :teleported="true"
            :manual="true"
            :manual-options="props.memberList"
          />
        </el-form-item>
        <el-form-item label="订单员" prop="orderClerkCode">
          <DeptMember
            v-model="formModel.orderClerkCode"
            placeholder="订单员"
            clearable
            :teleported="true"
            :manual="true"
            :manual-options="props.memberList"
          />
        </el-form-item>
        <el-form-item label="物流专员" prop="logisticsSpecialistCode">
          <DeptMember
            v-model="formModel.logisticsSpecialistCode"
            placeholder="物流专员"
            clearable
            :teleported="true"
            :manual="true"
            :manual-options="props.memberList"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus/es/components/form';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage } from 'element-plus/es';
  import { baseUseVisualizationOptions } from '../hooks/baseUseVisualizationOptions';
  import type { ExtractRecordListItem } from '../..';

  const props = defineProps<{
    memberList: any[];
  }>();
  type OpenPayload =
    | {
        type: 'create';
      }
    | {
        type: 'edit';
        row: ItemModel;
      };
  type ItemModel =
    ExtractRecordListItem<ErpApi.LuteosErpBaseCustomerDockingRelationQueryList.ResponseBody> & {
      customerStatus?: 0 | 1;
    };
  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const visible = ref(false);
  const mode = ref<'create' | 'edit'>('create');
  const saveLoading = ref(false);

  const formRef = ref<FormInstance>();
  const formModel = ref<ItemModel>({
    id: undefined as undefined | number,
    customerCode: '',
    customerStatus: undefined,
    salesOperationsCode: undefined,
    salesCode: undefined,
    orderClerkCode: undefined,
    logisticsSpecialistCode: undefined,
  });

  const { customerList, queryCustomerList } = baseUseVisualizationOptions();
  const rules: FormRules = {
    customerCode: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
    customerStatus: [{ required: true, message: '请选择客户状态', trigger: 'change' }],
    salesOperationsCode: [{ required: true, message: '请选择销售运营', trigger: 'change' }],
    salesCode: [{ required: true, message: '请选择销售', trigger: 'change' }],
    orderClerkCode: [{ required: true, message: '请选择订单员', trigger: 'change' }],
    logisticsSpecialistCode: [{ required: true, message: '请选择物流专员', trigger: 'change' }],
  };

  const dialogTitle = computed(() => {
    return mode.value === 'create' ? '客户对接关系新建' : '客户对接关系编辑';
  });

  const resetForm = async () => {
    formModel.value = {
      id: undefined,
      customerCode: '',
      customerStatus: undefined,
      salesOperationsCode: undefined,
      salesCode: undefined,
      orderClerkCode: undefined,
      logisticsSpecialistCode: undefined,
    };
    await nextTick();
    formRef.value?.clearValidate();
  };

  const ensureCustomerListReady = async () => {
    if (customerList.value?.length) return;
    await queryCustomerList();
  };

  const open = async (payload: OpenPayload) => {
    mode.value = payload.type;
    await resetForm();
    await ensureCustomerListReady();
    if (payload.type === 'edit') {
      const row = payload.row || {};
      formModel.value.id = (row.id as number | undefined) ?? undefined;
      formModel.value.customerCode = row.customerCode ?? '';
      formModel.value.customerStatus =
        (row.customerStatus as undefined | 0 | 1) ??
        customerList.value.find((item) => item.code === formModel.value.customerCode)?.status ??
        undefined;
      formModel.value.salesOperationsCode = row.salesOperationsCode ?? undefined;
      formModel.value.salesCode = row.salesCode ?? undefined;
      formModel.value.orderClerkCode = row.orderClerkCode ?? undefined;
      formModel.value.logisticsSpecialistCode = row.logisticsSpecialistCode ?? undefined;
    } else {
      // create 场景下，如后续支持默认 customerCode，这里也能确保状态回显
      // if (formModel.value.customerCode) handleCustomerCodeChange(formModel.value.customerCode);
    }
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

  const handleCustomerCodeChange = (customerCode?: string | number) => {
    if (!customerCode) {
      formModel.value.customerStatus = undefined;
      return;
    }
    const currentCustomer = customerList.value.find((item) => item.code === customerCode);
    formModel.value.customerStatus = currentCustomer?.status;
  };

  const submit = async () => {
    if (saveLoading.value) return;
    const ok = await formRef.value?.validate().catch(() => false);
    if (!ok) return;
    saveLoading.value = true;
    try {
      await erpApi.luteosErpBaseCustomerDockingRelationSaveOrUpdate({
        id: formModel.value.id as unknown as number | undefined,
        customerCode: formModel.value.customerCode ?? '',
        salesOperationsCode: (formModel.value.salesOperationsCode as string) ?? undefined,
        salesCode: (formModel.value.salesCode as string) ?? undefined,
        orderClerkCode: (formModel.value.orderClerkCode as string) ?? undefined,
        logisticsSpecialistCode: (formModel.value.logisticsSpecialistCode as string) ?? undefined,
      });
      ElMessage.success('操作成功');
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
  onMounted(() => {
    queryCustomerList();
  });
</script>

<style scoped lang="scss">
  .mapping-form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
  }

  .mapping-form :deep(.el-form-item) {
    width: 100%;
  }

  .mapping-form :deep(.el-select),
  .mapping-form :deep(.el-input) {
    width: 100%;
  }
</style>
