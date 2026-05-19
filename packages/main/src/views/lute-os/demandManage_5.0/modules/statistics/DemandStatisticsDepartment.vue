<template>
  <section class="dm5-stats-wrap">
    <LegacyDemandStatistics />
  </section>
</template>

<script setup lang="ts">
  import LegacyDemandStatistics from '@/views/lute-os/demandManage_5.0/legacy/demandStatistics/index.vue';

  defineOptions({
    name: 'DemandDeptStats',
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
