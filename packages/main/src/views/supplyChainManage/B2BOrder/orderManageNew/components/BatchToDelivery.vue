<template>
  <el-dialog
    width="1300px"
    title="批量下单到物流"
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
        <el-table-column label="订单号" prop="erpCode" min-width="130px" />
        <el-table-column label="供应链SKU" prop="supplySku" min-width="140" />
        <el-table-column label="数量" prop="num" min-width="66" />
        <el-table-column label="发货仓" prop="warehouseDesc" min-width="140" />
        <el-table-column label="积加可用库存量" prop="jijiaAvailableStock" min-width="110" />
        <el-table-column label="已提交" prop="submittedQty" min-width="66" />
        <el-table-column label="未提交" prop="unSubmittedQty" min-width="66" />
        <el-table-column label="ERP可用库存量" prop="availableStock" min-width="110">
          <template #default="{ row }">
            <div :class="{ red: row?.exceedAvailable }">{{ row?.availableStock }}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单创建时间" prop="createTime" min-width="140" />
        <el-table-column label="创建人" prop="creatorName" min-width="80" />
        <el-table-column label="客户名称" prop="customerName" min-width="90" />
        <el-table-column label="操作" fixed="right" width="60">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '移除',
                  key: 'delete',
                  type: 'danger',
                  permissionCode: '',
                  row,
                  rowIndex: $index,
                  index,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading" :disabled="!canSubmit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { OrderChangeSkuBatchToAuditResp } from '@/api/erp/data-contracts';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';

  const emit = defineEmits(['close']);

  const visible = ref(false);

  const form: any = ref<OrderChangeSkuBatchToAuditResp>({});
  const formRef = ref();

  const listLoading = ref(false);
  const canSubmit = ref(true);
  const orderList: any = ref([]);
  const queryList = async (orderCodeList) => {
    form.value = {};
    try {
      listLoading.value = true;
      orderList.value = orderCodeList;
      form.value = await omsApi.omsOrderPreCheckStock({
        orderCodeList,
      });
      // console.log(form.value);
      canSubmit.value = true;
      for (let i = 0; i < form.value.recordList.length; i += 1) {
        if (form.value.recordList[i].exceedAvailable) {
          canSubmit.value = false;
          // console.log('不能提交');
          break;
        }
      }
    } finally {
      listLoading.value = false;
    }
  };

  const handleActions = async (item) => {
    const { key, row } = item;
    // console.log(orderList.value);
    // console.log(key, row);
    if (key === 'delete') {
      // if (orderList.value.length === 1) {
      //   ElMessage.warning('至少保留一条记录');
      //   return;
      // }
      const isConfirmed = await swal.confirm('确定要移除吗？');
      if (!isConfirmed) return;
      if (orderList.value.length === 1 && orderList.value[0] === row.erpCode) {
        orderList.value = [];
        form.value.recordList = [];
        return;
      }
      if (orderList.value.length > 1) {
        orderList.value = orderList.value.filter((code) => code !== row.erpCode);
        // console.log(orderList.value);
        queryList(orderList.value);
      }
    }
  };

  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    // resultDialogRef.value?.open([], '批量下单到物流失败订单');
    // return;
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    try {
      saveLoading.value = true;
      // const res = await omsApi.omsOrderBatchUpdate(form.value);
      const res = await omsApi.omsOrderBatchUpdate({
        orderCodeList: orderList.value,
        autoSubOrder: 1,
        pass: true,
      });
      if (res?.failList?.length) {
        resultDialogRef.value?.open(res?.failList, '批量下单到物流');
      } else {
        ElMessage.success('批量下单到物流成功');
      }
      emit('close');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const open = (codeListParam: any) => {
    queryList(codeListParam);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .red {
    color: red !important;
  }
  .info-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 60px;

    & + & {
      margin-top: 18px;
    }
  }

  :deep(.el-table__cell:has(.el-form-item)) {
    padding-bottom: 0;
  }
</style>
