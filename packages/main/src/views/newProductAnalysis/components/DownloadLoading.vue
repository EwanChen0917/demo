<template>
  <div v-if="showLoading" class="download-loading">
    <div v-if="loading" class="content">
      <i class="Root-tyicon icon-Root-tyjiazai"></i>
      <div class="text">{{ fileType }} 正在导出，请稍后…</div>
    </div>
    <div v-else class="content">
      <i class="Root-tyicon icon-Root-tychenggongzhuangtai"></i>
      <div class="text">{{ fileType }} 文件下载成功</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    fileType: string;
    loading: boolean;
  }>();

  const showLoading = ref(false);
  watch(
    () => props.loading,
    (val) => {
      if (val) {
        showLoading.value = val;
      } else {
        setTimeout(() => {
          showLoading.value = val;
        }, 3000);
      }
    }
  );
</script>

<style scoped lang="scss">
  .download-loading {
    position: fixed;
    right: 24px;
    top: 60px;
    display: flex;
    width: 240px;
    height: 48px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #fff;

    /* Shadow3 - 高层级阴影 */
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

    .content {
      display: flex;
      gap: 8.5px;
      align-items: center;
      .text {
        color: $N9;

        /* 常规/Medium 14 */
        font-family: 'PingFang SC Medium';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }
      .iconfont,
      .Root-tyicon {
        font-size: 17px;
        color: $P6;
      }
      .icon-Root-tyjiazai {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>
