<template>
  <div class="report-container">
    <Multipane
      class="report-main"
      layout="vertical"
      @pane-resize-start="resizeFlag = true"
      @pane-resize-stop="resizeFlag = false"
    >
      <section class="report-iframe-wrapper" v-if="iframeSrc" v-loading="loading">
        <iframe
          class="report-iframe"
          frameborder="0"
          scrolling="auto"
          :src="iframeSrc"
          @load="handleLoad"
          :style="{ pointerEvents: resizeFlag ? 'none' : 'auto' }"
        ></iframe>
      </section>
      <multipane-resizer>
        <SiderbarButton v-model="visible" />
      </multipane-resizer>
      <section v-show="visible" class="report-drawer-wrapper">
        <ReportDrawer :reportType="2" />
      </section>
    </Multipane>
  </div>
</template>

<script setup lang="ts" name="vocReport">
  import { marketingApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import MultipaneResizer from '@/components/Multipane/PaneResizer.vue';
  import SiderbarButton from '../components/SiderbarButton.vue';
  import ReportDrawer from '../components/ReportDrawer.vue';

  const resizeFlag = ref(false);
  const store = useStore();
  const visible = ref(false);
  const form = reactive({});
  const iframeSrc = ref(
    'https://finebi.luteos.com/webroot/decision/v5/design/report/8dd10631de5c45b38d217ce37127dd0b/view'
  );
  const loading = ref(true);
  const getIframeSrc = async () => {
    const res = await marketingApi.luteosMarketingBiReportGetBiUrl({
      type: 1,
    });
    if (res?.url) {
      loading.value = true;
      // 做一个容错误的延时，避免iframe加载失败
      setTimeout(() => {
        loading.value = false;
      }, 5000);
      iframeSrc.value = res.url;
    }
  };
  getIframeSrc();

  const handleLoad = () => {
    loading.value = false;
  };
</script>

<style lang="scss" scoped>
  .report-container {
    box-sizing: border-box;
    .report-main {
      position: relative;
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .report-iframe-wrapper {
      position: relative;
      width: 0;
      flex: 1;
      transition: all 0.3s;
    }
    .report-iframe {
      position: absolute;
      height: calc(100% - 64px);
      width: 100%;
      border: none;
    }
    .report-drawer-btn {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 23px;
      width: 253px;
      padding: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      opacity: 0.15;
      &:hover {
        opacity: 1;
      }
    }
    .report-drawer-wrapper {
      background: linear-gradient(180deg, #f0f3f6 0%, #c3ecbc 60.5%);
      border-radius: 6px;
      height: 100%;
      width: 30%;
      min-width: 10%;
      max-width: 50%;
    }
  }
</style>
