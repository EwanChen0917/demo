/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** FileBean */
export interface FileBean {
  fileName?: string;
  ossKey?: string;
}

/** MemberBean */
export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /** 员工所属所有部门信息 */
  allDepts?: string[];
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /** 直属领导id */
  managerUserid?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /** 职称 */
  title?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** MemberDeptInfoBean */
export interface MemberDeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 一级部门id
   * @format int64
   */
  firstDeptId?: number;
  /** 一级部门名称 */
  firstDeptName?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
  /**
   * 二级部门id
   * @format int64
   */
  secondDeptId?: number;
  /** 二级部门名称 */
  secondDeptName?: string;
  /**
   * 三级部门id
   * @format int64
   */
  thirdDeptId?: number;
  /** 三级部门名称 */
  thirdDeptName?: string;
}

/** MetaOperatorQueryResp */
export interface MetaOperatorQueryResp {
  /** 运营人员列表 */
  memberList?: MemberBean[];
}

/** PdtLineCountBean */
export interface PdtLineCountBean {
  /** 品线编码 */
  lineCode?: string;
  /** 品线名称 */
  lineName?: string;
  /**
   * 商品数量
   * @format int32
   */
  productNumber?: number;
}

/** PdtNewProductResponse */
export interface PdtNewProductResponse {
  /**
   * 实际概念评审时间
   * @format date-time
   */
  actualConceptReviewTime?: string;
  /**
   * 实际开发周期
   * @format int64
   */
  actualDevelopDay?: number;
  /**
   * 实际上架时间
   * @format date-time
   */
  actualListingTime?: string;
  /**
   * 实际下单评审时间
   * @format date-time
   */
  actualOrderReviewTime?: string;
  /**
   * 实际立项评审时间
   * @format date-time
   */
  actualProjectReviewTime?: string;
  /**
   * 审批状态 1-审批中 2-已通过 3-已驳回
   * @format int32
   */
  approvalStatus?: number;
  /** 品牌编码 */
  brand?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 四级分类编码 */
  categoryFourCode?: string;
  /** 三级分类编码 */
  categoryThreeCode?: string;
  /** 二级分类编码 */
  categoryTwoCode?: string;
  /**
   * 实际charter时间
   * @format date-time
   */
  charterActDate?: string;
  /**
   * 预计charter时间
   * @format date-time
   */
  charterEstDate?: string;
  /**
   * 预计概念评审时间
   * @format date-time
   */
  conceptReviewTime?: string;
  /**
   * 实际可获得性决策时间
   * @format date-time
   */
  decisionActDate?: string;
  /**
   * 预计可获得性决策时间
   * @format date-time
   */
  decisionEstDate?: string;
  /**
   * 开发周期缩短
   * @format double
   */
  developPeriodRate?: number;
  /** 附件 */
  fileList?: FileBean[];
  /** MPC-首单交付计划 */
  firstDeliveryPlan?: number;
  /**
   * MPC目标-首单交付数量
   * @format int64
   */
  firstDeliveryQuantity?: number;
  /** 首单实际下单量 */
  firstOrderActualQuantity?: number;
  /** 实际-首单按时交付达成总数 */
  firstOrderDeliveryCount?: number;
  /** 首单按时交付达成明细表 */
  firstOrderDeliveryDetail?: string;
  /** 首单交付达成状态 */
  firstOrderStatusDesc?: string;
  /** 四级分类名称 */
  fourCategoryName?: string;
  /** GMV目标 */
  gmvGoal?: number;
  /** GTM人员 */
  gtm?: string;
  /** GTM人员 */
  gtmName?: string;
  /**
   * 上架延期时间
   * @format int64
   */
  listingDelayDay?: number;
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /**
   * 预计下单评审时间
   * @format date-time
   */
  orderReviewTime?: string;
  /**
   * 计划开发周期
   * @format int64
   */
  planDevelopDay?: number;
  /**
   * 是否年规
   * @format int32
   */
  planFlag?: number;
  /** 是否年规描述 */
  planFlagDesc?: string;
  /**
   * 月份
   * @format int32
   */
  planMonth?: number;
  /**
   * 实际计划评审时间
   * @format date-time
   */
  planRevActDate?: string;
  /**
   * 预计计划评审时间
   * @format date-time
   */
  planRevEstDate?: string;
  /**
   * 预计中仓入库时间
   * @format date-time
   */
  planStockTime?: string;
  /**
   * 年规时间
   * @format date-time
   */
  planTime?: string;
  /**
   * 年份
   * @format int32
   */
  planYear?: number;
  /** 售价 */
  price?: number;
  /** 产品类别编码 */
  productCategoryCode?: string;
  /** 五级分类 */
  productCategoryName?: string;
  /** 新产品编码-前端隐藏 */
  productCode?: string;
  /** 产品等级 */
  productLevel?: string;
  /** 产线编码-前端隐藏 */
  productLineCode?: string;
  /** 产品品线 */
  productLineName?: string;
  /** 新产品名称 */
  productName?: string;
  /** 产品经理 */
  productOwner?: string;
  /** 产品经理编码-前端隐藏 */
  productOwnerCode?: string;
  /** 产品经理头像- */
  productOwnerImageList?: string[];
  /** 产品定位 */
  productPosition?: string;
  /** 产品属性 */
  productProperty?: string;
  /** 产品SPU编码 */
  productSpu?: string;
  /**
   * 产品状态 0-正常 1-延期 2-取消
   * @format int32
   */
  productStatus?: number;
  /** 产品状态 0-正常 1-延期 2-取消 */
  productStatusDesc?: string;
  /** 毛利率目标 */
  profitRateGoal?: number;
  /**
   * 实际立项启动时间
   * @format date-time
   */
  projStartActDate?: string;
  /**
   * 预计立项启动时间
   * @format date-time
   */
  projStartEstDate?: string;
  /** 项目经理编码 */
  projectOwner?: string;
  /** 项目经理名称 */
  projectOwnerName?: string;
  /**
   * 预计立项评审时间
   * @format date-time
   */
  projectReviewTime?: string;
  /** 变更记录 */
  recordList?: PdtProductRecordResponse[];
  /** 备注 */
  remark?: string;
  /**
   * 产品评分
   * @format double
   */
  star?: number;
  /** 状态 */
  status?: string;
  /**
   * 入中仓延期时间
   * @format int64
   */
  stockDelayDay?: number;
  /** 入中仓状态 */
  stockStatusDesc?: string;
  /**
   * 实际中仓入库时间
   * @format date-time
   */
  stockTime?: string;
  /** 三级分类名称 */
  threeCategoryName?: string;
  /**
   * 年规月份
   * @format int32
   */
  titleMonth?: number;
  /**
   * 年规年份
   * @format int32
   */
  titleYear?: number;
  topCategoryCode?: string;
  /** 一级分类 */
  topCategoryName?: string;
  /** 二级分类名称 */
  twoCategoryName?: string;
}

