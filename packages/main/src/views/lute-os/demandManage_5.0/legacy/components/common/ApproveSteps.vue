<template>
  <div class="approval-process">
    <el-steps
      :active="activeStep"
      finish-status="success"
      align-center
      class="process-steps"
      :class="{ 'all-success': allCompleted }"
    >
      <el-step
        v-for="(step, index) in approvalSteps"
        :key="index"
        :title="getTitle(step, index)"
        :description="renderDescription(step, index)"
        :status="getStepStatus(index)"
      />
      <template #icon>
        <el-icon v-if="step.status === 'success'">
          <el-icon><CircleCheckFilled /></el-icon>
        </el-icon>
        <el-icon v-else-if="step.status === 'error'">
          <el-icon><CircleCloseFilled /></el-icon>
        </el-icon>
      </template>
    </el-steps>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { ElStep, ElSteps } from 'element-plus';
  import { ApprovalStep } from '../../demandManageType';

  const props = defineProps({
    activeIndex: {
      type: Number,
      default: 0,
    },
    stepsList: {
      type: Array as PropType<ApprovalStep[]>,
      required: true,
    },
  });
  const activeStep = computed(() => Number(props.activeIndex) - 1);
  const approvalSteps = computed(() => props.stepsList);
  const allCompleted = computed(() => {
    return props.stepsList.every((step) => step.status === 'completed');
  });
  // 获取步骤状态
  const getStepStatus = (index: number) => {
    if (index < activeStep.value) {
      return approvalSteps.value[index].status === 'rejected' ? 'error' : 'success';
    }
    if (index === activeStep.value && index < approvalSteps.value.length - 1) {
      const status = approvalSteps.value[index].status;
      return status === 'in_progress' ? 'process' : status === 'rejected' ? 'error' : 'success';
    }
    if (index === activeStep.value && index === approvalSteps.value.length - 1) {
      return 'success';
    }
    return 'wait';
  };

  const renderDescription = (step: ApprovalStep, index: number) => {
    let desc = '';
    if (
      (index === 0 && step.operator) ||
      ['submit', 'review', 'feedback'].includes(step.stepCode)
    ) {
      console.log(step, 'step');
      desc += `创建人：${step.operatorDesc || step.operator}`;
    } else if (step.stepCode === 'execute') {
      desc += step.operatorDesc && step.operatorDesc !== '--' ? step.operatorDesc : '未分配';
    } else if (step.stepCode === 'complete') {
      desc = '';
    } else if (step.stepCode.includes('approve')) {
      const number = parseInt(step.stepCode.match(/_(\d+)$/)?.[1] || 0);
      desc += `审批人：${step.operatorDesc ?? '--'}\n`;
    } else if (step.stepCode === 'internal_audit') {
      desc += `内审人：${step.operatorDesc ?? '--'}`;
    } else {
      desc += `审批人：${step.operatorDesc ?? '--'}`;
    }
    return desc;
  };
  const getTitle = (step: ApprovalStep, index: number) => {
    let title = '';
    if (index === Number(activeStep.value) && index < approvalSteps.value.length - 1) {
      title +=
        approvalSteps.value[index].status !== 'rejected'
          ? `${step.stepName}中`
          : `${step.stepName}:`;
    } else {
      title += index === approvalSteps.value.length - 1 ? `${step.stepName}` : `${step.stepName}:`;
    }
    return title;
  };
</script>

<style scoped lang="scss">
  .process-steps {
    margin: 30px 0;
  }

  .action-area {
    margin-top: 30px;
    text-align: center;
  }

  h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
  }
</style>
