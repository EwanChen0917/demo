<template>
  <el-card shadow="never" class="meta-form-card">
    <template #header>
      <div class="card-header">
        <span>采购需求基础信息</span>
        <el-tag v-if="statusText" :type="statusTag" size="small">{{ statusText }}</el-tag>
      </div>
    </template>
    <div v-if="isReadOnly" class="info-list">
      <div class="info-item" v-for="item in infoItems" :key="item.key">
        <div class="info-label">{{ item.label }}</div>
        <div class="info-value">
          <template v-if="item.key === 'creator' && item.avatar">
            <div class="creator-info">
              <el-avatar :size="28" :src="item.avatar" />
              <span>{{ item.display }}</span>
            </div>
          </template>
          <pre v-else-if="item.isMultiline" class="info-pre">{{ item.display }}</pre>
          <span v-else>{{ item.display }}</span>
        </div>
      </div>
    </div>
    <el-form
      v-else
      ref="formRef"
      :model="formModel"
      :rules="mergedRules"
      label-width="110px"
      label-position="left"
      class="meta-form"
    >
      <el-form-item label="需求编码">
        <el-input v-model="formModel.code" disabled placeholder="保存后自动生成" />
      </el-form-item>
      <el-form-item prop="title" label="需求标题">
        <el-input
          v-model="formModel.title"
          maxlength="50"
          show-word-limit
          placeholder="请输入需求标题"
        />
      </el-form-item>
      <el-form-item prop="background" label="需求背景">
        <el-input
          v-model="formModel.background"
          type="textarea"
          :rows="4"
          maxlength="200"
          show-word-limit
          placeholder="请输入采购原因"
        />
      </el-form-item>
      <el-form-item prop="creator" label="需求创建人">
        <DeptMember
          v-model="formModel.creator"
          :maxCollapseTags="1"
          disabled
          :prefer-name-when-code-not-found="!!creatorName"
          :fallback-name="creatorName"
          :fallback-avatar="creatorAvatar"
        />
      </el-form-item>
      <el-form-item label="所在部门">
        <div class="d-flex align-items-center gap-2" style="height: 32px">
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          <span>{{ formModel.department || '--' }}</span>
        </div>
      </el-form-item>
      <el-form-item prop="totalBudget" label="总预算金额">
        <el-input
          v-model="formModel.totalBudget"
          placeholder="系统自动计算"
          class="budget-input"
          disabled
        >
          <template #suffix>
            <div v-if="budgetCalculating" class="budget-loading">
              <el-icon class="budget-loading__icon is-loading">
                <Loading />
              </el-icon>
              <span class="budget-loading__text">正在计算总预算...</span>
            </div>
          </template>
          <template #append>
            <CurrencySelect v-model="formModel.currency" :clearable="false" isPurchase />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="expectFinishTime" label="期望完成时间">
        <el-date-picker
          v-model="formModel.expectFinishTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择日期"
          :disabled-date="disablePastDates"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="formModel.remark"
          type="textarea"
          :rows="3"
          maxlength="500"
          show-word-limit
          placeholder="补充说明"
        />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import CurrencySelect from '@/components/CurrencySelect/index.vue';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { PURCHASE_STATUS, PURCHASE_STATUS_LABEL_MAP, type PurchaseStatus } from '../constant';
  import { useCurrencyLabel } from '../hooks/useCurrencyLabel';

  export interface RequirementMetaModel {
    code?: string;
    title: string;
    background: string;
    expectFinishTime: string | Date | null;
    totalBudget: number | string | null;
    currency: string;
    department: string;
    creator: string;
    remark: string;
  }

  const props = defineProps<{
    rules?: FormRules<RequirementMetaModel>;
    budgetCalculating?: boolean;
    status?: PurchaseStatus | null;
    readOnly?: boolean;
    creatorName?: string;
    creatorAvatar?: string;
    createAvatar?: string;
  }>();

  const formRef = ref<FormInstance>();
  const formModel = defineModel<RequirementMetaModel>({
    default: {
      code: '',
      title: '',
      background: '',
      expectFinishTime: null,
      totalBudget: null,
      currency: 'CNY',
      department: '',
      creator: '',
      remark: '',
    },
  });

  const isReadOnly = computed(() => props.readOnly ?? false);

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() < today.getTime();
  };

  const defaultRules: FormRules<RequirementMetaModel> = {
    title: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    background: [{ required: true, message: '请输入采购原因', trigger: 'blur' }],
    expectFinishTime: [{ required: true, message: '请选择期望完成时间', trigger: 'blur' }],
    creator: [{ required: true, message: '请选择需求创建人', trigger: 'blur' }],
  };

  const mergedRules = computed(() => {
    if (!props.rules) return defaultRules;
    const result: FormRules<RequirementMetaModel> = { ...defaultRules };
    Object.keys(props.rules).forEach((key) => {
      result[key as keyof RequirementMetaModel] = props.rules?.[key as keyof RequirementMetaModel];
    });
    return result;
  });

  const budgetCalculating = computed(() => props.budgetCalculating ?? false);
  const { formatCurrencyLabel } = useCurrencyLabel();

  const formatBudget = (budget: number | string | null, currency?: string) => {
    if (budget === null || budget === undefined || budget === '') return '--';
    const numeric = Number(budget);
    const value = Number.isNaN(numeric) ? String(budget) : numeric;
    const currencyLabel = formatCurrencyLabel(currency);
    const suffix = currencyLabel && currencyLabel !== '--' ? currencyLabel : currency || '';
    return `${value}${suffix ? ` ${suffix}` : ''}`.trim();
  };

  const creatorName = computed(() => props.creatorName ?? '');
  const creatorAvatar = computed(() => props.createAvatar ?? props.creatorAvatar ?? '');
  const creatorDisplay = computed(() => creatorName.value || formModel.value.creator || '--');
  const showCreatorAvatar = computed(() => isReadOnly.value && !!creatorAvatar.value);

  const infoItems = computed(() => [
    { key: 'code', label: '需求编码', display: formModel.value.code || '--' },
    {
      key: 'background',
      label: '需求背景',
      display: formModel.value.background || '--',
      isMultiline: true,
    },
    { key: 'title', label: '需求标题', display: formModel.value.title || '--' },
    {
      key: 'creator',
      label: '需求创建人',
      display: creatorDisplay.value,
      avatar: showCreatorAvatar.value ? creatorAvatar.value : '',
    },
    { key: 'department', label: '所属部门', display: formModel.value.department || '--' },
    {
      key: 'totalBudget',
      label: '总预算金额',
      display: formatBudget(formModel.value.totalBudget, formModel.value.currency),
    },
    {
      key: 'expectFinishTime',
      label: '期望完成时间',
      display: formModel.value.expectFinishTime || '--',
    },
    { key: 'remark', label: '备注', display: formModel.value.remark || '--', isMultiline: true },
  ]);

  const STATUS_TAG_MAP: Partial<
    Record<PurchaseStatus, 'success' | 'info' | 'warning' | 'danger' | 'primary'>
  > = {
    [PURCHASE_STATUS.PURCHASE_DRAFT]: 'info',
    [PURCHASE_STATUS.PURCHASE_APPROVAL_ING]: 'warning',
    [PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS]: 'danger',
    [PURCHASE_STATUS.PURCHASE_EXECUTION_ING]: 'primary',
    [PURCHASE_STATUS.PURCHASE_SRM_CLOSED]: 'info',
    [PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT]: 'warning',
    [PURCHASE_STATUS.PURCHASE_FINISHED]: 'success',
  };

  const statusText = computed(() => {
    if (props.status === undefined || props.status === null) return '';
    return PURCHASE_STATUS_LABEL_MAP[props.status] || '';
  });

  const statusTag = computed(() => {
    if (props.status === undefined || props.status === null) return 'info';
    return STATUS_TAG_MAP[props.status] || 'info';
  });

  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);

  const prepareUserInfo = () => {
    if (isReadOnly.value || !userInfo.value) return;
    const { parentName = '', deptName = '' } = userInfo.value.deptInfo ?? {};
    const department = [parentName, deptName].filter(Boolean).join(' > ');
    if (!department) return;
    const current = formModel.value.department?.trim();
    if (!current) {
      formModel.value.department = department;
    }
  };

  watchEffect(() => {
    prepareUserInfo();
  });

  defineExpose({
    validate: async () => formRef.value?.validate(),
    clearValidate: () => formRef.value?.clearValidate(),
    formRef,
  });
</script>

<style scoped>
.meta-form-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: none;
  }

  :deep(.el-card__body) {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding: 20px;
    
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 600;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .info-label {
    font-size: 13px;
    color: #909399;
  }

  .info-value {
    font-size: 14px;
    color: #303133;
    line-height: 1.6;
    word-break: break-word;
  }

  .creator-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .info-pre {
    white-space: pre-wrap;
    margin: 0;
    font-family: inherit;
  }

  :deep(.el-input .el-input-group__append) {
    padding-right: 0;
  }

  :deep(.el-input-group__append .el-select.el-select--default) {
    margin: 0;
  }

  .budget-loading {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #02b96b;
    white-space: nowrap;
  }

  .budget-loading__icon {
    font-size: 14px;
  }

  .budget-loading__text {
    line-height: 1;
  }
</style>
