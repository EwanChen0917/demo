<template>
  <el-form ref="formRef" :model="form" label-width="150" scroll-to-error>
    <KeenCard title="收款信息">
      <el-table class="mt-4" :data="form?.baseBeanList">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="收款单号" prop="code" min-width="150" />
        <el-table-column label="对方账户名" prop="customerAccountName" min-width="110" />
        <el-table-column label="币别" prop="currency" />
        <el-table-column label="金额" prop="amount" />
        <el-table-column label="到账金额" prop="receivedAmount" />
        <el-table-column label="手续费" prop="serviceCharge" width="200">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`baseBeanList[${$index}].serviceCharge`"
              :rules="[
                {
                  pattern: priceRule,
                  message: '请输入数字，最多2位小数',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                v-model.trim="row.serviceCharge"
                ref="autoFocus"
                @blur="changeserviceCharge(row, $index)"
                clearable
                placeholder="请输入手续费"
                style="width: 130px"
                v-if="row.edit"
              ></el-input>
              <span v-else class="serviceCharge">{{ row?.serviceCharge }}</span>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                class="icon"
                @click="changeEditStatus(row)"
              >
                <Edit />
              </el-icon>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="本次核销发票"
          prop="relatedInvoiceList"
          width="320"
          v-if="radio == '1'"
        >
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`baseBeanList[${$index}].relatedInvoiceList`"
              :rules="[
                {
                  required: true,
                  message: '请添加关联发票数据',
                  trigger: ['change'],
                },
              ]"
            >
              <div v-for="(item, i) in row.relatedInvoiceList" :key="i" class="invoice-list-box">
                <el-tooltip effect="light" :content="item.invoiceNo" placement="top">
                  <span class="invoice-value">{{ item.invoiceNo }}</span>
                </el-tooltip>

                <el-form-item
                  class="table-form-item"
                  style="display: inline-block"
                  :prop="`baseBeanList[${$index}].relatedInvoiceList[${i}].invoiceAmount`"
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
                  <!-- <NumberInput
                    v-model="item.invoiceAmount"
                    :precision="2"
                    :min="0"
                    :max="item.invoiceAmountMax"
                    controls-position="right"
                    @focus="invoiceAmountBlur(item)"
                    style="width: 80px; display: inline-block"
                  /> -->
                </el-form-item>
                <el-icon class="icon-delete" @click="deleteData(row, i)">
                  <CircleCloseFilled />
                </el-icon>
              </div>
            </el-form-item>
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
        <el-table-column label="本次核销发票" width="300" v-if="radio == '2'" />
        <el-table-column label="已关联发票金额" prop="relatedInvoiceAmount" min-width="130" />
        <el-table-column label="客户" prop="customerName" min-width="130" />
      </el-table>
      <!-- 可关联剩余金额 = ∑金额 - ∑已关联发票金额 已选关联金额=下方所有选中发票行的“关联金额”汇总数-->
      <!-- 已选关联金额>未关联发票金额 提示 -->
      <div class="tip-text" v-if="radio == '1'">
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
          警告：已选发票金额超过收款单金额，请减少选择或修改关联金额！
        </span>
      </div>
    </KeenCard>
    <KeenCard title="关联信息">
      <el-radio-group v-model="radio" @change="changeType">
        <el-radio value="1">关联发票</el-radio>
        <el-radio value="2">关联客户</el-radio>
      </el-radio-group>
      <invoiceList
        v-if="radio == '1' && invoiceListShow"
        :customerCodes="customerCodes"
        :currency="currency"
        @correlationAmountChange="correlationAmountChange"
      />
      <customerList v-if="radio == '2'" @getCustomerCode="getCustomerCode" />
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel" class="cancel-btn">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave">确认关联</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="collectionClaim">
  import { financeSystemApi, dataApi } from '@/api';
  import { priceRule } from '@/utils/rulesRegExp';
  import invoiceList from './components/invoiceList.vue';
  import customerList from './components/customerList.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import Decimal from 'decimal.js';

  const { closeTabAndRefresh } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const form = ref();
  const formInit = ref();
  const selectData = ref([]);
  const radio = ref('1');
  const surplusAmount = ref(0);
  const correlationAmount = ref(0);
  const saveLoading = ref(false);
  const invoiceListShow = ref(false);
  const customerCodes = ref(undefined);
  const currency = ref('');
  // 获取回款认领信息
  const financePaymentCollection = async () => {
    if (!route?.query?.code) return;
    const codes = Array.isArray(route?.query?.code) ? route?.query?.code : [route?.query?.code];
    customerCodes.value = route?.query?.customerCode ? [route?.query?.customerCode] : undefined;
    const res = await financeSystemApi.financePaymentCollectionClaim({
      codes: codes,
    });
    form.value = res;
    formInit.value = res;
    surplusAmount.value = res.unWriteOffAmount || 0;
    let customerCode = form.value?.baseBeanList.find((item) => item.customerCode)?.customerCode;
    customerCodes.value = customerCode ? [customerCode] : undefined;
    currency.value = form.value?.baseBeanList[0].currency;
    form.value?.baseBeanList?.forEach((item) => {
      Reflect.set(item, 'relatedInvoiceList', []);
    });
    invoiceListShow.value = true;
  };
  financePaymentCollection();
  // 获取发票分摊信息
  const getDefaultApportion = async (list) => {
    const params = {
      claimBeans: form.value?.baseBeanList,
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
    form.value.baseBeanList = res.baseBeanList;
    form.value.baseBeanList.forEach((item) => {
      if (item.relatedInvoiceList?.length) {
        item.relatedInvoiceList.forEach((child) => {
          child.invoiceAmountMax = child.invoiceAmount;
        });
      }
    });
  };

  //实时获取可填的最大值，该发票的关联金额
  const invoiceAmountBlur = (item) => {
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
  const autoFocus = ref(null);
  // 编辑状态
  const changeEditStatus = (row) => {
    row.edit = true;
    nextTick(() => {
      if (autoFocus.value) {
        autoFocus.value.focus();
      }
    });
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
      formRef.value.clearValidate(`baseBeanList[${index}].relatedInvoiceList`);
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
  // 手续费修改 金额= 到账金额 +手续费，更新收款单“金额”
  const changeserviceCharge = (row, index) => {
    let numValue = 0; //本次修改手续费的差额
    const amount = JSON.parse(JSON.stringify(row.amount));
    if (row.serviceCharge) {
      formRef.value.validateField(`baseBeanList[${index}].serviceCharge`, async (valid) => {
        if (valid) {
          // 手续费保存
          await financeSystemApi.financePaymentCollectionSaveFee({
            code: row.code,
            fee: row.serviceCharge,
          });
          row.amount = Decimal.add(row.receivedAmount, row.serviceCharge).toNumber();
          row.edit = false;
          // 可关联剩余金额变动
          numValue = Decimal.sub(Number(amount), row.amount).toNumber();
          surplusAmount.value = Decimal.add(surplusAmount.value, -numValue).toNumber();
        } else {
          row.edit = true;
        }
      });
    } else {
      row.amount = row.receivedAmount;
      row.edit = false;
      // 可关联剩余金额变动
      numValue = Decimal.sub(Number(amount), row.amount).toNumber();
      surplusAmount.value = Decimal.add(surplusAmount.value, -numValue).toNumber();
    }
  };
  // 已选关联金额变化
  const correlationAmountChange = (value, list, codeList) => {
    correlationAmount.value = value;
    selectData.value = list;
    selectData.value.forEach((item) => {
      Reflect.set(item, 'check', false);
    });
    //清除已经填写的核销发票
    form.value?.baseBeanList?.forEach((item) => {
      if (item?.relatedInvoiceList?.length) {
        item.relatedInvoiceList = [];
      }
    });
    if (codeList?.length) {
      getDefaultApportion(list);
    }
  };
  // 关联客户
  const customerCode = ref('');
  const customerName = ref('');
  const getCustomerCode = (code, name) => {
    customerCode.value = code;
    customerName.value = name;
  };

  const changeType = () => {
    customerCode.value = '';
    customerName.value = '';
  };
  const currencyList = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyList.value = res.currencyList || [];
  };
  getCurrencyOptions();
  const handleSave = async () => {
    let find = form.value?.baseBeanList.find((item) => item?.relatedInvoiceList?.length);
    if ((customerCode.value == '' && radio.value == '2') || (!find && radio.value == '1')) {
      ElMessage.error('请选择要关联的发票或客户！');
      return;
    }
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (radio.value == '1') {
        if (correlationAmount.value > surplusAmount.value) {
          ElMessage.error('已选发票金额超过收款单可关联金额，请减少选择或修改关联金额');
          return;
        }
        form.value?.baseBeanList.forEach((item) => {
          item.invoiceNo = item.relatedInvoiceList
            .map((i) => i.invoiceNo)
            ?.filter((invoiceNo) => invoiceNo)
            ?.join(',');
          item.customerCode = selectData.value[0].customerCode;
          item.customerName = selectData.value[0].customerName;
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
          customerCodeList: [form.value.baseBeanList?.[0]?.customerCode],
        });
        // 可用额度
        if (creditLimit && creditLimit?.creditLimitBeans?.length) {
          const confirm = await swal.confirmHtml(
            `<h2 style="color: var(---N9, #1f1f1f)!important;font-size: 15px;">确认关联后，将按收款单关联发票的金额，恢复该客户的信用额度：
          <span style="color:var(--el-color-danger)!important;">${currencySymbol}${correlationAmount.value} ${currencyName}</span>，请确认是否继续？</h2>`
          );
          if (confirm) {
            relatedInvoice('', 1);
          }
        } else {
          relatedInvoice('客户信用额度不存在，无法调整信用额度。是否继续认领？', 0);
        }
      } else {
        formInit.value?.baseBeanList.forEach((item) => {
          item.customerCode = customerCode.value;
          item.customerName = customerName.value;
        });
        const res = await financeSystemApi.financePaymentCollectionRelatedCustomer({
          claimBeans: formInit.value?.baseBeanList,
        });
        ElMessage.success('关联客户成功');
        cancelSave();
      }
    }
  };

  const relatedInvoice = async (tip, adjustCreditLimit) => {
    if (tip) {
      const isConfirm = await swal.confirm(tip);
      if (!isConfirm) return;
    }
    const res = await financeSystemApi.financePaymentCollectionRelatedInvoice({
      claimBeans: form.value?.baseBeanList,
      adjustCreditLimit: adjustCreditLimit,
    });
    ElMessage.success('关联发票成功');
    cancelSave();
  };
  const cancelSave = async () => {
    closeTabAndRefresh('paymentCollection');
    router.push({
      name: 'paymentCollection',
      query: { refresh: 1 },
    });
  };
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.push({
        name: 'paymentCollection',
      });
    }
  };
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

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
    margin-bottom: 2rem;
    .table-form-item {
      margin-top: 0;
    }
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
