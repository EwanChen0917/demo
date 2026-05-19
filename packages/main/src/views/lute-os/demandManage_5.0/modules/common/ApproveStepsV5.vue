<template>
  <div class="dm5-approval-process">
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step
        v-for="(step, index) in normalizedSteps"
        :key="step.stepCode || index"
        :title="resolveStepTitle(step, index)"
        :description="resolveStepDescription(step)"
        :status="resolveStepStatus(step, index)"
      />
    </el-steps>
  </div>
</template>

<script setup lang="ts">
  import type { ApprovalStep } from '../../types/approval';

  const props = defineProps<{
    activeIndex: number | string;
    stepsList: ApprovalStep[];
  }>();

  const normalizedSteps = computed(() => props.stepsList || []);
  const activeStep = computed(() => {
    const steps = normalizedSteps.value || [];
    const isAllCompleted =
      steps.length > 0 && steps.every((step) => `${step?.status || ''}` === 'completed');
    if (isAllCompleted) {
      return steps.length;
    }
    const statusDrivenIndex = steps.findIndex((step) =>
      ['in_progress', 'rejected'].includes(`${step?.status || ''}`)
    );
    if (statusDrivenIndex >= 0) {
      return statusDrivenIndex;
    }
    const pendingIndex = steps.findIndex((step) => `${step?.status || ''}` === 'pending');
    if (pendingIndex > 0) {
      return pendingIndex - 1;
    }
    return Math.max(Number(props.activeIndex || 1) - 1, 0);
  });

  const resolveStepStatus = (step: ApprovalStep, index: number) => {
    if (step.status === 'rejected') {
      return 'error';
    }
    if (step.status === 'completed') {
      return 'success';
    }
    if (step.status === 'in_progress') {
      return 'process';
    }
    if (step.status === 'pending') {
      return 'wait';
    }
    if (index < activeStep.value) {
      return 'success';
    }
    if (index === activeStep.value) {
      return step.status === 'pending' ? 'wait' : 'process';
    }
    return 'wait';
  };

  const resolveStepTitle = (step: ApprovalStep, index: number) => {
    if (index === activeStep.value && step.status === 'in_progress') {
      return `${step.stepName}`;
    }
    return step.stepName;
  };

  const resolveStepDescription = (step: ApprovalStep) => {
    if (step.stepCode === 'complete') {
      return '';
    }
    if (step.stepCode === 'submit' || step.stepCode === 'review' || step.stepCode === 'feedback') {
      return `创建人：${step.operatorDesc || step.operator || '--'}`;
    }
    if (step.stepCode === 'execute') {
      return step.operatorDesc || '未分配';
    }
    if (step.stepCode === 'internal_audit') {
      return `内审人：${step.operatorDesc || '--'}`;
    }
    return `审批人：${step.operatorDesc || '--'}`;
  };
</script>

<style scoped lang="scss">
  .dm5-approval-process {
    margin: 32px 0;
  }
</style>
