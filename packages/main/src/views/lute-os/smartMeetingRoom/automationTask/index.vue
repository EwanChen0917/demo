<template>
  <div class="smart-meeting-room-automation-task-page">
    <!-- <div class="page-title">自动化任务管理</div> -->
    <AutomationTaskTable />
  </div>
</template>

<script setup lang="ts" name="smartMeetingRoomAutomationTask">
  import AutomationTaskTable from './components/AutomationTaskTable.vue';
</script>

<style lang="scss" scoped>
  .smart-meeting-room-automation-task-page {
    width: 100%;
    .page-title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
</style>
