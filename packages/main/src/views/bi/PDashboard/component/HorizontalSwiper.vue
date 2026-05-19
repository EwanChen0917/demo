<template>
  <div class="horizontal-swiper">
    <div class="mask-area left">
      <div class="navigation">
        <SvgIcon class="navigation-icon" icon="arrow-right" />
      </div>
    </div>
    <el-scrollbar>
      <div class="left-safe-line"></div>
      <slot></slot>
      <div class="right-safe-line"></div>
    </el-scrollbar>
    <div class="mask-area right">
      <div class="mask"></div>
      <div class="navigation">
        <SvgIcon class="navigation-icon" icon="arrow-left" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .horizontal-swiper {
    position: relative;
    overflow: hidden;
    padding: 16px 0;
    .left-safe-line,
    .right-safe-line {
      height: 100%;
      width: 1px;
    }
    .mask-area {
      position: absolute;
      top: 0;
      width: 124px;
      height: 100%;
      display: flex;
      align-items: center;
      z-index: 10;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 82.17%);
      pointer-events: none;
      .navigation {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(---N6, #999);
        background-color: #fff;
        border-radius: 50%;
        pointer-events: auto;
        filter: drop-shadow(0 4px 24px rgba(6, 8, 27, 0.1));
      }
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
  }
</style>
