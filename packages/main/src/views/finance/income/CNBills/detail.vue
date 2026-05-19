<template>
  <el-form ref="formRef" :model="form" label-width="150" scroll-to-error>
    <KeenCard title="CN信息">
      <el-table class="mt-4" :data="form?.writeOffBeans">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="CN单号" prop="code" />
        <el-table-column label="费用" prop="feeDetail" />
        <el-table-column label="币别" prop="currency" />
        <el-table-column label="金额" prop="amount" />
        <el-table-column label="本次核销发票" prop="relatedInvoiceList" width="320">
          <template #default="{ row, $index }">
            <div v-for="(item, i) in row.relatedInvoiceList" :key="i" class="invoice-list-box">
              <el-tooltip effect="light" :content="item.invoiceNo" placement="top">
                <span class="invoice-value">{{ item.invoiceNo }}</span>
              </el-tooltip>
              <el-form-item
                class="table-form-item"
                style="display: inline-block"
                :prop="`writeOffBeans[${$index}].relatedInvoiceList[${i}].invoiceAmount`"
                :rules="[
                    {
                      required: true,
                      message: '请输入',
                      trigger: ['blur', 'change'],
                    },
                    {
                        pattern: priceRule,
                        message: '请输入数字，最多2位小数',
                        trigger: ['blur', 'change'],
                      },
                    {
                      validator:(rule: any, value: any, callback: any) => {
                        if (value==0) {
                          callback(new Error('值必须大于0'))
                        } else if (value > item.invoiceAmountMax) {
                          callback(new Error(`可输入最大值为${item.invoiceAmountMax}`))
                        } else {
                          callback()
                        }
                      },
                      trigger: ['blur', 'change'],
                    }
                  ]"
              >
                <el-input
                  v-model.trim="item.invoiceAmount"
                  @focus="invoiceAmountBlur(item)"
                  @change="invoiceAmountChange(item)"
                  placeholder="请输入"
                  style="width: 80px; display: inline-block"
                ></el-input>
              </el-form-item>
              <el-icon class="icon-delete" @click="deleteData(row, i)">
                <CircleCloseFilled />
              </el-icon>
            </div>
            <el-popover placement="right" :width="400" trigger="click">
              <template #reference>
                <el-icon class="icon-add" @click="checkSelectData(row)">
                  <CirclePlusFilled />
                </el-icon>
              </template>
              <div class="select-list">
                <div
                  v-for="(item, i) in selectData"
                  :key="i"
                  class="select-list-item"
                  :class="{ 'check-data': item.check }"
                  @click="addData(row, item, $index)"
                  v-if="selectData.length"
                >
                  {{ item.invoiceNo }}
                </div>
                <div class="select-list-item check-data" v-else>请先勾选下方关联发票数据</div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="核销金额" prop="writeOffAmount" />
        <el-table-column label="客户" prop="customerName" />
      </el-table>
      <!-- 可关联剩余金额 = ∑金额 - ∑已关联发票金额 已选关联金额=下方所有选中发票行的“关联金额”汇总数-->
      <!-- 已选关联金额>未关联发票金额 提示 -->
      <div class="tip-text">
        可关联剩余金额：
        <span class="font-weight mr150">{{ surplusAmount }}</span>
        已选关联金额：
        <span
          class="font-weight mr150"
          :class="correlationAmount > surplusAmount ? 'color-red' : 'color-green'"
        >
          {{ correlationAmount }}
        </span>
        <span class="color-red" v-if="correlationAmount > surplusAmount">
          警告：已选发票金额超过CN单金额，请减少选择或修改关联金额！
        </span>
      </div>
    </KeenCard>
    <KeenCard title="关联信息">
      <el-radio-group v-model="radio">
        <el-radio value="1">关联发票</el-radio>
      </el-radio-group>
      <invoiceList
        v-if="invoiceListShow"
        :customerCodes="customerCodes"
        :currency="currency"
        @correlationAmountChange="correlationAmountChange"
      />
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel" class="cancel-btn">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave">确认关联</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="financeWriteOff">
  import { financeSystemApi, dataApi } from '@/api';
  import { priceRule } from '@/utils/rulesRegExp';
  import invoiceList from '@/views/finance/income/paymentCollection/components/invoiceList.vue';
  import * as swal from '@/utils/swal';
  import { useTabs } from '@/hooks/tabs';
  import { ElMessage, FormInstance } from 'element-plus';

  const { closeTabAndRefresh } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const form = ref();
  const selectData = ref([]);
  const radio = ref('1');
  const surplusAmount = ref(3);
  const correlationAmount = ref(0);
  const saveLoading = ref(false);
  const invoiceListShow = ref(false);
  const customerCodes = ref(undefined);
  const currency = ref('');
  // 获取回款认领信息
  const financePaymentCollection = async () => {
    if (!route?.query?.code) return;
    const codes = Array.isArray(route?.query?.code) ? route?.query?.code : [route?.query?.code];
    const res = await financeSystemApi.financeCnOrderQueryWriteOffDetail(codes);
    form.value = res;
    surplusAmount.value = res.unWriteOffAmount || 0;
    let customerCode = form.value?.writeOffBeans.find((item) => item.customerCode)?.customerCode;
    customerCodes.value = customerCode ? [customerCode] : undefined;
    currency.value = form.value?.writeOffBeans[0].currency;
    form.value?.writeOffBeans?.forEach((item) => {
      Reflect.set(item, 'relatedInvoiceList', []);
      item.relatedInvoiceAmount = 0; //已关联发票金额
    });
    invoiceListShow.value = true;
  };
  financePaymentCollection();
  // 获取发票分摊信息
  const getDefaultApportion = async (list) => {
    const params = {
      claimBeans: form.value?.writeOffBeans,
      selectedInvoices: list.map((row) => {
        return {
          invoiceNetAmount: row?.invoiceNetAmount || 0, //发票净额
          invoiceNumber: row?.code, //发票号
          relatedAmount: row?.invoiceAmount, //关联金额
          unWriteOffAmount: row?.unWriteOffAmount, //未核销金额
        };
      }),
      unWriteOffAmount: surplusAmount.value,
    };
    const res = await financeSystemApi.financePaymentCollectionDefaultApportion(params);
    form.value.writeOffBeans = res.baseBeanList;
    form.value.writeOffBeans.forEach((item) => {
      if (item.relatedInvoiceList?.length) {
        item.relatedInvoiceList.forEach((child) => {
          child.invoiceAmountMax = child.invoiceAmount;
        });
      }
    });
  };
  //实时获取可填的最大值，该发票的关联金额
  const invoiceAmountBlur = (item) => {
    console.log(item);
    let find = selectData.value?.find((item) => {
      return item.invoiceNo == item.invoiceNo;
    });
    if (find) {
      item.invoiceAmountMax = find.invoiceAmount;
    }
  };
  const invoiceAmountChange = (item) => {
    if (item.invoiceAmount > item.invoiceAmountMax) {
      item.invoiceAmount = item.invoiceAmountMax;
    }
  };

  // 添加发票
  const addData = (row, item, index) => {
    if (!item.check) {
      row.relatedInvoiceList.push({
        invoiceNo: item.invoiceNo,
        invoiceAmount: undefined,
        invoiceAmountMax: item.invoiceAmountMax,
      });
      item.check = true;
      formRef.value.clearValidate(`writeOffBeans[${index}].relatedInvoiceList`);
    }
  };
  // 删除发票
  const deleteData = (row, i) => {
    row.relatedInvoiceList.splice(i, 1);
  };
  // 检测已关联发票
  const checkSelectData = (row) => {
    selectData.value.forEach((res) => {
      let find = row?.relatedInvoiceList?.find((item) => {
        return item.invoiceNo == res.invoiceNo;
      });
      if (find) {
        res.check = true;
      } else {
        res.check = false;
      }
    });
  };
  const formRef = ref();
  // 已选关联金额变化
  const correlationAmountChange = (value, list, codeList) => {
    correlationAmount.value = value;
    selectData.value = list;
    selectData.value.forEach((item) => {
      Reflect.set(item, 'check', false);
    });
    //清除已经填写的核销发票
    form.value?.writeOffBeans?.forEach((item) => {
      if (item?.relatedInvoiceList?.length) {
        item.relatedInvoiceList = [];
      }
    });
    if (codeList?.length) {
      getDefaultApportion(list);
    }
  };
  const currencyList = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyList.value = res.currencyList || [];
  };
  getCurrencyOptions();
  const handleSave = async () => {
    let find = form.value?.writeOffBeans.find((item) => item?.relatedInvoiceList?.length);
    if (!find && radio.value == '1') {
      ElMessage.error('请选择要关联的发票！');
      return;
    }
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (correlationAmount.value > surplusAmount.value) {
        ElMessage.error('已选发票金额超过CN单可关联金额，请减少选择或修改关联金额');
        return;
      }
      form.value?.writeOffBeans.forEach((item) => {
        item.invoiceNo = item.relatedInvoiceList
          .map((i) => i.invoiceNo)
          ?.filter((invoiceNo) => invoiceNo)
          ?.join(',');
      });
      let currencyObj = currencyList.value.find((item) => item.currencyCode == currency.value);
      let currencySymbol = '';
      let currencyName = currency.value;
      if (currencyObj) {
        currencySymbol = currencyObj.currencySymbol || '';
        currencyName = currencyObj.currencyName || currency.value;
      }
      // 查询客户信用额度
      const creditLimit = await financeSystemApi.financeStatementQueryCreditLimit({
        customerCodeList: [form.value.writeOffBeans?.[0]?.customerCode],
      });
      // 可用额度
      if (creditLimit && creditLimit?.creditLimitBeans?.length) {
        const confirm = await swal.confirmHtml(
          `<h2 style="color: var(---N9, #1f1f1f)!important;font-size: 15px;">确认关联后，将按CN单关联发票的金额，恢复该客户的信用额度：
        <span style="color:var(--el-color-danger)!important;">${currencySymbol}${correlationAmount.value} ${currencyName}</span>，请确认是否继续？</h2>`
        );
        if (confirm) {
          relatedInvoice('', 1);
        }
      } else {
        relatedInvoice('客户信用额度不存在，无法调整信用额度。是否继续核销？', 0);
      }
    }
  };
  const relatedInvoice = async (tip, adjustCreditLimit) => {
    if (tip) {
      const isConfirm = await swal.confirm(tip);
      if (!isConfirm) return;
    }
    const res = await financeSystemApi.financeCnOrderRelatedInvoice({
      writeOffBeans: form.value?.writeOffBeans,
      adjustCreditLimit: adjustCreditLimit, //是否操作信用额度 0-不调整  1-调整
    });
    ElMessage.success('关联发票成功');
    closeTabAndRefresh('financeCNBills');
    router.push({
      name: 'financeCNBills',
      query: { refresh: 1 },
    });
  };
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.push({
        name: 'financeCNBills',
      });
    }
  };
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 0;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
      font-size: 12px;
    }
  }
  .serviceCharge {
    width: 130px;
    display: inline-block;
  }
  .icon {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }
  .icon-delete {
    margin-left: 6px;
    display: inline-block;
    // display: none;
    cursor: pointer;
    font-size: 18px;
  }
  .icon-add {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    color: #02b96b;
    float: right;
    margin-top: 9px;
  }
  .invoice-value {
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
  }
  .invoice-list-box {
    width: 270px;
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    padding: 0 10px;
    border-radius: 50px;
    height: 36px;
    padding-top: 2px;
    display: inline-block;
    margin-bottom: 1.75rem;
    span {
      margin-right: 10px;
    }
    :deep(.inp-number .number-box .el-input-number.is-without-controls .el-input__inner) {
      background-color: var(--el-color-primary-light-9) !important;
      border-radius: 6px;
      padding: 0 3px;
    }
    :deep(.inp-number .number-box .el-input-number .el-input__inner) {
      height: 30px;
      margin: 0 2px;
    }
  }
  .invoice-list-box:hover {
    .icon-delete {
      display: inline-block;
    }
  }
  .select-list {
    padding: 10px;
    &-item {
      line-height: 30px;
      cursor: pointer;
      color: var(--el-color-primary);
    }
    .check-data {
      cursor: auto;
      color: #b6b6b6;
    }
  }
  .tip-text {
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    background-color: var(--el-color-primary-light-9);
    padding: 0 20px;
    margin-top: 30px;
    .font-weight {
      font-weight: bold;
    }
    .mr150 {
      margin-right: 150px;
    }
    .color-red {
      color: var(--el-color-danger);
    }
    .color-green {
      color: var(--el-color-primary);
    }
  }
</style>
