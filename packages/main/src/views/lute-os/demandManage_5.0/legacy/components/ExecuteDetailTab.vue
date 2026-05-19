<template>
  <el-row :gutter="20" class="mt-5">
    <!-- 左侧主表单 -->
    <el-col :span="14">
      <el-form
        label-width="120px"
        :model="form"
        :rules="rules"
        ref="formRef"
        :validate-on-rule-change="false"
      >
        <el-form-item label="需求执行人" prop="handlerList">
          <DeptMember
            v-if="detailViewState.showModifyExecutorAction"
            v-model="form.handlerList"
            :maxCollapseTags="5"
            multiple
            collapseTags
            deferRenderUntilOptionsLoaded
          />
          <div v-else class="readonly-member-list">
            <span v-if="isEmpty(handlerReadonlyMembers)" class="readonly-member-empty">-</span>
            <div
              v-for="member in handlerReadonlyMembers"
              :key="member.memberCode"
              class="readonly-member-item"
            >
              <el-avatar :src="member.avatar || defaultAvatar" :size="24" />
              <span>{{ member.name }}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="预计开始时间" prop="planStartDate">
          <el-date-picker
            v-model="form.planStartDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="formFieldDisabled"
            :disabled-date="disablePlanStartDate"
          />
        </el-form-item>
        <el-form-item label="预计完成时间" prop="planFinishDate">
          <el-date-picker
            v-model="form.planFinishDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="formFieldDisabled"
            :disabled-date="disablePlanFinishDate"
          />
        </el-form-item>
        <el-form-item label="实际完成时间" prop="executionFinishTime">
          <template v-if="formFieldDisabled && !form.executionFinishTime">
            <span style="color: #999; display: inline-flex; align-items: center; height: 32px">
              -
            </span>
          </template>
          <el-date-picker
            v-else
            v-model="form.executionFinishTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="formFieldDisabled"
            :disabled-date="disableExecutionFinishTime"
          />
        </el-form-item>
        <el-form-item label="变更原因" prop="changeReason">
          <el-input
            v-model="form.changeReason"
            maxlength="200"
            show-word-limit
            type="textarea"
            placeholder="请描述变更预计完成时间的原因"
            :disabled="formFieldDisabled"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="上传附件" prop="userResearchFile" required>
          <KeenFileUpload
            ref="upload"
            v-model="form.userResearchFile"
            directory="fileCenter"
            class="file-upload"
            :disabled="formFieldDisabled"
            :sizeLimit="157286400"
            :showOperate="true"
            :allowPreview="canPreviewUserResearchFile"
            :allowDownload="canDownloadUserResearchFile"
            disabledOperateTip="暂无权限查看该用研报告"
          >
            <el-button type="primary" :disabled="formFieldDisabled">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
        <el-form-item label="报告权限" prop="reportPermission" required>
          <el-radio-group v-model="form.reportPermission" :disabled="formFieldDisabled">
            <el-radio
              v-for="item in UserResearchReportPermissionOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结论" prop="reportConclusion" class="conclusion-form-item" required>
          <p v-if="formFieldDisabled" class="conclusion-text">
            {{ form.reportConclusion || '-' }}
          </p>
          <el-input
            v-else
            v-model="form.reportConclusion"
            type="textarea"
            placeholder="这是一段需求结论"
            :disabled="formFieldDisabled"
            maxlength="1000"
            show-word-limit
            :autosize="true"
          />
        </el-form-item>

        <el-form-item
          v-if="detailViewState.showExecuteWithdrawAction || detailViewState.showExecuteSubmitAuditAction"
        >
          <el-button
            type="primary"
            @click="handleWithdraw(props.demandDetail.status)"
            v-if="detailViewState.showExecuteWithdrawAction"
          >
            撤回
          </el-button>
          <template v-if="detailViewState.showExecuteSubmitAuditAction">
            <el-button
              type="primary"
              @click="handleSubmitAudit(props.demandDetail.status)"
              :loading="actionGroupLoading && activeActionGroupButton === 'submitAudit'"
              :disabled="actionGroupLoading && activeActionGroupButton !== 'submitAudit'"
            >
              {{ props.demandDetail.status === 5 ? '重新提交' : '提交内审' }}
            </el-button>
            <el-button
              type="primary"
              @click="handleSave(props.demandDetail.status)"
              :loading="actionGroupLoading && activeActionGroupButton === 'save'"
              :disabled="actionGroupLoading && activeActionGroupButton !== 'save'"
            >
              保存
            </el-button>
          </template>
        </el-form-item>
        <el-form-item v-if="detailViewState.showInnerAuditActions || detailViewState.showModifyExecutorAction">
          <el-button
            v-if="detailViewState.showInnerAuditActions"
            type="primary"
            @click="innerApproveDemand"
            :loading="operateLoading && activeOperateAction === 'innerApprove'"
            :disabled="operateLoading && activeOperateAction !== 'innerApprove'"
          >
            通过
          </el-button>
          <el-button
            v-if="detailViewState.showInnerAuditActions"
            type="danger"
            @click="rejectDemand"
            :disabled="operateLoading"
          >
            拒绝
          </el-button>
          <el-button
            v-if="detailViewState.showModifyExecutorAction"
            type="warning"
            @click="handleSaveExecutor(props.demandDetail.status)"
            :loading="actionGroupLoading && activeActionGroupButton === 'updateHandler'"
            :disabled="actionGroupLoading && activeActionGroupButton !== 'updateHandler'"
          >
            修改执行人
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="10" v-if="showExtraPanel">
      <ExecuteExtraPanel v-model:form="form" :disabled="formFieldDisabled" v-if="displayCondition" />
    </el-col>
  </el-row>
  <RejectDialog
    ref="rejectDialogRef"
    @submit="handleRejectSubmit"
    :loading="operateLoading && activeOperateAction === 'reject'"
  />
  <WithdrawDialog
    v-model:visible="withdrawDialogVisible"
    @submit="handleWithdrawSubmit"
    :loading="operateLoading && activeOperateAction === 'withdraw'"
    @confirm="handleWithdrawSubmit"
  />
