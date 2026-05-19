import { officeApi } from '@/api';
import type {
  AutoTaskListQueryReq,
  AutoTaskSaveReq,
  ExecuteActionBean,
  TriggerConditionBean,
} from '@/api/office/data-contracts';
import { isSmartMeetingRoomMockEnabled } from '../deviceLedger/api';
import { logMock } from '../utils/debugLogger';
import {
  mockQueryAutoTaskConfig,
  mockOperateAutomationTask,
  mockQueryAutomationTaskList,
  mockQueryAutomationTaskNameOptions,
  mockGenerateTaskCode,
  mockSaveAutomationTask,
} from './mock';
import type {
  AutomationTaskListItem,
  AutomationTaskRunStatus,
  AutomationTaskStatus,
  GenerateTaskCodeResponse,
  OperateAutomationTaskParams,
  OperateAutomationTaskResponse,
  QueryAutomationTaskListParams,
  QueryAutomationTaskListResponse,
  QueryAutomationTaskNameOptionsParams,
  QueryAutomationTaskNameOptionsResponse,
  SaveAutomationTaskParams,
  SaveAutomationTaskResponse,
  SelectOption,
  AutoTaskConfig,
  QueryAutomationTaskDetailResponse,
} from './types';

const mapRunStatusToUi = (status: AutomationTaskRunStatus, desc: string): AutomationTaskStatus => {
  if (status === 'running') return '运行中';
  if (status === 'paused') return '已暂停';
  if (status === 'close') return '已关闭';
  if (status === 'toRunning') return '待执行';
  if (desc.includes('暂停')) return '已暂停';
  if (desc.includes('关闭')) return '已关闭';
  return '待执行';
};

const mapStatusListToApi = (list: AutomationTaskStatus[]): string[] | undefined => {
  if (!list.length) return undefined;
  return list.map((value) => {
    if (value === '运行中') return 'running';
    if (value === '已暂停') return 'paused';
    if (value === '已关闭') return 'close';
    return 'toRunning';
  });
};

type AutoTaskTriggerConditionServer = {
  key: string;
  name: string;
  value: number;
};

type AutoTaskExecuteActionServer = {
  deviceType: string;
  actionValue: string | null;
};

type AutoTaskListItemServer = {
  taskCode: string;
  taskName: string;
  triggerConditionStr: string;
  executeActionStr: string;
  lastRunTime: string;
  taskExecuteTime: string;
  runStatus: AutomationTaskRunStatus;
  runStatusDesc: string;
  keepLightFlag: 0 | 1;
  keepMinutes: number;
  taskLockDelay: number;
  triggerConditionList: AutoTaskTriggerConditionServer[];
  executeActionList: AutoTaskExecuteActionServer[];
};

type AutoTaskListQueryRespServer = {
  total: number;
  autoTaskList: AutoTaskListItemServer[];
};

const adaptTask = (item: AutoTaskListItemServer): AutomationTaskListItem => {
  const runStatus = item.runStatus;
  const status = mapRunStatusToUi(runStatus, item.runStatusDesc);
  const triggerConditionList = (item.triggerConditionList || []).map((x) => ({
    key: x.key,
    name: x.name,
    minutes: x.value as unknown as number,
  }));
  const executeActionList = (item.executeActionList || []).map((x) => ({
    deviceType: x.deviceType,
    actionValue: x.actionValue,
  }));

  return {
    taskCode: item.taskCode,
    taskName: item.taskName,
    triggerConditionList,
    executeActionList,
    triggerConditionStr: item.triggerConditionStr,
    executeActionStr: item.executeActionStr,
    latestRunAt: item.lastRunTime,
    taskStartTime: item.taskExecuteTime,
    keepLightFlag: item.keepLightFlag === 1 || item.taskLockDelay > 0,
    keepMinutes: item.keepMinutes || item.taskLockDelay,
    status,
    runStatus,
    runStatusDesc: item.runStatusDesc,
  };
};

