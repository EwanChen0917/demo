<template>
  <div class="level-part">
    <LevelAnalysis @downhole="handleDownhole" @back="handleBack" />
    <LevelDownholeAnalysis ref="levelDownholeRef" />
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import LevelAnalysis from '../components/LevelAnalysis.vue';
  import LevelDownholeAnalysis from '../components/LevelDownholeAnalysis.vue';

  const levelDownholeRef = useTemplateRef('levelDownholeRef');
  const handleDownhole = (data: any) => {
    // 处理下钻逻辑
    levelDownholeRef.value?.expendRow(data);
  };
  const handleBack = () => {
    // 处理返回逻辑
    levelDownholeRef.value?.revert();
  };
</script>

<style scoped lang="scss">
  .level-part {
    background: #fff;
    border-radius: 10px;
  }
</style>
