// 状态
export enum status {
  待发布 = 0,
  待认领 = 1,
  认领客户 = 2,
  部分认领 = 3,
  全部认领 = 4,
}

export const statusMap = {
  [status.待发布]: '待发布',
  [status.待认领]: '待认领',
  [status.认领客户]: '认领客户',
  [status.部分认领]: '部分认领',
  [status.全部认领]: '全部认领',
};

export const statusColorMap = {
  [status.待发布]: 'gray',
  [status.待认领]: 'yellow',
  [status.认领客户]: 'blue',
  [status.部分认领]: 'blue',
  [status.全部认领]: 'green',
};
