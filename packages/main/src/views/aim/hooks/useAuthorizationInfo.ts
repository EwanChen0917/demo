import { computed, type Ref } from 'vue';
import type { VideoBusinessBean } from '@/api/videoAnalysis/data-contracts';
import { useVideoAnalysisParams } from './useVideoAnalysisParams';

/** 包含授权字段的视频数据 */
export interface AuthorizationVideoData {
  authorization?: number;
  authorizationArea?: number;
  validStartDate?: string;
  validEndDate?: string;
}

/**
 * 获取授权类型文本
 * @param authorization 授权方式值
 * @param options 授权方式选项列表
 */
export function getAuthorizationText(
  authorization: number | undefined | null,
  options: VideoBusinessBean[]
): string {
  if (authorization == null) return '';
  const found = options.find((o) => String(o.value) === String(authorization));
  return found?.desc || '';
}

/**
 * 获取授权范围文本
 * @param authorization 授权方式值
 * @param authorizationArea 授权范围值
 * @param freeOptions 免费授权范围选项
 * @param payOptions 付费授权范围选项
 */
export function getAuthorizationAreaText(
  authorization: number | undefined | null,
  authorizationArea: number | undefined | null,
  freeOptions: VideoBusinessBean[],
  payOptions: VideoBusinessBean[]
): string {
  if (authorizationArea == null) return '';
  const options = authorization === 2 ? freeOptions : authorization === 3 ? payOptions : [];
  const found = options.find((o) => String(o.value) === String(authorizationArea));
  return found?.desc || '';
}

/**
 * 授权类型静态文本（不依赖 API 选项，作为 fallback）
 * @param authorization 授权方式值
 */
export function formatAuthorization(authorization?: number | null): string {
  if (authorization == null) return '-';
  const map: Record<number, string> = {
    0: '未授权',
    2: '免费授权',
    3: '付费授权',
  };
  return map[authorization] || '-';
}

/**
 * 格式化授权日期
 * @param data 包含授权字段的视频数据
 */
export function formatAuthorizationDate(data: AuthorizationVideoData): string {
  if (!data.authorization || data.authorization === 0) return '';
  return `${data.validStartDate || ''} 至 ${data.validEndDate || ''}`;
}

/**
 * 授权信息 composable
 * 结合 useVideoAnalysisParams 提供响应式的授权文本解析能力
 *
 * @param videoData 响应式的视频数据（可选，传入后提供 computed 文本）
 */
export function useAuthorizationInfo(videoData?: Ref<AuthorizationVideoData | undefined>) {
  const { authorizationOptions, freeAuthorizationOptions, payAuthorizationOptions } =
    useVideoAnalysisParams();

  /** 根据行数据获取授权类型文本 */
  function resolveAuthorizationText(row: AuthorizationVideoData): string {
    return getAuthorizationText(row.authorization, authorizationOptions.value);
  }

  /** 根据行数据获取授权范围文本 */
  function resolveAuthorizationAreaText(row: AuthorizationVideoData): string {
    return getAuthorizationAreaText(
      row.authorization,
      row.authorizationArea,
      freeAuthorizationOptions.value,
      payAuthorizationOptions.value
    );
  }

  /** 根据行数据获取授权日期文本 */
  function resolveAuthorizationDate(row: AuthorizationVideoData): string {
    return formatAuthorizationDate(row);
  }

  // 如果传入了响应式视频数据，提供 computed 文本
  const authorizationText = computed(() => {
    if (!videoData?.value) return '';
    return resolveAuthorizationText(videoData.value);
  });

  const authorizationAreaText = computed(() => {
    if (!videoData?.value) return '';
    return resolveAuthorizationAreaText(videoData.value);
  });

  const authorizationDateText = computed(() => {
    if (!videoData?.value) return '';
    return resolveAuthorizationDate(videoData.value);
  });

  return {
    /** 选项数据 */
    authorizationOptions,
    freeAuthorizationOptions,
    payAuthorizationOptions,
    /** 按行解析方法（适用于列表场景） */
    resolveAuthorizationText,
    resolveAuthorizationAreaText,
    resolveAuthorizationDate,
    /** 响应式文本（适用于单条数据场景） */
    authorizationText,
    authorizationAreaText,
    authorizationDateText,
  };
}
