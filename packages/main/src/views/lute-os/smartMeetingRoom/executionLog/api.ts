import { platformApi, officeApi } from '@/api';

import { isSmartMeetingRoomMockEnabled } from '../deviceLedger/api';
import { logMock } from '../utils/debugLogger';
import {
  mockQueryExecutionLogList,
  mockQueryExecutionOverview,
  mockQueryMeetingRoomSelectList,
} from './mock';
import type {
  ExecutionLogListItem,
  ExecutionStatus,
  QueryExecutionLogListParams,
  QueryExecutionLogListResponse,
  QueryExecutionOverviewParams,
  QueryExecutionOverviewResponse,
} from './types';

const mapStatusToApi = (status?: ExecutionStatus) => {
  if (!status) return undefined;
  if (status === '成功') return 'success';
  if (status === '失败') return 'fail';
  if (status === '待执行') return 'waiting';
  if (status === '关闭') return 'close';
  return 'conflict';
};

const mapStatusToUi = (status?: string): ExecutionStatus | string => {
  if (status === 'success') return '成功';
  if (status === 'fail') return '失败';
  if (status === 'conflict') return '冲突拦截';
  if (status === 'waiting') return '待执行';
  if (status === 'close') return '关闭';
  return status || '未知';
};

const adaptLogItem = (item: any): ExecutionLogListItem => {
  return {
    id: item.id ?? item.logId ?? item.requestId ?? item.serialCode ?? '',
    executionSerialNo: item.serialCode ?? item.serialNo ?? item.executionSerialNo ?? item.requestId ?? '',
    executedAt: item.taskExecuteTime ?? item.executeTime ?? item.executedAt ?? item.runTime ?? '',
    taskName: item.taskName ?? '-',
    taskCode: item.taskCode ?? '',
    triggerSource: item.triggerSourceStr ?? item.triggerSource ?? item.triggerFrom ?? '-',
    triggerCondition: item.triggerConditionStr || '-',
    executeAction: item.executeAction ?? item.executeActionStr ?? item.executeActionConfig ?? '',
    roomStr: item.roomStr ?? '-',
    durationText:
      item.durationText ??
      (item.runTime ? `${item.runTime}ms` : item.durationMs ? `${item.durationMs}ms` : '-'),
    status: item.status ?? '',
    statusDesc: item.statusDesc ?? mapStatusToUi(item.status),
    roomName: item.roomName ?? '-',
    meetingTime: item.meetingTime || undefined,
    errorMsg: item.errorMsg ?? '',
    detail: item.detail ?? '',
  };
};

const adaptOverview = (
  deviceCount: any,
  taskCount: any,
  successRate: any
): QueryExecutionOverviewResponse => {
  const deviceTotalCount = deviceCount?.deviceNum ?? deviceCount?.deviceTotalCount ?? 0;
  const deviceOnlineCount = deviceCount?.onlineNum ?? deviceCount?.deviceOnlineCount ?? 0;
  const deviceOfflineCount = deviceCount?.offlineNum ?? Math.max(0, deviceTotalCount - deviceOnlineCount);
  const deviceOnlineRate =
    deviceTotalCount > 0 ? Number(((deviceOnlineCount / deviceTotalCount) * 100).toFixed(2)) : 0;

  const taskExecutionCount = taskCount?.executeNum ?? 0;
  const taskExecutionDeltaRateRaw = taskCount?.executeRate ?? 0;
  const taskExecutionDeltaRate =
    Math.sign(taskExecutionDeltaRateRaw) *
    (Math.round((Math.abs(taskExecutionDeltaRateRaw * 100) + Number.EPSILON) * 100) / 100);
  const trend =
    (taskCount?.executeNumHourList ?? []).map((x: any) => {
      const h = String(x.hour ?? x.time ?? '');
      return {
        hour: h ? (h.includes(':') ? h : `${h.padStart(2, '0')}:00`) : '',
        count: x.executeNum ?? x.count ?? 0,
      };
    }) ?? [];

  const successRateRaw = successRate?.successTaskRate ?? 0;
  const successRateValue = successRateRaw <= 1 ? successRateRaw * 100 : successRateRaw;

  const deviceOnlineStats =
    (deviceCount?.deviceCountList ?? []).map((x: any) => ({
      deviceTypeName: x.deviceType ?? '-',
      deviceCount: (x.onlineNum ?? 0) + (x.offlineNum ?? 0),
      onlineCount: x.onlineNum ?? 0,
      onlineRate: x.deviceOnlineRate ? Number((x.deviceOnlineRate * 100).toFixed(2)) : 0,
    })) ?? [];

  return {
    successRate: successRateValue,
    abnormalTaskCount: successRate?.exceptionTaskNum ?? 0,
    deviceOnlineCount,
    deviceTotalCount,
    deviceOfflineCount,
    deviceOnlineRate,
    taskExecutionCount,
    taskExecutionDeltaRate,
    trend,
    deviceOnlineStats,
  };
};

