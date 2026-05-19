// 地址类型枚举
export enum AddressTypeEnum {
  SENDER = 'SENDER',
  RETURN = 'RETURN',
  PICKUP = 'PICKUP',
}

// 地址类型下拉数据
export const AddressTypeOptions = [
  { label: '寄件地址', value: AddressTypeEnum.SENDER },
  { label: '退件地址', value: AddressTypeEnum.RETURN },
  { label: '揽收地址', value: AddressTypeEnum.PICKUP },
];
