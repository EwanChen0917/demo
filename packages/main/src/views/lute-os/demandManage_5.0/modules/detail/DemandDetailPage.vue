<template>
  <div class="dm5-detail-page">
    <DemandDetailCore v-if="hasDemandCode" :demand-code="resolvedDemandCode" />
    <el-empty v-else description="请从列表中选择需求进入详情" />
  </div>
</template>

<script setup lang="ts">
  import DemandDetailCore from './components/DemandDetailCore.vue';
  import { useDemandWorkbenchStore } from '../../stores/useDemandWorkbenchStore';

  defineOptions({
    name: 'DemandDetail',
  });

  const props = defineProps<{
    demandCode: string;
  }>();

  const workbenchStore = useDemandWorkbenchStore();
  const resolvedDemandCode = computed(() => props.demandCode || workbenchStore.state.demandCode);
  const hasDemandCode = computed(() => {
    return Boolean(resolvedDemandCode.value);
  });

  onMounted(() => {
    workbenchStore.setCurrentDemandTitle(`需求详情：${resolvedDemandCode.value}`);
  });

  onUnmounted(() => {
    workbenchStore.setCurrentDemandTitle('');
  });
</script>

<style scoped lang="scss">
  .dm5-detail-page {
    min-height: 100%;
  }
</style>
