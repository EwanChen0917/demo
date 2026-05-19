import type { ComputedRef, Ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getCookieToken } from '@/hooks/web/useCookie';
import { downloadFileSteamForResolvedName } from '@/utils/download';
import { aiGenerateImageApi } from '@/api';
import type { AiGenerateImageContracts } from '@/api';
import { AI_IMAGE_STATUS } from '../constants';
import { createPollingController, runPolling } from './usePolling';
import { AI_JOB_BATCH_STATUS, isAiJobBatchFinished, queryAiJobBatchStatus } from '../utils/aiJob';
import {
  formatExpandRequestSizeSpec,
  getExpandResultImages,
  getResultImageKey,
  hasNewExpandResult,
  normalizeResultSizeSpec,
} from '../utils/resultImage';
import { isExpandGeneratedStatus, isExpandGeneratingStatus } from '../utils/taskStage';
import type { AiImageStage, ResultImageItem } from '../types';

type ExpandSelectionMode = '' | 'download' | 'reExpand';
type DownExpandImageReqWithTaskCode = AiGenerateImageContracts.DownExpendImageReq & {
  taskCode: string;
};

interface UseTaskStageExpandOptions {
  stage: Ref<AiImageStage>;
  visible: Ref<boolean>;
  taskCode: Ref<string>;
  detail: Ref<AiGenerateImageContracts.TaskDetailResp>;
  expandLoading: Ref<boolean>;
  downloadLoading: Ref<boolean>;
  expandSelectionMode: Ref<ExpandSelectionMode>;
  selectedExpandImageKeys: Ref<string[]>;
  selectableExpandImages: ComputedRef<ResultImageItem[]>;
  selectedExpandImages: ComputedRef<ResultImageItem[]>;
  hasExpandResult: ComputedRef<boolean>;
  getDisplayedExpandImages: () => ResultImageItem[];
  queryTaskDetail: (options?: {
    silent?: boolean;
    keepOriginalResults?: boolean;
  }) => Promise<AiGenerateImageContracts.TaskDetailResp | undefined>;
  emitSuccess: () => void;
}

