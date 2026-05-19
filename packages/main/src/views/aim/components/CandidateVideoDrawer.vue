<template>
  <el-drawer
    v-model="drawerVisible"
    title=""
    direction="rtl"
    size="840px"
    :with-header="false"
    :close-on-click-modal="true"
    append-to-body
    class="candidate-video-drawer"
    @close="handleClose"
  >
    <!-- 抽屉头部 -->
    <div class="drawer-header">
      <div class="header-title">
        <span class="title-text">视频候选列表</span>
        <span class="title-count">({{ candidateCount }})</span>
      </div>
      <i class="Root-tyicon icon-Root-tyguanbi" @click="handleClose"></i>
    </div>

    <!-- 抽屉内容 - 视频列表 -->
    <div class="drawer-content">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="candidateList"
        :cell-style="{ verticalAlign: 'top' }"
        row-key="id"
        class="candidate-table"
        @selection-change="handleSelectionChange"
        height="calc(100vh - 124px)"
      >
        <!-- 空状态插槽 -->
        <template #empty>
          <div class="table-empty-state">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" />
            <div class="empty-text">暂无数据</div>
          </div>
        </template>
        <el-table-column type="selection" width="40" />
        <!-- 视频信息列 -->
        <el-table-column label="视频信息" min-width="300">
          <template #default="{ row, $index }">
            <MainVideoItem
              :video-info="formatVideoInfo(row)"
              item-type="cart"
              @video-click="handleVideoClick($index, row)"
            />
          </template>
        </el-table-column>

        <!-- 视频ID列 -->
        <el-table-column label="ID" width="80">
          <template #default="{ row }">
            <span class="video-id">{{ row.videoId }}</span>
          </template>
        </el-table-column>

        <!-- 比例列 -->
        <el-table-column label="比例" width="100">
          <template #default="{ row }">
            <span class="video-proportion">{{ row.proportion }}</span>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="80">
          <template #default="{ row, $index }">
            <div class="action-btns">
              <el-button
                :ref="(el) => setExportBtnRef(el, $index)"
                link
                type="primary"
                @click="handleSingleExport($index, row)"
              >
                导出
              </el-button>
              <CancelCandidatePopconfirm placement="left-start" @confirm="handleRemove(row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 抽屉底部 -->
    <div class="drawer-footer">
      <el-button size="small" @click="handleClose">关闭</el-button>
    </div>

    <!-- 批量操作栏 -->
    <BatchActionBar
      type="candidate"
      :selected-list="multipleSelection"
      :total-list="candidateList"
      @select-all="handleBatchSelectAll"
      @cancel="handleBatchCancel"
      @remove="handleBatchRemove"
      @export="handleBatchExport"
    />

    <!-- 单个导出语言选择弹窗 -->
    <LanguageSelectPopover
      ref="languageSelectPopoverRef"
      :trigger-ref="currentExportTriggerRef"
      :selected-list="currentExportList"
      placement="left"
      :is-candidate="true"
      @success="handleExportSuccess"
      @close="handleExportClose"
    />
  </el-drawer>

  <!-- 视频播放器弹窗 -->
  <VideoPlayerDialog
    v-model:visible="videoPlayerVisible"
    :video-list="videoListForPlayer"
    :initial-index="currentVideoIndex"
    video-source="candidate"
    @close="handlePlayerClose"
    @remove-from-cart="handleRemoveFromCart"
    @download="handlePlayerDownload"
    @change="handleVideoChange"
  />
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useCandidateVideoStore, type CandidateVideoItem } from '@/store/modules/candidateVideo';
  import MainVideoItem, { type VideoInfo } from './MainVideoItem.vue';
  import BatchActionBar from './BatchActionBar.vue';
  import LanguageSelectPopover from './LanguageSelectPopover.vue';
  import VideoPlayerDialog, { type VideoInfo as PlayerVideoInfo } from './VideoPlayerDialog.vue';
  import CancelCandidatePopconfirm from './CancelCandidatePopconfirm.vue';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import { useRenderLoading } from '@/views/aim/hooks/useRenderLoading';
  import type { BatchActionVideoItem } from '../types/video';

  const candidateStore = useCandidateVideoStore();
  const tableRef = ref();

  // 渲染 Loading 管理（解决大数据量渲染时页面卡顿问题）
  const { showRenderLoading, hideRenderLoading } = useRenderLoading({ targetRef: tableRef });

  // 监听候选列表变化，隐藏渲染 Loading
  watch(
    () => candidateStore.candidateList,
    () => {
      hideRenderLoading();
    }
  );

  // 抽屉可见状态
  const drawerVisible = computed({
    get: () => candidateStore.drawerVisible,
    set: (val: boolean) => {
      if (!val) {
        candidateStore.closeDrawer();
      }
    },
  });

  // 候选视频列表
  const candidateList = computed(() => candidateStore.candidateList);

  // 候选视频数量
  const candidateCount = computed(() => candidateStore.candidateCount);

  // 加载状态
  const loading = computed(() => candidateStore.loading);

  /**
   * 将候选视频项转换为 MainVideoItem 组件需要的格式
   */
  function formatVideoInfo(item: CandidateVideoItem): VideoInfo {
    return {
      id: item.id ?? 0,
      title: item.title ?? '',
      proportion: item.proportion ?? '',
      videoTime: item.videoTime ?? 0,
      fileKey: item.fileKey || '',
      description: item.description || '',
      videoId: item.videoId ?? '',
      originalTranscript: item.originalTranscript || '',
      resolutionRatio: item.resolutionRatio ?? '',
      // 以下为 cart 类型需要的最小字段
      analysisStatus: 0,
      author: '',
      business: [],
      contentFeature: [],
      splitStatus: 0,
      spokenLanguage: '',
      type: '',
      validEndDate: '',
      validStartDate: '',
      videoSplitCandidateId: 0,
    };
  }

  /**
   * 关闭抽屉
   */
  function handleClose() {
    candidateStore.closeDrawer();
  }

  /**
   * 移除候选视频（单个）
   */
  async function handleRemove(row: CandidateVideoItem) {
    if (!row.videoSplitId) return;
    const success = await candidateStore.updateCandidate('remove', row.videoSplitId);
    if (success) {
      ElMessage({
        type: 'success',
        message: '已从候选列表移除',
        customClass: 'video-player-message',
      });
    } else {
      ElMessage.error('移除失败，请重试');
    }
  }

  // ============ 批量操作相关 ============
  const multipleSelection = ref<CandidateVideoItem[]>([]);

  /** 表格选择变化 */
  function handleSelectionChange(val: CandidateVideoItem[]) {
    multipleSelection.value = val;
  }

  /** 批量全选/取消全选 */
  function handleBatchSelectAll(isSelectAll: boolean) {
    if (isSelectAll) {
      candidateList.value.forEach((row) => {
        tableRef.value?.toggleRowSelection(row, true);
      });
    } else {
      tableRef.value?.clearSelection();
    }
  }

  /** 取消批量选择 */
  function handleBatchCancel() {
    tableRef.value?.clearSelection();
    multipleSelection.value = [];
    drawerVisible.value = false;
  }

  /** 批量移除 */
  async function handleBatchRemove(list: CandidateVideoItem[]) {
    const idsToRemove = list.map((row) => row.videoSplitId).filter((id): id is number => !!id);

    if (idsToRemove.length === 0) {
      ElMessage.warning('没有可移除的视频');
      return;
    }

    const success = await candidateStore.updateCandidate('remove', idsToRemove);
    if (success) {
      ElMessage.success(`成功移除 ${idsToRemove.length} 条视频`);
      handleBatchCancel();
    } else {
      ElMessage.error('移除失败，请重试');
    }
  }

  /** 批量导出 */
  function handleBatchExport(languages: number[]) {
    console.log('批量导出', multipleSelection.value, '语言:', languages);
    // TODO: 调用导出接口
    ElMessage.success(`开始导出 ${multipleSelection.value.length} 条视频`);
  }

  // ============ 单个导出相关 ============
  const languageSelectPopoverRef = ref<InstanceType<typeof LanguageSelectPopover> | null>(null);
  const currentExportTriggerRef = ref<HTMLElement | null>(null);
  const currentExportList = ref<BatchActionVideoItem[]>([]);
  const exportBtnRefs = ref<Record<number, HTMLElement | null>>({});

  /** 设置导出按钮 ref */
  function setExportBtnRef(el: unknown, index: number) {
    if (el && typeof el === 'object' && '$el' in el) {
      exportBtnRefs.value[index] = (el as { $el: HTMLElement }).$el;
    } else if (el instanceof HTMLElement) {
      exportBtnRefs.value[index] = el;
    }
  }

  /** 处理单个导出 */
  function handleSingleExport(index: number, row: CandidateVideoItem) {
    currentExportTriggerRef.value = exportBtnRefs.value[index] || null;
    // 将 videoSplitId 映射为 id，以便 LanguageSelectPopover 正确获取 videoIds
    currentExportList.value = [row as unknown as BatchActionVideoItem];
    languageSelectPopoverRef.value?.show();
  }

  /** 导出成功回调 */
  function handleExportSuccess() {
    currentExportList.value = [];
    currentExportTriggerRef.value = null;
  }

  /** 导出弹窗关闭回调 */
  function handleExportClose() {
    currentExportTriggerRef.value = null;
  }

  // ============ 视频播放器相关 ============
  const videoPlayerVisible = ref(false);
  const currentVideoIndex = ref(0);

  /** 将候选列表转换为播放器需要的格式 */
  const videoListForPlayer = computed<PlayerVideoInfo[]>(() => {
    return candidateList.value.map((item) => ({
      id: item.id ?? 0,
      videoSplitId: item.videoSplitId,
      fileKey: item.fileKey || '',
      title: item.title ?? '',
      proportion: item.proportion ?? '',
      videoTime: item.videoTime ?? 0,
      isInCart: true, // 候选列表中的视频都在购物车中
    }));
  });

  /** 点击视频项时打开播放器 */
  function handleVideoClick(index: number, row: CandidateVideoItem) {
    currentVideoIndex.value = index;
    videoPlayerVisible.value = true;
  }

  /** 播放器关闭 */
  function handlePlayerClose() {
    videoPlayerVisible.value = false;
  }

  /** 从购物车移除（播放器内取消候选） */
  async function handleRemoveFromCart(video: PlayerVideoInfo) {
    // 使用 video.videoSplitId 匹配，因为 videoListForPlayer 中 videoSplitId 对应候选列表的 videoSplitId
    const row = candidateList.value.find((item) => item.videoSplitId === video.videoSplitId);
    if (row) {
      await handleRemove(row);
    }
  }

  /** 播放器下载回调 */
  function handlePlayerDownload(video: PlayerVideoInfo) {
    console.log('播放器下载:', video);
  }

  /** 视频切换 */
  function handleVideoChange(index: number, video: PlayerVideoInfo) {
    currentVideoIndex.value = index;
  }
