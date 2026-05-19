<template>
  <DemandManageWrapper>
    <section class="procurement-submit-create" :style="layoutStyle">
      <div class="content">
        <FlowStepsCard
          :steps="flowSteps"
          :current-step="currentStep"
          :remark="flowRemark"
          class="block"
        />
        <div class="main">
          <ProductLinesTable ref="productLinesRef" v-model="productLines" class="block" />
          <div class="actions block">
            <el-button :loading="draftSaveLoading" @click="handleSaveDraft">存为草稿</el-button>
            <el-button type="primary" @click="handleSubmit">提交需求</el-button>
          </div>
        </div>
      </div>
      <aside class="sidebar">
        <RequirementMetaForm
          ref="metaFormRef"
          v-model="metaInfo"
          :rules="metaFormRules"
          :budget-calculating="isBudgetCalculating"
        />
      </aside>
      <SubmitProgressDialog
        v-model:visible="submitDialogVisible"
        v-model:status="submitDialogStatus"
        v-model:percent="submitDialogPercent"
        :pending-result="pendingResult"
        :success-tips="submitSuccessTips"
        :failure-tips="submitFailureTips"
        :show-failure-actions="submitDialogStatus === 'failure'"
        @notify="handleSubmitNotify"
        @dismiss="handleSubmitDismiss"
        @confirm="handleSubmitConfirm"
        @confirmChoice="handleSubmitConfirmChoice"
        @retry="handleSubmitRetry"
        @saveDraft="handleSaveDraft"
      />
    </section>
  </DemandManageWrapper>
</template>

