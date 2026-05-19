<template>
  <el-card shadow="never" class="flow-steps-card">
    <template #header>
      <div class="card-header">
        <span class="title">需求执行流程一览</span>
      </div>
    </template>
    <el-steps :active="activeIndex" align-center finish-status="success">
      <el-step
        v-for="item in steps"
        :key="item.key"
        :title="item.title"
        :description="item.description"
        :status="item.status"
      />
    </el-steps>
    <div v-if="showRemark" class="remark">
      <!-- <span class="label">审批说明：</span> -->
      <span class="text">{{ remark }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import type { ProcurementFlowStep } from '../constant';

  const props = defineProps<{
    steps: ProcurementFlowStep[];
    currentStep?: string;
    remark?: string;
  }>();

  const activeIndex = computed(() => {
    if (!props.currentStep) return 0;
    const index = props.steps.findIndex((step) => step.key === props.currentStep);
    return index >= 0 ? index : 0;
  });

  const showRemark = computed(() => activeIndex.value === 1 && !!props.remark);
</script>
