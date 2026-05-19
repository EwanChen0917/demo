import { useStorage } from '@vueuse/core';
import { memberApi } from '@/api';
import { useStore } from '@/store/modules/useStore';

type TrackScene = 'detail' | 'log' | 'execute' | 'resubmit';

interface TrackPayload {
  demandCode: string;
  entryScene: TrackScene;
  hasEntrySceneParam: boolean;
  pageTitle: string;
  pagePath: string;
  routeName?: string;
}

const trackCacheKey = 'demand-manage-5-detail-entry-track-cache';

export const useDemandDetailEntryTrack = () => {
  const store = useStore();
  const trackedKeys = useStorage<string[]>(trackCacheKey, [], sessionStorage);

  const buildTrackKey = (payload: TrackPayload) =>
    `${payload.demandCode}:${payload.entryScene}:${payload.pagePath}`;

  const trackEntry = async (payload: TrackPayload) => {
    if (!payload.hasEntrySceneParam) {
      return;
    }
    if (!['detail', 'log'].includes(payload.entryScene)) {
      return;
    }

    const trackKey = buildTrackKey(payload);
    if (trackedKeys.value.includes(trackKey)) {
      return;
    }

    const menuCode = payload.routeName ? store.menuCodeMap?.[payload.routeName] : undefined;
    if (!menuCode) {
      return;
    }

    const memberCode = store.getInfo?.memberCode;
    const eventName =
      payload.entryScene === 'log' ? `${payload.pageTitle}钉钉查看日志` : `${payload.pageTitle}钉钉详情`;

    await Promise.allSettled([
      memberApi.luteosMemberSysReport({
        platform: 'OS',
        menuCode,
        eventName,
        memberCode,
        type: 'button',
        pageUrl: payload.pagePath,
      }),
      memberApi.luteosMemberSaveMenuVisit({
        menuCode,
      }),
    ]);

    trackedKeys.value = [...trackedKeys.value, trackKey];
  };

  return {
    trackEntry,
  };
};
