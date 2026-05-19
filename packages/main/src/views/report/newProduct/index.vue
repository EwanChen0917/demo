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
          height="100%"
          frameborder="0"
          scrolling="auto"
          :src="iframeSrc"
          @load="handleLoad"
          :style="{ pointerEvents: resizeFlag ? 'none' : 'auto' }"
        ></iframe>
      </section>
      <template v-if="false">
        <multipane-resizer>
          <SiderbarButton v-model="visible" />
        </multipane-resizer>
        <section v-show="visible" class="report-drawer-wrapper">
          <ReportDrawer branch="newProduct" />
        </section>
      </template>
    </Multipane>
  </div>
</template>

<script setup lang="ts" name="newProduct">
import { marketingApi, platformApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import MultipaneResizer from '@/components/Multipane/PaneResizer.vue';
  import SiderbarButton from '../components/SiderbarButton.vue';
  import ReportDrawer from '../components/ReportDrawer.vue';

  const resizeFlag = ref(false);
  const store = useStore();
  const visible = ref(false);
  // const options = ref<any[]>([]);

  // const jobNumber = ref('');

  // const getOptions = async () => {
  //   const res = await platformApi.platformDict({
  //     dictCodes: ['marketing_station_belong'],
  //   });
  //   options.value = res?.dictMap?.marketing_station_belong || [];
  // };
  // function setJobNumber(value: string) {
  //   const option = options.value.find((item) => item.remark.includes(value));
  //   jobNumber.value = option?.value;
  //   if (!jobNumber.value) return;
  //   getIframeSrc(option.desc);
  // }
  // getOptions().then(() => {
  //   setJobNumber(isPermission.value ? options.value[0]?.value : store.userInfo.jobNumber!);
  // });
  const iframeSrc = ref('');
  const loading = ref(true);
  const getIframeSrc = async () => {
    const res = await marketingApi.luteosMarketingBiReportSpuNewProductUrl();
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
  const isPermission = computed<boolean>(() => {
    // return store.authList.includes('Member');
    return true;
  });

  const handleLoad = () => {
    loading.value = false;
  };
</script>

<style lang="scss" scoped>
  .report-container {
    box-sizing: border-box;
    // padding-top: 30px;
    height: calc(100vh - 170px);
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
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
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