const mapSaveParamsToRequest = (params: SaveAutomationTaskParams) => {
  const triggerConditionList: TriggerConditionBean[] = params.triggerConditionList.map((c) => ({
    key: c.key,
    name: c.name,
    value: c.minutes as any,
  }));

  const executeActionList: ExecuteActionBean[] = params.executeActionList.map((a) => ({
    deviceType: a.deviceType,
    actionValue: a.actionValue as any,
  }));

  return {
    taskCode: params.taskCode,
    taskName: params.taskName,
    taskStartTime: params.taskStartTime,
    triggerConditionList,
    executeActionList,
    keepLightFlag: params.keepLightFlag ? 1 : 0,
    keepMinutes: params.keepLightFlag ? params.keepMinutes : undefined,
  } satisfies AutoTaskSaveReq;
};

export type AutomationTaskApi = {
  queryAutoTaskConfig: () => Promise<AutoTaskConfig>;
  queryAutomationTaskList: (
    params: QueryAutomationTaskListParams
  ) => Promise<QueryAutomationTaskListResponse>;
  queryAutomationTaskNameOptions: (
    params: QueryAutomationTaskNameOptionsParams
  ) => Promise<QueryAutomationTaskNameOptionsResponse>;
  pauseAutomationTask: (taskCode: string) => Promise<OperateAutomationTaskResponse>;
  resumeAutomationTask: (taskCode: string) => Promise<OperateAutomationTaskResponse>;
  closeAutomationTask: (taskCode: string) => Promise<OperateAutomationTaskResponse>;
  saveAutomationTask: (params: SaveAutomationTaskParams) => Promise<SaveAutomationTaskResponse>;
  generateTaskCode: () => Promise<GenerateTaskCodeResponse>;
  queryAutomationTaskDetail: (taskCode: string) => Promise<QueryAutomationTaskDetailResponse>;
};

