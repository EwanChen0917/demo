// 状态
export enum status {
  未核销 = 3,
  部分核销 = 2,
  全部核销 = 1,
}

export const statusMap = {
  [status.未核销]: '未核销',
  [status.部分核销]: '部分核销',
  [status.全部核销]: '全部核销',
};

export const statusColorMap = {
  [status.未核销]: 'gray',
  [status.部分核销]: 'blue',
  [status.全部核销]: 'green',
};
