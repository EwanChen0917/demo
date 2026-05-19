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
                    {{ form?.baseInfo?.creator || '-' }}
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
    auditTime: '',
    code: '',
    createTime: '',
    creator: '',
    refundAccountsBankName: '',
    refundAccountsCode: '',
    refundAmount: 0,
    refundApplyMemberCode: '',
    refundCode: '',
    refundMemberDesc: '',
    refundTime: '',
    settlementOrg: '',
    settlementOrgDesc: '',
    sourceCode: '',
    sourceSystemCode: '',
    sourceSystemDesc: '',
  });
  const basicList = [
    { label: '单据编号', key: 'refundCode' },
    { label: '来源系统', key: 'sourceSystemDesc' },
    { label: '来源单号', key: 'sourceCode' },
    { label: '借款单号', key: 'code' },
    { label: '还款人', key: 'refundMemberDesc' },
    { label: '还款金额', key: 'refundAmount' },
    { label: '还款时间', key: 'refundTime' },
    { label: '结算组织', key: 'settlementOrgDesc' },
    { label: '还款银行名称', key: 'refundAccountsBankName' },
    { label: '还款银行账号', key: 'refundAccountsCode' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeBorrowOrderQueryRefundDetail({
        refuncCode: props.code,
      });
      if (res) {
        form.value = res;
        baseInfo.value = res.baseInfo;
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
</style>
