<template>
  <div class="file-viewer">
    <!-- 头部标题栏 -->
    <div class="viewer-header">
      <div class="header-left">
        <el-icon class="back-icon" @click="handleBack">
          <ArrowLeft />
        </el-icon>
        <span class="document-title">{{ documentTitle }}</span>
      </div>
      <div class="header-actions">
        <el-tooltip content="复制" placement="top" v-if="ext === '.md'">
          <i class="Root-tyicon icon-Root-tyfuzhi-1" @click="handleCopy"></i>
        </el-tooltip>
        <DownloadPopup
          v-if="fileItem"
          :file-item="fileItem"
          @download-start="handleDownloadStart"
          @download-end="handleDownloadEnd"
        />
        <el-tooltip content="分享" placement="top">
          <i class="Root-tyicon icon-Root-tyfenxiang" @click="handleShare"></i>
          <i class="Root-tyicon icon-Root-tyfenxiang"></i>
        </el-tooltip>
      </div>
    </div>

    <!-- 内容区域 -->
    <div
      v-if="displayContent || ext === '.xlsx'"
      class="viewer-content"
      :class="{ ext: ext === '.xlsx', md: ext === '.md' }"
      ref="viewerContentRef"
    >
      <div v-if="loading" class="loading-container">
        <i class="Root-tyicon icon-Root-tyjiazai icon-loading"></i>
      </div>
      <div
        v-else
        class="file-container"
        :class="{ 'ext-container': ext === '.xlsx', 'md-container': ext === '.md' }"
        ref="markdownRef"
      >
        <Markdown :source="displayContent" v-if="ext === '.md'" />
        <XlsxViewer
          :nodeExecutionId="nodeExecutionId"
          :instanceCode="instanceCode"
          v-else-if="ext === '.xlsx'"
        />
      </div>
    </div>
    <div v-else class="viewer-content">
      <Empty description="当前暂无内容" />
    </div>

    <!-- 下载加载状态 -->
    <DownloadLoading :file-type="fileType" :loading="downloadLoading" />

    <!-- 右侧目录 -->
    <div
      v-if="ext === '.md'"
      class="toc-container"
      :class="{ 'toc-compact': isCompactMode }"
      ref="tocContainerRef"
      @mouseenter="handleTocMouseEnter"
      @mouseleave="handleTocMouseLeave"
    >
      <div class="toc-header" v-if="!isCompactMode">目录</div>
      <div class="toc-list" ref="tocListRef">
        <div
          v-for="(item, index) in tocItems"
          :key="index"
          :class="['toc-item', `toc-level-${item.level}`, { active: activeIndex === index }]"
          @click="scrollToHeading(item, index)"
        >
          <span class="toc-text" :title="item.text">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
  import { ArrowLeft } from '@element-plus/icons-vue';
  import { ElNotification } from 'element-plus';
  import Markdown from 'vue3-markdown-it';
  import { newProductApi } from '@/api';
  import Empty from './Empty.vue';
  import DownloadPopup, { type DownloadFormat, type FileItem } from './DownloadPopup.vue';
  import DownloadLoading from './DownloadLoading.vue';
  import XlsxViewer from './XlsxViewer.vue';
  import { useReport } from '../hooks/useReport';

  const { report } = useReport();

  // 统计文件预览停留时长
  const viewerStartTime = ref<number>(0);
  const reportDuration = () => {
    if (viewerStartTime.value > 0) {
      const duration = Date.now() - viewerStartTime.value;
      report('analysis_result_stay_duration', {
        task_id: props.instanceCode,
        file_name: props.documentTitle,
        duration_s: Math.round(duration / 1000),
      });
      viewerStartTime.value = 0;
    }
  };

  interface Props {
    documentTitle?: string;
    nodeExecutionId?: string;
    ext?: string;
    instanceCode?: string;
  }

  const router = useRouter();

  const props = withDefaults(defineProps<Props>(), {
    documentTitle: '',
    nodeExecutionId: '',
    instanceCode: '',
    ext: '',
  });

  const emit = defineEmits<{
    (e: 'back'): void;
  }>();

  interface TocItem {
    text: string;
    level: number;
    element: HTMLElement;
  }

  const viewerContentRef = ref<HTMLElement>();
  const markdownRef = ref<HTMLElement>();
  const tocListRef = ref<HTMLElement>();
  const tocContainerRef = ref<HTMLElement>();
  const tocItems = ref<TocItem[]>([]);
  const activeIndex = ref<number>(0);
  const isCompactMode = ref(true); // 默认显示紧凑模式

  // 组件内部管理 loading 和内容
  const loading = ref(false);
  const markdownContent = ref('');

  // Markdown内容
  const displayContent = computed(() => markdownContent.value || '');

  // 下载相关状态
  const fileType = ref('');
  const downloadLoading = ref(false);

  // 构造 FileItem 对象供 DownloadPopup 使用
  const fileItem = computed<FileItem | null>(() => {
    if (!props.nodeExecutionId || !props.documentTitle) {
      console.warn('FileViewer - Missing required props');
      return null;
    }

    // 直接使用原始值，不进行类型转换
    const result = {
      nodeExecutionId: props.nodeExecutionId,
      name: props.documentTitle,
      ext: props.ext,
    };

    return result;
  });

  const handleBack = () => {
    // 返回前上报停留时长
    reportDuration();
    emit('back');
  };

  // 复制内容到剪切板
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayContent.value);
      ElNotification({
        title: '成功',
        message: '内容已复制到剪切板',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      ElNotification({
        title: '失败',
        message: '复制失败，请重试',
        type: 'error',
        duration: 2000,
      });
    }
  };

  // 处理下载开始
  const handleDownloadStart = (format: DownloadFormat) => {
    fileType.value = format?.toUpperCase();
    downloadLoading.value = true;
  };

  // 处理下载结束
  const handleDownloadEnd = () => {
    downloadLoading.value = false;
  };

  // 分享链接
  const handleShare = async () => {
    const fileUrl = `${
      window.location.origin
    }/newProductAnalysis/markdownPage?difyNodeExecutionId=${
      props.nodeExecutionId
    }&title=${encodeURIComponent(props.documentTitle)}&ext=${props.ext}&instanceCode=${
      props.instanceCode
    }`;

    try {
      await navigator.clipboard.writeText(fileUrl);
      ElNotification({
        title: '成功',
        message: '文档链接已复制到剪切板，请分享',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      ElNotification({
        title: '失败',
        message: '复制失败，请重试',
        type: 'error',
        duration: 2000,
      });
    } finally {
      report('click_share_result', {
        task_id: props.instanceCode,
        file_name: props.documentTitle,
      });
    }

    // router.push({
    //   path: '/newProductAnalysis/markdownPage',
    //   query: {
    //     difyNodeExecutionId: props.nodeExecutionId,
    //   },
    // });
  };

  // 鼠标进入目录区域
  const handleTocMouseEnter = () => {
    isCompactMode.value = false;
  };

  // 鼠标离开目录区域
  const handleTocMouseLeave = () => {
    isCompactMode.value = true;
  };

  // 提取标题生成目录
  const extractTocItems = () => {
    nextTick(() => {
      if (!markdownRef.value) return;

      const headings = markdownRef.value.querySelectorAll('h1, h2, h3, h4');
      tocItems.value = Array.from(headings).map((heading) => ({
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
        element: heading as HTMLElement,
      }));
    });
  };

  // 滚动到对应标题
  const scrollToHeading = (item: TocItem, index: number) => {
    activeIndex.value = index;
    const container = viewerContentRef.value;
    if (!container) return;

    const targetTop = item.element.offsetTop;
    container.scrollTo({
      top: targetTop - 20,
      behavior: 'smooth',
    });
  };

  // 监听滚动更新当前激活项
  const handleScroll = () => {
    if (!viewerContentRef.value) return;

    const { scrollTop } = viewerContentRef.value;

    // 页面滚动时切换为紧凑模式
    isCompactMode.value = true;

    for (let i = tocItems.value.length - 1; i >= 0; i--) {
      const item = tocItems.value[i];
      if (item.element.offsetTop - 30 <= scrollTop) {
        const previousIndex = activeIndex.value;
        activeIndex.value = i;

        // 如果激活项发生变化，自动滚动目录列表
        if (previousIndex !== i) {
          scrollTocToActiveItem();
        }
        break;
      }
    }
  };

  // 滚动目录列表使激活项可见
  const scrollTocToActiveItem = () => {
    if (!tocListRef.value || isCompactMode.value) return;

    nextTick(() => {
      const tocList = tocListRef.value;
      if (!tocList) return;

      const activeItem = tocList.querySelector('.toc-item.active') as HTMLElement;
      if (!activeItem) return;

      const listRect = tocList.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // 计算激活项相对于列表容器的位置
      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.offsetHeight;
      const listScrollTop = tocList.scrollTop;
      const listHeight = tocList.clientHeight;

      // 如果激活项不在可视区域内，滚动到合适位置
      if (itemTop < listScrollTop) {
        // 激活项在可视区域上方，滚动到顶部
        tocList.scrollTo({
          top: itemTop - 10,
          behavior: 'smooth',
        });
      } else if (itemTop + itemHeight > listScrollTop + listHeight) {
        // 激活项在可视区域下方，滚动到底部
        tocList.scrollTo({
          top: itemTop + itemHeight - listHeight + 10,
          behavior: 'smooth',
        });
      }
    });
  };

  // 获取文档内容
  const fetchFileContent = async () => {
    // 如果是 xlsx 文件，不需要调用接口
    if (props.ext === '.xlsx') {
      return;
    }

    try {
      loading.value = true;
      const res = await newProductApi.luteosAiNpoProjectPhasedResultDetail({
        difyNodeExecutionId: props.nodeExecutionId,
      });
      markdownContent.value = res?.text || '';
    } catch (error) {
      console.error('获取文件详情失败:', error);
      markdownContent.value = '';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    // 记录进入时间
    viewerStartTime.value = Date.now();

    // 获取文档内容
    fetchFileContent();

    // 初始化目录
    extractTocItems();

    // 监听滚动
    setTimeout(() => {
      if (viewerContentRef.value) {
        viewerContentRef.value.addEventListener('scroll', handleScroll);
      }
    }, 1500);
  });

  onBeforeUnmount(() => {
    // 组件卸载前上报停留时长
    reportDuration();

    if (viewerContentRef.value) {
      viewerContentRef.value.removeEventListener('scroll', handleScroll);
    }
  });

  // 监听 displayContent 变化，重新提取目录
  watch(
    () => displayContent.value,
    () => {
      extractTocItems();
    }
  );
</script>

<style scoped lang="scss">
  .file-viewer {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
  }

  .viewer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0px 16px;
    flex-shrink: 0;

    .header-left {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1;
      overflow: hidden;

      .back-icon {
        font-size: 16px;
        color: var(---N9);
        cursor: pointer;
        flex-shrink: 0;
      }

      .document-title {
        font-size: 16px;
        color: var(---N9);
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 16px;
      color: var(---N8);
      .iconfont,
      .Root-tyicon {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }

  .viewer-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px 20px;
    display: flex;
    justify-content: center;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    position: relative;
    scrollbar-width: none;
    &.ext {
      padding: 0;
      border: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }

    .loading-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(---N6);

      .loading-text {
        font-size: 12px;
      }
      .icon-loading {
        font-size: 14px;
        color: var(--el-color-primary);
        animation: rotate-loading 1s linear infinite;
      }
    }
  }

  :deep(.file-container) {
    width: 100%;
    max-width: 720px;
    padding: 0px 20px 20px;
    font-size: 12px;
    line-height: 1.6;
    color: var(---N9);
    &.ext-container {
      padding: 0;
      display: flex;
      align-items: center;
    }

    &.md-container {
      h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 24px 0 16px;
        padding-bottom: 20px;
        text-align: center;
      }

      h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 24px 0 16px;
      }

      h3 {
        font-size: 14px;
        font-weight: 600;
        margin: 20px 0 12px;
      }

      h4 {
        font-size: 12px;
        font-weight: 600;
        margin: 16px 0 8px;
      }

      p {
        margin: 12px 0;
        line-height: 1.8;
        word-wrap: break-word;
      }

      ul,
      ol {
        margin: 12px 0;
        padding-left: 28px;

        li {
          margin: 8px 0;
          line-height: 1.5;
        }
      }

      strong {
        font-weight: 600;
      }

      code {
        padding: 2px 6px;
        background: #f5f7fa;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #e83e8c;
      }

      pre {
        background: #f5f7fa;
        padding: 16px;
        border-radius: 6px;
        overflow-x: auto;
        margin: 16px 0;

        code {
          background: transparent;
          padding: 0;
          color: #303133;
        }
      }

      blockquote {
        margin: 16px 0;
        padding: 12px 20px;
        background: #f5f7fa;
        border-left: 4px solid var(---P6);
        color: var(---N8);

        p {
          margin: 0;
        }
      }

      table {
        display: block;
        overflow: scroll;
        width: auto;
        margin: 16px auto;
        border-collapse: collapse;
        border-spacing: 0;
        border-radius: 6px;
        // border-top: 1px solid var(---N3);
        border-left: 1px solid var(---N3);

        th,
        td {
          border-right: 1px solid var(---N3);
          border-bottom: 1px solid var(---N3);
          padding: 8px;
          text-align: left;
          min-width: 120px;
        }

        th {
          background: var(---N1);
          border-top: 1px solid var(---N3);
          font-weight: 600;
          color: #303133;
        }

        tr:hover {
          background: var(---N1);
        }
      }

      hr {
        border: none;
        border-top: 1px solid var(---N3);
        margin: 24px 0;
      }

      a {
        color: #409eff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .toc-container {
    position: absolute;
    top: 180px;
    right: 0px;
    width: 264px;
    // max-height: calc(100vh - 200px);
    height: 360px;
    background: transparent;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // transition: all 0.3s ease;
    z-index: 10;

    &.toc-compact {
      width: 20px;
      background: transparent;
      border: none;
      padding: 0;
      align-items: flex-end;

      .toc-list {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        align-items: flex-end;
      }

      .toc-item {
        padding: 0;
        width: auto;
        height: 3px;
        background: transparent;
        display: flex;
        justify-content: flex-end;
        border-radius: 6px;

        .toc-text {
          display: none;
        }

        &::before {
          content: '';
          display: block;
          height: 3px;
          background: #ededed;
          transition: all 0.2s;
          border-radius: 6px;
        }

        &.toc-level-1::before {
          width: 20px;
        }

        &.toc-level-2::before {
          width: 16px;
        }

        &.toc-level-3::before {
          width: 12px;
        }

        &.toc-level-4::before {
          width: 8px;
        }

        &.active::before {
          background: var(---N9);
        }

        &:hover::before {
          background: var(---N9);
        }
      }
    }

    &:not(.toc-compact) {
      background: #fff;
      border: 1px solid #e4e7ed;
      border-radius: 8px;
      padding: 16px 0;
      box-shadow: 0 2px 12px 0 rgba(6, 8, 27, 0.12);
    }

    &:not(.toc-compact) .toc-header {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      padding: 0 16px 0px;
      // border-bottom: 1px solid #e4e7ed;
      flex-shrink: 0;
    }

    &:not(.toc-compact) .toc-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 16px 0;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: #dcdfe6;
        border-radius: 2px;
      }
    }

    &:not(.toc-compact) .toc-item {
      padding: 6px 16px;
      font-size: 13px;
      color: var(---N8);
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      border-radius: 6px;

      .toc-text {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.toc-level-1,
      &.toc-level-2 {
        font-weight: 600;
        font-size: 13px;
        color: var(---N8);
      }

      &.toc-level-2 {
        padding-left: 24px;
      }

      &.toc-level-3 {
        padding-left: 36px;
        font-size: 12px;
      }

      &.toc-level-4 {
        padding-left: 48px;
        font-size: 12px;
        color: #909399;
      }

      &.active {
        color: var(---P6);
      }

      &:hover {
        color: var(---N9);
        background: var(---N1);
      }
    }

    .toc-item {
      cursor: pointer;
    }
  }
  @keyframes rotate-loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
