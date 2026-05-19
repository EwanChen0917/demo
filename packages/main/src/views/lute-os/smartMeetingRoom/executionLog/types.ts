export type ExecutionStatus = '成功' | '失败' | '冲突拦截' | '待执行' | '关闭';

export type QueryExecutionOverviewParams = {
  date: string;
};

export type ExecutionTrendPoint = { hour: string; count: number };

export type DeviceOnlineStat = {
  deviceTypeName: string;
  deviceCount: number;
  onlineCount: number;
  onlineRate: number;
};

export type QueryExecutionOverviewResponse = {
  successRate: number;
  abnormalTaskCount: number;
  deviceOnlineCount: number;
  deviceTotalCount: number;
  deviceOfflineCount: number;
  deviceOnlineRate: number;
  taskExecutionCount: number;
  taskExecutionDeltaRate?: number;
  trend: ExecutionTrendPoint[];
  deviceOnlineStats: DeviceOnlineStat[];
};

export type QueryExecutionLogListParams = {
  startDate: string;
  endDate: string;
  status?: ExecutionStatus;
  roomCode?: string;
  pageNum: number;
  pageSize: number;
};

export type ExecutionLogListItem = {
  id: string;
  executionSerialNo: string;
  executedAt: string;
  taskName: string;
  taskCode: string;
  triggerSource: string;
  triggerCondition: string;
  executeAction: string;
  roomStr: string;
  durationText: string;
  status: string;
  statusDesc: string;
  roomName: string;
  meetingTime?: string;
  errorMsg?: string;
  detail?: string;
};

export type QueryExecutionLogListResponse = {
  total: number;
  executionLogList: ExecutionLogListItem[];
};
