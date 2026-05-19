<template>
  <div class="page-404">
    <div class="animation" ref="animationContainer" aria-hidden="true" />
    <div class="title">很抱歉，没有权限访问</div>
    <div class="subtitle">可以点击按钮申请该系统权限</div>
    <div class="actions">
      <el-button type="default" @click="handleBack">返回</el-button>
      <el-button type="primary" @click="handleApply">去申请权限</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import lottie from 'lottie-web';
  import animationData from './data.json';

  const animationContainer = ref<HTMLDivElement | null>(null);
  const router = useRouter();
  let animationInstance: ReturnType<typeof lottie.loadAnimation> | null = null;

  onMounted(() => {
    if (!animationContainer.value) return;
    animationInstance = lottie.loadAnimation({
      container: animationContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
  });

  onBeforeUnmount(() => {
    animationInstance?.destroy();
    animationInstance = null;
  });

  const PERMISSION_APPLY_URL =
    'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding1a1c6d46f33cfeb735c2f4657eb6378f&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3Fbackcontrol%3Dfalse%26corpid%3Dding1a1c6d46f33cfeb735c2f4657eb6378f%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-1829E639-43D1-4976-9714-64549784924E';

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.replace('/');
    }
  };

  const handleApply = () => {
    window.location.href = PERMISSION_APPLY_URL;
  };
</script>

<style lang="scss" scoped>
  .page-404 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(98vh - var(--bs-app-header-height, 0px));
    background: #fff;
    padding: 48px 24px;
    box-sizing: border-box;
    gap: 12px;
  }

  .animation {
    width: 128px;
    height: 128px;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: #1f1f1f;
    line-height: 24px;
    text-align: center;
  }

  .subtitle {
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    text-align: center;
  }

  .actions {
    display: flex;
    margin-top: 16px;
  }
</style>
