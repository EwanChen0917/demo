<template>
  <div class="dm5-submit-page">
    <LegacyDemandSubmitCreate />
  </div>
</template>

<script setup lang="ts">
  import LegacyDemandSubmitCreate from '@/views/lute-os/demandManage_5.0/legacy/demandSubmitCreate/index.vue';

  defineOptions({
    name: 'DemandSubmit',
  });
</script>

<style scoped lang="scss">
  .dm5-submit-page {
    min-height: 100%;
  }
</style>
