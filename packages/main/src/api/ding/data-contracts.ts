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

/** ApproveAttachmentBean */
export interface ApproveAttachmentBean {
  /** 组件名 */
  componentName: string;
  /** 文件名 */
  fileName?: string;
  /** 附件地址不能为空 */
  ossKey: string;
  /** 操作人unionId */
  unionId?: string;
}

/** ApproveNodeBean */
export interface ApproveNodeBean {
  /** 节点审批人 */
  approiverList?: string[];
  /** 审批类型 AND-会签 OR-或签 NONE-单人审批 */
  approveType?: string;
}

/** ApprovePictureBean */
export interface ApprovePictureBean {
  /** 组件名 */
  componentName: string;
  /** 文件名 */
  fileName?: string;
  /** 附件地址不能为空 */
  ossKey: string;
  /** 操作人unionId */
  unionId?: string;
}

/** ApproveWorkflowSubmitReq */
export interface ApproveWorkflowSubmitReq {
  /** 审批携带附件 */
  approveAttachmentBeans?: ApproveAttachmentBean[];
  /** 审批内容 key: label-字段名称 value: 内容 */
  approveContent: Record<string, string>;
  /** 审批内容Date */
  approveDataContent?: Record<string, string>;
  /** 审批内容Number */
  approveNumberContent?: Record<string, string>;
  /** 审批携带附件 */
  approvePictureBeans?: ApprovePictureBean[];
  /** 审批明细信息 key: label-字段名称， value: 表格明细 */
  approveTableFieldMap?: Record<string, SubmitTableFieldtReq[][]>;
  /** 审批人节点列表：成员code,不传的话走审批流设置的审批人 */
  approverList?: ApproveNodeBean[];
  /** 抄送人列表：成员code */
  ccList?: string[];
  /** 抄送节点 */
  ccPosition?: string;
  concatList?: ConcatBean[];
  /** 创建人 */
  creator?: string;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  /** 自选节点审批人 */
  targetSelectActioners?: SelectApproveNodeBean[];
  /** 工单主题 默认标题-群通知 */
  workflowSubject: string;
}

/** CardsNoticeWorkflowSubmitReq */
export interface CardsNoticeWorkflowSubmitReq {
  /** 消息@人。格式：{"key":"value"} 例如：{123456:"钉三多"} */
  atOpenIds?: Record<string, string>;
  /** 卡片回调时的路由Key，用于查询注册的callbackUrl 可以为空，不填写默认无需回调 */
  callbackRouteKey?: string;
  cardData?: Record<string, object>;
  /** 模板id */
  cardTemplateId?: string;
  /**
   * 发送的会话类型：0：单聊 1：群聊 说明 单聊：openConversationId不用填写 receiverUserIdList填写用户ID，最大值20
   * @format int32
   */
  conversationType?: number;
  /** 创建人 */
  creator?: string;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  /** 群ID */
  openConversationId?: string;
  /** 唯一标示卡片的外部编码 */
  outTrackId?: string;
  receiverUserIdList: string[];
  /** 工单主题 默认标题-群通知 */
  workflowSubject: string;
}

/** ConcatBean */
export interface ConcatBean {
  name?: string;
  value?: string;
}

/** ContentFieldBean */
export interface ContentFieldBean {
  /** 字段唯一标识，最大长度1024字节 */
  fieldKey?: string;
  /** 字段值，最大长度1024字节 */
  fieldValue?: string;
}

/** CustomTalkParamReq */
export interface CustomTalkParamReq {
  accessToken: string;
  creator?: string;
  dingActionCardMessage?: DingActionCardMessage;
  dingtalkMarkdownMessage?: DingtalkMarkdownMessage;
  dingtalkTextMessage?: DingtalkTextMessage;
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  memberCodeList?: string[];
  msgType: string;
  params?: object;
  platformApp?: string;
  secret: string;
  templateId?: string;
  title?: string;
  workflowSubject?: string;
}

/** Detail */
export interface Detail {
  /** label */
  name: string;
  /** 行 */
  rowList?: Row[];
}

/** DetailUrlBean */
export interface DetailUrlBean {
  appUrl?: string;
  pcUrl?: string;
}

/** DingActionCardMessage */
export interface DingActionCardMessage {
  markdown?: string;
  msgType?: string;
  singleTitle?: string;
  singleUrl?: string;
  title?: string;
}

/** DingtalkMarkdownMessage */
export interface DingtalkMarkdownMessage {
  msgType?: string;
  text?: string;
  title?: string;
}

/** DingtalkTextMessage */
export interface DingtalkTextMessage {
  content?: string;
  msgType?: string;
}

/** Item */
export interface Item {
  /** label */
  name: string;
  /** 具体值 */
  value?: string;
}

/** NoticeWorkflowSubmitReq */
export interface NoticeWorkflowSubmitReq {
  /** 创建人 */
  creator?: string;
  dingActionCardMessage?: DingActionCardMessage;
  dingtalkMarkdownMessage?: DingtalkMarkdownMessage;
  dingtalkTextMessage?: DingtalkTextMessage;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  memberCodeList: string[];
  msgType: string;
  params?: object;
  templateId?: string;
  /** 工单主题 默认标题-群通知 */
  workflowSubject: string;
}

