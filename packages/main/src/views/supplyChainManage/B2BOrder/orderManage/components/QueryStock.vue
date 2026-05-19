<template>
  <el-dialog
    width="750px"
    title="ERP库存可用量"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-form ref="formRef" :model="form">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="form?.recordList"
        row-key="erpCode"
        max-height="60vh"
      >
        <el-table-column label="供应链SKU" prop="supplySku" min-width="140" />
        <el-table-column label="发货仓" prop="warehouseDesc" min-width="140" />
        <el-table-column label="积加可用库存量" prop="jijiaAvailableStock" min-width="140" />
        <el-table-column label="已提交" prop="submittedQty" min-width="100" />
        <el-table-column label="ERP可用库存量" prop="availableStock" min-width="140" />
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button> -->
        <el-button type="primary" @click="visible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  // import * as swal from '@/utils/swal';
  import { OrderChangeSkuBatchToAuditResp } from '@/api/erp/data-contracts';

  const emit = defineEmits(['close']);

  const visible = ref(false);

  const form: any = ref<OrderChangeSkuBatchToAuditResp>({});
  const formRef = ref();

  const listLoading = ref(false);
  const queryList = async (search) => {
    console.log('查询参数 ', search);
    try {
      listLoading.value = true;
      form.value = await erpApi.luteosErpOrderQueryStockAvailable({
        supplySkuList: search.supplySkuList,
        warehouseCode: search.warehouseCode,
      });
      console.log('查询ERP可用库存量 ', form.value);
    } finally {
      listLoading.value = false;
    }
  };

  // const resultDialogRef = ref();
  // const saveLoading = ref(false);
  // const save = async () => {
  //   const isValid = await formRef.value?.validate().catch(() => false);
  //   if (!isValid) return;
  //   try {
  //     saveLoading.value = true;
  //     const res = await erpApi.luteosErpOrderBatchChangeSkuListToAudit(form.value);
  //     if (res?.failList?.length) {
  //       resultDialogRef.value?.open(res?.failList);
  //     } else {
  //       ElMessage.success('换货成功');
  //     }
  //     emit('close');
  //     visible.value = false;
  //   } finally {
  //     saveLoading.value = false;
  //   }
  // };

  const open = (search) => {
    queryList(search);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__cell:has(.el-form-item)) {
    padding-bottom: 0;
  }
</style>
