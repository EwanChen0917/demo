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

/** ApproveDetailQueryResp */
export interface ApproveDetailQueryResp {
  /** 审批编码 */
  approveCode?: string;
  /** 节点操作人-平铺 */
  approveExeMemberBeanList?: ApproveExeMemberBean[];
  /** 审批流程组件 */
  approveFormComponentValueBeanList?: ApproveFormComponentValueBean[];
  /** 节点操作人 */
  approveNodeExeMemberBeanList?: ApproveNodeExeMemberBean[];
  /** 关联事项code */
  matterCode?: string;
  /** 关联事项名称 */
  matterName?: string;
  /** 审批流程编码 */
  processCode?: string;
  /** 审批流程描述 */
  processDesc?: string;
  /** 审批流程描述 */
  processIconName?: string;
  /** 审批流程图标url */
  processIconUrl?: string;
  /** 审批流程名称 */
  processName?: string;
  /**
   * 状态 10-审批中 11-已通过 13-已撤销 21-已完成
   * @format int32
   */
  status?: number;
  /** 状态 10-审批中 11-已通过 13-已撤销 21-已完成 */
  statusDesc?: string;
  /** 审批id */
  workflowCode?: string;
  /** 审批名称 */
  workflowSubject?: string;
}

/** ApproveExeMemberBean */
export interface ApproveExeMemberBean {
  /** 头像 */
  avatar?: string;
  /** 用户编码 */
  code?: string;
  /**
   * 操作时间
   * @format date-time
   */
  operationTime?: string;
  /** 备注 */
  remark?: string;
  /**
   * 节点状态 0-待审批 1-发起审批 10-审批中 11-已通过 12-已驳回 21-已完成
   * @format int32
   */
  status?: number;
  /** 节点状态 0-待审批 1-发起审批 10-审批中 11-已通过 12-已驳回 21-已完成 */
  statusDesc?: string;
  /** 用户名 */
  username?: string;
}

/** ApproveFormComponentBean */
export interface ApproveFormComponentBean {
  /** 子控件 */
  childComponentList?: ApproveFormComponentBean[];
  /** 控件类型 */
  componentId?: string;
  /** 控件名称 */
  componentName?: string;
  /** 控件类型 */
  componentType?: string;
  /** 组件属性 */
  props?: string;
  /** 是否必填 true false */
  required?: boolean;
}

/** ApproveFormComponentValueBean */
export interface ApproveFormComponentValueBean {
  /** 子控件 */
  childComponentList?: ApproveFormComponentValueBean[];
  /** 如果是表格则这个会有标头 */
  colList?: ApproveFormComponentBean[];
  /** 控件类型 */
  componentId?: string;
  /** 控件名称 */
  componentName?: string;
  /** 控件类型 */
  componentType?: string;
  /** 组件属性 */
  props?: string;
  /** 填写值 */
  value?: object;
}

/** ApproveListItem */
export interface ApproveListItem {
  /**
   * 申请时间
   * @format date-time
   */
  createTime?: string;
  /** 操作人 */
  creator?: string;
  /** 关联事项code */
  matterCode?: string;
  /** 关联事项名称 */
  matterName?: string;
  /**
   * 状态  10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除
   * @format int32
   */
  status?: number;
  /** 状态  10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 */
  statusDesc?: string;
  /** 审批id */
  workflowCode?: string;
  /** 审批名称 */
  workflowSubject?: string;
}

