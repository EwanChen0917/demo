<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="popoverVisible"
    :placement="placement"
    trigger="manual"
    :virtual-ref="triggerRef"
    virtual-triggering
    popper-class="language-select-popover"
    :z-index="99999"
  >
    <div class="language-select-content">
      <!-- 标题 -->
      <div class="language-select-title">选择视频脚本语言</div>

      <!-- 语言选项列表 -->
      <div class="language-select-list">
        <div
          v-for="(item, index) in languageOptions"
          :key="item.value"
          class="language-select-item"
          @click="handleItemClick(index, $event)"
        >
          <el-checkbox
            style="height: 20px"
            :model-value="item.checked"
            @click.stop="handleItemClick(index, $event)"
          />
          <span class="language-select-item-label">{{ item.label }}</span>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="language-select-footer">
        <span class="language-select-tip">按Shift可快速多选</span>
        <div class="language-select-actions">
          <el-button size="small" @click="handleCancel">取消</el-button>
          <el-button type="primary" size="small" :loading="loading" @click="handleConfirm">
            确定
          </el-button>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import { ElMessage, ElNotification } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { videoAnalysisApi } from '@/api/index';
  import { useVideoAnalysisParams } from '@/views/aim/hooks/useVideoAnalysisParams';
  import { useCandidateVideoStore } from '@/store/modules/candidateVideo';
  import type { BatchActionVideoItem, LanguageOption } from '../types/video';

  interface Props {
    /** 触发元素引用 */
    triggerRef: HTMLElement | null;
    /** 选中的视频列表 */
    selectedList: BatchActionVideoItem[];
    /** 弹窗位置 */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** 是否来自候选列表（候选列表的单个、批量、播放器中导出时传 true） */
    isCandidate?: boolean;
  }

  interface Emits {
    /** 下载成功 */
    (e: 'success'): void;
    /** 关闭弹窗 */
    (e: 'close'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    isCandidate: false,
  });
  const emit = defineEmits<Emits>();

  const router = useRouter();
  const candidateStore = useCandidateVideoStore();

  // 弹窗显示状态
  const popoverVisible = ref(false);
  const popoverRef = ref();
  const loading = ref(false);

  // 存储通知实例，用于跳转时关闭
  let endNotificationInstance: ReturnType<typeof ElNotification> | null = null;

  // 使用视频分析参数 hook 获取下载语言选项
  const { downLanguageOptions, fetchParams } = useVideoAnalysisParams({ immediate: false });

  // 语言选项列表（带勾选状态）
  const languageOptions = ref<LanguageOption[]>([]);

  // shift 多选相关
  let lastCheckedIndex = -1;

  /** 获取下载语言选项 */
  async function fetchLanguageOptions() {
    try {
      await fetchParams();
      if (downLanguageOptions.value && downLanguageOptions.value.length > 0) {
        languageOptions.value = downLanguageOptions.value.map((item) => ({
          label: item.desc || item.value || '',
          value: item.value || '',
          checked: false,
        }));
      } else {
        // 默认选项
        languageOptions.value = [{ label: '英语', value: 'en', checked: false }];
      }
    } catch (error) {
      console.error('获取语言选项失败', error);
      // 默认选项
      languageOptions.value = [{ label: '英语', value: 'en', checked: false }];
    }
  }

  /** 处理选项点击（支持 shift 多选） */
  function handleItemClick(index: number, event: MouseEvent) {
    const item = languageOptions.value[index];
    const newChecked = !item.checked;

    // 如果按住 shift 键且有上次选中的项
    if (event.shiftKey && lastCheckedIndex !== -1 && lastCheckedIndex !== index) {
      const start = Math.min(lastCheckedIndex, index);
      const end = Math.max(lastCheckedIndex, index);

      for (let i = start; i <= end; i++) {
        languageOptions.value[i].checked = true;
      }
    } else {
      item.checked = newChecked;
    }

    // 更新最后选中的索引
    lastCheckedIndex = newChecked ? index : -1;
  }

  /** 取消 */
  function handleCancel() {
    popoverVisible.value = false;
    emit('close');
  }

  /** 确定 - 发起下载请求 */
  async function handleConfirm() {
    const selectedLanguages = languageOptions.value
      .filter((item) => item.checked)
      .map((item) => item.value);

    if (selectedLanguages.length === 0) {
      ElMessage.warning('请至少选择一种语言');
      return;
    }

    if (!props.selectedList || props.selectedList.length === 0) {
      ElMessage.warning('请选择要导出的视频');
      return;
    }

    loading.value = true;

    try {
      // 构建请求参数
      const requestParams: Record<string, unknown> = {
        languages: selectedLanguages,
        videoIds: props.selectedList.map((item) => item.id),
      };

      // 如果是在候选列表导出，需要传入 videoSplitCandidateIds
      if (props.isCandidate) {
        requestParams.videoIds = props.selectedList
          .map((item) => ('videoSplitId' in item ? item.videoSplitId : undefined))
          .filter((id): id is number => id !== undefined);
        requestParams.videoSplitCandidateIds = props.selectedList.map((item) => item.id);
      }

      const startNotification = ElNotification({
        title: '导出文件准备中',
        offset: 50,
        dangerouslyUseHTMLString: true,
        message:
          '<div>准备工作将在后台进行，您可以进行其他操作或前往 <span class="color-success" style="color: #02b96b; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent(\'navigate-to-download\'))">下载中心</span> 查看进度。</div>',
        type: 'success',
        loading: true,
        duration: 0,
        showBorderTypeColor: false,
        zIndex: 99999,
      });

      const res = await videoAnalysisApi.luteosAiVideoAnalysisDownFile(requestParams);

      startNotification.close();
      endNotificationInstance = ElNotification({
        title: '导出文件已备好',
        dangerouslyUseHTMLString: true,
        message: `<div>导出文件已准备完毕，你可前往 <span class="color-success" style="color: #02b96b; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent('navigate-to-download'))">下载中心</span> 查看。</div>`,
        type: 'success',
        offset: 50,
        duration: 3000,
        showFooter: true,
        footerTip: '刚刚',
        buttonText: '立即前往',
        zIndex: 99999,
        onButtonClick: () => {
          endNotificationInstance?.close();
          router.push({ path: '/downloadmanage', query: { refresh: Date.now() } });
          // 关闭候选列表 drawer
          candidateStore.closeDrawer();
        },
      });

      popoverVisible.value = false;
      emit('success');
      // 如果是候选列表导出，关闭抽屉并刷新候选列表
      if (props.isCandidate) {
        candidateStore.closeDrawer();
        candidateStore.fetchCandidateList();
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error('下载失败', error);
      ElMessage.error(err?.message || '下载失败，请重试');
    } finally {
      loading.value = false;
    }
  }

  /** 显示弹窗 */
  function show() {
    // 重置选中状态
    languageOptions.value.forEach((item) => {
      item.checked = false;
    });
    lastCheckedIndex = -1;
    popoverVisible.value = true;
  }

  /** 隐藏弹窗 */
  function hide() {
    popoverVisible.value = false;
  }

  // 处理通知中的跳转事件
  const handleNavigateToDownload = () => {
    endNotificationInstance?.close();
    router.push({ path: '/downloadmanage', query: { refresh: Date.now() } });
  };

  // 初始化获取语言选项
  onMounted(() => {
    fetchLanguageOptions();
    // 监听下载中心跳转事件
    window.addEventListener('navigate-to-download', handleNavigateToDownload);
  });

  onUnmounted(() => {
    window.removeEventListener('navigate-to-download', handleNavigateToDownload);
  });

  // 暴露方法给父组件
  defineExpose({
    show,
    hide,
  });
</script>

<style lang="scss" scoped>
  .language-select-content {
    // padding: 12px;
  }

  .language-select-title {
    padding: 16px 16px 0;
    font-size: 13px;
    font-weight: 500;
    color: #262626;
    // margin-bottom: 12px;
  }

  .language-select-list {
    padding: 4px 8px;
    max-height: 200px;
    overflow-y: auto;
  }

  .language-select-item {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 4px;

    &:hover {
      background-color: #f5f5f5;
    }

    .language-select-item-label {
      margin-left: 8px;
      font-size: 12px;
      color: #262626;
      user-select: none;
    }
  }

  .language-select-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-top: 1px solid #f4f5f5;

    .language-select-tip {
      font-size: 12px;
      color: #999999;
    }

    .language-select-actions {
      display: flex;
      gap: 8px;
      :deep(.el-button) {
        margin-left: 0;
      }
    }
  }
</style>
<style lang="scss">
  .keen-ui .el-popover.el-popper.language-select-popover {
    width: 268px !important;
    padding: 0 !important;
    border-radius: 10px !important;

    .el-popover__title {
      display: none;
    }
  }
</style>
