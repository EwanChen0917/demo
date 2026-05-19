export enum DraftStatusNo {
  无需操作 = -1,
  未开始 = 0,
  在制 = 1,
  已上报 = 3,
  已驳回 = 4,
  上报失败 = 5,
  待上报 = 6,
}

export enum BudgetGroup {
  非预算组 = 0,
  预算组 = 1,
}

export enum BudgetSource {
  预算方案 = 1,
  预算编制管理 = 2,
  预算编制台 = 3,
  预算方案进度详情 = 4,
  预算编制管理进度详情 = 5,
}

export enum NowStepCode {
  一稿 = 1,
  二稿 = 2,
  三稿 = 3,
}

export enum BudgetRole {
  部门 = 1,
  个人 = 2,
}