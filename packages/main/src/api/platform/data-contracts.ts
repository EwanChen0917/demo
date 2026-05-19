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

/** AgencyBean */
export interface AgencyBean {
  /** 机构适用品线 */
  applicableProductLines?: string;
  /** 品牌专业影响力 */
  brandInfluence?: string;
  /** 城市 */
  city?: string;
  /** 临床与医疗机构 */
  clinicalMedicalOrg?: boolean;
  /** 合作竞品品牌 */
  competingBrands?: string;
  /** 对接人联系方式 */
  contactInfo?: string;
  /** 机构对接人&职务 */
  contactPerson?: string;
  /** 是否与竞品合作 */
  cooperateWithCompetitor?: boolean;
  /** 机构当前合作状态 */
  cooperationStatus?: string;
  /** 创建人 */
  creator?: string;
  /** 详细地址 */
  detailedAddress?: string;
  /** 政府及公共卫生机构 */
  governmentPublicHealthOrg?: boolean;
  /** 影响力 */
  influence?: string;
  /** 机构邮寄国家/地区 */
  mailingCountryRegion?: string;
  /** 母婴健康与生活方式品牌 */
  maternalChildHealthBrand?: boolean;
  /** 非营利与倡导组织(面向企业社会责任) */
  nonprofitOrg?: boolean;
  /** 机构分类 */
  orgCategory?: string;
  /** 机构简介 */
  orgIntro?: string;
  /** 机构logo */
  orgLogo?: string;
  /** 机构名称 */
  orgName?: string;
  /** 机构规模 */
  orgSize?: string;
  /** 专业协会 */
  professionalAssociation?: boolean;
  /** 专业能力 */
  professionalCapability?: string;
  /** 省/州 */
  provinceState?: string;
  /** 机构所属地区 */
  region?: string;
  /** 机构所属地区-其他-补充内容 */
  regionExtra?: string;
  /** 研究机构 */
  researchOrg?: boolean;
  /**
   * 创建时间
   * @format date-time
   */
  resourceCreateTime?: string;
  /**
   * 最后更新时间
   * @format date-time
   */
  resourceUpdateTime?: string;
  /** 战略契合度 */
  strategicFit?: string;
  /** 受众群体 */
  targetAudience?: string;
  /** 科技/创新与行业合作伙伴关系 */
  techInnovationPartner?: boolean;
  /** 更新人 */
  updater?: string;
  /** 官网地址 */
  website?: string;
}

/** AliyunTempMorePolicyResp */
export interface AliyunTempMorePolicyResp {
  /** bucket */
  bucket?: string;
  /** 上传域名 */
  host?: string;
  /** 上传key, directory + filename */
  key?: string;
  /** 阿里云专用appid */
  ossAccessKeyId?: string;
  /** policy */
  policy?: string;
  /** 提供商 */
  provider?: string;
  /** 签名 */
  signature?: string;
  /** 成功响应码 */
  success_action_status?: string;
}

/** AliyunTempPolicyResp */
export interface AliyunTempPolicyResp {
  /** bucket */
  bucket?: string;
  /** 上传域名 */
  host?: string;
  /** 上传key, directory + filename */
  key?: string;
  /** 阿里云专用appid */
  ossAccessKeyId?: string;
  /** policy */
  policy?: string;
  /** 提供商 */
  provider?: string;
  /** 签名 */
  signature?: string;
}

/** ApproveInfoBean */
export interface ApproveInfoBean {
  /** 需求执行人 */
  operator?: string;
  /** 需求执行人集合 */
  operatorList?: string[];
  /**
   * 计划完成日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 计划开始日期
   * @format date
   */
  planStartDate?: string;
  /** 审批意见 */
  remark?: string;
}

/** ApproveWorkflowRecordBean */
export interface ApproveWorkflowRecordBean {
  /** 审批内容 */
  approveContent?: object;
  /** 审批人列表 */
  approverList?: MemberBean[];
  /** 抄送人列表 */
  ccList?: MemberBean[];
  /** 审批实例id */
  instanceId?: string;
  /** 审批流程编号 */
  processCode?: string;
}

/** AssessmentInfo */
export interface AssessmentInfo {
  assessmentErrorMsg?: string;
  assessmentMarkdown?: string;
  /** @format int32 */
  assessmentStatus?: number;
}

/** Attachment */
export interface Attachment {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人描述 */
  creatorName?: string;
  /** 文件key */
  fileKey?: string;
  /** 文件名称 */
  fileName?: string;
}

/** AttachmentBean */
export interface AttachmentBean {
  /** 文件key */
  fileKey: string;
  /** 文件名称 */
  fileName: string;
}

/** AttachmentVo */
export interface AttachmentVo {
  name?: string;
  ossKey?: string;
  url?: string;
}

/** BasicInfo */
export interface BasicInfo {
  attachments?: AttachmentVo[];
  bizLine?: string;
  /** @format date-time */
  createTime?: string;
  creatorName?: string;
  demandBackground?: string;
  demandContent?: string;
  demandName?: string;
  demandType?: string;
  demandValue?: string;
  deptName?: string;
  deptPath?: string;
  /** @format date */
  expectDeliveryTime?: string;
  impactPeopleRange?: string;
  urgency?: string;
}

/** ButtonAuth */
export interface ButtonAuth {
  /**
   * 共同执行人变更申请显示通过拒绝按钮 1-有 0-无
   * @format int32
   */
  changeApplyFlag?: number;
  /**
   * 变更审批，执行人发起变更（变更通过、变更拒绝按钮） 1-有 0-无
   * @format int32
   */
  changeApproveFlag?: number;
  /**
   * 创建人、执行人或者共同执行人显示发起变更按钮 1-有 0-无
   * @format int32
   */
  changeFlag?: number;
  /**
   * 任务确认人显示审批任务通过拒绝按钮 1-有 0-无
   * @format int32
   */
  finishApproveFlag?: number;
  /**
   * 执行人显示发起完成按钮 1-有 0-无
   * @format int32
   */
  finishFlag?: number;
  /**
   * 变更前任务 1-有 0-没有
   * @format int32
   */
  historyFlag?: number;
  /**
   * 共同执行人填写周报需要执行人审批，执行人显示周报通过拒绝按钮  1-有 0-无
   * @format int32
   */
  reportApplyFlag?: number;
}

/** CTripCityReq */
export interface CTripCityReq {
  /** 国家id */
  countryId?: string;
  /** 国家ID集合 */
  countryIdList?: string[];
}

/** CTripCityResp */
export interface CTripCityResp {
  /** 城市信息 */
  cityList?: CityBean[];
}

/** CTripCountryBean */
export interface CTripCountryBean {
  /** @format int64 */
  countryId?: number;
  countryName?: string;
}

/** CTripCountryResp */
export interface CTripCountryResp {
  ctripCountryList?: CTripCountryBean[];
}

/** CTripFlowCheckReq */
export interface CTripFlowCheckReq {
  /** 结束时间 */
  endDate?: string;
  /** 开始时间 */
  startDate?: string;
  /** 用户Id */
  userId?: string;
}

/** CategoryBean */
export interface CategoryBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 四级名称/五级名称 或者 五级名称 */
  categoryName?: string;
  /** 分类名称 一级>二级>三级>四级>五级 */
  fullCategoryName?: string;
}

/** CategoryNodeBean */
export interface CategoryNodeBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 子节点 */
  children?: CategoryNodeBean[];
  /**
   * 分类层级
   * @format int32
   */
  level?: number;
  /** 关联员工编码 */
  memberCode?: string;
  /** 员工名称 */
  memberName?: string;
  /** 父分类编码 */
  parentCategoryCode?: string;
  /**
   * 是否勾选
   * @format int32
   */
  selected?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** CategoryTreeResp */
export interface CategoryTreeResp {
  /** 分类列表 */
  categoryDataList?: CategoryBean[];
  /** 分类树列表 */
  categoryList?: CategoryNodeBean[];
}

/** ChannelAccountDeleteReq */
export interface ChannelAccountDeleteReq {
  /**
   * 账号ID
   * @format int64
   */
  id: number;
}

/** ChannelAccountDetailQueryReq */
export interface ChannelAccountDetailQueryReq {
  /**
   * 账号ID
   * @format int64
   */
  id: number;
}

