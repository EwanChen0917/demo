<template>
  <el-dialog title="单据详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">{{ form[item.key] || '-' }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="付款信息" name="pay">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="(item, index) in payList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">
                      {{
                        form[item.key] !== null &&
                        form[item.key] !== '' &&
                        form[item.key] !== undefined
                          ? form[item.key]
                          : '-'
                      }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="核销信息" name="verification">
          <el-table :data="form?.verificationInfoList">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="borrowMoneyCode" label="借款单号" />
            <el-table-column prop="verificationAmount" label="本次核销借款金额" />
            <el-table-column prop="refundTime" label="还款时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶-报销单：">
                    {{ form?.kingdeePushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.kingdeePushInfo?.pushStatus == 2">
                      {{ `：${form?.kingdeePushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.kingdeePushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶单号：">
                    {{ form?.kingdeePushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="制单信息" name="make">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="创建人">{{ form.creatorDesc || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="创建时间">{{ form.createTime || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="审核时间">{{ form.auditTime || '-' }}</el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName_" type="card" class="demo-tabs">
        <el-tab-pane label="金额明细" name="account">
          <el-table :data="form?.itemInfoList" show-summary :summary-method="getSummaries">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="taxExclusiveAmount" label="未税金额" />
            <el-table-column prop="taxAmount" label="税额" />
            <el-table-column prop="taxIncludedAmount" label="含税金额" />
            <el-table-column prop="feeTypeDesc" label="费用项目" />
            <el-table-column prop="isDevelopmentProjectDesc" label="是否研发项目" min-width="120" />
            <el-table-column prop="developmentProject" label="研发项目" />
            <el-table-column prop="spuDesc" label="SPU" />
            <el-table-column prop="thirdCategoryDesc" label="三级类目" />
            <el-table-column prop="gtmPtlDesc" label="GTM品线" />
            <el-table-column prop="budgetDepartmentDesc" label="预算部门" />
            <el-table-column prop="feeDesc" label="付费说明" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import type { TabsPaneContext, TableColumnCtx } from 'element-plus';

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
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref({});
  const basicList = [
    { label: '单据类型', key: 'sourceTypeDesc' },
    { label: '单据编号', key: 'code' },
    { label: '来源系统', key: 'sourceSystemDesc' },
    { label: '来源单号', key: 'sourceCode' },
    { label: '申请日期', key: 'applyTime' },
    { label: '申请人', key: 'applyMemberDesc' },
    { label: '部门名称', key: 'applyMemberDeptDesc' },
    { label: '付款组织', key: 'payOrgDesc' },
    { label: '支付对象', key: 'payMemberDesc' },
    { label: '单据状态', key: 'payStatusDesc' },
    { label: '备注', key: 'remark' },
  ];
  const payList = [
    { label: '申请支付金额', key: 'applyAmount' },
    { label: '申请支付币别', key: 'applyPayCurrencyCode' },
    { label: '支付方式', key: 'payType' },
    { label: '收款方账户类型', key: 'receiveAccountTypeDesc' },
    { label: '收款方账户名称', key: 'receiveAccountsName' },
    { label: '对方开户行支行', key: 'receiveAccountsSubbranchId' },
    { label: '对方收款账号', key: 'receiveAccountsCode' },
    { label: '月结方式', key: 'monthlyStatementDate' },
    { label: 'swiftcode/sortcode', key: 'swiftCode' },
    { label: '申请支付日期', key: 'applyPayTime' },
    { label: '实际支付日期', key: 'realPayTime' },
    { label: '银行流水号', key: 'serialNumber' },
    { label: '是否CBS付款', key: 'cbsDesc' },
    { label: '付款单号', key: 'payCode' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeExpenseReportQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = { ...res, ...res.baseInfo, ...res.payInfo };
      }
    }
  });
  const getSummaries = (param) => {
    const { columns, data } = param;
    const sums: (string | VNode)[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['taxExclusiveAmount', 'taxAmount', 'taxIncludedAmount'].includes(column.property) &&
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
</script>

<style scoped lang="scss">
  .el-form-item--label-top {
    :deep(.el-form-item__label) {
      font-weight: bold;
    }
  }

  :deep(.el-form-item__content) {
    line-height: 30px;
    display: block;
  }

  .total-text {
    font-weight: bold;

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
</style>
