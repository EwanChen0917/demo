<template>
  <el-dialog title="员工详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="编码：">{{ form?.basic?.memberCode || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="职员id：">{{ form?.basic?.userId || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="姓名：">{{ form?.basic?.name || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="手机号：">{{ form?.basic?.mobile || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="部门id：">{{ form?.basic?.deptId || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="部门名称：">{{ form?.basic?.deptName || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="直接上属姓名：">
                    {{ form?.basic?.managerName || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="法人公司名称：">
                    {{ form?.basic?.corporationName || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="工号：">{{ form?.basic?.jobNumber || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="用户状态：">
                    {{ form?.basic?.activeDesc || '-' }}
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
                  <el-form-item label="推送金蝶-人员：">
                    {{ form?.memberKingdeePushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.memberKingdeePushInfo?.pushStatus == 2">
                      {{ `：${form?.memberKingdeePushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.memberKingdeePushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶人员编码：">
                    {{ form?.memberKingdeePushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8" :offset="0">
                  <el-form-item label="推送金蝶-收款信息："> {{ form?.memberKingdeeAccountPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.memberKingdeeAccountPushInfo?.pushStatus == 2">{{
                      `：${form?.memberKingdeeAccountPushInfo?.failReason}` }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间："> {{ form?.memberKingdeeAccountPushInfo?.pushTime || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="金蝶收款信息id："> {{ form?.memberKingdeeAccountPushInfo?.number || '-'
                    }}</el-form-item>
                </el-col> -->
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通：">
                    {{ form?.memberFbtPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.memberFbtPushInfo?.pushStatus == 2">
                      {{ `：${form?.memberFbtPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.memberFbtPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.memberFbtPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName_" type="card" class="demo-tabs">
        <el-tab-pane label="账户信息" name="account" class="py-4">
          <el-table :data="form?.accountBeanList">
            <el-table-column type="index" label="序号" width="70px" />
            <el-table-column prop="accountsTypeDesc" label="账户类型" min-width="120" />
            <el-table-column prop="accountsCode" label="收款账号" min-width="120" />
            <el-table-column prop="accountsName" label="账户名称" min-width="120" />
            <el-table-column prop="accountsBankName" label="开户行" />
            <el-table-column prop="accountsSubbranchName" label="开户支行" min-width="160" />
            <el-table-column prop="accountsSubbranchId" label="开户行联行号" min-width="150" />
            <el-table-column prop="memberKingdeeAccountPushInfo" label="推送金蝶" min-width="120">
              <template #default="{ row }">
                {{ row?.memberKingdeeAccountPushInfo?.pushStatusDesc || '-' }}
                <span v-if="row?.memberKingdeeAccountPushInfo?.pushStatus == 2">
                  {{ `：${row?.memberKingdeeAccountPushInfo?.failReason}` }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="memberKingdeeAccountPushInfo" label="推送时间" min-width="110">
              <template #default="{ row }">
                {{ row?.memberKingdeeAccountPushInfo?.pushTime || '-' }}
              </template>
            </el-table-column>
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

  const form = ref();

  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeBasicQueryMemberDetail({
        memberCode: props.code,
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
</style>
