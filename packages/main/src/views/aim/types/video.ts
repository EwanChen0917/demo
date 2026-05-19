/**
 * AIAD 模块视频相关类型定义
 * @description 统一管理视频分析模块的类型定义，避免重复和 any 类型滥用
 */

/** 视频项基础信息 */
export interface BaseVideoInfo {
  /** 视频ID（数字） */
  id: number;
  /** 视频ID（字符串） */
  videoId: string;
  /** 标题 */
  title: string;
  /** 作者 */
  author: string;
  /** 文件地址 */
  fileKey: string;
  /** 视频介绍/AI解析 */
  description: string;
  /** 视频比例 */
  proportion: string;
  /** 分辨率 */
  resolutionRatio: string;
  /** 语言 */
  spokenLanguage: string;
  /** 视频时长(秒) */
  videoTime: number;
}

/** 主视频信息（MainVideoList 使用） */
export interface MainVideoInfo extends BaseVideoInfo {
  /** 分析状态: 0=未解析,1=已解析,2=解析失败 */
  analysisStatus: number;
  /** 授权标签 */
  authLable?: string;
  /** 授权方式 0=未授权,2=免费授权,3=付费授权 */
  authorization?: number;
  /** 授权范围 */
  authorizationArea?: number;
  /** 所属业务 */
  business: string[];
  /** 视频特征 */
  contentFeature: string[];
  /** 文件源ItemID */
  itemId: string | number | undefined;
  /** 角色信息 */
  mainCharacters?: string[];
  /** 产品名称 */
  productName?: string[];
  /** 语音 */
  originalTranscript?: string;
  /** 渠道来源 */
  source?: string;
  /** 分镜状态: 0=未切分,1=已切分,2=切分失败,3=切分已解析(全部) */
  splitStatus: number;
  /** 类型（叙事模式） */
  type: string;
  /** 授权截止日期 */
  validEndDate: string;
  /** 授权开始日期 */
  validStartDate: string;
  /** 视频分镜候选ID */
  videoSplitCandidateId: number;
}

/** 分镜视频信息（SplitVideoList 使用） */
export interface SplitVideoInfo extends MainVideoInfo {
  /** 分镜结束时间 */
  splitEndTime?: string;
  /** 分镜开始时间 */
  splitStartTime?: string;
  /** 视频分镜ID（用于候选判断） */
  videoSplitId?: number;
}

/** 候选视频项（CandidateVideoDrawer 使用） */
export interface CandidateVideoItem extends Partial<MainVideoInfo> {
  /** 候选ID */
  id: number;
  /** 视频分镜ID */
  videoSplitId?: number;
  /** 视频分镜候选ID */
  videoSplitCandidateId?: number;
  /** 视频ID */
  videoId?: string;
  /** 标题 */
  title?: string;
  /** 视频比例 */
  proportion?: string;
  /** 视频时长 */
  videoTime?: number;
  /** 文件地址 */
  fileKey?: string;
  /** 视频描述 */
  description?: string;
  /** 分辨率 */
  resolutionRatio?: string;
}

/** 视频播放器使用的视频信息 */
export interface PlayerVideoInfo {
  id: number | string;
  videoSplitId?: number | string;
  fileKey: string;
  title?: string;
  proportion?: string;
  videoTime?: number;
  isInCart?: boolean;
  [key: string]: unknown;
}

/** 批量操作列表项类型（用于 BatchActionBar） */
export type BatchActionVideoItem = MainVideoInfo | SplitVideoInfo | CandidateVideoItem;

/** 导出语言选项 */
export interface LanguageOption {
  value: number;
  label: string;
  checked: boolean;
}

/** 导出请求参数 */
export interface ExportRequestParams {
  /** 语言列表 */
  languages: number[];
  /** 视频ID列表 */
  videoIds: (number | string)[];
  /** 候选视频ID列表（仅候选列表导出时使用） */
  videoSplitCandidateIds?: (number | string)[];
}

/** 表格行数据类型别名 */
export type TableRowData = MainVideoInfo | SplitVideoInfo;

/** 选择变更回调参数类型 */
export type SelectionChangeData = TableRowData[];
