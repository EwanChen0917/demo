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
                    <span class="text-style">{{ baseInfo[item.key] || '-' }}</span>
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
                    <span class="text-style">{{ payInfo[item.key] || '-' }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="还款信息" name="Repayment">
          <KeenCard title="">
            <el-table :data="form?.refundItemList">
              <el-table-column type="index" label="序号" width="70" />
              <el-table-column prop="refundOrderTypeDesc" label="单据类型" width="100" />
              <el-table-column prop="refundCode" label="单据编号" min-width="120" />
              <el-table-column prop="refundTypeDesc" label="还款方式" />
              <el-table-column prop="refundAmount" label="还款金额" />
              <el-table-column prop="refundTime" label="还款时间" min-width="160" />
            </el-table>
            <div class="total-text" v-if="form?.refundItemList?.length">
              <span>待还款金额:</span>
              <span class="text-red">{{ form?.baseInfo?.totalWaitRefundAmount }}</span>
              <span>已还款金额：</span>
              <span class="text-blue">{{ form?.baseInfo?.totalRefundAmount }}</span>
              <span>还款状态：</span>
              <span class="text-red">{{ form?.baseInfo?.refundStatusDesc }}</span>
              <el-divider class="divider-margin" />
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶：">
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
                  <el-form-item label="创建人">
                    {{ form?.baseInfo?.creatorDesc || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="创建时间">
                    {{ form?.baseInfo?.createTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="审核时间">
                    {{ form?.baseInfo?.auditTime || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
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
  const baseInfo = ref({
    applyMemberCode: '',
    applyMemberCorporationName: '',
    applyMemberDeptDesc: '',
    applyMemberDeptId: '',
    applyMemberDesc: '',
    applyReason: '',
    applyTime: '',
    auditTime: '',
    code: '',
    createTime: '',
    creator: '',
    creatorDesc: '',
    payMemberCode: '',
    payMemberCorporationName: '',
    payMemberDesc: '',
    payStatus: 0,
    payStatusDesc: '',
    refundAccountsBankName: '',
    refundAccountsCode: '',
    refundStatus: 0,
    refundStatusDesc: '',
    refundTime: '',
    settlementOrg: '',
    settlementOrgDesc: '',
    sourceCode: '',
    sourceSystemCode: '',
    sourceSystemDesc: '',
    totalRefundAmount: 0,
    totalWaitRefundAmount: 0,
    useTime: '',
  });
  const basicList = [
    { label: '单据编号', key: 'code' },
    { label: '来源系统', key: 'sourceSystemDesc' },
    { label: '来源单号', key: 'sourceCode' },
    { label: '申请日期', key: 'applyTime' },
    { label: '申请人', key: 'applyMemberDesc' },
    { label: '部门名称', key: 'applyMemberDeptDesc' },
    { label: '申请人签约主体', key: 'applyMemberCorporationName' },
    { label: '付款组织', key: 'payOrgDesc' },
    { label: '单据状态', key: 'payStatusDesc' },
    { label: '申请事由', key: 'applyReason' },
    { label: '使用日期', key: 'useTime' },
    { label: '归还日期', key: 'refundTime' },
    { label: '结算组织', key: 'settlementOrgDesc' },
    { label: '还款银行名称', key: 'refundAccountsBankName' },
    { label: '还款银行账号', key: 'refundAccountsCode' },
  ];
  const payInfo = ref({
    applyAmount: 0,
    applyPayCurrencyCode: '',
    cbs: 0,
    cbsDesc: '',
    receiveAccountType: 0,
    receiveAccountTypeDesc: '',
    receiveAccountsBankId: '',
    receiveAccountsBankName: '',
    receiveAccountsCode: '',
    receiveAccountsName: '',
    receiveAccountsSubbranchId: '',
    receiveAccountsSubbranchName: '',
  });
  const payList = [
    { label: '申请支付金额', key: 'applyAmount' },
    { label: '申请支付币别', key: 'applyPayCurrencyCode' },
    { label: '支付方式', key: 'payType' },
    { label: '收款账户类型', key: 'receiveAccountTypeDesc' },
    { label: '收款方账户名称', key: 'receiveAccountsName' },
    { label: '对方开户行支行', key: 'receiveAccountsSubbranchName' },
    { label: '开户行联行号', key: 'receiveAccountsBankId' },
    { label: '支行联行号', key: 'receiveAccountsSubbranchId' },
    { label: '对方收款账号', key: 'receiveAccountsCode' },
    { label: '付款单号', key: 'payCode' },
    { label: '是否CBS付款', key: 'cbsDesc' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeBorrowOrderQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
        baseInfo.value = res.baseInfo;
        payInfo.value = res.payInfo;
      }
    }
  });
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
      margin-right: 15px;
    }
    .text-blue {
      color: #75a3f4;
      margin-right: 15px;
    }
  }
  .text-style {
    word-break: break-all;
  }
  .divider-margin {
    margin: 10px 0;
  }
</style>