</script>

<style lang="scss" scoped>
  :deep(.el-table) {
    border: 1px solid var(---N2, #f4f5f5);
    .el-table__header {
      th {
        background: var(---N1, #f8f8f8);
        color: var(--el-text-color-primary);
        font-weight: 500;
      }
    }
  }
  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px 20px;
    padding: 16px 0px;
    border-bottom: 1px solid var(---N2, #f4f5f5);

    .header-title {
      display: flex;
      align-items: center;
      gap: 4px;

      .title-text {
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        line-height: 24px;
      }

      .title-count {
        font-size: 14px;
      }
    }
    .Root-tyicon {
      font-size: 20px;
      color: var(---N6, #8a8f8d);
      cursor: pointer;
    }
  }

  .drawer-content {
    flex: 1;
    overflow: auto;
    padding: 0 20px;
    height: calc(100vh - 128px);
    overflow-y: hidden;
    .video-id,
    .video-proportion {
      font-size: 12px;
      color: #585a5a;
      line-height: 20px;
    }

    .action-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .el-button {
        height: auto;
        padding: 0;
        font-size: 12px;
        line-height: 20px;
        margin-left: 0 !important;
      }
    }
  }

  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 24px;
    border-top: 1px solid #f4f5f5;
    background: #fff;

    .el-button {
      min-width: 80px;
    }
  }
  .table-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    color: #999;

    .empty-text {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }

  :deep(.video-title) {
    margin: 2px 0 4px;
  }
</style>

<style lang="scss">
  /* 全局样式覆盖 - 抽屉 */
  .candidate-video-drawer.el-drawer {
    .el-drawer__body {
      display: flex;
      flex-direction: column;
      padding: 0px;
      overflow: hidden;
    }
  }
</style>
