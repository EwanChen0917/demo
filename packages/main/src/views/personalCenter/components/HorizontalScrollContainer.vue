<template>
  <div class="horizontal-scroll-container">
    <div v-if="showLeftArrow" class="btn-mask left-arrow">
      <button class="scroll-arrow" @click="scrollLeft">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M4 10L8 6L4 2"
            stroke="#1F1F1F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div ref="scrollContainer" class="scroll-content" @scroll="handleScroll">
      <slot></slot>
    </div>

    <div v-if="showRightArrow" class="btn-mask right-arrow">
      <button class="scroll-arrow" @click="scrollRight">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M4 10L8 6L4 2"
            stroke="#1F1F1F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUpdated, nextTick } from 'vue';

  // 响应式数据
  const scrollContainer = ref(null);
  const showLeftArrow = ref(false);
  const showRightArrow = ref(false);

  // 检查是否需要显示箭头
  const checkArrows = () => {
    nextTick(() => {
      if (!scrollContainer.value) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
      const scrollRight = scrollWidth - clientWidth - scrollLeft;

      showLeftArrow.value = scrollLeft > 0;
      showRightArrow.value = scrollRight > 1; // 1px容差
    });
  };

  // 向左滚动
  const scrollLeft = () => {
    if (scrollContainer.value) {
      let clientWidth = scrollContainer.value.clientWidth;
      let scrollWidth = clientWidth * 0.8;
      console.log('left', scrollWidth);
      scrollContainer.value.scrollBy({
        left: -scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  // 向右滚动
  const scrollRight = () => {
    if (scrollContainer.value) {
      let clientWidth = scrollContainer.value.clientWidth;
      let scrollWidth = clientWidth * 0.8;
      console.log('right', scrollWidth);
      scrollContainer.value.scrollBy({
        left: scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  // 处理滚动事件
  const handleScroll = () => {
    checkArrows();
  };

  // 生命周期钩子
  onMounted(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
  });

  onUpdated(() => {
    checkArrows();
  });

  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', checkArrows);
  });

  // 暴露方法给父组件
  defineExpose({
    checkArrows,
  });
</script>

<style scoped>
  .horizontal-scroll-container {
    width: 100%;
    position: relative;
  }

  .scroll-content {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* 隐藏滚动条 Firefox */
    -ms-overflow-style: none; /* 隐藏滚动条 IE/Edge */
    width: 100%;
  }

  /* 隐藏滚动条 Webkit */
  .scroll-content::-webkit-scrollbar {
    display: none;
  }

  .btn-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 21px;
    z-index: 99;
    display: flex;
    align-items: center;
  }

  .scroll-arrow {
    background-color: #fff;
    color: #999;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: opacity 0.3s;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
  }

  .scroll-arrow:hover {
    opacity: 1;
  }

  .left-arrow {
    left: 0;
    transform: rotate(180deg);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 82.17%);
  }

  .right-arrow {
    right: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 82.17%);
  }
</style>