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

/** DataMarketTagBean */
export interface DataMarketTagBean {
  tagCode?: string;
  tagDesc?: string;
}

/** DpFieldPermissionResp */
export interface DpFieldPermissionResp {
  /** 用户字段权限列表 */
  fieldPermissionList?: FieldPermissionBean[];
}

/** DpSelectOptionResp */
export interface DpSelectOptionResp {
  /** 规则字典类型选项参数数据 */
  selectOptionList?: SelectOptionBean[];
}

/** FieldPermissionBean */
export interface FieldPermissionBean {
  /** 权限字段 */
  fieldName?: string;
  /** 权限类型 */
  permissionType?: string;
  /** 权限值 */
  permissionValue?: object;
  /** 规则 */
  ruleCode?: string;
}

/** ImportDataReq */
export interface ImportDataReq {
  /** 文件名称 */
  fileName?: string;
  /** 导入场景 例如线下渠道商品：channel_product */
  importScene?: string;
  /** 上传文件的key或者完整路径 */
  key?: string;
  /** 产品运营项目编码  导入产品运营项目周期数据时，必传 */
  projectCode?: string;
}

/** ImportDataResp */
export interface ImportDataResp {
  /**
   * 失败数量
   * @format int32
   */
  failedCount?: number;
  /** 导入记录code */
  recordCode?: string;
  /**
   * 成功数量
   * @format int32
   */
  succeededCount?: number;
  /** 提示内容 */
  tip?: string;
}

/** ImportTemplateQueryResp */
export interface ImportTemplateQueryResp {
  /** 下载地址 */
  templateUrl?: string;
}

/** LuteChangeSysMaterialListQueryResp */
export interface LuteChangeSysMaterialListQueryResp {
  /** 素材列表 */
  materialList?: LuteMaterialGroupBean[];
}

/** LuteMaterialDetailQueryResp */
export interface LuteMaterialDetailQueryResp {
  /**
   * 权限标签 1-普通权限 2-高级数据
   * @format int32
   */
  authTag?: number;
  /** 当前用户是否已点赞 true-已点赞 false-未点赞 */
  curUserIsPraise?: boolean;
  /** 描述 */
  desc?: string;
  /**
   * 生效结束时间
   * @format date-time
   */
  endTime?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 热度
   * @format int32
   */
  hotPointSum?: number;
  /**
   * 跳转类型
   * @format int32
   */
  linkType?: number;
  /** 跳转类型  1-页内跳转 2-新开标签页 3-下载 */
  linkTypeStr?: string;
  /** 跳转地址 */
  linkUrl?: string;
  /** 素材编码 */
  materialCode?: string;
  /** 其他语言素材列表 */
  materialList?: LuteMaterialLangBean[];
  /** 板块编码 */
  model?: string;
  /** 板块名称 */
  modelDesc?: string;
  /**
   * 点赞
   * @format int32
   */
  praiseSum?: number;
  /** 备注 */
  remarks?: string;
  /** 场景类型 head_icon-头像 */
  scene?: string;
  /** 场景类型 */
  sceneDesc?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
  /**
   * 生效开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 启用状态 0-关闭 1-启用
   * @format int32
   */
  status?: number;
  /** 标签 */
  tag?: string[];
  /** 数据标签编码列表 */
  tagCodeList?: string[];
  /** 数据标签列表 */
  tagList?: DataMarketTagBean[];
  /** 标题 */
  title?: string;
  /**
   * 素材类型 1-图片 2-视频
   * @format int32
   */
  type?: number;
  /** 素材类型 1-图片 2-视频 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 图片地址 */
  url?: string;
}

/** LuteMaterialGroupBean */
export interface LuteMaterialGroupBean {
  /**
   * 权限标签 1-普通权限 2-高级数据
   * @format int32
   */
  authTag?: number;
  /** 当前用户是否已点赞 true-已点赞 false-未点赞 */
  curUserIsPraise?: boolean;
  /** 描述 */
  desc?: string;
  /**
   * 生效结束时间
   * @format date-time
   */
  endTime?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 热度
   * @format int32
   */
  hotPointSum?: number;
  /**
   * 跳转类型
   * @format int32
   */
  linkType?: number;
  /** 跳转类型  1-页内跳转 2-新开标签页 3-下载 */
  linkTypeStr?: string;
  /** 跳转地址 */
  linkUrl?: string;
  /** 素材编码 */
  materialCode?: string;
  /** 板块编码 */
  model?: string;
  /** 板块名称 */
  modelDesc?: string;
  /**
   * 点赞
   * @format int32
   */
  praiseSum?: number;
  /** 备注 */
  remarks?: string;
  /** 场景类型 head_icon-头像 */
  scene?: string;
  /** 场景类型 */
  sceneDesc?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
  /**
   * 生效开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 启用状态 0-关闭 1-启用
   * @format int32
   */
  status?: number;
  /** 标签 */
  tag?: string[];
  /** 数据标签编码列表 */
  tagCodeList?: string[];
  /** 数据标签列表 */
  tagList?: DataMarketTagBean[];
  /** 标题 */
  title?: string;
  /**
   * 素材类型 1-图片 2-视频
   * @format int32
   */
  type?: number;
  /** 素材类型 1-图片 2-视频 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 图片地址 */
  url?: string;
}

