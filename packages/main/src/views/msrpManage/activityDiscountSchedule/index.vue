<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="活动提报" name="SPU">
      <spuList />
    </el-tab-pane>
    <el-tab-pane label="活动审核" name="SKU">
      <skuList />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="activityDiscountSchedule">
  import type { TabsPaneContext } from 'element-plus';
  import skuList from './skuList.vue';
  import spuList from './spuList.vue';

  const activeName = ref('SPU');
  const skuListRef = ref<InstanceType<typeof skuList>>();
  const spuListRef = ref<InstanceType<typeof spuList>>();
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.props.name as string;
    if (activeName.value == 'SPU') {
      skuListRef.value?.open();
    } else {
      spuListRef.value?.open();
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
