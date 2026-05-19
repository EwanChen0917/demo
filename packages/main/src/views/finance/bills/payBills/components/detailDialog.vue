<template>
  <el-dialog title="应付单详情" :model-value="visible" @close="emit('close')" width="70%">
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
        <el-tab-pane label="金额信息" name="pay">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="币别">
                    {{ form?.baseInfo?.currencyDesc || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="税额">
                    {{ form?.baseInfo?.totalTaxAmount || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金额">
                    {{ form?.baseInfo?.totalTaxExcludeAmount || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="含税金额">
                    {{ form?.baseInfo?.totalTaxIncludedAmount || '-' }}
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
            <el-table-column type="index" label="序号" width="70" />
            <el-table-column prop="taxIncludedAmount" label="含税金额" />
            <el-table-column prop="taxAmount" label="税额（可抵扣）" />
            <el-table-column prop="taxExcludeAmount" label="金额" />
            <el-table-column prop="feeTypeDesc" label="费用项目" />
            <el-table-column prop="budgetDeptDesc" label="预算部门" />
            <el-table-column prop="thirdCategoryDesc" label="产品三级分类" />
            <el-table-column prop="gtmProductLineDesc" label="GTM品线" />
            <el-table-column prop="scene" label="场景" />
            <el-table-column prop="remark" label="备注" />
          </el-table>
          <div class="total-text" v-if="form?.itemList?.length">
            <span>合计</span>
            <span class="text-red">{{ form?.baseInfo?.totalTaxIncludedAmount }}</span>
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

  const form = ref({ name: '222' });
  const baseInfo = ref({
    auditTime: '',
    businessDate: '',
    code: '',
    concatObject: '',
    concatObjectDesc: '',
    concatType: 0,
    concatTypeDesc: '',
    createTime: '',
    creator: '',
    creatorDesc: '',
    currencyCode: '',
    currencyDesc: '',
    settlementOrg: '',
    settlementOrgDesc: '',
    sourceCode: '',
    sourceSystemCode: '',
    sourceSystemDesc: '',
    sourceType: 0,
    sourceTypeDesc: '',
    status: 0,
    statusDesc: '',
    totalTaxAmount: 0,
    totalTaxExcludeAmount: 0,
    totalTaxIncludedAmount: 0,
  });
  const basicList = [
    { label: '结算组织', key: 'settlementOrgDesc' },
    { label: '单据类型', key: 'sourceTypeDesc' },
    { label: '单据编号', key: 'code' },
    { label: '来源系统', key: 'sourceSystemDesc' },
    { label: '来源单号', key: 'sourceCode' },
    { label: '业务日期', key: 'businessDate' },
    { label: '往来类型', key: 'concatTypeDesc' },
    { label: '往来对象', key: 'concatObjectDesc' },
    { label: '单据状态', key: 'statusDesc' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financePayableBillQueryDetail({
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
</style>
