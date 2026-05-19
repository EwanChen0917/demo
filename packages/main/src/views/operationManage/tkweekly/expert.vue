<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="达人表现（汇总）" :name="1">
      <ExpertSummary />
    </el-tab-pane>
    <el-tab-pane label="达人表现（周维度）" :name="2">
      <ExpertWeek />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup name="tkweeklyexpert">
import ExpertSummary from './components/expertsummary.vue';
  import ExpertWeek from './components/expertweek.vue';

  const activeTab = ref(1);
</script>

<style scoped lang="scss"></style>
