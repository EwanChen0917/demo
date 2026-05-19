// 状态
export enum status {
  草稿 = 0,
  已发布 = 1,
}

export const statusMap = {
  [status.草稿]: '草稿',
  [status.已发布]: '已发布',
};

export const statusColorMap = {
  [status.草稿]: 'gray',
  [status.已发布]: 'green',
};

// 调整单据状态
export enum adjustTypeStatus {
  创建失败 = 1,
  初始化 = 0,
  审批中 = 10,
  已通过 = 11,
  已驳回 = 12,
  已撤销 = 13,
  待办中 = 20,
  已完成 = 21,
  已删除 = 22,
}

export const adjustTypeStatusMap = [
  { label: '创建失败', value: adjustTypeStatus.创建失败 },
  { label: '初始化(未推送)', value: adjustTypeStatus.初始化 },
  { label: '审批中', value: adjustTypeStatus.审批中 },
  { label: '已通过', value: adjustTypeStatus.已通过 },
  { label: '已驳回', value: adjustTypeStatus.已驳回 },
  { label: '已撤销', value: adjustTypeStatus.已撤销 },
  { label: '待办中', value: adjustTypeStatus.待办中 },
  { label: '已完成', value: adjustTypeStatus.已完成 },
  { label: '已删除', value: adjustTypeStatus.已删除 },
];

export const adjustTypeStatusColorMap = {
  [adjustTypeStatus.创建失败]: 'gray',
  [adjustTypeStatus.初始化]: 'gray',
  [adjustTypeStatus.审批中]: 'green',
  [adjustTypeStatus.已通过]: 'green',
  [adjustTypeStatus.已驳回]: 'red',
  [adjustTypeStatus.已撤销]: 'red',
  [adjustTypeStatus.待办中]: 'green',
  [adjustTypeStatus.已完成]: 'green',
  [adjustTypeStatus.已删除]: 'red',
};

// 预算执行单据
export enum executeStatus {
  创建失败 = 1,
  初始化 = 0,
  审批中 = 10,
  已通过 = 11,
  已驳回 = 12,
  已撤销 = 13,
  待办中 = 20,
  已完成 = 21,
  已删除 = 22,
  已支付 = 200,
}

export const executeStatusMap = [
  { label: '创建失败', value: executeStatus.创建失败 },
  { label: '初始化(未推送)', value: executeStatus.初始化 },
  { label: '审批中', value: executeStatus.审批中 },
  { label: '已通过', value: executeStatus.已通过 },
  { label: '已驳回', value: executeStatus.已驳回 },
  { label: '已撤销', value: executeStatus.已撤销 },
  { label: '待办中', value: executeStatus.待办中 },
  { label: '已完成', value: executeStatus.已完成 },
  { label: '已删除', value: executeStatus.已删除 },
  { label: '已支付', value: executeStatus.已支付 },
];

export const executeStatusColorMap = {
  [executeStatus.创建失败]: 'gray',
  [executeStatus.初始化]: 'gray',
  [executeStatus.审批中]: 'green',
  [executeStatus.已通过]: 'green',
  [executeStatus.已驳回]: 'red',
  [executeStatus.已撤销]: 'red',
  [executeStatus.待办中]: 'green',
  [executeStatus.已完成]: 'green',
  [executeStatus.已删除]: 'red',
  [executeStatus.已支付]: 'green',
};
// 预算状态
export enum budgetStatus {
  锁定 = 'locked',
  占用 = 'occupied',
  待执行 = 'pending',
  执行中 = 'executing',
  完成 = 'completed',
  取消 = 'cancelled',
}

export const budgetStatusMap = [
  { label: '锁定', value: budgetStatus.锁定 },
  { label: '占用', value: budgetStatus.占用 },
  { label: '待执行', value: budgetStatus.待执行 },
  { label: '执行中', value: budgetStatus.执行中 },
  { label: '完成', value: budgetStatus.完成 },
  { label: '取消', value: budgetStatus.取消 },
];
export const budgetStatusColorMap = {
  [budgetStatus.锁定]: 'yellow',
  [budgetStatus.占用]: 'yellow',
  [budgetStatus.待执行]: 'gray',
  [budgetStatus.执行中]: 'green',
  [budgetStatus.完成]: 'green',
  [budgetStatus.取消]: 'red',
};
