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

/** AidaModelApplicationBean */
export interface AidaModelApplicationBean {
  action?: string;
  attention?: string;
  desire?: string;
  interest?: string;
}

/** CameraWorkBean */
export interface CameraWorkBean {
  /** 机位设置 */
  cameraSetup?: string;
}

/** CharacterAnalysisBean */
export interface CharacterAnalysisBean {
  /** 角色特点 */
  characterCharacteristics?: string[];
  /** 手势对象 */
  gestureRecognition?: GestureRecognitionBean;
  /** 主要角色 */
  mainCharacters?: string[];
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

/** ContentBreakdownBean */
export interface ContentBreakdownBean {
  contentElements?: ContentElementsBean;
  /** 动态活动 */
  dynamicActivities?: DynamicActivitiesBean;
  /** 内容解析 */
  mainContentSummary?: string;
}

/** ContentElementsBean */
export interface ContentElementsBean {
  /** 内容高光点 */
  contents?: string[];
  hasFollowedContents?: boolean;
}

/** DynamicActivitiesBean */
export interface DynamicActivitiesBean {
  /** 活动列表 */
  activities?: string[];
  /** 是否有动态活动 */
  hasActivities?: boolean;
}

/** FullOcrResultBean */
export interface FullOcrResultBean {
  /** 中文翻译 */
  chineseTranslation?: string;
  /** 原文 */
  originalText?: string;
}

/** FullSpeechResultBean */
export interface FullSpeechResultBean {
  /** 语音识别中文翻译 */
  chineseTranslation?: string;
  /** 语音识别 */
  originalTranscript?: string;
}

/** GestureRecognitionBean */
export interface GestureRecognitionBean {
  /** 争议手势列表 */
  gestures?: string[];
  /** 是否具有争议手势 */
  hasControversialGestures?: boolean;
}

/** ImportDataResp */
export interface ImportDataResp {
  /**
   * 失败数量
   * @format int32
   */
  failedCount?: number;
  /** 失败数据 */
  failedData?: object;
  /** 导入记录code */
  recordCode?: string;
  /**
   * 成功数量
   * @format int32
   */
  succeededCount?: number;
  /** 成功数据 */
  succeededData?: object;
  /** 提示内容 */
  tip?: string;
}

/** LanguageRecognitionBean */
export interface LanguageRecognitionBean {
  /** 语音语言 */
  spokenLanguage?: string;
  /** 字幕语言 */
  writtenLanguage?: string;
}

/** NarrativeStructureAnalysisBean */
export interface NarrativeStructureAnalysisBean {
  /** AIDA营销模型分析 */
  aidaModelApplication?: AidaModelApplicationBean;
  /** 叙事模式 */
  coreNarrativeParadigm?: string;
  /** 叙事结构 */
  structuralBreakdown?: StructuralBreakdownBean[];
}

/** ProductMentionedBean */
export interface ProductMentionedBean {
  /** 型号 */
  model?: string;
  /** 产品亮点 */
  productHighlight?: string;
  /** 产品名称 */
  productName?: string;
}

/** ProductionTechniquesBean */
export interface ProductionTechniquesBean {
  /** 光线质量 */
  lightingQuality?: string;
  /** 字幕风格 */
  subtitleStyle?: string;
  /** 转场效果 */
  transitionEffect?: string;
}

/** SceneAnalysisBean */
export interface SceneAnalysisBean {
  /** 场景数量 */
  sceneCount?: string;
  /** 包含场景 */
  scenesIncluded?: string[];
  /** 特殊场景 */
  specialScenesPresent?: SpecialScenesPresentBean;
}

/** SpecialScenesPresentBean */
export interface SpecialScenesPresentBean {
  /** 是否有特殊场景 */
  isSpecialScenes?: boolean;
  /** 特殊场景列表 */
  specialScenes?: string[];
}

/** SplitAnalysisResultBean */
export interface SplitAnalysisResultBean {
  /** 整体氛围 */
  atmosphere?: string[];
  /** 解析 */
  briefDescription?: string;
  /** 主要角色 */
  characters?: string[];
  /** 情感基调 */
  emotionalTone?: string[];
  /** 高光 */
  highlightDescription?: string;
  /** 关键物体 */
  keyObjects?: string[];
  /** 内容特征 */
  mainAction?: string;
  /** 场景 */
  sceneSetting?: string;
  specialGestureRecognition?: GestureRecognitionBean;
  /** 语言信息：语言、ocr翻译、语音识别 */
  textAndSpeechRecognition?: TextAndSpeechRecognitionBean;
}

/** StructuralBreakdownBean */
export interface StructuralBreakdownBean {
  content_summary?: string;
  narrative_function?: string;
  /** @format int32 */
  segment_number?: number;
  time_range?: string;
}

/** TextAndSpeechRecognitionBean */
export interface TextAndSpeechRecognitionBean {
  /** 完整ocr */
  fullOcrResult?: FullOcrResultBean;
  /** 语言识别 */
  fullSpeechResult?: FullSpeechResultBean;
  /** 语言 */
  languageRecognition?: LanguageRecognitionBean;
}

/** VideoAnalysisDetailResp */
export interface VideoAnalysisDetailResp {
  /** 授权标签 */
  authLable?: string;
  /** 作者 */
  author?: string;
  /**
   * 授权方式 0=未授权 ,2=免费授权,3=付费授权 kol同步
   * @format int32
   */
  authorization?: number;
  /**
   * 授权范围 kol同步
   * @format int32
   */
  authorizationArea?: number;
  /** `所属业务 */
  business?: string[];
  /** 镜头运用 */
  cameraWork?: CameraWorkBean;
  /** 角色分析 */
  characterAnalysis?: CharacterAnalysisBean;
  /** 内容解析、动态活动 */
  contentBreakdown?: ContentBreakdownBean;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 文件地址 */
  fileKey?: string;
  /**
   * 视频ID
   * @format int64
   */
  id?: number;
  /** `文件源ItemID（从URL中提取的video/后的数字）` */
  itemId?: string;
  /** 叙事模式、叙事结构、AIDA营销模型分析 */
  narrativeStructureAnalysisBean?: NarrativeStructureAnalysisBean;
  /** 其他特点 */
  otherFeatures?: string[];
  /** 技术信息：转场效果、字幕风格、光线质量 */
  productionTechniques?: ProductionTechniquesBean;
  /** 产品信息 */
  products?: ProductMentionedBean[];
  /** 场景分析 */
  sceneAnalysis?: SceneAnalysisBean;
  /** 渠道 */
  source?: string;
  /** 语言信息：语言、ocr翻译、语音识别 */
  textAndSpeechRecognition?: TextAndSpeechRecognitionBean;
  /** 标题 */
  title?: string;
  /** 授权截止日期 */
  validEndDate?: string;
  /** 授权开始日期 */
  validStartDate?: string;
  /** 基本信息 */
  videoMetadata?: VideoMetadataBean;
}

/** VideoAnalysisOverviewResp */
export interface VideoAnalysisOverviewResp {
  /**
   * 分镜视频数量
   * @format int64
   */
  splitVideoNum?: number;
  /**
   * 主视频数量
   * @format int64
   */
  videoAnalysisNum?: number;
}

/** VideoAnalysisPageReq */
export interface VideoAnalysisPageReq {
  /** 解析 0=未解析,1=已解析,2=解析失败 */
  analysisStatus?: number[];
  /**
   * 授权标签 1=在授权期内,2=不在授权期内（授权，但当前日期不在授权期内）,3=未授权
   * @format int32
   */
  authLable?: number;
  /**
   * 授权期限 1=三个月以内,2=三个月以上,3=半年以上
   * @format int32
   */
  authPeriod?: number;
  /**
   * 授权方式 0=未授权 ,2=免费授权,3=付费授权 kol同步
   * @format int32
   */
  authorization?: number;
  /**
   * 授权范围 kol同步
   * @format int32
   */
  authorizationArea?: number;
  /** `所属业务 */
  business?: string;
  /** 视频特征 */
  contentFeature?: string[];
  /** `文件源ItemID（从URL中提取的video/后的数字）` */
  itemId?: string;
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
  /** 产品信息 */
  productName?: string;
  /** 视屏比例 */
  proportion?: string;
  /** itemid/作者 */
  queryKeyword?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 分辨率 */
  resolutionRatio?: string;
  /** 渠道，多选：与 VideoSourceEnum 取值一致（TikTok、YouTube、Instagram、Facebook） */
  sources?: string[];
  /** 拆分状态 0=未切分,1=已切分,2=切分失败,3=切分已解析(全部) */
  splitStatus?: number[];
  /** 语言 */
  spokenLanguage?: string;
  /** 类型（叙事模式） */
  type?: string;
  /** 视频id */
  videoId?: string;
  /**
   * 视频时长 1=1分钟内, 2=1~2分钟 ,3=2~3分钟 4=3分钟以上
   * @format int32
   */
  videoTime?: number;
}

/** VideoAnalysisPageResp */
export interface VideoAnalysisPageResp {
  code?: string;
  /** 视频列表 */
  dataList?: VideoAnalysisResp[];
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

/** VideoAnalysisParamResp */
export interface VideoAnalysisParamResp {
  /** 授权类型 */
  authorizations?: VideoBusinessBean[];
  /** 下载语言 */
  downLanguages?: VideoBusinessBean[];
  /** 免费授权 */
  freeAuthorizations?: VideoBusinessBean[];
  /** 付费授权 */
  payAuthorizations?: VideoBusinessBean[];
  /** 视频比例 */
  proportions?: string[];
  /** 分辨率 */
  resolutionRatios?: string[];
  /** 渠道筛选可选项 */
  sources?: string[];
  /** 语言 */
  spokenLanguages?: string[];
  /** 叙事范式 */
  types?: string[];
  videoBusiness?: VideoBusinessBean[];
}

/** VideoAnalysisResp */
export interface VideoAnalysisResp {
  /**
   * 解析 0=未解析,1=已解析,2=解析失败
   * @format int32
   */
  analysisStatus?: number;
  /** 授权标签 */
  authLable?: string;
  /** 作者 */
  author?: string;
  /**
   * 授权方式 0=未授权 ,2=免费授权,3=付费授权 kol同步
   * @format int32
   */
  authorization?: number;
  /**
   * 授权范围 kol同步
   * @format int32
   */
  authorizationArea?: number;
  /** `所属业务 */
  business?: string[];
  /** 视频特征 */
  contentFeature?: string[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 视频介绍 */
  description?: string;
  /** 文件地址 */
  fileKey?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** `文件源ItemID（从URL中提取的video/后的数字）` */
  itemId?: string;
  /** 角色信息 */
  mainCharacters?: string[];
  /** 语音 */
  originalTranscript?: string;
  /** 产品信息 */
  productName?: ProductMentionedBean[];
  /** 视屏比例 */
  proportion?: string;
  /** 备注 */
  remark?: string;
  /** 分辨率 */
  resolutionRatio?: string;
  /** 渠道 */
  source?: string;
  /** 分镜结束时间 */
  splitEndTime?: string;
  /** 分镜开始时间 */
  splitStartTime?: string;
  /**
   * 拆分状态 0=未切分,1=已切分,2=切分失败,3=切分已解析(全部)
   * @format int32
   */
  splitStatus?: number;
  /** 语言 */
  spokenLanguage?: string;
  /** 标题 */
  title?: string;
  /** 类型（叙事模式） */
  type?: string;
  /**
   * 授权截止日期
   * @format date
   */
  validEndDate?: string;
  /**
   * 授权开始日期
   * @format date
   */
  validStartDate?: string;
  /** 视频ID */
  videoId?: string;
  /** @format int64 */
  videoSplitCandidateId?: number;
  /** 视频时长s */
  videoTime?: number;
}

/** VideoBusinessBean */
export interface VideoBusinessBean {
  /** 描述 */
  desc?: string;
  /** label */
  value?: string;
}

/** VideoDownReq */
export interface VideoDownReq {
  /** 语言 */
  languages?: string[];
  /** 视频id集合 */
  videoIds?: number[];
  /** 候选id集合 */
  videoSplitCandidateIds?: number[];
}

/** VideoImportDataReq */
export interface VideoImportDataReq {
  /** 所属业务 */
  business?: string;
  /** 导入数据 */
  dataList?: VideoImportExcelBean[];
  /** 上传链接 */
  fileUrl?: string;
}

/** VideoImportExcelBean */
export interface VideoImportExcelBean {
  failResult?: string;
  /** 文件url */
  fileUrl?: string;
  /** 上传状态 */
  uploadStatus?: boolean;
}

/** VideoMetadataBean */
export interface VideoMetadataBean {
  /** 视频比例 */
  aspectRatio?: string;
  /** 分辨率 */
  resolution?: string;
  /** 视频时长 */
  videoDuration?: string;
}

/** VideoSplitCandidateBean */
export interface VideoSplitCandidateBean {
  /** 视频介绍 */
  description?: string;
  /** 文件地址 */
  fileKey?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 视频介绍 */
  originalTranscript?: string;
  /** 视屏比例 */
  proportion?: string;
  /** 分辨率 */
  resolutionRatio?: string;
  /** 分镜结束时间 */
  splitEndTime?: string;
  /** 分镜开始时间 */
  splitStartTime?: string;
  /** 标题 */
  title?: string;
  /** 视频ID */
  videoId?: string;
  /**
   * 切分视频ID
   * @format int64
   */
  videoSplitId?: number;
  /** 视频时长s */
  videoTime?: number;
}

/** VideoSplitCandidateResp */
export interface VideoSplitCandidateResp {
  /** 视频列表 */
  dataList?: VideoSplitCandidateBean[];
}

/** VideoSplitCandidateUpdateReq */
export interface VideoSplitCandidateUpdateReq {
  /**
   * 操作类型 0=添加，1=移除
   * @format int32
   */
  type?: number;
  /** 切分视频ID */
  videoSplitIds?: number[];
}

/** VideoSplitDetailResp */
export interface VideoSplitDetailResp {
  /** 授权标签 */
  authLable?: string;
  /** 作者 */
  author?: string;
  /**
   * 授权方式 0=未授权 ,2=免费授权,3=付费授权 kol同步
   * @format int32
   */
  authorization?: number;
  /**
   * 授权范围 kol同步
   * @format int32
   */
  authorizationArea?: number;
  /** 内容特征 */
  contentFeature?: string[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 主视频文件地址 */
  fileKey?: string;
  /**
   * 分镜视频ID
   * @format int64
   */
  id?: number;
  /** `文件源ItemID（从URL中提取的video/后的数字）` */
  itemId?: string;
  /** 渠道 */
  source?: string;
  /** 相关解析 */
  splitAnalysisResult?: SplitAnalysisResultBean;
  /** 分镜结束时间 */
  splitEndTime?: string;
  /** 分镜文件地址 */
  splitFileKey?: string;
  /** 分镜开始时间 */
  splitStartTime?: string;
  /** 分镜标题 */
  splitTitle?: string;
  /** 主视频标题 */
  title?: string;
  /** 授权截止日期 */
  validEndDate?: string;
  /** 授权开始日期 */
  validStartDate?: string;
  /** 视频ID */
  videoId?: string;
  /** 主视频基本信息 */
  videoMetadata?: VideoMetadataBean;
}

/** CommonResp«ImportDataResp» */
export interface CommonRespImportDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ImportDataResp;
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

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