<script setup lang="ts" name="procurementSubmitCreate">
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import DemandManageWrapper from '@/views/lute-os/demandManage/DemandManageWrapper.vue';
  import FlowStepsCard from '../components/FlowStepsCard.vue';
  import ProductLinesTable from '../components/ProductLinesTable.vue';
  import RequirementMetaForm, {
    type RequirementMetaModel,
  } from '../components/RequirementMetaForm.vue';
  import {
    DEFAULT_PRODUCT_LINE,
    PROCUREMENT_FLOW_STEPS,
    PROCUREMENT_DEMAND_MODULE,
    PURCHASE_STATUS,
    type ProductLineModel,
    type ProcurementFlowStep,
  } from '../constant';
  import SubmitProgressDialog from '../components/PushDialog.vue';
  import { useCurrencyRate } from '../hooks/useCurrencyRate';
  import { useProcurementSubmitFlow } from '../hooks/useProcurementSubmitFlow';
  import { useProcessSteps } from '../hooks/useProcessSteps';
  import {
    useProductLinesValidation,
    type ProductLineFieldKey,
  } from '../hooks/useProductLinesValidation';
  import { useProcurementDraftSave } from '../hooks/useProcurementDraftSave';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import type {
    DemandPurchaseBean,
    DemandSaveReq,
    PurchaseItemBean,
  } from '@/api/platform/data-contracts';
  import { useRouter } from 'vue-router';

  interface SubmitFormModel {
    notifyCreator: boolean;
    syncToSrm: boolean;
    submitRemark: string;
  }

  const DATE_FORMAT = 'YYYY-MM-DD';

  const defaultSubmitForm: SubmitFormModel = {
    notifyCreator: false,
    syncToSrm: true,
    submitRemark: '',
  };
  const MAX_UNIT_PRICE = 10_000_000;
  const MAX_QUANTITY = 10_000;

  const userInfoStore = useStore();
  const router = useRouter();
  const { userInfo, menuCollapse } = storeToRefs(userInfoStore);
  const { flowSteps, currentStep, flowRemark, fetchProcessSteps } = useProcessSteps({
    shouldNotifyError: (code) => !!code,
    resolveErrorMessage: (error) => extractErrorMessage(error, '获取流程步骤失败，请稍后重试'),
  });

  const productLines = ref<ProductLineModel[]>([{ ...DEFAULT_PRODUCT_LINE }]);
  const productLinesRef = ref<{
    showError: (index: number, field: ProductLineFieldKey) => void;
  } | null>(null);
  const metaFormRef = ref<{ validate: () => Promise<boolean>; clearValidate: () => void } | null>(
    null
  );
  const { validateProductLines } = useProductLinesValidation({
    products: productLines,
    tableRef: productLinesRef,
    maxUnitPrice: MAX_UNIT_PRICE,
    maxQuantity: MAX_QUANTITY,
  });

  const metaInfo = ref<RequirementMetaModel>({
    code: '',
    title: '',
    background: '',
    expectFinishTime: null,
    totalBudget: null,
    currency: 'CNY',
    department: '',
    creator: '',
    remark: '',
  });
  const prepareUserInfo = () => {
    if (!userInfo.value) return;
    metaInfo.value.creator = (userInfo.value.memberCode as string) || '';
    const { parentName = '', deptName = '' } = userInfo.value.deptInfo ?? {};
    metaInfo.value.department = [parentName, deptName].filter(Boolean).join(' > ');
  };
  // 获取用户信息
  prepareUserInfo();

  const submitForm = reactive<SubmitFormModel>({ ...defaultSubmitForm });

  const resetSubmitFormState = () => {
    submitForm.notifyCreator = defaultSubmitForm.notifyCreator;
    submitForm.syncToSrm = defaultSubmitForm.syncToSrm;
    submitForm.submitRemark = defaultSubmitForm.submitRemark;
  };

  const resetMetaInfoState = () => {
    metaInfo.value = {
      code: '',
      title: '',
      background: '',
      expectFinishTime: null,
      totalBudget: null,
      currency: 'CNY',
      department: '',
      creator: '',
      remark: '',
    };
    prepareUserInfo();
  };

  const resetProductLines = () => {
    productLines.value = [{ ...DEFAULT_PRODUCT_LINE }];
  };

  const resetFormState = () => {
    resetMetaInfoState();
    resetProductLines();
    resetSubmitFormState();
    metaFormRef.value?.clearValidate?.();
  };
  const layoutStyle = computed(() => ({
    height: `calc(100vh - ${menuCollapse.value ? 50 : 90}px)`,
  }));

  const metaFormRules = {
    title: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    background: [{ required: true, message: '请输入采购原因', trigger: 'blur' }],
    expectFinishTime: [{ required: true, message: '请选择期望完成时间', trigger: 'blur' }],
    creator: [{ required: true, message: '请选择需求创建人', trigger: 'blur' }],
  };

  const { isBudgetCalculating, scheduleTotalBudgetUpdate } = useCurrencyRate({
    productLines,
    targetCurrency: computed(() => metaInfo.value.currency || 'CNY'),
    getCurrentTotalBudget: () => metaInfo.value.totalBudget,
    onTotalBudgetChange: (value) => {
      metaInfo.value.totalBudget = value;
    },
  });

  const extractErrorMessage = (error: unknown, fallback: string) => {
    if (!error) return fallback;
    const maybe =
      (error as any)?.response?.data?.message ??
      (error as any)?.message ??
      (error instanceof Error ? error.message : '');
    return maybe || fallback;
  };

  const buildPurchaseItems = (): PurchaseItemBean[] =>
    productLines.value
      .map((line, index) => {
        const unitPrice = Number(line.unitPrice ?? 0);
        const quantity = Number(line.quantity ?? 0);
        const isCustom = line.productTypeCode === '0' || line.infoSourceType === 'custom';
        return {
          productType: line.productTypeCode || line.productType || '',
          productName: isCustom ? line.productInfo?.trim() || '' : line.productInfo?.trim() || '',
          productSku: isCustom ? '' : line.productInfoCode || line.productInfo?.trim() || '',
          purchaserCodeList: line.categoryMemberCode ? [line.categoryMemberCode] : undefined,
          purchaseGroup: line.purchaseGroup || '',
          purchaseGroupName: line.purchaseGroupName || '',
          price: Number.isFinite(unitPrice) ? Number(unitPrice.toFixed(2)) : 0,
          currency: line.currency || '',
          number: Number.isFinite(quantity) ? Number(quantity.toFixed(4)) : 0,
          supplier: line.supplier?.trim() || '',
          assignSupplierReason: line.supplierReason?.trim() || '',
          remark: line.remark?.trim() || '',
          purchaseLine: index + 1,
        };
      })
      .filter(
        (item) =>
          item.productType ||
          item.productName ||
          item.price > 0 ||
          item.number > 0 ||
          item.supplier ||
          item.assignSupplierReason ||
          item.remark
      );

  const buildDemandPayload = (): DemandSaveReq => {
    const expectFinishTime = metaInfo.value.expectFinishTime
      ? dayjs(metaInfo.value.expectFinishTime).format(DATE_FORMAT)
      : undefined;

    const purchaseItemList = buildPurchaseItems();
    const demandDesc = submitForm.submitRemark?.trim() || '';
    const remark = metaInfo.value.remark?.trim() || '';

    return {
      demandCode: metaInfo.value.code || undefined,
      demandModule: PROCUREMENT_DEMAND_MODULE,
      demandTitle: metaInfo.value.title?.trim(),
      demandBackground: metaInfo.value.background?.trim(),
      demandDesc,
      remark,
      expectFinishTime,
      relMemberCodeList: metaInfo.value.creator ? [metaInfo.value.creator] : undefined,
      demandPurchaseSaveBean: {
        currency: metaInfo.value.currency || 'CNY',
        purchaseItemList,
      },
    };
  };

  const { loading: draftSaveLoading, run: draftSaveRun } = useProcurementDraftSave({
    buildPayload: buildDemandPayload,
  });

  onMounted(() => {
    fetchProcessSteps(metaInfo.value.code, { forceFirstStepProcess: true });
  });

  onActivated(() => {
    resetFormState();
    resetSubmitState();
    fetchProcessSteps(metaInfo.value.code, { forceFirstStepProcess: true });
  });

  watch(
    () => metaInfo.value.code,
    (code) => {
      if (code) {
        fetchProcessSteps(code, { forceFirstStepProcess: true });
      }
    }
  );

  watch(
    () => [
      metaInfo.value.currency,
      ...productLines.value.map((item) => [item.unitPrice, item.quantity, item.currency]),
    ],
    () => {
      scheduleTotalBudgetUpdate();
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    clearSubmitProgress();
  });

  const toNumberOrNull = (value: unknown): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  };

  const buildProductLineFromPurchase = (
    item: DemandPurchaseBean,
    fallbackCurrency: string
  ): ProductLineModel => {
    const unitPrice = toNumberOrNull(item.price);
    const quantity = toNumberOrNull(item.number);
    const totalPrice =
      toNumberOrNull(item.sumPrice) ??
      (unitPrice !== null && quantity !== null ? unitPrice * quantity : null);
    return {
      infoSourceType: 'srm',
      productType: item.productTypeDesc || item.productType || '',
      productInfo: item.productName || '',
      categoryMemberCode:
        (Array.isArray(item.purchaserList) ? item.purchaserList[0]?.memberCode : '') || '',
      unitPrice,
      currency: item.currency || fallbackCurrency,
      quantity,
      totalPrice,
      supplier: item.supplier || '',
      supplierReason: item.assignSupplierReason || '',
      remark: item.remark || '',
    };
  };

  const formatApproverTips = (value?: string | null) => {
    if (!value) return '';
    const names = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!names.length) return '';
    return `需求审批人：${names.join('、')}`;
  };

  const {
    submitDialogVisible,
    submitDialogStatus,
    submitDialogPercent,
    pendingResult,
    submitSuccessTips,
    submitFailureTips,
    submitProcessRunning,
    openSubmitConfirm,
    handleSubmitConfirmChoice,
    handleSubmitNotify,
    handleSubmitDismiss,
    handleSubmitConfirm,
    handleSubmitRetry,
    resetSubmitState,
    clearSubmitProgress,
  } = useProcurementSubmitFlow({
    buildPayload: buildDemandPayload,
    resolveDemandCode: () => metaInfo.value.code?.trim(),
    extractErrorMessage,
    formatSuccessTips: formatApproverTips,
    onDemandCodeChange: (code) => {
      metaInfo.value.code = code;
    },
    onPushSuccess: async () => {
      await nextTick();
      resetFormState();
    },
    onPendingNavigate: () => {
      router.push({
        name: 'procurementSubmitManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_APPROVAL_ING) },
      });
    },
    onFailureNavigate: () => {
      router.push({
        name: 'procurementSubmitManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_PUSH_FAILED) },
      });
    },
    onSuccessNavigate: () => {
      router.push({
        name: 'procurementSubmitManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_APPROVAL_ING) },
      });
    },
  });

  async function handleSaveDraft() {
    if (draftSaveLoading.value) return;
    if (!validateProductLines()) return;
    try {
      await metaFormRef.value?.validate();
      const response = await draftSaveRun();
      if (response?.demandCode) {
        metaInfo.value.code = response.demandCode;
      }
      ElMessage.success('草稿已保存');
      router.push({
        name: 'procurementSubmitManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_DRAFT) },
      });
    } catch (error) {
      console.error('Failed to save draft', error);
      ElMessage.error(extractErrorMessage(error, '草稿保存失败，请稍后重试'));
    }
  }

  async function handleSubmit() {
    if (submitProcessRunning.value) return;
    if (!validateProductLines()) return;
    try {
      await metaFormRef.value?.validate();
    } catch (error) {
      ElMessage.error('请完善基础信息后再提交');
      return;
    }
    openSubmitConfirm();
  }
</script>

<style scoped>
  .procurement-submit-create {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 480px;
    gap: 16px;
    padding: 0 16px;
    height: calc(100vh - 90px);
  }

  .block {
    margin-bottom: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 138px);
  }
  .card-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 12px;
    color: #909399;
  }

  .tips {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: #f5f7fa;
    color: #606266;
    margin-bottom: 8px;
  }
</style>
