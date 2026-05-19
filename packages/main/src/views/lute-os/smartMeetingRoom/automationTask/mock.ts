import dayjs from 'dayjs';

import type {
  AutoTaskConfig,
  AutomationTaskListItem,
  AutomationTaskStatus,
  ExecuteAction,
  OperateAutomationTaskParams,
  OperateAutomationTaskResponse,
  TriggerCondition,
  QueryAutomationTaskListParams,
  QueryAutomationTaskListResponse,
  QueryAutomationTaskNameOptionsParams,
  QueryAutomationTaskNameOptionsResponse,
  SaveAutomationTaskParams,
  SaveAutomationTaskResponse,
} from './types';
import { formatExecuteActionText, formatTriggerConditionText } from './utils';

export const mockQueryAutoTaskConfig = async (): Promise<AutoTaskConfig> => {
  return Promise.resolve({
    triggerConditionList: [
      { key: 'BEFORE_MEETING_START', name: '会议开始前', value: null },
      { key: 'AFTER_MEETING_END', name: '会议结束后', value: null },
      { key: 'sensor', name: '传感器感应无人', value: null },
    ],
    executeActionList: [
      {
        deviceType: 'switch',
        name: '开关',
        actionValue: null,
        type: 0,
        sort: 0,
        selectValueList: [
          { value: 'turn_on', desc: '打开' },
          { value: 'turn_off', desc: '关闭' },
        ],
      },
      {
        deviceType: 'climate',
        name: '空调',
        actionValue: null,
        type: 0,
        sort: 1,
        selectValueList: [
          { value: 'turn_on', desc: '打开' },
          { value: 'turn_off', desc: '关闭' },
        ],
      },
      {
        deviceType: 'release_meeting',
        name: '释放会议室',
        actionValue: null,
        type: -1,
        sort: 2,
        selectValueList: [],
      },
    ],
  });
};

const statusPool: AutomationTaskStatus[] = ['运行中', '已暂停', '待执行', '已关闭'];

const buildTaskCode = (base: dayjs.Dayjs, idx: number) => {
  return `TASK-${base.format('YYYYMMDD')}${idx.toString().padStart(3, '0')}`;
};

const nextTaskCode = (base: dayjs.Dayjs) => {
  const prefix = `TASK-${base.format('YYYYMMDD')}`;
  const suffixList = taskList
    .filter((x) => x.taskCode.startsWith(prefix))
    .map((x) => Number(x.taskCode.slice(prefix.length)))
    .filter((n) => Number.isFinite(n));
  const max = suffixList.length ? Math.max(...suffixList) : 0;
  return `${prefix}${(max + 1).toString().padStart(3, '0')}`;
};

