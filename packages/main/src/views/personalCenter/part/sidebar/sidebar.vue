<template>
  <div class="index-side-bar">
    <daily-record />
    <world-time />
    <exchange-rate :monthValue="monthValue" />
    <common-functions />
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import DailyRecord from './dailyRecord.vue';
  import WorldTime from './worldTime.vue';
  import ExchangeRate from './exchangeRate.vue';
  import CommonFunctions from './commonFunctions.vue';

  const props = withDefaults(
    defineProps<{
      monthValue: string;
    }>(),
    {
      monthValue: dayjs().format('YYYY-MM'),
    }
  );
</script>

<style scoped lang="scss">
  .index-side-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
