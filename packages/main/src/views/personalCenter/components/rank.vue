<template>
  <span class="rank-tag" :class="`rank${rank}`">
    {{ rank === 1 || rank === 2 || rank === 3 ? '' : rank }}
  </span>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      rank: any;
    }>(),
    {
      rank: {},
    }
  );
</script>

<style scoped lang="scss">
  .rank-tag {
    color: #1f1f1f;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    position: relative;

    &.rank1 {
      background-image: url(../images/rank1.png);
      top: 3px;
    }

    &.rank2 {
      background-image: url(../images/rank2.png);
      top: 3px;
    }

    &.rank3 {
      background-image: url(../images/rank3.png);
      top: 3px;
    }
  }
</style>