<template>
  <el-dialog title="详情" :model-value="visible" @close="handleFormCancel" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="right" label-width="100px">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">
                      {{
                        form?.settlementFormBean[item.key] !== null &&
                        form?.settlementFormBean[item.key] !== ''
                          ? form?.settlementFormBean[item.key]
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
        <el-tab-pane label="商品明细" name="commodity">
          <el-table
            :data="form?.settlementFormItemBeans"
            show-summary
            :summary-method="getSummariesCommodity"
          >
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="productSku" label="商品编码" min-width="130px" />
            <el-table-column prop="productName" label="商品名称" min-width="130px" />
            <el-table-column prop="qty" label="数量" />
            <el-table-column prop="invoiceQty" label="开票数量" />
            <el-table-column prop="unitPrice" label="单价" />
            <el-table-column prop="taxRate" label="税率" />
            <el-table-column prop="unitPriceIncludingTax" label="含税单价" />
            <el-table-column prop="amount" label="金额" min-width="110px" />
            <el-table-column prop="taxAmount" label="税额" />
            <el-table-column prop="totalAmountTax" label="价税合计" min-width="110px" />
            <el-table-column prop="commission" label="佣金" />
            <el-table-column prop="invoiceDetails" label="开票金额" width="300px">
              <template #default="{ row, $index }">
                <div v-for="(item, i) in row.invoiceDetails" :key="i" class="invoice-list-box">
                  <span class="invoice-value">{{ item.invoiceCode }}</span>
                  <div class="invoice-num">{{ item.invoiceAmount }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shippingOrderNumber" label="发货单号" min-width="160px" />
            <el-table-column prop="orderNumber" label="订单号" min-width="130px" />
            <el-table-column prop="customerPo" label="客户PO" min-width="130px" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="开票明细" name="invoice">
          <el-table :data="form?.invoiceBeans" show-summary :summary-method="getSummariesInvoice">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="code" label="发票号" min-width="170px">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.code }}</span>
                <el-link
                  type="primary"
                  :underline="false"
                  @click="getInvoiceDetail(row, '发票')"
                  v-else
                >
                  {{ row.code }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceDate" label="日期" min-width="110px" />
            <el-table-column prop="amount" label="金额" min-width="110px" />
            <el-table-column prop="taxAmount" label="税额" />
            <el-table-column prop="totalAmountTax" label="价税合计" min-width="110px" />
            <el-table-column prop="commission" label="佣金" />
            <el-table-column prop="shippingFee" label="销售运费" />
            <el-table-column prop="invoiceNetAmount" label="发票净额" min-width="110px" />
            <el-table-column prop="unWriteOffAmount" label="未核销金额" min-width="110px" />
            <el-table-column prop="currency" label="币别" />
            <el-table-column prop="statusDesc" label="单据状态" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="核销明细" name="verify">
          <el-table :data="form?.writeOffBeans" show-summary :summary-method="getSummariesVerify">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="orderType" label="单据类型" />
            <el-table-column prop="orderCode" label="核销单号">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.orderCode }}</span>
                <el-link
                  type="primary"
                  :underline="false"
                  @click="getInvoiceDetail(row, row.orderType)"
                  v-else
                >
                  {{ row.orderCode }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="orderDate" label="日期" />
            <el-table-column prop="writeOffAmount" label="金额" min-width="110px" />
            <el-table-column prop="currency" label="币别" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 发票详情 -->
    <detailDialogSalesInvoice
      v-if="detailVisible && detailName == '发票'"
      :visible="detailVisible"
      :code="code"
      :detailType="1"
      @close="detailVisible = false"
    />
    <!-- CN单据详情 -->
    <detailDialogCN
      v-if="detailVisible && detailName == 'CN单'"
      :visible="detailVisible"
      :code="code"
      :detailType="1"
      @close="detailVisible = false"
    />
    <!-- 回款/还款单据详情 -->
    <detailDialogPaymentCollection
      v-if="detailVisible && detailName == '收款单'"
      :visible="detailVisible"
      :code="code"
      :detailType="1"
      @close="detailVisible = false"
    />
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import type { TabsPaneContext } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { ElMessage, FormInstance } from 'element-plus';
  import detailDialogSalesInvoice from '@/views/finance/income/salesInvoice/components/detailDialog.vue';
  import detailDialogCN from '@/views/finance/income/CNBills/components/detailDialog.vue';
  import detailDialogPaymentCollection from '@/views/finance/income/paymentCollection/components/detailDialog.vue';

  const activeName = ref('base');
  const activeName2 = ref('commodity');
  const formRef = ref<FormInstance>();
  const code = ref();
  const detailVisible = ref(false);
  const detailName = ref('');
  const props = defineProps<{
    visible: boolean;
    code: string;
    detailType?: Number;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref();
  const basicList = [
    { label: '结算单号', key: 'code' },
    { label: '客户', key: 'customerName' },
    { label: '日期', key: 'outboundTime' },
    { label: '币别', key: 'currency' },
    { label: '金额', key: 'amount' },
    { label: '税额', key: 'taxAmount' },
    { label: '价税合计', key: 'totalAmountTax' },
    { label: '佣金', key: 'commission' },
    { label: '销售运费', key: 'shippingFee' },
    { label: '应收净额', key: 'amountReceivable' },
    { label: '开票金额', key: 'invoiceAmount' },
    { label: '核销金额', key: 'writeOffAmount' },
    { label: '开票状态', key: 'billingStatusDesc' },
    { label: '核销状态', key: 'writeOffStatusDesc' },
    { label: '客户PO', key: 'customerPo' },
    { label: '订单号', key: 'orderNumber' },
    { label: '结算组织', key: 'settlementOrgName' },
    { label: '收款条件', key: 'paymentTerm' },
    { label: '到期日', key: 'expirationDate' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeStatementQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
      }
    }
  });
  const getInvoiceDetail = (row, type) => {
    code.value = type == '发票' ? row.code : row.orderCode;
    detailName.value = type;
    detailVisible.value = false;
    detailVisible.value = true;
  };
  const getSummariesCommodity = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['qty', 'invoiceQty', 'commission', 'amount', 'taxAmount', 'totalAmountTax'].includes(
          column.property
        ) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            if (column.property == 'qty' || column.property == 'invoiceQty') {
              return prev + curr;
            } else {
              return total.toFixed(2);
            }
          }
          if (column.property == 'qty' || column.property == 'invoiceQty') {
            return prev;
          } else {
            return Number(prev).toFixed(2);
          }
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
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
        [
          'amount',
          'taxAmount',
          'totalAmountTax',
          'commission',
          'shippingFee',
          'invoiceNetAmount',
          'unWriteOffAmount',
        ].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);

          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            if (column.property == 'invoiceNetAmount') {
              return total.toFixed(4);
            } else {
              return total.toFixed(2);
            }
          }
          if (column.property == 'invoiceNetAmount') {
            return Number(prev).toFixed(4);
          } else {
            return Number(prev).toFixed(2);
          }
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
  const getSummariesVerify = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['writeOffAmount'].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            return total.toFixed(2);
          }
          return Number(prev).toFixed(2);
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
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

  .invoice-list-box {
    width: 250px;
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    padding: 0 10px;
    border-radius: 50px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    margin-bottom: 5px;
    span {
      margin-right: 10px;
    }
    .invoice-num {
      width: 80px;
      color: var(--el-table-text-color);
      background-color: var(--el-color-primary-light-9) !important;
      border-radius: 6px;
      padding: 0 6px;
      height: 30px;
      margin: 0 2px;
      display: inline-block;
    }
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
