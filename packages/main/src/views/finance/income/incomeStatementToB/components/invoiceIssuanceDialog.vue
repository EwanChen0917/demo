<template>
  <el-dialog title="发票-新增" :model-value="visible" @close="handleFormCancel" width="75%">
    <el-form ref="formRef" :model="form" label-position="right" label-width="100px">
      <div class="tab-box">
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
          <el-tab-pane label="基本信息" name="base">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`" v-if="item.label == '发票号'">
                    <el-input v-model="form.baseBean.code" placeholder="可自动生成" />
                  </el-form-item>
                  <el-form-item
                    :label="`${item.label}：`"
                    prop="baseBean.invoiceDate"
                    :rules="[{ required: true, message: '请选择日期', trigger: ['change'] }]"
                    v-else-if="item.label == '日期'"
                  >
                    <el-date-picker
                      style="width: 300px"
                      v-model="form.baseBean.invoiceDate"
                      type="date"
                      :clearable="false"
                      placeholder="请选择日期"
                      value-format="YYYY-MM-DD"
                    />
                  </el-form-item>
                  <el-form-item :label="`${item.label}：`" v-else>
                    <span class="text-style">
                      {{
                        form?.baseBean[item.key] !== null && form?.baseBean[item.key] !== ''
                          ? form?.baseBean[item.key]
                          : '-'
                      }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-box">
        <el-tabs v-model="activeName2" type="card" class="demo-tabs">
          <el-tab-pane label="商品明细" name="detail">
            <el-table
              ref="tableRef"
              :data="form?.productBeans"
              :show-summary="showSum"
              :summary-method="getSummaries"
            >
              <el-table-column type="index" label="序号" width="70px" />
              <el-table-column prop="associateSettlementCode" label="结算单号" width="160px" />
              <el-table-column prop="orderNumber" label="订单号" width="140px" />
              <el-table-column prop="customerPo" label="客户PO" width="110px" />
              <el-table-column prop="productSku" label="商品编码" width="130px" />
              <el-table-column prop="productName" label="商品名称" width="130px" />
              <el-table-column prop="qty" label="数量" width="120px">
                <template #default="{ row, $index }">
                  <el-form-item
                    label-width="0"
                    :prop="`productBeans[${$index}].qty`"
                    :rules="[{ required: true, message: '请输入数量', trigger: ['blur'] }]"
                  >
                    <el-input v-model.trim="row.qty" disabled v-if="row.qty == 0" />
                    <NumberInput
                      v-model="row.qty"
                      @change="changeNum(row, 'qty')"
                      :precision="0"
                      :min="1"
                      :max="row.qtyMax"
                      controls-position="right"
                      v-else
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="unitPrice" label="单价" />
              <el-table-column prop="unitPriceIncludingTax" label="含税单价" />
              <el-table-column prop="amount" label="金额" width="170px">
                <template #default="{ row, $index }">
                  <el-form-item
                    label-width="0"
                    :prop="`productBeans[${$index}].amount`"
                    :rules="[{ required: true, message: '请输入金额', trigger: ['blur'] },
                      {
                        pattern: priceRule,
                        message: '请输入数字，最多2位小数',
                        trigger: ['blur', 'change'],
                      },
                      {
                      validator:(rule: any, value: any, callback: any) => {
                        if (value==0) {
                          callback(new Error('请输入大于0的值'))
                        } else if (value>row.totalAmountTax) {
                          callback(new Error(`可输入最大值为${row.totalAmountTax}`))
                        } else {
                          callback()
                        }
                      },
                      trigger: ['blur', 'change'],
                      }]"
                  >
                    <el-input
                      v-model.trim="row.amount"
                      @change="changeNum(row, 'amount')"
                      :disabled="row.qty == 0"
                      placeholder="请输入金额"
                    ></el-input>
                    <!-- <NumberInput
                      v-model="row.amount"
                      @change="changeNum(row, 'amount')"
                      :precision="2"
                      :min="0"
                      :max="row.totalAmountTax"
                      :disabled="row.qty == 0"
                      controls-position="right"
                    /> -->
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="taxAmount" label="税额" width="170px">
                <template #default="{ row, $index }">
                  <el-form-item
                    label-width="0"
                    :prop="`productBeans[${$index}].taxAmount`"
                    :rules="[
                      { required: true, message: '请输入税额', trigger: ['blur'] },
                      {
                        pattern: priceRule,
                        message: '请输入数字，最多2位小数',
                        trigger: ['blur', 'change'],
                      },
                      {
                      validator:(rule: any, value: any, callback: any) => {
                        if (value>row.totalAmountTax) {
                          callback(new Error(`可输入最大值为${row.totalAmountTax}`))
                        } else {
                          callback()
                        }
                      },
                      trigger: ['blur', 'change'],
                      }
                      ]"
                  >
                    <el-input
                      v-model.trim="row.taxAmount"
                      @change="changeNum(row, 'taxAmount')"
                      :disabled="row.qty == 0"
                      placeholder="请输入税额"
                    ></el-input>
                    <!-- <NumberInput
                      v-model="row.taxAmount"
                      @change="changeNum(row, 'taxAmount')"
                      :precision="2"
                      :min="0"
                      :max="row.totalAmountTax"
                      :disabled="row.qty == 0"
                      controls-position="right"
                    /> -->
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="totalAmountTax" label="价税合计" />
              <el-table-column prop="commission" label="佣金" />
              <el-table-column label="操作" fixed="right" width="120">
                <template #default="{ row, $index }">
                  <KeenActions
                    display-style="buttons"
                    :actions="[
                      {
                        label: '删除',
                        key: 'delete',
                        type: 'danger',
                        disabled: form?.productBeans.length == 1,
                        row: row,
                        index: $index,
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit(0)" :loading="saveLoading">
          保存
        </el-button>
        <el-button type="primary" @click="handleFormSubmit(1)" :loading="saveLoading">
          保存并审核
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import Decimal from 'decimal.js';
  import { financeSystemApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { priceRule } from '@/utils/rulesRegExp';

  const activeName = ref('base');
  const activeName2 = ref('detail');
  const visible = ref(false);
  const showSum = ref(true);
  const tableRef = ref();
  // 表单定义
  const formRef = ref();
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
    },
    productBeans: [],
    review: 0, //是否审核： 0 仅保存  1 保存并审核
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
    { label: '数据来源', key: 'sourceTypeDesc' },
  ];

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row, index } = item;
    if (key === 'delete') {
      form.value?.productBeans.splice(index, 1);
    }
  };
  // 按金额 = 价税合计 - 税额，修改金额。修改时，联动基本信息的税额
  // 税额 = 价税合计 - 金额，修改税额。修改时联动基本信息的金额
  // 金额 = 单价 * 数量
  // 价税合计 = 含税单价 * 数量
  const changeNum = (row, key) => {
    if (key == 'amount' && row.amount !== null && row.totalAmountTax !== null) {
      if (row.amount > row.totalAmountTax) {
        row.amount = row.totalAmountTax;
      }
      row.taxAmount = Decimal.sub(row.totalAmountTax, row.amount).toNumber();
    }
    if (key == 'taxAmount' && row.taxAmount !== null && row.totalAmountTax !== null) {
      if (row.taxAmount > row.totalAmountTax) {
        row.taxAmount = row.totalAmountTax;
      }
      row.amount = Decimal.sub(row.totalAmountTax, row.taxAmount).toNumber();
    }
    if (key == 'qty' && row.unitPrice !== null) {
      row.totalAmountTax = Decimal.mul(row.qty, row.unitPrice).toNumber();
    }
    if (key == 'qty' && row.unitPriceIncludingTax !== null) {
      row.amount = Decimal.mul(row.qty, row.unitPriceIncludingTax).toNumber();
    }
    showSum.value = false;
    setTimeout(() => {
      showSum.value = true;
    }, 100);
  };
  const getSummaries = (param) => {
    const { columns, data } = param;
    const sums: VNode[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['qty', 'amount', 'taxAmount', 'totalAmountTax', 'commission'].includes(column.property) &&
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
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async (type) => {
    if (form.value.baseBean.invoiceNetAmount == 0) {
      ElMessage.error('发票净额≤0，不能开票');
      return;
    }
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (type) {
        const isConfirm = await swal.confirm('确认保存并审核吗？');
        if (!isConfirm) return;
        form.value.review = 1;
      } else {
        form.value.review = 0;
      }
      const res = await financeSystemApi.financeInvoiceSave(form.value);
      ElMessage.success(`${type == 1 ? '保存并审核' : '保存'}成功`);
      visible.value = false;
      emit('success');
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    visible.value = false;
    emit('close');
  };
  const codes = ref('');

  // 详情
  const getDetail = async () => {
    const res = await financeSystemApi.financeStatementQueryBillingInfo({ codes: codes.value });
    form.value = res;
    if (form.value.productBeans.length) {
      form.value.productBeans.forEach((item) => {
        if (item.qty) {
          Reflect.set(item, 'qtyMax', item.qty);
        }
        if (item.qty && item.unitPriceIncludingTax !== null) {
          Reflect.set(
            item,
            'totalAmountTax',
            Math.round(item.unitPriceIncludingTax * item.qty * 100) / 100
          );
        }
        if (item.qty && item.unitPrice !== null) {
          Reflect.set(item, 'amount', Math.round(item.unitPrice * item.qty * 100) / 100);
        }
        if (item.amount && item.taxAmount !== null) {
          //求税额
          changeNum(item, 'amount');
        }
      });
    }
  };

  const open = async (ids) => {
    if (ids) {
      codes.value = ids;
      getDetail();
    }
    if (formRef.value) {
      formRef.value.resetFields();
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table) {
    tfoot {
      font-weight: bold;
      td.el-table__cell:not(:first-child) {
        color: #ef6868;
      }
    }
  }
  .text-style {
    word-break: break-all;
  }
</style>
