<template>
  <el-dialog title="单据详情" :model-value="visible" @close="emit('close')" width="70%">
    <el-form label-position="top">
      <KeenCard title="">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="SRM对账单单号：">
              {{ form?.srmRecBillNo || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="公司代码：">
              {{ form?.companyCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="公司名称：">
              {{ form?.companyName || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="供应商ERP编码：">
              {{ form?.supplierCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="供应商名称：">
              {{ form?.supplierName || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="发票含税金额：">
              {{ form?.invoiceIncludeTaxAmount !== null ? form?.invoiceIncludeTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="发票未税金额：">
              {{ form?.invoiceNetAmount !== null ? form?.invoiceNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="发票税额：">
              {{ form?.invoiceTaxAmount !== null ? form?.invoiceTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="对账单含税金额：">
              {{ form?.recIncludeTaxAmount !== null ? form?.recIncludeTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="对账单未税金额">
              {{ form?.recNetAmount !== null ? form?.recNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="对账单税额：">
              {{ form?.recTaxAmount !== null ? form?.recTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="上架货物未税金额：">
              {{ form?.kingdeeShelfNetAmount !== null ? form?.kingdeeShelfNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="上架货物税额：">
              {{ form?.kingdeeShelfTaxAmount !== null ? form?.kingdeeShelfTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="附加费未税金额：">
              {{ form?.kingdeeAdditionFeeNetAmount !== null ? form?.kingdeeAdditionFeeNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="附加费税额：">
              {{ form?.kingdeeAdditionFeeTaxAmount !== null ? form?.kingdeeAdditionFeeTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="票扣未税金额：">
              {{ form?.kingdeePkNetAmount !== null ? form?.kingdeePkNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="票扣税额：">
              {{ form?.kingdeePkTaxAmount !== null ? form?.kingdeePkTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="未税差异：">
              {{ form?.diffNetAmount !== null ? form?.diffNetAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税额差异：">
              {{ form?.diffTaxAmount !== null ? form?.diffTaxAmount : '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票确认时间：">
              {{ form?.invoiceConfirmTime || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款申请通过时间：">
              {{ form?.paymentApprovaledTime || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成本调整单编号：">
              <span class="text-style">{{ form?.costAdjustBillNo || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应付调整单编号：">
              <span class="text-style">{{ form?.payableAdjustBillNo || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购发票编号：">
              <span class="text-style">{{ form?.invoiceBillNo || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="币别：">
              {{ form?.currencyCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="推送状态：">
              {{ form?.pushStatusDesc || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { financeSystemApi } from '@/api';
import useList from '@/hooks/list/useList';

const props = defineProps<{
  visible: boolean;
  code: string;
}>();
const emit = defineEmits<{
  (event: 'close'): void;
}>();

const form = ref();

watchEffect(async () => {
  if (props.code) {
    const res = await financeSystemApi.financeBasicQueryRecOrderDetail({
      srmRecBillNo: props.code,
    });
    form.value = res
  }
});
</script>

<style scoped lang="scss">
:deep(.el-form-item__content){
  line-height: 30px;
}
.text-style {
  word-break: break-all;
}
</style>