export const getAutomationTaskApi = (): AutomationTaskApi => {
  if (isSmartMeetingRoomMockEnabled()) {
    return {
      queryAutoTaskConfig: async () => {
        logMock('automationTask.queryAutoTaskConfig', {});
        return mockQueryAutoTaskConfig();
      },
      queryAutomationTaskList: async (params) => {
        const body = {
          keyword: params.keyword?.trim() || undefined,
          statusList: mapStatusListToApi(params.statusList),
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          queryParam: params.keyword ? { keyword: params.keyword } : undefined,
        };
        logMock('automationTask.queryAutomationTaskList', body);
        return mockQueryAutomationTaskList(params);
      },
      queryAutomationTaskNameOptions: async (params) => {
        const body = {
          keyword: params.keyword?.trim() || undefined,
          status: undefined,
          pageNum: 1,
          pageSize: 100,
        };
        logMock('automationTask.queryAutomationTaskNameOptions', body);
        return mockQueryAutomationTaskNameOptions(params);
      },
      pauseAutomationTask: (taskCode) => {
        const payload = { taskCode, operateType: 'stop' } as OperateAutomationTaskParams;
        logMock('automationTask.pauseAutomationTask', payload);
        return mockOperateAutomationTask(payload);
      },
      resumeAutomationTask: (taskCode) => {
        const payload = { taskCode, operateType: 'recovery' } as OperateAutomationTaskParams;
        logMock('automationTask.resumeAutomationTask', payload);
        return mockOperateAutomationTask(payload);
      },
      closeAutomationTask: (taskCode) => {
        const payload = { taskCode, operateType: 'close' } as OperateAutomationTaskParams;
        logMock('automationTask.closeAutomationTask', payload);
        return mockOperateAutomationTask(payload);
      },
      saveAutomationTask: async (params) => {
        const body = mapSaveParamsToRequest(params);
        logMock('automationTask.saveAutomationTask', body);
        return mockSaveAutomationTask(params);
      },
      generateTaskCode: async () => {
        logMock('automationTask.generateTaskCode', {});
        return mockGenerateTaskCode();
      },
      queryAutomationTaskDetail: async (taskCode) => {
        logMock('automationTask.queryAutomationTaskDetail', { taskCode });
        return mockQueryAutomationTaskList({
          keyword: taskCode,
          pageNum: 1,
          pageSize: 1,
          statusList: [],
        }).then((res) => res.taskList[0]);
      },
    };
  }

  return {
    queryAutoTaskConfig: async () => {
      const body = {};
      const res = (await officeApi.officeMeetingAutoQueryAutoTaskConfig()) as unknown as AutoTaskConfig;
      logMock('automationTask.queryAutoTaskConfig', body);
      return {
        triggerConditionList: res?.triggerConditionList || [],
        executeActionList: res?.executeActionList || [],
      };
    },
    queryAutomationTaskList: async (params) => {
      const body = {
        keyword: params.keyword?.trim() || undefined,
        statusList: mapStatusListToApi(params.statusList),
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        queryParam: params.keyword ? { keyword: params.keyword } : undefined,
      } as any;
      const res = (await officeApi.officeMeetingAutoQueryAutoTaskList(body)) as unknown as AutoTaskListQueryRespServer;
      logMock('automationTask.queryAutomationTaskList', body);

      const list = (res.autoTaskList || []).map(adaptTask);
      return { total: res.total || 0, taskList: list };
    },
    queryAutomationTaskNameOptions: async (params) => {
      const body = {
        keyword: params.keyword?.trim() || undefined,
        status: undefined,
        pageNum: 1,
        pageSize: 100,
      };
      const res = (await officeApi.officeMeetingAutoQueryAutoTaskList(body as AutoTaskListQueryReq)) as unknown as AutoTaskListQueryRespServer;
      logMock('automationTask.queryAutomationTaskNameOptions', body);
      const taskList: SelectOption[] = (res.autoTaskList || []).map((x) => ({
        label: `${x.taskName}（${x.taskCode}）`,
        value: x.taskCode,
      }));
      return { taskList: taskList.filter((x) => x.value) };
    },
    pauseAutomationTask: async (taskCode) => {
      const body = { taskCode, operateType: 'stop' } satisfies OperateAutomationTaskParams;
      const res = await officeApi.officeMeetingAutoOperate(body);
      logMock('automationTask.pauseAutomationTask', body);
      return { success: res.code === '200' };
    },
    resumeAutomationTask: async (taskCode) => {
      const body = { taskCode, operateType: 'recovery' } satisfies OperateAutomationTaskParams;
      const res = await officeApi.officeMeetingAutoOperate(body);
      logMock('automationTask.resumeAutomationTask', body);
      return { success: res.code === '200' };
    },
    closeAutomationTask: async (taskCode) => {
      const body = { taskCode, operateType: 'close' } satisfies OperateAutomationTaskParams;
      const res = await officeApi.officeMeetingAutoOperate(body);
      logMock('automationTask.closeAutomationTask', body);
      return { success: res.code === '200' };
    },
    saveAutomationTask: async (params) => {
      const body = mapSaveParamsToRequest(params);
      const res = await officeApi.officeMeetingAutoSave(body);
      logMock('automationTask.saveAutomationTask', body);
      return {
        taskCode: res.taskCode || params.taskCode,
        taskName: params.taskName,
        success: res.success,
        message: res.message,
      };
    },
    generateTaskCode: async () => {
      const body = {};
      const res = await officeApi.officeMeetingAutoGenerateAutoTaskCode();
      logMock('automationTask.generateTaskCode', body);
      return { taskCode: res.taskCode || '' };
    },
    queryAutomationTaskDetail: async (taskCode) => {
      const res = (await officeApi.officeMeetingAutoQueryDetail({}, { query: { taskCode } } as any)) as any;

      const raw = (res.result || res.data || res) as any;

      if (!raw || typeof raw !== 'object' || !raw.taskCode) {
        console.error('Invalid automation task detail response:', res);
        throw new Error('任务详情数据格式异常');
      }

      const normalizedRow: AutoTaskListItemServer = {
        ...raw,
        taskExecuteTime: raw.taskStartTime || raw.taskExecuteTime || '',
        lastRunTime: raw.lastRunTime || '',
        runStatus: raw.runStatus || 'toRunning',
        runStatusDesc: raw.runStatusDesc || '待执行',
        taskLockDelay: raw.taskLockDelay || 0,
      };

      return adaptTask(normalizedRow);
    },
  };
};