export default function useTaskStageExpand({
  stage,
  visible,
  taskCode,
  detail,
  expandLoading,
  downloadLoading,
  expandSelectionMode,
  selectedExpandImageKeys,
  selectableExpandImages,
  selectedExpandImages,
  hasExpandResult,
  getDisplayedExpandImages,
  queryTaskDetail,
  emitSuccess,
}: UseTaskStageExpandOptions) {
  const expandPolling = createPollingController();

  const stopExpandPolling = () => {
    expandPolling.stop();
  };

  const clearExpandSelection = () => {
    expandSelectionMode.value = '';
    selectedExpandImageKeys.value = [];
  };

  const isSelectableExpandImage = (image: ResultImageItem, mode: ExpandSelectionMode) => {
    if (mode === 'reExpand') {
      return Boolean(image.sizeSpec);
    }
    if (mode === 'download') {
      return !image.isPlaceholder && Boolean(image.imageUrl);
    }
    return false;
  };

  const showAiJobBatchStatusMessage = (batchStatus?: string) => {
    if (batchStatus === AI_JOB_BATCH_STATUS.ALL_FAIL) {
      ElMessage.error('扩图生成任务全部失败');
      return;
    }
    if (batchStatus === AI_JOB_BATCH_STATUS.PARTIAL_FAIL) {
      ElMessage.warning('扩图生成任务部分成功');
    }
  };

  const pollExpandResult = async () => {
    if (!taskCode.value) return;
    const initialKeys = new Set(
      getExpandResultImages(detail.value).map((image, index) => getResultImageKey(image, index))
    );
    await runPolling<void>({
      controller: expandPolling,
      stop: stopExpandPolling,
      shouldStop: () => !visible.value,
      pollOnce: async () => {
        const batchStatus = await queryAiJobBatchStatus(taskCode.value, 'expand');
        if (isAiJobBatchFinished(batchStatus)) {
          await queryTaskDetail({ silent: true });
          showAiJobBatchStatusMessage(batchStatus);
          return { done: true };
        }

        const nextDetail = await queryTaskDetail({ silent: true });
        if (!nextDetail) return { done: true };
        if (batchStatus === AI_JOB_BATCH_STATUS.PENDING) {
          return { done: false };
        }

        const hasResult = Boolean(getExpandResultImages(nextDetail).length);
        if (
          !isExpandGeneratingStatus(nextDetail) &&
          (hasNewExpandResult(nextDetail, initialKeys) ||
            hasResult ||
            isExpandGeneratedStatus(nextDetail))
        ) {
          return { done: true };
        }
        return { done: false };
      },
    });
  };

  const runExpandLoadingTask = async (task: () => Promise<void>) => {
    if (expandLoading.value) return;
    expandLoading.value = true;
    try {
      await task();
    } finally {
      expandLoading.value = false;
    }
  };

  const startExpandPollingIfNeeded = () => {
    if (stage.value !== 'expand' || !visible.value || !isExpandGeneratingStatus(detail.value)) {
      return;
    }
    runExpandLoadingTask(async () => {
      await pollExpandResult();
      if (visible.value) emitSuccess();
    }).catch(() => undefined);
  };

  const openExpandSelectionMode = (mode: Exclude<ExpandSelectionMode, ''>) => {
    if (expandLoading.value || downloadLoading.value) return;
    const selectableImages = getDisplayedExpandImages().filter((image) =>
      isSelectableExpandImage(image, mode)
    );
    if (!selectableImages.length) {
      ElMessage.warning('暂无可选择的扩图结果');
      return;
    }
    expandSelectionMode.value = mode;
    selectedExpandImageKeys.value = [];
  };

  const handleCancelExpandSelection = () => {
    clearExpandSelection();
  };

  const handleToggleExpandImage = (_image: ResultImageItem, key: string) => {
    const selectedKeySet = new Set(selectedExpandImageKeys.value);
    if (selectedKeySet.has(key)) {
      selectedKeySet.delete(key);
    } else {
      selectedKeySet.add(key);
    }
    selectedExpandImageKeys.value = Array.from(selectedKeySet);
  };

  const handleToggleAllExpandImages = (checked: boolean | string | number) => {
    selectedExpandImageKeys.value = checked
      ? selectableExpandImages.value.map((image, index) => getResultImageKey(image, index))
      : [];
  };

  const ensureExpandSelection = () => {
    if (selectedExpandImages.value.length) return true;
    ElMessage.warning('请选择图片');
    return false;
  };

  const buildReExpandImageList = () => {
    const groupMap = new Map<string, { channel?: string; sizeSet: Set<string> }>();
    selectedExpandImages.value.forEach((image) => {
      const sizeSpec = formatExpandRequestSizeSpec(image.sizeSpec);
      const channel = image.channel || '';
      if (!sizeSpec) return;
      const group = groupMap.get(channel) || {
        channel: channel || undefined,
        sizeSet: new Set<string>(),
      };
      group.sizeSet.add(sizeSpec);
      groupMap.set(channel, group);
    });
    return Array.from(groupMap.values()).map((group) => ({
      channel: group.channel,
      sizeList: Array.from(group.sizeSet),
    }));
  };

  const handleDownloadExpandImages = async () => {
    if (!ensureExpandSelection() || !taskCode.value) return;
    const imageCodeList = selectedExpandImages.value
      .map((image) => image.imageCode)
      .filter(Boolean) as string[];
    if (imageCodeList.length !== selectedExpandImages.value.length) {
      ElMessage.warning('所选图片缺少图片编码，无法下载');
      return;
    }
    downloadLoading.value = true;
    try {
      const req: DownExpandImageReqWithTaskCode = {
        taskCode: taskCode.value,
        imageCodeList,
      };
      const token = getCookieToken();
      const response = await axios.post(`/api/luteos/ai/ad/image/downExpandImage`, req, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Platform: 'lute_erp',
        },
        responseType: 'blob',
      });
      if (response.data instanceof Blob && response.data.type.includes('application/json')) {
        const text = await response.data.text();
        const errorData = JSON.parse(text) as { message?: string; msg?: string; code?: number };
        ElMessage.error(errorData.message || errorData.msg || '下载失败');
        return;
      }
      downloadFileSteamForResolvedName(response);
      ElMessage.success('已开始下载');
      clearExpandSelection();
    } finally {
      downloadLoading.value = false;
    }
  };

  const handleReExpandImages = async () => {
    if (!ensureExpandSelection() || !taskCode.value) return;
    const invalidImage = selectedExpandImages.value.find(
      (image) => !normalizeResultSizeSpec(image.sizeSpec)
    );
    if (invalidImage) {
      ElMessage.warning('所选图片缺少尺寸规格，无法重新扩图');
      return;
    }
    const expandImageList = buildReExpandImageList();
    if (!expandImageList.length) {
      ElMessage.warning('请选择需要重新扩图的图片');
      return;
    }
    await runExpandLoadingTask(async () => {
      await aiGenerateImageApi.luteosAiAdImageReExpandImage({
        taskCode: taskCode.value,
        expandImageList,
      });
      clearExpandSelection();
      detail.value.status = AI_IMAGE_STATUS.EXPAND_RUNNING;
      detail.value.statusName = '扩图生成中';
      ElMessage.success('已提交重新扩图');
      await pollExpandResult();
      if (visible.value) emitSuccess();
    });
  };

  const handleConfirmExpandSelection = async () => {
    if (expandSelectionMode.value === 'download') {
      await handleDownloadExpandImages();
      return;
    }
    if (expandSelectionMode.value === 'reExpand') {
      await handleReExpandImages();
    }
  };

  const handleExpandImage = async (sizeList: string[]) => {
    if (!taskCode.value) return;
    if (!sizeList.length) {
      ElMessage.warning('扩图尺寸为空');
      return;
    }
    await runExpandLoadingTask(async () => {
      await aiGenerateImageApi.luteosAiAdImageExpandImage({
        taskCode: taskCode.value,
        ossKey: detail.value.originalConfirmedImage?.ossKey,
        sizeList,
      });
      detail.value.status = AI_IMAGE_STATUS.EXPAND_RUNNING;
      detail.value.statusName = '扩图生成中';
      ElMessage.success(hasExpandResult.value ? '已重新提交扩图' : '已开始扩图');
      await pollExpandResult();
      if (visible.value) emitSuccess();
    });
  };

  return {
    stopExpandPolling,
    startExpandPollingIfNeeded,
    clearExpandSelection,
    openExpandSelectionMode,
    handleCancelExpandSelection,
    handleToggleExpandImage,
    handleToggleAllExpandImages,
    handleConfirmExpandSelection,
    handleExpandImage,
  };
}
