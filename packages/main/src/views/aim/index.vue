<template>
  <div class="aim-container">
    <el-tabs v-model="tabActiveName" class="aim-tabs">
      <el-tab-pane :label="`主视频(${videoAnalysisNum})`" name="mainVideo">
        <MainVideoList @view-split="handleViewSplit" />
      </el-tab-pane>
      <el-tab-pane :label="`分镜视频(${splitVideoNum})`" name="splitVideo">
        <SplitVideoList
          ref="splitVideoListRef"
          :filter-video-id="filterVideoId"
          @total-change="handleSplitTotalChange"
          @reset-overview="fetchVideoOverview"
        />
      </el-tab-pane>
    </el-tabs>
    <el-tooltip
      popper-class="nav-tooltip"
      effect="light"
      content="视频候选列表"
      placement="bottom"
      :offset="10"
    >
      <div class="video-cart" @click="handleOpenCandidateDrawer">
        <i class="Root-tyicon icon-Root-tydingdancelve"></i>
        <span class="video-count" v-if="candidateVideoCount">{{ candidateVideoCount }}</span>
      </div>
    </el-tooltip>
  </div>
  <!-- 候选视频抽屉 -->
  <CandidateVideoDrawer />
</template>
<script setup lang="ts" name="aim">
  import { ref, onMounted } from 'vue';
  import type { TabsPaneContext } from 'element-plus';
  import MainVideoList from './components/MainVideoList.vue';
  import SplitVideoList from './components/SplitVideoList.vue';
  import { videoAnalysisApi } from '@/api/index';
  import { useStore } from '@/store/modules/useStore';
  import { useCandidateVideoStore } from '@/store/modules/candidateVideo';
  import CandidateVideoDrawer from '@/views/aim/components/CandidateVideoDrawer.vue';

  // 顶部tabs
  const tabActiveName = ref('mainVideo');
  const handleTabsClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event);
  };

  // 分镜视频列表组件引用
  const splitVideoListRef = ref();
  // 筛选的主视频ID
  const filterVideoId = ref<string | number | undefined>(undefined);

  // 处理查看分镜事件（从 MainVideoList 触发）
  function handleViewSplit(videoId: string | number) {
    filterVideoId.value = String(videoId);
    tabActiveName.value = 'splitVideo';
  }

  // 处理分镜列表total变化（用于更新tab统计数字）
  function handleSplitTotalChange(total: number) {
    splitVideoNum.value = total;
  }

  // 视频数量统计
  const videoAnalysisNum = ref(0);
  const splitVideoNum = ref(0);

  // 获取视频数量概览
  async function fetchVideoOverview() {
    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisGetVideoAnalysisOverview({});
      videoAnalysisNum.value = (res as any)?.videoAnalysisNum ?? 0;
      splitVideoNum.value = (res as any)?.splitVideoNum ?? 0;
    } catch (error) {
      console.error('获取视频数量概览失败:', error);
    }
  }

  const store = useStore();
  const candidateStore = useCandidateVideoStore();
  // 候选视频数量
  const candidateVideoCount = computed(() => candidateStore.candidateCount);

  // 打开候选视频抽屉
  const handleOpenCandidateDrawer = () => {
    candidateStore.openDrawer();
  };

  onMounted(() => {
    fetchVideoOverview();
  });
</script>
<style lang="scss" scoped>
  .aim-container {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    position: relative;
  }

  .aim-tabs {
    background-color: transparent;
    :deep(.el-tabs__header) {
      background-color: #fff;
    }
  }

  .video-cart {
    position: absolute;
    top: 13px;
    right: 40px;
    cursor: pointer;
    .video-count {
      position: absolute;
      left: 15px;
      top: -13px;
      height: 20px;
      min-width: 20px;
      padding: 0px 4px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      border: 1px solid #fff;
      background: var(--Red-red-5, #ff2626);
      cursor: pointer;
    }
  }
</style>
