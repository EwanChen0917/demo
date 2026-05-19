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

/** ApproveListGroup */
export interface ApproveListGroup {
  /** 审批流程列表 */
  approveListItemList?: ApproveListItem[];
  /** 所属分组 */
  groupName?: string;
}

/** ApproveListItem */
export interface ApproveListItem {
  /** 审批流程图标名称 */
  iconName?: string;
  /** 审批流程图标url */
  iconUrl?: string;
  /** 审批流程名称 */
  name?: string;
  /** 流程编码 */
  processCode?: string;
}

/** ApproveListResp */
export interface ApproveListResp {
  /** 审批流程分组 */
  approveListGroupList?: ApproveListGroup[];
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

/** OaFlowCheckReq */
export interface OaFlowCheckReq {
  data?: string;
}

/** ProcessCodeDetail */
export interface ProcessCodeDetail {
  /** 流程标签 */
  labelList?: ProcessCodeDetailLabel[];
  /** 流程编码 */
  processCode?: string;
  /** 流程名称 */
  processName?: string;
}

/** ProcessCodeDetailLabel */
export interface ProcessCodeDetailLabel {
  /** 标签 */
  label?: string;
  /** 标签类型 */
  labelType?: string;
  /** 选项 */
  optionList?: DictBean[];
  /** 是否必填 */
  required?: boolean;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  selectType?: number;
}
