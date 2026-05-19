<template>
  <DemandManageWrapper>
    <section class="procurement-detail" v-loading="detailLoading">
      <div class="content" :class="{ 'has-banner': isPushFailed }">
        <FlowStepsCard
          :steps="flowSteps"
          :current-step="currentStep"
          :remark="flowRemark"
          class="block"
        />
        <div v-if="isPushFailed" class="push-fail-banner block">
          <div class="banner-info">
            <div class="banner-title">推送SRM失败</div>
            <div class="banner-desc">失败原因：{{ pushFailReason }}</div>
          </div>
        </div>
        <el-card shadow="never" class="detail-card block">
          <el-tabs v-model="activeTab" class="detail-tabs">
            <el-tab-pane name="products" label="采购产品信息">
              <TableTip text="提示：按住 Shift 滚动鼠标滚轮，可查看更多采购产品信息">
                <template v-if="showBatchActions">
                  <span>批量操作：</span>
                  <el-button
                    v-if="showBatchEditButton"
                    text
                    type="primary"
                    @click="handleBatchEdit"
                  >
                    修改执行人
                  </el-button>
                  <el-button
                    v-if="showBatchReceiveButton"
                    type="primary"
                    @click="handleBatchReceive"
                  >
                    批量查收
                  </el-button>
                </template>
              </TableTip>
              <ProductLinesTable
                ref="productLinesRef"
                v-model="productList"
                :editable="allowDetailEditing"
                :force-product-fields-editable="fromPushFailedTab"
                :addable="allowDetailEditing"
                :use-card="false"
                :show-header="allowDetailEditing"
                :table-props="productTableProps"
                :product-type-options="productTypeOptions"
                :allow-custom-product-type="true"
                :class="{ 'editable-lines': allowDetailEditing }"
              >
                <template #prefix-columns>
                  <template v-if="!allowDetailEditing">
                    <el-table-column
                      type="selection"
                      width="48"
                      fixed="left"
                      v-if="showBatchActions"
                    />
                    <el-table-column
                      prop="demandCode"
                      label="需求编码"
                      min-width="160"
                      fixed="left"
                    />
                    <el-table-column prop="purchaseOrderNo" label="采购单号" min-width="160">
                      <template #default="{ row }">
                        {{ row.purchaseOrderNo || '--' }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="purchaseLineNo" label="采购行号" min-width="120">
                      <template #default="{ row }">
                        {{ row.purchaseLineNo || '--' }}
                      </template>
                    </el-table-column>
                  </template>
                </template>

                <template #suffix-columns>
                  <template v-if="!allowDetailEditing">
                    <el-table-column
                      prop="executor"
                      label="采购执行人"
                      min-width="140"
                      :fixed="executorFixedRight ? 'right' : undefined"
                    >
                      <template #default="{ row }">
                        {{ row.executor || formatPurchaserNames(row.purchaserList) }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-if="showReceiveAction"
                      label="操作"
                      width="160"
                      fixed="right"
                      align="center"
                    >
                      <template #default="{ row }">
                        <el-button type="primary" text @click="handleReceiveProduct(row)">
                          查收
                        </el-button>
                      </template>
                    </el-table-column>
                  </template>
                </template>
              </ProductLinesTable>
            </el-tab-pane>
            <el-tab-pane :label="`操作日志（${logTotal || logList.length}）`" name="logs">
              <LogTab
                :logs="logList"
                :total="logTotal"
                :pageSize="logPageSize"
                :currentPage="logCurrentPage"
                :detail="detailInfo"
                @refresh="handleLogRefresh"
                @page-change="handleLogPageChange"
                @size-change="handleLogPageSizeChange"
              />
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <div v-if="showResubmitActions" class="action-bar">
          <el-button size="large" :loading="saveDraftLoading" @click="handleSaveDraft">
            存为草稿
          </el-button>
          <el-button
            type="primary"
            size="large"
            :loading="submitProcessRunning"
            @click="handleResubmit"
          >
            {{ fromSubmitDraftTab ? '提交需求' : '重新提交' }}
          </el-button>
          <el-button size="large" @click="router.back()" v-if="canGoBack">取消</el-button>
        </div>
        <div v-if="showAdjustChangeButton" class="action-bar">
          <el-button
            type="primary"
            size="large"
            :loading="repushProcessing && syncSource === 'adjust'"
            @click="handleAdjustChange"
          >
            提交变更
          </el-button>
          <el-button size="large" @click="router.back()" v-if="canGoBack">取消</el-button>
        </div>
        <div v-if="isPushFailed" class="action-bar">
          <el-button
            type="primary"
            size="large"
            :loading="repushProcessing && syncSource === 'repush'"
            @click="handleRepushClick"
          >
            重新推送
          </el-button>
          <el-button size="large" @click="router.back()" v-if="canGoBack">取消</el-button>
        </div>
      </div>
      <aside class="sidebar">
        <RequirementMetaForm
          v-model="metaInfo"
          :status="detailInfo.status"
          :read-only="metaInfoReadOnly"
          :creator-name="metaCreatorName"
          :creator-avatar="metaCreatorAvatar"
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
      />
      <SubmitProgressDialog
        v-model:visible="repushDialogVisible"
        v-model:status="repushDialogStatus"
        v-model:percent="repushDialogPercent"
        :checking-tip="repushCheckingTip"
        :show-notify-prompt="false"
        success-text="重新推送成功"
        failure-text="重新推送失败"
        :success-tips="repushSuccessTips"
        :failure-tips="repushFailureTips"
        @notify="handleRepushNotify"
        @dismiss="handleRepushDismiss"
        @confirm="handleRepushConfirm"
      />
      <BatchExecutorDialog
        v-model:visible="executorDialogVisible"
        :products="executorDialogProducts"
        :initial-executors="executorDialogInitialExecutors"
        :confirm-loading="executorDialogLoading"
        @confirm="handleExecutorDialogConfirm"
        @cancel="handleExecutorDialogCancel"
      />
      <ReceiveDialog
        v-model:visible="receiveDialogVisible"
        :mode="receiveDialogMode"
        :products="receiveProducts"
        :submit-loading="receiveSubmitLoading"
        @submit="handleReceiveSubmit"
      />
    </section>
  </DemandManageWrapper>
</template>

<script setup lang="ts" name="procurementExecuteDetail">
  import Decimal from 'decimal.js';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import DemandManageWrapper from '@/views/lute-os/demandManage/DemandManageWrapper.vue';
  import { memberApi, platformApi } from '@/api';
  import type {
    DemandDetailResp,
    DemandPurchaseBean,
    DemandSaveReq,
    PurchaseItemBean,
    DemandPurchaseSyncReq,
    PurchaserBean,
  } from '@/api/platform/data-contracts';
  import FlowStepsCard from '../components/FlowStepsCard.vue';
  import ProductLinesTable from '../components/ProductLinesTable.vue';
  import RequirementMetaForm from '../components/RequirementMetaForm.vue';
  import type { RequirementMetaModel } from '../components/RequirementMetaForm.vue';
  import LogTab from '../components/LogTab.vue';
  import BatchExecutorDialog from '../components/BatchExecutorDialog.vue';
  import TableTip from '../components/TableTip.vue';
  import {
    PURCHASE_STATUS,
    PROCUREMENT_DEMAND_MODULE,
    type ProductLineModel,
    type PurchaseStatus,
  } from '../constant';
  import SubmitProgressDialog from '../components/PushDialog.vue';
  import ReceiveDialog from '../components/ReceiveDialog.vue';
  import { useReceiveOperations } from '../hooks/useReceiveOperations';
  import { useProcessSteps } from '../hooks/useProcessSteps';
  import { useProcurementRepush } from '../hooks/useProcurementRepush';
  import { useProcurementDraftSave } from '../hooks/useProcurementDraftSave';
  import {
    useProductLinesValidation,
    type ProductLineFieldKey,
  } from '../hooks/useProductLinesValidation';
  import { useCurrencyRate } from '../hooks/useCurrencyRate';
  import { useProcurementSubmitFlow } from '../hooks/useProcurementSubmitFlow';
  import dayjs from 'dayjs';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';

  const route = useRoute();
  const router = useRouter();

  const activeTab = ref<'products' | 'logs'>('products');
  const { flowSteps, currentStep, flowRemark, fetchProcessSteps } = useProcessSteps({
    shouldNotifyError: () => true,
    resolveErrorMessage: (error) => extractErrorMessage(error, '获取流程步骤失败，请稍后重试'),
  });
  const productTypeOptions = [
    { label: '市场推广', value: '市场推广' },
    { label: '技术服务', value: '技术服务' },
    { label: '办公用品', value: '办公用品' },
  ];
  type ExecutorDialogProduct = {
    id: string;
    purchaseItemCode: string;
    productType: string;
    productInfo: string;
    executor: string;
  };

  type ProductRow = ProductLineModel & {
    _unitPriceStr?: string;
    _quantityStr?: string;
    id: string;
    demandCode: string;
    purchaseOrderNo: string;
    purchaseLineNo: string;
    executor: string;
    purchaseQuantity: number;
    receivedQuantity: number;
    enableCheckNumber?: number;
    purchaseItemCode: string;
    purchaserList: PurchaserBean[];
    source?: DemandPurchaseBean;
  };

  const DATE_FORMAT = 'YYYY-MM-DD';
  const memberDirectoryLoaded = ref(false);
  const memberDirectoryLoading = ref(false);
  let memberDirectoryPromise: Promise<void> | null = null;
  const memberProfileMap = ref<Record<string, PurchaserBean>>({});

  const upsertMemberProfiles = (list?: PurchaserBean[]) => {
    if (!Array.isArray(list)) return;
    list.forEach((member) => {
      const code = member?.memberCode;
      if (!code) return;
      memberProfileMap.value[code] = {
        memberCode: code,
        name: member?.name || code,
      };
    });
  };

  const recordPurchasersFromList = (list: DemandPurchaseBean[]) => {
    list.forEach((item) => {
      if (Array.isArray(item.purchaserList)) {
        upsertMemberProfiles(item.purchaserList as PurchaserBean[]);
      }
    });
  };

  const calcTableHeight = () => {
    const tableHeight = showAdjustChangeButton.value ? 255 : 335;
    return tableHeight;
  };

  const loadMemberDirectory = async () => {
    if (memberDirectoryLoaded.value) return;
    if (memberDirectoryPromise) {
      await memberDirectoryPromise;
      return;
    }
    memberDirectoryLoading.value = true;
    memberDirectoryPromise = memberApi
      .luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'all_dept',
        searchChildDept: true,
      })
      .then((response) => {
        const members = Array.isArray(response?.memberList) ? response.memberList : [];
        upsertMemberProfiles(
          members
            .map((member) =>
              member?.memberCode
                ? { memberCode: member.memberCode, name: member.name || member.memberCode }
                : null
            )
            .filter((item): item is PurchaserBean => !!item)
        );
        memberDirectoryLoaded.value = true;
      })
      .finally(() => {
        memberDirectoryLoading.value = false;
        memberDirectoryPromise = null;
      });
    await memberDirectoryPromise;
  };

  const resolvePurchasers = async (codes: string[]): Promise<PurchaserBean[]> => {
    const normalized = Array.from(
      new Set(
        codes
          .map((code) => (typeof code === 'string' ? code.trim() : ''))
          .filter((code): code is string => !!code)
      )
    );
    if (!normalized.length) {
      return [];
    }
    if (!memberDirectoryLoaded.value) {
      await loadMemberDirectory();
    }
    return normalized
      .map((code) => {
        const profile = memberProfileMap.value[code];
        if (profile?.memberCode) {
          return {
            memberCode: profile.memberCode,
            name: profile.name || profile.memberCode,
          };
        }
        return { memberCode: code, name: code };
      })
      .filter((member) => !!member.memberCode);
  };

  function matchesSourceTab(source: unknown, target: string): boolean {
    if (Array.isArray(source)) {
      return source.includes(target);
    }
    return source === target;
  }
  const enteredFromPushFailedTab = matchesSourceTab(route.query.sourceTab, 'pushFailed');
  const enteredFromExecutingTab = matchesSourceTab(route.query.sourceTab, 'executing');
  const enteredFromSubmitWaitReceipt = matchesSourceTab(route.query.sourceTab, 'submitWaitReceipt');

  const detailInfo = reactive<{
    id: string | string[];
    demandTitle: string;
    totalTime: number;
    status: PurchaseStatus;
    pushFailReason: string;
    sendStatus?: number | null;
    purchaseSendStatus?: number | null;
  }>({
    id: route.params.id ?? '',
    demandTitle: '年度营销物料采购',
    totalTime: 86400 * 3, // 3 天占位
    status: enteredFromPushFailedTab
      ? PURCHASE_STATUS.PURCHASE_PUSH_FAILED
      : enteredFromExecutingTab
      ? PURCHASE_STATUS.PURCHASE_EXECUTION_ING
      : enteredFromSubmitWaitReceipt
      ? PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT
      : PURCHASE_STATUS.PURCHASE_FINISHED,
    pushFailReason: '',
    sendStatus: null,
    purchaseSendStatus: null,
  });
  const demandDetail = ref<DemandDetailResp | null>(null);
  const buildRepushPayload = (): DemandPurchaseSyncReq | null => {
    const detail = demandDetail.value;
    const code = metaInfo.value.code?.trim() || detail?.demandCode;
    if (!code) return null;
    const purchaseItems = buildResubmitPurchaseItems();
    const currency =
      metaInfo.value.currency ||
      ((detail?.purchase as Record<string, any>)?.currency as string) ||
      'CNY';
    return {
      demandCode: code,
      demandModule: detail?.demandModule || PROCUREMENT_DEMAND_MODULE,
      demandTitle: metaInfo.value.title?.trim() || detail?.demandTitle,
      demandBackground: metaInfo.value.background?.trim() || detail?.demandBackground,
      demandDesc: detail?.demandDesc || '',
      remark: metaInfo.value.remark?.trim() || '',
      expectFinishTime: metaInfo.value.expectFinishTime || detail?.expectFinishTime,
      demandPurchaseSaveBean: {
        currency,
        purchaseItemList: purchaseItems,
      },
      updateTime: detail?.updateTime,
    };
  };

  const demandCode = computed(() => {
    const identifier = detailInfo.id;
    if (Array.isArray(identifier)) {
      return identifier[0] ?? '';
    }
    return typeof identifier === 'string' ? identifier : '';
  });

  const productList = ref<ProductRow[]>([]);
  const productLinesRef = ref<{
    showError: (index: number, field: ProductLineFieldKey) => void;
  } | null>(null);
  const { validateProductLines } = useProductLinesValidation({
    products: productList,
    tableRef: productLinesRef,
  });

  const toNumberOrNull = (value: unknown): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  };

  const buildResubmitPurchaseItems = (): PurchaseItemBean[] => {
    return productList.value
      .map((row, index) => {
        const isCustom = row.productTypeCode === '0' || row.infoSourceType === 'custom';
        const unitPrice = toNumberOrNull(row.unitPrice);
        const quantity = toNumberOrNull(row.quantity);
        const purchaserCodes = Array.isArray(row.purchaserList)
          ? row.purchaserList
              .map((member) => member?.memberCode)
              .filter((code): code is string => !!code)
          : [];
        const fallbackPurchaser = row.categoryMemberCode ? [row.categoryMemberCode] : [];
        return {
          productType: row.productTypeCode || row.productType || '',
          productName: isCustom ? row.productInfo || '' : row.productInfo || '',
          productSku: isCustom ? '' : row.productInfoCode || '',
          purchaseGroup: row.purchaseGroup || '',
          purchaseGroupName: row.purchaseGroupName || '',
          purchaserCodeList: purchaserCodes.length
            ? purchaserCodes
            : fallbackPurchaser.length
            ? fallbackPurchaser
            : undefined,
          price:
            unitPrice !== null && Number.isFinite(unitPrice) ? Number(unitPrice.toFixed(2)) : 0,
          currency: row.currency || metaInfo.value.currency || 'CNY',
          number: quantity !== null && Number.isFinite(quantity) ? Number(quantity.toFixed(4)) : 0,
          supplier: row.supplier || '',
          assignSupplierReason: row.supplierReason || '',
          remark: row.remark || '',
          purchaseLine: Number(row.purchaseLineNo) || index + 1,
          purchaseItemCode: row.purchaseItemCode || '',
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
  };

  function buildResubmitPayload(): DemandSaveReq {
    const expectFinishTime = metaInfo.value.expectFinishTime
      ? dayjs(metaInfo.value.expectFinishTime).format(DATE_FORMAT)
      : undefined;
    const purchaseItemList = buildResubmitPurchaseItems();
    return {
      demandCode: metaInfo.value.code || undefined,
      demandModule: PROCUREMENT_DEMAND_MODULE,
      demandTitle: metaInfo.value.title?.trim(),
      demandBackground: metaInfo.value.background?.trim(),
      demandDesc: '',
      remark: metaInfo.value.remark?.trim() || '',
      expectFinishTime,
      relMemberCodeList: metaInfo.value.creator ? [metaInfo.value.creator] : undefined,
      demandPurchaseSaveBean: {
        currency: metaInfo.value.currency || 'CNY',
        purchaseItemList,
      },
    };
  }

  const executorDialogVisible = ref(false);
  const executorDialogProducts = ref<ExecutorDialogProduct[]>([]);
  const executorDialogInitialExecutors = ref<string[]>([]);
  const executorDialogLoading = ref(false);

  const metaInfo = ref<RequirementMetaModel>({
    code: '',
    title: '',
    background: '',
    creator: '',
    department: '',
    totalBudget: null,
    currency: 'CNY',
    expectFinishTime: null,
    remark: '',
  });
  const metaCreatorName = ref('');
  const metaCreatorAvatar = ref('');
  const budgetProductLines = computed(() => productList.value as unknown as ProductLineModel[]);
  const { isBudgetCalculating, scheduleTotalBudgetUpdate, computeTotalBudgetWithRate } =
    useCurrencyRate({
      productLines: budgetProductLines,
      targetCurrency: computed(() => metaInfo.value.currency),
      getCurrentTotalBudget: () => metaInfo.value.totalBudget,
      onTotalBudgetChange: (value) => {
        metaInfo.value.totalBudget = value;
      },
    });
  const hydratingBudget = ref(false);
  const budgetLocked = ref(false);

  const logList = ref<Array<Record<string, any>>>([]);

  const logTotal = ref(0);
  const logPageSize = ref(100);
  const logCurrentPage = ref(1);

  async function fetchLogs() {
    const codeValue = demandCode.value;
    const code = typeof codeValue === 'string' ? codeValue.trim() : '';
    if (!code) return;
    try {
      const response = await platformApi.platformQueryLog({
        // itemType: '',
        moduleType: 'demand',
        pageSize: logPageSize.value,
        pageNum: logCurrentPage.value,
        itemCode: code,
      });
      const logs = Array.isArray(response.logList) ? response.logList : [];
      logList.value = logs;
      if (typeof response.total === 'number') {
        logTotal.value = response.total;
      } else if (typeof response.total === 'string') {
        const parsed = Number(response.total);
        logTotal.value = Number.isNaN(parsed) ? logs.length : parsed;
      } else {
        logTotal.value = logs.length;
      }
    } catch (error) {
      console.error('Failed to fetch procurement logs', error);
      ElMessage.error('获取操作日志失败，请稍后重试');
    }
  }

  const sourceTabFlags = computed(() => {
    const source = route.query.sourceTab;
    return {
      executing: matchesSourceTab(source, 'executing'),
      approving: matchesSourceTab(source, 'approving'),
      pushFailed: matchesSourceTab(source, 'pushFailed'),
      submitWaitReceipt: matchesSourceTab(source, 'submitWaitReceipt'),
      submitDraft: matchesSourceTab(source, 'submitDraft'),
      submitReject: matchesSourceTab(source, 'submitReject'),
    };
  });

  const fromExecutingTab = computed(() => sourceTabFlags.value.executing);
  const fromApprovingTab = computed(() => sourceTabFlags.value.approving);
  const sendFailed = computed(() => {
    const backendFailed =
      detailInfo.status === PURCHASE_STATUS.PURCHASE_PUSH_FAILED ||
      detailInfo.sendStatus === 2 ||
      detailInfo.purchaseSendStatus === 2;
    if (!sourceTabFlags.value.pushFailed) {
      return detailInfo.status === PURCHASE_STATUS.PURCHASE_PUSH_FAILED;
    }
    return backendFailed;
  });
  const fromPushFailedTab = computed(() => {
    if (sourceTabFlags.value.submitDraft) return false; // 草稿入口优先，忽略后端推送失败状态
    return sourceTabFlags.value.pushFailed || sendFailed.value;
  });
  const fromSubmitWaitReceipt = computed(() => sourceTabFlags.value.submitWaitReceipt);
  const fromSubmitDraftTab = computed(
    () => sourceTabFlags.value.submitDraft && detailInfo.status === PURCHASE_STATUS.PURCHASE_DRAFT
  );
  const fromSubmitRejectTab = computed(() => sourceTabFlags.value.submitReject);
  const fromExecuteMyDemand = computed(() => route.query.from === 'executeMyDemand');
  const fromSubmitEditableTab = computed(
    () => fromSubmitDraftTab.value || fromSubmitRejectTab.value
  );
  const fromExecuteManageTabs = computed(
    () => fromExecutingTab.value || fromApprovingTab.value || fromPushFailedTab.value
  );
  const pushFailedFromMyDemand = computed(
    () => fromExecuteMyDemand.value && fromPushFailedTab.value
  );
  const isPushFailed = computed(() => fromPushFailedTab.value);
  const pushFailReason = computed(() => detailInfo.pushFailReason || '');
  const userStore = useStore();
  const { userInfo } = storeToRefs(userStore);
  const isDemandCreator = computed(
    () => (userInfo.value?.memberCode || '') === (metaInfo.value.creator || '')
  );

  const allowDetailEditing = computed(() => {
    if (pushFailedFromMyDemand.value) return false;
    if (!isDemandCreator.value) return false;
    return fromSubmitEditableTab.value || detailInfo.status === PURCHASE_STATUS.PURCHASE_DRAFT;
  });
  const showResubmitActions = computed(
    () => allowDetailEditing.value && fromSubmitEditableTab.value && !fromPushFailedTab.value
  );
  const metaInfoReadOnly = computed(() => !allowDetailEditing.value);
  const showAdjustChangeButton = computed(() => {
    if (fromPushFailedTab.value) return false;
    if (fromExecuteMyDemand.value) {
      return false;
    }
    return fromExecutingTab.value || fromApprovingTab.value;
  });
  const showBatchEditButton = computed(() => {
    if (fromExecuteMyDemand.value) return false;
    if (fromPushFailedTab.value) return true;
    return fromExecutingTab.value || fromApprovingTab.value;
  });
  const showBatchReceiveButton = computed(() => fromSubmitWaitReceipt.value);
  const showReceiveAction = computed(
    () => showBatchReceiveButton.value && !allowDetailEditing.value
  );
  const showBatchActions = computed(
    () =>
      detailInfo.status !== PURCHASE_STATUS.PURCHASE_DRAFT &&
      (showBatchEditButton.value || showBatchReceiveButton.value)
  );
  const executorFixedRight = computed(() => !showReceiveAction.value);

  const {
    selectedCodes,
    selectedProducts,
    receiveDialogVisible,
    receiveDialogMode,
    receiveProducts,
    receiveSubmitLoading,
    handleSelectionChange,
    handleReceiveProduct,
    handleBatchReceive,
    handleReceiveSubmit: handleReceiveSubmitInternal,
    resetSelection,
  } = useReceiveOperations({
    productList,
    demandCode,
    showBatchReceiveButton,
    extractErrorMessage,
    normalizeProductRows: (items, code) => buildProductRows(items, code),
  });

  const handleReceiveSubmit = async (
    payload: Parameters<typeof handleReceiveSubmitInternal>[0]
  ) => {
    const success = await handleReceiveSubmitInternal(payload);
    if (success) {
      router.push({
        name: 'procurementSubmitManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT) },
      });
    }
  };

  const productTableProps = computed(() => ({
    class: 'product-table',
    stripe: true,
    border: true,
    height: calcTableHeight(),
    onSelectionChange: handleSelectionChange,
  }));

  const {
    repushDialogVisible,
    repushDialogStatus,
    repushDialogPercent,
    repushSuccessTips,
    repushFailureTips,
    repushProcessing,
    repushCheckingTip,
    handleRepush,
    handleRepushNotify,
    handleRepushDismiss,
    handleRepushConfirm: baseRepushConfirm,
  } = useProcurementRepush({
    pushFailReason,
    updateStatus: (status) => {
      detailInfo.status = status;
    },
    buildRepushPayload,
    onSuccess: async () => {
      const code = metaInfo.value.code?.trim();
      if (!code) return;
      fetchProcessSteps(code);
      await fetchDetail(code);
      fetchLogs();
    },
  });
  const handleRepushConfirm = () => {
    if (repushDialogStatus.value === 'failure') {
      router.push({
        name: 'procurementExecuteManage',
        query: { status: String(PURCHASE_STATUS.PURCHASE_PUSH_FAILED) },
      });
      return;
    }
    baseRepushConfirm();
  };
  const syncSource = ref<'repush' | 'adjust' | null>(null);
  function extractErrorMessage(error: unknown, fallback: string) {
    if (!error) return fallback;
    const maybe =
      (error as any)?.response?.data?.message ??
      (error as any)?.message ??
      (error instanceof Error ? error.message : '');
    return maybe || fallback;
  }

  const triggerPurchaseSync = (source: 'repush' | 'adjust') => {
    if (repushProcessing.value) return;
    syncSource.value = source;
    handleRepush();
  };

  const handleRepushClick = () => {
    triggerPurchaseSync('repush');
  };

  watch(
    () => repushProcessing.value,
    (loading) => {
      if (!loading) {
        syncSource.value = null;
      }
    }
  );

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
  } = useProcurementSubmitFlow({
    buildPayload: buildResubmitPayload,
    resolveDemandCode: () => metaInfo.value.code?.trim(),
    extractErrorMessage,
    formatSuccessTips: formatApproverTips,
    onDemandCodeChange: (code) => {
      metaInfo.value.code = code;
    },
    onPushSuccess: async () => {
      const code = metaInfo.value.code?.trim();
      if (code) {
        fetchProcessSteps(code);
        await fetchDetail(code);
        fetchLogs();
      }
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
  const { run: saveDraftRun, loading: saveDraftLoading } = useProcurementDraftSave({
    buildPayload: buildResubmitPayload,
  });

  const validateMetaInfo = () => {
    if (!metaInfo.value.title?.trim()) {
      ElMessage.error('请输入需求标题后再重新提交');
      return false;
    }
    if (!metaInfo.value.background?.trim()) {
      ElMessage.error('请输入需求背景后再重新提交');
      return false;
    }
    if (!metaInfo.value.expectFinishTime) {
      ElMessage.error('请选择期望完成时间后再重新提交');
      return false;
    }
    if (!metaInfo.value.creator) {
      ElMessage.error('请填写需求创建人后再重新提交');
      return false;
    }
    return true;
  };

  const handleResubmit = async () => {
    if (submitProcessRunning.value) return;
    if (!validateMetaInfo()) return;
    if (!validateProductLines()) return;
    openSubmitConfirm();
  };

  const handleSaveDraft = async () => {
    if (saveDraftLoading.value) return;
    try {
      if (!validateMetaInfo()) return;
      if (!validateProductLines()) return;
      const response = await saveDraftRun();
      if (response?.demandCode) {
        metaInfo.value.code = response.demandCode;
      }
      ElMessage.success('草稿已保存');
      if (fromSubmitDraftTab.value) {
        router.push({
          name: 'procurementSubmitManage',
          query: { status: String(PURCHASE_STATUS.PURCHASE_DRAFT) },
        });
      }
    } catch (error) {
      ElMessage.error(extractErrorMessage(error, '草稿保存失败，请稍后重试'));
    }
  };

  const formatPurchaserNames = (list?: PurchaserBean[]) => {
    if (!Array.isArray(list) || list.length === 0) return '--';
    const names = list.map((item) => item.name?.trim()).filter((name) => !!name) as string[];
    return names.length ? names.join('、') : '--';
  };

  const formatNumberAmount = (value?: number | string | null) => {
    if (value === undefined || value === null || value === '') return '--';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '--';
    return numeric.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const pickReceivedQuantity = (item: DemandPurchaseBean) => {
    const numeric = Number(item.checkNumber);
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const toProductRow = (
    item: DemandPurchaseBean,
    index: number,
    demandCode: string
  ): ProductRow => {
    const demandCodeValue = item.demandCode || demandCode || '';
    const currency = item.currency || 'CNY';
    const priceValue = Number(item.price ?? 0);
    const unitPrice = Number.isFinite(priceValue) ? priceValue : null;
    const quantityValue = Number(item.number ?? 0);
    const quantity = Number.isFinite(quantityValue) ? quantityValue : null;
    const sumPrice =
      item.sumPrice ??
      (unitPrice !== null && quantity !== null
        ? new Decimal(unitPrice).mul(quantity).toNumber()
        : null);
    const purchaseItemCode = item.purchaseItemCode || '';
    const rowId = purchaseItemCode || '';
    const purchasers = Array.isArray(item.purchaserList) ? item.purchaserList : [];
    const enableCheck = Number((item as Record<string, any>)?.enableCheckNumber);
    return {
      infoSourceType: item.productType === '0' ? 'custom' : 'srm',
      productType: item.productTypeDesc || item.productType || '',
      productTypeCode: item.productType || '',
      categoryMemberCode:
        ((item as Record<string, any>)?.categoryMemberCode as string) ||
        (purchasers[0]?.memberCode ?? ''),
      purchaseGroup: (item as Record<string, any>)?.purchaseGroup ?? '',
      purchaseGroupName: (item as Record<string, any>)?.purchaseGroupName ?? '',
      productInfo: item.productName || '',
      productInfoCode: item.productSku || '',
      unitPrice,
      currency,
      quantity,
      totalPrice: Number.isFinite(Number(sumPrice)) ? Number(sumPrice) : null,
      supplier: item.supplier || '',
      supplierReason: item.assignSupplierReason || '',
      remark: item.remark || '',
      id: rowId,
      demandCode: demandCodeValue,
      purchaseOrderNo: item.purchaseCode || '',
      purchaseLineNo:
        item.purchaseLine !== undefined && item.purchaseLine !== null
          ? String(item.purchaseLine)
          : '',
      executor: formatPurchaserNames(purchasers),
      purchaseQuantity: Number.isFinite(quantityValue) ? quantityValue : 0,
      receivedQuantity: pickReceivedQuantity(item),
      enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
      purchaseItemCode,
      purchaserList: purchasers,
      source: item,
    };
  };

  const buildProductRows = (list: DemandPurchaseBean[], demandCode: string) => {
    return list.map((item, index) => toProductRow(item, index, demandCode));
  };

  watch(
    () => productList.value.map((item) => [item.id, item.unitPrice, item.quantity, item.currency]),
    () => {
      if (hydratingBudget.value) return;
      if (budgetLocked.value) {
        budgetLocked.value = false;
      }
      scheduleTotalBudgetUpdate();
    }
  );

  watch(
    () => metaInfo.value.currency,
    () => {
      if (hydratingBudget.value) return;
      if (budgetLocked.value) {
        budgetLocked.value = false;
      }
      scheduleTotalBudgetUpdate();
    }
  );

  const calculateTotalBudget = (
    list?: DemandPurchaseBean[],
    fallback?: number | string | null
  ): string | null => {
    if (Array.isArray(list) && list.length > 0) {
      let invalidValue = false;
      const total = list.reduce((sum, item) => {
        try {
          const price = new Decimal(item.sumPrice ?? 0);
          return sum.plus(price);
        } catch {
          invalidValue = true;
          return sum;
        }
      }, new Decimal(0));

      if (!invalidValue) return total.toFixed(2);
    }

    if (fallback === null || fallback === undefined || fallback === '') return null;
    try {
      return new Decimal(fallback).toFixed(2);
    } catch {
      return null;
    }
  };

  const inferCurrency = (list?: DemandPurchaseBean[], fallback?: string | null) => {
    if (Array.isArray(list) && list.length > 0) {
      const target = list.find((item) => item.currency);
      if (target?.currency) {
        return target.currency;
      }
    }
    if (fallback && typeof fallback === 'string') {
      return fallback;
    }
    return metaInfo.value.currency || 'CNY';
  };

  function applyDetailResponse(data?: DemandDetailResp) {
    demandDetail.value = data ?? null;
    hydratingBudget.value = true;
    if (!data) {
      hydratingBudget.value = false;
      return;
    }
    const purchaseList = Array.isArray(data.purchase?.purchaseItemList)
      ? (data.purchase!.purchaseItemList as DemandPurchaseBean[])
      : [];
    recordPurchasersFromList(purchaseList);
    const demandCodeFromResp = data.demandCode ? String(data.demandCode) : '';
    if (demandCodeFromResp) {
      detailInfo.id = demandCodeFromResp;
    }
    detailInfo.demandTitle = data.demandTitle || detailInfo.demandTitle;
    if (data.totalTime !== undefined && data.totalTime !== null) {
      const duration = Number(data.totalTime);
      if (!Number.isNaN(duration)) {
        detailInfo.totalTime = duration;
      }
    }
    if (typeof data.status === 'number') {
      detailInfo.status = data.status as PurchaseStatus;
    }
    const detailSendError =
      typeof (data as Record<string, unknown>)?.sendErrorMsg === 'string'
        ? ((data as Record<string, unknown>).sendErrorMsg as string).trim()
        : '';
    const purchaseExtra = (data.purchase ?? {}) as Record<string, unknown>;
    const purchaseSendError =
      typeof purchaseExtra?.sendErrorMsg === 'string' ? (purchaseExtra.sendErrorMsg as string) : '';
    const failureReasons = purchaseList
      .map((item) => {
        const msg = (item as Record<string, unknown>)?.sendErrorMsg;
        if (typeof msg === 'string') {
          const trimmed = msg.trim();
          if (trimmed) return trimmed;
        }
        return '';
      })
      .filter((msg) => !!msg) as string[];
    const combinedFailReason =
      detailSendError ||
      purchaseSendError ||
      (failureReasons.length ? failureReasons.join('\n') : '');
    if (combinedFailReason) {
      detailInfo.pushFailReason = combinedFailReason;
    }
    detailInfo.sendStatus = (data as Record<string, any>)?.sendStatus ?? null;
    detailInfo.purchaseSendStatus =
      (purchaseExtra?.sendStatus as number | null | undefined) ??
      (purchaseExtra?.send_status as number | null | undefined) ??
      null;

    const currency =
      (data as any)?.currency ||
      (purchaseExtra?.currency as string) ||
      (purchaseExtra?.currencyCode as string) ||
      inferCurrency(purchaseList, null);
    const backendSumPrice =
      (data as any)?.totalAmount ??
      (data as any)?.sumPrice ??
      (purchaseExtra?.sumPrice as number | string | null) ??
      (purchaseExtra as any)?.totalBudget;
    const totalBudget =
      backendSumPrice !== undefined && backendSumPrice !== null && backendSumPrice !== ''
        ? new Decimal(backendSumPrice).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber()
        : calculateTotalBudget(purchaseList, null);
    budgetLocked.value =
      backendSumPrice !== undefined && backendSumPrice !== null && backendSumPrice !== '';
    metaInfo.value = {
      code: demandCodeFromResp || metaInfo.value.code || '',
      title: data.demandTitle || '',
      background: data.demandBackground || '',
      creator: data.creator || metaInfo.value.creator || '',
      department: ((data as any)?.deptStr as string) || '',
      totalBudget,
      currency,
      expectFinishTime: data.expectFinishTime || '',
      remark: (data as any)?.remark || data.demandDesc || '',
    };
    metaCreatorName.value = data.creatorName || metaCreatorName.value || '';
    metaCreatorAvatar.value = data.createAvatar || metaCreatorAvatar.value || '';

    productList.value = buildProductRows(purchaseList, demandCodeFromResp);
    resetSelection();
    hydratingBudget.value = false;
    if (!budgetLocked.value) {
      void computeTotalBudgetWithRate();
    }
  }
  const detailLoading = ref(false);

  async function fetchDetail(code?: string) {
    if (!code) return;
    detailLoading.value = true;
    try {
      const response = await platformApi.platformDemandDetail({
        demandCode: code,
        demandModule: PROCUREMENT_DEMAND_MODULE,
      });
      applyDetailResponse(response);
    } catch (error) {
      console.error('Failed to fetch demand detail', error);
      ElMessage.error(extractErrorMessage(error, '获取需求详情失败，请稍后重试'));
    } finally {
      detailLoading.value = false;
    }
  }

  const applyExecutorChanges = (purchaseCodes: string[], members: PurchaserBean[]) => {
    if (!purchaseCodes.length || !members.length) return;
    const purchaseCodeSet = new Set(purchaseCodes.map((code) => String(code)));
    const normalizedMembers = members
      .map((member) =>
        member?.memberCode
          ? { memberCode: member.memberCode, name: member.name || member.memberCode }
          : null
      )
      .filter((member): member is PurchaserBean => !!member?.memberCode);
    if (!normalizedMembers.length) return;
    upsertMemberProfiles(normalizedMembers);
    const executorLabel = formatPurchaserNames(normalizedMembers);
    productList.value.forEach((row) => {
      const code = row.purchaseItemCode || row.id;
      if (code && purchaseCodeSet.has(String(code))) {
        const updatedMembers = normalizedMembers.map((member) => ({ ...member }));
        row.purchaserList = updatedMembers;
        row.executor = executorLabel;
      }
    });
  };

  watch(executorDialogVisible, (visible) => {
    if (!visible) {
      executorDialogProducts.value = [];
      executorDialogInitialExecutors.value = [];
    }
  });

  const handleExecutorDialogCancel = () => {
    executorDialogLoading.value = false;
  };

  const handleExecutorDialogConfirm = async (executorCodes: string[]) => {
    if (!executorCodes.length) {
      ElMessage.warning('请选择执行人');
      return;
    }
    const purchaseCodes = executorDialogProducts.value
      .map((item) => item.purchaseItemCode)
      .filter((code): code is string => !!code);
    if (!purchaseCodes.length) {
      ElMessage.error('未获取到采购行编码，无法更新执行人');
      return;
    }
    executorDialogLoading.value = true;
    try {
      const purchasers = await resolvePurchasers(executorCodes);
      if (!purchasers.length) {
        ElMessage.error('未找到所选执行人，请重试');
        return;
      }
      applyExecutorChanges(purchaseCodes, purchasers);
      executorDialogVisible.value = false;
      ElMessage.success('已更新执行人，提交变更后生效');
    } catch (error) {
      console.error('Failed to resolve purchaser profiles', error);
      ElMessage.error(extractErrorMessage(error, '更新执行人失败，请稍后重试'));
    } finally {
      executorDialogLoading.value = false;
    }
  };

  const handleBatchEdit = () => {
    if (!selectedProducts.value.length) {
      ElMessage.warning('请选择需要修改的采购行');
      return;
    }
    const dialogProducts = selectedProducts.value
      .map((item) => {
        const code = item.purchaseItemCode || item.id;
        const id = String(item.id ?? code ?? '');
        if (!code) return null;
        return {
          id,
          purchaseItemCode: String(code),
          productType: item.productType || '--',
          productInfo: item.productInfo || '--',
          executor: item.executor || '--',
        };
      })
      .filter((item): item is ExecutorDialogProduct => !!item);
    if (!dialogProducts.length) {
      ElMessage.error('所选采购行缺少唯一标识，无法批量修改');
      return;
    }
    executorDialogProducts.value = dialogProducts;
    const [firstRow] = selectedProducts.value;
    executorDialogInitialExecutors.value = Array.isArray(firstRow?.purchaserList)
      ? (firstRow!.purchaserList as PurchaserBean[])
          .map((member) => member?.memberCode)
          .filter((code): code is string => !!code)
      : [];
    executorDialogVisible.value = true;
    void loadMemberDirectory();
  };

  const hasMountedLoaded = ref(false);

  const refreshDetailData = async () => {
    const code = typeof demandCode.value === 'string' ? demandCode.value.trim() : '';
    if (!code) return;
    fetchProcessSteps(code);
    await fetchDetail(code);
    fetchLogs();
  };

  onMounted(async () => {
    await refreshDetailData();
    hasMountedLoaded.value = true;
  });

  onActivated(async () => {
    if (!hasMountedLoaded.value) return;
    await refreshDetailData();
  });

  const handleLogRefresh = () => {
    fetchLogs();
  };

  const handleLogPageChange = (page: number) => {
    logCurrentPage.value = page;
    handleLogRefresh();
  };

  const handleLogPageSizeChange = (size: number) => {
    logPageSize.value = size;
    logCurrentPage.value = 1;
    handleLogRefresh();
  };

  function handleAdjustChange() {
    triggerPurchaseSync('adjust');
  }

  const canGoBack = computed(() => {
    return window.history.length > 1 || route.query.from;
  });
</script>

<style scoped lang="scss">
  .procurement-detail {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 420px;
    gap: 16px;
    padding: 0 16px 16px;
    height: calc(100vh - 90px);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    min-height: 0;
  }

  .block {
    width: 100%;
  }

  .detail-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .detail-tabs {
    flex: 1;
    min-height: 0;
  }

  .editable-lines :deep(.card-header) {
    padding: 8px 0;
  }

  .product-table {
    width: 100%;
  }

  .push-fail-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border: 1px solid #e9eaef;
    background: #fff;
    border-radius: 6px;
    color: #303133;
  }

  .banner-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .banner-title {
    font-weight: 600;
  }

  .banner-desc {
    font-size: 13px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: auto;
  }

  .action-bar {
    display: flex;
    background: #fff;
    border-radius: 8px;
    padding: 16px 20px;
  }

  :deep(.detail-card .el-card__body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  :deep(.detail-tabs .el-tabs__content) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  :deep(.detail-tabs .el-tab-pane) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  :deep(.el-tabs__header) {
    padding-left: 0;
  }
</style>
