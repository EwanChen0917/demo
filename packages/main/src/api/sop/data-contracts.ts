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

/** MaterialListQueryResp */
export interface MaterialListQueryResp {
  /** 物料列表 */
  materialList?: SopMaterialBean[];
}

/** MaterialPropertyBean */
export interface MaterialPropertyBean {
  /** 附件key */
  attachmentKey?: string;
  /** 附件名称 */
  attachmentName?: string;
  /** 图片key */
  imageKey?: string;
  /** 物料编码 */
  materialCode: string;
  /** 属性父级编码 父属性编码 P0000-顶级属性 */
  parentCode: string;
  /** 属性名称 */
  propertyName: string;
  /**
   * 属性类型
   * @format int32
   */
  propertyType: number;
  /**
   * 是否必填 0-非必填 1-必填
   * @format int32
   */
  required: number;
  /**
   * 选择类型
   * @format int32
   */
  selectType: number;
}

/** MaterialPropertyOperateReq */
export interface MaterialPropertyOperateReq {
  /** 物料编码 删除-delete、是否支持上传文件-enable_disable 操作必填 */
  materialCode?: string;
  /** 物料属性 保存-save操作必填 */
  materialProperty?: MaterialPropertyBean;
  /** 操作类型 保存-save 删除-delete 是否支持上传文件-enable_disable */
  operateType: string;
  /** 属性编码 删除-delete操作必填 */
  propertyCode?: string;
  /**
   * 属性类型 删除-delete操作必填
   * @format int32
   */
  propertyType?: number;
  /**
   * 是否支持上传文件 1-是 0-否 是否支持上传文件-enable_disable操作必填
   * @format int32
   */
  uploadFlag?: number;
}

/** MaterialQueryResp */
export interface MaterialQueryResp {
  /** 物料类型集合 */
  materialDetailList?: SopMaterialDetailBean[];
}

/** PackageDeleteReq */
export interface PackageDeleteReq {
  /** 包装编码 */
  packageCode?: string;
}

