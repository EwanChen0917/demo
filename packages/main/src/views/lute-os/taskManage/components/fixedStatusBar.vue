<template>
  <div class="fixed-status-bar">
    <div class="status-list d-flex gap-8" v-if="isReady">
      <StatusSelectTag
        v-model="status"
        v-if="[1, 2].includes(taskDetail?.status)"
        :status="taskDetail?.status"
        :statusDesc="taskDetail?.statusDesc"
        @change="(val) => handleChangeStatus(val)"
      />
      <StatusTag v-else :status="taskDetail?.status">
        {{ taskDetail?.statusDesc }}
      </StatusTag>
      <!-- <Tag color="gray" v-if="isNotStart">未开始</Tag> -->
      <Tag :color="statusColorMap[taskDetail?.approvalStatus]">
        {{ taskDetail?.approvalStatusDesc }}
      </Tag>
      <el-tooltip
        v-if="taskDetail?.approvalStatus === 4"
        effect="dark"
        placement="right"
        :content="taskDetail?.rejectReason || '暂无原因'"
      >
        <el-link type="primary" size="small" :underline="false">拒绝原因</el-link>
      </el-tooltip>
      <Tag v-if="isEnabledMilestone" color="green">里程碑已启用</Tag>
      <Tag v-else color="gray">里程碑未启用</Tag>
      <Tag v-if="isEnabledCycle" color="green">周报已启用</Tag>
      <Tag v-else color="gray">周报未启用</Tag>
    </div>
    <div class="action-list" v-if="isReady">
      <el-button
        v-for="(action, idx) in actionButtonList"
        :key="idx"
        v-loading="action.loading"
        :type="action.type"
        :plain="action.plain"
        :class="action.customClass"
        :color="action.color ?? ''"
        :disabled="action.disabled"
        @click="action.onClick"
      >
        {{ action.label }}
      </el-button>
    </div>
    <div class="action-list" style="margin-left: auto" v-if="!taskDetail">
      <el-button @click="emit('cancel')">取消</el-button>
      <el-button type="primary"  @click="emit('create-save')" v-loading="saveLoading">保存</el-button>
      <el-button type="primary" @click="emit('create')" v-loading="saveLoading">创建任务</el-button>
    </div>
  </div>
</template>

