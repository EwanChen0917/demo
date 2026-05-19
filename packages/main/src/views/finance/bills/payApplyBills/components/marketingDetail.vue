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
        <el-tab-pane
          label="合同信息"
          name="file_"
          v-if="
            form?.billTypeDesc.includes('境外') ||
            form?.billTypeDesc.includes('境内') ||
            form?.systemCodeDesc == '分贝通'
          "
        >
          <el-table :data="form?.listContractItem" class="py-4">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="contractAmount" label="合同金额" />
            <el-table-column prop="contractInputTax" label="合同进项税额" />
            <el-table-column prop="contractCode" label="合同编码" />
            <el-table-column prop="contractStartTime" label="合同开始时间" />
            <el-table-column prop="contractEndTime" label="合同结束时间" />
            <el-table-column prop="useDuration" label="使用期限" />
            <el-table-column prop="amortizationFlagDesc" label="是否摊销" />
            <el-table-column prop="firstPaymentFlagDesc" label="是否首款" />
            <el-table-column prop="pushStatusDesc" label="推送状态" />
            <el-table-column prop="pushTime" label="推送时间" />
          </el-table>
          <div class="total-text" v-if="form?.listContractItem?.length">
            <span>合计</span>
            <span class="text-red">{{ form?.extraInfo?.totalContractAmount }}</span>
            <el-divider class="divider-margin" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="附件列表" name="file" v-else>
          <el-table :data="form?.listAttachmentInfo" class="py-4">
            <el-table-column type="index" label="序号" width="150" />
            <el-table-column prop="name" label="附件名称" />
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <KeenActions
                  display-style="buttons"
                  :actions="[
                    {
                      label: '下载',
                      key: 'download',
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
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-付款申请单：">
                    {{ form?.fbtPayAppllyPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.fbtPayAppllyPushInfo?.pushStatus == 2" class="text-display">
                      {{ `：${form?.fbtPayAppllyPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.fbtPayAppllyPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通单号：">
                    {{ form?.fbtPayAppllyPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
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
          <el-table :data="form?.listMoneyItem" class="py-4">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="payApplyAmount" label="明细金额" min-width="90px" />
            <el-table-column prop="shareRatio" label="分摊比例" min-width="90px" />
            <el-table-column prop="feeTeamName" label="费用项目" min-width="90px" />
            <el-table-column prop="platformName" label="平台" />
            <el-table-column prop="shopName" label="店铺" />
            <el-table-column prop="countryName" label="国家" />
            <el-table-column prop="gtmPxName" label="GTM品线" min-width="90px" />
            <el-table-column prop="categoryName" label="三级类目" min-width="90px" />
            <el-table-column prop="productSpuName" label="SPU" />
            <el-table-column prop="budgetDeptName" label="预算部门" min-width="90px" />
            <el-table-column prop="affiPromoteName" label="归属推广" min-width="90px" />
          </el-table>
          <div class="total-text" v-if="form?.listMoneyItem?.length">
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
  import { openWindow } from '@/utils';
  import { download } from '@/utils/download';

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

  const form = ref({ billTypeDesc: '', systemCodeDesc: '' });
  const basicList = [
    { label: '单据类型', key: 'billTypeDesc' },
    { label: '单据编号', key: 'payApplyBillNo' },
    { label: '来源系统', key: 'systemCodeDesc' },
    { label: '来源单号', key: 'sourceBillNo' },
    { label: '申请日期', key: 'applyTime' },
    { label: '申请人', key: 'applyMemberName' },
    { label: '部门名称', key: 'applyMemberDeptName' },
    { label: '合作事项id', key: 'matterId' },
    // { label: '红人账号id', key: 'accountId' },
    { label: '品牌', key: 'brandName' },
    { label: '付款组织', key: 'payOrgName' },
    { label: 'KOL推广渠道', key: 'promoteChannel' },
    { label: '广告账户', key: 'advertAccount' },
    { label: '支付对象', key: 'payObject' },
    { label: 'KOL上线链接', key: 'onlineLink' },
    { label: '所属营销项目名称', key: 'projectName' },
    { label: '申请事由', key: 'applyReason' },
    { label: '单据状态', key: 'billStatusDesc' },
    { label: '发票状态', key: 'invoiceStatusDesc' },
    { label: '状态', key: 'billStatusDesc' },
    { label: '备注', key: 'remark' },
  ];
  const payList = [
    { label: '申请支付金额', key: 'totalPayApplyAmount' },
    { label: '申请支付币别', key: 'currencyName' },
    { label: '支付方式', key: 'payType' },
    { label: '对方开户行支行', key: 'accountsSubbranchName' },
    { label: '对方收款账号', key: 'accountsCode' },
    { label: '申请支付日期', key: 'payApplyDate' },
    { label: '是否CBS付款', key: 'cbsPayDesc' },
    { label: '实际支付日期', key: 'payTime' },
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
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'download' && row.fileUrl) {
      download(row.fileUrl, row.fileName);
    }
  };
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
