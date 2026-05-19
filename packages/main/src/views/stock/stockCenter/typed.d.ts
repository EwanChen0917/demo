export type basePoolDataType = {
  id: string | number;
  poolCode: string | number;
  poolName: string;
  parentCode: number | string;
  level: string | number;
  priority: string | number;
  status: string | number;
  supportLock: string | number;
  isShared: string | number;
};

export interface basePoolOwnerShipType {
  id: string | number;
  ownershipCondition?: string;
  detail: string;
  status: number;
}