const buildStartRunAt = (base: dayjs.Dayjs, idx: number) => {
  return base.add(idx * 3, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

const buildLatestRunAt = (base: dayjs.Dayjs, idx: number) => {
  return base.add(idx * 2, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

const buildTriggers = (idx: number): TriggerCondition[] => {
  if (idx % 3 === 0) return [{ key: 'BEFORE_MEETING_START', name: '会议开始前', minutes: 10 }];
  if (idx % 3 === 1) return [{ key: 'AFTER_MEETING_END', name: '会议结束后', minutes: 10 }];
  return [{ key: 'sensor', name: '传感器感应无人', minutes: 10 }];
};

const buildActions = (idx: number): ExecuteAction[] => {
  if (idx % 3 === 0)
    return [
      { deviceType: 'switch', actionValue: 'turn_on' },
      { deviceType: 'climate', actionValue: 'turn_on' },
    ];
  if (idx % 3 === 1)
    return [
      { deviceType: 'switch', actionValue: 'turn_off' },
      { deviceType: 'climate', actionValue: 'turn_off' },
    ];
  return [{ deviceType: 'release_meeting', actionValue: 'release_meeting' }];
};

let taskList: AutomationTaskListItem[] = Array.from({ length: 85 }).map((_, index) => {
  const idx = index + 1;
  const base = dayjs().startOf('day').add(10, 'hour').add(48, 'minute');
  const status = statusPool[index % statusPool.length];
  const runStatus =
    status === '运行中' ? 'running' : status === '已暂停' ? 'paused' : status === '已关闭' ? 'close' : 'toRunning';
  const isLocked = idx % 4 === 1;
  const triggerConditionList = buildTriggers(idx);
  const executeActionList = buildActions(idx);
  return {
    taskName: idx % 3 === 0 ? '会前自动预热' : idx % 3 === 1 ? '会议自动释放' : '人走即关',
    taskCode: buildTaskCode(base, (idx % 20) + 1),
    triggerConditionList,
    executeActionList,
    triggerConditionStr: formatTriggerConditionText(triggerConditionList),
    executeActionStr: formatExecuteActionText(executeActionList),
    latestRunAt: status === '待执行' ? '' : buildLatestRunAt(base, idx),
    taskStartTime: buildStartRunAt(base, idx),
    keepLightFlag: isLocked && idx % 3 === 0,
    keepMinutes: isLocked && idx % 3 === 0 ? 20 : 0,
    status,
    runStatus,
    runStatusDesc: status,
  } satisfies AutomationTaskListItem;
});

const getStatusSortWeight = (status: AutomationTaskStatus) => {
  if (status === '运行中') return 1;
  if (status === '待执行') return 2;
  if (status === '已暂停') return 3;
  return 4;
};

const sortTaskList = (list: AutomationTaskListItem[]) => {
  list.sort((a, b) => {
    const s = getStatusSortWeight(a.status) - getStatusSortWeight(b.status);
    if (s !== 0) return s;
    return dayjs(b.taskStartTime).valueOf() - dayjs(a.taskStartTime).valueOf();
  });
  return list;
};

export const mockQueryAutomationTaskList = async (
  params: QueryAutomationTaskListParams
): Promise<QueryAutomationTaskListResponse> => {
  const { keyword, statusList, pageNum, pageSize } = params;
  const normalizedTaskCode = keyword ? keyword.trim() : '';

  const filtered = taskList.filter((item) => {
    const taskOk = normalizedTaskCode ? item.taskCode === normalizedTaskCode : true;
    const statusOk = statusList.length ? statusList.includes(item.status) : true;
    return taskOk && statusOk;
  });

  const sorted = sortTaskList([...filtered]);
  const total = sorted.length;
  const start = (pageNum - 1) * pageSize;
  const list = sorted.slice(start, start + pageSize);

  return Promise.resolve({ total, taskList: list });
};

export const mockQueryAutomationTaskNameOptions = async (
  params: QueryAutomationTaskNameOptionsParams
): Promise<QueryAutomationTaskNameOptionsResponse> => {
  const keyword = params.keyword?.trim();
  const list = taskList
    .filter((x) => {
      if (!keyword) return true;
      return x.taskName.includes(keyword) || x.taskCode.includes(keyword);
    })
    .slice(0, 200)
    .map((x) => ({ label: `${x.taskName}（${x.taskCode}）`, value: x.taskCode }));
  return Promise.resolve({ taskList: list });
};

const updateTaskStatus = (taskCode: string, status: AutomationTaskStatus) => {
  const runStatus =
    status === '运行中' ? 'running' : status === '已暂停' ? 'paused' : status === '已关闭' ? 'close' : 'toRunning';
  taskList = taskList.map((x) =>
    x.taskCode === taskCode ? { ...x, status, runStatus, runStatusDesc: status } : x
  );
};

export const mockOperateAutomationTask = async (
  params: OperateAutomationTaskParams
): Promise<OperateAutomationTaskResponse> => {
  if (params.operateType === 'stop') updateTaskStatus(params.taskCode, '已暂停');
  else if (params.operateType === 'recovery') {
    const matched = taskList.find((x) => x.taskCode === params.taskCode)!;
    const nextStatus = dayjs(matched.taskStartTime).isAfter(dayjs()) ? '待执行' : '运行中';
    updateTaskStatus(params.taskCode, nextStatus);
  } else if (params.operateType === 'close') updateTaskStatus(params.taskCode, '已关闭');
  return Promise.resolve({ success: true });
};

export const mockSaveAutomationTask = async (
  params: SaveAutomationTaskParams
): Promise<SaveAutomationTaskResponse> => {
  const base = dayjs();
  const taskCode = params.taskCode || nextTaskCode(base);
  const exists = taskList.find((x) => x.taskCode === taskCode);

  taskList = [
    {
      taskName: params.taskName,
      taskCode,
      triggerConditionList: params.triggerConditionList,
      executeActionList: params.executeActionList,
      triggerConditionStr: formatTriggerConditionText(params.triggerConditionList),
      executeActionStr: formatExecuteActionText(params.executeActionList),
      latestRunAt: '',
      taskStartTime: params.taskStartTime,
      keepLightFlag: params.keepLightFlag || false,
      keepMinutes: params.keepLightFlag ? (params.keepMinutes as number) : 0,
      status: '待执行',
      runStatus: 'toRunning',
      runStatusDesc: '待执行',
    },
    ...taskList.filter((x) => x.taskCode !== taskCode),
  ];

  if (exists) {
    taskList = taskList.map((x) =>
      x.taskCode === taskCode
        ? {
            ...x,
            taskName: params.taskName,
            triggerConditionList: params.triggerConditionList,
            executeActionList: params.executeActionList,
            triggerConditionStr: formatTriggerConditionText(params.triggerConditionList),
            executeActionStr: formatExecuteActionText(params.executeActionList),
            taskStartTime: params.taskStartTime,
            keepLightFlag: params.keepLightFlag || false,
            keepMinutes: params.keepLightFlag ? (params.keepMinutes as number) : 0,
          }
        : x
    );
  }

  return Promise.resolve({ taskCode, taskName: params.taskName, success: true, message: 'ok' });
};

export const mockGenerateTaskCode = async () => {
  const taskCode = nextTaskCode(dayjs());
  return Promise.resolve({ taskCode });
};