/** PackageDetailQueryResp */
export interface PackageDetailQueryResp {
  /** 所属一级分类 */
  categoryCode?: string;
  /** 所属一级分类名 */
  categoryName?: string;
  /**
   * 渠道类型 1-线上 2-线下 3-两者
   * @format int32
   */
  channelType?: number;
  /** 渠道类型 1-线上 2-线下 3-两者 */
  channelTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 制定部门
   * @format int64
   */
  enactDept?: number;
  /** 制定部门 */
  enactDeptDesc?: string;
  /** 制定人 */
  enactMember?: string;
  /** 指定人名称 */
  enactMemberName?: string;
  /** 物料列表 */
  materialList?: SopMaterialBean[];
  /** 型号 */
  model?: string;
  /** 包装名称 */
  name?: string;
  /** 包装编码 */
  packageCode?: string;
  /** 产品经理 */
  productMember?: string;
  /** 产品经理名称 */
  productMemberName?: string;
  /** 商品名称 */
  productName?: string;
  /**
   * 产品类型 1-有杯款文胸 2-无杯款文胸 3-内裤 4-其他
   * @format int32
   */
  productType?: number;
  /** 产品类型 1-有杯款文胸 2-无杯款文胸 3-内裤 4-其他 */
  productTypeDesc?: string;
  /**
   * 数量类型 1-单件装 2-两件装 3-三件装 4-四件装 5-五件装 6-其他
   * @format int32
   */
  quantityType?: number;
  /** 数量类型 1-单件装 2-两件装 3-三件装 4-四件装 5-五件装 6-其他 */
  quantityTypeDesc?: string;
  /**
   * 状态: 0-待审核 1-审核通过 2-审核失败 3-审核中
   * @format int32
   */
  status?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PackageEnumQueryResp */
export interface PackageEnumQueryResp {
  /** 渠道类型列表 */
  channelTypeList?: EnumBeanInt[];
  /** 制定部门列表 */
  departmentList?: EnumBeanLong[];
  /** 制定部门成员列表 */
  departmentMemberList?: EnumBeanString[];
  /** 产品经理成员列表 */
  productManagerList?: EnumBeanString[];
  /** 产品类型列表 */
  productTypeList?: EnumBeanInt[];
  /** 数量类型列表 */
  quantityTypeList?: EnumBeanInt[];
}

/** PackageExportReq */
export interface PackageExportReq {
  /** 包装编码 */
  packageCode?: string;
}

/** PackageListQueryResp */
export interface PackageListQueryResp {
  code?: string;
  message?: string;
  /** 包装列表 */
  packageList?: SopPackageBean[];
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

/** PackageSaveReq */
export interface PackageSaveReq {
  /** 所属一级分类 */
  categoryCode?: string;
  /**
   * 渠道类型 1-线上 2-线下 3-两者
   * @format int32
   */
  channelType?: number;
  /**
   * 制定部门
   * @format int64
   */
  enactDept?: number;
  /** 制定人 */
  enactMember?: string;
  /** 物料列表 */
  materialList?: SopPackageMaterialSaveReq[];
  /** 型号 */
  model?: string;
  /** 包装名称 */
  name?: string;
  /** 包装编码 更新时必传 */
  packageCode?: string;
  /** 产品经理 */
  productMember?: string;
  /** 商品名称 */
  productName?: string;
  /**
   * 产品类型 1-有杯款文胸 2-无杯款文胸 3-内裤 4-其他
   * @format int32
   */
  productType?: number;
  /**
   * 数量类型 1-单件装 2-两件装 3-三件装 4-四件装 5-五件装 6-其他
   * @format int32
   */
  quantityType?: number;
  /** 模板编码 */
  templateCode?: string;
}

/** PackageSaveResp */
export interface PackageSaveResp {
  /** 包装编码 */
  packageCode?: string;
}

/** PackageSubmitReq */
export interface PackageSubmitReq {
  /** 包装编码 */
  packageCode?: string;
}

/** SopMaterialBean */
export interface SopMaterialBean {
  /** 上传文件名称 */
  fileName?: string;
  /** 上传文件路径 */
  filePath?: string;
  /** 物料编码 */
  materialCode?: string;
  /** 物料名称 */
  materialName?: string;
  /**
   * 物料类型 1-品牌吊牌 2-包装袋 3-包装盒 4-胶壳 5-尺码贴 6-颜色贴 7-Model number贴 8-洗水唛 9-其他
   * @format int32
   */
  materialType?: number;
  /** 物料类型 */
  materialTypeDesc?: string;
  /** 属性列表 */
  propertyTypeList?: SopMaterialPropertyTypeBean[];
  /**
   * 单包用量
   * @format int32
   */
  singleAmount?: number;
  /**
   * 物料排序 越小优先级越高
   * @format int32
   */
  sort?: number;
  /**
   * 开关 0-关 1-开
   * @format int32
   */
  switchFlag?: number;
  /**
   * 是否上传附件 0-否 1-是
   * @format int32
   */
  uploadFlag?: number;
}

/** SopMaterialDetailBean */
export interface SopMaterialDetailBean {
  /** 物料编码 */
  materialCode?: string;
  /** 物料名称 */
  materialName?: string;
  /**
   * 物料类型 1-品牌吊牌 2-包装袋 3-包装盒 4-胶壳 5-尺码贴 6-颜色贴 7-Model number贴 8-洗水唛 9-其他
   * @format int32
   */
  materialType?: number;
  /** 属性列表 */
  propertyTypeList?: SopMaterialPropertyTypeDetailBean[];
  /**
   * 是否上传附件 0-否 1-是
   * @format int32
   */
  uploadFlag?: number;
}

/** SopMaterialPropertyBean */
export interface SopMaterialPropertyBean {
  /** 附件名字 */
  attachmentName?: string;
  /** 附件url */
  attachmentUrl?: string;
  /**
   * 默认标识 0-否 1-是
   * @format int32
   */
  defaultFlag?: number;
  /** 关联组, 空数组 表示 全部都支持，数字是具体分组 */
  groups?: number[];
  /** 属性图片 */
  image?: string;
  /** 物料编码 */
  materialCode?: string;
  /** 父属性编码 */
  parentCode?: string;
  /** 属性编码 */
  propertyCode?: string;
  /** 属性名称 */
  propertyName?: string;
  /**
   * 属性类型 1-尺寸 2-颜色 3-其他
   * @format int32
   */
  propertyType?: number;
  /**
   * 是否必填 0-否 1-是
   * @format int32
   */
  required?: number;
}

/** SopMaterialPropertyTypeBean */
export interface SopMaterialPropertyTypeBean {
  /** 附件名字 */
  attachmentName?: string;
  /** 附件url */
  attachmentUrl?: string;
  /** 子属性列表 selectType=5时使用 */
  children?: SopMaterialPropertyTypeBean[];
  /** 子属性列表 组合属性时使用 */
  childrenList?: Record<string, string[]>[];
  /** 属性编码 单属性时使用 */
  propertyCodeList?: string[];
  /** 属性列表 非组合类型时使用 */
  propertyList?: SopMaterialPropertyBean[];
  /**
   * 属性类型 1-品牌吊牌 2-吊牌穿绳 3-尺寸 4-材质 5-大小 6-尺码 7-位置 8-是否提供 9-类型 10-说明书 11-其他
   * @format int32
   */
  propertyType?: number;
  /** 属性类型 */
  propertyTypeDesc?: string;
  /**
   * 是否必填 0-否 1-是
   * @format int32
   */
  required?: number;
  /**
   * 选择类型 1-单选 2-多选 3-radio 4-checkbox 5-组合
   * @format int32
   */
  selectType?: number;
}

/** SopMaterialPropertyTypeDetailBean */
export interface SopMaterialPropertyTypeDetailBean {
  /** 子属性列表 selectType=5 时使用 */
  children?: SopMaterialPropertyTypeDetailBean[];
  /** 父级编码 */
  parentCode?: string;
  /** 属性列表 非组合类型时使用 */
  propertyList?: SopMaterialPropertyBean[];
  /**
   * 属性类型 1-品牌吊牌 2-吊牌穿绳 3-尺寸 4-材质 5-大小 6-尺码 7-位置 8-是否提供 9-类型 10-说明书 11-其他
   * @format int32
   */
  propertyType?: number;
  /** 属性类型 */
  propertyTypeDesc?: string;
  /**
   * 是否必填
   * @format int32
   */
  required?: number;
  /**
   * 选择类型 1-单选 2-多选 3-radio 4-checkbox 5-组合
   * @format int32
   */
  selectType?: number;
}

/** SopPackageBean */
export interface SopPackageBean {
  /** 所属一级分类 */
  categoryCode?: string;
  /** 所属一级分类名 */
  categoryName?: string;
  /**
   * 渠道类型 1-线上 2-线下 3-两者
   * @format int32
   */
  channelType?: number;
  /** 渠道类型 1-线上 2-线下 3-两者 */
  channelTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 制定部门
   * @format int64
   */
  enactDept?: number;
  /** 制定部门 */
  enactDeptDesc?: string;
  /** 制定人 */
  enactMember?: string;
  /** 指定人名称 */
  enactMemberName?: string;
  /** 物料列表 */
  materialList?: SopMaterialBean[];
  /** 型号 */
  model?: string;
  /** 包装名称 */
  name?: string;
  /** 包装编码 */
  packageCode?: string;
  /** 产品经理 */
  productMember?: string;
  /** 产品经理名称 */
  productMemberName?: string;
  /** 商品名称 */
  productName?: string;
  /**
   * 产品类型 1-有杯款文胸 2-无杯款文胸 3-内裤 4-其他
   * @format int32
   */
  productType?: number;
  /** 产品类型 1-有杯款文胸 2-无杯款文胸 3-内裤 4-其他 */
  productTypeDesc?: string;
  /**
   * 数量类型 1-单件装 2-两件装 3-三件装 4-四件装 5-五件装 6-其他
   * @format int32
   */
  quantityType?: number;
  /** 数量类型 1-单件装 2-两件装 3-三件装 4-四件装 5-五件装 6-其他 */
  quantityTypeDesc?: string;
  /**
   * 状态: 0-待审核 1-审核通过 2-审核失败 3-审核中
   * @format int32
   */
  status?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SopPackageMaterialSaveReq */
export interface SopPackageMaterialSaveReq {
  /** 上传文件名称 */
  fileName?: string;
  /** 上传文件路径 */
  filePath?: string;
  /** 物料编码 */
  materialCode?: string;
  /** 包装编码 */
  packageCode?: string;
  /** 属性列表 */
  propertyTypeList?: SopPackagePropertySaveReq[];
  /**
   * 单包用量
   * @format int32
   */
  singleAmount?: number;
  /**
   * 开关 0-关 1-开
   * @format int32
   */
  switchFlag?: number;
}

/** SopPackagePropertySaveReq */
export interface SopPackagePropertySaveReq {
  /** 附件名字 */
  attachmentName?: string;
  /** 附件url */
  attachmentUrl?: string;
  /** 子属性列表 组合属性时使用 */
  childrenList?: Record<string, string[]>[];
  /** 属性编码 单属性时使用 */
  propertyCodeList?: string[];
  /**
   * 属性类型
   * @format int32
   */
  propertyType?: number;
}

/** SopTemplateBean */
export interface SopTemplateBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 备注 */
  remark?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板描述 */
  templateDesc?: string;
  /** 模板名称 */
  templateName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SopTemplateStepBean */
export interface SopTemplateStepBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 步骤描述 */
  desc?: string;
  /** 步骤示意图 */
  image?: string;
  /** 备注 */
  remark?: string;
  /**
   * 步骤排序
   * @format int32
   */
  sort?: number;
  /** 步骤编码 */
  stepCode?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 步骤名称 */
  title?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** TemplateDeleteReq */
export interface TemplateDeleteReq {
  /** 模板编码 */
  templateCode?: string;
}

/** TemplateDetailQueryResp */
export interface TemplateDetailQueryResp {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 备注 */
  remark?: string;
  /** 步骤列表 */
  stepList?: SopTemplateStepBean[];
  /** 模板编码 */
  templateCode?: string;
  /** 模板描述 */
  templateDesc?: string;
  /** 模板名称 */
  templateName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** TemplateListQueryResp */
export interface TemplateListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 模板列表 */
  templateList?: SopTemplateBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TemplateSaveReq */
export interface TemplateSaveReq {
  /** 步骤列表 */
  stepList?: TemplateStepSaveReq[];
  /** 模板编码 为空则新增 不为空则修改 */
  templateCode?: string;
  /** 模板描述 */
  templateDesc?: string;
  /** 模板名称 */
  templateName?: string;
}

/** TemplateSaveResp */
export interface TemplateSaveResp {
  /** 模板编码 */
  templateCode?: string;
}

/** TemplateStepSaveReq */
export interface TemplateStepSaveReq {
  /** 步骤描述 */
  desc?: string;
  /** 步骤示意图 */
  image?: string;
  /**
   * 步骤排序
   * @format int32
   */
  sort?: number;
  /** 步骤编码 为空则新增 不为空则修改 */
  stepCode?: string;
  /** 步骤名称 */
  title?: string;
}

/** EnumBean«int» */
export interface EnumBeanInt {
  /**
   * 字段code
   * @format int32
   */
  key?: number;
  /** 字段值, 用于前端展示 */
  value?: string;
}

/** EnumBean«long» */
export interface EnumBeanLong {
  /**
   * 字段code
   * @format int64
   */
  key?: number;
  /** 字段值, 用于前端展示 */
  value?: string;
}

/** EnumBean«string» */
export interface EnumBeanString {
  /** 字段code */
  key?: string;
  /** 字段值, 用于前端展示 */
  value?: string;
}
