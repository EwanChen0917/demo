<template>
  <div class="lead-process-steps">
    <template v-for="(step, idx) in steps" :key="step.stepCode">
      <div class="lead-process-step" :class="`is-${step.stepStatus}`">
        <div class="lead-process-step__dot">
          <el-icon v-if="step.stepStatus === 'done'"><Check /></el-icon>
          <span v-else>{{ idx + 1 }}</span>
        </div>
        <div class="lead-process-step__title">{{ step.stepName }}</div>
        <div class="lead-process-step__date">{{ formatDate(step.transferredAt) }}</div>
      </div>
      <div v-if="idx < steps.length - 1" class="lead-process-connector">
        <div class="lead-process-connector__line" />
        <div class="lead-process-connector__days">{{ daysBetween(step.transferredAt, steps[idx + 1].transferredAt) }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="LeadProcessSteps">
  import dayjs from 'dayjs';
  import { Check } from '@element-plus/icons-vue';
  import type { ProcessStep } from '@/api/leadValueApi';

  defineProps<{
    steps: ProcessStep[];
  }>();

  function formatDate(value?: string): string {
    if (!value) return '-';
    const d = dayjs(value);
    return d.isValid() ? d.format('YYYY-MM-DD') : '-';
  }

  function daysBetween(from?: string, to?: string): string {
    if (!from || !to) return '-';
    const a = dayjs(from);
    const b = dayjs(to);
    if (!a.isValid() || !b.isValid()) return '-';
    const diff = b.startOf('day').diff(a.startOf('day'), 'day');
    if (diff <= 0) return '当天';
    return `${diff}天`;
  }
</script>

<style scoped lang="scss">
  .lead-process-steps {
    display: flex;
    align-items: flex-start;
    margin: 12px 0 18px;
    overflow-x: auto;
  }

  .lead-process-step {
    flex: 0 0 auto;
    text-align: center;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    &__dot {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #f0f2f5;
      color: #8a94a6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    &__title {
      font-size: 12px;
      color: #1f2329;
      line-height: 1.3;
      max-width: 100px;
      word-break: break-word;
    }

    &__date {
      font-size: 11px;
      color: #8a94a6;
      line-height: 1.3;
    }

    &.is-done .lead-process-step__dot {
      background: var(--el-color-success);
      color: #fff;
    }

    &.is-in_progress .lead-process-step__dot {
      background: var(--el-color-primary);
      color: #fff;
    }
  }

  .lead-process-connector {
    flex: 1 1 0;
    min-width: 24px;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0 4px;

    &__line {
      width: 100%;
      height: 2px;
      background: #e4e7ed;
    }

    &__days {
      font-size: 11px;
      color: #8a94a6;
    }
  }
</style>
