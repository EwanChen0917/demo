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
            v-model="form.handlerList"
            :maxCollapseTags="5"
            multiple
            collapseTags
            :disabled="!isModifyExecutor"
          />
        </el-form-item>
        <el-form-item label="预计开始时间" prop="planStartDate">
          <el-date-picker
            v-model="form.planStartDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="disableCondition"
            :disabled-date="disablePlanStartDate"
          />
        </el-form-item>
        <el-form-item label="预计完成时间" prop="planFinishDate">
          <el-date-picker
            v-model="form.planFinishDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="disableCondition"
            :disabled-date="disablePlanFinishDate"
          />
        </el-form-item>
        <el-form-item label="实际完成时间" prop="executionFinishTime">
          <template v-if="disableCondition && !form.executionFinishTime">
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
            :disabled="disableCondition"
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
            :disabled="disableCondition"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="上传附件" prop="userResearchFile">
          <KeenFileUpload
            ref="upload"
            v-model="form.userResearchFile"
            directory="fileCenter"
            class="file-upload"
            :disabled="disableCondition"
            :sizeLimit="157286400"
            :showOperate="true"
          >
            <el-button type="primary" :disabled="disableCondition">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
        <el-form-item label="结论" prop="reportConclusion" class="conclusion-form-item">
          <p v-if="disableCondition" class="conclusion-text">
            {{ form.reportConclusion || '-' }}
          </p>
          <el-input
            v-else
            v-model="form.reportConclusion"
            type="textarea"
            placeholder="这是一段需求结论"
            :disabled="disableCondition"
            maxlength="1000"
            show-word-limit
            :autosize="true"
          />
        </el-form-item>

        <el-form-item
          v-if="
            route.query.from === 'executeMyDemandList' &&
            [3, 4, 5].includes(props.demandDetail.status)
          "
        >
          <el-button
            type="primary"
            @click="handleWithdraw(props.demandDetail.status)"
            v-if="props.demandDetail.auth.cancelFlag"
          >
            撤回
          </el-button>
          <template v-else>
            <el-button
              type="primary"
              @click="handleSubmitAudit(props.demandDetail.status)"
              :loading="interAuditLoading"
            >
              {{ props.demandDetail.status === 5 ? '重新提交' : '提交内审' }}
            </el-button>
            <el-button
              type="primary"
              @click="handleSave(props.demandDetail.status)"
              :loading="interAuditLoading"
            >
              保存
            </el-button>
          </template>
        </el-form-item>
        <el-form-item v-if="inetrAuditButtonDisplayCondition">
          <el-button type="primary" @click="innerApproveDemand" :loading="loading">通过</el-button>
          <el-button type="danger" @click="rejectDemand">拒绝</el-button>
        </el-form-item>
        <el-form-item v-if="isModifyExecutor">
          <el-button
            type="primary"
            @click="handleSaveExecutor(props.demandDetail.status)"
            :loading="interAuditLoading"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="10" v-if="showExtraPanel">
      <ExecuteExtraPanel v-model:form="form" :disabled="disableCondition" v-if="displayCondition" />
    </el-col>
  </el-row>
  <RejectDialog ref="rejectDialogRef" @submit="handleRejectSubmit" :loading="loading" />
  <WithdrawDialog
    v-model:visible="withdrawDialogVisible"
    @submit="handleWithdrawSubmit"
    :loading="loading"
    @confirm="handleWithdrawSubmit"
  />
</template>

