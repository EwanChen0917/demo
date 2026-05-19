<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="销售明细表目标值设置" name="first">
      <Sales />
    </el-tab-pane>
    <el-tab-pane label="费用明细目标值设置" name="second">
      <Cost />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="budgetCheckoutSet">
  import type { TabsPaneContext } from 'element-plus';
  import Sales from './sales.vue';
  import Cost from './cost.vue';

  const activeName = ref('first');
  const salesRef = ref<InstanceType<typeof Sales>>();
  const costRef = ref<InstanceType<typeof Cost>>();
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.props.name as string;
    if (activeName.value == 'first') {
      salesRef.value?.open();
    } else {
      costRef.value?.open();
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
