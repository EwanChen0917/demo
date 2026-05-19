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

/** CheckRejectRecordResp */
export interface CheckRejectRecordResp {
  /** 驳回记录 */
  checkRejectRecordList?: CheckRejectRecordBean[];
}

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** DesignApprovalConfigDetailResp */
export interface DesignApprovalConfigDetailResp {
  /** 部门负责人对应的部门 id（来源类型=部门负责人） */
  approvalDeptIds?: number[];
  /** 固定员工列表（来源类型=固定员工） */
  approvalMembers?: DesignApprovalMemberItem[];
  /**
   * 审批来源类型
   * @format int32
   */
  approvalSourceType?: number;
  /** 审批来源类型描述 */
  approvalSourceTypeDesc?: string;
  /**
   * 审批类型
   * @format int32
   */
  approvalType?: number;
  /** 审批类型描述 */
  approvalTypeDesc?: string;
  /** 业务编码 */
  configCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 可提报部门 id 列表 */
  deptIds?: number[];
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 任务类型
   * @format int32
   */
  itemType?: number;
  /** 任务类型名称 */
  itemTypeName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
}

/** DesignApprovalConfigListItemBean */
export interface DesignApprovalConfigListItemBean {
  /**
   * 审批来源类型
   * @format int32
   */
  approvalSourceType?: number;
  /** 审批来源类型描述 */
  approvalSourceTypeDesc?: string;
  /**
   * 审批类型
   * @format int32
   */
  approvalType?: number;
  /** 审批类型描述 */
  approvalTypeDesc?: string;
  /** 审批人/来源展示文案 */
  approverDisplay?: string;
  /** 业务编码 */
  configCode?: string;
  /** 创建人 memberCode */
  creator?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 部门 id 列表 */
  deptIds?: number[];
  /** 部门名称（展示，多个拼接） */
  deptNamesDisplay?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 任务类型枚举值
   * @format int32
   */
  itemType?: number;
  /** 任务类型名称 */
  itemTypeName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignApprovalConfigListResp */
export interface DesignApprovalConfigListResp {
  code?: string;
  /** 配置列表 */
  list?: DesignApprovalConfigListItemBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignApprovalConfigSaveReq */
export interface DesignApprovalConfigSaveReq {
  /** 部门 id 列表（来源类型=部门负责人时必填） */
  approvalDeptIds?: number[];
  /** 固定员工（来源类型=固定员工时必填，多选） */
  approvalMembers?: DesignApprovalMemberItem[];
  /**
   * 审批来源类型 DesignApprovalSourceTypeEnum
   * @format int32
   */
  approvalSourceType: number;
  /**
   * 审批类型：1会签 2或签
   * @format int32
   */
  approvalType: number;
  /** 可提报部门 id，多选 */
  deptIds: number[];
  /**
   * 主键，编辑时必填
   * @format int64
   */
  id?: number;
  /**
   * 任务类型 DesignTaskItemTypeEnum
   * @format int32
   */
  itemType: number;
  /**
   * 状态：1启用 0禁止
   * @format int32
   */
  status: number;
}

/** DesignApprovalConfigSaveResp */
export interface DesignApprovalConfigSaveResp {
  /** 业务编码 */
  configCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
}

/** DesignApprovalMemberItem */
export interface DesignApprovalMemberItem {
  /** 员工 memberCode */
  memberCode: string;
  /** 员工姓名 */
  name: string;
}

/** DesignBrandBean */
export interface DesignBrandBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 品牌编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignBrandDetailResp */
export interface DesignBrandDetailResp {
  /** 记录编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
}

/** DesignBrandListQueryResp */
export interface DesignBrandListQueryResp {
  code?: string;
  /** 品牌集合 */
  designBrandList?: DesignBrandBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignBrandSaveReq */
export interface DesignBrandSaveReq {
  /** 记录编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
}

/** DesignDeptBean */
export interface DesignDeptBean {
  childDept?: DesignDeptBean;
  /** @format int64 */
  deptId?: number;
}

/** DesignDeptStatisticBean */
export interface DesignDeptStatisticBean {
  /** @format int32 */
  ataskNum?: number;
  /** @format int32 */
  btaskNum?: number;
  /** @format int32 */
  ctaskNum?: number;
  /** 部门编码 */
  deptCode?: string;
  /** 部门 */
  deptName?: string;
  /**
   * 综合好评度
   * @format double
   */
  evaluation?: number;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /** @format int32 */
  staskNum?: number;
  /**
   * 总分
   * @format double
   */
  sumScore?: number;
  /**
   * 验收总任务数量
   * @format int32
   */
  taskNum?: number;
  /**
   * 非年归项目
   * @format int32
   */
  unYearProjectNum?: number;
}

/** DesignDeptStatisticResp */
export interface DesignDeptStatisticResp {
  /** 部门总统计集合 */
  designDeptStatisticList?: DesignDeptStatisticBean[];
}

/** DesignItemTypeAuthResp */
export interface DesignItemTypeAuthResp {
  /**
   * 二期项目类型设计任务查看权限 1-有 0-没有
   * @format int32
   */
  secondStageItemTypeAuth?: number;
}

/** DesignOperationGroupBean */
export interface DesignOperationGroupBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 运营组名称 */
  name?: string;
  /** 运营组编码 */
  operatorGroupCode?: string;
  /** 运营组编码集合 */
  operatorGroupCodeList?: string[];
}

/** DesignOperationGroupDetailResp */
export interface DesignOperationGroupDetailResp {
  /**
   * 运营部门id
   * @format int64
   */
  deptId?: number;
  /** 运营部门父级结构树 */
  deptIdList?: number[];
  /** 设计师 */
  designerCodeList?: string[];
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 分组 */
  name?: string;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
}

/** DesignOperationGroupListQueryResp */
export interface DesignOperationGroupListQueryResp {
  code?: string;
  /** 配置类型及通知集合 */
  designOperationGroupList?: DesignOperationGroupQueryBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignOperationGroupQueryBean */
export interface DesignOperationGroupQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 运营部门父级结构树 */
  dept?: DesignDeptBean;
  /**
   * 运营部门id
   * @format int64
   */
  deptId?: number;
  /** 设计师 */
  designers?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 分组 */
  name?: string;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignOperationGroupSaveReq */
export interface DesignOperationGroupSaveReq {
  /**
   * 运营部门
   * @format int64
   */
  deptId: number;
  /** 设计师  逗号分割 */
  designers: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
}

/** DesignPdtLevelBean */
export interface DesignPdtLevelBean {
  /** 记录编码 */
  designPdtLevelCode?: string;
  /** 等级名称 */
  name?: string;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** DesignPdtLevelListResp */
export interface DesignPdtLevelListResp {
  /** 产品等级集合 */
  designPdtLevelList?: DesignPdtLevelBean[];
}

/** DesignScoreBean */
export interface DesignScoreBean {
  /** 记录编码 */
  designScoreCode?: string;
  /** 名称 */
  name?: string;
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /** 分数 */
  score?: number;
}

/** DesignScoreDetailResp */
export interface DesignScoreDetailResp {
  /** 设计周期 */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 名称 */
  name?: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 项目等级名称 */
  projectLevelName?: string;
  /** 分数 */
  score?: number;
  /** 编号 */
  serialCode?: string;
  /**
   * status
   * @format int32
   */
  status?: number;
  /** 任务类别 */
  type?: string;
  /** 任务类别名称 */
  typeName?: string;
}

/** DesignScoreListQueryResp */
export interface DesignScoreListQueryResp {
  code?: string;
  /** 设计分数集合 */
  designScoreList?: DesignScoreQueryBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignScoreQueryBean */
export interface DesignScoreQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 设计周期 */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 名称 */
  name?: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 项目等级名称 */
  projectLevelName?: string;
  /**
   * 分数
   * @format double
   */
  score?: number;
  /** 编号 */
  serialCode?: string;
  /**
   * status
   * @format int32
   */
  status?: number;
  /** 任务类别 */
  type?: string;
  /** 任务类别名称 */
  typeName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignScoreSaveReq */
export interface DesignScoreSaveReq {
  /**
   * 设计周期
   * @minLength 0
   * @maxLength 225
   */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 名称 */
  name: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 分数 */
  score: number;
  /** 编号 */
  serialCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
  /** 任务类别 */
  type?: string;
}

/** DesignScoreStatisticBean */
export interface DesignScoreStatisticBean {
  /** 任务评分 */
  acceptScore?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 合同编码 */
  contractCodeList?: string[];
  /**
   * 创建时间
   * @format date
   */
  createDate?: string;
  /** 设计师 */
  designer?: string;
  /** 用户满意度得分 */
  designerScore?: number;
  /**
   * 能效
   * @format int32
   */
  efficient?: number;
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /**
   * 完成时间
   * @format date
   */
  finishDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 项目标签 */
  itemTag?: string;
  /** 任务类型 */
  itemTypeDesc?: string;
  /** 项目等级 */
  levelDesc?: string;
  /** 任务名称 */
  name?: string;
  /** 得分 */
  score?: string;
  /** 二级部门名称 */
  secondDeptName?: string;
  /**
   * 开始时间
   * @format date
   */
  startDate?: string;
  /** 任务进度 */
  statusDesc?: string;
  /**
   * 提交时间
   * @format date
   */
  submitDate?: string;
  /** 任务内容 */
  taskInfo?: string;
  /** 项目类型 */
  taskTypeDesc?: string;
  /** 加急状态 */
  urgentDesc?: string;
}

/** DesignScoreStatisticReq */
export interface DesignScoreStatisticReq {
  /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
  designType?: string;
  /** 设计师编码 */
  designerCode?: string;
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
  itemType?: string;
  /** 关键词 任务名称/合同编码 */
  keyword?: string;
  /** 任务名称 */
  name?: string;
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 选择日期 */
  selectDate?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
}

/** DesignScoreStatisticResp */
export interface DesignScoreStatisticResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 分数统计集合 */
  scoreStatisticList?: DesignScoreStatisticBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignTaskBean */
export interface DesignTaskBean {
  /** 设计任务名称 */
  names?: string[];
  /** 日期 */
  periodDate?: string;
  /**
   * 状态 1-已提交 2-设计中
   * @format int32
   */
  status?: number;
}

/** DesignTaskChangeReq */
export interface DesignTaskChangeReq {
  /** 变更原因 */
  changeRemark: string;
  /** 合同编码 */
  contractCodeList?: string[];
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode?: string;
  /**
   * 截止日期
   * @format date
   */
  endDate: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 任务名称 */
  name: string;
  /** 上传文件ossKey */
  ossKeys?: UrlBean[];
  /** 产品/项目等级 */
  productLevel?: string;
  /** 任务清单 */
  productList: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 任务类型 */
  taskType?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskDetailResp */
export interface DesignTaskDetailResp {
  /** 任务评价 */
  acceptEvaluate?: string;
  /** 任务评分 */
  acceptScore?: number;
  /** 审批原因  审批驳回必填 */
  approveReason?: string;
  /** 权限控制 */
  auth?: DesignTaskQueryAuthorityBean;
  /** 品牌 */
  brandCode?: string;
  /**
   * 变更时间
   * @format date
   */
  changeDate?: string;
  /**
   * 判断当前操作人是否转让设计师接收人本人，是则1，否则0
   * @format int32
   */
  changeTip?: number;
  /** 合同编码 */
  contractCodeList?: string[];
  /**
   * 创建时间
   * @format date
   */
  createDate?: string;
  /** 是否创建人 */
  creatorFlag?: boolean;
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务记录编码 */
  designTaskCode?: string;
  /** 设计师 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /** 设计师集合 二期显示使用此参数-多个设计师 */
  designerInfoList?: DesignerInfoBean[];
  /** 对应设计师上传打分表后，在详情页展示附件并且可下载和预览 */
  designerScoreInfoList?: ScoreUrlBean[];
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /**
   * 完成日期
   * @format date
   */
  finishDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 创建人名称 */
  initiatorDesc?: string;
  /** 任务标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 项目类型名称 */
  itemTypeDesc?: string;
  /** 任务名称 */
  name?: string;
  /** 角色 */
  operator?: DesignTaskOperatorBean;
  /** 运营组 */
  operatorGroupCode?: string;
  /** 附件ossKeys */
  ossKeys?: UrlBean[];
  /**
   * 产品分类
   * @format int32
   */
  productCategoryCode?: number;
  /** 商品信息 */
  productInfoList?: ProductBean[];
  /** 产品等级 */
  productLevel?: string;
  /** 任务清单 */
  productList?: string;
  /**
   * 认领日期
   * @format date
   */
  receiveDate?: string;
  /** 驳回原因  验收驳回必填 */
  rejectReason?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusDesc?: string;
  /** 任务类型 */
  taskType?: string;
  /**
   * 提示标签
   * @format int32
   */
  tip?: number;
  /** 转让设计师名称 */
  transferDesignerDesc?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskFileUrlResp */
export interface DesignTaskFileUrlResp {
  /** 文件名称 */
  fileName?: string;
  /** 文件路径 */
  fileUrl?: string;
  /** 文件key */
  ossKey?: string;
}

/** DesignTaskItemType02ListResp */
export interface DesignTaskItemType02ListResp {
  /** 任务类型列表，顺序与枚举 itemType02 一致 */
  itemTypeList?: DesignTaskItemTypeOptionBean[];
}

/** DesignTaskItemTypeOptionBean */
export interface DesignTaskItemTypeOptionBean {
  /**
   * 项目类型编码
   * @format int32
   */
  itemType?: number;
  /** 项目类型名称 */
  itemTypeName?: string;
  /** 任务类型标识 taskType */
  taskType?: string;
}

/** DesignTaskListQueryReq */
export interface DesignTaskListQueryReq {
  /** 设计师 memberCode，多选 */
  designerCodeList?: string[];
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /** 创建人 memberCode，多选 */
  initiatorList?: string[];
  /**
   * 项目类型 选“全部“则不传
   * @format int32
   */
  itemType?: number;
  /** 任务名称 */
  name?: string;
  /** 运营组 ，选'全部'则不传 */
  operatorGroupCode?: string;
  /** 运营组编码集合 */
  operatorGroupCodeList?: string[];
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
  /** 产品等级字典 value，多选 */
  productLevelList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 查询类型 1-任务池，2-我的任务 3-待办中心
   * @format int32
   */
  selectType?: number;
  /**
   * 开始时间
   * @format date
   */
  startDate?: string;
}

/** DesignTaskListQueryResp */
export interface DesignTaskListQueryResp {
  /** 已提交/待认领任务集合 */
  acceptDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已提交/待认领数量
   * @format int64
   */
  acceptStatusNum?: number;
  /** 审批中任务集合 */
  approveDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 审批中数量
   * @format int64
   */
  approveStatusNum?: number;
  /** 已验收任务集合 */
  checkedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已验收数量
   * @format int64
   */
  checkedStatusNum?: number;
  code?: string;
  /**
   * 创建（提交）权限 0-无 1-有  -任务池
   * @format int32
   */
  createFlag?: number;
  /** 回收站任务集合 */
  deleteDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 回收站数量
   * @format int64
   */
  deleteStatusNum?: number;
  /** 当前分类下设计师   -任务池 */
  designerList?: DesignerBean[];
  /** 设计中任务集合 */
  designingDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 设计中数量
   * @format int64
   */
  designingStatusNum?: number;
  /** 待指派任务集合 */
  distributeDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待指派数量
   * @format int64
   */
  distributeStatusNum?: number;
  /** 已完成/待需求方验收任务集合 */
  finishedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已完成数量
   * @format int64
   */
  finishedStatusNum?: number;
  message?: string;
  /** 当前员工 */
  operator?: string;
  /** 当前员工所属运营组 */
  operatorGroupCode?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /** 待提交任务集合 */
  unCommitDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待提交数量
   * @format int64
   */
  unCommitStatusNum?: number;
  /** 待内部验收任务集合 */
  waitInnerCheckedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待内部验收数量
   * @format int64
   */
  waitInnerCheckedStatusNum?: number;
}

/** DesignTaskOperateReq */
export interface DesignTaskOperateReq {
  /** 任务评价 验收 */
  acceptEvaluate?: string;
  /** 任务评分 7-验收通过/12-评分 必填 */
  acceptScore?: number;
  /** 品牌 认领/转让必填 */
  brandCode?: string;
  /** 设计类型信息集合 转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode: string;
  /** 设计师 指派必填 */
  designerCode?: string;
  /** 设计师编码集合 3-审批操作-必填（二期设计类型中使用）; 7-验收驳回设计任务-必填（二期的必填）; 13-内部验收驳回-必填，支持多个设计师 */
  designerCodeList?: string[];
  /**
   * 截止日期 认领/转让必填 3-审批（二期设计类型中使用）选填
   * @format date
   */
  endDate?: string;
  /** 附件 7-验收驳回附件 6-完成任务附件 6-ID、CMF设计打分文件 */
  fileList?: UrlBean[];
  /** 项目标签 3-审批操作选填 */
  itemTag?: string;
  /**
   * 项目类型 认领/转让必填 3-审批操作（二期设计类型中使用）选填
   * @format int32
   */
  itemType?: number;
  /** 任务名称 */
  name?: string;
  /**
   * 操作状态 0-审批/验收驳回/转让认领取消/内部验收驳回 1-审批/验收通过/转让认领通过/内部验收通过  审批/验收必填
   * @format int32
   */
  operateStatus?: number;
  /**
   * 操作类型 查看OperationTypeEnum 1-草稿 2-提交 3-审批 4-认领 5-转让 6-完成 7-验收 8-指派 9-删除 11-取消 12-评分 13-内部验收
   * @format int32
   */
  operateType: number;
  /** 附件ossKeys */
  ossKeys?: UrlBean[];
  /**
   * 产品分类 认领/转让必填
   * @format int32
   */
  productCategoryCode?: number;
  /** 产品等级 3-审批操作（二期设计类型中使用）选填 */
  productLevel?: string;
  /** 清单 */
  productList?: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 驳回原因  3-审批 7-验收驳回必填  13-内部验收驳回必填 */
  rejectReason?: string;
  /** 驳回原因类型 7-验收驳回必填; change-需求变更；optimize-设计优化； 参考枚举DesignTaskRejectTypeEnum */
  rejectReasonType?: string;
  /** 任务评分 6-完成操作：ID、CMF设计评分增加填写总分 */
  scoreSum?: number;
  /** 任务类型 */
  taskType?: string;
  /** 任务完成链接 6-完成 */
  taskUrl?: string;
  /** 被转让人   转让/必填 */
  transferDesignerCode?: string;
  /**
   * 加急
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskOperationGroupQueryResp */
export interface DesignTaskOperationGroupQueryResp {
  /** 运营组 */
  operationGroupList?: DesignOperationGroupBean[];
}

/** DesignTaskOperatorBean */
export interface DesignTaskOperatorBean {
  /** 审批人 */
  approverFlag?: boolean;
  /** 创建人 */
  creatorFlag?: boolean;
  /** 是否设计总监 */
  designDirectorFlag?: boolean;
  /** 是否设计师 */
  designerFlag?: boolean;
  /** 运营组长 */
  operateGroupLeaderFlag?: boolean;
  /** 运营经理 */
  operateManagerFlag?: boolean;
  /** 是否特定人群，暂时默认配置 文键、诗琪。(即设计组长) */
  specificEmployeesFlag?: boolean;
}

/** DesignTaskPeriodViewResp */
export interface DesignTaskPeriodViewResp {
  /** 周期设计任务 */
  designTaskPeriodList?: DesignTaskBean[];
}

/** DesignTaskQueryAuthorityBean */
export interface DesignTaskQueryAuthorityBean {
  /**
   * 审批权限 0-无 1-有
   * @format int32
   */
  approveFlag?: number;
  /**
   * 取消权限 0-无 1-有
   * @format int32
   */
  cancelFlag?: number;
  /**
   * 转让权限 0-无 1-有
   * @format int32
   */
  changeFlag?: number;
  /**
   * 变更按钮权限 0-无 1-有
   * @format int32
   */
  changeTaskFlag?: number;
  /**
   * 验收权限 0-无 1-有
   * @format int32
   */
  checkFlag?: number;
  /**
   * 验收驳回权限 0-无 1-有
   * @format int32
   */
  checkRejectFlag?: number;
  /**
   * 是否显示合同编码 0-不显示 1-显示
   * @format int32
   */
  contractShowFlag?: number;
  /**
   * 创建（提交）权限 0-无 1-有
   * @format int32
   */
  createFlag?: number;
  /**
   * 删除权限 0-无 1-有
   * @format int32
   */
  deleteFlag?: number;
  /**
   * 派发权限 0-无 1-有
   * @format int32
   */
  distributeFlag?: number;
  /**
   * 编辑权限 0-无 1-有
   * @format int32
   */
  editFlag?: number;
  /**
   * 文件访问权限 0-无 1-有
   * @format int32
   */
  fileAccessAuth?: number;
  /**
   * 完成权限 0-无 1-有
   * @format int32
   */
  finishFlag?: number;
  /**
   * 认领权限 0-无 1-有
   * @format int32
   */
  getFlag?: number;
  /**
   * 内部验收权限 0-无 1-有
   * @format int32
   */
  innerCheckFlag?: number;
  /**
   * 内部验收驳回权限 0-无 1-有
   * @format int32
   */
  innerCheckRejectFlag?: number;
  /**
   * 评分权限 0-无 1-有
   * @format int32
   */
  scoreFlag?: number;
}

/** DesignTaskQueryBean */
export interface DesignTaskQueryBean {
  /** 任务评分 */
  acceptScore?: number;
  /**
   * 变更次数
   * @format int64
   */
  changeNum?: number;
  /** 设计任务记录编码 */
  designTaskCode?: string;
  /** 设计师 */
  designerCode?: string;
  /** 设计师集合 */
  designerCodeList?: string[];
  /** 设计师名称 */
  designerDesc?: string;
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 创建人名称 */
  initiatorDesc?: string;
  /** 任务标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 项目类型名称 */
  itemTypeDesc?: string;
  /** 任务名称 */
  name?: string;
  /**
   * 是否旧任务 1-是 0-不是 这个目前是平面物料（新）详情页判断展示新旧详情页面使用
   * @format int32
   */
  oldTaskFlag?: number;
  /** 运营组 */
  operatorGroupCode?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusDesc?: string;
  /**
   * 提示标签
   * @format int32
   */
  tip?: number;
}

/** DesignTaskSaveReq */
export interface DesignTaskSaveReq {
  /** 任务评价 验收 */
  acceptEvaluate?: string;
  /** 任务评分 验收通过必填 */
  acceptScore?: number;
  /** 品牌 */
  brandCode?: string;
  /** 合同编码集合 */
  contractCodeList?: string[];
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode?: string;
  /** 设计师 指派必填 */
  designerCode?: string;
  /**
   * 截止日期
   * @format date
   */
  endDate: string;
  /** initiator */
  initiator?: string;
  /** 项目标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 任务名称 */
  name: string;
  /**
   * 操作类型 1-草稿 2-提交 10-编辑
   * @format int32
   */
  operateType: number;
  /** 运营组 */
  operatorGroupCode: string;
  /** 上传文件ossKey */
  ossKeys?: UrlBean[];
  /**
   * 产品分类
   * @format int32
   */
  productCategoryCode?: number;
  /** 产品/项目等级 */
  productLevel?: string;
  /** 任务清单 */
  productList: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 驳回原因  验收驳回必填 */
  rejectReason?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务类型 */
  taskType?: string;
  /** 被转让人   转让/必填 */
  transferDesignerCode?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskSaveResp */
export interface DesignTaskSaveResp {
  /** 文本提示 */
  message?: string;
}

/** DesignTaskStatisticBean */
export interface DesignTaskStatisticBean {
  /**
   * 待认领
   * @format int32
   */
  accept?: number;
  /**
   * 审批中
   * @format int32
   */
  approving?: number;
  /**
   * 已检验
   * @format int32
   */
  check?: number;
  /**
   * 设计中
   * @format int32
   */
  design?: number;
  /**
   * 待需求方验收
   * @format int32
   */
  finish?: number;
  /**
   * 待内部验收
   * @format int32
   */
  innerCheck?: number;
  /**
   * 已提交
   * @format int32
   */
  submit?: number;
}

/** DesignTaskStatisticResp */
export interface DesignTaskStatisticResp {
  code?: string;
  /** 任务统计集合 */
  designTaskStatisticList?: DesignTaskStatisticBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignTypeStatisticBean */
export interface DesignTypeStatisticBean {
  /** @format int32 */
  ataskNum?: number;
  /** @format int32 */
  btaskNum?: number;
  /** @format int32 */
  ctaskNum?: number;
  /**
   * 综合好评度
   * @format double
   */
  evaluation?: number;
  /**
   * 类型
   * @format int32
   */
  itemType?: number;
  /** 类型描述 */
  itemTypeDesc?: string;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /** @format int32 */
  splusTaskNum?: number;
  /** @format int32 */
  staskNum?: number;
  /**
   * 总分
   * @format double
   */
  sumScore?: number;
  /**
   * 完成总任务数量
   * @format int32
   */
  taskNum?: number;
  /**
   * 非年规任务数
   * @format int32
   */
  unYearProjectNum?: number;
}

/** DesignTypeStatisticResp */
export interface DesignTypeStatisticResp {
  /** 类型统计数据集合 */
  designTypeStatisticList?: DesignTypeStatisticBean[];
}

/** DesignerBean */
export interface DesignerBean {
  /** 设计师编码 */
  designer?: string;
  /** 设计师名称 */
  designerDesc?: string;
}

/** DesignerListResp */
export interface DesignerListResp {
  /** 设计师集合 */
  designerList?: DesignerBean[];
}

/** DesignerStatisticBean */
export interface DesignerStatisticBean {
  /**
   * 团队贡献比率
   * @format double
   */
  contributionRate?: number;
  /** 设计师编码 */
  designTaskCode?: string;
  /** 设计师 */
  designer?: string;
  /** 设计师编码 */
  designerCode?: string;
  /** 综合好评度 */
  evaluation?: number;
  /**
   * 设计中任务数
   * @format int32
   */
  goingTaskNum?: number;
  /** 准确率 */
  punctualityRate?: number;
  /**
   * 个人任务负荷
   * @format double
   */
  selfRate?: number;
  /** 总分 */
  sumScore?: number;
  /**
   * 验收总任务数
   * @format int32
   */
  taskNum?: number;
}

/** DesignerStatisticReq */
export interface DesignerStatisticReq {
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
}

/** DesignerStatisticResp */
export interface DesignerStatisticResp {
  code?: string;
  /** 设计师分析集合 */
  designerStatisticList?: DesignerStatisticBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DictQueryResp */
export interface DictQueryResp {
  /** 字典结果Map, key = 字典编码, value = 具体值集合 */
  dictMap?: Record<string, DictResp[]>;
}

/** DictResp */
export interface DictResp {
  /** 字典描述 */
  desc?: string;
  /** 字典编码 */
  dictCode?: string;
  /** 扩展信息 */
  extInfo?: Record<string, object>;
  /**
   * 字典ID
   * @format int64
   */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 备注 */
  remark?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 字典类型 1-数字 2-字符串
   * @format int32
   */
  type?: number;
  /** 字典值 */
  value?: string;
}

/** ProductBean */
export interface ProductBean {
  /** 商品名称 */
  productName?: string;
  /** 商品spu */
  productSpu?: string;
}

/** RecentlyItemTypeResp */
export interface RecentlyItemTypeResp {
  /** 项目类型 */
  itemType?: string;
  /** 项目类型名称 */
  itemTypeName?: string;
}

/** ScoreUrlBean */
export interface ScoreUrlBean {
  /** 设计师编码 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /** 任务总评分 */
  scoreSum?: number;
  /** 评分文件 */
  urlList?: ScoreUrlDetailBean[];
}

/** ScoreUrlDetailBean */
export interface ScoreUrlDetailBean {
  /** 分数附件名称 */
  name?: string;
  /** 分数附件ossKey */
  ossKey?: string;
  /** 评分附件完整url */
  scoreUrl?: string;
}

/** UrlBean */
export interface UrlBean {
  /** 附件名称 */
  name?: string;
  /** 附件ossKey */
  ossKey?: string;
}

/** UserSatisfactionBean */
export interface UserSatisfactionBean {
  /**
   * 用户满意度平均分
   * @format double
   */
  acceptAvgScore?: number;
  /** 用户满意度等级 */
  acceptLevel?: string;
  /** 设计师 */
  designer?: string;
  /** 设计师编码 */
  designerCode?: string;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /**
   * 评分次数
   * @format int32
   */
  scoreNum?: number;
}

/** UserSatisfactionReq */
export interface UserSatisfactionReq {
  /** 关键词 */
  keyword?: string;
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 年份 */
  selectDate?: string;
}

/** UserSatisfactionResp */
export interface UserSatisfactionResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /** 用户满意度评价集合 */
  userSatisfactionList?: UserSatisfactionBean[];
}

/** checkRejectRecordBean */
export interface CheckRejectRecordBean {
  /**
   * 驳回时间
   * @format date-time
   */
  createTime?: string;
  /** 设计师 */
  designers?: string;
  /** 附件 完整路径，调用查路径接口 */
  fileList?: UrlBean[];
  /** 驳回人 */
  operatorName?: string;
  /** 驳回意见 */
  reason?: string;
  /** 驳回原因 */
  reasonTypeDesc?: string;
  /** 被驳回前状态 */
  statusDesc?: string;
}

/** designerInfoBean */
export interface DesignerInfoBean {
  /** 合同编码 */
  contractCodeList?: string[];
  /** 设计师编码 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 任务完成附件 */
  taskFinishedFileList?: UrlBean[];
  /** 任务完成链接 */
  taskUrl?: string;
  /** 转让设计师编码 */
  transferDesignerCode?: string;
  /** 转让设计师名称 */
  transferDesignerDesc?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«boolean» */
export interface CommonRespBoolean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: boolean;
  traceId?: string;
}
