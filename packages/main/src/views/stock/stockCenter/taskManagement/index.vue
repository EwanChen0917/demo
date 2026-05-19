<!-- 任务中心 -->
<template>
  <OrderTabs
    v-model="currentTabs"
    :tab-status-list="tabStatusList"
    @tab-change="handleInventoryQueryChange"
  />
  <div class="content">
    <!-- 采购订单查询 -->
    <purchaseOrder v-if="currentTabs === '0'" />
    <purchaseOrderDetail v-if="currentTabs === '1'" />
  </div>

  <!-- 任务详情弹窗 -->
  <!-- <TaskDetailDialog ref="taskDetailDialogRef" @refresh="refreshList" /> -->
</template>

<script setup lang="ts" name="taskManagement">
  import { ref } from 'vue';
  // import TaskDetailDialog from '@/views/stock/stockCenter/components/TaskDetailDialog.vue';
  // 任务类型配置
  import purchaseOrder from '../pages/purchaseOrder.vue';
  import purchaseOrderDetail from '../pages/purchaseOrderDetail.vue';

  const currentTabs = ref('0');
  const tabStatusList = [
    { stauts: '1', code: '0', statusName: '采购单任务' },
    { stauts: '2', code: '1', statusName: '采购单任务明细' },
  ];

  // ==================== 事件处理 ====================
  const handleInventoryQueryChange = () => {
    // console.log('标签页切换:', currentTabs.value);
  };
</script>

<style scoped>
  .gap-2 {
    gap: 8px;
  }

  .search-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .additional-filters {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .d-flex {
    display: flex;
  }

  .align-items-center {
    align-items: center;
  }
</style>
