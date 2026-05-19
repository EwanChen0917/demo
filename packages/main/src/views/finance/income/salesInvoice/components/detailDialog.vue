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
                        form.baseBean[item.key] !== null && form.baseBean[item.key] !== ''
                          ? form.baseBean[item.key]
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
          <el-table :data="form?.productBeans" show-summary :summary-method="getSummariesCommodity">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="associateSettlementCode" label="结算单号" min-width="180px">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.associateSettlementCode }}</span>
                <el-link
                  type="primary"
                  :underline="false"
                  @click="getOrderDetail(row, '结算单号')"
                  v-else
                >
                  {{ row.associateSettlementCode }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单号" min-width="160px">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.orderNumber }}</span>
                <el-link
                  type="primary"
                  :underline="false"
                  @click="getOrderDetail(row, '订单号')"
                  v-else
                >
                  {{ row.orderNumber }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="customerPo" label="客户PO" min-width="130px" />
            <el-table-column prop="productSku" label="商品编码" min-width="140px" />
            <el-table-column prop="productName" label="商品名称" min-width="160px" />
            <el-table-column prop="qty" label="数量" />
            <el-table-column prop="unitPriceIncludingTax" label="含税单价" />
            <el-table-column prop="amount" label="金额" min-width="110px" />
            <el-table-column prop="taxAmount" label="税额" />
            <el-table-column prop="totalAmountTax" label="价税合计" min-width="110px" />
            <el-table-column prop="commission" label="佣金" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="核销明细" name="verify">
          <el-table :data="form?.invoiceBeans" show-summary :summary-method="getSummariesVerify">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="orderType" label="单据类型" />
            <el-table-column prop="orderCode" label="核销单号" min-width="130px">
              <template #default="{ row, $index }">
                <span v-if="props.detailType == 1">{{ row.orderCode }}</span>
                <el-link type="primary" :underline="false" @click="getInvoiceDetail(row)" v-else>
                  {{ row.orderCode }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="orderDate" label="日期" min-width="110px" />
            <el-table-column prop="writeOffAmount" label="金额" min-width="110px" />
            <el-table-column prop="currency" label="币别" />
            <el-table-column prop="writeOffTime" label="核销时间" min-width="110px" />
            <el-table-column label="操作" fixed="right">
              <template #default="{ row }">
                <KeenActions
                  display-style="buttons"
                  :actions="[
                    {
                      label: '反核销',
                      key: 'reverseWriteOff',
                      type: 'primary',
                      row: row,
                    },
                  ]"
                  @click="handleActions"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- CN单据详情 -->
    <detailDialogCN
      v-if="detailVisibleCN"
      :visible="detailVisibleCN"
      :code="code"
      :detailType="1"
      @close="detailVisibleCN = false"
    />
    <!-- 回款/还款单据详情 -->
    <detailDialogPaymentCollection
      v-if="detailVisible"
      :visible="detailVisible"
      :code="code"
      :detailType="1"
      @close="detailVisible = false"
    />
    <!-- ToB-收入结算单详情  -->
    <detailDialogIncomeStatementToB
      v-if="detailVisibleToB"
      :visible="detailVisibleToB"
      :code="code"
      :detailType="1"
      @close="detailVisibleToB = false"
    />
    <!-- 是B2B订单（新）详情 -->
    <Detail ref="detailRef" :listData="[{ erpCode: code }]" />
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi, dataApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  import detailDialogCN from '@/views/finance/income/CNBills/components/detailDialog.vue';
  import detailDialogPaymentCollection from '@/views/finance/income/paymentCollection/components/detailDialog.vue';
  import detailDialogIncomeStatementToB from '@/views/finance/income/incomeStatementToB/components/detailDialog.vue';
  import Detail from '@/views/supplyChainManage/B2BOrder/orderManage/detail.vue';

  const activeName = ref('base');
  const activeName2 = ref('commodity');
  const code = ref();
  const detailVisibleToB = ref(false);
  const detailVisibleCN = ref(false);
  const detailVisible = ref(false);
  const formRef = ref<FormInstance>();
  const props = defineProps<{
    visible: boolean;
    code: string;
    detailType?: Number;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref({
    baseBean: {
      amount: null,
      code: '',
      commission: null,
      currency: '',
      customerCode: '',
      customerName: '',
      customerPo: '',
      dataSource: null,
      dataSourceDesc: '',
      invoiceDate: '',
      invoiceNetAmount: null,
      orderNumber: '',
      shippingFee: null,
      taxAmount: null,
      totalAmountTax: null,
      writeOffAmount: null,
    },
    productBeans: [],
    invoiceBeans: [],
  });
  const basicList = [
    { label: '发票号', key: 'code' },
    { label: '客户', key: 'customerName' },
    { label: '日期', key: 'invoiceDate' },
    { label: '币别', key: 'currency' },
    { label: '金额', key: 'amount' },
    { label: '税额', key: 'taxAmount' },
    { label: '价税合计', key: 'totalAmountTax' },
    { label: '佣金', key: 'commission' },
    { label: '销售运费', key: 'shippingFee' },
    { label: '发票净额', key: 'invoiceNetAmount' },
    { label: '客户PO', key: 'customerPo' },
    { label: '订单号', key: 'orderNumber' },
    { label: '核销金额', key: 'writeOffAmount' },
    { label: '核销状态', key: 'writeOffStatusDesc' },
    { label: '数据来源', key: 'sourceTypeDesc' },
    { label: '单据状态', key: 'statusDesc' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeInvoiceQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
      }
    }
  });
  const currencyList = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyList.value = res.currencyList || [];
  };
  getCurrencyOptions();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key == 'reverseWriteOff') {
      let currencyObj = currencyList.value.find((item) => item.currencyCode == row.currency);
      let currencySymbol = '';
      let currencyName = row.currency;
      if (currencyObj) {
        currencySymbol = currencyObj.currencySymbol || '';
        currencyName = currencyObj.currencyName || row.currency;
      }
      // 先查询该客户当前可用额度，是否大于等于撤销认领/反核销的金额：
      // 查询客户信用额度
      const creditLimit = await financeSystemApi.financeStatementQueryCreditLimit({
        customerCodeList: [form.value.baseBean.customerCode],
      });
      // 可用额度
      console.log(creditLimit?.creditLimitBeans);
      if (creditLimit && creditLimit?.creditLimitBeans?.length) {
        const availableLimit = creditLimit?.creditLimitBeans[0]?.availableLimit;
        if (availableLimit < row.writeOffAmount) {
          ElMessage.success('额度不足，不允许反核销');
          return;
        } else {
          const isConfirmed = await swal.confirmHtml(
            `<h2 style="color: var(---N9, #1f1f1f)!important;font-size: 15px;">确认反核销后，将按${row.orderType}反核销的金额，减少该客户信用额度：
        <span style="color:var(--el-color-danger)!important;">${currencySymbol}${row.writeOffAmount} ${currencyName}</span>，是否继续？</h2>`
          );
          if (!isConfirmed) return;
          reverseWriteOff(row, '', 1);
        }
      } else {
        reverseWriteOff(row, '客户信用额度不存在，无法调整信用额度。是否继续反核销？', 0);
      }
    }
  };
  const reverseWriteOff = async (row, tip, adjustCreditLimit) => {
    if (tip) {
      const isConfirm = await swal.confirm(tip);
      if (!isConfirm) return;
    }
    await financeSystemApi.financeInvoiceReverseWriteOff({
      id: row.id,
      invoiceCode: form.value.baseBean.code,
      orderCode: row.orderCode,
      orderTypeCode: row.orderTypeCode,
      writeOffAmount: row.writeOffAmount,
      adjustCreditLimit: adjustCreditLimit,
    });
    ElMessage.success('反核销成功');
    const res = await financeSystemApi.financeInvoiceQueryDetail({
      code: props.code,
    });
    if (res) {
      form.value = res;
      activeName2.value = 'verify';
    }
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
        ['qty', 'taxAmount', 'amount', 'totalAmountTax', 'commission'].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            if (column.property == 'qty') {
              return prev + curr;
            } else {
              return total.toFixed(2);
            }
          }
          if (column.property == 'qty') {
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
  const getInvoiceDetail = (row) => {
    code.value = row.orderCode;
    if (row.orderTypeCode == 1) {
      detailVisibleCN.value = true;
    }
    if (row.orderTypeCode == 0) {
      detailVisible.value = true;
    }
  };
  const detailRef = ref();
  const getOrderDetail = (row, type) => {
    if (type == '结算单号') {
      code.value = row.associateSettlementCode;
      detailVisibleToB.value = true;
    }
    if (type == '订单号') {
      detailRef.value?.open(row.orderNumber);
    }
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
