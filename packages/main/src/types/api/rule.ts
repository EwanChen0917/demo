export enum RulePointEventType {
  新注册用户 = 1,
  填写收货地址 = 2,
  '填写怀孕/哺乳阶段' = 3,
  下单 = 4,
  忠实积分奖励 = 5,
  订阅 = 6,
  Facebook = 7,
  Instagram = 8,
  Pinterest = 9,
  关注社媒 = 99999,
}

export enum RulePointStatus {
  开启 = 1,
  关闭 = 2,
}

export enum RuleMemberExpressionType {
  订单数量 = 1,
  订单金额 = 2,
}

export enum RuleMemberLevel {
  铜牌 = 1,
  银牌 = 2,
  黄金 = 3,
  铂金 = 4,
  钻石 = 5,
}

export enum RuleMemberLevelCode {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
}
