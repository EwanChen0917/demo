<template>
  <div v-loading="preparing" class="demand-detail-page">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        :label="detailViewState.executeTabLabel"
        name="executeDetail"
        v-if="detailViewState.showExecuteTab"
      >
        <ExecuteDetailTab
          v-model:demandDetail="demandDetail"
          @success="handleExecuteSuccess"
          :can-approve-current-step="canApproveCurrentStep"
          :isExecuteMode="detailViewState.executeTabIsEditMode"
          :current-step-code="currentStepCode"
          :can-operate-execute-by-step="canOperateExecuteByStep"
          :can-withdraw-execute-by-step="canWithdrawExecuteByStep"
          :can-modify-executor-by-step="canModifyExecutorByStep"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetail" :label="detailMainTabLabel">
        <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          :mode="detailTabMode"
          :can-approve-current-step="canApproveCurrentStep"
          :rules="rules"
          :form="demandDetail"
          :userInfo="userInfo"
          :submitForm="handleDraftSubmit"
          :is-creator="isCurrentUserCreator"
          :current-step-code="currentStepCode"
          :is-first-approve-node="isFirstApproveNode"
          ref="demandEditTabRef"
          @saveForm="handleDraftSubmit(true)"
          @passDemand="handlePassDemand"
          @rejectDemand="handleRejectDemand"
          @approveAndSubmit="handleApproveAndSubmit"
          :submitDemandLoading="operateLoading && activeDraftAction === 'submit'"
          :submitDraftLoading="operateLoading && activeDraftAction === 'draft'"
          :createActionGroupLoading="operateLoading"
          :cancelForm="handleCancelForm"
          :passDemandLoading="operateLoading && activeApproveAction === 'pass'"
          :rejectDemandLoading="operateLoading && activeApproveAction === 'reject'"
          :approveAndSubmitLoading="operateLoading && activeApproveAction === 'approveAndSubmit'"
          :approveActionGroupLoading="operateLoading"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetailResubmit" label="重新提交" v-if="detailViewState.showResubmitTab">
        <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="resubmit"
          :rules="rules"
          ref="demandResubmitTabRef"
          :form="demandDetail"
          :userInfo="userInfo"
          :is-creator="isCurrentUserCreator"
          :current-step-code="currentStepCode"
          @success="backToList"
          @resubmit="handleResubmit"
          :cancelForm="handleCancelForm"
          :resubmitLoading="operateLoading && activeResubmitAction === 'resubmit'"
          :resubmitGroupLoading="operateLoading"
        />
      </el-tab-pane>
      <el-tab-pane :label="`操作日志（${total || logList.length}）`" name="log">
        <LogTab
          :logs="logList"
          @refresh="fetchLogs"
          :demandDetail="demandDetail"
          :showCommentAction="detailViewState.showLogCommentAction"
          :total="total"
          :pageSize="pageSize"
          :currentPage="currentPage"
          @page-change="handlePageChange"
          @size-change="handlePageSizeChange"
        />
      </el-tab-pane>
    </el-tabs>
    <SurveyFeedback />
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { platformApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { onBeforeRouteLeave } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import ApprovalProcess from '@/views/lute-os/demandManage_5.0/modules/common/ApproveStepsV5.vue';
  import ExecuteDetailTab from '../../../legacy/components/ExecuteDetailTab.vue';
  import DemandDetailTab from '../../../legacy/components/DemandDetailTab.vue';
  import LogTab from '../../../legacy/components/LogTab.vue';
  import SurveyFeedback from '../../../legacy/components/SurveyFeedback.vue';
  import { approvalStepsInitial } from '../../../legacy/demandManageType';
  import { useDemandOperation } from '../../../legacy/composables/useDemandOperation';
  import { useDemandBaseInfoStore } from '../../../stores/useDemandBaseInfoStore';
  import { useDemandWorkbenchStore } from '../../../stores/useDemandWorkbenchStore';
  import { useDemandDetailViewState } from '../../../hooks/useDemandDetailViewState';
  import { useDemandDetailEntryTrack } from '../../../hooks/useDemandDetailEntryTrack';
  import { useApiLoadingGroup } from '../../../hooks/useApiLoadingGroup';

  const props = defineProps<{
    demandCode: string;
  }>();

  const { submitOperation } = useDemandOperation();
  const { trackEntry } = useDemandDetailEntryTrack();
  const demandBaseInfoStore = useDemandBaseInfoStore();
  const workbenchStore = useDemandWorkbenchStore();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);

  const activeTab = ref('demandDetail');
  const logList = ref<any[]>([]);
  const { isLoading, runWithLoading } = useApiLoadingGroup();
  const operateLoading = computed(() => isLoading('operate'));
  const activeApproveAction = ref('');
  const activeResubmitAction = ref('');
  const activeDraftAction = ref('');
  const demandDetail = ref<any>({});
  const canApproveCurrentStep = computed(() => demandDetail.value?.auth?.auditFlag === 1 || false);
  const isCurrentUserCreator = computed(() => {
    const currentMemberCode = String(userInfo.value?.memberCode || '');
    const creatorMemberCode = String(
      demandDetail.value?.creator || demandDetail.value?.creatorCode || demandDetail.value?.createBy || ''
    );
    return Boolean(currentMemberCode) && Boolean(creatorMemberCode) && currentMemberCode === creatorMemberCode;
  });
  const detailTabMode = computed(() => {
    const isDraftStatus = Number(demandDetail.value?.status ?? 0) === 0;
    if (isDraftStatus && isCurrentUserCreator.value) {
      return 'create';
    }
    const isSubmitStage = ['submit', 'approve_1', 'approve_2', 'approve_3'].includes(currentStepCode.value);
    const isApprovingStatus = Number(demandDetail.value?.status ?? 0) === 1;
    // 临时关闭“同意并提交”对应编辑态：遗留问题，接口尚未支持
    // const canApproveAndSubmit =
    //   isSubmitStage && canApproveCurrentStep.value && isApprovingStatus && isFirstApproveNode.value;
    const canApproveAndSubmit = false;
    return canApproveAndSubmit ? 'edit' : 'view';
  });

  const detailContext = computed(() => ({
    bizTab: workbenchStore.state.bizTab,
    mode: detailTabMode.value,
    status: Number(demandDetail.value?.status ?? 0),
    currentStepCode: currentStepCode.value,
    canApproveCurrentStep: canApproveCurrentStep.value,
    auditFlag: Number(demandDetail.value?.auth?.auditFlag ?? demandDetail.value?.auditFlag ?? 0),
    cancelFlag: Number(demandDetail.value?.auth?.cancelFlag ?? 0) === 1,
    canWithdrawExecuteByStep: canWithdrawExecuteByStep.value,
    isFirstApproveNode: currentStepCode.value === 'approve_1',
    isCreator: isCurrentUserCreator.value,
    canModifyExecutorByStep: canModifyExecutorByStep.value,
    canOperateExecuteByStep: canOperateExecuteByStep.value,
  }));
  const detailViewState = useDemandDetailViewState(detailContext);
  const isFirstApproveNode = computed(() => currentStepCode.value === 'approve_1');
  const detailMainTabLabel = computed(() =>
    detailViewState.value.showEditApproveSubmitAction ? '需求编辑' : '需求详情'
  );

  const isProductCenter = ref(true);
  const rules = reactive({
    categoryCode: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
    productLine: [{ required: true, message: '请选择产品品线', trigger: 'blur' }],
    productLevel: [{ required: true, message: '请选择产品定级', trigger: 'blur' }],
    demandProperty: [{ required: true, message: '请选择需求属性', trigger: 'blur' }],
    demandTitle: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    demandDesc: [{ required: true, message: '请输入需求描述', trigger: 'blur' }],
    demandBackground: [{ required: true, message: '请输入需求背景', trigger: 'blur' }],
    demandType: [{ required: true, message: '请选择需求类型', trigger: 'blur' }],
    sampleDeliveryTime: [{ required: true, message: '请选择预计发样时间', trigger: 'blur' }],
  });
  const applyProductCenterRules = (flag: boolean) => {
    isProductCenter.value = flag;
    rules.categoryCode[0].required = flag;
    rules.productLine[0].required = flag;
  };
  const currentStep = ref('1');
  const currentStepCode = ref('');
  const canModifyExecutorByStep = ref(false);
  const canOperateExecuteByStep = ref(false);
  const canWithdrawExecuteByStep = ref(false);
  const approvalSteps = ref<any[]>([]);
  const preparing = ref(true);
  const hasPreparedOnce = ref(false);
  const preparedDemandCode = ref('');

  function toUploadFileArray(val: any) {
    if (Array.isArray(val)) {
      return val.map((file) => ({
        ossKey: file.ossKey || file.fileKey || '',
        name: file.name || file.fileName || '',
        fileCode: file.fileCode || '',
        ...file,
      }));
    }
    if (val && typeof val === 'object') {
      return [
        {
          ossKey: val.ossKey || val.fileKey || '',
          name: val.name || val.fileName || '',
          fileCode: val.fileCode || '',
          percentage: val.percentage ?? 100,
          ...val,
        },
      ];
    }
    return [];
  }

  const getDemandCode = () => String(props.demandCode || workbenchStore.state.demandCode || '');

  const pageLoading = ref(false);
  const fetchDetail = async () => {
    pageLoading.value = true;
    const demandCode = getDemandCode();
    if (!demandCode) {
      pageLoading.value = false;
      return;
    }
    try {
      const res = await platformApi.platformDemandDetail({ demandCode, demandModule: 'user_research' });
      const detail = { ...res.userResearch, ...res } as any;
      detail.demandFile = toUploadFileArray(detail.demandFile);
      detail.userResearchFile = toUploadFileArray(detail.userResearchFile);
      detail.department = userInfo.value.deptInfo?.deptId;
      detail.categoryCode = detail.skuCode === '0' ? '0' : detail.categoryCode;
      detail.handlerList = Array.isArray(detail.handlerList)
        ? detail.handlerList.map((handler) => handler.handler)
        : [detail.handler];
      demandDetail.value = detail;
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };

  const fetchApproveSteps = async () => {
    pageLoading.value = true;
    const demandCode = getDemandCode();
    if (!demandCode) {
      pageLoading.value = false;
      return;
    }
    try {
      const res = await platformApi.platformDemandQueryDemandProcessStep({ demandCode });
      const currentStepCodeFromApi = String(res.currentStep || '');
      const currentStep = res.demandProcessStepList?.find((item) => item.stepCode === currentStepCodeFromApi);
      const currentStepOperator = String(currentStep?.operator || '');
      const executeStepOperator = String(
        res.demandProcessStepList?.find((item) => item.stepCode === 'execute')?.operator || ''
      );
      const currentMemberCode = String(userInfo.value?.memberCode || '');
      const currentStepOperatorCodes = currentStepOperator
        .split(',')
        .map((code) => code.trim())
        .filter(Boolean);
      const executeStepOperatorCodes = executeStepOperator
        .split(',')
        .map((code) => code.trim())
        .filter(Boolean);
      const modifyExecutorOperatorCodes = (res.demandProcessStepList || [])
        .filter((item) => ['approve_2', 'internal_audit'].includes(String(item?.stepCode || '')))
        .flatMap((item) =>
          String(item?.operator || '')
            .split(',')
            .map((code) => code.trim())
            .filter(Boolean)
        );
      const canOperateCurrentStep = currentStepOperatorCodes.includes(currentMemberCode);
      const canOperateExecuteStep = executeStepOperatorCodes.includes(currentMemberCode);
      const canModifyExecutor = modifyExecutorOperatorCodes.includes(currentMemberCode);
      const canWithdrawExecute = executeStepOperatorCodes.includes(currentMemberCode);
      const isInternalAuditRejected =
        currentStepCodeFromApi === 'internal_audit' && `${currentStep?.status || ''}` === 'rejected';
      canOperateExecuteByStep.value =
        (currentStepCodeFromApi === 'execute' && canOperateCurrentStep) ||
        (isInternalAuditRejected && canOperateExecuteStep);
      canWithdrawExecuteByStep.value = canWithdrawExecute;
      canModifyExecutorByStep.value = currentStepCodeFromApi === 'execute' && canModifyExecutor;
      res.demandProcessStepList?.forEach((item, index) => {
        approvalStepsInitial.forEach((cell) => {
          if ([0, 6, 7].includes(index)) {
            item.operator = userInfo.value?.name;
          }
          if (item.stepCode === cell.stepCode) {
            item.stepName = cell.stepName;
          }
        });
      });
      approvalSteps.value = res.demandProcessStepList;
      currentStep.value = res.order;
      currentStepCode.value = currentStepCodeFromApi;
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };

  const router = useRouter();
  const route = useRoute();
  type DemandDetailEntryScene = 'detail' | 'execute' | 'resubmit' | 'log';
  const hasEntrySceneParam = computed(() => route.query.entryScene !== undefined);
  const entryScene = computed<DemandDetailEntryScene>(() => {
    const rawScene = String(route.query.entryScene || 'detail');
    if (rawScene === 'execute' || rawScene === 'resubmit' || rawScene === 'log') {
      return rawScene;
    }
    return 'detail';
  });
  const backToList = (message = '操作成功') => {
    sessionStorage.setItem('backFromDetail_5_0', '1');
    workbenchStore.openList();
    router.replace({
      name: 'demandSubmitList',
      query: workbenchStore.toRouteQuery,
    });
    ElMessage.success(message);
  };
  const handleExecuteSuccess = async (eventType?: string) => {
    if (eventType === 'update_handler') {
      ElMessage.success('修改成功');
      await Promise.allSettled([fetchDetail(), fetchApproveSteps()]);
      return;
    }
    backToList();
  };

  const handlePassDemand = async (formData: any) => {
    activeApproveAction.value = 'pass';
    try {
      await runWithLoading('operate', () =>
        submitOperation('approved', { ...formData, demandCode: demandDetail.value.demandCode })
      );
      if (!formData.holdOn) {
        backToList();
      } else {
        await Promise.allSettled([fetchDetail(), fetchApproveSteps()]);
      }
    } catch (error) {
      console.error('通过失败', error);
    } finally {
      activeApproveAction.value = '';
    }
  };
  const handleRejectDemand = async (formData: any) => {
    activeApproveAction.value = 'reject';
    try {
      await runWithLoading('operate', () =>
        submitOperation('rejected', { ...formData, demandCode: demandDetail.value.demandCode })
      );
      if (!formData.holdOn) {
        backToList();
      } else {
        await Promise.allSettled([fetchDetail(), fetchApproveSteps()]);
      }
    } catch (error) {
      console.error('拒绝失败', error);
    } finally {
      activeApproveAction.value = '';
    }
  };
  const demandEditTabRef = ref<any>(null);
  const demandResubmitTabRef = ref<any>(null);
  const handleApproveAndSubmit = async (formData: any) => {
    const valid = await demandEditTabRef.value.formRef.validate();
    if (!valid) return;
    activeApproveAction.value = 'approveAndSubmit';
    try {
      await runWithLoading('operate', () =>
        submitOperation('save_and_approved', {
          ...formData,
          skuCode: formData.categoryCode === '0' ? '0' : undefined,
          demandCode: demandDetail.value.demandCode,
        })
      );
      backToList('同意并提交成功');
    } catch (error) {
      console.error('同意并提交失败', error);
    } finally {
      activeApproveAction.value = '';
    }
  };
  const handleResubmit = async (formData: any) => {
    const valid = await demandResubmitTabRef.value.formRef.validate();
    if (!valid) return;
    activeResubmitAction.value = 'resubmit';
    try {
      await runWithLoading('operate', () =>
        submitOperation('resubmit', {
          ...formData,
          skuCode: formData.categoryCode === '0' ? '0' : undefined,
          demandCode: demandDetail.value.demandCode,
          editFlag: 1,
          approveFlag: 1,
        })
      );
      backToList('重新提交成功');
    } catch (error) {
      console.error('重新提交失败', error);
    } finally {
      activeResubmitAction.value = '';
    }
  };
  const toDemandFilePayload = (fileList: any[] = []) => {
    if (!fileList.length) {
      return null;
    }
    const targetFile = fileList[0] || {};
    return {
      fileCode: targetFile.fileCode ?? '',
      fileKey: targetFile.ossKey || targetFile.fileKey || '',
      fileName: (targetFile.name || targetFile.fileName || '').replace(/\.[^/.]+$/, ''),
      extType: (targetFile.name || targetFile.fileName || '').split('.').pop() || targetFile.extType || '',
      fileSize: targetFile.size || targetFile.fileSize || 0,
    };
  };
  const handleDraftSubmit = async (isDraft = false) => {
    const valid = await demandEditTabRef.value.formRef.validate();
    if (!valid) return;
    activeDraftAction.value = isDraft ? 'draft' : 'submit';
    try {
      const formData = demandDetail.value || {};
      await runWithLoading('operate', () =>
        platformApi.platformDemandSave({
          ...formData,
          operateType: isDraft ? 0 : 1,
          demandCode: formData.demandCode,
          department: userInfo.value?.deptInfo?.deptId,
          demandModule: 'user_research',
          skuCode: formData.categoryCode === '0' ? '0' : undefined,
          demandFile: toDemandFilePayload(formData.demandFile || []),
        } as any)
      );
      if (isDraft) {
        ElMessage.success('草稿保存成功');
        await Promise.allSettled([fetchDetail(), fetchApproveSteps()]);
      } else {
        backToList('提交成功');
      }
    } catch (error) {
      console.error('草稿提交失败', error);
    } finally {
      activeDraftAction.value = '';
    }
  };

  const total = ref(0);
  const pageSize = ref(100);
  const currentPage = ref(1);
  const fetchLogs = async () => {
    const demandCode = getDemandCode();
    if (!demandCode) return;
    const res = await platformApi.platformQueryLog({
      itemType: 'demand_ur',
      moduleType: 'demand',
      pageSize: pageSize.value,
      itemCode: demandCode,
    });
    logList.value = res.logList || [];
    total.value = res.total;
  };

  const fetchIsProductCenter = async () => {
    applyProductCenterRules(demandBaseInfoStore.isProductCenter);
  };
  const runPrepare = async () => {
    const demandCode = getDemandCode();
    if (!demandCode) {
      return;
    }
    preparing.value = true;
    await Promise.allSettled([
      demandBaseInfoStore.ensureBaseInfo(),
      fetchDetail(),
      fetchApproveSteps(),
      fetchLogs(),
      fetchIsProductCenter(),
    ]);
    applyProductCenterRules(demandBaseInfoStore.isProductCenter);
    preparing.value = false;
    hasPreparedOnce.value = true;
    preparedDemandCode.value = demandCode;
  };

  const applyInitialActiveTab = () => {
    if (entryScene.value === 'log') {
      activeTab.value = 'log';
      return;
    }
    if (entryScene.value === 'execute') {
      activeTab.value = detailViewState.value.showExecuteTab ? 'executeDetail' : 'demandDetail';
      return;
    }
    if (entryScene.value === 'resubmit') {
      activeTab.value = detailViewState.value.showResubmitTab ? 'demandDetailResubmit' : 'demandDetail';
      return;
    }
    if (
      currentStepCode.value === 'internal_audit' &&
      detailViewState.value.showExecuteTab
    ) {
      activeTab.value = 'executeDetail';
      return;
    }
    if (currentStepCode.value === 'execute' && Number(demandDetail.value.status ?? 0) === 3) {
      activeTab.value = 'executeDetail';
      return;
    }
    if (detailViewState.value.showResubmitTab) {
      activeTab.value = 'demandDetailResubmit';
      return;
    }
    activeTab.value = 'demandDetail';
  };

  const trackDingTalkEntry = async () => {
    const demandCode = getDemandCode();
    if (!demandCode) {
      return;
    }
    const pageTitle = String(route.meta?.title || '需求详情');
    await trackEntry({
      demandCode,
      entryScene: entryScene.value,
      hasEntrySceneParam: hasEntrySceneParam.value,
      pageTitle,
      pagePath: route.path,
      routeName: String(route.name || ''),
    });
  };

  onMounted(async () => {
    await runPrepare();
    applyInitialActiveTab();
    await trackDingTalkEntry();
  });

  const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchLogs();
  };
  const handlePageSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
    fetchLogs();
  };

  const handleCancelForm = () => {
    workbenchStore.openList();
    router.replace({
      name: 'demandSubmitList',
      query: workbenchStore.toRouteQuery,
    });
  };

  onActivated(() => {
    if (!hasPreparedOnce.value) return;
    runPrepare().then(() => {
      applyInitialActiveTab();
      trackDingTalkEntry();
    });
  });

  watch(
    () => getDemandCode(),
    async (demandCode) => {
      if (!demandCode || demandCode === preparedDemandCode.value) {
        return;
      }
      await runPrepare();
      applyInitialActiveTab();
      await trackDingTalkEntry();
    }
  );

  onBeforeRouteLeave((to, from, next) => {
    sessionStorage.setItem('backFromDetail_5_0', '1');
    next();
  });
</script>

<style scoped>
  .demand-detail-page {
    min-height: 300px;
    height: 100%;
    overflow: hidden;
  }

  .demand-detail-page :deep(.el-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .demand-detail-page :deep(.el-tabs__header) {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #fff;
    flex-shrink: 0;
  }

  .demand-detail-page :deep(.el-tabs__content) {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
</style>
