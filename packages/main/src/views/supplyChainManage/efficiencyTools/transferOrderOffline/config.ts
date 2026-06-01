export enum ORDER_STATUS {
  PENDING_CONFIRMATION = 100,
  PENDING_PICKING = 200,
  IN_TRANSIT = 300,
  COMPLETED = 400,
  CANCELLED = 500,
}
export enum ORDER_BIG_STATUS {
  PENDING_CONFIRMATION = 100,
  PENDING_PICKING = 200,
  IN_TRANSIT = 300,
  COMPLETED = 400,
  CANCELLED = 500,
}
export enum ORDER_TYPE {
  中仓 = 'CN_WAREHOUSE',
  工厂直发 = 'FACTORY_DIRECT',
  虚仓调拨 = 'VIRTUAL_TRANSFER',
}
export const BOXTYPEMAP = {
  single: 1,
  mix: 2,
  all: 3,
};
export type baseBoxType = 'single' | 'mix' | 'all';
export const BOXTYPEMAPREVERSE: Record<number, baseBoxType> = { 1: 'single', 2: 'mix', 3: 'all' };
