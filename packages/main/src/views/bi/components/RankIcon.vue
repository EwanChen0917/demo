<template>
  <img class="ranking-icon" :src="getImg()" alt="icon" />
</template>

<script setup lang="ts">
  import rank1 from '@/views/bi/decisionAnalysis/image/rank1.png';
  import rank2 from '@/views/bi/decisionAnalysis/image/rank2.png';
  import rank3 from '@/views/bi/decisionAnalysis/image/rank3.png';

  const props = defineProps<{
    index: number;
  }>();
  const rankImages = [rank1, rank2, rank3];
  const getImg = () => {
    return rankImages[props.index];
  };
</script>

<style scoped lang="scss">
  .ranking-icon {
    width: 14px;
    height: 14px;
  }
</style>