/** ApproveListQueryResp */
export interface ApproveListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ApproveListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ApproveNodeExeMemberBean */
export interface ApproveNodeExeMemberBean {
  /** 审批人列表 */
  approveMemberBeanList?: ApproveExeMemberBean[];
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** MatterDetailQueryResp */
export interface MatterDetailQueryResp {
  /** 事项编码(id) */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 事项关联文控 */
  matterFileList?: MatterFileRes[];
  /** 事项关联流程 */
  matterItemList?: MatterItemRes[];
  /** 事项关联模板 */
  matterTemplateList?: MatterTemplate[];
  /** 事项名称 */
  secondMatterName?: string;
  /**
   * 状态:0-停用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /** 事项分类名称 */
  topMatterName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
}

/** MatterFileReq */
export interface MatterFileReq {
  /** 文件编码 */
  fileCode?: string;
  /** 文件名称 */
  fileName: string;
  /** 文件路径 */
  fileUrl: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** MatterFileRes */
export interface MatterFileRes {
  /** 文件编码 */
  fileCode?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件路径 */
  fileUrl?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** MatterItemReq */
export interface MatterItemReq {
  /** 流程编码 */
  processCode?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** MatterItemRes */
export interface MatterItemRes {
  /** 审批流程图标名称 */
  iconName?: string;
  /** 审批流程图标url */
  iconUrl?: string;
  /** 流程编码 */
  processCode?: string;
  /** 审批流程名称 */
  processName?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** MatterListItem */
export interface MatterListItem {
  /** 事项编码(id) */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 下级事项 */
  materItemList?: MatterListItem[];
  /** 事项名称 */
  name?: string;
  /** 父级事项编码 */
  parentCode?: string;
  /**
   * 状态:0-停用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
}

/** MatterListQueryResp */
export interface MatterListQueryResp {
  /** 事项列表 */
  recordList?: MatterListItem[];
}

/** MatterSaveReq */
export interface MatterSaveReq {
  /** 事项编码(id) */
  code?: string;
  /** 关联文控 */
  matterFileList?: MatterFileReq[];
  /** 关联流程 */
  matterItemList?: MatterItemReq[];
  /** 关联模板 */
  matterTemplateList?: MatterTemplate[];
  /** 事项名称 */
  name?: string;
  /**
   * 事项等级 1,2级保存 ：1 ；3级保存 ：2
   * @format int32
   */
  operateType: number;
  /** 上级事项名称 二级事项必填 */
  parentCode?: string;
  /**
   * 状态:0-停用 1-启用
   * @format int32
   */
  status?: number;
}

/** MatterTemplate */
export interface MatterTemplate {
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板路径 */
  templateUrl?: string;
}

/** ProcessNavigation */
export interface ProcessNavigation {
  /** 模块名称 */
  name?: string;
  /** 审批流程事项集合 */
  processNavigationItemList?: ProcessNavigationItem[];
}

/** ProcessNavigationFile */
export interface ProcessNavigationFile {
  /** 文件编码 */
  fileCode?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件路径 */
  fileUrl?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** ProcessNavigationItem */
export interface ProcessNavigationItem {
  /** 跳转链接 */
  dingTalkUrl?: string;
  /** 审批流程图标名称 */
  iconName?: string;
  /** 审批流程图标url */
  iconUrl?: string;
  /** 流程编码 */
  processCode?: string;
  /** 审批流程名称 */
  processName?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** ProcessNavigationListQueryResp */
export interface ProcessNavigationListQueryResp {
  /** 审批流程导航集合 */
  processNavigationList?: ProcessNavigation[];
}

/** ProcessNavigationQueryResp */
export interface ProcessNavigationQueryResp {
  processNavigationList?: ProcessNavigation[];
}

/** ProcessNavigationTemplate */
export interface ProcessNavigationTemplate {
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板路径 */
  templateUrl?: string;
}

/** SecondProcessNavigation */
export interface SecondProcessNavigation {
  /** 事项编码(id) */
  code?: string;
  /** 二级事项分类名称 */
  name?: string;
  /** 文件事项集合 */
  processNavigationFileList?: ProcessNavigationFile[];
  /** 审批流程事项集合 */
  processNavigationItemList?: ProcessNavigationItem[];
  /** 模板事项集合 */
  processNavigationTemplateList?: ProcessNavigationTemplate[];
}
