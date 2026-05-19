import dayjs from 'dayjs';

import type {
  ExecutionLogListItem,
  ExecutionStatus,
  QueryExecutionLogListParams,
  QueryExecutionLogListResponse,
  QueryExecutionOverviewParams,
  QueryExecutionOverviewResponse,
} from './types';

const pickStatus = (index: number): ExecutionStatus => {
  const mod = index % 10;
  if (mod === 0) return '失败';
  if (mod === 3) return '冲突拦截';
  if (mod === 7) return '关闭';
  return '成功';
};

const buildSerialNo = (executedAt: string, idx: number) => {
  const datePart = dayjs(executedAt).format('YYYYMMDD');
  return `${datePart}${idx.toString().padStart(5, '0')}`;
};

const buildTaskCode = (executedAt: string, idx: number) => {
  const datePart = dayjs(executedAt).format('YYYYMMDD');
  return `TASK-${datePart}${idx.toString().padStart(3, '0')}`;
};

const buildLogList = (startDate: string, endDate: string): ExecutionLogListItem[] => {
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).endOf('day');
  const hours = Math.max(1, Math.min(72, end.diff(start, 'hour') + 1));

  const base = Array.from({ length: 85 }).map((_, i) => {
    const executedAt = start.add((i * 7) % (hours * 60), 'minute').toDate();
    const executedAtText = dayjs(executedAt).format('YYYY-MM-DD HH:mm:ss');
    const status = pickStatus(i + 1);
    const durationText = `${(0.4 + ((i + 3) % 9) * 1.3).toFixed(1)}s`;
    const taskName = status === '失败' ? '会议自动释放' : i % 4 === 0 ? '会前自动预热' : '人走即关';

    const triggerSource =
      i % 3 === 0 ? '[日程]于未绑定至301会议室' : i % 3 === 1 ? '[传感器]无人' : '[日程]于未绑定至302会议室';
    const triggerCondition =
      i % 3 === 1 ? '会议中无人超过10分钟' : i % 2 === 0 ? '会议开始前10分钟' : '会议室无人超过10分钟';
    const executeAction =
      i % 2 === 0 ? '空调：打开，26度\n灯光：打开' : '会议室：取消\n灯光：关闭\n空调：关闭';
    const errorMsg = status === '失败' ? '设备离线，指令执行失败' : status === '冲突拦截' ? '冲突拦截：设备状态不允许执行该指令' : null;
    const detail = i % 2 === 0 ? '[日程]周桥生预定灵感工坊(8楼)' : '[传感器]会议室无人';

    const roomName = i % 3 === 0 ? '301会议室' : i % 3 === 1 ? '302会议室' : '401灵感工坊';
    const meetingTime = i % 5 === 0 ? undefined : `${dayjs(executedAt).format('YYYY-MM-DD HH:00')} - ${dayjs(executedAt).add(1, 'hour').format('HH:00')}`;

    const statusMap: Record<ExecutionStatus, string> = {
      成功: 'success',
      失败: 'fail',
      冲突拦截: 'conflict',
      待执行: 'waiting',
      关闭: 'close',
    };

    return {
      id: `EXEC_${dayjs(executedAt).format('YYYYMMDDHHmmss')}_${i + 1}`,
      executionSerialNo: buildSerialNo(executedAtText, i + 1),
      executedAt: executedAtText,
      roomName,
      meetingTime,
      taskName,
      taskCode: buildTaskCode(executedAtText, (i % 20) + 1),
      triggerSource,
      triggerCondition,
      executeAction,
      durationText,
      status: statusMap[status],
      statusDesc: status,
      errorMsg: errorMsg ?? undefined,
      detail,
      roomStr: roomName,
    } satisfies ExecutionLogListItem;
  });

  base.sort((a, b) => dayjs(b.executedAt).valueOf() - dayjs(a.executedAt).valueOf());
  return base;
};

const cache = new Map<string, ExecutionLogListItem[]>();
export const mockQueryExecutionOverview = async (
  params: QueryExecutionOverviewParams
): Promise<QueryExecutionOverviewResponse> => {
  const baseDate = dayjs(params.date).isValid() ? dayjs(params.date) : dayjs();

  const deviceTotalCount = 101;
  const deviceOfflineCount = 2;
  const deviceOnlineCount = deviceTotalCount - deviceOfflineCount;
  const deviceOnlineRate = Number(((deviceOnlineCount / deviceTotalCount) * 100).toFixed(2));

  const taskExecutionCount = 1248;
  const taskExecutionDeltaRate = -0.06235;
  const abnormalTaskCount = 2;

  const successCount = 103;
  const conflictCount = 1;
  const totalCount = 104;
  const successRate = Number((((successCount + conflictCount) / totalCount) * 100).toFixed(2));

  const trend = Array.from({ length: 12 }).map((_, idx) => {
    const hour = (8 + idx).toString().padStart(2, '0');
    const peak = idx === 3 ? 380 : 180 + ((idx * 37) % 120);
    return { hour: `${hour}:00`, count: peak };
  });

  const deviceOnlineStats = [
    { deviceTypeName: '空调', deviceCount: 28, onlineCount: 27, onlineRate: 96.43 },
    { deviceTypeName: '灯光', deviceCount: 32, onlineCount: 31, onlineRate: 96.88 },
    { deviceTypeName: '电视', deviceCount: 21, onlineCount: 20, onlineRate: 95.24 },
    { deviceTypeName: '窗帘', deviceCount: 20, onlineCount: 19, onlineRate: 95 },
  ];

  return Promise.resolve({
    successRate,
    abnormalTaskCount,
    deviceOnlineCount,
    deviceTotalCount,
    deviceOfflineCount,
    deviceOnlineRate,
    taskExecutionCount,
    taskExecutionDeltaRate,
    trend,
    deviceOnlineStats,
  });
};

export const mockQueryExecutionLogList = async (
  params: QueryExecutionLogListParams
): Promise<QueryExecutionLogListResponse> => {
  const key = `${params.startDate}_${params.endDate}`;
  const list = cache.get(key) ?? buildLogList(params.startDate, params.endDate);
  cache.set(key, list);

  const filtered = params.status ? list.filter((x) => x.status === params.status) : list;

  const total = filtered.length;
  const start = (params.pageNum - 1) * params.pageSize;
  const executionLogList = filtered.slice(start, start + params.pageSize);

  return Promise.resolve({ total, executionLogList });
};

export const mockQueryMeetingRoomSelectList = async (_params: { keyword?: string }) => {
  return Promise.resolve({
    roomList: [
      { label: '301会议室', value: 'ROOM_301' },
      { label: '302会议室', value: 'ROOM_302' },
      { label: '401灵感工坊', value: 'ROOM_401' },
      { label: '501天空会议里', value: 'ROOM_501' },
    ],
  });
};
