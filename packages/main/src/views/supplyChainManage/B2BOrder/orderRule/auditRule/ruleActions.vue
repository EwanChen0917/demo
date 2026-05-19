<template>
  <el-form
    :model="formModel"
    ref="formRef"
    label-width="160px"
    label-position="top"
    :rules="commonHeaderRule"
    scroll-to-error
    style="width: 100%; height: calc(100vh - 90px - 71px); overflow: hidden"
    :disabled="mode === 'detail'"
  >
    <el-row :gutter="24">
      <el-col :lg="24" :md="24" :sm="24" :offset="0">
        <div class="rule-info-container">
          <el-form-item label="规则名称" prop="name" class="custom-form-item">
            <el-input
              style="width: 100%"
              v-model="formModel.name"
              word-limit="10"
              maxlength="10"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
          </el-form-item>
          <el-form-item label="规则状态" class="custom-form-item" prop="status">
            <el-radio-group v-model="formModel.status" style="width: 100%">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级" class="custom-form-item" prop="priority">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="formModel.priority" :precision="0" :min="0" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label="生效时间" prop="effectiveTimeBegin" class="custom-form-item">
            <el-date-picker
              v-model="formModel.effectiveTimeBegin"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="规则描述" prop="description" class="custom-form-item">
            <el-input
              class="w-300px"
              v-model="formModel.description"
              word-limit="500"
              maxlength="500"
              show-word-limit
              placeholder="请输入"
              clearabled
              style="width: 100%"
            />
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 0 !important; background: white">
      <EditLayout
        :formModel="conditionList"
        :schema="(schema as any)"
        ref="editLayoutRef"
        :isDetail="mode === 'detail'"
      >
        <template #custom-receiveCode="{ model, formModel }">
          <el-form-item :label="model.label" required prop="receiveCode">
            <renderPostCode v-model="formModel.receiveCode" />
          </el-form-item>
        </template>
        <template #actions>
          <span>设定动作</span>
          <el-form-item label="审核规则" label-width="190px" inline required>
            <el-radio-group
              v-model="formModel.actionParams.auditType"
              :disabled="mode === 'detail'"
            >
              <el-radio value="auto_audit">自动审核</el-radio>
              <el-radio value="manual_audit">人工审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="定时审核"
            label-width="190px"
            inline
            v-if="formModel.actionParams.auditType === 'auto_audit'"
          >
            <el-switch
              v-model="formModel.actionParams.delayConfirmConfig.delayFlag"
              :disabled="mode === 'detail'"
            />
          </el-form-item>
          <el-form-item
            label=""
            label-width="190px"
            inline
            v-if="formModel.actionParams.delayConfirmConfig?.delayFlag"
          >
            <div class="bd">
              <el-checkbox-group
                v-model="formModel.actionParams.delayConfirmConfig.weekDayList"
                :disabled="mode === 'detail'"
              >
                <el-checkbox
                  v-for="item in weekDayList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-checkbox-group>
              <el-select
                v-model="formModel.actionParams.delayConfirmConfig.timeList"
                :disabled="mode === 'detail'"
                style="padding: 10px 0; width: 600px"
                placeholder=""
                clearable
                multiple
                collapse-tags
                :max-collapse-tags="5"
                collapse-tags-tooltip
                class="timeSelect"
              >
                <template #prefix>每天</template>
                <el-option
                  v-for="hour in 24"
                  :key="hour"
                  :label="`${(hour - 1).toString().padStart(2, '0')}:00`"
                  :value="hour - 1"
                />
              </el-select>
            </div>
          </el-form-item>
        </template>
      </EditLayout>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submitForm" type="primary">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import EditLayout from '../components/EditLayout.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuditRuleData } from './hooks/useAuditRuleData';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  import { commonHeaderRule } from '../config';
  const { formModel, schema, conditionList } = useAuditRuleData();
  const { closeTabAndRefresh, closeCurrentTab } = useTabs();
  import renderPostCode from '@/views/supplyChainManage/B2BOrder/orderRule/renderCom/renderPostCode.vue';
  const editLayoutRef = ref<any>(null);
  const route = useRoute();
  const router = useRouter();
  interface RuleActionsProps {
    mode: 'add' | 'detail' | 'edit';
  }
  const props = defineProps<RuleActionsProps>();
  const isEdit = computed(() => props.mode === 'edit');
  const formRef = ref<any>(null);
  const saveLoading = ref(false);
  const timeType = ref<number>(1);

  const weekDayList = ref([
    { label: '周一', value: 1 },
    { label: '周二', value: 2 },
    { label: '周三', value: 3 },
    { label: '周四', value: 4 },
    { label: '周五', value: 5 },
    { label: '周六', value: 6 },
    { label: '周日', value: 7 },
  ]);
  // const timeList = ref([
  //   { label: '周一', value: 1 },
  //   { label: '周二', value: 2 },
  //   { label: '周三', value: 3 },
  //   { label: '周四', value: 4 },
  //   { label: '周五', value: 5 },
  //   { label: '周六', value: 6 },
  //   { label: '周日', value: 7 },
  // ]);
  const cancel = () => {
    closeCurrentTab();
    router.push({
      name: 'orderRule',
    });
  };
  //提交数据
  const submitForm = async () => {
    saveLoading.value = true;
    try {
      if (!editLayoutRef.value) return;
      const valid = await formRef.value?.validate();
      if (!valid) return;
      const result = await editLayoutRef.value.submitForm();
      if (!result.result) return;
      const params = cloneDeep(formModel);
      params.conditions = result.data;
      console.log(params);
      if (
        params?.actionParams.delayConfirmConfig?.delayFlag &&
        (params?.actionParams.delayConfirmConfig?.weekDayList?.length === 0 ||
          params?.actionParams.delayConfirmConfig?.timeList?.length === 0)
      ) {
        ElMessage.warning('请设置审核时间');
        return;
      }
      // return;
      if (isEdit.value) {
        await omsApi.omsRuleUpdate(params as any);
      } else {
        await omsApi.omsRuleAdd(params as any);
      }
      ElMessage.success('操作成功');
      cancel();
    } catch (error) {
      console.log(`error`, error);
    } finally {
      saveLoading.value = false;
    }
  };
  //回显数据
  const initForm = async () => {
    const res: any = await omsApi.omsRuleQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    const conditions = res.conditions;
    if (!editLayoutRef.value) return;
    editLayoutRef.value.initForm(conditions);
    formModel.conditions = [];
    Object.keys(formModel).forEach((key: any) => {
      if (!res[key] && res[key] !== 0) return;
      formModel[key] = res[key];
    });
    if (!formModel.actionParams.delayConfirmConfig) {
      formModel.actionParams.delayConfirmConfig = {
        delayFlag: false,
        weekDayList: [],
        timeList: [],
      };
    }
    console.log(`formModel`, formModel);
  };
  onMounted(() => {
    console.log(`ruleActions onMounted`, isEdit.value);
    if (isEdit.value || route.query.code || (route.params.type === 'copy' && route.params?.code)) {
      initForm();
    }
  });