/** PdtProductAnalysisResponse */
export interface PdtProductAnalysisResponse {
  productManagerList?: ProductManager[];
  /**
   * 产品总数
   * @format int32
   */
  totalProductCount?: number;
}

/** PdtProductCancelReq */
export interface PdtProductCancelReq {
  /** 附件/图片 */
  fileList?: FileBean[];
  /** 产品编码 */
  productCode: string;
  /** 更新原因/取消原因 */
  reason: string;
}

/** PdtProductComplianceRateTrendencyResponse */
export interface PdtProductComplianceRateTrendencyResponse {
  /** 产品达标率趋势列表 */
  trendencyList?: ProductComplianceRate[];
}

/** PdtProductCurrentMonthHandleReq */
export interface PdtProductCurrentMonthHandleReq {
  /**
   * 月
   * @format int32
   */
  month?: number;
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** PdtProductCurrentMontyHandleResp */
export interface PdtProductCurrentMontyHandleResp {
  /**
   * 当月实际交付率
   * @format double
   */
  monthHandleRate?: number;
  /**
   * 当月交付新品数量
   * @format int32
   */
  newPdtCount?: number;
}

/** PdtProductDeleteReq */
export interface PdtProductDeleteReq {
  /** 新品年规编码 */
  productCode?: string;
}

/** PdtProductLineAnalysis */
export interface PdtProductLineAnalysis {
  /**
   * 产线产品比例
   * @format double
   */
  lineProductRate?: number;
  /**
   * 产品个数
   * @format int32
   */
  productCount?: number;
  /** 产线编码 */
  productLineCode?: string;
  /** 产线名称 */
  productLineName?: string;
}

/** PdtProductManagerReq */
export interface PdtProductManagerReq {
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** PdtProductOperateReq */
export interface PdtProductOperateReq {
  /** 操作类型 disable-暂停 enable-启用 */
  operateType?: string;
  /** 产品编码 */
  productCodeList: string[];
}

/** PdtProductOperationResp */
export interface PdtProductOperationResp {
  /**
   * 操作时间
   * @format date-time
   */
  createTime?: string;
  /** 对象编码 */
  itemCode?: string;
  /** 对象内容 */
  itemContent?: string;
  /** 对象类型 */
  itemType?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
}

/** PdtProductOperationResponse */
export interface PdtProductOperationResponse {
  /** 操作日志列表 */
  operationRespList?: PdtProductOperationResp[];
}

/** PdtProductPageResponse */
export interface PdtProductPageResponse {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果列表 */
  recordList?: PdtNewProductResponse[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PdtProductRecordResponse */
export interface PdtProductRecordResponse {
  /**
   * 操作类型 操作动作 1-更新上架时间 2-取消产品 3-更新评分
   * @format int32
   */
  actionType?: number;
  /** 更新内容 */
  content?: string;
  /**
   * 操作时间
   * @format date-time
   */
  handleTime?: string;
  /** 操作人 */
  handler?: string;
  /** 操作人头像 */
  handlerImage?: string;
  /** 产品编码 */
  productCode?: string;
  /** 产品 */
  productName?: string;
  /** 更新原因 */
  reason?: string;
}

/** PdtProductReq */
export interface PdtProductReq {
  /** 年份 */
  yearList?: number[];
}

/** PdtProductStarAndDelayAnalysisResponse */
export interface PdtProductStarAndDelayAnalysisResponse {
  /**
   * 年度平均评分值
   * @format double
   */
  avgStar?: number;
  /**
   * 年度延期差统计
   * @format int32
   */
  delayCount?: number;
}

/** PdtProductStarReq */
export interface PdtProductStarReq {
  /** 产品编码 */
  productCode: string;
  /** 更新原因 */
  reason?: string;
  /**
   * 评分
   * @format double
   * @min 0
   * @exclusiveMin false
   * @max 5
   * @exclusiveMax false
   */
  star: number;
}

/** PdtProductStartAndDelayReq */
export interface PdtProductStartAndDelayReq {
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** PdtProductSummaryBean */
export interface PdtProductSummaryBean {
  /** 总周期开发缩短 */
  allDevelopPeriodPercentage?: string;
  /**
   * 取消数量
   * @format int32
   */
  cancelledCount?: number;
  /** 取消数量占比 */
  cancelledPercentage?: string;
  /**
   * 概念阶段数量
   * @format int32
   */
  conceptStageCount?: number;
  /** 概念阶段数量占比 */
  conceptStagePercentage?: string;
  /**
   * 延期数量
   * @format int32
   */
  delayedCount?: number;
  /** 延期数量占比 */
  delayedPercentage?: string;
  /**
   * 进行中
   * @format int32
   */
  doing?: number;
  /**
   * 进行中正常
   * @format int32
   */
  doingCommonCount?: number;
  /**
   * 进行中延期
   * @format int32
   */
  doingDelayCount?: number;
  /** 进行中数量占比 */
  doingPercentage?: string;
  /**
   * 如期
   * @format int32
   */
  listingStageCommonCount?: number;
  /** 如期数量占比 */
  listingStageCommonPercentage?: string;
  /**
   * 上架阶段数量
   * @format int32
   */
  listingStageCount?: number;
  /**
   * 延期
   * @format int32
   */
  listingStageDelayCount?: number;
  /** 延期数量占比 */
  listingStageDelayPercentage?: string;
  /**
   * 提前
   * @format int32
   */
  listingStageEarlyCount?: number;
  /** 提前数量占比 */
  listingStageEarlyPercentage?: string;
  /** 上架阶段数量占比 */
  listingStagePercentage?: string;
  /**
   * 正常数量
   * @format int32
   */
  normalCount?: number;
  /** 正常数量占比 */
  normalPercentage?: string;
  /**
   * 下单阶段数量
   * @format int32
   */
  orderStageCount?: number;
  /** 下单阶段数量占比 */
  orderStagePercentage?: string;
  /**
   * 立项阶段数量
   * @format int32
   */
  projectStageCount?: number;
  /** 立项阶段数量占比 */
  projectStagePercentage?: string;
  /**
   * 如期
   * @format int32
   */
  stockStageCommonCount?: number;
  /** 如期数量占比 */
  stockStageCommonPercentage?: string;
  /**
   * 中仓入库阶段数量
   * @format int32
   */
  stockStageCount?: number;
  /**
   * 延期
   * @format int32
   */
  stockStageDelayCount?: number;
  /** 延期数量占比 */
  stockStageDelayPercentage?: string;
  /**
   * 提前
   * @format int32
   */
  stockStageEarlyCount?: number;
  /** 提前数量占比 */
  stockStageEarlyPercentage?: string;
  /** 中仓入库阶段数量占比 */
  stockStagePercentage?: string;
  /**
   * 总数量
   * @format int32
   */
  totalCount?: number;
}

/** PdtProductTableReq */
export interface PdtProductTableReq {
  /** 实际概念评审时间 */
  actualConceptReviewTime?: string;
  /** 实际下单评审时间 */
  actualOrderReviewTime?: string;
  /** 实际立项评审时间 */
  actualProjectReviewTime?: string;
  /** 预计概念评审时间 */
  conceptReviewTime?: string;
  /** 是否导出 */
  isExport?: boolean;
  /**
   * 产品线
   * @format int64
   */
  lineCode?: number;
  /**
   * 上架状态 1-如期 0-延期
   * @format int32
   */
  listingStatus?: number;
  /**
   * 预计上架时间结束
   * @format date-time
   */
  listingTimeEnd?: string;
  /**
   * 预计上架时间开始
   * @format date-time
   */
  listingTimeStart?: string;
  /**
   * 月份
   * @format int32
   */
  month?: number;
  /** 预计下单评审时间 */
  orderReviewTime?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /**
   * 是否年规 1-是 0-否
   * @format int32
   */
  planFlag?: number;
  /**
   * 预计月份
   * @format int32
   */
  planMonth?: number;
  /**
   * 预计中仓入库时间结束
   * @format date-time
   */
  planStockTimeEnd?: string;
  /**
   * 预计中仓入库时间开始
   * @format date-time
   */
  planStockTimeStart?: string;
  /**
   * 预计年份
   * @format int32
   */
  planYear?: number;
  /** 五级分类列表 */
  productCategoryCodeList?: string[];
  /** 产品编码 */
  productCode?: string;
  /** 产品编码 */
  productCodeList?: string[];
  /** 产品等级 */
  productLevel?: string;
  /** 品线编码列表 */
  productLineCodeList?: string[];
  /** 产品名称 - 支持模糊查询 */
  productName?: string;
  /** 产品经理编码 */
  productOwnerCode?: string;
  /** 类型 自研 联合开发 预研 */
  productProperty?: string;
  /**
   * 产品阶段 0-概念阶段 1-立项阶段 2-下单阶段 3-中仓入库阶段 4-上架阶段
   * @format int32
   */
  productStage?: number;
  /**
   * 产品状态 0-正常 1-延期 2-取消
   * @format int32
   */
  productStatus?: number;
  /** 产品状态集合  0-正常 1-延期 2-取消 */
  productStatusList?: number[];
  /** 项目经理编码 */
  projectOwnerCode?: string;
  /** 预计立项评审时间 */
  projectReviewTime?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 入中仓状态 1-如期 0-延期
   * @format int32
   */
  stockStatus?: number;
  /** 一级分类编码集合 */
  topCategoryCodeList?: string[];
  /** 排除要过滤掉的产品状态集合 0-正常 1-延期 2-取消 */
  unProductStatusList?: number[];
  /** 年份 */
  yearList?: number[];
}

/** PdtProductUpdateListingTimeReq */
export interface PdtProductUpdateListingTimeReq {
  /**
   * 实际上架时间
   * @format date-time
   */
  actualListingTime?: string;
  /** 附件/图片 */
  fileList?: FileBean[];
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /** 操作人 */
  operator?: string;
  /**
   * 预计中仓入库时间
   * @format date-time
   */
  planStockTime?: string;
  /** 产品编码 */
  productCode: string;
  /** 更新原因 */
  reason?: string;
  /**
   * 实际中仓入库时间
   * @format date-time
   */
  stockTime?: string;
  /**
   * 废弃，使用集合updateTypeList 更新类型 1-预计上架时间 2-实际上架时间 3-中仓入库时间 4-取消上架 5-预计中仓库入时间  6-编辑类型转预研
   * @format int32
   */
  updateType?: number;
  /** 更新类型 1-预计上架时间 2-实际上架时间 3-中仓入库时间 4-取消上架 5-预计中仓库入时间  6-编辑类型转预研 */
  updateTypeList: number[];
}

/** PdtProductUpdateReq */
export interface PdtProductUpdateReq {
  /**
   * 实际概念评审时间
   * @format date-time
   */
  actualConceptReviewTime?: string;
  /**
   * 实际下单评审时间
   * @format date-time
   */
  actualOrderReviewTime?: string;
  /**
   * 实际立项评审时间
   * @format date-time
   */
  actualProjectReviewTime?: string;
  /** 品牌 */
  brand?: string;
  /** 四级分类 */
  categoryFourCode?: string;
  /** 五级分类 */
  categoryLeafCode?: string;
  /** 三级分类 */
  categoryThreeCode?: string;
  /** 一级分类 */
  categoryTopCode?: string;
  /** 二级分类 */
  categoryTwoCode?: string;
  /**
   * 实际charter时间
   * @format date-time
   */
  charterActDate?: string;
  /**
   * 预计charter时间
   * @format date-time
   */
  charterEstDate?: string;
  /**
   * 预计概念评审时间
   * @format date-time
   */
  conceptReviewTime?: string;
  /**
   * 实际可获得性决策时间
   * @format date-time
   */
  decisionActDate?: string;
  /**
   * 预计可获得性决策时间
   * @format date-time
   */
  decisionEstDate?: string;
  /** 附件/图片 */
  fileList?: FileBean[];
  /** MPC-首单交付计划 */
  firstDeliveryPlan?: string;
  /**
   * MPC目标-首单交付数量
   * @format int64
   */
  firstDeliveryQuantity?: number;
  /** GMV目标 */
  gmvGoal?: number;
  /** GTM人员 */
  gtm?: string;
  /**
   * 预计下单评审时间
   * @format date-time
   */
  orderReviewTime?: string;
  /**
   * 实际计划评审时间
   * @format date-time
   */
  planRevActDate?: string;
  /**
   * 预计计划评审时间
   * @format date-time
   */
  planRevEstDate?: string;
  /**
   * 年规年份
   * @format int32
   */
  planYear?: number;
  /** 售价 */
  price?: number;
  /** 产品编码 */
  productCode: string;
  /** 产品等级 */
  productLevel?: string;
  /** 产品品线 */
  productLineCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品经理编码 */
  productOwnerCode?: string;
  /** 产品定位 */
  productPosition?: string;
  /** 产品属性，即类型 */
  productProperty?: string;
  /** 产品编码 */
  productSpu?: string;
  /** 毛利率目标 */
  profitRateGoal?: number;
  /**
   * 实际立项启动时间
   * @format date-time
   */
  projStartActDate?: string;
  /**
   * 预计立项启动时间
   * @format date-time
   */
  projStartEstDate?: string;
  /** 项目经理 */
  projectOwner?: string;
  /**
   * 预计立项评审时间
   * @format date-time
   */
  projectReviewTime?: string;
  /** 备注 */
  remark?: string;
  /** 状态 */
  status?: string;
}

/** PdtProductYearLineAnalysisReq */
export interface PdtProductYearLineAnalysisReq {
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** PdtProductYearLineAnalysisResponse */
export interface PdtProductYearLineAnalysisResponse {
  /** 品线占比列表 */
  pdtProductLineAnalysisList?: PdtProductLineAnalysis[];
  /**
   * 品线总数
   * @format int32
   */
  totalLineCount?: number;
}

/** PdtProductYearReq */
export interface PdtProductYearReq {
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** PdtSpuCombineReq */
export interface PdtSpuCombineReq {
  /** 产品编码 */
  productCode?: string;
  /** spu编码 */
  spuCode?: string;
}

/** ProductComplianceRate */
export interface ProductComplianceRate {
  /**
   * 月份
   * @format int32
   */
  month?: number;
  /** 月份-名 */
  monthName?: string;
  /**
   * 达标率
   * @format double
   */
  rate?: number;
}

/** ProductLineResponse */
export interface ProductLineResponse {
  /** 产品线列表 */
  pdtProductLines?: PdtLineCountBean[];
}

/** ProductManager */
export interface ProductManager {
  /** 产品经理编码 */
  managerCode?: string;
  /** 产品经理头像链接 */
  managerImage?: string;
  /** 产品经理名称 */
  managerName?: string;
}

/** SpuYearTargetSummaryResp */
export interface SpuYearTargetSummaryResp {
  /** 一月销售目标 */
  month1?: number;
  /** 十月销售目标 */
  month10?: number;
  /** 十一月销售目标 */
  month11?: number;
  /** 十二月销售目标 */
  month12?: number;
  /** 二月销售目标 */
  month2?: number;
  /** 三月销售目标 */
  month3?: number;
  /** 四月销售目标 */
  month4?: number;
  /** 五月销售目标 */
  month5?: number;
  /** 六月销售目标 */
  month6?: number;
  /** 七月销售目标 */
  month7?: number;
  /** 八月销售目标 */
  month8?: number;
  /** 九月销售目标 */
  month9?: number;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** CommonResp«boolean» */
export interface CommonRespBoolean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: boolean;
  traceId?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
