<template>
  <section class="dm5-stats-wrap">
    <LegacyDemandStatisticsPersonal />
  </section>
</template>

<script setup lang="ts">
  import LegacyDemandStatisticsPersonal from '@/views/lute-os/demandManage_5.0/legacy/demandStatistics/personal.vue';

  defineOptions({
    name: 'DemandPersonalStats',
  });
</script>

<style scoped lang="scss">
  .dm5-stats-wrap {
    padding: 14px;
    background: #f8fafc;
    flex: 1;
    overflow-y: auto;
    border-radius: 8px;
  }
</style>
