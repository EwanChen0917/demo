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
                    <span v-if="form?.kingdeePushInfo?.pushStatus == 2" class="text-display">
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
      <el-tabs v-model="activeName_" type="card" class="demo-tabs">
        <el-tab-pane label="明细" name="account">
          <el-table :data="form?.itemList" class="py-4">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column
              prop="transferOutAccountsSubbranchName"
              label="转出支行"
              min-width="110px"
            />
            <el-table-column
              prop="transferOutAccountsSubbranchId"
              label="转出联行号"
              min-width="120px"
            />
            <el-table-column prop="transferOutAccountsCode" label="转出账号" min-width="110px" />
            <el-table-column prop="transferOutCurrency" label="转出币种" min-width="110px" />
            <el-table-column prop="transferOutAmount" label="转出金额" min-width="110px" />
            <el-table-column prop="transferInOrgDesc" label="转入组织" min-width="110px" />
            <el-table-column
              prop="transferInAccountsSubbranchName"
              label="转入支行"
              min-width="110px"
            />
            <el-table-column
              prop="transferInAccountsSubbranchId"
              label="转入联行号"
              min-width="120px"
            />
            <el-table-column prop="transferInAccountsCode" label="转入账号" min-width="110px" />
            <el-table-column prop="transferInCurrency" label="转入币种" min-width="110px" />
            <el-table-column prop="transferInAmount" label="转入金额" min-width="110px" />
          </el-table>
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

  const form = ref({ name: '222' });
  const baseInfo = ref({
    applyMemberCode: '',
    applyMemberDeptDesc: '',
    applyMemberDeptId: '',
    applyMemberDesc: '',
    applyTime: '',
    auditTime: '',
    bankSerialNumber: '',
    businessDate: '',
    cbs: 0,
    cbsDesc: '',
    code: '',
    createTime: '',
    creator: '',
    creatorDesc: '',
    remark: '',
    sourceCode: '',
    sourceSystemCode: '',
    sourceSystemDesc: '',
    statementOrg: '',
    statementOrgDesc: '',
    status: 0,
    statusDesc: '',
    transferOutOrg: '',
    transferOutOrgDesc: '',
  });
  const basicList = [
    { label: '单据编号', key: 'code' },
    { label: '结算组织', key: 'statementOrgDesc' },
    { label: '来源系统', key: 'sourceSystemDesc' },
    { label: '来源单号', key: 'sourceCode' },
    { label: '申请人', key: 'applyMemberDesc' },
    { label: '申请部门', key: 'applyMemberDeptDesc' },
    { label: '申请日期', key: 'applyTime' },
    { label: '单据状态', key: 'statusDesc' },
    { label: '是否CBS付款', key: 'cbsDesc' },
    { label: '银行流水号', key: 'bankSerialNumber' },
    { label: '备注', key: 'remark' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeTransferSlipQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
        baseInfo.value = res.baseInfo;
      }
    }
  });
</script>

<style scoped lang="scss">
  .el-form-item--label-top {
    :deep(.el-form-item__label) {
      font-weight: bold;
    }
  }

  :deep(.el-form-item__content) {
    line-height: 30px;
  }

  .text-style {
    word-break: break-all;
  }
  .text-display {
    display: contents;
  }
</style>
