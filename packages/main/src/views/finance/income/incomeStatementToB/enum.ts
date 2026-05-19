// 核销状态
export enum writeOffStatus {
  全部核销 = 1,
  部分核销 = 2,
  未核销 = 3,
}

export const writeOffStatusMap = [
  { name: '全部核销', code: writeOffStatus.全部核销 },
  { name: '部分核销', code: writeOffStatus.部分核销 },
  { name: '未核销', code: writeOffStatus.未核销 },
];

export const writeOffStatusColorMap = {
  [writeOffStatus.全部核销]: 'green',
  [writeOffStatus.部分核销]: 'blue',
  [writeOffStatus.未核销]: 'gray',
};

// 开票状态
export enum billingStatus {
  全部开票 = 1,
  部分开票 = 2,
  未开票 = 3,
}

export const billingStatusMap = [
  { name: '全部开票', code: billingStatus.全部开票 },
  { name: '部分开票', code: billingStatus.部分开票 },
  { name: '未开票', code: billingStatus.未开票 },
];

export const billingStatusColorMap = {
  [billingStatus.全部开票]: 'green',
  [billingStatus.部分开票]: 'blue',
  [billingStatus.未开票]: 'gray',
};
