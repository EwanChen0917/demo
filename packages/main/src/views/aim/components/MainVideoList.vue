<template>
  <KeenList
    :selected-list="selectedList"
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="handleResetSearchByKey"
    @clear-all="clearAll"
  >
    <template #search>
      <el-input
        v-model="search.queryKeyword"
        placeholder="视频ID/作者"
        style="width: 150px"
        clearable
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        v-model="search.productName"
        placeholder="输入产品英文名称"
        style="width: 201px"
        clearable
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>

      <el-input
        v-model="contentFeatureInput"
        placeholder="角色、场景、风格等关键词"
        style="width: 233px"
        clearable
        @change="handleBlur2"
        @blur="handleBlur2"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef2"
            @search="handleBatchSearch2"
            @clear="handleBatchClear2"
          />
        </template>
      </el-input>

      <!-- <el-input v-model="search.itemId" placeholder="ItemID" style="width: 128px" clearable>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input> -->

      <!-- <el-select v-model="search.authLable" placeholder="授权状态" style="width: 96px" clearable>
        <el-option label="授权期内" :value="1"></el-option>
        <el-option label="不在授权期内" :value="2"></el-option>
        <el-option label="未授权" :value="3"></el-option>
      </el-select> -->

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

      <el-select v-model="search.authPeriod" placeholder="授权期限" style="width: 106px" clearable>
        <el-option label="三个月以内" :value="1" />
        <el-option label="三个月以上" :value="2" />
        <el-option label="半年以上" :value="3" />
      </el-select>

      <el-select
        v-model="selectedSource"
        placeholder="来源平台"
        multiple
        style="width: 170px"
        clearable
      >
        <el-option v-for="item in sourceOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <el-select v-model="search.business" placeholder="业务类型" style="width: 106px" clearable>
        <el-option
          v-for="item in videoBusinessOptions"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="search.proportion" placeholder="视频比例" style="width: 116px" clearable>
        <el-option v-for="item in proportionOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <el-select
        v-model="search.spokenLanguage"
        placeholder="视频语言"
        style="width: 116px"
        clearable
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
      >
        <el-option v-for="item in spokenLanguageOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <el-select
        v-model="search.videoTime"
        placeholder="视频时长"
        style="width: 106px"
        clearable
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
      >
        <el-option label="1分钟内" :value="1" />
        <el-option label="1~2分钟" :value="2" />
        <el-option label="2~3分钟" :value="3" />
        <el-option label="3分钟以上" :value="4" />
      </el-select>
    </template>
    <template #more-filter>
      <div>
        <div class="more-filter-row">
          <div class="col-1">叙事范式:</div>
          <div>
            <el-select
              ref="typeRef"
              v-model="search.type"
              placeholder="叙事范式"
              style="width: 204px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              :teleported="false"
            >
              <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </div>
        <div class="more-filter-row">
          <div class="col-1">视频分辨率:</div>
          <div>
            <el-select
              ref="resolutionRatioRef"
              v-model="search.resolutionRatio"
              placeholder="视频分辨率"
              style="width: 204px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              :teleported="false"
            >
              <el-option
                v-for="item in resolutionRatioOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <el-button type="success" @click="handleOpenUploadDialog">视频上传</el-button>
      <div class="analysis-drawer-entry" @click="handleOpenAnalysisListDrawer">
        <el-button>视频分析列表</el-button>
        <span class="video-count" v-if="analysisCount">{{ analysisCount }}</span>
      </div>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.dataList"
      :cell-style="{ verticalAlign: 'top' }"
    >
      <el-table-column label="视频信息 & 授权" max-width="960px">
        <template #default="{ row, $index }">
          <div style="padding-right: 80px">
            <MainVideoItem
              :video-info="row"
              item-type="main"
              :highlight-keywords="highlightKeywords"
              :authorization-text="getAuthorizationText(row)"
              :authorization-area-text="getAuthorizationAreaText(row)"
              @video-click="handleVideoClick($index, row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品" width="242px">
        <template #default="{ row }">
          <div
            class="product-info"
            v-if="Array.isArray(row.productName) && row.productName.length > 0"
          >
            <div
              class="product-item"
              v-for="(product, index) in row.productName.slice(
                0,
                row.productName.length > 3 ? 2 : row.productName.length
              )"
              :key="product.productName"
            >
              <!-- <img :src="product.img" :alt="product.productName" /> -->
              <div class="product-name">
                产品{{ index + 1 }}：
                <span v-html="getHighlightedProductName(product.productName)"></span>
                {{ product.model }}
              </div>
            </div>
            <el-tooltip placement="top" v-if="row.productName.length > 3">
              <template #default>
                <span class="more-products">更多产品({{ row.productName.length - 2 }})</span>
              </template>
              <template #content>
                <div
                  v-for="(product, index) in row.productName.slice(2)"
                  :key="product.productName"
                >
                  产品{{ index + 1 }}：
                  <span v-html="getHighlightedProductName(product.productName)"></span>
                  {{ product.model }}
                </div>
              </template>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="84px">
        <template #default="{ row, $index }">
          <el-row :gutter="10" class="option-row">
            <el-button link type="primary" @click="handleShowDetail($index, row)">
              报告详情
            </el-button>
          </el-row>
          <el-row :gutter="10" class="option-row">
            <el-button link type="primary" @click="handleViewSplit(row)">查看分镜</el-button>
          </el-row>
          <el-row :gutter="10" class="option-row">
            <el-button link type="primary" @click="downloadWithNotification(row.fileKey)">
              下载
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
  </KeenList>

  <!-- 视频播放器弹窗 -->
  <VideoPlayerDialog
    v-model:visible="videoPlayerVisible"
    :video-list="videoListForPlayer"
    :initial-index="currentVideoIndex"
    :show-cart-btn="false"
    video-source="main"
    @close="handlePlayerClose"
    @download="handleDownload"
    @change="handleVideoChange"
  />

  <!-- 视频详情抽屉 -->
  <Detail
    v-model="detailDrawerVisible"
    :is-main-video="true"
    :video-id="currentVideoId"
    :current-index="currentDetailIndex"
    :total-count="dataList.length"
    @prev="handleDetailPrev"
    @next="handleDetailNext"
    @close="handleDetailClose"
  />

  <!-- 上传视频弹窗 -->
  <VideoUploadDialog v-model:visible="uploadDialogVisible" @success="handleUploadSuccess" />

  <!-- 视频分析列表抽屉 -->
  <VideoAnalysisListDrawer
    v-model="analysisListDrawerVisible"
    @close="handleAnalysisListClose"
    @refresh="refreshList"
  />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { videoAnalysisApi, VideoAnalysisApi } from '@/api/index';
  import MainVideoItem from '@/views/aim/components/MainVideoItem.vue';
  import VideoPlayerDialog, { type VideoInfo } from '@/views/aim/components/VideoPlayerDialog.vue';
  import Detail from '@/views/aim/components/Detail.vue';
  import VideoUploadDialog from '@/views/aim/components/VideoUploadDialog.vue';
  import VideoAnalysisListDrawer from '@/views/aim/components/VideoAnalysisListDrawer.vue';
  import { useVideoAnalysisParams } from '@/views/aim/hooks/useVideoAnalysisParams';
  import { useAuthorizationInfo } from '@/views/aim/hooks/useAuthorizationInfo';
  import { useRenderLoading } from '@/views/aim/hooks/useRenderLoading';
  import { downloadWithNotification } from '@/utils/videoDownload';
  import { highlightText, type HighlightKeywords } from '@/utils/highlight';
  import type { MainVideoInfo } from '../types/video';

  // 定义 emit 事件
  const emit = defineEmits<{
    (e: 'view-split', videoId: string | number | undefined): void;
  }>();

  // const router = useRouter();

  // 使用视频分析参数 hook 获取下拉选项
  const {
    typeOptions,
    proportionOptions,
    spokenLanguageOptions,
    resolutionRatioOptions,
    videoBusinessOptions,
    sourceOptions,
  } = useVideoAnalysisParams();

  // 授权信息公共方法
  const {
    authorizationOptions,
    freeAuthorizationOptions,
    payAuthorizationOptions,
    resolveAuthorizationText,
    resolveAuthorizationAreaText,
    resolveAuthorizationDate: resolveAuthDate,
  } = useAuthorizationInfo();

  const PAGE_SIZE = 10;
  const tableRef = ref();

  // 渲染 Loading 管理（解决大数据量渲染时页面卡顿问题）
  const { showRenderLoading, hideRenderLoading } = useRenderLoading({ targetRef: tableRef });

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
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoPage.RequestBody,
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoPage.ResponseBody
  >({
    searchDefaults: {
      queryKeyword: '',
      productName: '',
      contentFeature: [],
      business: '',
      authLable: undefined, // 授权标签 number 1=在授权期内,2=不在授权期内（授权，但当前日期不在授权期内）,3=未授权
      authPeriod: undefined, // 授权期限 1=三个月以内,2=三个月以上,3=半年以上
      authorization: undefined, // 授权方式 0=未授权,2=免费授权,3=付费授权
      authorizationArea: undefined, // 授权范围
      itemId: '',
      proportion: '',
      sources: undefined,
      spokenLanguage: '',
      videoTime: undefined,
      type: '',
      resolutionRatio: '',
      splitStatus: [3], // 只显示成功的
    },
    pageSize: PAGE_SIZE,
    service: videoAnalysisApi.luteosAiVideoAnalysisVideoPage,
  });

  // 监听分页变化，显示渲染 Loading
  watch([current, pageSize], () => {
    showRenderLoading();
  });

  // 监听列表数据变化，隐藏渲染 Loading
  watch(
    () => listData.value?.dataList,
    () => {
      hideRenderLoading();
    }
  );

  const batchSearchRef = ref();
  const batchSearchRef2 = ref();
  const typeRef = ref();
  const resolutionRatioRef = ref();

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
    batchSearchRef2.value?.clear();
    // 只用输入框的值
    const inputArr = val ? val.split(',').filter((item: string) => item.trim().length > 0) : [];
    search.contentFeature = inputArr;
  });

  // 授权范围选项（根据授权方式动态切换）
  const authorizationAreaOptions = computed(() => {
    if (search.authorization === 2) return freeAuthorizationOptions.value;
    if (search.authorization === 3) return payAuthorizationOptions.value;
    return [];
  });

  const selectedSource = computed<string[]>({
    get: () => {
      return Array.isArray(search.sources) ? search.sources : [];
    },
    set: (value) => {
      search.sources = Array.isArray(value) && value.length > 0 ? value : undefined;
    },
  });

  // 监听授权方式变化，清空授权范围
  watch(
    () => search.authorization,
    () => {
      search.authorizationArea = undefined;
    }
  );

  // 监听重置：当 search.contentFeature 被重置为空数组时，清空输入框和 popover
  watch(
    () => search.contentFeature,
    (val) => {
      if (Array.isArray(val) && val.length === 0) {
        contentFeatureInput.value = '';
        batchContentFeature.value = [];
        batchSearchRef2.value?.clear();
      }
    }
  );

  // 输入框 change/blur 时更新搜索条件（保留兼容）
  const handleBlur2 = () => {};

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
      batchSearchRef2.value?.clear();
    } else {
      search[key] = undefined;
    }
  };

  const selectedList = computed(() => {
    return [
      {
        label: '叙事范式',
        key: 'type',
        value: typeRef.value?.selectedLabel,
      },
      {
        label: '视频分辨率',
        key: 'resolutionRatio',
        value: resolutionRatioRef.value?.selectedLabel,
      },
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
    batchSearchRef2.value?.clear();
  };

  // ============ 授权文本解析（使用公共 composable）============
  /** 获取授权类型文本 */
  function getAuthorizationText(row: MainVideoInfo): string {
    return resolveAuthorizationText(row);
  }

  /** 获取授权范围文本 */
  function getAuthorizationAreaText(row: MainVideoInfo): string {
    return resolveAuthorizationAreaText(row);
  }

  // ============ 高亮关键词配置 ============
  /** 计算当前高亮关键词配置 */
  const highlightKeywords = computed<HighlightKeywords>(() => ({
    queryKeyword: search.queryKeyword || '',
    productName: search.productName || '',
    contentFeature: Array.isArray(search.contentFeature) ? search.contentFeature : [],
  }));

  /** 高亮产品名称 */
  const getHighlightedProductName = (productName: string) => {
    if (!search.productName) return productName;
    return highlightText(productName, search.productName);
  };

  // 视频播放器状态
  const videoPlayerVisible = ref(false);
  const currentVideoIndex = ref(0);

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
    }));
  });

  // 点击视频项时打开播放器
  function handleVideoClick(index: number, row: MainVideoInfo) {
    currentVideoIndex.value = index;
    videoPlayerVisible.value = true;
  }

  // 播放器关闭
  function handlePlayerClose() {
    videoPlayerVisible.value = false;
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

  // ============ 上传视频弹窗相关 ============
  const uploadDialogVisible = ref(false);

  // ============ 视频分析列表抽屉相关 ============
  const analysisListDrawerVisible = ref(false);
  const analysisCount = ref(0);
  let analysisPollingTimer: ReturnType<typeof setInterval> | null = null;

  // 获取视频分析数量
  async function fetchAnalysisCount() {
    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisVideoPage({
        splitStatus: [0, 1, 2, 4],
        pageSize: 1,
        pageNum: 1,
      });
      analysisCount.value = (res as { total?: number })?.total ?? 0;
    } catch (error) {
      console.error('获取视频分析数量失败:', error);
    }
  }

  // 启动轮询
  function startAnalysisPolling() {
    if (analysisPollingTimer) return;
    fetchAnalysisCount(); // 立即执行一次
    analysisPollingTimer = setInterval(fetchAnalysisCount, 60 * 1000); // 每分钟轮询
  }

  // 停止轮询
  function stopAnalysisPolling() {
    if (analysisPollingTimer) {
      clearInterval(analysisPollingTimer);
      analysisPollingTimer = null;
    }
  }

  // 页面可见性变化处理（性能优化：页面不可见时暂停轮询）
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      startAnalysisPolling();
    } else {
      stopAnalysisPolling();
    }
  }

  onMounted(() => {
    startAnalysisPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onBeforeUnmount(() => {
    stopAnalysisPolling();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  // 打开视频分析列表抽屉
  function handleOpenAnalysisListDrawer() {
    analysisListDrawerVisible.value = true;
  }

  // 关闭视频分析列表抽屉
  function handleAnalysisListClose() {
    analysisListDrawerVisible.value = false;
    // 关闭抽屉时刷新数量
    fetchAnalysisCount();
  }

  // 打开上传视频弹窗
  function handleOpenUploadDialog() {
    uploadDialogVisible.value = true;
  }

  // 上传成功回调
  function handleUploadSuccess() {
    refreshList();
  }

  // ============ 详情抽屉相关 ============
  const detailDrawerVisible = ref(false);
  const currentDetailIndex = ref(0);
  const currentVideoId = ref<number | undefined>(undefined);

  // 显示详情抽屉
  function handleShowDetail(index: number, row: MainVideoInfo) {
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

  // 查看分镜
  function handleViewSplit(row: MainVideoInfo) {
    emit('view-split', row.itemId);
  }
</script>

<style lang="scss" scoped>
  .option-row {
    // line-height: 20px;
    margin-bottom: 6px;
    margin: 0 0 6px !important;
    button {
      padding: 0 0 !important;
      line-height: 20px !important;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .product-item {
    // display: flex;
    // align-items: top;
    // gap: 12px;
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
  .analysis-drawer-entry {
    position: relative;
    .video-count {
      position: absolute;
      right: -13px;
      top: -10px;
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
  .more-products {
    cursor: pointer;
    color: var(---P6, #02b96b);
  }
</style>
