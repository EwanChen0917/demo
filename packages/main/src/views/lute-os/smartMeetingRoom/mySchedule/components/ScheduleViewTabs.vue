<template>
  <el-radio-group v-model="model" class="schedule-view-tabs">
    <el-radio-button label="day">日</el-radio-button>
    <el-radio-button label="week">周</el-radio-button>
    <el-radio-button label="month">月</el-radio-button>
    <el-radio-button label="list">列表</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts" name="ScheduleViewTabs">
  import type { ScheduleViewType } from '../types';

  const model = defineModel<ScheduleViewType>({ default: 'week' });
</script>

<style lang="scss" scoped>
  .schedule-view-tabs {
    :deep(.el-radio-button__inner) {
      border: 0;
    }
  }
</style>