/** LuteMaterialLangBean */
export interface LuteMaterialLangBean {
  /** 描述 */
  desc?: string;
  /** 语言 en-英文 zh-中文 */
  language?: string;
  /** 跳转地址 */
  linkUrl?: string;
  /** 标题 */
  title?: string;
  /** 图片地址 */
  url?: string;
}

/** LuteMaterialLangSaveReq */
export interface LuteMaterialLangSaveReq {
  /** 描述 */
  desc?: string;
  /** 语言 en-英文 zh-中文 */
  language?: string;
  /**
   * 跳转类型 1-页内跳转 2-新开标签页 3-下载
   * @format int32
   */
  linkType?: number;
  /** 跳转地址 */
  linkUrl?: string;
  /** 标题 */
  title?: string;
  /** 图片地址 */
  url?: string;
}

/** LuteMaterialListQueryResp */
export interface LuteMaterialListQueryResp {
  code?: string;
  /** 素材列表 */
  materialList?: LuteMaterialGroupBean[];
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

/** LuteMaterialModelBean */
export interface LuteMaterialModelBean {
  /** 板块名称 */
  desc?: string;
  /** 板块编码 */
  model?: string;
  /** 场景编码 */
  scene?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
}

/** LuteMaterialModelListQueryResp */
export interface LuteMaterialModelListQueryResp {
  /** 板块列表 */
  modelList?: LuteMaterialModelBean[];
}

/** LuteMaterialModelSaveReq */
export interface LuteMaterialModelSaveReq {
  /** 板块名称 */
  desc?: string;
  /** 板块编码 更新时必传 */
  model?: string;
  /** 场景编码 */
  scene?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
}

/** LuteMaterialModelSaveResp */
export interface LuteMaterialModelSaveResp {
  /** 板块编码 */
  model?: string;
}

/** LuteMaterialPraiseReq */
export interface LuteMaterialPraiseReq {
  /**
   * 互动类型标识：1:点赞，2：分享，3:热度
   * @format int32
   */
  interactType?: number;
  /** 素材编码 */
  materialCode?: string;
  /**
   * 点赞/取消点赞标识：1:加赞 -1:减赞
   * @format int32
   */
  praiseType?: number;
}

/** LuteMaterialPraiseResp */
export interface LuteMaterialPraiseResp {
  /**
   * 热度数量
   * @format int64
   */
  materialHotCount?: number;
  /**
   * 点赞数量
   * @format int64
   */
  materialPraiseCount?: number;
}

/** LuteMaterialSaveReq */
export interface LuteMaterialSaveReq {
  /**
   * 权限标签 1-普通权限 2-高级数据
   * @format int32
   */
  authTag?: number;
  /** 描述 */
  desc?: string;
  /**
   * 生效结束时间
   * @format date-time
   */
  endTime?: string;
  /**
   * 扩展信息
   * @example {"homeRecommend":1,"provider":"路小特"}
   */
  extraInfo?: string;
  /** 语言 en-英文 zh-中文 */
  language?: string;
  /** 跳转类型 1-页内跳转 2-新开标签页 3-下载 */
  linkType?: string;
  /** 跳转地址 */
  linkUrl?: string;
  /** 素材编码 */
  materialCode?: string;
  /** 其他语言素材列表 */
  materialList?: LuteMaterialLangSaveReq[];
  /** 板块编码 */
  model?: string;
  /** 备注 */
  remarks?: string;
  /** 场景类型 */
  scene?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
  /**
   * 生效开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 启用状态 0-关闭 1-启用
   * @format int32
   */
  status?: number;
  /** 标签 */
  tag?: string[];
  /** 数据标签编码 */
  tagCodeList?: string[];
  /** 标题 */
  title?: string;
  /**
   * 素材类型 1-图片 2-视频
   * @format int32
   */
  type?: number;
  /** 图片地址 */
  url?: string;
}

/** LuteMaterialSaveResp */
export interface LuteMaterialSaveResp {
  /** 素材编码 */
  materialCode?: string;
}

/** LuteMaterialSceneBean */
export interface LuteMaterialSceneBean {
  /** 描述 */
  desc?: string;
  /** 场景类型 */
  scene?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
}

/** LuteMaterialSceneListQueryResp */
export interface LuteMaterialSceneListQueryResp {
  /** 场景类型列表 */
  sceneList?: LuteMaterialSceneBean[];
}

/** LuteMaterialSceneSaveReq */
export interface LuteMaterialSceneSaveReq {
  /** 场景类型名称 */
  desc?: string;
  /** 场景类型编码, 更新时必传 */
  scene?: string;
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
}

/** LuteMaterialSceneSaveResp */
export interface LuteMaterialSceneSaveResp {
  /** 场景类型编码 */
  scene?: string;
}

/** OptionBean */
export interface OptionBean {
  /** 标签 */
  label?: string;
  /** 值 */
  value?: string;
}

/** SelectOptionBean */
export interface SelectOptionBean {
  /** 字典编码 */
  dictCode?: string;
  /** 选项参数 */
  optionList?: OptionBean[];
  /** 规则编码 */
  ruleCode?: string;
}

/** CommonResp«List«EnumDictItemResp请求参数对象»» */
export interface CommonRespListEnumDictItemResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: EnumDictItemResp[];
  traceId?: string;
}

/**
 * EnumDictItemResp请求参数对象
 * 枚举字典下拉参数
 */
export interface EnumDictItemResp {
  /** 枚举字典文本 */
  label?: string;
  /** 枚举字典值 */
  value?: object;
}