/** OpenWorkflowSubmitReq */
export interface OpenWorkflowSubmitReq {
  /** 通知编码 */
  itemCode: string;
  /** 钉钉markdown通知消息 */
  markdownMessage?: string;
  /** 钉钉markdown通知消息 */
  markdownTitle?: string;
  /** 通知人 */
  toMemberCode: string[];
}

/** RobotTalkSingleParamReq */
export interface RobotTalkSingleParamReq {
  /** 创建人 */
  creator?: string;
  dingActionCardMessage?: DingActionCardMessage;
  dingtalkMarkdownMessage?: DingtalkMarkdownMessage;
  dingtalkTextMessage?: DingtalkTextMessage;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  msgKey?: string;
  msgType: string;
  params?: object;
  robotCode?: string;
  templateId?: string;
  userIdList?: string[];
  /** 工单主题 默认标题-群通知 */
  workflowSubject: string;
}

/** Row */
export interface Row {
  /** 列 */
  itemList?: Item[];
}

/** SelectApproveNodeBean */
export interface SelectApproveNodeBean {
  /** 自选节点的规则key。取获取审核节点信息接口返回【自选节点】的actorKey字段值 */
  actionerKey?: string;
  /** 操作人 userId */
  actionerUserIds?: string[];
}

/** SubmitApproveCanelReq */
export interface SubmitApproveCanelReq {
  /** instanceId */
  instanceId: string;
  /** 操作人（企业服务平台编码） */
  operator: string;
  /** 备注 */
  remark?: string;
}

/** SubmitApproveSubmitReq */
export interface SubmitApproveSubmitReq {
  /** 审批携带附件 */
  approveAttachmentBeans?: ApproveAttachmentBean[];
  /** 审批内容 key: label-字段名称 value: 内容 */
  approveContent: Item[];
  /** 审批人节点列表：成员code,不传的话走审批流设置的审批人 */
  approverList?: ApproveNodeBean[];
  /** 抄送人列表：成员code */
  ccList?: string[];
  /** 抄送节点：START(开始时抄送)/FINISH(结束时抄送)/START_FINISH(开始和结束时都抄送) */
  ccPosition?: string;
  /** 审批明细信息 key: label-字段名称， value: 表格明细 */
  detailList?: Detail[];
  /** itemCode */
  itemCode?: string;
  /** 表单code */
  processCode: string;
  /** 提交人（企业服务平台编码） */
  submitter: string;
  /** 自选节点审批人 */
  targetSelectActioners?: SelectApproveNodeBean[];
  /** 工单主题 */
  workflowSubject?: string;
}

/** SubmitTableFieldtReq */
export interface SubmitTableFieldtReq {
  /** label */
  name?: string;
  /** 具体值 */
  value?: string;
}

/** TodoWorkflowSubmitReq */
export interface TodoWorkflowSubmitReq {
  /** 待办卡片内容区表单自定义字段列表 */
  contentFieldList?: ContentFieldBean[];
  /** 创建人 */
  creator?: string;
  detailUrl?: DetailUrlBean;
  /** @format date-time */
  endTime: string;
  executorCodeList: string[];
  /** @format int32 */
  exportType?: number;
  exportTypeDesc?: string;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 默认- 空字符串 */
  itemName: string;
  /**
   * 对象类型  WorkflowItemTypeEnum
   * @format int32
   */
  itemType: number;
  participantCodeList?: string[];
  /** @format int32 */
  priority: number;
  /** @format date-time */
  startTime: string;
  todoContent: Record<string, string>;
  todoDesc?: string;
  todoSubject: string;
  urlFlag?: boolean;
  /** 工单主题 默认标题-群通知 */
  workflowSubject: string;
}

/** WorkflowSubmitReq */
export interface WorkflowSubmitReq {
  /** 审批信息 */
  approveReq?: ApproveWorkflowSubmitReq;
  /** 高级卡片通知信息 */
  cardsReq?: CardsNoticeWorkflowSubmitReq;
  /** 工单配置 */
  configCode: string;
  /** 创建人/发起人 */
  creator: string;
  /** 群自定义机器人信息 */
  customTalkReq?: CustomTalkParamReq;
  /** 拓展信息 */
  extraInfo?: string;
  /** 工单实例id */
  instanceId?: string;
  /** 对象编码 */
  itemCode: string;
  /** 对象名称 - 用于展示 */
  itemName: string;
  /**
   * 对象类型
   * @format int32
   */
  itemType: number;
  /** 通知信息 */
  noticeReq?: NoticeWorkflowSubmitReq;
  /** 系统应用 */
  platformApp?: string;
  /** 工单备注 */
  remark?: string;
  robotTalkReq?: RobotTalkSingleParamReq;
  /** 待办信息 */
  todoReq?: TodoWorkflowSubmitReq;
  /** 工单描述 */
  workflowDesc?: string;
  /** 工单主题 */
  workflowSubject: string;
  /**
   * 工单类型
   * @format int32
   */
  workflowType: number;
}

/** CommonResp«JSONObject» */
export interface CommonRespJSONObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: Record<string, object>;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
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
