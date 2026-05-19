export enum DiscountType {
  直降 = 1,
  Coupon = 2,
  秒杀 = 3,
  PED = 4,
  CODE = 5,
  BD = 6,
}

export const DiscountTypeMap = {
  [DiscountType.直降]: '直降',
  [DiscountType.Coupon]: 'Coupon',
  [DiscountType.秒杀]: '秒杀',
  [DiscountType.PED]: 'PED',
  [DiscountType.CODE]: 'CODE',
  [DiscountType.BD]: 'BD',
};

export const DiscountTypeColorMap = {
  [DiscountType.直降]: 'green',
  [DiscountType.Coupon]: 'yellow',
  [DiscountType.PED]: 'blue',
  [DiscountType.CODE]: 'green',
  [DiscountType.BD]: 'yellow',
};

export const discountTypeOptions = [
  { value: DiscountType.直降, label: DiscountTypeMap[DiscountType.直降] },
  { value: DiscountType.Coupon, label: DiscountTypeMap[DiscountType.Coupon] },
  { value: DiscountType.秒杀, label: DiscountTypeMap[DiscountType.秒杀] },
  { value: DiscountType.PED, label: DiscountTypeMap[DiscountType.PED] },
  { value: DiscountType.CODE, label: DiscountTypeMap[DiscountType.CODE] },
  { value: DiscountType.BD, label: DiscountTypeMap[DiscountType.BD] },
];

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'red',
  3: 'yellow',
};
export const statusColorMapOA = {
  0: 'gray',
  1: 'yellow',
  2: 'green',
  3: 'red',
};
export const statusList = [
  { label: '待审核', value: 0 },
  { label: '审核通过', value: 1 },
  { label: '已驳回', value: 2 },
];