</script>

<style lang="scss">
  .select-prepend {
    width: 100%;
    display: flex;
    align-items: stretch;

    .el-select__wrapper {
      border-radius: 6px 0 0 6px;
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    .el-select__wrapper.is-hovering:not(.is-focused) {
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    .el-select {
      min-width: 90px !important;

      .el-select__wrapper {
        height: 100%;
        min-height: 32px;
      }
    }
    .el-select:nth-child(2) {
      flex: 1;

      .el-select__wrapper {
        height: auto;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }
    .rule-inner-select {
      flex: 1;

      .el-select__wrapper {
        height: 100%;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }
  }

  .delay-condition-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;

    .delay-label {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-unit {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-formula {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
      margin-left: 8px;
    }

    .delay-operator {
      font-size: 16px;
      color: #606266;
      font-weight: 500;
      margin: 0 4px;
    }

    .delay-info-icon {
      cursor: pointer;
      margin-left: 4px;
    }
  }
</style>

<style scoped lang="scss">
  .bd {
    border: solid 1px #dfe2e6;
    width: 100%;
    border-radius: 4px;
    min-height: 100px;
    padding: 10px;
  }

  :deep(.timeSelect .el-select__prefix) {
    color: #000000 !important;
    padding-right: 10px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 130%; /* 竖线高度，可调整 */
      background-color: #dfe2e6; /* 与边框颜色一致 */
    }
  }
  :deep(.timeSelect .is-focused .el-select__prefix) {
    &::after {
      background-color: #02b96b; /* 主题色，可根据设计调整 */
      transition: 0.3s ease-in-out;
    }
  }
  :deep(.timeSelect:hover .el-select__prefix) {
    &::after {
      background-color: #02b96b; /* 主题色，可根据设计调整 */
      transition: 0.3s ease-in-out;
    }
  }

  :deep(.timeSelect:active .el-select__prefix) {
    &::after {
      background-color: #02b96b; /* 主题色，可根据设计调整 */
      transition: 0.3s ease-in-out;
    }
  }

  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .full-row {
    flex-grow: 1;
    flex-basis: 100%;
    /* 或者 width: 100%; */
  }

  .flex-row {
    display: flex;
    /* 接下来的行是弹性布局 */
  }

  .flex-row > div {
    flex: 1;
    /* 让子项也弹性分布 */
  }

  .formItem {
    margin-bottom: 12px;
  }

  .w100 {
    width: 100%;
  }

  .flex1 {
    flex: 1;
    align-items: center;
  }

  .noshrink {
    flex-shrink: 0;
  }

  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }

  .padl15 {
    padding-left: 15px;
  }

  .tips {
    font-size: 12px;
  }

  .marl4 {
    margin-left: 4px;
  }

  .mar4 {
    margin: 0 4px;
  }

  .padl6 {
    padding-left: 6px;
  }

  .padl10 {
    padding-left: 10px;
  }

  .padb20 {
    padding-bottom: 20px;
  }

  .dynamic-form-container {
    display: flex;
    height: calc(100vh - 281px);
    overflow: hidden;
    background: white;
    width: 1440px;
    margin: 0 auto;

    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }

    :deep(.el-radio__label) {
      font-size: 12px !important;
    }

    .demo-collapse {
      background: #e8f3ff;
      margin-bottom: 20px;

      .switch {
        padding-right: 5px;
      }

      .activeColor {
        color: #02b96b;
      }

      :deep(.el-collapse-item__header) {
        background-color: #e8f3ff;
      }

      :deep(.el-collapse-item__content) {
        background-color: #e8f3ff;
      }

      .bg {
        background-color: #e8f3ff;
      }

      .info-text {
        padding-left: 35px;
      }
    }

    .bg2 {
      background-color: #f7f8fa;
    }

    .houseNumber {
      padding: 16px;
      border-radius: 4px;
      // margin-bottom: 20px;
    }

    .checkItem {
      display: flex;
      align-items: center;
      line-height: 32px;
      height: 32px;
      margin-bottom: 8px;
    }

    .line {
      line-height: 32px;
    }
  }

  .left-panel {
    width: 340px;
    background: white;
    padding: 10px 5px 10px 30px;
    border-right: 1px solid #dadde2;
    overflow-y: auto;

    .title {
      flex: 1;
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 5px;
      color: #1f1f1f;
    }

    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }
  }

  .right-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;

    :deep(.right-form .el-form-item) {
      display: flex !important;
    }
  }

  .field-item {
    margin-bottom: 5px;
    width: 50%;
    display: inline-block;
    font-size: 12px !important;
  }

  .custom-form-item {
    display: flex;
    flex-direction: column;
  }

  .rule-info-container {
    padding-top: 20px;
    display: flex;
    width: 100%;
    background: white;
    gap: 20px;
    justify-content: center;
    padding: 20px 30px;
  }
</style>