<script setup>
  import ExecuteExtraPanel from './ExecuteExtraPanel.vue';
  import { useRoute } from 'vue-router';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import { platformApi } from '@/api';
  import { useVModel } from '@vueuse/core';
  import RejectDialog from '../components/common/RejectDialog.vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  import WithdrawDialog from './WithdrawDialog.vue';
  import { ElMessage } from 'element-plus';
  import { some } from 'lodash-es';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const router = useRouter();
  const { submitOperation } = useDemandOperation();
  const emit = defineEmits(['success']);
  const route = useRoute();
  const props = defineProps({
    demandDetail: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    isExecuteMode: {
      type: Boolean,
      default: false,
    },
  });
  const userInfoStore = useStore();
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

  const loading = ref(false);
  const form = useVModel(props, 'demandDetail', {
    planFinishDate: '',
    planStartDate: '',
    changeReason: '',
    reportConclusion: '',
    userResearchFile: [],
    score: 0,
    scoreReason: '',
    implementFlag: 0,
    implementRemark: '',
  });
  const isAttachmentUploading = computed(() =>
    some(form.value.userResearchFile, (file) => Number(file?.percentage ?? 100) < 100)
  );
  const ensureAttachmentUploadCompleted = () => {
    if (isAttachmentUploading.value) {
      ElMessage.warning('附件还在上传中，请等待上传完成后再操作');
      return false;
    }
    return true;
  };

  const inetrAuditButtonDisplayCondition = computed(() => {
    return (
      route.query.interaudit === '1' &&
      (props.demandDetail.status === 5 || props.demandDetail.status === 4) &&
      props.isEditMode
    );
  });

  const isModifyExecutor = computed(() => {
    return route.query.from === 'executeList' && props.demandDetail.status === 3;
  });

  const rules = reactive({
    handlerList: [{ required: true, message: '请选择执行人', trigger: 'change' }],
    planStartDate: [{ required: true, message: '请选择预计开始时间', trigger: 'change' }],
    planFinishDate: [{ required: true, message: '请选择预计完成时间', trigger: 'change' }],
    executionFinishTime: [{ required: true, message: '请选择实际完成时间', trigger: 'change' }],
    reportConclusion: [],
    userResearchFile: [],
    changeReason: [],
  });

  const { demandDetail } = toRefs(props);
  const disableCondition = computed(() => {
    return [3, 4, 6, 7, 8].includes(demandDetail.value.status) && !props.isExecuteMode;
  });

  const formRef = ref();

  function updateRulesForSubmit() {
    rules.reportConclusion = [
      { required: true, message: '请填写报告结论（1000字内）', max: 1000, trigger: 'blur' },
    ];
    rules.userResearchFile = [{ required: true, message: '请上传附件', trigger: 'change' }];
  }

  function updateRulesForSave() {
    rules.reportConclusion = [{ max: 1000, message: '结论不能超过1000字', trigger: 'blur' }];
    rules.userResearchFile = [];
  }

  const interAuditLoading = ref(false);
  function disableExecutionFinishTime(date) {
    // 如果没有预计开始时间，则不限制
    if (!form.value.planStartDate) return false;

    // 获取预计开始时间的零点
    const planStart = new Date(form.value.planStartDate).setHours(0, 0, 0, 0);

    // 禁用早于预计开始时间的日期
    return date.getTime() < planStart;
  }

  const handleSubmitAudit = async (status) => {
    if (!ensureAttachmentUploadCompleted()) {
      return;
    }
    try {
      updateRulesForSubmit();
      formRef.value.validate().then(async () => {
        interAuditLoading.value = true;
        const fileObj = form.value.userResearchFile?.[0];
        await platformApi.platformDemandInterApprove({
          ...form.value,
          demandCode: props.demandDetail.demandCode,
          editFlag: 1,
          approveFlag: 1,
          userResearchFile: fileObj
            ? {
                demandCode: props.demandDetail.demandCode,
                fileCode: '',
                fileKey: fileObj.ossKey,
                fileName: fileObj.name.replace(/\.[^/.]+$/, ''),
                extType: fileObj.name.split('.').pop() || '',
                fileSize: fileObj.size || 0,
              }
            : null,
        });
        emit('success');
        interAuditLoading.value = false;
      });
    } catch (error) {
      console.error('提交内审失败', error);
      interAuditLoading.value = false;
    } finally {
      interAuditLoading.value = false;
    }
  };

  const handleSave = async () => {
    if (!ensureAttachmentUploadCompleted()) {
      return;
    }
    try {
      updateRulesForSave();
      formRef.value.validate().then(async () => {
        interAuditLoading.value = true;
        const fileObj = form.value.userResearchFile?.[0];
        await platformApi.platformDemandInterApprove({
          ...form.value,
          demandCode: props.demandDetail.demandCode,
          editFlag: 1,
          approveFlag: 0,
          userResearchFile: fileObj
            ? {
                demandCode: props.demandDetail.demandCode,
                fileCode: '',
                fileKey: fileObj.ossKey,
                fileName: fileObj.name.replace(/\.[^/.]+$/, ''),
                extType: fileObj.name.split('.').pop() || '',
                fileSize: fileObj.size || 0,
              }
            : null,
        });
        emit('success');
        interAuditLoading.value = false;
      });
    } catch (error) {
      console.error('保存失败', error);
    } finally {
      interAuditLoading.value = false;
    }
  };

  const handleWithdraw = async () => {
    withdrawDialogVisible.value = true;
  };
  const handleWithdrawSubmit = async () => {
    loading.value = true;
    try {
      await platformApi.platformDemandOperate({
        memberCodeList: Array.isArray(form.value.handlerList)
          ? form.value.handlerList
          : [form.value.handler],
        // memberCodeList: form.value.handlerList,
        demandCode: props.demandDetail.demandCode,
        operateType: 'demand_cancel',
      });
      withdrawDialogVisible.value = false;
      emit('success');
      loading.value = false;
    } catch (error) {
      console.error('撤回失败', error);
    } finally {
      loading.value = false;
    }
  };
  const handleSaveExecutor = async () => {
    try {
      if (disableCondition.value && !form.value.handlerList.length) {
        return;
      } else if (disableCondition.value && form.value.handlerList.length) {
        updateHandler();
        return;
      }
      formRef.value.validate().then(async () => {
        updateHandler();
      });
    } catch (error) {
      console.error('修改失败', error);
      interAuditLoading.value = false;
    } finally {
      interAuditLoading.value = false;
    }
  };
  const updateHandler = async () => {
    interAuditLoading.value = true;
    await platformApi.platformDemandOperate({
      memberCodeList: form.value.handlerList,
      demandCode: props.demandDetail.demandCode,
      operateType: 'update_handler', // 修改执行人
    });
    interAuditLoading.value = false;
    emit('success');
  };
  const innerApproveDemand = async () => {
    loading.value = true;
    try {
      await submitOperation('inner_approved', { demandCode: form.value.demandCode });
      emit('success');
    } catch (error) {
      console.error('内审通过失败', error);
    } finally {
      loading.value = false;
    }
  };
  const rejectDemand = async () => {
    rejectDialogRef.value.open();
  };
  const rejectDialogRef = ref();

  const handleRejectSubmit = async (formData) => {
    loading.value = true;
    try {
      await submitOperation('inner_rejected', {
        demandCode: form.value.demandCode,
        innerApproveRemark: formData.reason,
      });
      emit('success');
    } catch (error) {
      console.error('内审拒绝失败', error);
    } finally {
      loading.value = false;
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

  const stopWatchProps = watch(
    () => props.demandDetail,
    (detail) => {
      if (detail && detail.demandCode) {
        if (detail.planStartDate || detail.planFinishDate) {
          isEditModeWithDates.value = true;
          originalPlanStartDate.value = detail.planStartDate || null;
          originalPlanFinishDate.value = detail.planFinishDate || null;
        } else {
          isEditModeWithDates.value = false;
        }

        // 模式已确定，立即停止监听，防止后续操作意外改变模式
        stopWatchProps();

        // 根据确定的模式，初始化一次校验规则
        updateChangeReasonRules();
      }
    },
    { immediate: false, deep: true }
  );

  // 监听用户在表单中对日期的修改行为
  watch(
    () => [form.value.planStartDate, form.value.planFinishDate],
    () => {
      // 每当日期变化时，都调用规则更新函数。
      updateChangeReasonRules();
    }
  );

  // 控制右侧面板展示
  const showExtraPanel = ref(true);
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
</style>
