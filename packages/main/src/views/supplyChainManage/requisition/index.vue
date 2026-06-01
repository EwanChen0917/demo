<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="领用订单" name="first">
      <collectionOrder />
    </el-tab-pane>
    <el-tab-pane label="展销会申请" name="second">
      <tradeFairApplication />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="requisition">
  import type { TabsPaneContext } from 'element-plus';
  import collectionOrder from './collectionOrder.vue';
  import tradeFairApplication from './tradeFairApplication.vue';

  const activeName = ref('first');
  const collectionOrderModalRef = ref<InstanceType<typeof collectionOrder>>();
  const tradeFairApplicationModalRef = ref<InstanceType<typeof tradeFairApplication>>();
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.props.name as string;
    if (activeName.value == 'first') {
      collectionOrderModalRef.value?.open();
    } else {
      tradeFairApplicationModalRef.value?.open();
    }
  };
</script>

<style scoped lang="scss">
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  .arrows-icon-down {
    &:hover {
      animation: moveDown 2s linear infinite;

      @keyframes moveDown {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .arrows-icon-up {
    &:hover {
      animation: moveUp 2s linear infinite;

      @keyframes moveUp {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
</style>
