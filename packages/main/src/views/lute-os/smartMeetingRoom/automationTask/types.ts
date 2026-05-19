export type AutomationTaskStatus = '待执行' | '运行中' | '已暂停' | '已关闭';
export type AutomationTaskRunStatus = 'running' | 'paused' | 'toRunning' | 'close';

export type AutoTaskTriggerConditionConfig = {
  key: string;
  name: string;
  value: null;
};

export type AutoTaskExecuteActionSelectValue = {
  value: string;
  desc: string;
};

export type AutoTaskExecuteActionConfig = {
  deviceType: string;
  name: string;
  actionValue: null;
  type: number;
  sort: number;
  selectValueList: AutoTaskExecuteActionSelectValue[];
};

export type AutoTaskConfig = {
  triggerConditionList: AutoTaskTriggerConditionConfig[];
  executeActionList: AutoTaskExecuteActionConfig[];
};

export type TriggerCondition = {
  key: string;
  name: string;
  minutes?: number;
};

export type ExecuteAction = {
  deviceType: string;
  actionValue: string | null;
};

export type AutomationTaskListItem = {
  taskCode: string;
  taskName: string;
  triggerConditionList: TriggerCondition[];
  executeActionList: ExecuteAction[];
  triggerConditionStr: string;
  executeActionStr: string;
  latestRunAt: string;
  taskStartTime: string;
  keepLightFlag: boolean;
  keepMinutes: number;
  status: AutomationTaskStatus;
  runStatus: AutomationTaskRunStatus;
  runStatusDesc: string;
};

export type QueryAutomationTaskListParams = {
  keyword?: string;
  statusList: AutomationTaskStatus[];
  pageNum: number;
  pageSize: number;
};

export type QueryAutomationTaskListResponse = {
  total: number;
  taskList: AutomationTaskListItem[];
};

export type QueryAutomationTaskNameOptionsParams = {
  keyword?: string;
};

export type SelectOption = { label: string; value: string };

export type QueryAutomationTaskNameOptionsResponse = {
  taskList: SelectOption[];
};

export type OperateAutomationTaskParams = {
  taskCode: string;
  operateType: 'stop' | 'recovery' | 'close';
};

export type OperateAutomationTaskResponse = {
  success: boolean;
};

export type SaveAutomationTaskParams = {
  taskCode: string;
  taskName: string;
  triggerConditionList: TriggerCondition[];
  executeActionList: ExecuteAction[];
  taskStartTime: string;
  keepLightFlag?: boolean;
  keepMinutes?: number;
};

export type SaveAutomationTaskResponse = {
  taskCode: string;
  taskName: string;
  success?: boolean;
  message?: string;
};

export type GenerateTaskCodeResponse = {
  taskCode: string;
};
export type QueryAutomationTaskDetailResponse = AutomationTaskListItem;
