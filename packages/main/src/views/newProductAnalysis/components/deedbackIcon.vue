<template>
  <div class="feedback-container">
    <div class="feedback" @click="toFeedback">
      <i class="iconfont icon-bianji"></i>
      <div class="text">反馈</div>
    </div>
    <div class="close" @click="emit('close')">
      <i class="iconfont icon-cuowuzhuangtai"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();
  const toFeedback = () => {
    window.open(
      'https://alidocs.dingtalk.com/notable/share/form/v014j6OJ5jrDYjLDq3p_OVVAFBf_ScCuoAV'
    );
  };
</script>

<style scoped lang="scss">
  .feedback-container {
    position: fixed;
    right: 0;
    bottom: 20vh;
    z-index: 999999;
    &:hover {
      .close {
        opacity: 1;
      }
    }
  }
  .feedback {
    display: flex;
    width: 40px;
    height: 54px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 6px 0 0 6px;
    color: #666666;
    background: #fff;
    /* Shadow1 - 低层级阴影 */
    box-shadow: 0 2px 12px 0 rgba(6, 8, 27, 0.12);
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .close {
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    .icon-cuowuzhuangtai {
      color: #dedede;
    }
  }
</style>
