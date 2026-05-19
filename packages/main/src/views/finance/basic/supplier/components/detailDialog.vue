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
                    {{ baseInfo?.kingdeePushInfo?.pushStatusDesc || '-' }}
                    <span v-if="baseInfo?.kingdeePushInfo?.pushStatus == 2">
                      {{ `：${baseInfo?.kingdeePushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ baseInfo?.kingdeePushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶单号：">
                    {{ baseInfo?.kingdeePushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName_" type="card" class="demo-tabs">
        <el-tab-pane label="账户信息" name="account">
          <el-table :data="form?.basicSupplierAccountBeans">
            <el-table-column type="index" label="序号" />
            <el-table-column prop="accountsTypeDesc" label="账户类型" />
            <el-table-column prop="accountsCode" label="收款账号" />
            <el-table-column prop="accountsName" label="账户名称" />
            <el-table-column prop="accountsBankName" label="开户行" />
            <el-table-column prop="accountsSubbranchName" label="开户支行" />
            <el-table-column prop="accountsSubbranchId" label="开户支行联行号" />
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
  const baseInfo = ref({});
  const basicList = [
    { label: '编码', key: 'code' },
    { label: '名称', key: 'supplierName' },
    { label: '类型', key: 'typeName' },
    { label: '数据来源', key: 'supplierSourceName' },
    { label: '来源编码', key: 'supplierCode' },
  ];
  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeBasicQuerySupplierDetail({
        code: props.code,
      });
      if (res) {
        form.value = res;
        baseInfo.value = res.basicSupplierBean;
      }
    }
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__content) {
    line-height: 30px;
  }
</style>
