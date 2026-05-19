// 状态
export enum status {
  未开始 = 0,
  生成中 = 1,
  生成成功 = 2,
  生成失败 = 3,
}

export const statusColorMap = {
  [status.未开始]: 'gray',
  [status.生成中]: 'yellow',
  [status.生成成功]: 'green',
  [status.生成失败]: 'red',
};
