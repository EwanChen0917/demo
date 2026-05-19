import { defineStore } from 'pinia';
import { videoAnalysisApi } from '@/api/index';
import type { VideoSplitCandidateBean } from '@/api/videoAnalysis/data-contracts';

/** 候选视频项类型定义 - 使用API返回的类型 */
export type CandidateVideoItem = VideoSplitCandidateBean & {
  /** 文件地址 - 用于预览 */
  fileKey?: string;
  /** 视频描述 */
  description?: string;
};

/** Store State 类型 */
export interface CandidateVideoState {
  /** 候选视频列表 */
  candidateList: CandidateVideoItem[];
  /** 抽屉是否打开 */
  drawerVisible: boolean;
  /** 列表加载状态 */
  loading: boolean;
}

/** Store Getters 类型 */
export interface CandidateVideoGetters {
  [key: string]: (state: CandidateVideoState) => unknown;
  /** 已加入候选视频数量 */
  candidateCount: (state: CandidateVideoState) => number;
}

/** 候选操作类型 */
export type CandidateActionType = 'add' | 'remove';

/** Store Actions 类型 */
export interface CandidateVideoActions {
  /** 打开抽屉 */
  openDrawer: () => void;
  /** 关闭抽屉 */
  closeDrawer: () => void;
  /** 获取候选视频列表 */
  fetchCandidateList: () => Promise<void>;
  /** 更新候选状态（支持单个或批量的添加/移除） */
  updateCandidate: (
    action: CandidateActionType,
    videoSplitIds: number | number[]
  ) => Promise<boolean>;
  /** 检查视频是否已加入候选（通过 videoId 判断） */
  isInCandidate: (videoId: string) => boolean;
  /** 通过 videoSplitId 检查是否已加入候选 */
  isInCandidateBySplitId: (videoSplitId: number) => boolean;
  /** 获取已加入候选的 videoId 集合 */
  getCandidateVideoIds: () => Set<string>;
  /** 获取已加入候选的 videoSplitId 集合 */
  getCandidateVideoSplitIds: () => Set<number>;
}

/**
 * 候选视频状态管理
 */
export const useCandidateVideoStore = defineStore<
  string,
  CandidateVideoState,
  CandidateVideoGetters,
  CandidateVideoActions
>('candidateVideo', {
  state: (): CandidateVideoState => ({
    candidateList: [],
    drawerVisible: false,
    loading: false,
  }),

  getters: {
    /** 获取已加入候选视频数量 */
    candidateCount: (state) => state.candidateList.length,
  },

  actions: {
    /** 打开抽屉 */
    openDrawer() {
      this.drawerVisible = true;
      this.fetchCandidateList();
    },

    /** 关闭抽屉 */
    closeDrawer() {
      this.drawerVisible = false;
    },

    /** 获取候选视频列表 */
    async fetchCandidateList() {
      this.loading = true;
      try {
        const response = await videoAnalysisApi.luteosAiVideoCandidateQueryList();
        this.candidateList = ((response as any).dataList || []) as CandidateVideoItem[];
      } catch (error) {
        console.error('获取候选视频列表失败:', error);
      } finally {
        this.loading = false;
      }
    },

    /** 更新候选状态（支持单个或批量的添加/移除） */
    async updateCandidate(
      action: CandidateActionType,
      videoSplitIds: number | number[]
    ): Promise<boolean> {
      try {
        const ids = Array.isArray(videoSplitIds) ? videoSplitIds : [videoSplitIds];
        const isAdd = action === 'add';

        // 添加时过滤已在候选列表中的
        let idsToUpdate = ids;

        if (isAdd) {
          const candidateSplitIds = this.getCandidateVideoSplitIds();
          idsToUpdate = ids.filter((id) => !candidateSplitIds.has(id));

          if (idsToUpdate.length === 0) {
            console.warn('所有视频已在候选列表中');
            return true;
          }
        }

        // 调用接口: type=0 添加, type=1 移除
        const response = await videoAnalysisApi.luteosAiVideoCandidateUpdate({
          type: isAdd ? 0 : 1,
          videoSplitIds: idsToUpdate,
        });

        console.log('更新候选状态响应:', response);

        if (response) {
          if (isAdd) {
            // 添加成功，重新获取列表
            await this.fetchCandidateList();
          } else {
            // 移除成功，直接从本地列表删除
            const idsSet = new Set(idsToUpdate);
            this.candidateList = this.candidateList.filter(
              (item) => !idsSet.has(item.videoSplitId!)
            );
          }
        }
        return !!response;
      } catch (error) {
        console.error(`${action === 'add' ? '加入' : '取消'}候选失败:`, error);
        return false;
      }
    },

    /** 检查视频是否已加入候选（通过 videoId 判断） */
    isInCandidate(videoId: string): boolean {
      return this.candidateList.some((item) => item.videoId === videoId);
    },

    /** 通过 videoSplitId 检查是否已加入候选 */
    isInCandidateBySplitId(videoSplitId: number): boolean {
      return this.candidateList.some((item) => item.videoSplitId === videoSplitId);
    },

    /** 获取已加入候选的 videoId 集合 */
    getCandidateVideoIds(): Set<string> {
      return new Set(
        this.candidateList.map((item) => item.videoId).filter((id): id is string => !!id)
      );
    },

    /** 获取已加入候选的 videoSplitId 集合 */
    getCandidateVideoSplitIds(): Set<number> {
      return new Set(
        this.candidateList.map((item) => item.videoSplitId).filter((id): id is number => !!id)
      );
    },
  },
});
