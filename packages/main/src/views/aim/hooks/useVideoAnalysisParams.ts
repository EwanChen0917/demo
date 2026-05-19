import { ref, onMounted, readonly } from 'vue';
import { videoAnalysisApi } from '@/api/index';
import type { VideoBusinessBean } from '@/api/videoAnalysis/data-contracts';

/**
 * 视频分析参数选项接口
 */
export interface VideoAnalysisOptions {
  /** 叙事范式选项 */
  typeOptions: string[];
  /** 视频比例选项 */
  proportionOptions: string[];
  /** 视频语言选项 */
  spokenLanguageOptions: string[];
  /** 视频分辨率选项 */
  resolutionRatioOptions: string[];
  /** 业务类型选项 */
  videoBusinessOptions: VideoBusinessBean[];
  /** 下载语言选项 */
  downLanguageOptions: VideoBusinessBean[];
  /** 授权方式选项 */
  authorizationOptions: VideoBusinessBean[];
  /** 免费授权范围选项 */
  freeAuthorizationOptions: VideoBusinessBean[];
  /** 付费授权范围选项 */
  payAuthorizationOptions: VideoBusinessBean[];
  /** 来源平台 */
  sourceOptions: string[];
}

/** 缓存的参数数据 */
let cachedParams: VideoAnalysisOptions | null = null;
/** 是否正在请求中 */
let fetchingPromise: Promise<VideoAnalysisOptions> | null = null;

/**
 * 视频分析参数 Hook
 *
 * @description 获取视频分析相关的下拉选项数据，支持缓存和多处复用
 * @param options 配置项
 * @param options.immediate 是否立即获取数据，默认 true
 * @param options.useCache 是否使用缓存，默认 true
 * @returns 视频分析参数响应式数据和操作方法
 *
 * @example
 * ```ts
 * // 基础用法
 * const { typeOptions, proportionOptions, loading } = useVideoAnalysisParams();
 *
 * // 禁用缓存
 * const { refresh } = useVideoAnalysisParams({ useCache: false });
 *
 * // 手动触发
 * const { fetchParams } = useVideoAnalysisParams({ immediate: false });
 * onMounted(() => fetchParams());
 * ```
 */
export function useVideoAnalysisParams(
  options: {
    /** 是否在挂载时立即获取数据 */
    immediate?: boolean;
    /** 是否使用缓存 */
    useCache?: boolean;
  } = {}
) {
  const { immediate = true, useCache = true } = options;

  // 响应式状态
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // 选项数据
  const typeOptions = ref<string[]>([]);
  const proportionOptions = ref<string[]>([]);
  const spokenLanguageOptions = ref<string[]>([]);
  const resolutionRatioOptions = ref<string[]>([]);
  const videoBusinessOptions = ref<VideoBusinessBean[]>([]);
  const downLanguageOptions = ref<VideoBusinessBean[]>([]);
  const authorizationOptions = ref<VideoBusinessBean[]>([]);
  const freeAuthorizationOptions = ref<VideoBusinessBean[]>([]);
  const payAuthorizationOptions = ref<VideoBusinessBean[]>([]);
  const sourceOptions = ref<string[]>([]);

  /**
   * 更新响应式数据
   */
  function updateOptions(data: VideoAnalysisOptions) {
    typeOptions.value = data.typeOptions;
    proportionOptions.value = data.proportionOptions;
    spokenLanguageOptions.value = data.spokenLanguageOptions;
    resolutionRatioOptions.value = data.resolutionRatioOptions;
    videoBusinessOptions.value = data.videoBusinessOptions;
    downLanguageOptions.value = data.downLanguageOptions;
    authorizationOptions.value = data.authorizationOptions;
    freeAuthorizationOptions.value = data.freeAuthorizationOptions;
    payAuthorizationOptions.value = data.payAuthorizationOptions;
    sourceOptions.value = data.sourceOptions;
  }

  /**
   * 从缓存或接口获取参数数据
   */
  async function fetchParams(forceRefresh = false): Promise<VideoAnalysisOptions> {
    // 如果使用缓存且有缓存数据，直接返回
    if (useCache && !forceRefresh && cachedParams) {
      updateOptions(cachedParams);
      return cachedParams;
    }

    // 如果已有请求在进行中，等待该请求完成
    if (fetchingPromise && !forceRefresh) {
      const result = await fetchingPromise;
      updateOptions(result);
      return result;
    }

    loading.value = true;
    error.value = null;

    fetchingPromise = (async () => {
      try {
        const res = await videoAnalysisApi.luteosAiVideoAnalysisGetRequestParameters();

        const params: VideoAnalysisOptions = {
          typeOptions: res?.types || [],
          proportionOptions: res?.proportions || [],
          spokenLanguageOptions: res?.spokenLanguages || [],
          resolutionRatioOptions: res?.resolutionRatios || [],
          videoBusinessOptions: res?.videoBusiness || [],
          downLanguageOptions: res?.downLanguages || [],
          authorizationOptions: res?.authorizations || [],
          freeAuthorizationOptions: res?.freeAuthorizations || [],
          payAuthorizationOptions: res?.payAuthorizations || [],
          sourceOptions: res?.sources || [],
        };

        // 更新缓存
        if (useCache) {
          cachedParams = params;
        }

        updateOptions(params);
        return params;
      } catch (err) {
        error.value = err as Error;
        console.error('获取视频分析参数失败:', err);

        // 返回空数据
        return {
          typeOptions: [],
          proportionOptions: [],
          spokenLanguageOptions: [],
          resolutionRatioOptions: [],
          videoBusinessOptions: [],
          downLanguageOptions: [],
          authorizationOptions: [],
          freeAuthorizationOptions: [],
          payAuthorizationOptions: [],
          sourceOptions: [],
        };
      } finally {
        loading.value = false;
        fetchingPromise = null;
      }
    })();

    return fetchingPromise;
  }

  /**
   * 强制刷新参数数据
   */
  async function refresh() {
    return fetchParams(true);
  }

  /**
   * 清除缓存
   */
  function clearCache() {
    cachedParams = null;
  }

  // 挂载时自动获取数据
  if (immediate) {
    onMounted(() => {
      fetchParams();
    });
  }

  return {
    // 状态
    loading: readonly(loading),
    error: readonly(error),

    // 选项数据
    typeOptions: readonly(typeOptions),
    proportionOptions: readonly(proportionOptions),
    spokenLanguageOptions: readonly(spokenLanguageOptions),
    resolutionRatioOptions: readonly(resolutionRatioOptions),
    videoBusinessOptions: readonly(videoBusinessOptions),
    downLanguageOptions: readonly(downLanguageOptions),
    authorizationOptions: readonly(authorizationOptions),
    freeAuthorizationOptions: readonly(freeAuthorizationOptions),
    payAuthorizationOptions: readonly(payAuthorizationOptions),
    sourceOptions: readonly(sourceOptions),

    // 方法
    fetchParams,
    refresh,
    clearCache,
  };
}

export default useVideoAnalysisParams;
