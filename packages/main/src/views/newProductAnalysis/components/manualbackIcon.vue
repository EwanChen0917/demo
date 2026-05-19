<template>
  <div class="feedback-container">
    <div class="feedback">
      <el-tooltip content="反馈" placement="top">
        <i class="iconfont icon-fankui" @click="toFeedback"></i>
      </el-tooltip>
      <i class="line"></i>
      <el-tooltip content="使用手册" placement="top">
        <i class="iconfont icon-xuetangguanli" @click="handleOpenHandbook"></i>
      </el-tooltip>
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
  const handleOpenHandbook = () => {
    window.open(
      'https://alidocs.dingtalk.com/i/nodes/oP0MALyR8kbpvvkLuZK60rP9J3bzYmDO?corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&utm_medium=im_card&iframeQuery=utm_medium%3Dim_card%26utm_source%3Dim&utm_scene=team_space&utm_source=im'
    );
  };
</script>

<style scoped lang="scss">
  .feedback-container {
    position: fixed;
    right: 2vh;
    bottom: 7vh;
    z-index: 2000;
    &:hover {
      .close {
        opacity: 1;
      }
    }
  }
  .use-handbook {
    color: var(--el-color-primary);
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    :deep(.el-icon) {
      margin-right: 5px;
      font-size: 14px;
    }
  }
  .feedback {
    display: flex;
    width: 40px;
    // height: 54px;
    padding: 12px 10px;
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
    border-radius: 40px;
    // &:hover {
    //   color: var(--el-color-primary);
    // }
    > i {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 22px;
    }
    .line {
      width: 20px;
      height: 1px;
      background-color: var(---N2, #f4f5f5);
      margin: 8px 0;
    }
    .icon-fankui,
    .icon-xuetangguanli {
      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }
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
