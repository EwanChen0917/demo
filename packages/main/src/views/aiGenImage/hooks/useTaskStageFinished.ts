import type { ComputedRef, Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { aiGenerateImageApi } from '@/api';
import type { AiGenerateImageContracts } from '@/api';
import { AI_IMAGE_STATUS } from '../constants';
import { createPollingController, runPolling } from './usePolling';
import {
  AI_JOB_BATCH_STATUS,
  queryFinishedUploadJobStatus,
  queryUploadToSystemJobStatus,
} from '../utils/aiJob';

interface FinishedUploadFolderTree {
  folderName: string;
  children: Array<{
    folderName: string;
    uploadFolderName: string;
    files: Array<{
      file: File;
      relativePath: string;
      name: string;
      sizeSpec: string;
    }>;
  }>;
}

interface FinishedUploadGroup {
  groupKey?: string;
  uploadKey: string;
}

type FinishedImageParamWithFileName = AiGenerateImageContracts.FinishedImageParam & {
  fileName: string;
  fileSize: number;
};

type UploadFinishedImageBatchReqWithFileName = Omit<
  AiGenerateImageContracts.UploadFinishedImageBatchReq,
  'finishedImageBatchList'
> & {
  finishedImageBatchList: Array<{
    folderName: string;
    imageList: FinishedImageParamWithFileName[];
  }>;
};

type UploadToAdPlatformRespWithUrl = AiGenerateImageContracts.UploadToAdPlatformResp & {
  adPlatformUrl?: string;
  jumpUrl?: string;
  materialLibraryUrl?: string;
  redirectUrl?: string;
  url?: string;
};

interface UseTaskStageFinishedOptions {
  visible: Ref<boolean>;
  taskCode: Ref<string>;
  detail: Ref<AiGenerateImageContracts.TaskDetailResp>;
  finishedUploadingKeys: Ref<string[]>;
  finishedUploadVisible: Ref<boolean>;
  finishedUploadSubmitting: Ref<boolean>;
  finishedUploadFolderTree: Ref<FinishedUploadFolderTree | undefined>;
  uploadToSystemConfirmVisible: Ref<boolean>;
  uploadToSystemSubmitting: Ref<boolean>;
  uploadToSystemSuccess: Ref<boolean>;
  uploadToSystemSuccessDialogVisible: Ref<boolean>;
  adPlatformMaterialUrl: Ref<string>;
  finishedUploadFileCount: ComputedRef<number>;
  hasUploadableFinishedImages: ComputedRef<boolean>;
  queryTaskDetail: (options?: {
    silent?: boolean;
    keepOriginalResults?: boolean;
  }) => Promise<AiGenerateImageContracts.TaskDetailResp | undefined>;
  uploadFileToOss: (file: File) => Promise<string>;
  getFileSizeSpec: (file: File) => Promise<string>;
  uploadFinishedFolderTreeImages: (folderTree: FinishedUploadFolderTree) => Promise<
    Array<{
      folderName: string;
      imageList: FinishedImageParamWithFileName[];
    }>
  >;
  resetFinishedUploadDialog: () => void;
  emitSuccess: () => void;
}

export default function useTaskStageFinished({
  visible,
  taskCode,
  detail,
  finishedUploadingKeys,
  finishedUploadVisible,
  finishedUploadSubmitting,
  finishedUploadFolderTree,
  uploadToSystemConfirmVisible,
  uploadToSystemSubmitting,
  uploadToSystemSuccess,
  uploadToSystemSuccessDialogVisible,
  adPlatformMaterialUrl,
  finishedUploadFileCount,
  hasUploadableFinishedImages,
  queryTaskDetail,
  uploadFileToOss,
  getFileSizeSpec,
  uploadFinishedFolderTreeImages,
  resetFinishedUploadDialog,
  emitSuccess,
}: UseTaskStageFinishedOptions) {
  const finishedUploadPolling = createPollingController();
  const uploadToSystemPolling = createPollingController();

  const stopFinishedUploadPolling = () => {
    finishedUploadPolling.stop();
  };

  const stopUploadToSystemPolling = () => {
    uploadToSystemPolling.stop();
  };

  const showFinishedUploadResultMessage = (
    result?: AiGenerateImageContracts.BatchUploadFinishedImageResp
  ) => {
    if (!result) {
      return;
    }
    const successCount = Number(result.successCount || 0);
    const failedCount = Number(result.failedCount || 0);
    const unmatchedCount = Number(result.unmatchedCount || 0);
    const summary = [
      `成功${successCount}个编码组`,
      `失败${failedCount}个编码组`,
      unmatchedCount ? `未匹配${unmatchedCount}个编码组` : '',
    ]
      .filter(Boolean)
      .join('，');
    if (failedCount || unmatchedCount) {
      ElMessage.warning(summary);
      return;
    }
    ElMessage.success(summary);
  };

  const pollFinishedUploadResult = async () => {
    if (!taskCode.value) return undefined;
    return runPolling<AiGenerateImageContracts.BatchUploadFinishedImageResp | undefined>({
      controller: finishedUploadPolling,
      stop: stopFinishedUploadPolling,
      shouldStop: () => !visible.value,
      pollOnce: async () => {
        const jobResult = await queryFinishedUploadJobStatus(taskCode.value);
        if (!jobResult?.batchStatus || jobResult.batchStatus === AI_JOB_BATCH_STATUS.PENDING) {
          return { done: false };
        }
        return {
          done: true,
          value: jobResult.batchUploadResult,
        };
      },
    });
  };

  const pollUploadToSystemResult = async () => {
    if (!taskCode.value) return undefined;
    return runPolling<AiGenerateImageContracts.UploadToAdPlatformJobResultBean | undefined>({
      controller: uploadToSystemPolling,
      stop: stopUploadToSystemPolling,
      shouldStop: () => !visible.value,
      pollOnce: async () => {
        const jobResult = await queryUploadToSystemJobStatus(taskCode.value);
        if (!jobResult?.batchStatus || jobResult.batchStatus === AI_JOB_BATCH_STATUS.PENDING) {
          return { done: false };
        }
        return {
          done: true,
          value: jobResult,
        };
      },
    });
  };

  const isFinishedGroupUploading = (uploadKey: string) => {
    return finishedUploadingKeys.value.includes(uploadKey);
  };

  const setFinishedGroupUploading = (uploadKey: string, uploading: boolean) => {
    const uploadKeySet = new Set(finishedUploadingKeys.value);
    if (uploading) {
      uploadKeySet.add(uploadKey);
    } else {
      uploadKeySet.delete(uploadKey);
    }
    finishedUploadingKeys.value = Array.from(uploadKeySet);
  };

  const uploadFinishedImage = async (file: File, group: FinishedUploadGroup) => {
    if (!group.groupKey || !taskCode.value) {
      ElMessage.warning('当前成品图分组缺少分组Key，无法上传');
      return;
    }
    setFinishedGroupUploading(group.uploadKey, true);
    try {
      const [ossKey, sizeSpec] = await Promise.all([uploadFileToOss(file), getFileSizeSpec(file)]);
      await aiGenerateImageApi.luteosAiAdImageUploadFinishedImage({
        taskCode: taskCode.value,
        groupKey: group.groupKey,
        imageList: [{ ossKey, sizeSpec, fileSize: file.size }],
      });
      ElMessage.success('渠道对应尺寸图片已上传成功（非所选渠道对应尺寸图片无法上传）');
      await queryTaskDetail();
      if (visible.value) emitSuccess();
    } finally {
      setFinishedGroupUploading(group.uploadKey, false);
    }
  };

  const handleConfirmFinishedFolderUpload = async () => {
    const folderTree = finishedUploadFolderTree.value;
    if (!folderTree || !finishedUploadFileCount.value) {
      ElMessage.warning('请先选择文件夹');
      return;
    }
    if (!taskCode.value || finishedUploadSubmitting.value) return;

    finishedUploadSubmitting.value = true;
    let uploadSuccess = false;

    try {
      const finishedImageBatchList = await uploadFinishedFolderTreeImages(folderTree);

      const req: UploadFinishedImageBatchReqWithFileName = {
        taskCode: taskCode.value,
        finishedImageBatchList,
      };
      await aiGenerateImageApi.luteosAiAdImageBatchUploadFinishedImage(req);
      const uploadResult = await pollFinishedUploadResult();
      uploadSuccess = true;
      showFinishedUploadResultMessage(uploadResult);
      finishedUploadVisible.value = false;
    } catch {
      ElMessage.error('上传失败');
    } finally {
      finishedUploadSubmitting.value = false;
      if (uploadSuccess) resetFinishedUploadDialog();
    }
    if (!uploadSuccess) return;
    await queryTaskDetail().catch(() => undefined);
    if (visible.value) emitSuccess();
  };

  const handleUploadFinishedPlaceholder = () => {
    if (!detail.value.finishedImageGroupList?.length) {
      ElMessage.warning('当前任务暂无成品图编码组');
      return;
    }
    finishedUploadVisible.value = true;
  };

  const extractAdPlatformMaterialUrl = (res?: UploadToAdPlatformRespWithUrl) => {
    return (
      res?.adPlatformUrl ||
      res?.materialLibraryUrl ||
      res?.jumpUrl ||
      res?.redirectUrl ||
      res?.url ||
      ''
    );
  };

  const handleUploadToSystemPlaceholder = () => {
    if (uploadToSystemSubmitting.value) return;
    if (!hasUploadableFinishedImages.value) {
      ElMessage.warning('暂无可上传的成品图');
      return;
    }
    uploadToSystemConfirmVisible.value = true;
  };

  const handleConfirmUploadToSystem = async () => {
    if (!taskCode.value || uploadToSystemSubmitting.value) return;
    uploadToSystemConfirmVisible.value = false;
    uploadToSystemSuccessDialogVisible.value = false;
    uploadToSystemSubmitting.value = true;
    try {
      const res = (await aiGenerateImageApi.luteosAiAdImageUploadToAdPlatform({
        taskCode: taskCode.value,
      })) as UploadToAdPlatformRespWithUrl;
      if (res?.success === false) {
        ElMessage.error(res.message || '上传失败');
        return;
      }
      adPlatformMaterialUrl.value = extractAdPlatformMaterialUrl(res);
      const jobResult = await pollUploadToSystemResult();
      if (!jobResult) return;
      const finalResult = jobResult?.uploadToAdPlatformResult as
        | UploadToAdPlatformRespWithUrl
        | undefined;
      const finalUrl = extractAdPlatformMaterialUrl(finalResult);
      if (finalUrl) {
        adPlatformMaterialUrl.value = finalUrl;
      }
      await queryTaskDetail({ silent: true }).catch(() => undefined);
      if (
        jobResult.batchStatus === AI_JOB_BATCH_STATUS.ALL_FAIL ||
        finalResult?.success === false
      ) {
        uploadToSystemSuccess.value = false;
        ElMessage.error(finalResult?.message || '上传失败');
        return;
      }
      if (jobResult.batchStatus === AI_JOB_BATCH_STATUS.PARTIAL_FAIL) {
        uploadToSystemSuccess.value = false;
        ElMessage.warning(finalResult?.message || '上传广告平台部分成功，请稍后刷新查看');
        return;
      }
      uploadToSystemSuccess.value = true;
      uploadToSystemSuccessDialogVisible.value = true;
      detail.value.status = AI_IMAGE_STATUS.FINISHED_TO_PLATFORM;
      detail.value.statusName = '成品图已上传广告平台';
      if (visible.value) emitSuccess();
    } catch {
      ElMessage.error('上传失败');
    } finally {
      uploadToSystemSubmitting.value = false;
    }
  };

  const handleJumpToAdPlatformMaterial = () => {
    const url =
      import.meta.env.VITE_CMS_BASE_URL || adPlatformMaterialUrl.value || '/cms-app/material';
    window.open(url, '_blank');
  };

  return {
    stopFinishedUploadPolling,
    stopUploadToSystemPolling,
    isFinishedGroupUploading,
    uploadFinishedImage,
    handleConfirmFinishedFolderUpload,
    handleUploadFinishedPlaceholder,
    handleUploadToSystemPlaceholder,
    handleConfirmUploadToSystem,
    handleJumpToAdPlatformMaterial,
  };
}
