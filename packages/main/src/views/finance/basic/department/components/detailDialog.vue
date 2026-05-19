<template>
  <el-dialog title="部门详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="行政部门id：">{{ form?.deptId || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="行政部门名称：">{{ form?.deptName || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="预算状态：">
                    {{ form?.budgetStatusDesc || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="父部门id：">{{ form?.parentDeptId || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="父部门名称：">
                    {{ form?.parentDeptName || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="部门主管：">
                    {{ form?.deptManagerUserName || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="行政部门层级：">{{ form?.levelDesc || '-' }}</el-form-item>
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
                  <el-form-item label="推送分贝通-部门：">
                    {{ form?.fbtDeptPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.fbtDeptPushInfo?.pushStatus == 2">
                      {{ `：${form?.fbtDeptPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.fbtDeptPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.fbtDeptPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-档案：">
                    {{ form?.fbtBudgetDeptPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.fbtBudgetDeptPushInfo?.pushStatus == 2">
                      {{ `：${form?.fbtBudgetDeptPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.fbtBudgetDeptPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.fbtBudgetDeptPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-关系：">
                    {{ form?.fbtBudgetDeptMappingPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.fbtBudgetDeptMappingPushInfo?.pushStatus == 2">
                      {{ `：${form?.fbtBudgetDeptMappingPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.fbtBudgetDeptMappingPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.fbtBudgetDeptMappingPushInfo?.number || '-' }}
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
      const res = await financeSystemApi.financeBasicQueryDepartmentDetail({
        deptId: props.code,
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