export type ExecutionLogApi = {
  queryExecutionOverview: (
    params: QueryExecutionOverviewParams
  ) => Promise<QueryExecutionOverviewResponse>;
  queryExecutionLogList: (
    params: QueryExecutionLogListParams
  ) => Promise<QueryExecutionLogListResponse>;
  queryMeetingRoomSelectList: (params: { keyword?: string }) => Promise<{
    roomList: { label: string; value: string }[];
  }>;
};

export const getExecutionLogApi = (): ExecutionLogApi => {
  if (isSmartMeetingRoomMockEnabled()) {
    return {
      queryExecutionOverview: async (params) => {
        logMock('executionLog.queryExecutionOverview', params);
        const res = await mockQueryExecutionOverview(params);
        if (res.taskExecutionDeltaRate !== undefined) {
          const raw = res.taskExecutionDeltaRate;
          res.taskExecutionDeltaRate =
            Math.sign(raw) * (Math.round((Math.abs(raw * 100) + Number.EPSILON) * 100) / 100);
        }
        return res;
      },
      queryExecutionLogList: async (params) => {
        logMock('executionLog.queryExecutionLogList', params);
        return mockQueryExecutionLogList(params);
      },
      queryMeetingRoomSelectList: async (params) => {
        logMock('executionLog.queryMeetingRoomSelectList', params);
        return mockQueryMeetingRoomSelectList(params);
      },
    };
  }

  const api = officeApi as any;
  return {
    queryExecutionOverview: async (params) => {
      const [deviceCount, taskCount, successRate] = await Promise.all([
        api.officeMeetingAutoStatisticQueryDeviceCount(),
        api.officeMeetingAutoStatisticQueryTaskExecuteCount({ day: params.date }),
        api.officeMeetingAutoStatisticQueryTaskSuccessRate({ day: params.date }),
      ]);

      const overview = adaptOverview(deviceCount, taskCount, successRate);
      logMock('executionLog.queryExecutionOverview', {
        params,
        deviceCount,
        taskCount,
        successRate,
        overview,
      });
      return overview;
    },
    queryExecutionLogList: async (params) => {
      const query = {
        startDate: params.startDate,
        endDate: params.endDate,
        status: mapStatusToApi(params.status),
        roomId: params.roomCode,
        pageNum: params.pageNum,
        pageSize: params.pageSize,
      };
      const res = await api.officeMeetingAutoStatisticQueryLog(query);

      const list: ExecutionLogListItem[] = (res?.autoTaskLogList ?? res?.executionLogList ?? []).map(adaptLogItem);
      const result = {
        total: res?.total ?? list.length ?? 0,
        executionLogList: list,
      };
      logMock('executionLog.queryExecutionLogList', { query, response: result });
      return result;
    },
    queryMeetingRoomSelectList: async ({ keyword }) => {
      const query = {
        roomCategory: undefined,
        keyword: keyword?.trim() || undefined,
        pageNum: 1,
        pageSize: 100,
      };
      logMock('executionLog.queryMeetingRoomSelectList', query);
      const res = await platformApi.platformMeetingQueryRoomList(query);

      const roomList = (res.meetingRoomList ?? [])
        .map((x: any) => ({
          label: x.roomName ?? '-',
          value: x.roomCode ?? '',
        }))
        .filter((x: any) => !!x.value);

      return { roomList };
    },
  };
};
