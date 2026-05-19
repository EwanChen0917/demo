<template>
  <el-dialog :title="title" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <div v-if="item.label === '标识' && title === '编辑'">
                      <!-- 除已付、部分已付、无需支付、无支付信息，可以更改外（这四个只能选一个），其他的选项，均是不可取消或勾选 -->
                      <el-select v-model="tagsValue" placeholder="标识" style="width: 120px">
                        <el-option
                          v-for="(item, index) in orderCodeList"
                          :key="index"
                          :label="item.name"
                          :value="item.code"
                        />
                      </el-select>
                      {{ tagsName }}
                    </div>
                    <div v-else-if="item.label === '付款账号' && title === '编辑'">
                      <el-select
                        v-model="baseInfo[item.key]"
                        filterable
                        placeholder="付款账号"
                        style="width: 220px"
                        @change="changeAmount"
                        :filter-method="getAccountList"
                      >
                        <el-option
                          v-for="item in accountList"
                          :key="item.bankAccount"
                          :label="item.bankAccount"
                          :value="item.bankAccount"
                        />
                      </el-select>
                    </div>
                    <div v-else-if="item.label === '记账日期' && title === '编辑'">
                      <el-date-picker
                        v-model="baseInfo[item.key]"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="记账日期"
                        :clearable="false"
                      />
                    </div>
                    <div v-else-if="item.label === '推送状态'">
                      {{ form?.kingdeePushInfo?.pushStatusDesc || '-' }}
                    </div>
                    <div v-else-if="item.label === '异常信息'">
                      {{ form?.kingdeePushInfo?.failReason || '-' }}
                    </div>
                    <div v-else-if="item.label === '推送时间'">
                      {{ form?.kingdeePushInfo?.pushTime || '-' }}
                    </div>
                    <div v-else-if="item.label === '结算币别'">
                      {{ baseInfo.currencyCode || '-' }}
                      {{ baseInfo.currencyName ? `[${baseInfo.currencyName}]` : '' }}
                    </div>
                    <div v-else-if="item.label === '付款币别'">
                      {{ baseInfo.payCurrencyCode || '-' }}
                      {{ baseInfo.payCurrencyName ? `[${baseInfo.payCurrencyName}]` : '' }}
                    </div>
                    <div v-else-if="item.label === '备注'">
                      <OverflowTooltip
                        effect="light"
                        :content="baseInfo?.remark"
                        :line="1"
                        v-if="baseInfo?.remark"
                      />
                      <span v-else>-</span>
                    </div>
                    <span class="text-style" v-else>
                      {{
                        baseInfo[item.key] || baseInfo[item.key] === 0 ? baseInfo[item.key] : '-'
                      }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName_" type="card" class="demo-tabs">
        <el-tab-pane label="付款明细" name="account">
          <el-table
            :data="form?.oaPaymentItemInfoList"
            show-summary
            :summary-method="getSummaryOaPayment"
            class="py-4"
          >
            <el-table-column prop="seq" label="序号" width="70" />
            <el-table-column prop="expenseDesc" label="费用类型" />
            <el-table-column prop="feeDesc" label="费用说明" />
            <el-table-column prop="amount" label="应付金额" />
            <el-table-column prop="tax" label="税额" />
            <el-table-column prop="fee" label="手续费" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="预算明细" name="account2">
          <el-table
            :data="form?.oaPaymentBudgetInfoList"
            show-summary
            :summary-method="getSummaryOaPaymentBudget"
            class="py-4"
          >
            <el-table-column prop="seq" label="序号" width="70" />
            <el-table-column prop="budgetDept" label="预算部门" />
            <el-table-column prop="platform" label="平台" />
            <el-table-column prop="shop" label="店铺" />
            <el-table-column prop="country" label="国家" />
            <el-table-column prop="gtmLine" label="GTM品线" />
            <el-table-column prop="spuName" label="SPU名称" />
            <el-table-column prop="categoryLevel3" label="三级类目" />
            <el-table-column prop="amount" label="金额" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer v-if="title === '编辑'">
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit(false)" :loading="saveLoading">
          保存
        </el-button>
        <el-button
          type="primary"
          @click="handleFormSubmit(true)"
          :loading="saveLoading"
          :disabled="!form?.button?.canPushKingdee"
        >
          保存并推送
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import type { TabsPaneContext } from 'element-plus';

  const activeName = ref('base');
  const activeName_ = ref('account');
  const tableData = ref();
  const router = useRouter();
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };

  const props = defineProps<{
    visible: boolean;
    code: string;
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();

  const form = ref({ tagsValue: '' });
  const tagsValue = ref();
  const tagsName = ref();
  const tags = ref();
  const baseInfo = ref({
    orderCode: '',
  });
  const basicList = [
    { label: '审批单号', key: 'orderCode' },
    { label: '流程名称', key: 'processName' },
    { label: '金蝶单据状态', key: 'kingdeeStatusTitle' },
    { label: '完成日期', key: 'completeDate' },
    { label: '申请人', key: 'applicantName' },
    { label: '申请部门', key: 'departmentNames' },
    { label: '结算币别', key: 'currencyName' },
    { label: '付款币别', key: 'payCurrencyName' },
    { label: '应付金额', key: 'totalAmount' },
    { label: '税额', key: 'totalTax' },
    { label: '手续费', key: 'totalFee' },
    { label: '研发项目', key: 'researchProject' },
    { label: '支付单位', key: 'payUnit' },
    { label: '支付对象', key: 'payee' },
    { label: '标识', key: 'tagsNames' },
    { label: '付款账号', key: 'paymentAccount' },
    { label: '推送状态', key: 'pushStatusDesc' },
    { label: '异常信息', key: 'failReason' },
    { label: '备注', key: 'remark' },
    { label: '推送时间', key: 'pushTime' },
    { label: '记账日期', key: 'accountDate' },
  ];
  const orderCodeList = [
    { name: '已付', code: 'paid' },
    { name: '部分已付', code: 'partially_paid' },
    { name: '无需支付', code: 'no_payment_required' },
    { name: '无支付信息', code: 'no_payment_info' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeOaPaymentOrderQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
        baseInfo.value = res.oaPaymentInfo;
        if (props.title === '编辑') {
          const tagsData = baseInfo.value?.tags?.split(',');
          const tagsNames = baseInfo.value?.tagsNames?.split(',');
          console.log(tags.value);
          tagsValue.value = '';
          tags.value = [];
          tagsData?.forEach((tag) => {
            if (
              tag === 'paid' ||
              tag === 'partially_paid' ||
              tag === 'no_payment_required' ||
              tag === 'no_payment_info'
            ) {
              tagsValue.value = tag;
            } else {
              tags.value.push(tag);
            }
          });
          let arr = tagsNames?.filter((item) => {
            return (
              item !== '已付' && item !== '部分已付' && item !== '无需支付' && item !== '无支付信息'
            );
          });
          tagsName.value = arr?.join(',');
        }
      }
    }
  });
  const getSummaryOaPayment = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['amount', 'tax', 'fee'].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);

          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            return total.toFixed(2);
          }
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
  const getSummaryOaPaymentBudget = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (['amount'].includes(column.property) && !values.every((value) => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);

          if (!Number.isNaN(value)) {
            let total = Number(prev) + Number(curr);
            return total.toFixed(2);
          }
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });

    return sums;
  };
  // 如果是补充了“付款账号”，则“无付款账号”的标识，要取消勾选
  const changeAmount = () => {};
  const accountList = ref([]);
  const getAccountList = async (key) => {
    const param = {
      pageNum: 1,
      pageSize: 200,
      keyword: key,
    };
    const res = await financeSystemApi.financeBasicQueryBankAccountList(param);
    accountList.value = res.recordList;
  };
  getAccountList('');
  // 提交操作

  const saveLoading = ref(false);
  const handleFormSubmit = async (pushKingdee) => {
    // 如果是补充了“付款账号”，则“无付款账号”的标识，要取消勾选
    if (baseInfo.value.paymentAccount && baseInfo.value?.tags.includes('no_payment_account')) {
      tags.value = tags.value.filter((item) => item !== 'no_payment_account');
    }
    console.log(tags.value);

    if (tagsValue.value) {
      tags.value.push(tagsValue.value);
    }
    console.log(tags.value);
    const param = {
      accountDate: baseInfo.value.accountDate,
      orderCode: baseInfo.value.orderCode,
      paymentAccount: baseInfo.value.paymentAccount,
      pushKingdee: pushKingdee,
      tags: tags.value,
    };
    const res = await financeSystemApi.financeOaPaymentOrderUpdate(param);
    emit('success');
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
