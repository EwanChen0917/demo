import { aiGenerateImageApi } from '@/api';
import type { AiGenerateImageContracts } from '@/api';

export const AI_JOB_TYPE = {
  PROMPT: 1,
  ORIGINAL: 2,
  EXPAND: 3,
  FINISHED_UPLOAD: 4,
  UPLOAD_TO_SYSTEM: 5,
} as const;

export const AI_JOB_BATCH_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ALL_FAIL: 'ALL_FAIL',
  PARTIAL_FAIL: 'PARTIAL_FAIL',
} as const;

export type AiJobType = (typeof AI_JOB_TYPE)[keyof typeof AI_JOB_TYPE];
export type AiJobPollingStage = 'original' | 'expand';

export type AiJobResultMap = {
  [AI_JOB_TYPE.PROMPT]: AiGenerateImageContracts.PromptJobResultBean | undefined;
  [AI_JOB_TYPE.ORIGINAL]: AiGenerateImageContracts.ImageGenJobResultBean | undefined;
  [AI_JOB_TYPE.EXPAND]: AiGenerateImageContracts.ExpandJobResultBean | undefined;
  [AI_JOB_TYPE.FINISHED_UPLOAD]: AiGenerateImageContracts.BatchUploadJobResultBean | undefined;
  [AI_JOB_TYPE.UPLOAD_TO_SYSTEM]:
    | AiGenerateImageContracts.UploadToAdPlatformJobResultBean
    | undefined;
};

type AiJobResultKeyMap = {
  [AI_JOB_TYPE.PROMPT]: 'promptJobResult';
  [AI_JOB_TYPE.ORIGINAL]: 'imageGenJobResult';
  [AI_JOB_TYPE.EXPAND]: 'expandJobResult';
  [AI_JOB_TYPE.FINISHED_UPLOAD]: 'batchUploadJobResult';
  [AI_JOB_TYPE.UPLOAD_TO_SYSTEM]: 'uploadToAdPlatformJobResult';
};

const AI_JOB_RESULT_KEY_BY_TYPE: AiJobResultKeyMap = {
  [AI_JOB_TYPE.PROMPT]: 'promptJobResult',
  [AI_JOB_TYPE.ORIGINAL]: 'imageGenJobResult',
  [AI_JOB_TYPE.EXPAND]: 'expandJobResult',
  [AI_JOB_TYPE.FINISHED_UPLOAD]: 'batchUploadJobResult',
  [AI_JOB_TYPE.UPLOAD_TO_SYSTEM]: 'uploadToAdPlatformJobResult',
};

const AI_JOB_TYPE_BY_STAGE: Record<
  AiJobPollingStage,
  typeof AI_JOB_TYPE.ORIGINAL | typeof AI_JOB_TYPE.EXPAND
> = {
  original: AI_JOB_TYPE.ORIGINAL,
  expand: AI_JOB_TYPE.EXPAND,
};

export const getGenerateBatchNo = (data: unknown) => {
  const result = data as { batchNo?: string; data?: { batchNo?: string } };
  return result?.batchNo || result?.data?.batchNo;
};

export const normalizeAiJobBatchStatus = (status?: string | null) => {
  return String(status || '')
    .trim()
    .replace(/-/g, '_')
    .toUpperCase();
};

export const isPromptJobSuccess = (status?: string | null) => {
  return normalizeAiJobBatchStatus(status) === AI_JOB_BATCH_STATUS.SUCCESS;
};

export const isPromptJobFailed = (status?: string | null) => {
  const normalizedStatus = normalizeAiJobBatchStatus(status);
  return [
    'FAIL',
    'FAILED',
    'ERROR',
    AI_JOB_BATCH_STATUS.ALL_FAIL,
    AI_JOB_BATCH_STATUS.PARTIAL_FAIL,
  ].includes(normalizedStatus);
};

export const isAiJobBatchFinished = (batchStatus?: string) => {
  return Boolean(batchStatus && batchStatus !== AI_JOB_BATCH_STATUS.PENDING);
};

export const queryAiJobResult = async <T extends AiJobType>(
  taskCode: string,
  jobType: T
): Promise<AiJobResultMap[T]> => {
  try {
    const job = await aiGenerateImageApi.luteosAiAdImageQueryAiJobStatus({
      taskCode,
      jobType,
    });
    const resultKey = AI_JOB_RESULT_KEY_BY_TYPE[jobType];
    return job[resultKey] as AiJobResultMap[T];
  } catch {
    return undefined as AiJobResultMap[T];
  }
};

export const queryPromptJobStatus = async (taskCode: string) => {
  const promptJobResult = await queryAiJobResult(taskCode, AI_JOB_TYPE.PROMPT);
  return {
    status: promptJobResult?.batchStatus,
    refinedPrompt: promptJobResult?.promptResult?.refinedPrompt,
  };
};

export const queryAiJobBatchStatus = async (taskCode: string, pollingStage: AiJobPollingStage) => {
  const jobResult = await queryAiJobResult(taskCode, AI_JOB_TYPE_BY_STAGE[pollingStage]);
  return jobResult?.batchStatus;
};

export const queryFinishedUploadJobStatus = async (taskCode: string) => {
  return queryAiJobResult(taskCode, AI_JOB_TYPE.FINISHED_UPLOAD);
};

export const queryUploadToSystemJobStatus = async (taskCode: string) => {
  return queryAiJobResult(taskCode, AI_JOB_TYPE.UPLOAD_TO_SYSTEM);
};
