import { officeApi } from '@/api';
import { isEmpty } from 'lodash-es';

import { SMART_MEETING_ROOM_MOCK_STORAGE_KEY, isSmartMeetingRoomMockEnabled } from '../deviceLedger/api';
import { logMock } from '../utils/debugLogger';
import {
  mockQueryReviewDetail,
  mockQueryScheduleList,
  mockDrawFortuneCard,
  mockQueryTodayInsights,
  mockQueryUserSubscribe,
  type QueryReviewDetailParams,
  type QueryReviewDetailResponse,
  type QueryScheduleListParams,
  type QueryScheduleListResponse,
  type DrawFortuneCardParams,
} from './mock';
import type { DrawFortuneCardResponse } from './types';
import dayjs from 'dayjs';
import type { CalendarListReq } from '@/api/office/data-contracts';

export type MyScheduleApi = {
  queryScheduleList: (params: QueryScheduleListParams) => Promise<QueryScheduleListResponse>;
  queryReviewDetail: (params: QueryReviewDetailParams) => Promise<QueryReviewDetailResponse>;
  drawFortuneCard: (params: DrawFortuneCardParams, options?: any) => Promise<DrawFortuneCardResponse>;
  queryTodayInsights: () => Promise<{ workflowCode?: string; workflowSubject?: string; workflowContent?: string }>;
  queryUserSubscribe: (params: { memberCode?: string }) => Promise<{ subscribeKeys: string[] }>;
  saveUserSubscribe: (params: { memberCode?: string; subscribeKeys: string[] }) => Promise<{ success: boolean }>;
};

export { SMART_MEETING_ROOM_MOCK_STORAGE_KEY };

const mapSubscribeKeysToApi = (keys: string[]) => {
  const list = keys
    .map((k) => {
      if (k === 'self') return 1;
      if (k === 'leader') return 2;
      return undefined;
    })
    .filter((x): x is 1 | 2 => x !== undefined);

  return isEmpty(list) ? undefined : (list as number[]);
};

const normalizeDate = (value: string) => {
  const d = dayjs(value);
  return d.isValid() ? d.format('YYYY-MM-DD') : value;
};

const normalizeDateTime = (value: string) => {
  const d = dayjs(value);
  return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : value;
};

const mapCalendarType = (leaderFlag?: number) => (leaderFlag === 1 ? 'leader' : 'self');

export const getMyScheduleApi = (): MyScheduleApi => {
  if (isSmartMeetingRoomMockEnabled()) {
    return {
      queryScheduleList: (params) => {
        logMock('mySchedule.queryScheduleList', params);
        return mockQueryScheduleList(params);
      },
      queryReviewDetail: (params) => {
        logMock('mySchedule.queryReviewDetail', params);
        return mockQueryReviewDetail(params);
      },
      drawFortuneCard: (params, options) => {
        logMock('mySchedule.drawFortuneCard', { params, options });
        return mockDrawFortuneCard(params);
      },
      queryTodayInsights: () => {
        logMock('mySchedule.queryTodayInsights', {});
        return mockQueryTodayInsights();
      },
      queryUserSubscribe: (params) => {
        logMock('mySchedule.queryUserSubscribe', params);
        return mockQueryUserSubscribe(params as any);
      },
      saveUserSubscribe: (params) => {
        logMock('mySchedule.saveUserSubscribe', params);
        return Promise.resolve({ success: true });
      },
    };
  }

  const api = officeApi as any;
  return {
    queryScheduleList: async (params) => {
      const dimension =
        params.viewType === 'day'
          ? 'day'
          : params.viewType === 'month' || params.viewType === 'list'
            ? 'month'
            : 'week';

      const req: CalendarListReq = {
        dimension,
        subscribeTypeList: mapSubscribeKeysToApi((params.calendarTypes ?? []) as any) as number[],
      };

      if (dimension === 'day') {
        req.calendarDate = normalizeDate(params.startAt);
      } else if (dimension === 'week') {
        req.weekStartDate = normalizeDate(params.startAt);
        req.weekEndDate = normalizeDate(params.endAt);
      } else {
        const base = dayjs(params.startAt);
        req.monthStartDate = base.startOf('month').format('YYYY-MM-DD');
        req.monthEndDate = base.endOf('month').format('YYYY-MM-DD');
      }

      const res = await api.officeCalendarQueryCalendarList(req);
      logMock('mySchedule.queryScheduleList', req);

      const scheduleList =
        (res?.calendarDayList ?? [])
          .flatMap((dayItem: any) => (dayItem?.calendarList ?? []) as any[])
          .map((item: any, idx: number) => ({
            id: `${item.startTime ?? ''}_${item.endTime ?? ''}_${item.title ?? ''}_${idx}`,
            calendarType: mapCalendarType(item.leaderFlag),
            title: item.title ?? '-',
            startAt: normalizeDateTime(item.startTime),
            endAt: normalizeDateTime(item.endTime),
            hasMinutes: item.meetingSummaryFlag === 1,
            minutesUrl: item.meetingSummaryLink || undefined,
            flashMinutesList: (item.flashMinutesList ?? [])
              .map((flash: any) => ({
                title: flash?.title ?? '',
                url: flash?.url ?? '',
              }))
              .filter((flash: any) => flash.url),
            leaderName: item.leaderName,
          }))
          .sort((a: any, b: any) => dayjs(a.startAt).valueOf() - dayjs(b.startAt).valueOf()) ?? [];

      const leaderName =
        (res?.calendarDayList ?? [])
          .flatMap((dayItem: any) => (dayItem?.calendarList ?? []) as any[])
          .find((item: any) => item.leaderFlag === 1 && item.leaderName)?.leaderName || undefined;

      return { total: scheduleList.length, scheduleList, leaderName };
    },
    queryReviewDetail: async (params) => {
      logMock('mySchedule.queryReviewDetail', params);
      return Promise.resolve({ id: params.id, minutesUrl: undefined, content: undefined });
    },
    drawFortuneCard: async (params, options) => {
      const query = { memberCode: params.memberCode };
      const res = await api.officeCalendarGenerateFortuneCard(query as any, options);
      logMock('mySchedule.drawFortuneCard', { query, options });
      return res;
    },
    queryTodayInsights: () => {
      logMock('mySchedule.queryTodayInsights', {});
      return api.officeCalendarQueryTodayInsights();
    },
    queryUserSubscribe: async (params) => {
      logMock('mySchedule.queryUserSubscribe', params);
      const res = await api.officeCalendarQueryUserSubscribe({ memberCode: params.memberCode } as any);

      const subscribeKeys = (res?.userSubscribeList ?? [])
        .map((x: any) => {
          if (x.subscribeType === 1) return 'self';
          if (x.subscribeType === 2) return 'leader';
          return undefined;
        })
        .filter((x: any) => !!x);

      return { subscribeKeys };
    },
    saveUserSubscribe: async (params) => {
      logMock('mySchedule.saveUserSubscribe', params);
      const subscribeTypeList = mapSubscribeKeysToApi(params.subscribeKeys) ?? [];
      if (isEmpty(subscribeTypeList)) return { success: true };
      await Promise.all(
        subscribeTypeList.map((subscribeType) =>
          api.officeCalendarSaveUserSubscribe({
            memberCode: params.memberCode,
            subscribeType,
          } as any)
        )
      );
      return { success: true };
    },
  };
};
