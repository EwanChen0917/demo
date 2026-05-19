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
              <!-- 推送金蝶-资产卡片 有多条数据，因为推送的时候，是按照明细去推送的-->
              <el-row
                :gutter="20"
                v-for="(item, index) in form?.listKingdeeAssetCardPushInfo"
                :key="index"
              >
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶-资产卡片：">
                    {{ item?.pushStatusDesc || '-' }}
                    <span v-if="item?.pushStatus == 2">{{ `：${item?.failReason}` }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">{{ item?.pushTime || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶单号：">{{ item?.number || '-' }}</el-form-item>
                </el-col>
              </el-row>
              <!-- 已核销才有付款退款单 -->
              <el-row
                :gutter="20"
                v-if="form?.reconciliationStatus == 3"
                v-for="(item, index) in form?.listKingdeeRefundPushInfo"
                :key="index"
              >
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶-付款退款单：">
                    {{ item?.pushStatusDesc || '-' }}
                    <span v-if="item?.pushStatus == 2">{{ `：${item?.failReason}` }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">{{ item?.pushTime || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶单号：">{{ item?.number || '-' }}</el-form-item>
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
      <el-tabs v-model="activeName_" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="金额明细" name="account">
          <el-table :data="form?.listMoneyItem" class="py-4">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="payApplyNetAmount" label="金额" />
            <el-table-column prop="payApplyTaxAmount" label="税额" />
            <el-table-column prop="payApplyIncludeTaxAmount" label="含税金额" min-width="90px" />
            <el-table-column prop="gtmPxName" label="GTM品线" min-width="100px" />
            <el-table-column prop="categoryName" label="三级类目" min-width="90px" />
            <el-table-column prop="budgetDeptName" label="预算部门" min-width="90px" />
            <el-table-column prop="developTeamName" label="研发项目" min-width="90px" />
          </el-table>
          <div class="total-text" v-if="form?.listMoneyItem?.length">
            <span>金额合计</span>
            <span class="text-red">{{ form?.totalPayApplyAmount }}</span>
            <el-divider class="divider-margin" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="资产明细" name="funds">
          <el-table :data="form?.listSubFormItem" class="py-4">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="extraInfoBean" label="资产编号" min-width="100px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.productCode }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="资产名称" min-width="90px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.productName }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="是否资产" min-width="90px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.fixedAssetDesc }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="是否收到资产" min-width="120px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.receiveFixedAssetDesc }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="资产类别" min-width="90px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.category }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="资产原值" min-width="90px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.originalPrice }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="发票税率" min-width="110px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.invoiceTaxDesc }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="资产未税金额" min-width="120px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.preTaxAssetAmount }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="实际未税金额" min-width="120px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.netPaymentAmount }}
              </template>
            </el-table-column>
            <el-table-column prop="extraInfoBean" label="未税差额" min-width="90px">
              <template #default="{ row }">
                {{ row?.extraInfoBean?.netDifference }}
              </template>
            </el-table-column>
          </el-table>
          <div class="total-text" v-if="form?.listSubFormItem?.length">
            <span>资产未税金额合计</span>
            <span class="text-red">{{ form?.preTaxAssetAmountTotal }}</span>
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
    { label: '申请部门', key: 'applyMemberDeptName' },
    { label: '月结方式', key: 'monthPayMode' },
    { label: '付款组织', key: 'payOrgName' },
    { label: '是否CBS付款', key: 'cbsPayDesc' },
    { label: '支付对象', key: 'payObject' },
    { label: '申请事由', key: 'applyReason' },
    { label: '发票状态', key: 'invoiceStatusDesc' },
    { label: '单据状态', key: 'billStatusDesc' },
  ];
  const payList = [
    { label: '申请支付金额', key: 'totalPayApplyAmount' },
    { label: '申请支付币别', key: 'currencyName' },
    { label: '支付方式', key: 'payType' },
    { label: '对方开户行', key: 'accountsBankName' },
    { label: '开户行联行号', key: 'accountsBankId' },
    { label: '对方开户支行', key: 'accountsSubbranchName' },
    { label: '开户支行联行号', key: 'accountsSubbranchId' },
    { label: '对方银行账号', key: 'accountsCode' },
    { label: 'swiftcode/sortcode', key: 'swiftCode' },
    { label: '期望支付日期', key: 'payApplyDate' },
    { label: '实付金额', key: 'paidAmount' },
    { label: '实付币别', key: 'paidCurrencyDesc' },
    { label: '银行流水号', key: 'bankSerialNumber' },
    { label: '实际支付日期', key: 'payTime' },
  ];
  watchEffect(async () => {
    if (props.code) {
      activeName.value = 'base';
      activeName_.value = 'account';
      const res = await financeSystemApi.financePayQueryApplyOrderDetail({
        payApplyBillNo: props.code,
      });
      if (res) {
        form.value = { ...res, ...res.accountInfo, ...res.extraInfo };
        let total = 0;
        form.value?.listSubFormItem.forEach((item) => {
          if (item?.extraInfoBean?.preTaxAssetAmount) {
            total += item.extraInfoBean.preTaxAssetAmount;
          }
        });
        form.value.preTaxAssetAmountTotal = total.toFixed(2);
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
