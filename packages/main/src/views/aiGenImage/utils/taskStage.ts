import type { AiGenerateImageContracts } from '@/api';
import { AI_IMAGE_STATUS } from '../constants';
import type { AiImageStage, DrawerTaskOpenPayload } from '../types';

export type DetailResultPanelKey =
  | 'original'
  | 'originalConfirmed'
  | 'expand'
  | 'confirmed'
  | 'finished';

export const getDefaultDetailResultExpandedMap = (): Record<DetailResultPanelKey, boolean> => ({
  original: false,
  originalConfirmed: true,
  expand: false,
  confirmed: true,
  finished: true,
});

export const isOriginalGeneratingStatus = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return (
    data.status === AI_IMAGE_STATUS.ORIGINAL_RUNNING ||
    Boolean(data.statusName?.includes('原图生成中'))
  );
};

export const isOriginalGeneratedStatus = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return (
    data.status === AI_IMAGE_STATUS.ORIGINAL_DONE ||
    Boolean(data.statusName?.includes('原图已生成'))
  );
};

export const isExpandGeneratingStatus = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const statusName = data.statusName || '';
  return (
    data.status === AI_IMAGE_STATUS.EXPAND_RUNNING ||
    statusName.includes('扩图生成中') ||
    statusName.includes('扩图中')
  );
};

export const isExpandGeneratedStatus = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const statusName = data.statusName || '';
  return (
    data.status === AI_IMAGE_STATUS.EXPAND_DONE ||
    statusName.includes('扩图已生成') ||
    statusName.includes('扩图完成')
  );
};

export const isUploadedToSystemStatus = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const statusName = data.statusName || '';
  return (
    data.status === AI_IMAGE_STATUS.FINISHED_TO_PLATFORM ||
    statusName.includes('成品图已上传广告平台') ||
    statusName.includes('已上传广告平台') ||
    statusName.includes('上传至广告平台素材库')
  );
};

export const resolveTaskStage = (payload?: DrawerTaskOpenPayload): AiImageStage => {
  const status = payload?.status;
  const statusName = payload?.statusName || '';
  if (
    statusName.includes('成品') ||
    (typeof status === 'number' && status >= AI_IMAGE_STATUS.FINISHED_PENDING)
  ) {
    return 'finished';
  }
  if (
    statusName.includes('扩图') ||
    (typeof status === 'number' && status >= AI_IMAGE_STATUS.EXPAND_WAITING)
  ) {
    return 'expand';
  }
  return 'original';
};
