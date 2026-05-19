<template>
  <el-dialog title="详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="left">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">
                      {{
                        form.cnOrderBean[item.key] !== null && form.cnOrderBean[item.key] !== ''
                          ? form.cnOrderBean[item.key]
                          : '-'
                      }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tab-box">
      <el-tabs v-model="activeName2" type="card" class="demo-tabs">
        <el-tab-pane label="发票明细" name="invoice">
          <el-table
            :data="form?.invoiceItemBeans"
            show-summary
            :summary-method="getSummariesInvoice"
          >
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="invoiceCode" label="发票号">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.invoiceCode }}</span>
                <el-link type="primary" :underline="false" @click="getInvoiceDetail(row)" v-else>
                  {{ row.invoiceCode }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceNetAmount" label="金额" />
            <el-table-column prop="writeOffAmount" label="本单核销金额" min-width="100px" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 发票详情 -->
    <detailDialogSalesInvoice
      v-if="detailVisible"
      :visible="detailVisible"
      :code="code"
      :detailType="1"
      @close="detailVisible = false"
    />
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import detailDialogSalesInvoice from '@/views/finance/income/salesInvoice/components/detailDialog.vue';

  const activeName = ref('base');
  const activeName2 = ref('invoice');
  const props = defineProps<{
    visible: boolean;
    code: string;
    detailType?: Number;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();
  const code = ref();
  const detailVisible = ref(false);

  const form = ref({
    cnOrderBean: {
      amount: undefined,
      applyTime: '',
      budgetRegion: '',
      code: '',
      currency: '',
      currencyName: '',
      customerCode: '',
      customerName: '',
      feeDetails: '',
      feeL1: '',
      feeL2: '',
      feeL3: '',
      feeL4: '',
      isDeductPayment: undefined,
      isDeductPaymentDesc: '',
      remainingAmount: undefined,
      writeOffAmount: undefined,
      writeOffStatus: undefined,
      writeOffStatusDesc: '',
    },
    invoiceItemBeans: [],
  });
  const basicList = [
    { label: 'CN单号', key: 'code' },
    { label: '客户', key: 'customerName' },
    { label: '申请日期', key: 'applyTime' },
    { label: '币别', key: 'currencyName' },
    { label: '金额', key: 'amount' },
    { label: '费用L1', key: 'feeL1' },
    { label: '费用L2', key: 'feeL2' },
    { label: '费用L3', key: 'feeL3' },
    { label: '费用L4', key: 'feeL4' },
    { label: '费用详情', key: 'feeDetails' },
    { label: '核销状态', key: 'writeOffStatusDesc' },
    { label: '已核销金额', key: 'writeOffAmount' },
    { label: '剩余金额', key: 'remainingAmount' },
    { label: '费用预算管理大区', key: 'budgetRegion' },
    { label: '是否抵扣货款', key: 'isDeductPaymentDesc' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeCnOrderQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
      }
    }
  });
  const getSummariesInvoice = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['invoiceNetAmount', 'writeOffAmount'].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          }
          return prev;
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
  const getInvoiceDetail = (row) => {
    code.value = row.invoiceCode;
    detailVisible.value = false;
    detailVisible.value = true;
  };
</script>

<style scoped lang="scss">
  :deep(.el-form-item__content) {
    line-height: 30px;
  }

  .total-text {
    font-weight: bold;
    margin-top: 12px;

    .text-red {
      color: #ef6868;
      margin-left: 15px;
    }
  }

  .text-style {
    word-break: break-all;
  }

  .divider-margin {
    margin: 10px 0;
  }
  :deep(.el-table) {
    tfoot {
      font-weight: bold;
      td.el-table__cell:not(:first-child) {
        color: #ef6868;
      }
    }
  }
  :deep(.el-link__inner) {
    word-break: break-all;
  }
</style>
