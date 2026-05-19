import { ActivityContracts } from '@/api/index';

export enum ActivityType {
  抽奖 = 1,
}

export enum ActivityStatus {
  开启 = 1,
  关闭 = 2,
}

export enum ActivityPrizeLevel {
  一等奖 = 1,
  二等奖 = 2,
  三等奖 = 3,
  四等奖 = 4,
  五等奖 = 5,
}

export enum ActivityPrizePointLevel {
  '30积分' = 30,
  '50积分' = 50,
  '100积分' = 100,
}

export enum ActivityPrizeConfigLevel {
  梯队1 = 1,
  梯队2 = 2,
  梯队3 = 3,
}

export enum ActivityPrizeType {
  商品 = 1,
  积分 = 2,
}

export type ActivityPrizeBean = ActivityContracts.ActivityPrizeBean & {
  pointPrizes?: ActivityContracts.ActivityPrizeBean[];
};
