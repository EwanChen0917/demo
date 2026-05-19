<template>
  <el-dialog title="收款详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="left">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="12" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">
                      {{ form[item.key] !== null && form[item.key] !== '' ? form[item.key] : '-' }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="状态">
                    <Tag :color="statusColorMap[form?.status]">
                      {{ form.statusDesc }}
                    </Tag>
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
  import { status, statusColorMap } from '@/views/finance/income/paymentCollection/enum';
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

  const form = ref({
    code: '',
    collectionDate: '',
    collectionOrg: '',
    currency: '',
    customerAccountName: '',
    customerBank: '',
    customerBankAccount: '',
    ourBank: '',
    ourBankAccount: '',
    amount: '',
    serviceCharge: '',
    collectionOrgDesc: '',
    receivedAmount: undefined,
  });
  const basicList = [
    { label: '单据编号', key: 'code' },
    { label: '收款日期', key: 'collectionDate' },
    { label: '对方账户名', key: 'customerAccountName' },
    { label: '币别', key: 'currency' },
    { label: '金额', key: 'amount' },
    { label: '到账金额', key: 'receivedAmount' },
    { label: '手续费', key: 'serviceCharge' },
    { label: '我方银行账号', key: 'ourBankAccount' },
    { label: '收款组织', key: 'collectionOrgDesc' },
    { label: '我方银行', key: 'ourBank' },
    { label: '对方银行', key: 'customerBank' },
    { label: '对方银行账号', key: 'customerBankAccount' },
    { label: '客户', key: 'customerName' },
    { label: '发票号', key: 'invoiceNo' },
    { label: '已关联发票金额', key: 'relatedInvoiceAmount' },
    { label: '未关联发票金额', key: 'notRelatedInvoiceAmount' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financePaymentCollectionQueryDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
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
  :deep(.el-link__inner) {
    word-break: break-all;
  }
</style>