<script setup>
  import StatusSelectTag from './statusSelectTag.vue';
  import StatusTag from './statusTag.vue';
  const props = defineProps({
    taskDetail: {
      type: Object,
      required: true,
    },
    computedStatus: {
      type: Object,
      default: () => {},
    },
    statusColorMap: {
      type: Object,
      default: () => {},
    },
    showDiff: {
      type: Boolean,
      default: false,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    dingTalkAuth: {
      type: Boolean,
      default: false,
    },
    saveLoading: {
      type: Boolean,
      default: false,
    },
    saveChangeLoading: {
      type: Boolean,
      default: false
    }
  });
  const isEnabledMilestone = computed(() => {
    return props.taskDetail.useMilestone === 1;
  });
  const isEnabledCycle = computed(() => {
    return props.taskDetail.useWeeklyReport === 1;
  });
  const isReady = computed(() => {
    return !!props.taskDetail && typeof props.taskDetail.approvalStatus !== 'undefined';
  });
  const isNotStart = computed(() => {
    return props.taskDetail.approvalStatus === 1 || props.taskDetail.approvalStatus === 4;
  });
  const status = ref(props.taskDetail?.status);
  watch(
    () => props.taskDetail?.status,
    (v) => (status.value = v)
  );

  const handleChangeStatus = (val) => {
    status.value = val;
    emit('update-status', val);
  };
  const actionList = reactive([
    {
      label: '接收任务',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.computedStatus.isHandler),
      onClick: () => {
        emit('accept');
      },
      disabled: false,
    },
    {
      label: '拒绝任务',
      type: 'danger',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.computedStatus.isHandler),
      onClick: () => {
        emit('reject');
      },
      disabled: false,
    },
    {
      label: '查看变更前',
      type: 'warning',
      plain: false,
      customClass: 'button-text-color',
      color: '#ff793e',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.historyFlag === 1),
      onClick: () => {
        emit('view-before');
      },
      disabled: false,
    },
    {
      label: '回到变更后',
      type: 'success',
      plain: false,
      customClass: 'button-text-color',
      color: '#00b038',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.historyFlag === 1),
      // buttonAuth: true,
      onClick: () => {
        emit('view-after');
      },
      disabled: false,
    },
    {
      label: '取消',
      type: '',
      plain: true,
      customClass: 'action-black',
      buttonAuth: !props.dingTalkAuth,
      onClick: () => {
        if (props.editing) {
          emit('cancel-change');
        } else {
          emit('cancel');
        }
      },
      disabled: false,
    },
    {
      label: '保存',
      type: 'primary',
      plain: false,
      customClass: '',
      onClick: () => {
        emit('save');
      },
      disabled: false,
    },
    {
      label: '重新发起',
      type: 'primary',
      plain: false,
      customClass: '',
      onClick: () => {
        emit('resubmit');
      },
      disabled: false,
    },
    {
      label: '拒绝变更',
      type: 'danger',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.changeApproveFlag === 1),
      // buttonAuth: true,
      onClick: () => {
        emit('reject-change');
      },
      disabled: false,
    },
    {
      label: '同意变更',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.changeApproveFlag === 1),
      // buttonAuth: true,
      onClick: () => {
        emit('agree-change');
      },
      disabled: false,
    },
    {
      label: '周报审批通过',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.reportApplyFlag === 1),
      onClick: () => {
        emit('report-approve');
      },
      disabled: false,
    },
    {
      label: '周报审批拒绝',
      type: 'danger',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.reportApplyFlag === 1),
      onClick: () => {
        emit('report-reject');
      },
      disabled: false,
    },
    {
      label: '接受关闭',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.finishApproveFlag === 1),
      onClick: () => {
        emit('accept-close');
      },
      disabled: false,
    },
    {
      label: '拒绝关闭',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.finishApproveFlag === 1),
      onClick: () => {
        emit('reject-close');
      },
      disabled: false,
    },
    {
      label: '发起变更',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.changeFlag === 1),
      onClick: () => {
        emit('change-task');
      },
      disabled: false,
    },
    {
      label: '提交变更',
      type: 'primary',
      plain: false,
      loading: computed(() => props.saveChangeLoading),
      customClass: '',
      onClick: () => {
        emit('submit-change');
      },
      disabled: false,
    },
    {
      label: '完成任务',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.finishFlag === 1),
      onClick: () => {
        emit('finish-task');
      },
      disabled: false,
    },
    {
      label: '同意变更申请',
      type: 'primary',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.changeApplyFlag === 1),
      onClick: () => {
        emit('change-handler-approve');
      },
    },
    {
      label: '拒绝变更申请',
      type: 'danger',
      plain: false,
      customClass: '',
      buttonAuth: computed(() => props.taskDetail?.buttonAuth?.changeApplyFlag === 1),
      onClick: () => {
        emit('change-handler-reject');
      },
    },
  ]);
  const actionButtonList = computed(() => {
    if (
      props.computedStatus.isCreator &&
      (props.taskDetail.approvalStatus === 1 || props.taskDetail.approvalStatus === 4)
    ) {
      return actionList.filter(
        (button) =>
          (button.label === '保存') ||
          (button.label === '重新发起') ||
          (button.label === '取消' && button.buttonAuth)
      );
    }
    if (props.taskDetail.approvalStatus === 2) {
      return actionList.filter(
        (button) =>
          (button.label === '接收任务' && button.buttonAuth) ||
          (button.label === '拒绝任务' && button.buttonAuth) || 
          (button.label === '取消')
      );
    }
    if ([3, 6, 7, 10].includes(props.taskDetail.approvalStatus)) {
      return actionList.filter(
        (button) =>
          (button.label === '发起变更' && button.buttonAuth && !props.editing) ||
          (button.label === '提交变更' && props.editing) ||
          (button.label === '完成任务' && button.buttonAuth) ||
          (button.label === '查看变更前' && button.buttonAuth && !props.showDiff) ||
          (button.label === '回到变更后' && button.buttonAuth && props.showDiff) ||
          (button.buttonAuth && button.label === '周报审批通过') ||
          (button.buttonAuth && button.label === '周报审批拒绝') ||
          (button.buttonAuth && button.label === '同意变更申请') ||
          (button.buttonAuth && button.label === '拒绝变更申请') ||
          (button.buttonAuth && button.label === '取消')
      );
    }
    if (props.taskDetail.approvalStatus === 5) {
      return actionList.filter(
        (button) =>
          (button.label === '查看变更前' && button.buttonAuth && !props.showDiff) ||
          (button.label === '回到变更后' && button.buttonAuth && props.showDiff) ||
          (button.buttonAuth && button.label === '拒绝变更') ||
          (button.buttonAuth && button.label === '同意变更') ||
          (button.buttonAuth && button.label === '接受关闭') ||
          (button.buttonAuth && button.label === '拒绝关闭') ||
          (button.buttonAuth && button.label === '周报审批通过') ||
          (button.buttonAuth && button.label === '周报审批拒绝') ||
          (button.buttonAuth && button.label === '同意变更申请') ||
          (button.buttonAuth && button.label === '拒绝变更申请') ||
          (button.buttonAuth && button.label === '取消')
      );
    }
    if (props.taskDetail.approvalStatus === 8) {
      return actionList.filter(
        (button) =>
          (button.label === '接受关闭' && button.buttonAuth) ||
          (button.label === '拒绝关闭' && button.buttonAuth) ||
          (button.buttonAuth && button.label === '取消')
      );
    }
    return actionList.filter((button) => (button.label === '取消' && button.buttonAuth));
  });
  const emit = defineEmits([
    'accept',
    'reject',
    'save',
    'resubmit',
    'change-task',
    'finish-task',
    'accept-close',
    'reject-close',
    'view-before',
    'view-after',
    'change-handler-approve',
    'change-handler-reject',
    'finish-approve',
    'finish-reject',
    'create',
    'create-save',
    'update-status',
  ]);
</script>

<style lang="scss" scoped>
  .fixed-status-bar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 59px;
    background: #fff;
    z-index: 2;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 32px;
    border-bottom: 1px solid #f1f1f1;

    .status-list {
      display: flex;
      gap: 8px;

      .status-list {
        display: flex;
        gap: 8px;

        .status-green {
          background: #f6fff6;
          color: #56be55;
          border: none;
        }

        .status-blue {
          background: #e5f1ff;
          color: #338fff;
          border: none;
        }
      }

      .status-green {
        background: #f6fff6;
        color: #56be55;
        border: none;
      }

      .status-blue {
        background: #e5f1ff;
        color: #338fff;
        border: none;
      }
    }

    .action-list {
      display: flex;
      gap: 10px;

      .action-list {
        display: flex;
        gap: 10px;

        .action-black {
          border: 1px solid #222;
          color: #222;
          background: #fff;
        }
      }
    }

    .button-text-color {
      color: #fff;
    }

    .action-black {
      border: 1px solid #222;
      color: #222;
      background: #fff;
    }
  }

  .button-text-color {
    color: #fff;
  }

@media (max-width: 620px) {
  .fixed-status-bar {
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    gap: 15px;
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    .status-list,
    .action-list {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 8px;
    }

    .el-button {
      max-width: 100%;
    }
  }
}
</style>
