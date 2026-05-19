<template>
  <div class="split-video-list">
    <KeenList
      :selected-list="selectedList"
      @refresh="refreshList"
      @reset-search="handleResetSearch"
      @reset-search-by-key="handleResetSearchByKey"
      @clear-all="clearAll"
    >
      <template #search>
        <el-input v-model="search.itemId" placeholder="视频ID" style="width: 150px" clearable>
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-input
          v-model="contentFeatureInput"
          placeholder="角色、场景、风格等关键词"
          style="width: 233px"
          clearable
        >
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <BatchSearchPopover
              ref="batchSearchRef"
              @search="handleBatchSearch2"
              @clear="handleBatchClear2"
            />
          </template>
        </el-input>

        <el-select
          v-model="search.authorization"
          placeholder="授权类型"
          style="width: 96px"
          clearable
        >
          <el-option
            v-for="item in authorizationOptions"
            :key="item.value"
            :label="item.desc"
            :value="Number(item.value)"
          />
        </el-select>

        <el-select
          v-if="search.authorization === 2 || search.authorization === 3"
          v-model="search.authorizationArea"
          placeholder="授权范围"
          style="width: 96px"
          clearable
        >
          <el-option
            v-for="item in authorizationAreaOptions"
            :key="item.value"
            :label="item.desc"
            :value="Number(item.value)"
          />
        </el-select>

        <el-select v-model="search.authPeriod" placeholder="授权期限" style="width: 96px" clearable>
          <el-option label="三个月以内" :value="1" />
          <el-option label="三个月以上" :value="2" />
          <el-option label="半年以上" :value="3" />
        </el-select>

        <el-select v-model="search.proportion" placeholder="视频比例" style="width: 96px" clearable>
          <el-option v-for="item in proportionOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="dataList"
        :cell-style="{ verticalAlign: 'top' }"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column label="视频信息">
          <template #default="{ row, $index }">
            <MainVideoItem
              :video-info="row"
              item-type="split"
              :highlight-keywords="highlightKeywords"
              @video-click="handleVideoClick($index, row)"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column label="内容特征" width="290">
        <template #default="{ row }">
          <ContentFeatureTags
            :features="row.contentFeature || []"
            :highlight-keywords="search.contentFeature"
            :max-rows="3"
          />
        </template>
      </el-table-column> -->
        <el-table-column label="视频ID" width="200">
          <template #default="{ row }">
            <!-- <span v-html="getHighlightedVideoId(row.videoId)"></span> -->
            <span v-html="getHighlightedVideoId(row.videoId)"></span>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="64">
          <template #default="{ row }">{{ row.videoTime }}s</template>
        </el-table-column>
        <el-table-column label="比例" width="100">
          <template #default="{ row }">{{ row.proportion }}</template>
        </el-table-column>
        <el-table-column label="授权" width="250">
          <template #default="{ row }">
            <div>类型：{{ resolveAuthorizationText(row) }}</div>
            <div>范围：{{ row.authorization ? resolveAuthorizationAreaText(row) : '-' }}</div>
            <div>日期：{{ row.authorization ? formatAuthorizationDate(row) : '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="84px">
          <template #default="{ row, $index }">
            <el-row :gutter="10" class="option-row">
              <CancelCandidatePopconfirm
                v-if="isVideoInCandidate(row.id)"
                placement="top-start"
                @confirm="handleRemoveFromCandidate(row)"
              />
              <el-button
                v-else
                link
                type="primary"
                :disabled="addingCandidateIds.has(row.id)"
                @click="handleAddToCandidate(row)"
              >
                加入候选
              </el-button>
            </el-row>
            <el-row :gutter="10" class="option-row">
              <el-button link type="primary" @click="handleShowDetail($index, row)">
                报告详情
              </el-button>
            </el-row>
            <el-row :gutter="10" class="option-row">
              <el-button
                :ref="(el) => setExportBtnRef(el, $index)"
                link
                type="primary"
                @click="handleSingleExport($index, row)"
              >
                导出
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- 批量操作栏 -->
      <BatchActionBar
        type="split"
        :selected-list="multipleSelection"
        :total-list="dataList"
        :current-page-selection="currentPageSelection"
        :add-candidate-loading="addCandidateLoading"
        @select-all="handleBatchSelectAll"
        @cancel="handleBatchCancel"
        @add-to-candidate="handleBatchAddToCandidate"
        @remove-from-candidate="handleBatchRemoveFromCandidate"
        @export="handleBatchExport"
      />
    </KeenList>
  </div>
  <!-- 视频播放器弹窗 -->
  <VideoPlayerDialog
    v-model:visible="videoPlayerVisible"
    :video-list="videoListForPlayer"
    :initial-index="currentVideoIndex"
    :add-to-cart-loading="playerAddToCartLoading"
    @close="handlePlayerClose"
    @add-to-cart="handleAddToCart"
    @remove-from-cart="handleRemoveFromCart"
    @download="handleDownload"
    @change="handleVideoChange"
  />

  <!-- 视频详情抽屉 -->
  <Detail
    v-model="detailDrawerVisible"
    :is-main-video="false"
    :video-id="currentVideoId"
    :current-index="currentDetailIndex"
    :total-count="dataList.length"
    @prev="handleDetailPrev"
    @next="handleDetailNext"
    @close="handleDetailClose"
  />

  <!-- 单个导出语言选择弹窗 -->
  <LanguageSelectPopover
    ref="languageSelectPopoverRef"
    :trigger-ref="currentExportTriggerRef"
    :selected-list="currentExportList"
    placement="left"
    @success="handleExportSuccess"
    @close="handleExportClose"
  />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';
  import { InfoFilled } from '@element-plus/icons-vue';
  import useList from '@/hooks/list/useList';
  import { useCandidateVideoStore } from '@/store/modules/candidateVideo';
  import { videoAnalysisApi, VideoAnalysisApi } from '@/api/index';
  import MainVideoItem from '@/views/aim/components/MainVideoItem.vue';
  import VideoPlayerDialog, { type VideoInfo } from '@/views/aim/components/VideoPlayerDialog.vue';
  import Detail from '@/views/aim/components/Detail.vue';
  import BatchActionBar from '@/views/aim/components/BatchActionBar.vue';
  import LanguageSelectPopover from '@/views/aim/components/LanguageSelectPopover.vue';
  import CancelCandidatePopconfirm from '@/views/aim/components/CancelCandidatePopconfirm.vue';
  import ContentFeatureTags from '@/views/aim/components/ContentFeatureTags.vue';
  import { useVideoAnalysisParams } from '@/views/aim/hooks/useVideoAnalysisParams';
  import { useRenderLoading } from '@/views/aim/hooks/useRenderLoading';
  import { highlightText, type HighlightKeywords } from '@/utils/highlight';
  import {
    formatAuthorizationDate,
    useAuthorizationInfo,
  } from '@/views/aim/hooks/useAuthorizationInfo';

  // 授权信息公共方法
  const {
    authorizationOptions,
    freeAuthorizationOptions,
    payAuthorizationOptions,
    resolveAuthorizationText,
    resolveAuthorizationAreaText,
  } = useAuthorizationInfo();

  // 接收父组件传递的筛选视频ID
  const props = defineProps<{
    filterVideoId?: string;
  }>();

  // 定义 emit 事件
  const emit = defineEmits<{
    (e: 'total-change', total: number): void;
    (e: 'reset-overview'): void;
  }>();

  const PAGE_SIZE = 10;
  const batchSearchRef = ref();
  const candidateStore = useCandidateVideoStore();
  const tableRef = ref();

  // 渲染 Loading 管理（解决大数据量渲染时页面卡顿问题）
  const { showRenderLoading, hideRenderLoading } = useRenderLoading({ targetRef: tableRef });

  // 使用视频分析参数 hook 获取下拉选项
  const { proportionOptions, videoBusinessOptions } = useVideoAnalysisParams();

  // 初始化时获取候选列表，以便判断哪些视频已加入候选
  onMounted(() => {
    candidateStore.fetchCandidateList();
  });

  /**
   * 已加入候选的 videoSplitId 集合（响应式）
   * 通过 computed 直接依赖 store.candidateList，确保当候选列表变化时视图自动更新
   */
  const candidateSplitIds = computed(() => {
    return new Set(
      candidateStore.candidateList
        .map((item) => item.videoSplitId)
        .filter((id): id is number => id !== undefined && id !== null)
    );
  });

  /**
   * 检查视频是否已加入候选（通过 videoSplitId 判断）
   */
  function isVideoInCandidate(videoSplitId: number): boolean {
    return candidateSplitIds.value.has(videoSplitId);
  }

  /** 正在加入候选的行 ID 集合（用于列表行按钮 disabled 状态） */
  const addingCandidateIds = ref<Set<number>>(new Set());

  const {
    search,
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
  } = useList<
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoSplitPage.RequestBody,
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoSplitPage.ResponseBody
  >({
    searchDefaults: {
      // videoId: '',
      contentFeature: [] as string[],
      authPeriod: undefined,
      authorization: undefined,
      authorizationArea: undefined,
      proportion: '',
      itemId: '',
    },
    pageSize: PAGE_SIZE,
    service: videoAnalysisApi.luteosAiVideoAnalysisVideoSplitPage,
  });

  // 授权范围选项（根据授权方式动态切换）
  const authorizationAreaOptions = computed(() => {
    if (search.authorization === 2) return freeAuthorizationOptions.value;
    if (search.authorization === 3) return payAuthorizationOptions.value;
    return [];
  });

  // 监听授权方式变化，清空授权范围
  watch(
    () => search.authorization,
    () => {
      search.authorizationArea = undefined;
    }
  );

  // 输入框值（不显示标签）
  const contentFeatureInput = ref('');
  // popover 批量搜索值（显示标签）
  const batchContentFeature = ref<string[]>([]);
  // 标志位：popover 搜索时跳过 watch 清空 popover 的逻辑
  let isPopoverSearching = false;

  // 监听输入框值变化，实时搜索（清空 popover 值，两者互斥）
  watch(contentFeatureInput, (val) => {
    // popover 搜索时跳过，不清空 popover
    if (isPopoverSearching) {
      isPopoverSearching = false;
      return;
    }
    // 清空 popover 的值
    batchContentFeature.value = [];
    batchSearchRef.value?.clear();
    // 只用输入框的值
    const inputArr = val ? val.split(',').filter((item: string) => item.trim().length > 0) : [];
    search.contentFeature = inputArr;
  });

  // 监听重置：当 search.contentFeature 被重置为空数组时，清空输入框和 popover
  watch(
    () => search.contentFeature,
    (val) => {
      if (Array.isArray(val) && val.length === 0) {
        contentFeatureInput.value = '';
        batchContentFeature.value = [];
        batchSearchRef.value?.clear();
      }
    }
  );

  // popover 清除
  const handleBatchClear2 = () => {
    batchContentFeature.value = [];
    search.contentFeature = [];
  };

  // popover 搜索：清空输入框，用 popover 的值进行搜索
  const handleBatchSearch2 = (val: string) => {
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    if (arr.length === 0) {
      ElMessage.warning('请输入内容特征');
      return;
    }
    // 设置标志位，跳过 watch 中清空 popover 的逻辑
    isPopoverSearching = true;
    // 清空输入框，用 popover 的值搜索
    contentFeatureInput.value = '';
    batchContentFeature.value = arr;
    search.contentFeature = arr;
  };

  // 单个标签清除
  const handleResetSearchByKey = (key: string) => {
    if (key === 'batchContentFeature') {
      batchContentFeature.value = [];
      search.contentFeature = [];
      batchSearchRef.value?.clear();
    } else {
      search[key] = undefined;
    }
  };

  const selectedList = computed(() => {
    return [
      {
        label: '内容特征',
        key: 'batchContentFeature',
        value: batchContentFeature.value.length > 0 ? batchContentFeature.value.join(',') : '',
      },
    ];
  });

  const clearAll = () => {
    selectedList.value?.forEach((item) => {
      if (item?.key === 'batchContentFeature') {
        batchContentFeature.value = [];
      } else {
        search[item?.key] = undefined;
      }
    });
    // 清除内容特征搜索条件
    contentFeatureInput.value = '';
    search.contentFeature = [];
    batchSearchRef.value?.clear();
  };

  // ============ 高亮关键词配置 ============
  /** 计算当前高亮关键词配置 */
  const highlightKeywords = computed<HighlightKeywords>(() => ({
    videoId: search.itemId || '',
    contentFeature: Array.isArray(search.contentFeature) ? search.contentFeature : [],
  }));

  /** 高亮内容特征 */
  const getHighlightedFeature = (feature: string) => {
    if (!search.contentFeature?.length) return feature;
    return highlightText(feature, search.contentFeature);
  };

  /** 高亮视频ID */
  const getHighlightedVideoId = (videoId: string) => {
    if (!search.itemId) return videoId;
    return highlightText(videoId, search.itemId);
  };

  // 自定义重置搜索方法，重置后通知父组件刷新概览
  function handleResetSearch() {
    resetSearch();
    emit('reset-overview');
  }

  // 监听 filterVideoId 变化，自动设置搜索条件并查询
  watch(
    () => props.filterVideoId,
    (newVal) => {
      if (newVal) {
        search.itemId = newVal;
        // runQuery(true);
        refreshList();
      }
    },
    { immediate: true }
  );

  // 监听列表 total 变化，通知父组件更新 tab 统计数字
  watch(
    () => total.value,
    (newTotal) => {
      emit('total-change', newTotal);
    }
  );

  // 视频播放器状态
  const videoPlayerVisible = ref(false);
  const currentVideoIndex = ref(0);

  /** 播放器中当前视频的加入候选 loading 状态 */
  const playerAddToCartLoading = computed(() => {
    const currentVideo = videoListForPlayer.value[currentVideoIndex.value];
    return currentVideo ? addingCandidateIds.value.has(currentVideo.id as number) : false;
  });

  // 列表数据
  const dataList = computed(() => listData.value?.dataList || []);

  // 将表格数据转换为播放器需要的格式
  const videoListForPlayer = computed<VideoInfo[]>(() => {
    return dataList.value.map((item) => ({
      ...item,
      id: item.id ?? 0,
      fileKey: item.fileKey ?? '',
      title: item.title,
      proportion: item.proportion,
      videoTime: item.videoTime,
      isInCart: candidateSplitIds.value.has(item.id ?? 0),
    }));
  });

  // 点击视频项时打开播放器
  function handleVideoClick(index: number, row: any) {
    currentVideoIndex.value = index;
    videoPlayerVisible.value = true;
  }

  // 播放器关闭
  function handlePlayerClose() {
    videoPlayerVisible.value = false;
  }

  // 添加到购物车（播放器内加入候选）
  async function handleAddToCart(video: VideoInfo) {
    const row = dataList.value.find((item) => item.id === video.id);
    if (!row) return;
    await handleAddToCandidate(row);
  }

  // 从购物车移除（播放器内取消候选）
  async function handleRemoveFromCart(video: VideoInfo) {
    const row = dataList.value.find((item) => item.id === video.id);
    if (!row) return;
    await handleRemoveFromCandidate(row);
  }

  // 加入候选
  async function handleAddToCandidate(row: any) {
    const id = row.id;
    addingCandidateIds.value.add(id);
    try {
      const success = await candidateStore.updateCandidate('add', id);
      if (success) {
        ElMessage({
          type: 'success',
          message: '已加入视频候选列表',
        });
      }
    } finally {
      addingCandidateIds.value.delete(id);
    }
  }

  // 取消候选
  async function handleRemoveFromCandidate(row: any) {
    const success = await candidateStore.updateCandidate('remove', row.id);
    if (success) {
      ElMessage({
        type: 'success',
        message: '已从候选列表移除',
        customClass: 'video-player-message',
      });
    }
  }

  // 下载视频
  function handleDownload(video: VideoInfo) {
    console.log('下载视频:', video);
  }

  // 视频切换
  function handleVideoChange(index: number, video: VideoInfo) {
    currentVideoIndex.value = index;
    console.log('切换到视频:', index, video);
  }

  // ============ 详情抽屉相关 ============
  const detailDrawerVisible = ref(false);
  const currentDetailIndex = ref(0);
  const currentVideoId = ref<number | undefined>(undefined);

  // 显示详情抽屉
  function handleShowDetail(index: number, row: any) {
    currentDetailIndex.value = index;
    // 传递视频ID，由Detail组件请求详情接口
    currentVideoId.value = row.id;
    detailDrawerVisible.value = true;
  }

  // 上一个详情
  function handleDetailPrev() {
    if (currentDetailIndex.value > 0) {
      currentDetailIndex.value--;
      currentVideoId.value = dataList.value[currentDetailIndex.value]?.id;
    }
  }

  // 下一个详情
  function handleDetailNext() {
    if (currentDetailIndex.value < dataList.value.length - 1) {
      currentDetailIndex.value++;
      currentVideoId.value = dataList.value[currentDetailIndex.value]?.id;
    }
  }

  // 关闭详情抽屉
  function handleDetailClose() {
    detailDrawerVisible.value = false;
  }

  // ============ 跨分页多选实现 ============
  /** 存储所有选中行数据的 Map（以 id 为 key，实现跨分页多选） */
  const selectedRowsMap = ref<Map<number, any>>(new Map());
  /** 是否正在恢复选中状态（用于区分用户操作和分页切换） */
  const isRestoringSelection = ref(false);

  /** 计算属性：将 Map 转换为数组供 BatchActionBar 和其他功能使用（跨分页所有选中数据） */
  const multipleSelection = computed(() => Array.from(selectedRowsMap.value.values()));

  /** 计算属性：当前页选中的数据（用于 BatchActionBar 全选状态判断） */
  const currentPageSelection = computed(() => {
    return dataList.value.filter(
      (row) => row.id !== undefined && selectedRowsMap.value.has(row.id)
    );
  });

  /**
   * 处理表格选择变化（实现跨分页多选）
   * 关键：只处理当前页的选择变化，不影响其他页已选中的数据
   */
  const handleSelectionChange = (selection: any[]) => {
    // 如果正在恢复选中状态，忽略此次事件，避免错误清除已选数据
    if (isRestoringSelection.value) return;

    // 获取当前页所有行的 id 集合（过滤掉 undefined）
    const currentPageIds = new Set(
      dataList.value.map((row) => row.id).filter((id): id is number => id !== undefined)
    );
    // 获取当前选中行的 id 集合
    const selectedIds = new Set(selection.map((row) => row.id));

    // 遍历当前页数据，增量更新 selectedRowsMap
    currentPageIds.forEach((id) => {
      if (selectedIds.has(id)) {
        // 当前页选中的行，添加到 Map
        const row = dataList.value.find((item) => item.id === id);
        if (row) {
          selectedRowsMap.value.set(id, row);
        }
      } else {
        // 当前页未选中的行，从 Map 移除
        selectedRowsMap.value.delete(id);
      }
    });
  };

  /**
   * 数据加载后恢复当前页的选中状态
   */
  function restoreSelectionState() {
    nextTick(() => {
      if (!tableRef.value || dataList.value.length === 0) return;

      // 设置标志，防止 toggleRowSelection 触发的 selection-change 事件干扰
      isRestoringSelection.value = true;

      dataList.value.forEach((row) => {
        if (row.id !== undefined && selectedRowsMap.value.has(row.id)) {
          tableRef.value.toggleRowSelection(row, true);
        }
      });

      // 使用 nextTick 确保所有 toggleRowSelection 完成后再重置标志
      nextTick(() => {
        isRestoringSelection.value = false;
      });
    });
  }

  // 监听分页变化，提前设置恢复标志，防止 selection-change 事件干扰
  watch([current, pageSize], () => {
    isRestoringSelection.value = true;
    // 分页变化时显示渲染 loading
    showRenderLoading();
  });

  // 监听列表数据变化，恢复选中状态并隐藏渲染 loading
  watch(
    () => listData.value?.dataList,
    (newData) => {
      if (newData && newData.length > 0) {
        restoreSelectionState();
        // 数据渲染完成后隐藏 loading
        hideRenderLoading();
      } else {
        // 如果没有数据，也需要重置标志并隐藏 loading
        isRestoringSelection.value = false;
        hideRenderLoading();
      }
    }
  );

  // ============ 批量操作相关 ============

  /** 加入候选按钮 loading 状态 */
  const addCandidateLoading = ref(false);

  /** 批量全选/取消全选（仅针对当前页） */
  function handleBatchSelectAll(isSelectAll: boolean) {
    if (isSelectAll) {
      // 选中当前页所有行
      dataList.value.forEach((row) => {
        tableRef.value?.toggleRowSelection(row, true);
      });
    } else {
      // 清空所有选中（包括跨分页的）
      selectedRowsMap.value.clear();
      tableRef.value?.clearSelection();
    }
  }

  /** 取消批量选择（清空所有跨分页选中） */
  function handleBatchCancel() {
    selectedRowsMap.value.clear();
    tableRef.value?.clearSelection();
  }

  /** 批量加入候选 */
  async function handleBatchAddToCandidate(list: any[]) {
    const idsToAdd = list.filter((row) => !isVideoInCandidate(row.id)).map((row) => row.id);

    if (idsToAdd.length === 0) {
      ElMessage.warning('所选视频已全部在候选列表中');
      return;
    }

    addCandidateLoading.value = true;
    try {
      const success = await candidateStore.updateCandidate('add', idsToAdd);
      if (success) {
        ElMessage.success(`成功加入 ${idsToAdd.length} 条视频到候选列表`);
        handleBatchCancel();
      }
    } finally {
      addCandidateLoading.value = false;
    }
  }

  /** 批量移出候选 */
  async function handleBatchRemoveFromCandidate(list: any[]) {
    const idsToRemove = list.filter((row) => isVideoInCandidate(row.id)).map((row) => row.id);

    if (idsToRemove.length === 0) {
      ElMessage.warning('所选视频均不在候选列表中');
      return;
    }

    try {
      const success = await candidateStore.updateCandidate('remove', idsToRemove);
      if (success) {
        ElMessage.success(`已从候选列表移出 ${idsToRemove.length} 条视频`);
        handleBatchCancel();
      }
    } finally {
    }
  }

  /** 批量导出 */
  function handleBatchExport(languages: number[]) {
    console.log('批量导出', multipleSelection.value, '语言:', languages);
    // TODO: 调用导出接口
    ElMessage.success(`开始导出 ${multipleSelection.value.length} 条视频`);
  }

  // ============ 单个导出相关 ============
  const languageSelectPopoverRef = ref();
  const currentExportTriggerRef = ref<HTMLElement | null>(null);
  const currentExportList = ref<any[]>([]);
  const exportBtnRefs = ref<Record<number, HTMLElement | null>>({});

  /** 设置导出按钮 ref */
  function setExportBtnRef(el: any, index: number) {
    if (el) {
      exportBtnRefs.value[index] = el.$el || el;
    }
  }

  /** 处理单个导出 */
  function handleSingleExport(index: number, row: any) {
    currentExportTriggerRef.value = exportBtnRefs.value[index] || null;
    currentExportList.value = [row];
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
</script>

<style lang="scss" scoped>
  .option-row {
    // line-height: 20px;
    margin: 0 0 2px !important;
    button {
      padding: 0 0 !important;
      line-height: 20px !important;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }
  }
  .product-item {
    display: flex;
    align-items: top;
    gap: 12px;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 8px;
    }
    .product-name {
      line-height: 18px;
      color: var(---N8, var(---N8, #585a5a));
    }
  }
  .more-filter-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;
    color: var(---N8, var(---N8, #585a5a));
    .col-1 {
      width: 86px;
    }
  }

  :deep(.video-analysis) {
    margin-bottom: 0;
  }
</style>
<style lang="scss">
  .split-video-list {
    position: relative;
    .actions {
      display: none !important;
    }
    .list-table {
      margin-top: 10px;
    }
  }
</style>