/** ChannelAccountDetailResp */
export interface ChannelAccountDetailResp {
  /** 访问令牌 */
  accessToken?: string;
  /** 账号标识（shopify的shop_id、gmail的邮箱主账号等） */
  accountId?: string;
  /** 账号名称 */
  accountName?: string;
  /** 应用编码 */
  appCode?: string;
  /** 应用名称 */
  appName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * Token过期时间
   * @format date-time
   */
  expiresTime?: string;
  /** 扩展配置JSON格式 */
  extInfo?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 备注信息 */
  remark?: string;
  /** 授权范围 */
  scope?: string;
  /**
   * 状态：1-正常，0-禁用，-1-更新失败
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** ChannelAccountListQueryReq */
export interface ChannelAccountListQueryReq {
  /** 应用编码 */
  appCode: string;
  /** 平台编码：tiktok、shopify、gmail */
  platformCode: string;
}

/** ChannelAccountListResp */
export interface ChannelAccountListResp {
  /** 列表项 */
  recordList?: ItemResp[];
}

/** ChannelAccountSaveOrUpdateReq */
export interface ChannelAccountSaveOrUpdateReq {
  /** 访问令牌 */
  accessToken: string;
  /** 账号标识（shopify的shop_id、gmail的邮箱主账号等） */
  accountId: string;
  /** 账号名称 */
  accountName?: string;
  /** 应用编码 */
  appCode: string;
  /**
   * 过期时间
   * @format date-time
   */
  expiresTime: string;
  /** 扩展配置JSON格式 */
  extInfo?: string;
  /**
   * 主键ID，编辑时必传
   * @format int64
   */
  id?: number;
  /** 平台编码：tiktok、shopify、gmail */
  platformCode: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 备注信息 */
  remark?: string;
  /** 授权范围 */
  scope?: string;
  /**
   * 状态：1-正常，0-禁用，-1-更新失败
   * @format int32
   */
  status: number;
}

/** ChannelConfigDeleteReq */
export interface ChannelConfigDeleteReq {
  /**
   * 配置ID
   * @format int64
   */
  id: number;
}

/** ChannelConfigDetailQueryReq */
export interface ChannelConfigDetailQueryReq {
  /**
   * 配置ID
   * @format int64
   */
  id: number;
}

/** ChannelConfigDetailResp */
export interface ChannelConfigDetailResp {
  /** API基础URL */
  apiBaseUrl?: string;
  /** 应用编码 */
  appCode?: string;
  /** 应用名称 */
  appName?: string;
  /**
   * 鉴权类型：1-固定秘钥，2-OAuth动态Token
   * @format int32
   */
  authType?: number;
  /** 鉴权类型描述 */
  authTypeDesc?: string;
  /** 授权URL */
  authUrl?: string;
  /** 客户端ID */
  clientId?: string;
  /** 客户端密钥 */
  clientSecret?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 扩展配置JSON格式 */
  extInfo?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /**
   * 状态：1-启用，0-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** Token获取URL */
  tokenUrl?: string;
}

/** ChannelConfigListQueryReq */
export interface ChannelConfigListQueryReq {
  /** 应用名称 */
  appName?: string;
  /**
   * 鉴权类型：1-固定秘钥，2-OAuth动态Token
   * @format int32
   */
  authType?: number;
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
  /** 平台编码：tiktok、shopify、gmail */
  platformCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态：1-启用，0-禁用
   * @format int32
   */
  status?: number;
}

/** ChannelConfigListResp */
export interface ChannelConfigListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: ItemResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ChannelConfigPlatformListResp */
export interface ChannelConfigPlatformListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: ItemResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ChannelConfigSaveOrUpdateReq */
export interface ChannelConfigSaveOrUpdateReq {
  /** API基础URL */
  apiBaseUrl: string;
  /** 应用编码 */
  appCode: string;
  /** 应用名称 */
  appName: string;
  /**
   * 鉴权类型：1-固定秘钥，2-OAuth动态Token
   * @format int32
   */
  authType: number;
  /** 授权URL */
  authUrl?: string;
  /** 客户端ID */
  clientId: string;
  /** 客户端密钥 */
  clientSecret: string;
  /** 扩展配置JSON格式 */
  extInfo?: string;
  /**
   * 主键ID，编辑时必传
   * @format int64
   */
  id?: number;
  /** 平台编码：tiktok、shopify、gmail */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /**
   * 状态：1-启用，0-禁用
   * @format int32
   */
  status: number;
  /** Token获取URL */
  tokenUrl?: string;
}

/** CheckedMenuBean */
export interface CheckedMenuBean {
  /** 选中菜单列表 */
  checkedMenuList?: string[];
  /** 菜单所属平台 lute_os lute_iot lute_business... */
  platform?: string;
}

/** ChooseBean */
export interface ChooseBean {
  /** 品牌 */
  brandCode?: string;
  /** 产品名称 */
  productCode?: string;
  /** 产品中文名 */
  productTitle?: string;
}

/** CityBean */
export interface CityBean {
  /**
   * 城市id
   * @format int64
   */
  cityId?: number;
  /** 城市名称 */
  cityName?: string;
  /**
   * 国家Id
   * @format int64
   */
  countryId?: number;
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

/** CommonOperateReq */
export interface CommonOperateReq {
  /** 操作对象编码 */
  itemCode?: string;
  /** 操作类型 delete-删除 */
  operateType?: string;
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** CooperTypeBean */
export interface CooperTypeBean {
  /** 合作类型编码 */
  cooperTypeCode?: string;
  /** 合作类型名称 */
  cooperTypeName?: string;
}

/** CooperationTypeBean */
export interface CooperationTypeBean {
  /** 合作类型 */
  cooperationType?: string;
  /** 合作类型描述 */
  cooperationTypeDesc?: string;
}

/** CountryInfoBean */
export interface CountryInfoBean {
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 国家英文名 */
  countryNameEn?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CountryInfoListQueryResp */
export interface CountryInfoListQueryResp {
  /** 国家列表 */
  countryList?: CountryInfoBean[];
}

/** CountryListQueryResp */
export interface CountryListQueryResp {
  code?: string;
  /** 国家列表 */
  countryList?: CountryInfoBean[];
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

/** CountryPlatformBean */
export interface CountryPlatformBean {
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 国家英文名 */
  countryNameEn?: string;
  /** 省州是否必须 */
  provinceRequired?: boolean;
}

/** CountryPlatformQueryReq */
export interface CountryPlatformQueryReq {
  /** 平台编码(amazon - 亚马逊) */
  channel?: string;
  /** 关键字, 国家编码/国家名称 */
  keyword?: string;
}

/** CountryPlatformQueryResp */
export interface CountryPlatformQueryResp {
  /** 国家列表 */
  countryList?: CountryPlatformBean[];
}

/** DemandAgencyListQueryReq */
export interface DemandAgencyListQueryReq {
  /** 专家集合 */
  agencyList?: string[];
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
}

/** DemandAgencyListQueryResp */
export interface DemandAgencyListQueryResp {
  /** 机构列表 */
  agencyList?: AgencyBean[];
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
}

/** DemandBRQueryBean */
export interface DemandBRQueryBean {
  /**
   * 验收通过时间
   * @format date
   */
  acceptancePassTime?: string;
  /** 审批备注 */
  approveRemark?: string;
  /** 当前审批人 */
  approverList?: MemberBean[];
  /** 当前审批人名称（多人逗号拼接） */
  approverNames?: string;
  /** 品牌 */
  brandCodeList?: string[];
  /** 合作类型-专家 */
  cooperationType?: string;
  /** 合作类型-专家 */
  cooperationTypeDesc?: string;
  /** 合作类型集合 */
  cooperationTypeList?: CooperationTypeBean[];
  /** 投放国家 */
  countryCode?: string;
  /** 投放国家描述 */
  countryCodeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 需求创建人 */
  creator?: string;
  /** 需求创建人名称 */
  creatorName?: string;
  /** 币种 */
  currencyCode?: string;
  /** 需求记录编码 */
  demandCode?: string;
  /** 需求附件 */
  demandFileList?: DemandFileBean[];
  /** 需求标题 */
  demandTitle?: string;
  /** 需求类型集合 */
  demandTypeList?: DemandTypeBean[];
  /** 预估预算 */
  estimatedBudget?: string;
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 实际完成时间
   * @format date
   */
  finishDate?: string;
  /** 执行附件 */
  handleFileList?: DemandFileBean[];
  /** 需求执行人 */
  handler?: string;
  /** 需求执行人名称 */
  handlerName?: string;
  /** 意向资源 */
  intentionResource?: string[];
  /** 上线链接 */
  onlineLink?: string;
  /**
   * 计划完成日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 计划开始日期
   * @format date
   */
  planStartDate?: string;
  /** 推广产品 */
  productNameList?: string[];
  /** 驳回人 */
  rejector?: string;
  /** 驳回人名称 */
  rejectorName?: string;
  /** 资源类型 */
  resourceType?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** DemandBrandCheckReceiveReq */
export interface DemandBrandCheckReceiveReq {
  /** 需求编码 */
  demandCode?: string;
  /** 业务模块 */
  demandModule?: string;
  /** 执行附件 */
  handleFileList?: DemandFileBean[];
  onlineLink?: string;
  /**
   * 是否保存 0-拒绝 1-验收通过
   * @format int32
   */
  operationType?: number;
  /** `拒绝原因` */
  reason?: string;
}

/** DemandBrandCooperTypeResp */
export interface DemandBrandCooperTypeResp {
  /** 资源类型集合 */
  resourceCooperList?: ResourceCooperBean[];
}

/** DemandBrandListQueryReq */
export interface DemandBrandListQueryReq {
  /**
   * 实际完成时间
   * @format date
   */
  actualFinishTime?: string;
  /** 品牌 */
  brandCode?: string;
  /** 合作类型 */
  cooperationType?: string;
  /** 合作类型集合 */
  cooperationTypeList?: string[];
  /** 投放国家 */
  countryCode?: string;
  /**
   * 需求创建时间
   * @format date
   */
  createTime?: string;
  /** 需求提出人 */
  creator?: string;
  /** 需求类型 */
  demandType?: string;
  /** 需求类型集合 */
  demandTypeList?: string[];
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /** 需求执行人 */
  handler?: string;
  /** 需求标题/需求背景/需求内容 */
  keyWord?: string;
  /**
   * 预计完成时间-结束
   * @format date
   */
  planFinishDate?: string;
  /**
   * 预计开始时间-开始
   * @format date
   */
  planStartDate?: string;
  /** 推广产品 */
  productName?: string;
}

/** DemandBrandReq */
export interface DemandBrandReq {
  /** 产品所属品牌 */
  brandCodeList?: string[];
  /** 产品分类 */
  categoryCode?: string;
  /**
   * 需求对接部门ID
   * @format int64
   */
  contactDeptId?: number;
  /** 合作类型其他-合作描述 */
  cooperationDesc?: string;
  /**
   * 合作周期-结束
   * @format date
   */
  cooperationPeriodEndDate?: string;
  /**
   * 合作周期-开始
   * @format date
   */
  cooperationPeriodStartDate?: string;
  /** 废弃待删除-合作类型 */
  cooperationType?: string;
  /** 合作类型集合 */
  cooperationTypeList?: string[];
  /** 国家区域 */
  countryCode?: string;
  /** 币种 */
  currencyCode?: string;
  /** 需求对接人 */
  demandContact?: string;
  /** 需求内容 */
  demandContent?: string;
  /** 需求类型集合 */
  demandTypeList?: number[];
  /** 预估预算 */
  estimatedBudget?: string;
  /**
   * 期望合作时间
   * @format date
   */
  expectedCooperationEndDate?: string;
  /**
   * 期望合作时间
   * @format date
   */
  expectedCooperationStartDate?: string;
  /** 专家类型集合-三级列表 */
  expertTypeList?: string[];
  /** 意向资源 */
  intentionResource?: string[];
  /** 主推产品 */
  mainProductLink?: string;
  /** 媒体分类 */
  mediaCategoryList?: string[];
  /** 媒体类型 */
  mediaType?: string;
  /** 机构-二级 */
  orgTypeList?: string[];
  /** 推广产品 */
  productNameList?: string[];
  /**
   * 产品上市时间
   * @format date
   */
  productOnlineTime?: string;
  /**
   * 产品上市时间结束
   * @format date
   */
  productOnlineTimeEnd?: string;
  /**
   * 产品上市时间开始
   * @format date
   */
  productOnlineTimeStart?: string;
  /** 资源类型 */
  resourceType?: string;
  /**
   * 废弃待删除-预计发样时间
   * @format date
   */
  sampleDeliveryTime?: string;
  /**
   * 预计发样时间截止
   * @format date
   */
  sampleDeliveryTimeEnd?: string;
  /**
   * 预计发样时间开始
   * @format date
   */
  sampleDeliveryTimeStart?: string;
}

/** DemandBrandSelectProductResp */
export interface DemandBrandSelectProductResp {
  /** 商品列表 */
  productList?: ChooseBean[];
}

/** DemandBrandStatusCountBean */
export interface DemandBrandStatusCountBean {
  /**
   * 审批未通过数量
   * @format int64
   */
  approveNotPassNum?: number;
  /**
   * 审批中数量
   * @format int64
   */
  approvingNum?: number;
  /**
   * 执行中数量
   * @format int64
   */
  executingNum?: number;
  /**
   * 已完结数量
   * @format int64
   */
  finishedNum?: number;
  /**
   * 待查收数量
   * @format int64
   */
  waitForReceiptNum?: number;
}

/** DemandButtonAuthBean */
export interface DemandButtonAuthBean {
  /**
   * 是否有审批权限 1-有 0-没有
   * @format int32
   */
  auditFlag?: number;
  /**
   * 是否有内审撤销权限 1-有 0-没有
   * @format int32
   */
  cancelFlag?: number;
}

/** DemandCacheDraftResp */
export interface DemandCacheDraftResp {
  /** 品牌信息 */
  brandReq?: DemandBrandReq;
  /** 用研字段-产品类型 */
  categoryCode?: string;
  /** 通用需求基础字段-需求背景 */
  demandBackground?: string;
  /** 通用需求基础字段-记录编码 */
  demandCode?: string;
  /** 通用需求基础字段-需求描述 */
  demandDesc?: string;
  /** 通用需求基础字段-文件附件 */
  demandFile?: DemandFileBean;
  /** 通用需求基础字段-文件附件列表 */
  demandFileList?: DemandFileBean[];
  /** IT信息 */
  demandItSaveBean?: DemandItSaveBean;
  /** 通用需求基础字段-需求模块 用研需求-user_research IT需求-it 采购需求-purchase */
  demandModule?: string;
  /**
   * 用研字段-需求属性
   * @format int32
   */
  demandProperty?: number;
  /** 采购信息 */
  demandPurchaseSaveBean?: DemandPurchaseSaveBean;
  /** 通用需求基础字段-需求标题 */
  demandTitle?: string;
  /**
   * 用研字段-需求类型
   * @format int32
   */
  demandType?: number;
  /**
   * 通用需求基础字段-编辑类型 1-业务区 2-信息数字化区
   * @format int32
   */
  editType?: number;
  /**
   * 通用需求基础字段-期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 通用需求基础字段-操作类型 0-草稿 1-提交申请
   * @format int32
   */
  operateType?: number;
  /** 用研字段-产品等级 */
  productLevel?: string;
  /** 用研字段-产品品线 */
  productLine?: string;
  /** 通用需求基础字段-需求核心相关人员 */
  relMemberCodeList?: string[];
  /** 备注 */
  remark?: string;
  /**
   * 用研字段-预计发样时间
   * @format date
   */
  sampleDeliveryTime?: string;
  /** 用研字段-商品sku编码 */
  skuCode?: string;
  /**
   * 更新时间，默认更新时间；前端查询缓存草稿，获取更新时间判断是否是否缓存最新草稿数据
   * @format date-time
   */
  updateTime?: string;
}

/** DemandDeptStaticsBean */
export interface DemandDeptStaticsBean {
  /**
   * 部门
   * @format int64
   */
  deptId?: number;
  /** 状态描述 */
  deptName?: string;
  /** 占比 */
  rate?: number;
  /**
   * 当前状态数量
   * @format int32
   */
  statusCount?: number;
  /** 状态统计 */
  statusList?: DemandStatusQueryBean[];
  /**
   * 状态总数量
   * @format int32
   */
  totalCount?: number;
}

/** DemandDetailBrandBean */
export interface DemandDetailBrandBean {
  /** 品牌 */
  brandCodeList?: string[];
  /** 品牌名称-用于展示 */
  brandNameList?: string[];
  /** 产品分类 */
  categoryCode?: string;
  /** 产品分类描述 */
  categoryCodeDesc?: string;
  /** 变更原因 */
  changeReason?: string;
  /**
   * 需求对接部门
   * @format int64
   */
  contactDeptId?: number;
  /** 需求对接部门名称 */
  contactDeptName?: string;
  /** 其他合作类型-描述 */
  cooperationDesc?: string;
  /**
   * 合作周期-结束
   * @format date
   */
  cooperationPeriodEndDate?: string;
  /**
   * 合作周期-开始
   * @format date
   */
  cooperationPeriodStartDate?: string;
  /** 合作类型-专家使用 */
  cooperationType?: string;
  /** 合作类型-专家使用 */
  cooperationTypeDesc?: string;
  /** 合作类型集合 */
  cooperationTypeList?: CooperationTypeBean[];
  /** 投放国家 */
  countryCode?: string;
  /** 投放国家 */
  countryCodeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 币种 */
  currencyCode?: string;
  /** 币种名称 */
  currencyCodeDesc?: string;
  /** 需求对接人 */
  demandContact?: string;
  /** 需求对接人 */
  demandContactDesc?: string;
  /** 需求内容 */
  demandContent?: string;
  /** 需求类型 */
  demandTypeList?: DemandTypeBean[];
  /**
   * 所在部门
   * @format int64
   */
  deptId?: number;
  /** 所在部门名称 */
  deptNameStr?: string;
  /** 预估预算 */
  estimatedBudget?: string;
  /**
   * 期望合作时间-结束
   * @format date
   */
  expectedCooperationEndDate?: string;
  /**
   * 期望合作时间-开始
   * @format date
   */
  expectedCooperationStartDate?: string;
  /** 专家类型集合-三级列表 */
  expertTypeList?: string[];
  /** 专家类型集合-三级名称列表 */
  expertTypeNameList?: string[];
  /** 执行附件 */
  handleFileList?: DemandFileBean[];
  /** 执行人 */
  handler?: string;
  /** 执行人名称 */
  handlerName?: string;
  /** 意向资源 */
  intentionResource?: string[];
  /** 主推产品 */
  mainProductLink?: string;
  mediaCategoryList?: MediaCategoryBean[];
  /** 媒体类型 */
  mediaType?: string;
  /** 上线链接 */
  onlineLink?: string;
  /** 机构类型类型集合-三级列表 */
  orgTypeList?: string[];
  /** 机构类型集合-三级名称列表 */
  orgTypeNameList?: string[];
  /**
   * 预计结束日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 预计开始日期
   * @format date
   */
  planStartDate?: string;
  /** 推广产品 */
  productNameList?: string[];
  /**
   * 产品上市时间
   * @format date
   */
  productOnlineTime?: string;
  /**
   * 产品上市时间截止
   * @format date
   */
  productOnlineTimeEnd?: string;
  /**
   * 产品上市时间开始
   * @format date
   */
  productOnlineTimeStart?: string;
  /** 需求核心相关人员 */
  relMemberCodeList?: string[];
  /** 需求核心相关人员 */
  relMemberList?: string[];
  /** 资源类型 */
  resourceType?: string;
  /**
   * 待废弃-预计发样时间
   * @format date
   */
  sampleDeliveryTime?: string;
  /**
   * 预计发样时间截止
   * @format date
   */
  sampleDeliveryTimeEnd?: string;
  /**
   * 预计发样时间开始
   * @format date
   */
  sampleDeliveryTimeStart?: string;
}

/** DemandDetailItBean */
export interface DemandDetailItBean {
  /** 业务对接人编码 */
  businessFollower?: string;
  /** 业务对接人名称 */
  businessFollowerName?: string;
  /** 业务优先级 高-high 中-medium 低-low */
  businessPriority?: string;
  /** 业务优先级描述 高-high 中-medium 低-low */
  businessPriorityDesc?: string;
  /** 线索优先级 高-high 中-medium 低-low */
  cluePriority?: string;
  /** 线索优先级描述 高-high 中-medium 低-low */
  cluePriorityDesc?: string;
  /** 附件信息 */
  demandFileList?: DemandFileBean[];
  /**
   * 需求分类
   * @format int32
   */
  demandType?: number;
  /** 需求分类描述 */
  demandTypeDesc?: string;
  /** IT产品经理/IT跟进人编码 */
  follower?: string;
  /** IT产品经理/IT跟进人名称 */
  followerName?: string;
  /** 信息化产品线 */
  infoPdtLine?: string;
  /** 信息化产品线描述 */
  infoPdtLineDesc?: string;
  /**
   * 预计交付时间
   * @format date-time
   */
  planDeliveryTime?: string;
  /**
   * 预计评审时间
   * @format date-time
   */
  planReviewTime?: string;
  /** 所属系统编码 */
  platform?: string;
  /** 所属系统描述 */
  platformDesc?: string;
  /** 所属项目编码 */
  project?: string;
  /** 所属项目描述 */
  projectDesc?: string;
  /** TB编码 */
  tbCode?: string;
  /** 紧急描述 */
  urgentDesc?: string;
  /** 价值/建议 */
  valueSuggest?: string;
}

/** DemandDetailPurchaseBean */
export interface DemandDetailPurchaseBean {
  /** 采购商品项信息 */
  purchaseItemList?: DemandPurchaseBean[];
}

/** DemandDetailResp */
export interface DemandDetailResp {
  /**
   * 是否填写审批执行信息
   * @format int32
   */
  auditExecuteInfoFlag?: number;
  /** 权限 */
  auth?: DemandButtonAuthBean;
  /** 品牌需求业务字段 */
  brandResearch?: DemandDetailBrandBean;
  /** 头像 */
  createAvatar?: string;
  /**
   * 创建时间/提出时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人/线索人 */
  creator?: string;
  /** 创建人/线索人名称 */
  creatorName?: string;
  /** 币种 */
  currency?: string;
  /** 需求背景/使用用户 */
  demandBackground?: string;
  /** 记录编码 */
  demandCode?: string;
  /** 需求描述/问题场景描述 */
  demandDesc?: string;
  /** 需求文件 */
  demandFile?: DemandFileBean;
  /** 需求文件 */
  demandFileList?: DemandFileBean[];
  /** 需求模块 用研需求-user_research */
  demandModule?: string;
  /** 需求标题/线索标题 */
  demandTitle?: string;
  /** 所属部门 */
  deptStr?: string;
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /** IT业务字段 */
  it?: DemandDetailItBean;
  /** 采购需求业务字段 */
  purchase?: DemandDetailPurchaseBean;
  /** 备注 */
  remark?: string;
  /** 推送失败原因 */
  sendErrorMsg?: string;
  /**
   * 推送状态 0-未开始 1-成功 2-失败
   * @format int32
   */
  sendStatus?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 总预估金额 */
  totalAmount?: number;
  /**
   * 需求消耗时间
   * @format int64
   */
  totalTime?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 用研业务字段 */
  userResearch?: DemandDetailUrBean;
}

/** DemandDetailUrBean */
export interface DemandDetailUrBean {
  /** 产品分类 */
  categoryCode?: string;
  /** 产品分类描述 */
  categoryStr?: string;
  /** 变更原因 */
  changeReason?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 需求属性
   * @format int32
   */
  demandProperty?: number;
  /** 需求属性描述 */
  demandPropertyDesc?: string;
  /**
   * 需求类型
   * @format int32
   */
  demandType?: number;
  /** 需求类型描述 */
  demandTypeDesc?: string;
  /**
   * 所在部门
   * @format int64
   */
  deptId?: number;
  /** 所在部门名称 */
  deptNameStr?: string;
  /**
   * 执行完成时间
   * @format date
   */
  executionFinishTime?: string;
  /** 执行人 */
  handler?: string;
  /** 执行人集合- 用研需求支持多个执行人 */
  handlerList?: DemandHandlerBean[];
  /** 执行人名称 */
  handlerName?: string;
  /**
   * 是否落实 1-是 0-否
   * @format int32
   */
  implementFlag?: number;
  /** 落实备注 */
  implementRemark?: string;
  /**
   * 预计结束日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 预计开始日期
   * @format date
   */
  planStartDate?: string;
  /** 产品等级 */
  productLevel?: string;
  /** 产品等级描述 */
  productLevelStr?: string;
  /** 产品品线 */
  productLine?: string;
  /** 产品品线描述 */
  productLineStr?: string;
  /** 商品中文名称 */
  productTitle?: string;
  /** 需求核心相关人员 */
  relMemberCodeList?: string[];
  /** 需求核心相关人员 */
  relMemberList?: string[];
  /** 报告结论 */
  reportConclusion?: string;
  /**
   * 预计发样时间
   * @format date
   */
  sampleDeliveryTime?: string;
  /** 评分 */
  score?: number;
  /** 评分原因 */
  scoreReason?: string;
  /** 商品sku编码 */
  skuCode?: string;
  /** 用研附件 */
  userResearchFile?: DemandFileBean;
}

/** DemandExecuteSaveReq */
export interface DemandExecuteSaveReq {
  /**
   * 是否审批 是-1 否-0
   * @format int32
   */
  approveFlag?: number;
  /** 变更原因 */
  changeReason?: string;
  /** 需求记录编码 */
  demandCode?: string;
  /**
   * 是否编辑 1-编辑 0-不编辑 , 默认编辑 注释：重新提交时判断是否直接提交还是编辑数据
   * @format int32
   */
  editFlag?: number;
  /** @format date */
  executionFinishTime?: string;
  /**
   * 实际完成日期
   * @format date
   */
  finishDate?: string;
  /**
   * 预计完成日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 预计开始日期
   * @format date
   */
  planStartDate?: string;
  /** 报告结论 */
  reportConclusion?: string;
  /** 用研附件 */
  userResearchFile?: DemandFileBean;
}

/** DemandExecutionFinishReq */
export interface DemandExecutionFinishReq {
  /** 变更原因 */
  changeReason?: string;
  /** 需求编码 */
  demandCode?: string;
  /** 业务模块 */
  demandModule?: string;
  /** 执行附件 */
  handleFileList?: DemandFileBean[];
  /**
   * 是否保存 0-执行完成 1-保存
   * @format int32
   */
  isSaveFlag?: number;
  onlineLink?: string;
  /**
   * 预计完成时间
   * @format date
   */
  planFinishDate?: string;
  /**
   * 预计开始时间
   * @format date
   */
  planStartDate?: string;
}

/** DemandExpertListQueryReq */
export interface DemandExpertListQueryReq {
  /** 专家集合 */
  expertList?: string[];
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
}

/** DemandExpertListQueryResp */
export interface DemandExpertListQueryResp {
  code?: string;
  /** 专家列表 */
  expertList?: ExpertBean[];
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

/** DemandExpertTypeListQueryReq */
export interface DemandExpertTypeListQueryReq {
  /**
   * 场景 1-媒体 2-专家 3-机构
   * @format int32
   */
  scene?: number;
}

/** DemandExpertTypeListQueryResp */
export interface DemandExpertTypeListQueryResp {
  /** 类型列表 */
  expertTypeList?: ExpertTypeBean[];
}

/** DemandFileBean */
export interface DemandFileBean {
  /** 需求编码 */
  demandCode?: string;
  /** 文件类型 */
  extType?: string;
  /** 文件编码 */
  fileCode?: string;
  /** 文件key */
  fileKey?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 文件路径 */
  fileUrl?: string;
  /** 操作人 */
  operator?: string;
}

/** DemandFinishMemberStaticsQueryResp */
export interface DemandFinishMemberStaticsQueryResp {
  /** 完成情况列表 */
  list?: FinishMemberStaticsBean[];
}

/** DemandFinishStaticsQueryResp */
export interface DemandFinishStaticsQueryResp {
  /** 完成情况列表 */
  list?: FinishStaticsBean[];
}

/** DemandHandlerBean */
export interface DemandHandlerBean {
  /** 执行人编码 */
  handler?: string;
  /** 执行人名称 */
  handlerName?: string;
}

/** DemandItBatchOperateReq */
export interface DemandItBatchOperateReq {
  /** 业务跟进人 操作类型 【必传】指派业务跟进人-assign_business_follower */
  businessFollower?: string;
  /** 需求编码集合 */
  demandCodeList: string[];
  /** 产品跟进热 操作类型 【必传】指派产品跟进人-assign_follower */
  follower?: string;
  /** 挂起原因 操作类型 【必传】 挂起-demand_it_hand_up */
  handUpList?: HandUpBean[];
  /** 操作类型 指派业务跟进人-assign_business_follower 激活-demand_it_active 挂起-demand_it_hand_up 作废-demand_it_abandoned  指派产品跟进人-assign_follower 驳回-demand_it_reject 关联demand_tb_bind  解除demand_tb_unbind  */
  operateType?: string;
  /** 驳回原因 操作类型 【必传】 驳回-demand_it_reject */
  rejectList?: RejectBean[];
  /** 绑定TB信息 操作类型 【必传】 关联demand_tb_bind */
  tbList?: TbBean[];
}

/** DemandItBatchOperateResp */
export interface DemandItBatchOperateResp {
  /** 作废操作-提示内容 */
  tip?: string;
}

/** DemandItCountBean */
export interface DemandItCountBean {
  /**
   * 我审批的
   * @format int64
   */
  approvedCount?: number;
  /**
   * 我对接的
   * @format int64
   */
  coordinatedCount?: number;
  /**
   * 我提出的
   * @format int64
   */
  createdCount?: number;
  /**
   * 我跟进的
   * @format int64
   */
  followedCount?: number;
}

/** DemandItListQueryReq */
export interface DemandItListQueryReq {
  /** 业务对接人 */
  businessFollower?: string;
  /** 业务优先级 高-high 中-medium 低-low */
  businessPriority?: string;
  /** 线索优先级 */
  cluePriority?: string;
  /**
   * 筛选日期 提出时间 yyyy-MM-dd
   * @format date
   */
  createTimeEnd?: string;
  /**
   * 筛选日期 提出时间 yyyy-MM-dd
   * @format date
   */
  createTimeStart?: string;
  /** 提出人 */
  creator?: string;
  /**
   * 提出人组织
   * @format int64
   */
  creatorDeptId?: number;
  /** 编码 */
  demandCode?: string;
  /** 需求模块 用研需求-it */
  demandModule?: string;
  /** 线索标题 */
  demandTitle?: string;
  /**
   * 需求分类 1-业务支撑性的需求、2-业务承诺和财务指标挂钩的需求、3-业务工作流优化提升岗位要求的需求、4-其他
   * @format int32
   */
  demandType?: number;
  /**
   * 筛选日期 期望上线 yyyy-MM-dd
   * @format date
   */
  expectFinishTimeEnd?: string;
  /**
   * 筛选日期 期望上线 yyyy-MM-dd
   * @format date
   */
  expectFinishTimeStart?: string;
  /**
   * 筛选日期 完成时间 yyyy-MM-dd
   * @format date
   */
  finishTimeEnd?: string;
  /**
   * 筛选日期 完成时间 yyyy-MM-dd
   * @format date
   */
  finishTimeStart?: string;
  /** 跟进人 */
  follower?: string;
  /** 菜单标识 业务需求列表-it_business_list 业务信息数字化列表-it_digital_list */
  menuTag?: string;
  /** 所属系统 */
  platform?: string;
  /** 所属项目 */
  project?: string;
  /**
   * 查询数据过滤方式 1-我提出的 2-待我审批 3-带我对接 4-待我跟进
   * @format int32
   */
  selectType?: number;
  /** 状态 100-总计 0-草稿 40-审批中 41-已驳回  42-已挂起 43-待跟进 44-跟进中 45-研发中 46-已完成 47-已废弃 */
  status?: string;
  /** 状态 100-总计 0-草稿 40-审批中 41-已驳回  42-已挂起 43-待跟进 44-跟进中 45-研发中 46-已完成 47-已废弃 */
  statusList?: string[];
  /** TB编码 */
  tbCode?: string;
  /** TB需求名称 */
  tbName?: string;
  /**
   * 是否紧急 1-紧急
   * @format int32
   */
  urgentFlag?: number;
}

/** DemandItOperateReq */
export interface DemandItOperateReq {
  /** 需求编码 */
  demandCode: string;
  /** 审批时，允许填写的信息 操作类型 【必传】 审批同意-approved 审批拒绝-rejected */
  editInfo?: EditInfoBean;
  /** 操作类型 审批同意-approved 审批拒绝-rejected */
  operateType?: string;
}

/** DemandItQueryBean */
export interface DemandItQueryBean {
  /**
   * 实际完成时间
   * @format date
   */
  actualFinishTime?: string;
  /** 按钮权限 */
  auth?: DemandButtonAuthBean;
  /** 业务对接人 */
  businessFollower?: string;
  /** 业务对接人名称 */
  businessFollowerName?: string;
  /** 业务优先级 高-high 中-medium 低-low */
  businessPriority?: string;
  /** 业务优先级描述 */
  businessPriorityDesc?: string;
  /** 线索优先级 高-high 中-medium 低-low */
  cluePriority?: string;
  /** 线索优先级描述 */
  cluePriorityDesc?: string;
  /**
   * 提出时间
   * @format date-time
   */
  createTime?: string;
  /** 提出人 */
  creator?: string;
  /** 提出人名称 */
  creatorName?: string;
  /** 编码 */
  demandCode?: string;
  /** 线索标题 */
  demandTitle?: string;
  /**
   * 需求分类枚举
   * @format int32
   */
  demandType?: number;
  /** 需求分类描述 */
  demandTypeDesc?: string;
  /** 提出人组织 */
  deptList?: DeptBean[];
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /** IT跟进人 */
  follower?: string;
  /** 最新跟进内容 */
  followerContext?: string;
  /** IT跟进人名称 */
  followerName?: string;
  /** 挂起原因 */
  handUpReason?: string;
  /** 所属系统编码 */
  platform?: string;
  /** 所属系统描述 */
  platformDesc?: string;
  /** 所属项目编码 */
  project?: string;
  /** 所属项目描述 */
  projectDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** tb需求编码 */
  tbCode?: string;
  /** 需求名称 */
  tbName?: string;
  /** 紧急描述 */
  urgentDesc?: string;
}

/** DemandItSaveBean */
export interface DemandItSaveBean {
  /** 业务跟进人 */
  businessFollower?: string;
  /** 业务优先级 高-high 中-medium 低-low */
  businessPriority?: string;
  /** 线索优先级 高-high 中-medium 低-low */
  cluePriority?: string;
  /** 文件附件列表 */
  demandFileList?: DemandFileBean[];
  /**
   * 需求分类 1-业务支撑性的需求、2-业务承诺和财务指标挂钩的需求、3-业务工作流优化提升岗位要求的需求、4-其他
   * @format int32
   */
  demandType?: number;
  /** 跟进内容 */
  followContent?: string;
  /** 跟进人 */
  follower?: string;
  /** 信息化产品线 */
  infoPdtLine?: string;
  /**
   * 预计交付时间
   * @format date-time
   */
  planDeliveryTime?: string;
  /**
   * 预计评审时间
   * @format date-time
   */
  planReviewTime?: string;
  /** 所属系统 */
  platform?: string;
  /** 所属项目 */
  project?: string;
  /** TB编码 */
  tbCode?: string;
  /** 价值建议 */
  valueSuggest?: string;
}

/** DemandListQueryReq */
export interface DemandListQueryReq {
  /** 待审批状态菜单，查询指定阶段的待审批记录，审批节点阶段例如： 1，2，3 */
  approveStageList?: number[];
  /** 品牌需求查询参数 */
  brandReq?: DemandBrandListQueryReq;
  /** 产品分类 */
  categoryCode?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 是否延期 1-是 0-否
   * @format int32
   */
  delayFlag?: number;
  /** 执行人集合 */
  demandHandlerList?: string[];
  /** IT需求列表请求参数 */
  demandItListQueryReq?: DemandItListQueryReq;
  /** 需求模块 用研需求-user_research  it需求-it */
  demandModule?: string;
  /**
   * 需求属性
   * @format int32
   */
  demandProperty?: number;
  /**
   * 需求类型
   * @format int32
   */
  demandType?: number;
  /** 需求执行人 */
  handler?: string;
  /**
   * 是否落地 1-是 0-否
   * @format int32
   */
  implementFlag?: number;
  /** 关键字 需求标题/需求内容 */
  keyword?: string;
  /**
   * 产品分类等级
   * @format int32
   */
  level?: number;
  /**
   * 是否低分 1-是 0-否
   * @format int32
   */
  lowScoreFlag?: number;
  /** 菜单标识 */
  menuTag?: string;
  /** 排序字段 */
  orderField?: string;
  /** 排序类型 */
  orderType?: string;
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
  /** 产品品线 */
  productLine?: string;
  /** 采购需求查询参数 */
  purchaseReq?: DemandPurchaseListQueryReq;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品sku编码 */
  skuCode?: string;
  /**
   * 状态 0-草稿 31-审批中 32-审批未通过 33-执行中 34-内审中 35-内审未通过 36-待查收 37-待反馈 38-已完结 大状态 ： 101-执行端 已完结（6，7，8）
   * @format int32
   */
  status?: number;
  /**
   * 判断是需求提交管理端还是执行管理端 0-提交管理端 1-执行管理端
   * @format int32
   */
  submitManageFlag?: number;
}

/** DemandListQueryResp */
export interface DemandListQueryResp {
  code?: string;
  /** 品牌需求管理信息 */
  demandBRList?: DemandBRQueryBean[];
  /** IT需求统计信息 */
  demandItCountBean?: DemandItCountBean;
  /** IT需求信息 */
  demandItList?: DemandItQueryBean[];
  /** 用研需求信息 */
  demandList?: DemandURQueryBean[];
  /** 采购需求统计信息 */
  demandPurchaseCountBean?: DemandPurchaseCountBean;
  /** 采购需求列表视图信息 */
  demandPurchaseList?: DemandPurchaseQueryBean[];
  /** 采购需求产品视图信息 */
  demandPurchaseViewList?: DemandPurchaseViewBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 排序字段映射关系 */
  sortFieldList?: Record<string, string>[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DemandMediaListQueryResp */
export interface DemandMediaListQueryResp {
  code?: string;
  /** 媒体列表 */
  mediaList?: MediaBean[];
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

/** DemandMemberBean */
export interface DemandMemberBean {
  /** 头像 */
  avatar?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 名称 */
  name?: string;
}

/** DemandMemberResp */
export interface DemandMemberResp {
  /** 员工编码 */
  memberList?: DemandMemberBean[];
}

/** DemandNeedAvgStaticsQueryResp */
export interface DemandNeedAvgStaticsQueryResp {
  /** 总平均分 */
  avgScore?: number;
  /** 需求平均分统计 */
  list?: NeedAvgStaticsBean[];
  /**
   * 需求总数
   * @format int32
   */
  totalNeedCount?: number;
}

/** DemandOperateReq */
export interface DemandOperateReq {
  /** 审批参数信息 可传操作类型 --> 审批通过-approved 审批拒绝-rejected 同意并且提交-save_and_approve */
  approveInfo?: ApproveInfoBean;
  /** 评论信息 必传操作类型 --> 添加评论-add_comment */
  comment?: string;
  /** 需求编码 */
  demandCode: string;
  /** 模块 */
  demandModule?: string;
  /** 可传操作类型 --> 同意并且提交-save_and_approve 重新提交-resubmit */
  demandSaveReq?: DemandSaveReq;
  /**
   * 是否落实 1-是 0-否 必传操作类型 --> 提交反馈-feedback
   * @format int32
   */
  implementFlag?: number;
  /** 落实备注 必传操作类型 --> 提交反馈-feedback */
  implementRemark?: string;
  /** 内审通过/拒绝原因 可传操作类型 --> 内审通过-inner_approved 内审拒绝-inner_rejected */
  innerApproveRemark?: string;
  /** 员工编码   必传操作类型-修改执行人-update_handler */
  memberCode?: string;
  /** 员工编码   必传操作类型-修改执行人-update_handler 用研需求使用 支持多个执行人 */
  memberCodeList?: string[];
  /** 操作类型 审批通过-approved 审批拒绝-rejected 同意并且提交-save_and_approved 添加评论-add_comment 提交反馈-feedback 评分-score 重新提交-resubmit 内审通过-inner_approved 内审拒绝-inner_rejected 修改执行人-update_handler demand_cancel-撤销操作 */
  operateType?: string;
  /** 评分 必传操作类型 --> 评分-score */
  score?: number;
  /** 评分原因 */
  scoreReason?: string;
}

/** DemandOperateResp */
export interface DemandOperateResp {
  /** 需求编码 */
  demandCode?: string;
  /** 操作消息 */
  message?: string;
  /** 操作结果 */
  success?: boolean;
}

/** DemandPdtCategoryReq */
export interface DemandPdtCategoryReq {
  /** 分类名称 */
  categoryName?: string;
}

/** DemandPdtCategoryResp */
export interface DemandPdtCategoryResp {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
}

/** DemandPersonLandStaticsQueryResp */
export interface DemandPersonLandStaticsQueryResp {
  /** 需求落地情况 */
  list?: FinishPersonLandStaticsBean[];
}

/** DemandPersonMemberBean */
export interface DemandPersonMemberBean {
  /**
   * 我的需求数
   * @format int32
   */
  myCount?: number;
  /**
   * 其他需求数量
   * @format int32
   */
  otherCount?: number;
  /** 其他需求占比 */
  otherRate?: number;
  /** 我的需求数 */
  rate?: number;
  /**
   * 总需求数
   * @format int32
   */
  totalCount?: number;
}

/** DemandPersonMemberStaticsQueryResp */
export interface DemandPersonMemberStaticsQueryResp {
  /** 需求人员统计 */
  bean?: DemandPersonMemberBean;
}

/** DemandPersonOnTimeStaticsQueryResp */
export interface DemandPersonOnTimeStaticsQueryResp {
  /** 及时率情况 */
  list?: FinishPersonOnTimeStaticsBean[];
}

/** DemandPersonScoreStaticsQueryResp */
export interface DemandPersonScoreStaticsQueryResp {
  /** 完成情况列表 */
  list?: FinishPersonStaticsBean[];
}

/** DemandProcessStepBean */
export interface DemandProcessStepBean {
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorDesc?: string;
  /**
   * 节点数
   * @format int32
   */
  order?: number;
  /** 进度状态 completed-已完成 in_progress-进行中 pending-未开始 rejected-审批拒绝 */
  status?: string;
  /** 进度状态描述 completed-已完成 in_progress-进行中 pending-未开始 rejected-审批拒绝 */
  statusDesc?: string;
  /** 进度编码 */
  stepCode?: string;
  /** 进度名称 */
  stepName?: string;
}

/** DemandProcessStepResp */
export interface DemandProcessStepResp {
  /** 当前进度编码 submit-需求提交 approve_1-需求审批节点1 approve_2-需求审批节点2 approve_3-需求审批节点3 execute-开始执行 internal_audit-用研内审 review-需求查收 feedback-需求反馈 complete-需求完结 */
  currentStep?: string;
  /** 当前进度编码 submit-需求提交 approve_1-需求审批节点1 approve_2-需求审批节点2 approve_3-需求审批节点3 execute-开始执行 internal_audit-用研内审 review-需求查收 feedback-需求反馈 complete-需求完结 */
  currentStepDsc?: string;
  /** 需求编码 */
  demandCode?: string;
  /** 所有进度步骤信息 */
  demandProcessStepList?: DemandProcessStepBean[];
  /**
   * 节点数
   * @format int32
   */
  order?: number;
}

/** DemandProductLineStaticsBean */
export interface DemandProductLineStaticsBean {
  /**
   * 品线总数
   * @format int32
   */
  lineCount?: number;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 状态统计 */
  statusList?: DemandStatusQueryBean[];
}

/** DemandProductLineStatusStaticsQueryResp */
export interface DemandProductLineStatusStaticsQueryResp {
  /** 部门状态统计列表 */
  list?: DemandProductLineStaticsBean[];
  /** 渲染数据 */
  showBean?: ShowBean;
}

/** DemandPurchaseAmountReq */
export interface DemandPurchaseAmountReq {
  /** 币种 */
  currency?: string;
  /** 商品行金额信息 */
  priceList?: PurchaseItemPriceBean[];
}

/** DemandPurchaseAmountResp */
export interface DemandPurchaseAmountResp {
  /** 预估总金额 */
  totalAmount?: number;
}

/** DemandPurchaseBean */
export interface DemandPurchaseBean {
  /** 指定供应商原因 */
  assignSupplierReason?: string;
  /** 已查收数量 */
  checkNumber?: number;
  /** 币种 */
  currency?: string;
  /** 需求编码 */
  demandCode?: string;
  /** 可查收数量 */
  enableCheckNumber?: number;
  /** 采购数量 */
  number?: number;
  /** 采购单价 */
  price?: number;
  /** 采购产品名称 */
  productName?: string;
  /** 采购产品sku */
  productSku?: string;
  /** 采购产品类型 */
  productType?: string;
  /** 采购产品类型描述 */
  productTypeDesc?: string;
  /** 采购单号 */
  purchaseCode?: string;
  /** 采购组编码 */
  purchaseGroup?: string;
  /** 采购组名称 */
  purchaseGroupName?: string;
  /** 采购项记录编码 */
  purchaseItemCode?: string;
  /**
   * 采购行号
   * @format int32
   */
  purchaseLine?: number;
  /**
   * 采购订单行状态
   * @format int32
   */
  purchaseLineStatus?: number;
  /** 采购订单行状态描述 */
  purchaseLineStatusDesc?: string;
  /** 采购执行人 */
  purchaserList?: PurchaserBean[];
  /** 备注 */
  remark?: string;
  /** 采购总价 */
  sumPrice?: number;
  /** 供应商 */
  supplier?: string;
}

/** DemandPurchaseCountBean */
export interface DemandPurchaseCountBean {
  /**
   * 审批未通过
   * @format int64
   */
  approveNotPassCount?: number;
  /**
   * 审批中
   * @format int64
   */
  approvingCount?: number;
  /**
   * 待查收
   * @format int64
   */
  checkingCount?: number;
  /**
   * 草稿
   * @format int64
   */
  draftCount?: number;
  /**
   * 执行中
   * @format int64
   */
  executingCount?: number;
  /**
   * 已完结
   * @format int64
   */
  finishedCount?: number;
  /**
   * 推送失败
   * @format int64
   */
  sendFailCount?: number;
}

/** DemandPurchaseListQueryReq */
export interface DemandPurchaseListQueryReq {
  /** 提出人 */
  creator?: string;
  /** 需求模块 purchase-采购模块 */
  demandModule?: string;
  /** 所在部门id */
  deptIdList?: number[];
  /** 关键词 需求标题/需求内容/需求编码 */
  keyword?: string;
  /** 菜单标识 采购提需求列表-submit_list 采购执行列表-execute_list */
  menuTag?: string;
  /** 采购产品 */
  productSkuList?: string[];
  /** 采购产品类型 */
  productTypeList?: string[];
  /** 采购关键词 采购订单编码/采购订单行号 */
  purchaseKeyword?: string;
  /** 采购订单行状态集合 */
  purchaseLineStatusList?: number[];
  /** 采购员工编码 */
  purchaserCodeList?: string[];
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态集合 */
  statusList?: number[];
  /**
   * 列表展示视图模式 需求视图-0 产品视图-1 默认需求视图-0
   * @format int32
   */
  viewType?: number;
}

/** DemandPurchaseMaterialBean */
export interface DemandPurchaseMaterialBean {
  /** 基本单位 */
  baseUnit?: string;
  /** 物料品牌 */
  brand?: string;
  /** 综合采购物料分类编码 */
  cateCode?: string;
  /** 物料分类级别编码 */
  cateLevelCode?: string;
  /** 综合采购物料分类名称 */
  cateName?: string;
  /** 检验类型 */
  checkType?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 送货安排 */
  deliveryArrangement?: string;
  /** 工厂编码 */
  factory?: string;
  /** 工厂名称 */
  factoryName?: string;
  /** 高 */
  height?: number;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 是否质检:0：否、1：是 */
  isCheckQuality?: string;
  /** 是否冻结:0：否、1：是 */
  isFreeze?: string;
  /**
   * 是否启用提前期:0：否、1：是
   * @format byte
   */
  isLeadTime?: string;
  /** 是否锁定:0：否、1：是 */
  isLocked?: string;
  /** 长 */
  length?: number;
  /** 物料描述 */
  materialDesc?: string;
  /** 物料型号 */
  materialModel?: string;
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /** 物料规格 */
  materialSpec?: string;
  /** 最小包装量 */
  minPackQuantity?: number;
  /** 净重 */
  netWeight?: string;
  /** 采购组编码 */
  purchaseGroup?: string;
  /** 采购组名称 */
  purchaseGroupName?: string;
  /** 采购组织编码 */
  purchaseOrgCode?: string;
  /** 采购组织描述 */
  purchaseOrgName?: string;
  /** 备注 */
  remark?: string;
  /** 来源类型(SRM、SAP) */
  sourceType?: string;
  /** 材质 */
  texture?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 宽 */
  width?: number;
}

/** DemandPurchaseMaterialListQueryResp */
export interface DemandPurchaseMaterialListQueryResp {
  /** 物料列表 */
  materialList?: DemandPurchaseMaterialBean[];
}

/** DemandPurchaseNoticeReq */
export interface DemandPurchaseNoticeReq {
  /** 采购需求编码 */
  demandCode?: string;
  /**
   * 是否通知 1-通知
   * @format int32
   */
  noticeFlag?: number;
}

/** DemandPurchaseNoticeResp */
export interface DemandPurchaseNoticeResp {
  /** 当前审批人 */
  approverStr?: string;
  /** 推送结果 true-成功 false-失败 */
  successFlag?: boolean;
}

/** DemandPurchaseOperateReq */
export interface DemandPurchaseOperateReq {
  /** 评论内容 comment-评论时，必传 */
  comment?: string;
  /** 需求记录编码 */
  demandCode?: string;
  /** 采购项列表 check-查收时，必传 */
  itemList?: PurchaseItemOperateBean[];
  /** 操作类型 check-查收 comment-评论 */
  operateType?: string;
}

/** DemandPurchaseOperateResp */
export interface DemandPurchaseOperateResp {
  /** 需求编码 */
  demandCode?: string;
}

/** DemandPurchaseProcessStepBean */
export interface DemandPurchaseProcessStepBean {
  /**
   * 是否当前节点 0-否 1-是
   * @format int32
   */
  currentStep?: number;
  /** 进度节点描述 */
  desc?: string;
  /**
   * 进度节点
   * @format int32
   */
  order?: number;
  /** 进度状态 completed-已完成 in_progress-进行中 pending-未开始 rejected-审批拒绝 */
  status?: string;
  /** 进度状态描述 completed-已完成 in_progress-进行中 pending-未开始 rejected-审批拒绝 */
  statusDesc?: string;
  /** 进度名称 */
  stepName?: string;
}

/** DemandPurchaseProcessStepResp */
export interface DemandPurchaseProcessStepResp {
  /** 需求编码 */
  demandCode?: string;
  /** 进度条集合 */
  processList?: DemandPurchaseProcessStepBean[];
  /** 备注信息 */
  remark?: string;
}

/** DemandPurchaseQueryBean */
export interface DemandPurchaseQueryBean {
  /** 审批人信息 */
  approverList?: MemberBean[];
  /**
   * 需求创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人员工编码 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 币种 */
  currency?: string;
  /** 需求背景 */
  demandBackground?: string;
  /** 编码 */
  demandCode?: string;
  /** 需求标题 */
  demandTitle?: string;
  /** 所属部门 */
  deptList?: DeptBean[];
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /** 推送失败原因 */
  sendErrorMsg?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 采购预估总价 */
  sumPrice?: number;
}

/** DemandPurchaseSaveBean */
export interface DemandPurchaseSaveBean {
  /** 总预算币种 */
  currency?: string;
  /** 采购项(商品)信息 */
  purchaseItemList?: PurchaseItemBean[];
}

/** DemandPurchaseSyncReq */
export interface DemandPurchaseSyncReq {
  /** 通用需求基础字段-需求背景 */
  demandBackground?: string;
  /** 通用需求基础字段-记录编码 */
  demandCode?: string;
  /** 通用需求基础字段-需求描述 */
  demandDesc?: string;
  /** 通用需求基础字段-文件附件 */
  demandFile?: DemandFileBean;
  /** 通用需求基础字段-文件附件列表 */
  demandFileList?: DemandFileBean[];
  /** 通用需求基础字段-需求模块 用研需求-user_research IT需求-it 采购需求-purchase */
  demandModule?: string;
  /** 采购信息 */
  demandPurchaseSaveBean?: DemandPurchaseSaveBean;
  /** 通用需求基础字段-需求标题 */
  demandTitle?: string;
  /**
   * 用研字段-需求类型
   * @format int32
   */
  demandType?: number;
  /**
   * 通用需求基础字段-编辑类型 1-业务区 2-信息数字化区
   * @format int32
   */
  editType?: number;
  /**
   * 通用需求基础字段-期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 通用需求基础字段-操作类型 0-草稿 1-提交申请
   * @format int32
   */
  operateType?: number;
  /** 通用需求基础字段-需求核心相关人员 */
  relMemberCodeList?: string[];
  /** 备注 */
  remark?: string;
  /**
   * 更新时间，默认更新时间；前端查询缓存草稿，获取更新时间判断是否是否缓存最新草稿数据
   * @format date-time
   */
  updateTime?: string;
}

/** DemandPurchaseSyncResp */
export interface DemandPurchaseSyncResp {
  /** 采购同步结果 */
  syncResult?: boolean;
}

/** DemandPurchaseUpdateReq */
export interface DemandPurchaseUpdateReq {
  /** 发货单号 */
  deliveryNumber?: string;
  /** 采购订单单号 */
  poCode?: string;
  /** 采购申请单号 */
  purchaseCode?: string;
  /** 采购商品项信息 */
  purchaseLineList?: PurchaseLineBean[];
  /**
   * srm系统定义处理状态 0-SRM已关闭 1-待查收
   * @format int32
   */
  status?: number;
}

/** DemandPurchaseUpdateResp */
export interface DemandPurchaseUpdateResp {
  /**
   * 更新状态 1-成功 0-失败
   * @format int32
   */
  error?: number;
  /** 更新结果信息 */
  msg?: string;
}

/** DemandPurchaseViewBean */
export interface DemandPurchaseViewBean {
  /**
   * 已查数量
   * @format int64
   */
  checkNumber?: number;
  /**
   * 需求提出时间
   * @format date-time
   */
  createTime?: string;
  /** 需求提出人编码 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 需求提出人名称 */
  creatorName?: string;
  /** 币种 */
  currency?: string;
  /** 需求编码 */
  demandCode?: string;
  /** 需求标题 */
  demandTitle?: string;
  /** 所属部门 */
  deptList?: DeptBean[];
  /** 可查收数量 */
  enableCheckNumber?: number;
  /**
   * 需求提出时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 采购数量
   * @format int64
   */
  number?: number;
  /** 采购单价 */
  price?: number;
  /** 采购产品信息 */
  productName?: string;
  /** 采购产品sku */
  productSku?: string;
  /** 采购产品类型 */
  productType?: string;
  /** 采购产品类型描述 */
  productTypeDesc?: string;
  /** 采购申请单号 */
  purchaseCode?: string;
  /** 采购组编码 */
  purchaseGroup?: string;
  /** 采购组名称 */
  purchaseGroupName?: string;
  /** 采购商品项记录编码 */
  purchaseItemCode?: string;
  /**
   * 采购行状态 1-srm已关闭 否则正常
   * @format int32
   */
  purchaseItemStatus?: number;
  /**
   * 采购行号
   * @format int32
   */
  purchaseLine?: number;
  /** 采购申请单行状态 */
  purchaseLineStatusDesc?: string;
  /** 采购执行人 */
  purchaserList?: MemberBean[];
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 当前商品*数量=合计金额 */
  sumPrice?: number;
  /**
   * 未查数量
   * @format int64
   */
  unCheckNumber?: number;
}

/** DemandSaveReq */
export interface DemandSaveReq {
  /** 品牌信息 */
  brandReq?: DemandBrandReq;
  /** 用研字段-产品类型 */
  categoryCode?: string;
  /** 通用需求基础字段-需求背景 */
  demandBackground?: string;
  /** 通用需求基础字段-记录编码 */
  demandCode?: string;
  /** 通用需求基础字段-需求描述 */
  demandDesc?: string;
  /** 通用需求基础字段-文件附件 */
  demandFile?: DemandFileBean;
  /** 通用需求基础字段-文件附件列表 */
  demandFileList?: DemandFileBean[];
  /** IT信息 */
  demandItSaveBean?: DemandItSaveBean;
  /** 通用需求基础字段-需求模块 用研需求-user_research IT需求-it 采购需求-purchase */
  demandModule?: string;
  /**
   * 用研字段-需求属性
   * @format int32
   */
  demandProperty?: number;
  /** 采购信息 */
  demandPurchaseSaveBean?: DemandPurchaseSaveBean;
  /** 通用需求基础字段-需求标题 */
  demandTitle?: string;
  /**
   * 用研字段-需求类型
   * @format int32
   */
  demandType?: number;
  /**
   * 通用需求基础字段-编辑类型 1-业务区 2-信息数字化区
   * @format int32
   */
  editType?: number;
  /**
   * 通用需求基础字段-期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 通用需求基础字段-操作类型 0-草稿 1-提交申请
   * @format int32
   */
  operateType?: number;
  /** 用研字段-产品等级 */
  productLevel?: string;
  /** 用研字段-产品品线 */
  productLine?: string;
  /** 通用需求基础字段-需求核心相关人员 */
  relMemberCodeList?: string[];
  /** 备注 */
  remark?: string;
  /**
   * 用研字段-预计发样时间
   * @format date
   */
  sampleDeliveryTime?: string;
  /** 用研字段-商品sku编码 */
  skuCode?: string;
  /**
   * 更新时间，默认更新时间；前端查询缓存草稿，获取更新时间判断是否是否缓存最新草稿数据
   * @format date-time
   */
  updateTime?: string;
}

/** DemandSaveResp */
export interface DemandSaveResp {
  /** 需求记录编码 */
  demandCode?: string;
  /**
   * 未完成评分需求数量
   * @format int64
   */
  unScoreNum?: number;
}

/** DemandSrmPoCallbackReq */
export interface DemandSrmPoCallbackReq {
  /** 采购订单单号 */
  poCode?: string;
  /** 采购订单行信息 */
  poItemList?: PurchaseProductItemBean[];
  /** 采购申请单号 */
  purchaseCode?: string;
  /** 采购订单状态 */
  status?: string;
}

/** DemandSrmPoCallbackResp */
export interface DemandSrmPoCallbackResp {
  /**
   * 更新状态 1-成功 0-失败
   * @format int32
   */
  error?: number;
  /** 更新结果信息 */
  msg?: string;
}

/** DemandStatusCountResp */
export interface DemandStatusCountResp {
  /**
   * 审批未通过数量
   * @format int64
   */
  approveNotPassNum?: number;
  /**
   * 审批中数量
   * @format int64
   */
  approvingNum?: number;
  /** 品牌状态 */
  brandStatusBean?: DemandBrandStatusCountBean;
  /**
   * 草稿数量
   * @format int64
   */
  draftNum?: number;
  /**
   * 已完结数量
   * @format int64
   */
  endNum?: number;
  /** @format int64 */
  executeEndNum?: number;
  /**
   * 执行中数量
   * @format int64
   */
  executingNum?: number;
  /**
   * 内审未通过数量
   * @format int64
   */
  internalAuditNotPassNum?: number;
  /**
   * 内审中数量
   * @format int64
   */
  internalAuditingNum?: number;
  /**
   * 待反馈数量
   * @format int64
   */
  waitForFeedbackNum?: number;
  /**
   * 待查收数量
   * @format int64
   */
  waitForReceiptNum?: number;
}

/** DemandStatusDeptStaticsQueryResp */
export interface DemandStatusDeptStaticsQueryResp {
  /** 部门状态统计列表 */
  list?: DemandDeptStaticsBean[];
}

/** DemandStatusPersonStaticsQueryResp */
export interface DemandStatusPersonStaticsQueryResp {
  /** 个人状态统计列表 */
  statusList?: DemandStatusQueryBean[];
}

/** DemandStatusQueryBean */
export interface DemandStatusQueryBean {
  /**
   * 合并状态
   * @format int32
   */
  mergeStatus?: number;
  /** 占比 */
  rate?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 当前状态数量
   * @format int32
   */
  statusCount?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 状态总数量
   * @format int32
   */
  totalCount?: number;
}

/** DemandStatusStaticsQueryResp */
export interface DemandStatusStaticsQueryResp {
  /** 状态统计列表 */
  list?: DemandStatusQueryBean[];
}

/** DemandTypeBean */
export interface DemandTypeBean {
  /**
   * 需求类型
   * @format int32
   */
  demandType?: number;
  /** 需求类型描述 */
  demandTypeDesc?: string;
}

/** DemandURQueryBean */
export interface DemandURQueryBean {
  /** 审批意见 */
  approveRemark?: string;
  /** 当前审批人 */
  approverList?: MemberBean[];
  /** 当前审批人名称（多人逗号拼接） */
  approverNames?: string;
  /** 产品分类 */
  categoryCode?: string;
  /** 产品分类 */
  categoryDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 需求记录编码 */
  demandCode?: string;
  /** 需求附件 */
  demandFile?: DemandFileBean;
  demandHandlerList?: DemandHandlerBean[];
  /**
   * 需求属性
   * @format int32
   */
  demandProperty?: number;
  /** 需求属性描述 */
  demandPropertyDesc?: string;
  /** 需求标题 */
  demandTitle?: string;
  /**
   * 需求类型
   * @format int32
   */
  demandType?: number;
  /** 需求类型描述 */
  demandTypeDesc?: string;
  /**
   * 实际完成日期-提交内审实际完成时间
   * @format date
   */
  executionFinishTime?: string;
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /**
   * 实际完成时间
   * @format date
   */
  finishDate?: string;
  /** 需求执行人 */
  handler?: string;
  /** 需求执行人名称 */
  handlerName?: string;
  /**
   * 是否落实 1-是 0-否
   * @format int32
   */
  implementFlag?: number;
  /**
   * 计划完成日期
   * @format date
   */
  planFinishDate?: string;
  /**
   * 计划开始日期
   * @format date
   */
  planStartDate?: string;
  /** 产品定级 */
  productLevel?: string;
  /** 产品品线 */
  productLine?: string;
  /** 产品品线描述 */
  productLineDesc?: string;
  /** 产品中文名称 */
  productTitle?: string;
  /** 驳回人 */
  rejector?: string;
  /** 驳回人名称 */
  rejectorName?: string;
  /** 报告结论 */
  reportConclusion?: string;
  /** 需求方评分 */
  score?: number;
  /** 产品sku编码 */
  skuCode?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 时间偏移量
   * @format int64
   */
  timeOffSet?: number;
  /**
   * 需求消耗时间
   * @format int64
   */
  totalTime?: number;
  /** 用研报告 */
  userResearchFile?: DemandFileBean;
}

/** Dept */
export interface Dept {
  /** 校验 */
  checked?: boolean;
  /** 子部门列表 */
  children?: Dept[];
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /** 角色账号 */
  roleAccountBean?: RoleAccountBean;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /** 部门来源标识 */
  sourceIdentifier?: string;
}

/** DeptAllBean */
export interface DeptAllBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
}

/** DeptBean */
export interface DeptBean {
  /**
   * 部门
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
}

/** DeptInfo */
export interface DeptInfo {
  /** @format int64 */
  deptId?: number;
  deptName?: string;
}

/** DeptInfoBean */
export interface DeptInfoBean {
  /** 是否勾选 使用处：在线知识库 */
  check?: boolean;
  /** 子部门列表 */
  children?: DeptInfoBean[];
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /** 部门来源标识 */
  sourceIdentifier?: string;
}

/** DeptInfoResp */
export interface DeptInfoResp {
  /** 所有部门排列集合 */
  deptAllList?: DeptAllBean[];
  /** 部门树形结构集合 */
  deptList?: DeptInfoBean[];
}

/** DesktopNotifyBean */
export interface DesktopNotifyBean {
  /** 内容 */
  content?: string;
  /** 详情链接 */
  detailUrl?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /** 标题 */
  title?: string;
}

/** DesktopNotifyListResp */
export interface DesktopNotifyListResp {
  /** 配置唯一编码 */
  desktopNotifyList?: DesktopNotifyBean[];
}

/** DesktopReportReq */
export interface DesktopReportReq {
  /** IP地址 我知道-known 查看详情-detail 上报ip-report 必传 */
  ipAddr: string;
  /** 通知消息唯一编码  我知道-known 查看详情-detail 必传 */
  notifyCode?: string;
  /** 操作类型 我知道-known 查看详情-detail 上报ip-report  必传 */
  operateType: string;
}

/** DictBean */
export interface DictBean {
  childrenList?: FlowDictBean[];
  /** 字典描述 */
  desc?: string;
  /** 过滤条件1 */
  filter1List?: string[];
  /** 过滤条件2 */
  filter2List?: string[];
  params?: object;
  /** 字典值 */
  value?: string;
}

/** DictDeleteReq */
export interface DictDeleteReq {
  /** 字典编码 */
  dictCode: string;
  /** 字典模块编码 */
  moduleCode: string;
}

/** DictItem */
export interface DictItem {
  /** 字典描述 */
  desc: string;
  /**
   * 字典类型 1-数字 2-字符串
   * @format int32
   */
  type?: number;
  /** 字典值 */
  value?: string;
}

/** DictModule */
export interface DictModule {
  /** 字典模块编码 */
  moduleCode?: string;
  /** 字典模块名称 */
  moduleName?: string;
}

/** DictModuleListResp */
export interface DictModuleListResp {
  /** 字典模块列表 */
  moduleList?: DictModule[];
}

/** DictModuleQueryReq */
export interface DictModuleQueryReq {
  /** 字典编码 */
  dictCode?: string;
  /** 字典模块编码/字典模块名称/字典编码/字典名称 */
  keyword?: string;
  /** 模块编码 */
  moduleCode?: string;
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
   * 字典状态
   * @format int32
   */
  status?: number;
}

/** DictQueryDetailQueryReq */
export interface DictQueryDetailQueryReq {
  /** 字典编码 */
  dictCode?: string;
  /** 字典模块编码 */
  moduleCode?: string;
}

/** DictQueryListSaveReq */
export interface DictQueryListSaveReq {
  /** 字典编码 */
  code: string;
  /** 字典项 */
  dictItemList: DictItem[];
  /** 字典名称 */
  name?: string;
}

/** DictQueryPageResp */
export interface DictQueryPageResp {
  code?: string;
  /** 字典结果Map, key = 字典编码, value = 具体值集合 */
  dictRespList?: DictResp[];
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

/** DictQueryReq */
export interface DictQueryReq {
  /** 字典编码集合 */
  dictCodes?: string[];
}

/** DictQueryResp */
export interface DictQueryResp {
  /** 字典结果Map, key = 字典编码, value = 具体值集合 */
  dictMap?: Record<string, DictResp[]>;
}

/** DictQuerySingleResp */
export interface DictQuerySingleResp {
  /** 字典编码 */
  dictCode?: string;
  /** 字典值 */
  dictName?: string;
  /** 字典模块编码 */
  moduleCode?: string;
  /** 字典模块名称 */
  moduleName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 字典状态
   * @format int32
   */
  status?: number;
  /** 字典状态描述 */
  statusDesc?: string;
}

/** DictResp */
export interface DictResp {
  /** 字典描述 */
  dictCode?: string;
  /** 字典名称 */
  dictName?: string;
  /** 字典编码 */
  moduleCode?: string;
  /** 字典名称 */
  moduleName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 字典状态
   * @format int32
   */
  status?: number;
  /** 字典状态描述 */
  statusDesc?: string;
}

/** DictSaveOrUpdateReq */
export interface DictSaveOrUpdateReq {
  /** 字典编码 */
  dictCode: string;
  /** 字典名称 */
  dictName: string;
  /** 字典模块编码 */
  moduleCode: string;
  /** 字典模块名称 */
  moduleName: string;
  /** 备注 */
  remark?: string;
  /**
   * 字段状态 0-未启用 1-启动
   * @format int32
   */
  status: number;
}

/** EntertainBean */
export interface EntertainBean {
  /** 审批编码 */
  approveCode?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 部门 */
  deptList?: DeptBean[];
  /** 记录编码 */
  entertainCode?: string;
  /**
   * 招待时间
   * @format date-time
   */
  entertainTime?: string;
  /** 招待类型 */
  entertainTypeList?: EntertainTypeBean[];
  /** 参与人数 */
  joinNumStr?: string;
  /**
   * 会议结束时间
   * @format date-time
   */
  meetingEndTime?: string;
  /** 预定会议室 */
  meetingRoom?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  meetingStartTime?: string;
  /** 付款凭证 */
  payFileList?: PayFileBean0[];
  /** 备注 */
  remark?: string;
  /**
   * 审批状态
   * @format int32
   */
  status?: number;
  /** 审批状态描述 */
  statusDesc?: string;
  /** 工单编码 */
  workflowCode?: string;
}

/** EntertainConflictReq */
export interface EntertainConflictReq {
  /**
   * 会议结束时间
   * @format date-time
   */
  meetingEndTime?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  meetingStartTime?: string;
  /** 员工编码 */
  memberCodeList: string[];
}

/** EntertainConflictResp */
export interface EntertainConflictResp {
  /** 日程冲突的员工编码 */
  memberList?: MemberBean[];
}

/** EntertainQueryReq */
export interface EntertainQueryReq {
  /** 审批编码 */
  approveCode?: string;
  /**
   * 会议结束时间
   * @format date-time
   */
  meetingEndTime?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  meetingStartTime?: string;
  /** 员工编码 */
  memberCodeList?: string[];
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
  /** 查询类型 selectType: mine 我的；selectType = all 所有 */
  selectType?: string;
  /** 审批状态 */
  status?: string;
}

/** EntertainQueryResp */
export interface EntertainQueryResp {
  code?: string;
  /** 对外招待记录 */
  entertainList?: EntertainBean[];
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

/** EntertainSaveReq */
export interface EntertainSaveReq {
  /** 申请人 */
  applyCodeList?: string[];
  /** 部门 */
  deptIdList?: number[];
  /**
   * 招待时间
   * @format date-time
   */
  entertainTime?: string;
  /** 招待类型 */
  entertainTypeList?: string[];
  /** 参与人数 */
  joinNumStr?: string;
  /**
   * 会议结束时间
   * @format date-time
   */
  meetingEndTime?: string;
  /** 会议地点 */
  meetingRoom?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  meetingStartTime?: string;
  /** 参会人 */
  memberCodeList?: string[];
  /** 付款凭证附件 */
  payFileList?: PayFileBean[];
  /** 备注 */
  remark?: string;
}

/** EntertainSaveResp */
export interface EntertainSaveResp {
  /** 记录编码 */
  entertainCode?: string;
  /** 工单编码 */
  workflowCode?: string;
}

/** EntertainTypeBean */
export interface EntertainTypeBean {
  /** 招待类型 */
  entertainType?: string;
  /** 招待类型描述 */
  entertainTypeDesc?: string;
}

/** ExpertBean */
export interface ExpertBean {
  /** 应用场景 */
  applicationScenario?: string;
  /** 育儿与儿童支持人员分类 */
  childSupportCategory?: string;
  /** 临床分类 */
  clinicalCategory?: string;
  /** 专家名称 */
  expertName?: string;
  /** 专家类型 */
  expertType?: string;
  /** 产品侧场景建议 */
  marketScenarioSuggestion?: string;
  /** 母婴护理专家分类 */
  maternalChildcareCategory?: string;
  /** 专家社媒账号 */
  socialMediaAccount?: string;
  /** website */
  website?: string;
}

/** ExpertTypeBean */
export interface ExpertTypeBean {
  /** 子层级 */
  children?: ExpertTypeBean[];
  /** 类型 */
  expertType?: string;
  /** 类型描述 */
  expertTypeDesc?: string;
  /** @format int32 */
  level?: number;
  /**
   * 顺序 0~9999 排序
   * @format int32
   */
  sort?: number;
}

/** FeedbackDetailResp */
export interface FeedbackDetailResp {
  /** 建议标题 */
  contentTitle?: string;
  /** 调查维度 */
  dimension?: string;
  /** 唯一编码 */
  feedbackCode?: string;
  /**
   * 是否弹窗反馈 1-弹窗 0-不弹窗
   * @format int32
   */
  feedbackFlag?: number;
  /** 菜单 */
  menu?: string;
  /** 模块 */
  module?: string;
  /** 路由 */
  route?: string;
  /** 评分标题 */
  scoreTitle?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** FeedbackListBean */
export interface FeedbackListBean {
  /** 分数 */
  avgScore?: number;
  /** 调查维度 */
  dimensionDesc?: string;
  /** 唯一编码 */
  feedbackCode?: string;
  /**
   * 提交人数
   * @format int64
   */
  memberNum?: number;
  /** 菜单 */
  menu?: string;
  /** 路由 */
  route?: string;
  /**
   * 状态 1-正常 0-暂停
   * @format int32
   */
  status?: number;
  /** 投放状态 */
  statusDesc?: string;
}

/** FeedbackListResp */
export interface FeedbackListResp {
  code?: string;
  /** 问卷反馈 */
  feedbackList?: FeedbackListBean[];
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

/** FeedbackMenuResp */
export interface FeedbackMenuResp {
  /** 菜单列表 */
  menuList?: string[];
}

/** FeedbackOperateReq */
export interface FeedbackOperateReq {
  /** 唯一编码 */
  feedbackCode: string;
  /**
   * 操作类型 1-停止投放 2-恢复投放
   * @format int32
   */
  operateType?: number;
}

/** FeedbackOperateResp */
export interface FeedbackOperateResp {
  feedbackCode?: string;
}

/** FeedbackRecordBean */
export interface FeedbackRecordBean {
  /** 内容 */
  content?: string;
  /**
   * 提交时间
   * @format date-time
   */
  createTime?: string;
  /** 调查维度 */
  dimensionDesc?: string;
  /** 唯一编码 */
  feedbackCode?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 员工姓名 */
  memberName?: string;
  /**
   * 提交人数
   * @format int32
   */
  memberNum?: number;
  /** 菜单 */
  menu?: string;
  /** 路由 */
  route?: string;
  /** 分数 */
  score?: number;
  /** 投放状态 */
  statusDesc?: string;
}

/** FeedbackRecordListResp */
export interface FeedbackRecordListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 调查问卷记录 */
  recordList?: FeedbackRecordBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FeedbackSaveReq */
export interface FeedbackSaveReq {
  /** 内容 */
  content?: string;
  /** 唯一编码 */
  feedbackCode: string;
  /** 评分 */
  score?: number;
  /**
   * 类型 1-评分 0-拒绝评分
   * @format int32
   */
  type: number;
}

/** FeedbackSaveResp */
export interface FeedbackSaveResp {
  /** 唯一编码 */
  feedbackCode?: string;
}

/** FileRecordBean */
export interface FileRecordBean {
  /** 应用编码 */
  appCode?: string;
  /** 应用名称 */
  appName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作人 */
  creator?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 导入失败数
   * @format int32
   */
  failNum?: number;
  /** 文件名称 */
  fileName?: string;
  /** 导入文件地址 */
  importPath?: string;
  /** 模块编码 */
  moduleCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** 查询参数 */
  queryParam?: string;
  /** 记录编号 */
  recordCode?: string;
  /**
   * 记录类型
   * @format int32
   */
  recordType?: number;
  /** 备注 */
  remark?: string;
  /** 文件结果路径 */
  resultPath?: string;
  /**
   * 状态 0-失败 1-处理中 2-成功
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 导入成功数
   * @format int32
   */
  successNum?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** FileRecordListQueryResp */
export interface FileRecordListQueryResp {
  code?: string;
  /** 记录列表 */
  fileRecordList?: FileRecordBean[];
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

/** FinishMemberStaticsBean */
export interface FinishMemberStaticsBean {
  /** 平均分数 */
  avgScore?: number;
  /**
   * 计算平均分总数
   * @format int32
   */
  calculateTotalQty?: number;
  /**
   * 大于85分需求数量
   * @format int32
   */
  highScoreQty?: number;
  /** 大于85分需求占比 */
  highScoreRate?: number;
  /**
   * 已经落地数量
   * @format int32
   */
  landQty?: number;
  /** 落地率 */
  landRate?: number;
  /**
   * 超时交付数量
   * @format int32
   */
  lateTimeQty?: number;
  /** 超时交付率 */
  lateTimeRate?: number;
  /**
   * 小于85分数
   * @format int32
   */
  lowScoreQty?: number;
  /** 小于85分占比 */
  lowScoreRate?: number;
  /** 成员编码 */
  memberCode?: string;
  /** 成员名称 */
  memberName?: string;
  /**
   * 及时交付数量
   * @format int32
   */
  onTimeQty?: number;
  /** 及时交付率 */
  onTimeRate?: number;
  /**
   * 所有需求总数
   * @format int32
   */
  totalQty?: number;
  /**
   * 总评分
   * @format int32
   */
  totalScore?: number;
  /**
   * 及时交付计算数量
   * @format int32
   */
  totalTimeQty?: number;
  /**
   * 未反馈
   * @format int32
   */
  unFeedbackQty?: number;
  /** 未反馈率 */
  unFeedbackRate?: number;
  /**
   * 未落地数量
   * @format int32
   */
  unLandQty?: number;
  /** 未落地率 */
  unLandRate?: number;
  /**
   * 未评分数量
   * @format int32
   */
  unScoreQty?: number;
  /** 未评分占比 */
  unScoreRate?: number;
}

/** FinishPersonLandStaticsBean */
export interface FinishPersonLandStaticsBean {
  /**
   * 已经落地数量
   * @format int32
   */
  landQty?: number;
  /** 落地率 */
  landRate?: number;
  /**
   * 所有需求总数
   * @format int32
   */
  totalQty?: number;
  /**
   * 未反馈
   * @format int32
   */
  unFeedbackQty?: number;
  /** 未反馈率 */
  unFeedbackRate?: number;
  /**
   * 未落地数量
   * @format int32
   */
  unLandQty?: number;
  /** 未落地率 */
  unLandRate?: number;
}

/** FinishPersonOnTimeStaticsBean */
export interface FinishPersonOnTimeStaticsBean {
  /**
   * 超时交付数量
   * @format int32
   */
  lateTimeQty?: number;
  /** 超时交付率 */
  lateTimeRate?: number;
  /**
   * 及时交付数量
   * @format int32
   */
  onTimeQty?: number;
  /** 及时交付率 */
  onTimeRate?: number;
  /**
   * 所有需求总数
   * @format int32
   */
  totalQty?: number;
  /**
   * 及时交付计算数量
   * @format int32
   */
  totalTimeQty?: number;
}

/** FinishPersonStaticsBean */
export interface FinishPersonStaticsBean {
  /** 平均分数 */
  avgScore?: number;
  /**
   * 计算平均分总数
   * @format int32
   */
  calculateTotalQty?: number;
  /**
   * 大于85分需求数量
   * @format int32
   */
  highScoreQty?: number;
  /** 大于85分需求占比 */
  highScoreRate?: number;
  /**
   * 小于85分数
   * @format int32
   */
  lowScoreQty?: number;
  /** 小于85分占比 */
  lowScoreRate?: number;
  /**
   * 所有需求总数
   * @format int32
   */
  totalQty?: number;
  /**
   * 总评分
   * @format int32
   */
  totalScore?: number;
  /**
   * 未评分数量
   * @format int32
   */
  unScoreQty?: number;
  /** 未评分占比 */
  unScoreRate?: number;
}

/** FinishStaticsBean */
export interface FinishStaticsBean {
  /**
   * 已经落地数量
   * @format int32
   */
  landQty?: number;
  /** 落地率 */
  landRate?: number;
  /**
   * 超时交付数量
   * @format int32
   */
  lateTimeQty?: number;
  /** 超时交付率 */
  lateTimeRate?: number;
  /**
   * 及时交付数量
   * @format int32
   */
  onTimeQty?: number;
  /** 及时交付率 */
  onTimeRate?: number;
  /**
   * 时间值
   * @format int32
   */
  timeInt?: number;
  /** 时间描述 */
  timeIntDesc?: string;
  /**
   * 所有需求总数
   * @format int32
   */
  totalQty?: number;
  /**
   * 及时交付计算数量
   * @format int32
   */
  totalTimeQty?: number;
  /**
   * 未反馈
   * @format int32
   */
  unFeedbackQty?: number;
  /** 未反馈率 */
  unFeedbackRate?: number;
  /**
   * 未落地数量
   * @format int32
   */
  unLandQty?: number;
  /** 未落地率 */
  unLandRate?: number;
}

/** FlowBean */
export interface FlowBean {
  /** 审核编码 */
  code?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorDesc?: string;
  /** 日志列表 */
  logList?: LogBean[];
  /** 审核名称 */
  name?: string;
  /**
   * 审核节点个数
   * @format int32
   */
  nodeNums?: number;
  /** 输出信息 */
  outInfo?: string;
  pcode?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 规则描述 */
  ruleDesc?: string;
  /** spel 表达式 */
  spelExpression?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态: 0-启用 1-禁用 */
  statusDesc?: string;
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
  /** 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** FlowChangeStatusReq */
export interface FlowChangeStatusReq {
  /** 审核编码 */
  code?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** FlowConditionBean */
export interface FlowConditionBean {
  /** 是否父子关联 */
  checkStrictly?: boolean;
  /**
   * 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含
   * @format int32
   */
  compareType?: number;
  /** 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含 */
  compareTypes?: number[];
  /** 自定义Spel */
  customerSpel?: Record<string, string>;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 是否必填 */
  required?: boolean;
  /** 单选多选下拉框值 */
  selectValueList?: FlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
  /** 值  type如果是单选则是具体值，多选的话则是数组 */
  value?: object;
}

/** FlowConditionTemplateBean */
export interface FlowConditionTemplateBean {
  /** 是否父子关联 */
  checkStrictly?: boolean;
  /**
   * 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含
   * @format int32
   */
  compareType?: number;
  /** 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含 */
  compareTypes?: number[];
  /** 自定义Spel */
  customerSpel?: Record<string, string>;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 是否必填 */
  required?: boolean;
  /** 单选多选下拉框值 */
  selectValueList?: FlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型: 0-单选 1-多选 2-单值数字输入 3-区间数字输入 4-多选-输入框 5-单选-并输入整数框 6-多选-并输入整数框(要求 value = "%s[%s],%s[%s]" 数组 例如 ['SKU-A[1]','SKU-B[2]'])
   * @format int32
   */
  type?: number;
}

/** FlowDetailQueryResp */
export interface FlowDetailQueryResp {
  /** 基本信息 */
  baseInfo?: FlowBean;
  /** 子流程列表 */
  childList?: FlowDetailQueryResp[];
  /** 条件列表 */
  conditionList?: FlowConditionBean[];
  /** 节点列表 */
  nodeList?: FlowNodeBean[];
  /** 输出 */
  outParamList?: FlowOutBean[];
  /** 共享参数 */
  shareDictMap?: Record<string, FlowDictBean[]>;
}

/** FlowDictBean */
export interface FlowDictBean {
  childrenList?: FlowDictBean[];
  /** 输出子条件 */
  childrenOutTemplateList?: FlowOutBean[];
  /** 字典描述 */
  desc?: string;
  /** 过滤条件1 */
  filter1List?: string[];
  /** 过滤条件2 */
  filter2List?: string[];
  params?: object;
  /** 字典值 */
  value?: string;
}

/** FlowListQueryReq */
export interface FlowListQueryReq {
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
  /** 状态筛选：0-启用 1-禁用 */
  statusList?: number[];
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
}

/** FlowListQueryResp */
export interface FlowListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: FlowBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FlowNodeBean */
export interface FlowNodeBean {
  /**
   * 自动审核 0-否 1-是
   * @format int32
   */
  auto?: number;
  /** 审核编码 */
  code?: string;
  /** 审核人来源值回显： dept_manager-部门负责人 */
  deptInfos?: DeptInfo[];
  /** 节点名称 */
  name?: string;
  operator?: string;
  /** 审核人 */
  operatorNames?: string[];
  /** 审核人 */
  operators?: string[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 审核人来源类型（枚举，比如：fixed-固定员工、manager-发起人直属上级 dept_manager-部门负责人）  */
  sourceType?: string;
  /** 审核人来源值 */
  sourceValue?: string;
  /**
   * 类型：0-and 1-or
   * @format int32
   */
  type?: number;
}

/** FlowOutBean */
export interface FlowOutBean {
  /** 是否必选 */
  mustSelect?: boolean;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 关联条件NameCode */
  relevanceNameCode?: string;
  /** 是否必填 */
  required?: boolean;
  /** 单选多选下拉框值 */
  selectValueList?: FlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
  /** 值  type如果是单选则是具体值，多选的话则是数组 */
  value?: object;
}

/** FlowOutTemplateBean */
export interface FlowOutTemplateBean {
  /** 是否必选 */
  mustSelect?: boolean;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 关联条件NameCode */
  relevanceNameCode?: string;
  /** 单选多选下拉框值 */
  selectValueList?: FlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
}

/** FlowSaveBaseInfo */
export interface FlowSaveBaseInfo {
  /** 审核编码 */
  code?: string;
  /** 审核名称 */
  name?: string;
  /** 输出信息 */
  outInfo?: string;
  pcode?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
}

/** FlowSaveCondition */
export interface FlowSaveCondition {
  /**
   * 比较类型: 0-等于 1-含于
   * @format int32
   */
  compareType?: number;
  /** 条件名 */
  name?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
  /** 值  type如果是单选则是具体值，多选的话则是数组, 区间数字值则类似1-9 */
  value?: object;
}

/** FlowSaveNode */
export interface FlowSaveNode {
  /**
   * 自动审核 0-否 1-是
   * @format int32
   */
  auto?: number;
  /** 节点名称 */
  name?: string;
  /** 审核人 */
  operators?: string[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 审核人来源类型（枚举，比如：fixed-固定员工、manager-发起人直属上级 dept_manager-部门负责人）  */
  sourceType?: string;
  /** 审核人来源值 */
  sourceValue?: string;
  /**
   * 类型：0-and 1-or
   * @format int32
   */
  type?: number;
}

/** FlowSaveReq */
export interface FlowSaveReq {
  /** 基本信息 */
  baseInfo?: FlowSaveBaseInfo;
  /** 子流程列表 */
  childList?: FlowSaveReq[];
  /** 条件列表 */
  conditionList?: FlowSaveCondition[];
  /** 节点列表 */
  nodeList?: FlowSaveNode[];
  /** 输出列表 */
  outParamList?: FlowOutBean[];
}

/** FlowTemplateResp */
export interface FlowTemplateResp {
  /** 子流程列表 */
  childList?: FlowTemplateResp[];
  /** 条件列表 */
  conditionList?: FlowConditionTemplateBean[];
  /** 输出参数 */
  outParamList?: FlowOutTemplateBean[];
  /** 共享参数 */
  shareDictMap?: Record<string, FlowDictBean[]>;
}

/** IfNewNotifyResp */
export interface IfNewNotifyResp {
  /**
   * 是否有新通知
   * @example true
   */
  fresh?: boolean;
}

/** ItemBean */
export interface ItemBean {
  /** 对象编码 */
  itemCode?: string;
  /** 对象名称 */
  itemName?: string;
}

/** ItemResp */
export interface ItemResp {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 子节点 */
  children?: ItemResp[];
  /**
   * 层级
   * @format int32
   */
  level?: number;
  /** 模块 */
  module?: string;
  /** 父级分类编码 */
  parentCategoryCode?: string;
}

/** LabelCategoryTreeQueryReq */
export interface LabelCategoryTreeQueryReq {
  /** 分类名称 */
  categoryName?: string;
  /** 模块 */
  module: string;
}

/** LabelCategoryTreeQueryResp */
export interface LabelCategoryTreeQueryResp {
  /** 树结果 */
  treeList?: ItemResp[];
}

/** LabelDeleteReq */
export interface LabelDeleteReq {
  /** 标签编码 */
  labelCode?: string;
}

/** LabelInfoBean */
export interface LabelInfoBean {
  /** 子标签集合 */
  childInfoList?: LabelInfoBean[];
  /** 公司名称 */
  companyCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 标签描述 */
  desc?: string;
  /** 标签code */
  labelCode?: string;
  /**
   * 标签类型 1-系统标签 2-自定义标签
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 等级描述 */
  levelDesc?: string;
  /** 模块 */
  module?: string;
  /** 模块描述 */
  moduleDesc?: string;
  /** 标签名称 */
  name?: string;
  /** 父级标签code */
  parentLabelCode?: string;
  /** 父级标签名称 */
  parentName?: string;
  /**
   * 标签顺序
   * @format int32
   */
  sort?: number;
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

/** LabelListQueryResp */
export interface LabelListQueryResp {
  code?: string;
  /** 标签列表 */
  labelInfoList?: LabelInfoBean[];
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

/** LabelModelBean */
export interface LabelModelBean {
  /** 描述 */
  desc?: string;
  /** 模块 */
  module?: string;
}

/** LabelModelResp */
export interface LabelModelResp {
  /** 标签模块集合 */
  labelModelList?: LabelModelBean[];
}

/** LabelModelSaveReq */
export interface LabelModelSaveReq {
  /** 模块名称 */
  moduleDesc: string;
}

/** LabelModelSaveResp */
export interface LabelModelSaveResp {
  /** 模块编码 */
  moduleCode?: string;
}

/** LabelSaveMultiReq */
export interface LabelSaveMultiReq {
  /** 标签名称 */
  labelName?: string;
  /**
   * 标签类型 1-系统标签 2-自定义标签
   * @format int32
   */
  labelType?: number;
  /** 标签模块 meta-红人  不传默认meta */
  module?: string;
  /** 父级标签编码 */
  parentLabelCode?: string;
  /** 父级标签名称 */
  parentLabelName?: string;
}

/** LabelSaveReq */
export interface LabelSaveReq {
  /** 标签描述 */
  desc?: string;
  /** 标签code */
  labelCode?: string;
  /**
   * 标签类型 1-系统标签 2-自定义标签
   * @format int32
   */
  labelType?: number;
  /** 标签模块 meta-红人 */
  module?: string;
  /** 标签名称 */
  name?: string;
  /** 父级标签 */
  parentLabelCode?: string;
  /**
   * 标签顺序
   * @format int32
   */
  sort?: number;
  /**
   * 标签状态 1-启动 0-关闭
   * @format int32
   */
  status?: number;
}

/** LabelSaveResp */
export interface LabelSaveResp {
  /** 标签编码 */
  labelCode?: string;
}

/** LeadBpActionResp */
export interface LeadBpActionResp {
  /** 当前 BP unique_code */
  bpOwner?: string;
  /** 更新后节点 code */
  newNode?: string;
  /** 更新后子状态 code */
  newSubStatus?: string;
  /** 当前 IT 产品 unique_code */
  productManager?: string;
}

/** LeadBpConfirmReq */
export interface LeadBpConfirmReq {
  /** 线索编码 */
  leadCode?: string;
  /** 产品经理 unique_code */
  productManager?: string;
  /**
   * 评估备注
   * @minLength 0
   * @maxLength 200
   */
  remark?: string;
}

/** LeadBpTransferReq */
export interface LeadBpTransferReq {
  /** 线索编码 */
  leadCode?: string;
  /** 新 BP unique_code */
  newBpOwner?: string;
  /**
   * 转交说明
   * @minLength 0
   * @maxLength 200
   */
  reason?: string;
}

/** LeadDeptMappingItem */
export interface LeadDeptMappingItem {
  /** 业务领域列表 */
  bizDomainList?: string[];
  /** 业务领域，逗号分隔 */
  bizDomains?: string;
  /** 数字化业务代表 unique_code */
  bpMember?: string;
  /** 数字化业务代表名称 */
  bpMemberName?: string;
  /** 数字化BP unique_code */
  bpOwner?: string;
  /** 数字化BP 名称 */
  bpOwnerName?: string;
  /**
   * 组织 deptId
   * @format int64
   */
  deptId?: number;
  /** 组织名称 */
  deptName?: string;
  /** 部门长 unique_code（快照） */
  deptOwner?: string;
  /** 部门长名称（快照） */
  deptOwnerName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 业务中台代表 unique_code */
  midPlatformMember?: string;
  /** 业务中台代表名称 */
  midPlatformMemberName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** LeadDeptMappingListResp */
export interface LeadDeptMappingListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 映射记录 */
  records?: LeadDeptMappingItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LeadDeptMappingSaveReq */
export interface LeadDeptMappingSaveReq {
  /** 业务领域多选 */
  bizDomainList?: string[];
  /** 数字化业务代表 unique_code */
  bpMember?: string;
  /** 数字化BP unique_code */
  bpOwner?: string;
  /**
   * 组织 deptId（一级或二级部门）
   * @format int64
   */
  deptId?: number;
  /**
   * 主键，编辑时必填
   * @format int64
   */
  id?: number;
  /** 业务中台代表 unique_code */
  midPlatformMember?: string;
}

/** LeadDeptMappingSaveResp */
export interface LeadDeptMappingSaveResp {
  /**
   * 主键
   * @format int64
   */
  id?: number;
}

/** LeadDetailResp */
export interface LeadDetailResp {
  /** AI评估结果 */
  assessment?: AssessmentInfo;
  /** 基础信息 */
  basicInfo?: BasicInfo;
  /** 当前用户是否可执行 BP 转交/确认操作 */
  canBpAction?: boolean;
  /** 线索编码 */
  leadCode?: string;
  /** 当前节点 code */
  node?: string;
  /** 当前节点名称 */
  nodeName?: string;
  /** 流程进度节点 */
  processSteps?: ProcessStep[];
  /** 评审信息 */
  reviewInfo?: ReviewInfo;
  /** 节点子状态 code */
  subStatus?: string;
  /** 节点子状态名称 */
  subStatusName?: string;
}

/** LeadOperationLogResp */
export interface LeadOperationLogResp {
  /** 操作日志列表，按时间升序 */
  records?: LogItem[];
}

/** LeadReviewReq */
export interface LeadReviewReq {
  /** 线索编码 */
  leadCode?: string;
  /** 指派系统线负责人 unique_code，approve 时必填 */
  productLineOwner?: string;
  /** 评级：S/A/B/C */
  rating?: string;
  /** 审核结论：approve/reject/hold */
  reviewConclusion?: string;
  /** 审核意见 */
  reviewOpinion?: string;
}

/** LeadReviewResp */
export interface LeadReviewResp {
  /** 更新后节点 code */
  newNode?: string;
  /** 更新后子状态 code */
  newSubStatus?: string;
}

/** LeadSubmitReq */
export interface LeadSubmitReq {
  /** 附件列表，每项 {ossKey, name} */
  attachments?: Attachment[];
  /** 所属部门：存二级部门 deptId 字符串（沿用 bizLine 字段语义切换） */
  bizLine?: string;
  /** 需求背景 */
  demandBackground?: string;
  /** 需求内容 */
  demandContent?: string;
  /** 线索名称 */
  demandName?: string;
  /** 线索类型：new_system/flow_optimize/feature_enhance/data_build/bug_fix/ai_build */
  demandType?: string;
  /** 价值评估 */
  demandValue?: string;
  /**
   * 预期交付时间
   * @format date
   */
  expectDeliveryTime?: string;
  /** 影响人数范围：1_5/5_50/50_500/500_plus */
  impactPeopleRange?: string;
  /** 紧急程度：high/medium/low */
  urgency?: string;
}

/** LeadSubmitResp */
export interface LeadSubmitResp {
  /** 线索编码 */
  leadCode?: string;
}

/** LeadValueListItem */
export interface LeadValueListItem {
  /** 业务线 */
  bizLine?: string;
  /** 业务线对应一级部门长名称（来源：组织映射表快照） */
  bizLineDeptOwnerName?: string;
  /** BP 负责人 unique_code */
  bpOwner?: string;
  /** BP 负责人名称 */
  bpOwnerName?: string;
  /**
   * 提交时间
   * @format date-time
   */
  createTime?: string;
  /** 提交人名称 */
  creatorName?: string;
  /** 线索名称 */
  demandName?: string;
  /** 线索类型 */
  demandType?: string;
  /** 部门路径（一级 / 二级） */
  deptPath?: string;
  /** 是否已有AI评估 */
  hasAssessment?: boolean;
  /** 线索编码 */
  leadCode?: string;
  /** 当前节点 code */
  node?: string;
  /** 当前节点名称 */
  nodeName?: string;
  /** 产品经理 unique_code */
  productManager?: string;
  /** 产品经理名称 */
  productManagerName?: string;
  /** 评级 */
  rating?: string;
  /** 节点子状态 code */
  subStatus?: string;
  /** 节点子状态名称 */
  subStatusName?: string;
  /** 紧急程度 */
  urgency?: string;
}

/** LeadValueListResp */
export interface LeadValueListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 线索列表 */
  records?: LeadValueListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LeadValueStartAssessmentReq */
export interface LeadValueStartAssessmentReq {
  /** 是否强制重新评估 */
  forceRefresh?: boolean;
  /** 线索编码 */
  leadCode?: string;
}

/** LeadValueStartAssessmentResp */
export interface LeadValueStartAssessmentResp {
  /** 结构化评估结果JSON */
  assessmentJson?: string;
  /** Markdown评估结果 */
  assessmentMarkdown?: string;
  /**
   * 评估状态 0-处理中 1-成功 2-失败
   * @format int32
   */
  assessmentStatus?: number;
  /** 失败原因 */
  errorMsg?: string;
}

/** LogBean */
export interface LogBean {
  /** 日志名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** LogItem */
export interface LogItem {
  content?: string;
  /** @format date-time */
  createTime?: string;
  operationType?: string;
  operator?: string;
  operatorName?: string;
}

/** Mapping */
export interface Mapping {
  /** 资源编码 */
  resourceCode?: string;
  /** 角色编码 */
  roleCode?: string;
}

/** MediaBean */
export interface MediaBean {
  /** 媒体描述 */
  description?: string;
  /** 媒体等级 */
  level?: string;
  /** 媒体所属地区 */
  mediaArea?: string;
  /** 媒体分类 */
  mediaCategory?: string;
  /** 媒体分类描述 */
  mediaCategoryDesc?: string;
  /** 媒体名称 */
  mediaName?: string;
  /** 媒体类型 */
  mediaType?: string;
  /** 媒体类型描述 */
  mediaTypeDesc?: string;
  /** 媒体声量 */
  mediaVoice?: string;
  /** 媒体权重 */
  mediaWeight?: string;
  /** Website */
  webSite?: string;
}

/** MediaCategoryBean */
export interface MediaCategoryBean {
  /** 媒体分类 */
  mediaCategory?: string;
  /** 媒体分类中文 */
  mediaCategoryDesc?: string;
}

/** MeetingRoomBean */
export interface MeetingRoomBean {
  /** 会议室id */
  roomId?: string;
  /** 会议室名称 */
  roomName?: string;
  /**
   * 忙闲状态
   * @format int32
   */
  status?: number;
  /** 忙闲状态描述 */
  statusDesc?: string;
}

/** MeetingRoomResp */
export interface MeetingRoomResp {
  /** 会议室 */
  meetingRoomList?: MeetingRoomBean[];
}

/** MemberBean */
export interface MemberBean {
  /** 头像 */
  avatar?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 编码 */
  memberCode?: string;
  /** 名称 */
  memberName?: string;
  /** 任务编码 */
  taskCode?: string;
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

/** MenuDetailQueryResp */
export interface MenuDetailQueryResp {
  /** 组件名称 */
  componentName?: string;
  /**
   * 删除状态 0-未删除 1-已删除
   * @format int32
   */
  delStatus?: number;
  /** 菜单描述 */
  description?: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单类型 menu-菜单 button-按钮 */
  menuType?: string;
  /** 菜单名称 */
  name?: string;
  /** 父菜单id M0000-顶级菜单 */
  parentCode?: string;
  /** 重定向 */
  redirect?: string;
  /** 角色列编码表 */
  roleCodeList?: string[];
  /** 菜单简称 */
  shortName?: string;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
}

/** MenuInfoBean */
export interface MenuInfoBean {
  /** 是否选中 */
  checked?: boolean;
  /** 子菜单 */
  children?: MenuInfoBean[];
  /**
   * 收藏状态 0-未收藏 1-已收藏
   * @format int32
   */
  collectFlag?: number;
  /** 组件名称 */
  componentName?: string;
  /**
   * 删除状态 0-未删除 1-已删除
   * @format int32
   */
  delStatus?: number;
  /** 菜单描述 */
  description?: string;
  /** 扩展字段 */
  extraInfo?: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单类型 menu-菜单 button-按钮 url-URL链接 */
  menuType?: string;
  /** 菜单名称 */
  name?: string;
  /** 父菜单id M0000-顶级菜单 */
  parentCode?: string;
  /** 平台 */
  platform?: string;
  /** 重定向 */
  redirect?: string;
  /** 菜单简称 */
  shortName?: string;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
}

/** MenuOperateReq */
export interface MenuOperateReq {
  /**
   * 操作类型 1-删除 2-禁用 3-启用
   * @format int32
   */
  actionType?: number;
  /** 菜单编码 */
  menuCode?: string;
}

/** MenuOperateResp */
export interface MenuOperateResp {
  /** 菜单编码 */
  menuCode?: string;
}

/** MenuSaveReq */
export interface MenuSaveReq {
  /** 组件名称 */
  componentName?: string;
  /** 菜单描述 */
  description?: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单编码 更新时必传 */
  menuCode?: string;
  /** 菜单类型 menu-菜单 button-按钮 */
  menuType?: string;
  /** 菜单名称 */
  name?: string;
  /** 父菜单id M00000-顶级菜单 */
  parentCode?: string;
  /** 菜单所属平台 lute_os lute_iot lute_business... */
  platform?: string;
  /** 重定向 */
  redirect?: string;
  /** 角色编码 */
  roleCodeList?: string[];
  /** 菜单简称 */
  shortName?: string;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
}

/** MenuSaveResp */
export interface MenuSaveResp {
  /** 菜单编码 更新时必传 */
  menuCode?: string;
}

/** MenuTreeQueryResp */
export interface MenuTreeQueryResp {
  /** 按钮列表 + 菜单列表 */
  authList?: string[];
  /** MENU列表 */
  menuAuthList?: string[];
  /** 菜单信息列表 */
  menuList?: MenuInfoBean[];
}

/** MilestoneBean */
export interface MilestoneBean {
  /** 里程碑内容 */
  content?: string;
  /** 里程碑编码 */
  milestoneCode?: string;
  /**
   * 节点时间
   * @format date
   */
  nodeTime?: string;
  /** 任务编码 */
  taskCode?: string;
}

/** ModelRefreshReq */
export interface ModelRefreshReq {
  /** 强制刷新 */
  forceRefresh?: boolean;
  /** 模块编码 */
  modelCode?: string;
  /** 参数 */
  param?: Record<string, object>;
  /**
   * 多少时间后开始实际执行 单位毫秒
   * @format int32
   */
  sleepTime?: number;
}

/** MyWorkflowCountResp */
export interface MyWorkflowCountResp {
  code?: string;
  /**
   * 待办工单数
   * @format int32
   */
  count?: number;
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

/** NeedAvgStaticsBean */
export interface NeedAvgStaticsBean {
  /** 时间维度平均分 */
  avgScore?: number;
  /**
   * 计算需求总数
   * @format int32
   */
  calculateTotalCount?: number;
  /**
   * 需求总数
   * @format int32
   */
  needCount?: number;
  /**
   * 按时完成数量
   * @format int32
   */
  onTimeQty?: number;
  /** 按时完成比例 */
  onTimeRate?: number;
  /**
   * 时间周期
   * @format int32
   */
  timeInt?: number;
  /** 时间描述 */
  timeIntDesc?: string;
  /**
   * 需求总分
   * @format int32
   */
  totalScore?: number;
  /**
   * 完成总数
   * @format int32
   */
  totalTimeQty?: number;
}

/** NotifyAllLabelBean */
export interface NotifyAllLabelBean {
  /** 分类标签编码 */
  labelCode?: string;
  /** 分类标签名 */
  labelName?: string;
  /**
   * 分类标签下的通知数
   * @format int32
   */
  notifyCount?: number;
}

/** NotifyAllLabelResp */
export interface NotifyAllLabelResp {
  /** 分类标签信息列表 */
  labelList?: NotifyAllLabelBean[];
}

/** NotifyAttachmentBean */
export interface NotifyAttachmentBean {
  /** 文件key */
  fileKey: string;
  /** 文件名称 */
  fileName: string;
  /**
   * 文件大小（字节）
   * @example 1024
   */
  fileSize: string;
}

/** NotifyReportReq */
export interface NotifyReportReq {
  /** 用户编码 */
  memberCode: string;
  /** 通知编码 */
  notifyCode: string;
  /** 操作类型 我知道-known 查看详情-detail */
  operateType: string;
}

/** OpenClawUrlResp */
export interface OpenClawUrlResp {
  /** 部门描述 */
  deptRemark?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 匹配到的三级部门id */
  thirdDeptId?: string;
  /** openClaw地址 */
  url?: string;
}

/** OperateTypeItemBean */
export interface OperateTypeItemBean {
  /** 对象信息集合 */
  itemList?: ItemBean[];
  operateTypeDesc?: string;
}

/** OperationLogQueryBean */
export interface OperationLogQueryBean {
  /** 头像 */
  avatar?: string;
  /** 项目编码 */
  itemCode?: string;
  /** 项目类型 */
  itemType?: string;
  /** 子操作明细日志 */
  operateTypeItemList?: OperateTypeItemBean[];
  /** 更新内容(操作内容) */
  operationContent?: string;
  /**
   * 更新时间(操作时间)
   * @format date-time
   */
  operationTime?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 更新人(操作人) */
  operatorName?: string;
  /** 备注 */
  remark?: string;
}

/** OperationLogResp */
export interface OperationLogResp {
  code?: string;
  /**
   * 数量
   * @format int64
   */
  count?: number;
  /** 日志集合 */
  logList?: OperationLogQueryBean[];
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

/** OperationLogSaveReq */
export interface OperationLogSaveReq {
  /** 对象编码 */
  itemCode: string;
  /** 对象内容 */
  itemContent?: object;
  /** 对象类型 咨询后端，后端提供 */
  itemType?: string;
  /** 模块 咨询后端，后端提供 */
  moduleType?: string;
  /** 操作类型 咨询后端，后端提供 */
  operateType?: string;
  /** 备注 */
  remark?: string;
}

/** OssQueryResp */
export interface OssQueryResp {
  ossKey?: string;
  url?: string;
}

/** PayFileBean */
export interface PayFileBean {
  /** 付款凭证文件key */
  fileKey?: string;
  /** 付款凭证名称 */
  payFileName?: string;
}

/** PayFileBean0 */
export interface PayFileBean0 {
  /** 付款凭证文件key */
  fileUrl?: string;
  /** 付款凭证名称 */
  payFileName?: string;
}

/** PlatformBean */
export interface PlatformBean {
  /** 平台编码 */
  platform?: string;
  /** 平台描述 */
  platformDesc?: string;
}

/** PlatformLogBean */
export interface PlatformLogBean {
  /** 详情 */
  content?: string;
  /** 模块类型 */
  itemType?: string;
  /** 模块类型描述 */
  itemTypeDesc?: string;
  /** 模块 */
  module?: string;
  /** 模块描述 */
  moduleDesc?: string;
  /** 操作 */
  operate?: string;
  /**
   * 操作时间
   * @format date-time
   */
  operateTime?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
  /** 平台 rpe-路特创新RPE系统 dingTalk-钉钉 */
  platform?: string;
  /** 平台描述 */
  platformDesc?: string;
  /** 记录编码 */
  recordCode?: string;
}

/** PlatformLogReq */
export interface PlatformLogReq {
  /** 操作结束时间 */
  endTime?: string;
  /** 操作人 */
  operator: string;
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
  /** 平台 rpe-路特创新RPE系统 dingTalk-钉钉 钉钉管理后台-dingTalkAdmin */
  platform?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 操作开始时间 */
  startTime?: string;
}

/** PlatformLogResp */
export interface PlatformLogResp {
  code?: string;
  /** 日志集合 */
  logList?: PlatformLogBean[];
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

/** PlatformMappingChangeStatusReq */
export interface PlatformMappingChangeStatusReq {
  /**
   * 平台映射id
   * @format int64
   */
  id?: number;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** PlatformMappingDeletedReq */
export interface PlatformMappingDeletedReq {
  /** 平台映射id */
  ids?: number[];
}

/** PlatformMappingListReq */
export interface PlatformMappingListReq {
  /** 关键字 */
  keyword?: string;
  /** 映射编码 */
  mappingCode?: string;
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
  sourceList?: string[];
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 映射目标 */
  target?: string;
  targetList?: string[];
}

/** PlatformMappingListResp */
export interface PlatformMappingListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlatformMappingListRespData[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlatformMappingListRespData */
export interface PlatformMappingListRespData {
  /**
   * 平台映射id
   * @format int64
   */
  id?: number;
  /** 积加ID */
  jiJiaId?: string;
  /** 平台映射编码 */
  mappingCode?: string;
  /** 组织编码 */
  orgCode?: string;
  /** 映射源 */
  source?: string;
  /** 映射源扩展字段1 */
  sourceExt1?: string;
  /** 映射源扩展字段2 */
  sourceExt2?: string;
  /** 映射源扩展字段3 */
  sourceExt3?: string;
  /** 映射源扩展字段4 */
  sourceExt4?: string;
  /** 映射源扩展字段5 */
  sourceExt5?: string;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  statusDesc?: string;
  /** 映射值 */
  target?: string;
  /** 映射值扩展字段1 */
  targetExt1?: string;
  /** 映射值扩展字段2 */
  targetExt2?: string;
  /** 映射值扩展字段3 */
  targetExt3?: string;
  /** 映射值扩展字段4 */
  targetExt4?: string;
  /** 映射值扩展字段5 */
  targetExt5?: string;
  /**
   * 有效时间-结束
   * @format date-time
   */
  vaildEndTime?: string;
  /**
   * 有效时间-开始
   * @format date-time
   */
  vaildStartTime?: string;
}

/** PlatformMappingSaveOrUpdateReq */
export interface PlatformMappingSaveOrUpdateReq {
  /**
   * 平台映射id
   * @format int64
   */
  id?: number;
  /** 平台映射编码 */
  mappingCode?: string;
  /** 映射源 */
  source?: string;
  /** 映射源扩展字段1 */
  sourceExt1?: string;
  /** 映射源扩展字段2 */
  sourceExt2?: string;
  /** 映射源扩展字段3 */
  sourceExt3?: string;
  /** 映射源扩展字段4 */
  sourceExt4?: string;
  /** 映射源扩展字段5 */
  sourceExt5?: string;
  /** 映射值 */
  target?: string;
  /** 映射值扩展字段1 */
  targetExt1?: string;
  /** 映射值扩展字段2 */
  targetExt2?: string;
  /** 映射值扩展字段3 */
  targetExt3?: string;
  /** 映射值扩展字段4 */
  targetExt4?: string;
  /** 映射值扩展字段5 */
  targetExt5?: string;
  /**
   * 有效时间-结束
   * @format date-time
   */
  vaildEndTime?: string;
  /**
   * 有效时间-开始
   * @format date-time
   */
  vaildStartTime?: string;
}

/** PlatformRefreshBean */
export interface PlatformRefreshBean {
  /** 是否可以刷新 */
  canFlag?: boolean;
  /**
   * 上次刷新时间
   * @format date-time
   */
  lastRefreshTime?: string;
}

/** PlatformRoleBean */
export interface PlatformRoleBean {
  /** @format date-time */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 角色描述 */
  desc?: string;
  /** 平台 */
  platform?: string;
  /** 平台描述 */
  platformDesc?: string;
  /** 平台集合 */
  platformList?: PlatformBean[];
  /** 角色编号 */
  roleCode?: string;
  /** 角色名字 */
  roleName?: string;
  /**
   * 角色状态
   * @format int32
   */
  status?: number;
  /** 角色状态描述 */
  statusDesc?: string;
  /** @format date-time */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 更新人名称 */
  updaterName?: string;
}

/** PlatformRoleResourceSaveReq */
export interface PlatformRoleResourceSaveReq {
  /** 删除 */
  removeMappingList?: Mapping[];
  /** 新增/修改 */
  saveMappingList?: Mapping[];
}

/** ProcessStep */
export interface ProcessStep {
  stepCode?: string;
  stepName?: string;
  stepStatus?: string;
  /** @format date-time */
  transferredAt?: string;
}

/** ProductCenterDeptResp */
export interface ProductCenterDeptResp {
  /** 是否产品中心 */
  productCenterDeptFlag?: boolean;
}

/** ProvinceInfoBean */
export interface ProvinceInfoBean {
  /** 省份编码 */
  provinceCode?: string;
  /** 省份名称 */
  provinceName?: string;
  /** 省份名称（英文） */
  provinceNameEn?: string;
}

/** ProvinceInfoListQueryReq */
export interface ProvinceInfoListQueryReq {
  /** 国家编码 */
  countryCode: string;
  /** 关键词 */
  keyword?: string;
}

/** ProvinceInfoListQueryResp */
export interface ProvinceInfoListQueryResp {
  /** 省份信息 */
  provinceList?: ProvinceInfoBean[];
}

/** PurchaseItemBean */
export interface PurchaseItemBean {
  /** 指定供应商原因 */
  assignSupplierReason?: string;
  /** 币种 */
  currency?: string;
  /** 采购数量 */
  number?: number;
  /** 采购单价 */
  price?: number;
  /** 采购产品名称 */
  productName?: string;
  /** 采购产品sku */
  productSku?: string;
  /** 采购产品类型 */
  productType?: string;
  /** 采购单号 */
  purchaseCode?: string;
  /** 采购组编码 */
  purchaseGroup?: string;
  /** 采购组名称 */
  purchaseGroupName?: string;
  /** 采购项目编码 */
  purchaseItemCode?: string;
  /**
   * 采购行号
   * @format int32
   */
  purchaseLine?: number;
  /** 采购负责人编码集合 */
  purchaserCodeList?: string[];
  /** 备注 */
  remark?: string;
  /** 供应商 */
  supplier?: string;
}

/** PurchaseItemOperateBean */
export interface PurchaseItemOperateBean {
  /** 采购项记录编码 */
  purchaseItemCode?: string;
  /**
   * 查收数量
   * @min 0
   * @exclusiveMin false
   */
  receiveQuantity?: number;
}

/** PurchaseItemPriceBean */
export interface PurchaseItemPriceBean {
  /** 币种 */
  currency?: string;
  /** 数量 */
  num?: number;
  /** 金额 */
  price?: number;
}

/** PurchaseLineBean */
export interface PurchaseLineBean {
  /**
   * 发货商品行号
   * @format int32
   */
  deliveryItemNumber?: number;
  /** 发货数量 */
  deliveryNum?: number;
  /** 采购商品sku */
  productSku?: string;
  /**
   * 行状态 0-SRM已关闭 不是SRM已关闭状态，则可以不传
   * @format int32
   */
  status?: number;
}

/** PurchaseProductItemBean */
export interface PurchaseProductItemBean {
  /** 行号 */
  poItemNumber?: string;
  /** 行状态 */
  poItemStatus?: string;
  /** 供应链sku */
  productSku?: string;
}

/** PurchaserBean */
export interface PurchaserBean {
  memberCode?: string;
  name?: string;
}

/** RegionBean */
export interface RegionBean {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
}

/** RegionQueryResp */
export interface RegionQueryResp {
  /** 省份信息 */
  regionList?: RegionBean[];
}

/** RejectBean */
export interface RejectBean {
  /** 需求编码 */
  demandCode?: string;
  /** 驳回原因 */
  rejectReason?: string;
}

/** ResourceCooperBean */
export interface ResourceCooperBean {
  /** 资源类型名称 */
  cooperTypeList?: CooperTypeBean[];
  /** 资源类型编码 */
  resourceTypeCode?: string;
  /** 资源类型名称 */
  resourceTypeName?: string;
}

/** ReviewInfo */
export interface ReviewInfo {
  bpConfirmRemark?: string;
  bpOwner?: string;
  bpOwnerName?: string;
  productManager?: string;
  productManagerName?: string;
  rating?: string;
  reviewConclusion?: string;
  reviewOpinion?: string;
  /** @format date-time */
  reviewedAt?: string;
}

/** RoleAccountBean */
export interface RoleAccountBean {
  /** 账号编号 */
  accountCode?: string;
  /** 校验 */
  checked?: boolean;
  /** 名称 */
  name?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 来源编码 */
  sourceCode?: string;
  /** 唯一code */
  uniqueCode?: string;
}

/** RoleAccountResp */
export interface RoleAccountResp {
  /** 组织架构 */
  deptList?: Dept[];
  /** 角色 */
  roleCode?: string;
}

/** RoleAccountSaveReq */
export interface RoleAccountSaveReq {
  /** 组织架构 */
  deptList?: Dept[];
  /** 平台 */
  platform?: string;
  roleCode?: string;
}

/** RoleDetailResp */
export interface RoleDetailResp {
  /** 角色说明 */
  desc?: string;
  roleCode?: string;
  /** 角色名称 */
  roleName?: string;
  /** 已绑定的菜单平台 */
  selectedPlatformList?: PlatformBean[];
}

/** RoleListQueryPageResp */
export interface RoleListQueryPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 角色列表 */
  roleList?: PlatformRoleBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RoleListQueryResp */
export interface RoleListQueryResp {
  /** 角色列表 */
  roleList?: PlatformRoleBean[];
}

/** RoleMenuSaveReq */
export interface RoleMenuSaveReq {
  /** 角色描述 */
  desc?: string;
  /** 选中的平台菜单列表 */
  platformCheckedMenuList?: CheckedMenuBean[];
  /** 角色编码, 更新时必传 */
  roleCode?: string;
  /** 角色名字 */
  roleName?: string;
  /** 原角色编码 复制角色时，原角色的角色编码 */
  srcRoleCode?: string;
}

/** RoleMenuTreeQueryResp */
export interface RoleMenuTreeQueryResp {
  /** 选中菜单列表 */
  checkedMenuList?: string[];
  /** 菜单信息列表 */
  menuList?: MenuInfoBean[];
  /** 菜单所属平台 lute_os lute_iot lute_business... */
  platform?: string;
  /** 角色编码 */
  roleCode?: string;
}

/** RoleOperateReq */
export interface RoleOperateReq {
  /** 操作类型 enable-启用 disable-禁用 */
  operateType?: string;
  /** 角色编码 */
  roleCode?: string;
}

/** RoleRemoveReq */
export interface RoleRemoveReq {
  /** 角色编号, 更新时必传 */
  roleCode?: string;
}

/** RoleSaveReq */
export interface RoleSaveReq {
  /** 复制菜单角色 */
  copyMenuRole?: string;
  /** 角色描述 */
  desc?: string;
  /** 角色所属平台 lute_os lute_iot lute_business... */
  platform?: string;
  /** 角色编号, 更新时必传 */
  roleCode?: string;
  /** 角色名字 */
  roleName?: string;
}

/** RoleSaveResp */
export interface RoleSaveResp {
  /** 角色编号 */
  roleCode?: string;
}

/** SalesTendencyChartResp */
export interface SalesTendencyChartResp {
  /** 销售额-人民币 */
  amountSalesCnyList?: TendencyChartItem[];
  /** 销售额-美元币 */
  amountSalesUsdList?: TendencyChartItem[];
  /** 销量 */
  salesList?: TendencyChartItem[];
}

/** SearchConditionBean */
export interface SearchConditionBean {
  /** 搜索条件编码 */
  conditionCode?: string;
  /** 搜索条件名称 */
  conditionName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 是否删除
   * @format int64
   */
  deleted?: number;
  /**
   * 是否默认条件：1-是 0-否
   * @format int32
   */
  isDefault?: number;
  /** 模块标识 meta_user 红人标识 */
  itemType?: string;
  /** 模块标识 meta */
  moduleType?: string;
  /** 平台标识 rpe、kms、kol、meta等 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 搜索条件JSON格式 */
  searchCondition?: string;
  /**
   * 排序号
   * @format int32
   */
  sort?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SearchConditionListQueryResp */
export interface SearchConditionListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 条件列表 */
  recordList?: SearchConditionBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SearchConditionSaveReq */
export interface SearchConditionSaveReq {
  /** 搜索条件编码 更新时必传 */
  conditionCode?: string;
  /** 搜索条件名称 */
  conditionName?: string;
  /**
   * 是否默认
   * @format int32
   */
  isDefault?: number;
  /** 模块标识 user_list 红人列表 my_user 我的红人 user_resource 红人资源 */
  itemType?: string;
  /** 模块标识 meta */
  moduleType?: string;
  /** 平台标识 rpe、kms、kol、meta等 */
  platform?: string;
  /** 搜索条件JSON格式 */
  searchCondition?: string;
}

/** SearchConditionSaveResp */
export interface SearchConditionSaveResp {
  /** 编码 */
  conditionCode?: string;
}

/** ShowBean */
export interface ShowBean {
  /** 已完结数量列表 */
  endNumList?: number[];
  /** 内审中数量列表 */
  executingNumList?: number[];
  /** 内审未通过数量列表 */
  internalAuditNotPassNumList?: number[];
  /** 内审中数量列表 */
  internalAuditingNumList?: number[];
  /** 品线列表 */
  productLineList?: string[];
  /** 待反馈数量列表 */
  waitForFeedbackNumList?: number[];
  /** 待查收数量列表 */
  waitForReceiptNumList?: number[];
}

/** SiteBean */
export interface SiteBean {
  site?: string;
  siteName?: string;
}

/** SiteInfoBean */
export interface SiteInfoBean {
  /** 渠道id */
  channelId?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 站点编码 */
  siteCode?: string;
  /** 站点名称 */
  siteName?: string;
  /** 站点平台 amazon-亚马逊 station-独立站 */
  sitePlatform?: string;
  /** 时区 */
  timeZone?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SiteInfoDesp */
export interface SiteInfoDesp {
  /** 站点信息集合 */
  siteInfoList?: SiteBean[];
}

/** SiteListQueryResp */
export interface SiteListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 站点列表 */
  siteList?: SiteInfoBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SmartMeetingQueryRoomDeviceResp */
export interface SmartMeetingQueryRoomDeviceResp {
  /** 设备下拉列表 */
  deviceList?: SmartMeetingRoomDeviceSelectBean[];
}

/** SmartMeetingRoomBean */
export interface SmartMeetingRoomBean {
  /** 会议室地址 */
  address?: string;
  /** 会议室楼层 */
  floor?: string;
  /** 会议室具体地址 */
  locationHint?: string;
  /**
   * 会议室容量
   * @format int32
   */
  roomCapacity?: number;
  /**
   * 会议室类别 0-其他 1-培训室 2-超大会议室 3-大会议室 4-中会议室 5-小会议室
   * @format int32
   */
  roomCategory?: number;
  /** 会议室类别描述 0-其他 1-培训室 2-超大会议室 3-大会议室 4-中会议室 5-小会议室 */
  roomCategoryDesc?: string;
  /** 会议室编码 */
  roomCode?: string;
  /** 会议室名称 */
  roomName?: string;
  /**
   * 会议室状态 0-空闲 1-忙碌
   * @format int32
   */
  status?: number;
  /** 会议室状态描述 */
  statusDesc?: string;
}

/** SmartMeetingRoomDeviceBean */
export interface SmartMeetingRoomDeviceBean {
  /** 设备编码 */
  deviceCode?: string;
  /** 设备型号' */
  deviceModel?: string;
  /** 设备名称 */
  deviceName?: string;
  /**
   * 设备类型：0-辅助设备，1-核心设备
   * @format int32
   */
  deviceType?: number;
  /** 设备类型：0-辅助设备，1-核心设备 */
  deviceTypeDesc?: string;
  /**
   * 运营时长（小时）
   * @format int32
   */
  operationHours?: number;
  /** 会议室编码 */
  roomCode?: string;
  /**
   * 是否开启：0-关闭，1-开启
   * @format int32
   */
  status?: number;
  /** 是否开启：0-关闭，1-开启 */
  statusDesc?: string;
}

/** SmartMeetingRoomDeviceChangeReq */
export interface SmartMeetingRoomDeviceChangeReq {
  /** 设备编码 */
  deviceCode?: string;
  /**
   * 设备状态 0-关闭 1-开启
   * @format int32
   */
  status?: number;
}

/** SmartMeetingRoomDeviceResp */
export interface SmartMeetingRoomDeviceResp {
  code?: string;
  /** 会议室设备列表 */
  meetingRoomDeviceList?: SmartMeetingRoomDeviceBean[];
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

/** SmartMeetingRoomDeviceSaveReq */
export interface SmartMeetingRoomDeviceSaveReq {
  /** 设备编码列表 */
  deviceCode?: string;
  /** 设备型号 */
  deviceModel?: string;
  /**
   * 设备类型：0-辅助设备，1-核心设备
   * @format int32
   */
  deviceType?: number;
  /**
   * 运营时长（小时）
   * @format int32
   */
  operationHours?: number;
  /** 会议室编码 */
  roomCode?: string;
}

/** SmartMeetingRoomDeviceSelectBean */
export interface SmartMeetingRoomDeviceSelectBean {
  /** 设备编码 */
  deviceCode?: string;
  /** 设备名称(会议室名称) */
  deviceDesc?: string;
  /** 设备型号' */
  deviceModel?: string;
  /**
   * 运营时长（小时）
   * @format int32
   */
  operationHours?: number;
  /** 会议室编码 */
  roomCode?: string;
  /** 会议室名称 */
  roomName?: string;
}

/** SmartMeetingRoomResp */
export interface SmartMeetingRoomResp {
  code?: string;
  /** 会议室列表 */
  meetingRoomList?: SmartMeetingRoomBean[];
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

/** SseEmitter */
export interface SseEmitter {
  /** @format int64 */
  timeout?: number;
}

/** StatisticsItem */
export interface StatisticsItem {
  desc?: string;
  name?: string;
  /** @format int64 */
  num?: number;
  /** @format int32 */
  status?: number;
  value?: number;
}

/** SubTaskBean */
export interface SubTaskBean {
  /** 任务完成确认人 */
  acceptor?: string;
  /** 任务完成确认人头像 */
  acceptorAvatar?: string;
  /** 任务完成确认人名称 */
  acceptorName?: string;
  /**
   * 审批状态
   * @format int32
   */
  approvalStatus?: number;
  /** 审批状态描述 */
  approvalStatusDesc?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 任务详情描述/预期成果 */
  detail?: string;
  /**
   * 预计完成时间/截止时间
   * @format date-time
   */
  endTime?: string;
  /** 执行人 */
  handler?: string;
  /** 执行人头像 */
  handlerAvatar?: string;
  /** 执行人名称 */
  handlerName?: string;
  /** 共同执行人 */
  memberList?: MemberBean[];
  /** 任务名称 */
  name?: string;
  /**
   * 来源
   * @format int32
   */
  source?: number;
  /** 来源 */
  sourceDesc?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态描述 */
  statusDesc?: string;
  /** 任务分类编码 */
  taskCategoryCode?: string;
  /** 任务分类名称 */
  taskCategoryName?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 是否启用里程碑
   * @format int32
   */
  useMilestone?: number;
  /**
   * 是否启动周报
   * @format int32
   */
  useWeeklyReport?: number;
}

/** SysTemplateDetailResp */
export interface SysTemplateDetailResp {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 状态 1-启用 0-禁用 */
  statusDesc?: string;
  /** 模板内容 */
  template?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板类型 notice-消息通知 */
  type?: string;
  /** 類型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /** 更新人名称 */
  updatorName?: string;
}

/** SysTemplateListBean */
export interface SysTemplateListBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 状态 1-启用 0-禁用 */
  statusDesc?: string;
  /** 模板内容 */
  template?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板类型 notice-消息通知 */
  type?: string;
  /** 類型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /** 更新人名称 */
  updatorName?: string;
}

/** SysTemplateOperateReq */
export interface SysTemplateOperateReq {
  /** 操作类型 enable-启用 disable-禁用 */
  operateType?: string;
  /** 模板编码 */
  templateCode?: string;
}

/** SysTemplateOperateResp */
export interface SysTemplateOperateResp {
  /** 模板编码 */
  templateCode?: string;
}

/** SysTemplateQueryResp */
export interface SysTemplateQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 模板信息集合 */
  sysTemplateList?: SysTemplateListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SysTemplateSaveReq */
export interface SysTemplateSaveReq {
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 模板内容 */
  template?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板类型 notice-消息通知 */
  type?: string;
}

/** SysTemplateSaveResp */
export interface SysTemplateSaveResp {
  /** 模板编码 */
  templateCode?: string;
}

/** TaskCategoryBean */
export interface TaskCategoryBean {
  /** 任务分类编码 */
  taskCategoryCode?: string;
  /** 任务分类名称 */
  taskCategoryName?: string;
}

/** TaskCategoryListResp */
export interface TaskCategoryListResp {
  /** 任务分类列表 */
  taskCategoryList?: TaskCategoryBean[];
}

/** TaskCategorySaveReq */
export interface TaskCategorySaveReq {
  /** 任务分类名称 */
  name?: string;
}

/** TaskCategorySaveResp */
export interface TaskCategorySaveResp {
  /** 任务分类编码 */
  taskCategoryCode?: string;
}

/** TaskChangeDetailResp */
export interface TaskChangeDetailResp {
  /** 变更原因 */
  changeReason: string;
  /**
   * 原预计完成时间
   * @format date-time
   */
  endTime: string;
  /** 里程碑信息 */
  milestoneList?: MilestoneBean[];
  /**
   * 新预计完成时间
   * @format date-time
   */
  newEndTime: string;
  /**
   * 新开始时间
   * @format date-time
   */
  newStartTime: string;
  /** 变更前任务分类名称 */
  newTaskCategoryName?: string;
  /**
   * 原开始时间
   * @format date-time
   */
  startTime: string;
  /** 变更前任务分类名称 */
  taskCategoryName?: string;
  /** 任务编码 */
  taskCode: string;
}

/** TaskChangeReq */
export interface TaskChangeReq {
  /** 附件key */
  changeFileKey?: string;
  /** 附件名称 */
  changeFileName?: string;
  /** 变更原因 */
  changeReason?: string;
  /** 任务详情 */
  detail?: string;
  /** 任务执行人 */
  handler?: string;
  /** 任务里程碑 */
  milestoneList?: MilestoneBean[];
  /** 任务标题 */
  name?: string;
  /**
   * 预计完成时间
   * @format date
   */
  newEndTime: string;
  /** 任务周报 */
  reportList?: TaskReportBean[];
  /**
   * 任务来源
   * @format int32
   */
  source?: number;
  /** 任务类别 */
  taskCategoryCode?: string;
  /** 任务编码 */
  taskCode: string;
}

/** TaskDetailResp */
export interface TaskDetailResp {
  /** 任务关闭确认人 */
  acceptor?: string;
  /** 任务关闭确认人头像 */
  acceptorAvatar?: string;
  /** 任务关闭确认人名称 */
  acceptorName?: string;
  /**
   * 审批状态
   * @format int32
   */
  approvalStatus?: number;
  /** 审批状态描述 */
  approvalStatusDesc?: string;
  /** 上传附件 */
  attachmentList?: Attachment[];
  /** 按钮权限 */
  buttonAuth?: ButtonAuth;
  /** 日程链接 */
  calendarLinkList?: string[];
  /** 附件key */
  changeFileKey?: string;
  /** 附件名称 */
  changeFileName?: string;
  /** 变更原因 */
  changeReason?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 每周日期
   * @format int32
   */
  day?: number;
  /** 任务详情描述/预期成果 */
  detail?: string;
  /**
   * 预计完成时间
   * @format date-time
   */
  endTime?: string;
  /** 责任人 */
  handler?: string;
  /** 责任人头像 */
  handlerAvatar?: string;
  /** 责任人名称 */
  handlerName?: string;
  /** 附件在线文档链接 */
  linkList?: string[];
  /** 共同执行人 */
  memberList?: MemberBean[];
  /** 里程碑信息 */
  milestoneList?: MilestoneBean[];
  /** 任务名称 */
  name?: string;
  /** 父级任务编码 */
  parentTaskCode?: string;
  /** 父任务名称 */
  parentTaskName?: string;
  /** 拒绝原因 */
  rejectReason?: string;
  /**
   * 来源
   * @format int32
   */
  source?: number;
  /** 来源 */
  sourceDesc?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态描述 */
  statusDesc?: string;
  /** 子任务 */
  subTaskList?: SubTaskBean[];
  /** 任务分类编码 */
  taskCategoryCode?: string;
  /** 任务分类名称 */
  taskCategoryName?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 周报信息 */
  taskReportList?: TaskReportBean[];
  /**
   * 是否启用里程碑
   * @format int32
   */
  useMilestone?: number;
  /**
   * 是否启动周报
   * @format int32
   */
  useWeeklyReport?: number;
}

/** TaskExportReq */
export interface TaskExportReq {
  /** 任务创建人 */
  creatorList?: string[];
  /**
   * 截止结束日期
   * @format date
   */
  endDate?: string;
  /** 任务执行人 */
  handlerList?: string[];
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
  /** 任务来源 */
  sourceList?: number[];
  /**
   * 截止开始日期
   * @format date
   */
  startDate?: string;
  /** 状态 */
  statusList?: number[];
  /** 任务分类编码 */
  taskCategoryCode?: string;
  /** 勾选导出记录编码 */
  taskCodeList?: string[];
  /**
   * 周报结束日期
   * @format date
   */
  weekReportEndDate?: string;
  /**
   * 周报开始日期
   * @format date
   */
  weekReportStartDate?: string;
}

/** TaskListBean */
export interface TaskListBean {
  /** 任务完成确认人 */
  acceptor?: string;
  /** 任务完成确认人头像 */
  acceptorAvatar?: string;
  /** 任务完成确认人名称 */
  acceptorName?: string;
  /** 子任务 */
  childTaskList?: TaskListBean[];
  /**
   * 关闭时间
   * @format date-time
   */
  closeTime?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 本周进展描述 */
  currWeekReviewDesc?: string;
  /** 交付物 */
  deliverable?: string;
  /** 交付物链接 */
  deliverableUrl?: string;
  /** 任务详情 */
  detail?: string;
  /**
   * 截止时间
   * @format date
   */
  endTime?: string;
  /**
   * 是否跟进 1-跟进 0-否
   * @format int32
   */
  followFlag?: number;
  /** 执行人 */
  handler?: string;
  /** 执行人头像 */
  handlerAvatar?: string;
  /** 执行人名称 */
  handlerName?: string;
  /** 最新进展 */
  latestReview?: string;
  /** 里程碑 */
  milestoneList?: MilestoneBean[];
  /** 任务标题 */
  name?: string;
  /** 父级任务编码 */
  parentTaskCode?: string;
  /** 父级任务名称 */
  parentTaskName?: string;
  /** 下周工作计划进展 */
  planReview?: string;
  /**
   * 当周进展结束时间
   * @format date
   */
  reviewEndDate?: string;
  /**
   * 当周进展开始时间
   * @format date
   */
  reviewStartDate?: string;
  /**
   * 任务来源
   * @format int32
   */
  source?: number;
  /** 任务来源描述 */
  sourceDesc?: string;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /** 任务状态 */
  status?: string;
  /** 任务状态描述 */
  statusDesc?: string;
  /** 任务分类名称 */
  taskCategoryName?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** TaskListResp */
export interface TaskListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 任务列表 */
  taskList?: TaskListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TaskOperateReq */
export interface TaskOperateReq {
  /** 附件 */
  attachmentList?: AttachmentBean[];
  /** 员工编码 add_member-添加员工 必传 */
  memberCodeList?: string[];
  /** 里程碑信息  confirm_finish-确认完成任务 milestone-提交里程碑 必传 */
  milestoneList?: MilestoneBean[];
  /** 操作类型 approve-确认发起 add_member-添加员工 confirm-接受/驳回任务 approve_finish-发起完成任务 confirm_finish-确认/驳回完成任务 task_report-周报 task_report_apply-周报审批 approve_change-变更审批 update_status-状态变更 upload_file 上传附件 milestone-里程碑 follow-关注  */
  operateType?: string;
  /** 拒绝原因 confirm-驳回任务 confirm_finish-驳回完成任务  */
  reason?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 任务编码 approve-确认发起 add_member-添加员工 confirm-接受任务 approve_change-变更审批 follow-关注必传 */
  taskCode?: string;
  /** 周报内容 task_report-周报 */
  taskReport?: TaskReportBean;
  /**
   * 操作类型 1-添加员工/接受任务/关闭任务通过/关注/周报审批通过 0-删减员工/拒绝任务/关闭任务驳回/取消关注/周报审批拒绝;  add_member-添加员工 confirm-接受/驳回任务 approve_change-变更审批 follow-关注 task_report_apply-周报审批 必传
   * @format int32
   */
  type?: number;
}

/** TaskOperateResp */
export interface TaskOperateResp {
  /** 任务编码 */
  taskCode?: string;
}

/** TaskReportBean */
export interface TaskReportBean {
  /** 交付物 */
  deliverable?: string;
  /** 交付物链接 */
  deliverableUrl?: string;
  /** 进展描述 */
  description?: string;
  /** 下周计划内容 */
  planContent?: string;
  /**
   * 下周计划结束时间
   * @format date
   */
  planEndDate?: string;
  /**
   * 下周计划开始时间
   * @format date
   */
  planStartDate?: string;
  /** 周报编码 */
  reportCode?: string;
  /** 当周进展内容 */
  reviewContent?: string;
  /**
   * 当周进展结束时间
   * @format date
   */
  reviewEndDate?: string;
  /**
   * 当周进展开始时间
   * @format date
   */
  reviewStartDate?: string;
  /**
   * 提交日期
   * @format date-time
   */
  submitDate?: string;
  taskCode?: string;
}

/** TaskSaveReq */
export interface TaskSaveReq {
  /** 任务关闭确认人 */
  acceptor?: string;
  /** 上传附件 */
  attachmentList?: AttachmentBean[];
  /** 日程链接 */
  calendarLinkList?: string[];
  /** 任务详情描述/预期成果 */
  detail?: string;
  /**
   * 预计完成时间
   * @format date
   */
  endTime?: string;
  /** 任务执行人 */
  handler?: string;
  /** 附件在线文档链接 */
  linkList?: string[];
  /** 参与用户 */
  memberCodeList?: string[];
  /** 任务名称 */
  name: string;
  /** 操作类型 save-保存 approve-发起任务 */
  operateType?: string;
  /** 父级任务编码 */
  parentTaskCode?: string;
  /**
   * 来源
   * @format int32
   */
  source?: number;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /** 任务分类编码 */
  taskCategoryCode?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 是否启动里程碑
   * @format int32
   */
  useMilestone?: number;
  /**
   * 是否启动周报
   * @format int32
   */
  useWeeklyReport?: number;
}

/** TaskSaveResp */
export interface TaskSaveResp {
  /** 任务编码 */
  taskCode?: string;
}

/** TaskStatisticsReq */
export interface TaskStatisticsReq {
  /**
   * 关闭结束时间
   * @format date
   */
  closeEndTime?: string;
  /**
   * 关闭开始时间
   * @format date
   */
  closeStartTime?: string;
  /**
   * 本部门创建 1-勾选 0-不勾选
   * @format int32
   */
  createFlag?: number;
  /**
   * 创建结束时间
   * @format date
   */
  endTime?: string;
  /**
   * 本部门处理 1-勾选 0-不勾选
   * @format int32
   */
  handleFlag?: number;
  /**
   * 我执行的 1-勾选 0-不勾选
   * @format int32
   */
  mineHandleFlag?: number;
  /**
   * 我共同执行的 1-勾选 0-不勾选
   * @format int32
   */
  mineJoinHandleFlag?: number;
  /**
   * 创建开始时间
   * @format date
   */
  startTime?: string;
  /**
   * 状态 1-已关闭 0-未关闭
   * @format int32
   */
  status?: number;
}

/** TaskStatisticsResp */
export interface TaskStatisticsResp {
  /**
   * 延期数
   * @format int64
   */
  delayNum?: number;
  /**
   * 延期率
   * @format double
   */
  delayPercent?: number;
  statisticsItemList?: StatisticsItem[];
  /**
   * 任务事项总数
   * @format int64
   */
  sum?: number;
}

/** TbBean */
export interface TbBean {
  /** 需求编码 */
  demandCode?: string;
  /** TB编码 */
  tbCode?: string;
}

/** TendencyChartItem */
export interface TendencyChartItem {
  /**
   * 日期
   * @format date-time
   */
  day?: string;
  /** 具体值 */
  value?: number;
  /** 具体值 */
  valueDesc?: string;
}

/** TodoWorkflowRecordBean */
export interface TodoWorkflowRecordBean {
  /** 待办执行人列表 */
  executorList?: MemberBean[];
  /**
   * 导出类型
   * @format int32
   */
  exportType?: number;
  /** 导出类型描述 */
  exportTypeDesc?: string;
  /** 待办参与人列表 */
  participantList?: MemberBean[];
  /** 待办内容 */
  todoContent?: object;
  /** 钉钉待办描述 */
  todoDesc?: string;
  /**
   * 钉钉待办截止时间
   * @format date-time
   */
  todoDueTime?: string;
  /**
   * 钉钉待办完成时间
   * @format date-time
   */
  todoFinishTime?: string;
  /** 钉钉待办id */
  todoId?: string;
  /**
   * 钉钉待办开始时间
   * @format date-time
   */
  todoStartTime?: string;
  /** 钉钉待办标题 */
  todoSubject?: string;
}

/** UserNotifyDetailBean */
export interface UserNotifyDetailBean {
  /** 附件列表 */
  attachmentList?: NotifyAttachmentBean[];
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /** 详情链接 */
  detailUrl?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** UserNotifyListBean */
export interface UserNotifyListBean {
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** UserNotifyListResp */
export interface UserNotifyListResp {
  code?: string;
  message?: string;
  /** 通知列表 */
  notifyList?: UserNotifyListBean[];
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

/** WorkflowDetailQueryResp */
export interface WorkflowDetailQueryResp {
  /** 审批信息 */
  approveInfo?: ApproveWorkflowRecordBean;
  /** 附件集合 */
  attachmentList?: WorkflowRecordAttachmentBean[];
  /** 配置编号 */
  configCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作人 */
  creator?: string;
  /** 操作人 */
  creatorName?: string;
  /** 当前节点 */
  currentNode?: string;
  /**
   * 截止时间
   * @format date-time
   */
  dueTime?: string;
  /** 失败原因 */
  failReason?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** 对象编号 */
  itemCode?: string;
  /** 对象名称 */
  itemName?: string;
  /**
   * 对象类型 详见 WorkflowItemTypeEnum
   * @format int32
   */
  itemType?: number;
  /** 对象类型 1-商品分类 */
  itemTypeDesc?: string;
  /** 节点列表 */
  nodeList?: WorkflowNodeBean[];
  /**
   * 处理时间
   * @format date-time
   */
  operationTime?: string;
  /** 处理人 */
  operator?: string;
  /** 处理人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 状态 -1-创建失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除
   * @format int32
   */
  status?: number;
  /** 状态 0-初始化 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 */
  statusDesc?: string;
  /** 待办信息 */
  todoInfo?: TodoWorkflowRecordBean;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 工单编号 */
  workflowCode?: string;
  /** 工单内容 */
  workflowContent?: Record<string, object>;
  /** 工单描述 */
  workflowDesc?: string;
  /** 工单主题 */
  workflowSubject?: string;
  /**
   * 工单类型 1-审批流 2-待办 3-通知
   * @format int32
   */
  workflowType?: number;
  /** 工单类型 1-审批流 2-待办 */
  workflowTypeDesc?: string;
}

/** WorkflowListQueryResp */
export interface WorkflowListQueryResp {
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
  /** 工单记录列表 */
  workflowRecordList?: WorkflowRecordBean[];
}

/** WorkflowNodeBean */
export interface WorkflowNodeBean {
  /** 审批工单 会签类型 0-单签 1-会签 2-或签 */
  countersignType?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 节点编号 */
  nodeCode?: string;
  /** 节点成员 */
  nodeMember?: string;
  /** 节点成员名称 */
  nodeMemberName?: string;
  /**
   * 节点状态 0-初始化 10-审批中 11-已通过 12-已驳回 21-已完成
   * @format int32
   */
  nodeStatus?: number;
  /** 节点状态 0-初始化 10-审批中 11-已通过 12-已驳回 21-已完成 */
  nodeStatusDesc?: string;
  /**
   * 节点类型 1-审批节点 2-抄送节点 3-待办节点
   * @format int32
   */
  nodeType?: number;
  /** 节点类型 1-审批节点 2-抄送节点 3-待办节点 */
  nodeTypeDesc?: string;
  /** 备注 */
  remark?: string;
  /** 审批任务id */
  taskId?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 工单编号 */
  workflowCode?: string;
}

/** WorkflowRecordAttachmentBean */
export interface WorkflowRecordAttachmentBean {
  /** 拓展信息 */
  extraInfo?: string;
  /** oa审批单实例id */
  instanceId?: string;
  /** `原文件名称` */
  sourceFileName?: string;
  /** 原文件urlmd5 */
  sourceFileUrlMd5?: string;
  /**
   * 附件类型 1-审批单附件 2-评论附件 3-表单内容里的附件
   * @format int32
   */
  type?: number;
  /** url */
  url?: string;
  /** 工单编码 */
  workflowCode?: string;
}

/** WorkflowRecordBean */
export interface WorkflowRecordBean {
  /** 配置编号 */
  configCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作人 */
  creator?: string;
  /** 操作人 */
  creatorName?: string;
  /**
   * 截止时间
   * @format date-time
   */
  dueTime?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** 对象编号 */
  itemCode?: string;
  /** 对象名称 */
  itemName?: string;
  /**
   * 对象类型
   * @format int32
   */
  itemType?: number;
  /** 对象类型 */
  itemTypeDesc?: string;
  /**
   * 处理时间
   * @format date-time
   */
  operationTime?: string;
  /** 处理人 */
  operatorList?: string[];
  /** 备注 */
  remark?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 状态 -1-推送失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除
   * @format int32
   */
  status?: number;
  /** 状态 0-初始化 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 工单编号 */
  workflowCode?: string;
  /** 工单描述 */
  workflowDesc?: string;
  /** 工单主题 */
  workflowSubject?: string;
  /**
   * 工单类型 1-审批流 2-待办
   * @format int32
   */
  workflowType?: number;
  /** 工单类型 1-审批流 2-待办 */
  workflowTypeDesc?: string;
}

/** WorkflowWithdrawReq */
export interface WorkflowWithdrawReq {
  workflowCode: string;
  /** @format int32 */
  workflowType: number;
}

/** editInfoBean */
export interface EditInfoBean {
  /** 业务优先级 */
  businessPriority?: string;
  /** 线索优先级 */
  cluePriority?: string;
  /** 使用用户 */
  demandBackground?: string;
  /** 场景描述 */
  demandDesc?: string;
  /** 文件附件列表 */
  demandFileList?: DemandFileBean[];
  /** 线索标题 */
  demandTitle?: string;
  /**
   * 需求分类
   * @format int32
   */
  demandType?: number;
  /**
   * 期望完成时间
   * @format date
   */
  expectFinishTime?: string;
  /** 拒绝原因 */
  rejectReason?: string;
  /** 价值建议 */
  valueSuggest?: string;
}

/** handUpBean */
export interface HandUpBean {
  /** 需求编码 */
  demandCode?: string;
  /** 挂起原因 */
  handUpReason?: string;
}

/** CommonResp«CommonExportResp» */
export interface CommonRespCommonExportResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonExportResp;
  traceId?: string;
}

/** CommonResp«DemandBrandCooperTypeResp» */
export interface CommonRespDemandBrandCooperTypeResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DemandBrandCooperTypeResp;
  traceId?: string;
}

/** CommonResp«OpenClawUrlResp» */
export interface CommonRespOpenClawUrlResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OpenClawUrlResp;
  traceId?: string;
}

/** CommonResp«PlatformRefreshBean» */
export interface CommonRespPlatformRefreshBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PlatformRefreshBean;
  traceId?: string;
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

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
