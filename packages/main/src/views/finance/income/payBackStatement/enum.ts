// 执行状态
export enum taskStatus {
  待执行 = 0,
  进行中 = 1,
  已完成 = 2,
  失败 = 3,
}

export const taskStatusMap = {
  [taskStatus.待执行]: '待执行',
  [taskStatus.进行中]: '进行中',
  [taskStatus.已完成]: '已完成',
  [taskStatus.失败]: '失败',
};

export const taskColorMap = {
  [taskStatus.待执行]: 'gray',
  [taskStatus.进行中]: 'blue',
  [taskStatus.已完成]: 'green',
  [taskStatus.失败]: 'red',
};

export const progressStatusMap = {
  [taskStatus.待执行]: undefined,
  [taskStatus.进行中]: undefined,
  [taskStatus.已完成]: 'success',
  [taskStatus.失败]: 'exception',
};

// 推送状态
export enum pushStatus {
  未推送 = 0,
  已推送 = 2,
  推送失败 = 3,
}

export const pushStatusMap = {
  [pushStatus.未推送]: '未推送',
  [pushStatus.已推送]: '已推送',
  [pushStatus.推送失败]: '推送失败',
};

export const pushColorMap = {
  [pushStatus.未推送]: 'gray',
  [pushStatus.已推送]: 'green',
  [pushStatus.推送失败]: 'red',
};
