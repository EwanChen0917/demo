<template>
  <div class="smart-meeting-room-execution-log-page">
    <div class="content-container">
      <ExecutionOverview class="section" />
      <ExecutionLogTable class="section" />
    </div>
  </div>
</template>

<script setup lang="ts" name="smartMeetingRoomExecutionLog">
  import ExecutionLogTable from './components/ExecutionLogTable.vue';
  import ExecutionOverview from './components/ExecutionOverview.vue';
</script>

<style lang="scss" scoped>
  .smart-meeting-room-execution-log-page {
    width: 100%;
    height: 100%;
    padding: 12px;
    background: #fff;
    box-sizing: border-box;

    .content-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section {
      width: 100%;
    }
  }
</style>
