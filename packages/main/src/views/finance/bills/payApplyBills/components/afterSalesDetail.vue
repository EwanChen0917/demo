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
                      {{ form[item.key] !== null && form[item.key] !== '' ? form[item.key] : '-' }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶-付款申请单：">
                    {{ form?.kingdeePayAppllyPushInfo?.pushStatusDesc || '-' }}
                    <span
                      v-if="form?.kingdeePayAppllyPushInfo?.pushStatus == 2"
                      class="text-display"
                    >
                      {{ `：${form?.kingdeePayAppllyPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.kingdeePayAppllyPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶单号：">
                    {{ form?.kingdeePayAppllyPushInfo?.number || '-' }}
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
                  <el-form-item label="创建人">{{ form.creatorName || '-' }}</el-form-item>
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
          <el-table :data="form?.listSubFormItem" class="py-4">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="extraInfoBean" label="退款金额">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.refundAmount }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="手续费">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.serviceFee }}
              </template>
            </el-table-column>
            <el-table-column prop="payApplyAmount" label="单笔总金额" min-width="120" />
            <el-table-column prop="extraInfoBean" label="数量">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.quantity }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="PO号">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.poBillNo }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="平台SKU">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.skuName }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="店铺">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.shopName }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="客户收款账号" min-width="150">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.receiveAccount }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="申请支付币别" min-width="150">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.currencyName }}
              </template>
            </el-table-column>
          </el-table>
          <div class="total-text" v-if="form?.listSubFormItem?.length">
            <span>合计</span>
            <span class="text-red">{{ form?.totalPayApplyAmount }}</span>
            <el-divider class="divider-margin" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref({});
  const basicList = [
    { label: '单据类型', key: 'billTypeDesc' },
    { label: '单据编号', key: 'payApplyBillNo' },
    { label: '来源系统', key: 'systemCodeDesc' },
    { label: '来源单号', key: 'sourceBillNo' },
    { label: '申请日期', key: 'applyTime' },
    { label: '申请人', key: 'applyMemberName' },
    { label: '部门名称', key: 'applyMemberDeptName' },
    { label: '付款组织', key: 'payOrgName' },
    { label: '支付对象', key: 'payObject' },
    { label: '平台', key: 'platformName' },
    { label: '发起退款类型', key: 'refundType' },
    // { label: 'PO号', key: 'poBillNo' },
    // { label: '平台SKU', key: 'skuName' },
    // { label: '数量', key: 'quantity' },
    { label: '单据状态', key: 'billStatusDesc' },
    { label: '发票状态', key: 'invoiceStatusDesc' },
    { label: '核销状态', key: 'reconciliationStatusDesc' },
    { label: '申请事由', key: 'applyReason' },
  ];
  const payList = [
    { label: '申请支付金额', key: 'totalPayApplyAmount' },
    { label: '支付方式', key: 'payType' },
    { label: '对方收款账号', key: 'accountsCode' },
    { label: '实际支付日期', key: 'payTime' },
    { label: '是否CBS付款', key: 'cbsPayDesc' },
    { label: '银行流水号', key: 'bankSerialNumber' },
    { label: '付款单号', key: 'payId' },
  ];
  watchEffect(async () => {
    if (props.code) {
      activeName.value = 'base';
      const res = await financeSystemApi.financePayQueryApplyOrderDetail({
        payApplyBillNo: props.code,
      });
      if (res) {
        form.value = { ...res, ...res.accountInfo, ...res.extraInfo };
      }
    }
  });
</script>

<style scoped lang="scss">
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
  .text-display {
    display: contents;
  }
  .divider-margin {
    margin: 10px 0;
  }
</style>