</template>

<script setup>
  import ExecuteExtraPanel from './ExecuteExtraPanel.vue';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import { platformApi } from '@/api';
  import { useVModel } from '@vueuse/core';
  import RejectDialog from '../components/common/RejectDialog.vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  import { useDemandWorkbenchStore } from '../../stores/useDemandWorkbenchStore';
  import { useDemandBaseInfoStore } from '../../stores/useDemandBaseInfoStore';
  import { useDemandDetailViewState } from '../../hooks/useDemandDetailViewState';
  import { useApiLoadingGroup } from '../../hooks/useApiLoadingGroup';
  import WithdrawDialog from './WithdrawDialog.vue';
  import { ElMessage } from 'element-plus';
  import { isEmpty, some } from 'lodash-es';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  import {
    UserResearchReportPermission,
    UserResearchReportPermissionOptions,
  } from '../constant';
  const router = useRouter();
  const { submitOperation } = useDemandOperation();
  const emit = defineEmits(['success']);
  const props = defineProps({
    demandDetail: {
      type: Object,
      default: () => ({}),
    },
    canApproveCurrentStep: {
      type: Boolean,
      default: false,
    },
    isExecuteMode: {
      type: Boolean,
      default: false,
    },
    currentStepCode: {
      type: String,
      default: '',
    },
    canOperateExecuteByStep: {
      type: Boolean,
      default: false,
    },
    canWithdrawExecuteByStep: {
      type: Boolean,
      default: false,
    },
    canModifyExecutorByStep: {
      type: Boolean,
      default: false,
    },
  });
  const userInfoStore = useStore();
  const workbenchStore = useDemandWorkbenchStore();
  const baseInfoStore = useDemandBaseInfoStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const withdrawDialogVisible = ref(false);

  function disablePlanFinishDate(date) {
    if (!form.value.planStartDate) return false;
    return date.getTime() < new Date(form.value.planStartDate).setHours(0, 0, 0, 0);
  }
  function disablePlanStartDate(date) {
    if (!form.value.planFinishDate) return false;
    return date.getTime() > new Date(form.value.planFinishDate).setHours(0, 0, 0, 0);
  }

  const { isLoading, runWithLoading } = useApiLoadingGroup();
  const operateLoading = computed(() => isLoading('operate'));
  const interApproveLoading = computed(() => isLoading('interApprove'));
  const activeActionGroupButton = computed(() => {
    if (activeInterApproveAction.value === 'submitAudit') return 'submitAudit';
    if (activeInterApproveAction.value === 'save') return 'save';
    if (activeOperateAction.value === 'updateHandler') return 'updateHandler';
    return '';
  });
  const actionGroupLoading = computed(() =>
    ['submitAudit', 'save', 'updateHandler'].includes(activeActionGroupButton.value)
  );
  const activeOperateAction = ref('');
  const activeInterApproveAction = ref('');
  const form = useVModel(props, 'demandDetail', {
    planFinishDate: '',
    planStartDate: '',
    changeReason: '',
    reportConclusion: '',
    userResearchFile: [],
    reportPermission: '',
    score: 0,
    scoreReason: '',
    implementFlag: 0,
    implementRemark: '',
  });
  const reportPermissionToAuthMap = {
    [UserResearchReportPermission.ViewDownload]: 1,
    [UserResearchReportPermission.ViewOnly]: 2,
    [UserResearchReportPermission.Private]: 3,
  };
  const authToReportPermissionMap = {
    1: UserResearchReportPermission.ViewDownload,
    2: UserResearchReportPermission.ViewOnly,
    3: UserResearchReportPermission.Private,
  };
  const hasUserResearchFile = computed(() => !isEmpty(form.value.userResearchFile));
  const defaultAvatar = new URL('@/assets/images/icon/defaultAvatar.png', import.meta.url).href;
  const handlerReadonlyMembers = computed(() =>
    (form.value.handlerList || []).map((code) => {
      const member = baseInfoStore.deptMemberMap?.[code] || {};
      return {
        memberCode: code,
        name: member.name || code,
        avatar: member.avatar || '',
      };
    })
  );
  const isAttachmentUploading = computed(() =>
    some(form.value.userResearchFile, (file) => Number(file?.percentage ?? 100) < 100)
  );
  const hasUploadedAttachment = computed(() =>
    some(form.value.userResearchFile, (file) => {
      const uploadCompleted = Number(file?.percentage ?? 100) >= 100;
      const hasFileKey = Boolean(file?.ossKey || file?.fileKey || file?.key);
      return uploadCompleted && hasFileKey;
    })
  );
  const canPreviewUserResearchFile = computed(() => props.demandDetail.reportViewFlag !== 0);
  const canDownloadUserResearchFile = computed(() => {
    if (props.demandDetail.reportDownloadFlag !== undefined && props.demandDetail.reportDownloadFlag !== null) {
      return props.demandDetail.reportDownloadFlag === 1;
    }
    const fileAuth = Number(form.value.userResearchFile?.[0]?.auth ?? 0);
    if (fileAuth) {
      return fileAuth === 1;
    }
    return form.value.reportPermission === UserResearchReportPermission.ViewDownload;
  });
  const ensureAttachmentUploadCompleted = () => {
    if (isAttachmentUploading.value) {
      ElMessage.warning('附件还在上传中，请等待上传完成后再操作');
      return false;
    }
    return true;
  };

  const detailContext = computed(() => ({
    bizTab: workbenchStore.state.bizTab,
    mode: 'execute',
    status: Number(props.demandDetail.status ?? 0),
    currentStepCode: props.currentStepCode,
    canApproveCurrentStep: props.canApproveCurrentStep,
    auditFlag: Number(props.demandDetail?.auth?.auditFlag ?? props.demandDetail?.auditFlag ?? 0),
    cancelFlag: Number(props.demandDetail?.auth?.cancelFlag ?? 0) === 1,
    canWithdrawExecuteByStep: props.canWithdrawExecuteByStep,
    canOperateExecuteByStep: props.canOperateExecuteByStep,
    canModifyExecutorByStep: props.canModifyExecutorByStep,
  }));
  const detailViewState = useDemandDetailViewState(detailContext);

  const rules = reactive({
    handlerList: [{ required: true, message: '请选择执行人', trigger: 'change' }],
    planStartDate: [{ required: true, message: '请选择预计开始时间', trigger: 'change' }],
    planFinishDate: [{ required: true, message: '请选择预计完成时间', trigger: 'change' }],
    executionFinishTime: [{ required: true, message: '请选择实际完成时间', trigger: 'change' }],
    reportConclusion: [],
    userResearchFile: [],
    reportPermission: [],
    changeReason: [],
  });

  const { demandDetail } = toRefs(props);
  const isLegacyReadonlyStatus = computed(() => [3, 4, 5, 6, 7, 8].includes(demandDetail.value.status));
  const disableCondition = computed(() => {
    return isLegacyReadonlyStatus.value && !detailViewState.value.showExecuteOperateActions;
  });
  const formFieldDisabled = computed(() => disableCondition.value || detailViewState.value.showInnerAuditActions);

  const formRef = ref();
  const reportPermissionRequiredRule = {
    required: true,
    message: '请选择报告权限',
    trigger: 'change',
  };

  function updateRulesForSubmit() {
    rules.reportConclusion = [
      { required: true, message: '请填写报告结论（1000字内）', max: 1000, trigger: 'blur' },
    ];
    rules.userResearchFile = [{ required: true, message: '请上传附件', trigger: 'change' }];
    rules.reportPermission = [reportPermissionRequiredRule];
  }

  function updateRulesForSave() {
    rules.reportConclusion = [{ max: 1000, message: '结论不能超过1000字', trigger: 'blur' }];
    rules.userResearchFile = [];
    rules.reportPermission = [reportPermissionRequiredRule];
  }

  function disableExecutionFinishTime(date) {
    // 如果没有预计开始时间，则不限制
    if (!form.value.planStartDate) return false;

    // 获取预计开始时间的零点
    const planStart = new Date(form.value.planStartDate).setHours(0, 0, 0, 0);

    // 禁用早于预计开始时间的日期
    return date.getTime() < planStart;
  }

  const normalizeUserResearchFile = (fileObj) => {
    const fileName = fileObj.name || fileObj.fileName || '';
    const auth = reportPermissionToAuthMap[form.value.reportPermission] || Number(fileObj.auth || 0);
    return {
      auth,
      demandCode: props.demandDetail.demandCode,
      fileCode: fileObj.fileCode ?? '',
      fileKey: fileObj.ossKey || fileObj.fileKey || fileObj.key || '',
      fileName: fileName.replace(/\.[^/.]+$/, ''),
      extType: fileObj.extType || fileName.split('.').pop() || '',
      fileSize: fileObj.size || fileObj.fileSize || 0,
    };
  };

  const buildInterApprovePayload = (approveFlag) => {
    const fileObj = form.value.userResearchFile?.[0];
    return {
      ...form.value,
      demandCode: props.demandDetail.demandCode,
      editFlag: 1,
      approveFlag,
      userResearchFile: fileObj ? normalizeUserResearchFile(fileObj) : null,
    };
  };

  const handleSubmitAudit = async (status) => {
    if (!ensureAttachmentUploadCompleted()) {
      return;
    }
    activeInterApproveAction.value = 'submitAudit';
    try {
      updateRulesForSubmit();
      await formRef.value.validate();
      await runWithLoading('interApprove', () =>
        platformApi.platformDemandInterApprove(buildInterApprovePayload(1))
      );
      emit('success');
    } catch (error) {
      console.error('提交内审失败', error);
    } finally {
      activeInterApproveAction.value = '';
    }
  };

  const handleSave = async () => {
    if (!ensureAttachmentUploadCompleted()) {
      return;
    }
    activeInterApproveAction.value = 'save';
    try {
      updateRulesForSave();
      await formRef.value.validate();
      await runWithLoading('interApprove', () =>
        platformApi.platformDemandInterApprove(buildInterApprovePayload(0))
      );
      emit('success');
    } catch (error) {
      console.error('保存失败', error);
    } finally {
      activeInterApproveAction.value = '';
    }
  };

  const handleWithdraw = async () => {
    withdrawDialogVisible.value = true;
  };
  const handleWithdrawSubmit = async () => {
    activeOperateAction.value = 'withdraw';
    try {
      await runWithLoading('operate', () =>
        platformApi.platformDemandOperate({
          memberCodeList: Array.isArray(form.value.handlerList)
            ? form.value.handlerList
            : [form.value.handler],
          demandCode: props.demandDetail.demandCode,
          operateType: 'demand_cancel',
        })
      );
      withdrawDialogVisible.value = false;
      emit('success');
    } catch (error) {
      console.error('撤回失败', error);
    } finally {
      activeOperateAction.value = '';
    }
  };
  const handleSaveExecutor = async () => {
    try {
      if (disableCondition.value && !form.value.handlerList.length) {
        return;
      } else if (disableCondition.value && form.value.handlerList.length) {
        await updateHandler();
        return;
      }
      await formRef.value.validateField('handlerList');
      await updateHandler();
    } catch (error) {
      console.error('修改失败', error);
    }
  };
  const updateHandler = async () => {
    activeOperateAction.value = 'updateHandler';
    try {
      await runWithLoading('operate', () =>
        platformApi.platformDemandOperate({
          memberCodeList: form.value.handlerList,
          demandCode: props.demandDetail.demandCode,
          operateType: 'update_handler',
        })
      );
      emit('success', 'update_handler');
    } finally {
      activeOperateAction.value = '';
    }
  };
  const innerApproveDemand = async () => {
    activeOperateAction.value = 'innerApprove';
    try {
      await runWithLoading('operate', () =>
        submitOperation('inner_approved', { demandCode: form.value.demandCode })
      );
      emit('success');
    } catch (error) {
      console.error('内审通过失败', error);
    } finally {
      activeOperateAction.value = '';
    }
  };
  const rejectDemand = async () => {
    rejectDialogRef.value.open();
  };
  const rejectDialogRef = ref();

  const handleRejectSubmit = async (formData) => {
    activeOperateAction.value = 'reject';
    try {
      await runWithLoading('operate', () =>
        submitOperation('inner_rejected', {
          demandCode: form.value.demandCode,
          innerApproveRemark: formData.reason,
        })
      );
      emit('success');
    } catch (error) {
      console.error('内审拒绝失败', error);
    } finally {
      activeOperateAction.value = '';
    }
  };

  const displayCondition = computed(() => {
    return demandDetail.value.status === 8;
  });

  // --- [开始] 核心逻辑修正区域 ---

  // 标志位，明确当前是“编辑模式”还是“填写模式”
  const isEditModeWithDates = ref(false);
  // 存储从后端接收的、作为比较基准的初始时间
  const originalPlanStartDate = ref(null);
  const originalPlanFinishDate = ref(null);

  /**
   * @description 动态更新“变更原因”的校验规则。
   */
  function updateChangeReasonRules() {
    // 步骤 1: 检查是否为“编辑模式”。如果不是，则变更原因永远非必填。
    if (!isEditModeWithDates.value) {
      rules.changeReason = [];
      formRef.value?.clearValidate('changeReason');
      return;
    }

    // 步骤 2: 只有在“编辑模式”下，才比较日期是否发生变更
    const startDateChanged = form.value.planStartDate !== originalPlanStartDate.value;
    const finishDateChanged = form.value.planFinishDate !== originalPlanFinishDate.value;
    const hasBeenModified = startDateChanged || finishDateChanged;

    if (hasBeenModified) {
      // 如果任一时间被修改，则添加必填校验
      rules.changeReason = [
        { required: true, message: '变更原因必填（请填写200字内）', trigger: 'blur' },
        {
          validator: (rule, value, cb) =>
            !value?.trim() ? cb(new Error('变更原因必填（请填写200字内）')) : cb(),
          trigger: 'blur',
        },
      ];
    } else {
      // 如果时间未变更（或已改回初始值），则移除必填校验
      rules.changeReason = [];
      formRef.value?.clearValidate('changeReason');
    }
  }

  const resolveDetailFileAuth = (detail) => {
    const file = Array.isArray(detail?.userResearchFile)
      ? detail?.userResearchFile?.[0]
      : detail?.userResearchFile;
    return Number(file?.auth ?? 0);
  };

  watch(
    () => [props.demandDetail?.demandCode, resolveDetailFileAuth(props.demandDetail)],
    () => {
      const detail = props.demandDetail || {};
      if (!detail.demandCode) return;
      const detailFileAuth = resolveDetailFileAuth(detail);
      const reportPermission = authToReportPermissionMap[detailFileAuth];
      if (reportPermission) {
        form.value.reportPermission = reportPermission;
      }
      if (detail.planStartDate || detail.planFinishDate) {
        isEditModeWithDates.value = true;
        originalPlanStartDate.value = detail.planStartDate || null;
        originalPlanFinishDate.value = detail.planFinishDate || null;
      } else {
        isEditModeWithDates.value = false;
        originalPlanStartDate.value = null;
        originalPlanFinishDate.value = null;
      }
      updateChangeReasonRules();
    },
    { immediate: true }
  );

  // 监听用户在表单中对日期的修改行为
  watch(
    () => [form.value.planStartDate, form.value.planFinishDate],
    () => {
      // 每当日期变化时，都调用规则更新函数。
      updateChangeReasonRules();
    }
  );

  watch(
    () => hasUploadedAttachment.value,
    (uploaded) => {
      if (!uploaded) return;
      formRef.value?.clearValidate('userResearchFile');
    }
  );

  // 控制右侧面板展示
  const showExtraPanel = ref(true);

  onMounted(() => {
    baseInfoStore.ensureDeptMemberOptions();
  });
</script>

<style scoped>
  .conclusion-form-item {
    align-items: flex-start;
  }

  .conclusion-form-item :deep(.el-form-item__label) {
    line-height: 1.5;
    padding-top: 2px;
  }

  .conclusion-form-item :deep(.el-form-item__content) {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  .conclusion-text {
    color: #1f1f1f;
    white-space: pre-wrap;
    margin: 0;
    line-height: 1.5;
    word-break: break-all;
    min-height: 32px;
    width: 100%;
  }
  .readonly-member-list {
    min-height: 32px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .readonly-member-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .readonly-member-empty {
    color: #999;
  }
</style>
