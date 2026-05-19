export const ClaimType = [
  {
    label: '头程',
    value: 1,
  },
  {
    label: '尾程',
    value: 2,
  },
  {
    label: '退货到海外仓',
    value: 3,
  },
];

export const ClaimGroupType = [
  {
    label: '丢件赔偿',
    value: 1,
  },
  {
    label: '货损',
    value: 2,
  },
  {
    label: '海关扣件',
    value: 3,
  },
  {
    label: '运输时效延误',
    value: 4,
  },
];

export const ClaimStandard = [
  {
    label: '按货值+运费赔偿',
    value: 1,
  },
  {
    label: '减免运费',
    value: 2,
  },
];

export enum ClaimStatusEnum {
  '已生效' = 1,
  '已废弃' = 2,
}

export const ClaimStatus = [
  {
    label: '已生效',
    value: 1,
  },
  {
    label: '已废弃',
    value: 2,
  },
];

export const getEnumLabel = (list, value)=>{
  return list.find(item=>item.value === value)?.label || ''
}

