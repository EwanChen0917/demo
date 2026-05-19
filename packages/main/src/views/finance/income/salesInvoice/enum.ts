// 状态
export enum status {
  暂存 = 1,
  已审核 = 2,
}

export const statusMap = {
  [status.暂存]: '暂存',
  [status.已审核]: '已审核',
};

export const statusColorMap = {
  [status.暂存]: 'yellow',
  [status.已审核]: 'green',
};
