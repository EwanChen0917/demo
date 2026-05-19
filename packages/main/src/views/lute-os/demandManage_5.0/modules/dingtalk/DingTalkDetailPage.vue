<script setup lang="ts" name="demandExecuteDingTalkDetail">
  import dayjs from 'dayjs';
  import { isEmpty } from 'lodash-es';
  import { Document } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { platformApi } from '@/api';
  import ApproveDialog from '../../legacy/components/common/ApproveDialog.vue';
  import RejectDialog from '../../legacy/components/common/RejectDialog.vue';
  import { useDemandOperation } from '../../legacy/composables/useDemandOperation';
  import { useDemandBaseInfoStore } from '../../stores/useDemandBaseInfoStore';
  import { useDemandDetailViewState } from '../../hooks/useDemandDetailViewState';
  import {
    AuditStatusClassMap,
    AuditStatusMap,
    DemandPropertyMap,
    DemandTypeMap,
  } from '../../constants/demandEnums';
  import { approvalStepsInitial } from '../../legacy/demandManageType';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';

  defineOptions({
    name: 'DingTalkDetailPage',
  });

  type EntryScene = 'detail' | 'execute' | 'resubmit' | 'log';

  const route = useRoute();
  const router = useRouter();
  const { submitOperation } = useDemandOperation();
  const baseInfoStore = useDemandBaseInfoStore();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);

  const approveDialogRef = useTemplateRef<any>('approveDialogRef');
  const rejectDialogRef = useTemplateRef<any>('rejectDialogRef');

  const loading = ref(false);
  const actionLoading = ref(false);
  const demandDetail = ref<any>({});
  const currentStepInfo = ref<any>({});
  const currentStepCode = ref('');
  const canOperateExecuteByStep = ref(false);
  const canWithdrawExecuteByStep = ref(false);
  const canModifyExecutorByStep = ref(false);

  const demandCode = computed(() => `${route.params.id || route.query.demandCode || ''}`);
  const currentMemberCode = computed(() => `${userInfo.value?.memberCode || ''}`);
  const canApproveCurrentStep = computed(() => demandDetail.value?.auth?.auditFlag === 1 || false);
  const isCurrentUserCreator = computed(() => {
    const creatorMemberCode = `${
      demandDetail.value?.creator ||
      demandDetail.value?.creatorCode ||
      demandDetail.value?.createBy ||
      ''
    }`;
    return Boolean(currentMemberCode.value) && currentMemberCode.value === creatorMemberCode;
  });
  const entryScene = computed<EntryScene>(() => {
    const rawScene = `${route.query.entryScene || ''}`;
    if (['detail', 'execute', 'resubmit', 'log'].includes(rawScene)) {
      return rawScene as EntryScene;
    }
    return route.name === 'demandExecuteDingTalkDetail' ? 'execute' : 'detail';
  });

  const detailContext = computed(() => ({
    bizTab: 'todo' as const,
    mode: 'view',
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
  const showApproveActions = computed(
    () => detailViewState.value.showApproveActions || detailViewState.value.showInnerAuditActions
  );
  const isInnerAuditAction = computed(() => detailViewState.value.showInnerAuditActions);
  const showExecuteContent = computed(
    () => entryScene.value === 'execute' || detailViewState.value.showInnerAuditActions
  );

  const statusLabel = computed(() => {
    const status = Number(demandDetail.value?.status ?? -1) as keyof typeof AuditStatusMap;
    return demandDetail.value?.statusDesc || AuditStatusMap[status] || '';
  });
  const statusClass = computed(() => {
    const status = Number(demandDetail.value?.status ?? -1) as keyof typeof AuditStatusClassMap;
    return AuditStatusClassMap[status] || '';
  });
  const currentStepSummary = computed(() => ({
    stepName: currentStepInfo.value?.stepName || '-',
    operator: currentStepInfo.value?.operatorDesc || currentStepInfo.value?.operator || '-',
    statusDesc: currentStepInfo.value?.statusDesc || '-',
  }));
  const demandTypeLabel = computed(() => {
    const value = `${demandDetail.value?.demandType ?? ''}`;
    return (
      demandDetail.value?.demandTypeDesc || (DemandTypeMap as Record<string, string>)[value] || '-'
    );
  });
  const demandPropertyLabel = computed(() => {
    const value = `${demandDetail.value?.demandProperty ?? ''}`;
    return (
      demandDetail.value?.demandPropertyDesc ||
      (DemandPropertyMap as Record<string, string>)[value] ||
      '-'
    );
  });
  const categoryLabel = computed(() => {
    const categoryCode = `${demandDetail.value?.categoryCode ?? ''}`;
    if (categoryCode === '0' || demandDetail.value?.skuCode === '0') {
      return '新品调研';
    }
    const matchedCategory = baseInfoStore.categoryOptions.find(
      (item) => `${item?.categoryCode ?? ''}` === categoryCode
    );
    return (
      demandDetail.value?.fullCategoryName ||
      demandDetail.value?.categoryName ||
      demandDetail.value?.categoryDesc ||
      matchedCategory?.fullCategoryName ||
      matchedCategory?.categoryName ||
      '-'
    );
  });
  const productLineLabel = computed(() => demandDetail.value?.productLineStr || '-');
  const productLevelLabel = computed(() => demandDetail.value?.productLevel || '-');
  const relMemberNames = computed(() => {
    const relMemberInfoList = demandDetail.value?.relMemberInfoList;
    if (!isEmpty(relMemberInfoList)) {
      return relMemberInfoList
        .map((member: any) => member.memberName || member.name || member.memberCode)
        .join('、');
    }
    const relMemberNameList = demandDetail.value?.relMemberNameList;
    if (!isEmpty(relMemberNameList)) {
      return relMemberNameList.join('、');
    }
    const relMemberCodeList = demandDetail.value?.relMemberCodeList;
    if (!isEmpty(relMemberCodeList)) {
      return relMemberCodeList
        .map((member: any) => {
          const memberCode = `${member?.memberCode || member}`;
          return baseInfoStore.deptMemberMap?.[memberCode]?.name || memberCode;
        })
        .join('、');
    }
    return '-';
  });
  const handlerNames = computed(() => {
    const handlerList = demandDetail.value?.handlerList || [];
    if (!isEmpty(handlerList)) {
      return handlerList
        .map((handler: any) => {
          const handlerCode = `${handler?.handler || handler}`;
          return (
            handler?.handlerName || baseInfoStore.deptMemberMap?.[handlerCode]?.name || handlerCode
          );
        })
        .join('、');
    }
    return demandDetail.value?.handlerName || demandDetail.value?.handler || '-';
  });
  const demandFiles = computed(() => demandDetail.value?.demandFile || []);
  const userResearchFiles = computed(() => demandDetail.value?.userResearchFile || []);
  const reportConclusionText = computed(
    () => demandDetail.value?.reportConclusion || demandDetail.value?.conclusion || '-'
  );

  const displayDate = (value: string | number | null | undefined) => {
    if (!value) return '-';
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : `${value}`;
  };
  const toUploadFileArray = (val: any) => {
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
  };
  const normalizeStepOperatorCodes = (operator: string | null | undefined) =>
    `${operator || ''}`
      .split(',')
      .map((code) => code.trim())
      .filter(Boolean);

  const fetchDetail = async () => {
    const res = await platformApi.platformDemandDetail({
      demandCode: demandCode.value,
      demandModule: 'user_research',
    });
    const detail = { ...res.userResearch, ...res } as any;
    detail.demandFile = toUploadFileArray(detail.demandFile);
    detail.userResearchFile = toUploadFileArray(detail.userResearchFile);
    detail.department = userInfo.value?.deptInfo?.deptId;
    detail.categoryCode = detail.skuCode === '0' ? '0' : detail.categoryCode;
    detail.handlerList = Array.isArray(detail.handlerList)
      ? detail.handlerList.map((handler) => handler.handler)
      : [detail.handler].filter(Boolean);
    demandDetail.value = detail;
  };
  const fetchApproveSteps = async () => {
    const res = await platformApi.platformDemandQueryDemandProcessStep({
      demandCode: demandCode.value,
    });
    const currentStepCodeFromApi = `${res.currentStep || ''}`;
    const currentStepItem = res.demandProcessStepList?.find(
      (item) => item.stepCode === currentStepCodeFromApi
    );
    currentStepInfo.value = currentStepItem || {};
    const currentStepOperatorCodes = normalizeStepOperatorCodes(currentStepItem?.operator);
    const executeStepOperatorCodes = normalizeStepOperatorCodes(
      res.demandProcessStepList?.find((item) => item.stepCode === 'execute')?.operator
    );
    const modifyExecutorOperatorCodes = (res.demandProcessStepList || [])
      .filter((item) => ['approve_2', 'internal_audit'].includes(`${item?.stepCode || ''}`))
      .flatMap((item) => normalizeStepOperatorCodes(item?.operator));
    const canOperateCurrentStep = currentStepOperatorCodes.includes(currentMemberCode.value);
    const canOperateExecuteStep = executeStepOperatorCodes.includes(currentMemberCode.value);
    const canModifyExecutor = modifyExecutorOperatorCodes.includes(currentMemberCode.value);
    const canWithdrawExecute = executeStepOperatorCodes.includes(currentMemberCode.value);
    const isInternalAuditRejected =
      currentStepCodeFromApi === 'internal_audit' &&
      `${currentStepItem?.status || ''}` === 'rejected';

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
    currentStepCode.value = currentStepCodeFromApi;
  };
  const fetchPageData = async () => {
    if (!demandCode.value) return;
    loading.value = true;
    try {
      await Promise.allSettled([
        baseInfoStore.ensureBaseInfo(),
        fetchDetail(),
        fetchApproveSteps(),
      ]);
    } finally {
      loading.value = false;
    }
  };

  const handleFileOpen = (file: any) => {
    void file;
    ElMessage.warning('请进入系统内预览');
  };
  const handleOpenInSystem = () => {
    const fullDetailRoute = router.resolve({
      name: 'demandDetail',
      params: { id: demandCode.value },
      query: {
        ...route.query,
        view: 'list',
        workTab: 'detail',
        bizTab: 'todo',
        entryScene: entryScene.value,
        demandCode: demandCode.value,
      },
    });
    window.open(fullDetailRoute.href, '_blank');
  };
  const handlePass = () => {
    if (isInnerAuditAction.value) {
      onPassConfirm({});
      return;
    }
    if (Number(demandDetail.value?.auditExecuteInfoFlag ?? 0) === 1) {
      approveDialogRef.value?.open();
      return;
    }
    ElMessageBox.confirm('确认通过该需求审批吗？', '提示', { type: 'warning' }).then(() => {
      onPassConfirm({});
    });
  };
  const handleReject = () => {
    rejectDialogRef.value?.open();
  };
  const onPassConfirm = async (formData: any) => {
    actionLoading.value = true;
    try {
      await submitOperation(isInnerAuditAction.value ? 'inner_approved' : 'approved', {
        ...formData,
        demandCode: demandCode.value,
      });
      ElMessage.success('审批通过');
      await fetchPageData();
    } finally {
      actionLoading.value = false;
    }
  };
  const onRejectConfirm = async (formData: any) => {
    actionLoading.value = true;
    try {
      await submitOperation(isInnerAuditAction.value ? 'inner_rejected' : 'rejected', {
        reason: formData.reason,
        innerApproveRemark: formData.reason,
        demandCode: demandCode.value,
      });
      ElMessage.success('已拒绝');
      await fetchPageData();
    } finally {
      actionLoading.value = false;
    }
  };

  onMounted(fetchPageData);
</script>

<template>
  <div v-loading="loading" class="dingtalk-detail-container">
    <header class="page-header">
      <div class="title-area">
        <span class="demand-type">用研需求：</span>
        <span class="demand-title">{{ demandDetail.demandTitle || '加载中...' }}</span>
        <el-tag
          v-if="statusLabel"
          class="status-tag dm5-status-tag"
          :class="statusClass"
          effect="dark"
        >
          {{ statusLabel }}
        </el-tag>
      </div>
      <el-button type="primary" plain size="small" @click="handleOpenInSystem">
        系统内打开
      </el-button>
    </header>

    <main class="page-content">
      <section class="step-summary">
        <span class="summary-item">当前节点：{{ currentStepSummary.stepName }}</span>
        <span class="summary-divider"></span>
        <span class="summary-item">处理人：{{ currentStepSummary.operator }}</span>
        <!-- <span class="summary-divider"></span> -->
        <!-- <span class="summary-item">状态：{{ currentStepSummary.statusDesc }}</span> -->
      </section>
      <el-descriptions :column="1" border size="small">
        <el-descriptions-item label="需求创建人">
          {{ demandDetail.creatorName || demandDetail.createName || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="所在部门">
          {{ demandDetail.deptStr || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ displayDate(demandDetail.createTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="需求类型">
          {{ demandTypeLabel }}
        </el-descriptions-item>
        <el-descriptions-item label="产品分类">
          {{ categoryLabel }}
        </el-descriptions-item>
        <el-descriptions-item v-if="demandDetail.categoryCode !== '0'" label="产品品线">
          {{ productLineLabel }}
        </el-descriptions-item>
        <el-descriptions-item v-else label="产品定级">
          {{ productLevelLabel }}
        </el-descriptions-item>
        <el-descriptions-item label="需求属性">
          {{ demandPropertyLabel }}
        </el-descriptions-item>
        <el-descriptions-item label="期望完成时间">
          {{ displayDate(demandDetail.expectFinishTime) }}
        </el-descriptions-item>
        <el-descriptions-item v-if="Number(demandDetail.demandType) === 2" label="预计发样时间">
          {{ displayDate(demandDetail.sampleDeliveryTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="核心相关人员">
          {{ relMemberNames }}
        </el-descriptions-item>

        <el-descriptions-item label="需求背景">
          <div class="long-text">{{ demandDetail.demandBackground || '-' }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="需求描述">
          <div class="long-text">{{ demandDetail.demandDesc || '-' }}</div>
        </el-descriptions-item>

        <el-descriptions-item label="需求附件">
          <div v-if="!isEmpty(demandFiles)">
            <div
              v-for="file in demandFiles"
              :key="file.fileCode || file.ossKey || file.name"
              class="file-item"
            >
              <el-link type="primary" :underline="false" @click="handleFileOpen(file)">
                <el-icon class="file-icon"><Document /></el-icon>
                {{ file.name || file.fileName || '-' }}
              </el-link>
            </div>
          </div>
          <span v-else>-</span>
        </el-descriptions-item>

        <template v-if="showExecuteContent">
          <el-descriptions-item label="需求执行人">
            {{ handlerNames }}
          </el-descriptions-item>
          <el-descriptions-item label="预计开始时间">
            {{ displayDate(demandDetail.planStartDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="预计完成时间">
            {{ displayDate(demandDetail.planFinishDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="实际完成时间">
            {{ displayDate(demandDetail.executionFinishTime) }}
          </el-descriptions-item>
          <el-descriptions-item v-if="demandDetail.changeReason" label="变更原因">
            <div class="long-text">{{ demandDetail.changeReason || '-' }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="用研附件">
            <div v-if="!isEmpty(userResearchFiles)">
              <div
                v-for="file in userResearchFiles"
                :key="file.fileCode || file.ossKey || file.name"
                class="file-item"
              >
                <el-link type="primary" :underline="false" @click="handleFileOpen(file)">
                  <el-icon class="file-icon"><Document /></el-icon>
                  {{ file.name || file.fileName || '-' }}
                </el-link>
              </div>
            </div>
            <span v-else>-</span>
          </el-descriptions-item>
          <el-descriptions-item label="结论">
            <div class="long-text">{{ reportConclusionText }}</div>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </main>

    <footer v-if="showApproveActions" class="page-footer">
      <el-button type="danger" plain :loading="actionLoading" @click="handleReject">拒绝</el-button>
      <el-button type="primary" :loading="actionLoading" @click="handlePass">通过</el-button>
    </footer>

    <ApproveDialog ref="approveDialogRef" :loading="actionLoading" @submit="onPassConfirm" />
    <RejectDialog ref="rejectDialogRef" :loading="actionLoading" @submit="onRejectConfirm" />
  </div>
</template>

<style scoped lang="scss">
  @use '../../styles/status-tag.scss' as *;

  .dingtalk-detail-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f7fa;
    overflow: hidden;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
    flex-shrink: 0;
  }

  .title-area {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    margin-right: 12px;
  }

  .demand-type {
    color: #909399;
    font-size: 14px;
    white-space: nowrap;
  }

  .demand-title {
    color: #303133;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status-tag {
    margin-left: 8px;
    flex-shrink: 0;
  }

  .page-content {
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px 16px;
  }

  .step-summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 10px;
    margin-bottom: 12px;
    padding: 10px 12px;
    border: 1px solid #d9ecff;
    border-radius: 6px;
    background: #f5fbff;
    color: #303133;
    font-size: 13px;
    line-height: 1.5;
  }

  .summary-item {
    min-width: 0;
    word-break: break-word;
  }

  .summary-divider {
    width: 1px;
    height: 14px;
    background: #c0c4cc;
  }

  :deep(.el-descriptions__label) {
    width: 120px;
    color: #606266;
    font-weight: 500;
  }

  .long-text {
    line-height: 1.6;
    word-break: break-word;
    white-space: pre-wrap;
    color: #303133;
  }

  .file-item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .file-icon {
    margin-right: 4px;
  }

  .page-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    z-index: 10;
    flex-shrink: 0;

    .el-button {
      flex: 1;
      max-width: 160px;
      height: 40px;
      font-size: 15px;
    }
  }
</style>
