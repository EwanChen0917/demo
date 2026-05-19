import type { Ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { aiGenerateImageApi } from '@/api';
import type { AiGenerateImageContracts } from '@/api';
import { AI_IMAGE_STATUS } from '../constants';
import { createPollingController, runPolling } from './usePolling';
import {
  AI_JOB_BATCH_STATUS,
  getGenerateBatchNo,
  isAiJobBatchFinished,
  isPromptJobFailed,
  isPromptJobSuccess,
  queryAiJobBatchStatus,
  queryPromptJobStatus,
} from '../utils/aiJob';
import {
  getOriginalImageKeySet,
  getOriginalResultImages,
  hasNewOriginalResult,
} from '../utils/resultImage';
import { isOriginalGeneratedStatus, isOriginalGeneratingStatus } from '../utils/taskStage';
import type { AiImageStage, ProductMaterialGroup } from '../types';

interface UseTaskStageOriginalOptions {
  stage: Ref<AiImageStage>;
  visible: Ref<boolean>;
  taskCode: Ref<string>;
  detail: Ref<AiGenerateImageContracts.TaskDetailResp>;
  productGroups: Ref<ProductMaterialGroup[]>;
  prompt: Ref<string>;
  refinedPrompt: Ref<string>;
  refineLoading: Ref<boolean>;
  generateLoading: Ref<boolean>;
  regenerateLoading: Ref<boolean>;
  originalConfigOverride: Ref<boolean>;
  currentOriginalBatchNo: Ref<string>;
  currentOriginalInitialKeys: Ref<string[]>;
  lastGenerateImageList: Ref<AiGenerateImageContracts.GenerateImageBean[]>;
  queryTaskDetail: (options?: {
    silent?: boolean;
    keepOriginalResults?: boolean;
  }) => Promise<AiGenerateImageContracts.TaskDetailResp | undefined>;
  getGenerateImageList: () => AiGenerateImageContracts.GenerateImageBean[];
  normalizeGenerateImageList: (
    list?: AiGenerateImageContracts.GenerateImageBean[]
  ) => AiGenerateImageContracts.GenerateImageBean[];
  cacheOriginalPrompt: (value: string) => void;
  emitSuccess: () => void;
}

export default function useTaskStageOriginal({
  stage,
  visible,
  taskCode,
  detail,
  productGroups,
  prompt,
  refinedPrompt,
  refineLoading,
  generateLoading,
  regenerateLoading,
  originalConfigOverride,
  currentOriginalBatchNo,
  currentOriginalInitialKeys,
  lastGenerateImageList,
  queryTaskDetail,
  getGenerateImageList,
  normalizeGenerateImageList,
  cacheOriginalPrompt,
  emitSuccess,
}: UseTaskStageOriginalOptions) {
  const originalPolling = createPollingController();
  const promptPolling = createPollingController();
  const sanitizePromptForApi = (value: string) => value.replace(/"/g, '');

  const ensureProductSelected = () => {
    if (!productGroups.value.length) return true;
    return productGroups.value.every((group) => {
      return Boolean(
        group.selectedId && group.images.some((image) => image.id === group.selectedId)
      );
    });
  };

  const stopOriginalPolling = () => {
    originalPolling.stop();
    currentOriginalBatchNo.value = '';
    currentOriginalInitialKeys.value = [];
  };

  const stopPromptPolling = () => {
    promptPolling.stop();
  };

  const showAiJobBatchStatusMessage = (batchStatus?: string) => {
    if (batchStatus === AI_JOB_BATCH_STATUS.ALL_FAIL) {
      ElMessage.error('原图生成任务全部失败');
      return;
    }
    if (batchStatus === AI_JOB_BATCH_STATUS.PARTIAL_FAIL) {
      ElMessage.warning('原图生成任务部分成功');
    }
  };

  const pollRefinedPrompt = async () => {
    if (!taskCode.value) return;
    await runPolling<void>({
      controller: promptPolling,
      stop: stopPromptPolling,
      shouldStop: () => !visible.value,
      pollOnce: async () => {
        const { status, refinedPrompt: nextPrompt } = await queryPromptJobStatus(taskCode.value);
        if (isPromptJobSuccess(status)) {
          if (nextPrompt) {
            refinedPrompt.value = nextPrompt;
          } else {
            await queryTaskDetail({ silent: true }).catch(() => undefined);
          }
          cacheOriginalPrompt(prompt.value);
          return { done: true };
        }
        if (isPromptJobFailed(status)) {
          ElMessage.error('AI 润色失败，请稍后重试');
          return { done: true };
        }
        return { done: false };
      },
    });
  };

  const pollOriginalResult = async (batchNo?: string) => {
    if (!taskCode.value) return;
    const initialKeys = getOriginalImageKeySet(detail.value);
    currentOriginalBatchNo.value = batchNo || '';
    currentOriginalInitialKeys.value = Array.from(initialKeys);
    await runPolling<void>({
      controller: originalPolling,
      stop: stopOriginalPolling,
      shouldStop: () => !visible.value,
      pollOnce: async () => {
        const batchStatus = await queryAiJobBatchStatus(taskCode.value, 'original');
        if (isAiJobBatchFinished(batchStatus)) {
          await queryTaskDetail({
            silent: true,
            keepOriginalResults: true,
          });
          showAiJobBatchStatusMessage(batchStatus);
          return { done: true };
        }

        const nextDetail = await queryTaskDetail({
          silent: true,
          keepOriginalResults: true,
        });
        if (batchStatus === AI_JOB_BATCH_STATUS.PENDING) {
          return { done: false };
        }
        if (
          nextDetail &&
          !isOriginalGeneratingStatus(nextDetail) &&
          hasNewOriginalResult(nextDetail, initialKeys, batchNo)
        ) {
          return { done: true };
        }
        if (
          nextDetail &&
          !batchNo &&
          isOriginalGeneratedStatus(nextDetail) &&
          (initialKeys.size === 0 || getOriginalResultImages(nextDetail).length)
        ) {
          return { done: true };
        }
        return { done: false };
      },
    });
  };

  const runOriginalLoadingTask = async (task: () => Promise<void>) => {
    if (generateLoading.value || regenerateLoading.value) return;
    regenerateLoading.value = true;
    try {
      await task();
    } finally {
      regenerateLoading.value = false;
    }
  };

  const startOriginalPollingIfNeeded = () => {
    if (stage.value !== 'original' || !visible.value || !isOriginalGeneratingStatus(detail.value)) {
      return;
    }
    runOriginalLoadingTask(async () => {
      await pollOriginalResult();
      if (visible.value) emitSuccess();
    }).catch(() => undefined);
  };

  const handleRefinePrompt = async () => {
    const text = prompt.value.trim();
    if (!text) {
      ElMessage.warning('请输入原始提示词');
      return false;
    }
    if (refineLoading.value || !taskCode.value) return false;
    refineLoading.value = true;
    try {
      await aiGenerateImageApi.luteosAiAdImageRefinePrompt({
        taskCode: taskCode.value,
        prompt: sanitizePromptForApi(text),
      });
      ElMessage.success('已提交 AI 润色');
      await pollRefinedPrompt();
      return true;
    } finally {
      stopPromptPolling();
      refineLoading.value = false;
    }
  };

  const handleGenerateImage = async (options: { regenerate?: boolean } = {}) => {
    const text = prompt.value.trim();
    const isRegenerate = Boolean(options.regenerate);

    if (
      !taskCode.value ||
      generateLoading.value ||
      regenerateLoading.value ||
      isOriginalGeneratingStatus(detail.value)
    ) {
      return;
    }

    if (!refinedPrompt.value.trim() && !text) {
      ElMessage.warning('请输入原始提示词');
      return;
    }

    if (!ensureProductSelected()) {
      ElMessage.warning('请为每个产品选择一张图片');
      return;
    }
    if (!refinedPrompt.value.trim()) {
      try {
        await ElMessageBox.confirm('提示词尚未润色，是否直接开始生图？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
      } catch {
        return;
      }
    }
    const generateImageList = isRegenerate ? [] : getGenerateImageList();
    if (!isRegenerate && generateImageList.length) {
      lastGenerateImageList.value = generateImageList;
    }
    if (isRegenerate) {
      regenerateLoading.value = true;
    } else {
      generateLoading.value = true;
    }
    try {
      const requestGenerateImageList =
        !isRegenerate && generateImageList.length ? generateImageList : undefined;
      const res = await aiGenerateImageApi.luteosAiAdImageGenerateImage({
        taskCode: taskCode.value,
        generateImageList: requestGenerateImageList,
        prompt: sanitizePromptForApi(refinedPrompt.value),
      });
      const resImageList = normalizeGenerateImageList(res.generateImageList);
      if (resImageList.length) {
        lastGenerateImageList.value = resImageList;
      }
      originalConfigOverride.value = false;
      detail.value.status = AI_IMAGE_STATUS.ORIGINAL_RUNNING;
      detail.value.statusName = '原图生成中';
      ElMessage.success('已开始生图');
      await pollOriginalResult(getGenerateBatchNo(res));
      emitSuccess();
    } finally {
      if (isRegenerate) {
        regenerateLoading.value = false;
      } else {
        generateLoading.value = false;
      }
    }
  };

  const handleRegenerate = async () => {
    await handleGenerateImage({ regenerate: true });
  };

  return {
    stopOriginalPolling,
    stopPromptPolling,
    startOriginalPollingIfNeeded,
    handleRefinePrompt,
    handleGenerateImage,
    handleRegenerate,
  };
}
