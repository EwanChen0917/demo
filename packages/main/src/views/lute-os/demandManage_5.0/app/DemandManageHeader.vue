<template>
  <header class="dm5-header">
    <div class="dm5-header-main">
      <h2 class="dm5-title">{{ displayTitle }}</h2>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useDemandWorkbenchStore } from '../stores/useDemandWorkbenchStore';
  import type { DemandWorkbenchQueryState } from '../types/workbench';

  const props = defineProps<{
    state: DemandWorkbenchQueryState;
  }>();

  const workbenchStore = useDemandWorkbenchStore();

  const displayTitle = computed(() => {
    const { view, workTab } = props.state;

    // Statistics views
    if (view === 'personalStats') return '个人数据看板';
    if (view === 'deptStats') return '部门数据看板';

    // Workbench views
    if (workTab === 'submit') return '需求提交';
    if (workTab === 'detail') {
      return workbenchStore.currentDemandTitle || '用研需求详情';
    }

    return '用研需求列表';
  });
</script>

<style scoped lang="scss">
  .dm5-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;
  }

  .dm5-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    transition: all 0.3s;
  }

</style>
