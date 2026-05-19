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

/** AdGroupCodeSnapshotBean */
export interface AdGroupCodeSnapshotBean {
  /**
   * 当前版本号
   * @format int32
   */
  currentVersion?: number;
  /** 详情聚合前缀 */
  detailAggregatePrefix?: string;
  /**
   * 详情序号
   * @format int32
   */
  detailSlotSeq?: number;
  /** 最详细详情视图编码 */
  detailViewDisplayCode?: string;
  /** 业务展示编码 */
  displayCode?: string;
  /**
   * 条件组序号
   * @format int32
   */
  groupIndex?: number;
  /** 分组Key */
  groupKey?: string;
  /** 条件组类型 */
  groupType?: string;
  /** 语言编码 */
  language?: string;
}

/** BatchNoResp */
export interface BatchNoResp {
  /** 批次号 */
  batchNo?: string;
  /** 本次生图使用的商品图列表（与请求一致或从库中解析后回填 imageUrl、imageCode） */
  generateImageList?: GenerateImageBean[];
}

/** BatchUploadFinishedImageItemBean */
export interface BatchUploadFinishedImageItemBean {
  /** 匹配到的展示编码 */
  displayCode?: string;
  /** 前端上传的子文件夹名称 */
  folderName?: string;
  /** 匹配到的分组Key */
  groupKey?: string;
  /** 结果说明 */
  message?: string;
  /** 不匹配任务尺寸列表的尺寸（已跳过保存） */
  unmatchedSizeList?: string[];
}

/** BatchUploadFinishedImageResp */
export interface BatchUploadFinishedImageResp {
  /**
   * 上传失败的编码组数量
   * @format int32
   */
  failedCount?: number;
  /** 上传失败的编码组列表 */
  failedGroupList?: BatchUploadFinishedImageItemBean[];
  /**
   * 上传成功的编码组数量
   * @format int32
   */
  successCount?: number;
  /** 上传成功的编码组列表 */
  successGroupList?: BatchUploadFinishedImageItemBean[];
  /**
   * 未匹配编码组数量
   * @format int32
   */
  unmatchedCount?: number;
  /** 未匹配到编码组的列表 */
  unmatchedGroupList?: BatchUploadFinishedImageItemBean[];
}

/** BatchUploadJobResultBean */
export interface BatchUploadJobResultBean {
  /** 批次号 */
  batchNo?: string;
  /** 批次状态 */
  batchStatus?: string;
  /** 批量上传结果 */
  batchUploadResult?: BatchUploadFinishedImageResp;
  /**
   * 失败数
   * @format int32
   */
  failedCount?: number;
  /** 失败项列表 */
  failedItems?: FailedItemBean[];
  /**
   * 成功数
   * @format int32
   */
  successCount?: number;
  /**
   * 总任务数
   * @format int32
   */
  totalCount?: number;
}

/** BizInfoBean */
export interface BizInfoBean {
  /** 活动名称 */
  activityName?: string;
  /** 活动时期 */
  activityPeriod?: string;
  /** 渠道列表 */
  channelList?: string[];
  /** 内容方向/日常推广内容方向说明 */
  contentDirection?: string;
  /** 设计师姓名 */
  designerName?: string;
  /** 折扣信息 */
  discountInfo?: string;
  /** 成品分组编号快照 */
  groupCodeSnapshot?: AdGroupCodeSnapshotBean[];
  /** 图片来源 */
  imageSource?: string;
  /**
   * 是否AI生成
   * @format int32
   */
  isAiGenerated?: number;
  /** 语言列表 */
  languageList?: string[];
  /**
   * 素材类型
   * @format int32
   */
  materialType?: number;
  /** 当前提示词 */
  refinedPrompt?: string;
  /** 组别 */
  sceneGroup?: string;
  /**
   * 场景类型
   * @format int32
   */
  sceneType?: number;
  /** 场景类型名称 */
  sceneTypeName?: string;
  /** 尺寸列表 */
  sizeList?: string[];
  /**
   * 任务阶段
   * @format int32
   */
  taskStage?: number;
  /** 任务阶段描述 */
  taskStageDesc?: string;
  /** 版本号 */
  versionNo?: string;
}

/** ConditionGroupBean */
export interface ConditionGroupBean {
  /**
   * 条件组数量
   * @format int32
   */
  groupCount?: number;
  /** 条件组类型 */
  groupType?: string;
  /**
   * 排序序号
   * @format int32
   */
  sortOrder?: number;
}

/** ConditionGroupParamBean */
export interface ConditionGroupParamBean {
  /**
   * 条件组数量
   * @format int32
   */
  groupCount: number;
  /** 条件组类型 */
  groupType: string;
  /**
   * 排序序号
   * @format int32
   */
  sortOrder?: number;
}

/** DownExpendImageReq */
export interface DownExpendImageReq {
  /** 扩图文件编码集合 */
  imageCodeList?: string[];
  /** 任务编码 */
  taskCode?: string;
}

/** ExpandImageBean */
export interface ExpandImageBean {
  /** 所属渠道 */
  channel?: string;
  /** 图片记录编码 */
  imageCode?: string;
  /** 图片地址 */
  imageUrl?: string;
  /**
   * 是否确认
   * @format int32
   */
  isConfirmed?: number;
  /** OSS Key */
  ossKey?: string;
  /** 尺寸规格 */
  sizeSpec?: string;
}

/** ExpandImageReq */
export interface ExpandImageReq {
  /** 确认的原图图片 */
  ossKey?: string;
  /** 任务编码 */
  taskCode: string;
}

/** ExpandJobResultBean */
export interface ExpandJobResultBean {
  /** 批次号 */
  batchNo?: string;
  /** 批次状态 */
  batchStatus?: string;
  /**
   * 失败数
   * @format int32
   */
  failedCount?: number;
  /** 失败项列表 */
  failedItems?: FailedItemBean[];
  /** 图片列表 */
  imageList?: ImageJobItemBean[];
  /**
   * 成功数
   * @format int32
   */
  successCount?: number;
  /**
   * 总任务数
   * @format int32
   */
  totalCount?: number;
}

/** FailedItemBean */
export interface FailedItemBean {
  /** 错误信息 */
  errorMessage?: string;
  /** 失败尺寸 */
  sizeSpec?: string;
}

/** FinishedGroupBean */
export interface FinishedGroupBean {
  /**
   * 当前版本号
   * @format int32
   */
  currentVersion?: number;
  /** 详情聚合前缀 */
  detailAggregatePrefix?: string;
  /**
   * 详情序号
   * @format int32
   */
  detailSlotSeq?: number;
  /** 最详细详情视图编码 */
  detailViewDisplayCode?: string;
  /** 业务展示编码 */
  displayCode?: string;
  /**
   * 条件组序号
   * @format int32
   */
  groupIndex?: number;
  /** 分组Key */
  groupKey?: string;
  /** 条件组类型 */
  groupType?: string;
  /** 图片列表 */
  imageList?: FinishedImageBean[];
  /** 语言编码 */
  language?: string;
}

/** FinishedImageBean */
export interface FinishedImageBean {
  /** 所属渠道 */
  channel?: string;
  /** 图片记录编码 */
  imageCode?: string;
  /** 图片地址 */
  imageUrl?: string;
  /** OSS Key */
  ossKey?: string;
  /** 尺寸规格 */
  sizeSpec?: string;
  /**
   * 版本号
   * @format int32
   */
  versionNo?: number;
}

/** FinishedImageParam */
export interface FinishedImageParam {
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小（字节）
   * @format int64
   */
  fileSize?: number;
  /** OSS Key */
  ossKey: string;
  /** 尺寸规格 */
  sizeSpec: string;
}

/** GenerateImageBean */
export interface GenerateImageBean {
  /** 图片记录编码（保存后由后端回填） */
  imageCode?: string;
  /** 图片访问地址（保存或读取后由后端回填） */
  imageUrl?: string;
  /** 文件key */
  ossKey?: string;
  /** spu编码 */
  spuCode?: string;
  /** 图片来源 aigc-aigc查询 local-本地上传 */
  src?: string;
}

/** GenerateImageReq */
export interface GenerateImageReq {
  /** 生原图，选择了商品对应的图片，如果不传就是重复生成原图的时候，后端自己获取 */
  generateImageList?: GenerateImageBean[];
  /** 提示词 */
  prompt?: string;
  /** 任务编码 */
  taskCode: string;
}

/** ImageBean */
export interface ImageBean {
  /** 批次号 */
  batchNo?: string;
  /** 图片ID */
  imageCode?: string;
  /** 图片地址 */
  imageUrl?: string;
  /** OSS Key */
  ossKey?: string;
  /** 尺寸规格 */
  sizeSpec?: string;
}

/** ImageGenJobResultBean */
export interface ImageGenJobResultBean {
  /** 批次号 */
  batchNo?: string;
  /** 批次状态 */
  batchStatus?: string;
  /**
   * 失败数
   * @format int32
   */
  failedCount?: number;
  /** 失败项列表 */
  failedItems?: FailedItemBean[];
  /** 图片列表 */
  imageList?: ImageJobItemBean[];
  /**
   * 成功数
   * @format int32
   */
  successCount?: number;
  /**
   * 总任务数
   * @format int32
   */
  totalCount?: number;
}

/** ImageJobItemBean */
export interface ImageJobItemBean {
  /** 所属渠道 */
  channel?: string;
  /** 错误信息 */
  errorMessage?: string;
  /**
   * 图片ID
   * @format int64
   */
  imageId?: number;
  /** 图片地址 */
  imageUrl?: string;
  /** OSS Key */
  ossKey?: string;
  /** 尺寸规格 */
  sizeSpec?: string;
}

/** OperateTaskReq */
export interface OperateTaskReq {
  /** 操作类型 expend_image->扩图操作->扩图待生成； into_detail-> 进入详情图库操作->成品图待生成 */
  operateType?: string;
  /** 确认的原图key 操作类型 expend_imag 时必传 */
  ossKey?: string;
  /** 任务编码 */
  taskCode?: string;
}

/** OptionBean */
export interface OptionBean {
  /** 选项名称 */
  label?: string;
  /**
   * 选项值
   * @format int32
   */
  value?: number;
}

/** OriginalCandidateImageBean */
export interface OriginalCandidateImageBean {
  /** 原图候选列表 */
  originalCandidateImages?: ImageBean[];
}

/** PromptJobResultBean */
export interface PromptJobResultBean {
  /** 批次号 */
  batchNo?: string;
  /** 批次状态 执行中-PENDING 成功-SUCCESS 全部失败-ALL_FAIL 部分成功-PARTIAL_FAIL */
  batchStatus?: string;
  /**
   * 失败数
   * @format int32
   */
  failedCount?: number;
  /** 失败项列表 */
  failedItems?: FailedItemBean[];
  /** 提示词结果 */
  promptResult?: PromptResultBean;
  /**
   * 成功数
   * @format int32
   */
  successCount?: number;
  /**
   * 总任务数
   * @format int32
   */
  totalCount?: number;
}

/** PromptResultBean */
export interface PromptResultBean {
  /** 优化后的提示词 */
  refinedPrompt?: string;
}

/** QueryAiJobStatusResp */
export interface QueryAiJobStatusResp {
  /** 批量上传成品图结果，当 jobType=4 时返回 */
  batchUploadJobResult?: BatchUploadJobResultBean;
  /** 扩图结果，当 jobType=3 时返回 */
  expandJobResult?: ExpandJobResultBean;
  /** 原图生成结果，当 jobType=2 时返回 */
  imageGenJobResult?: ImageGenJobResultBean;
  /**
   * 任务类型 1-提示词优化 2-原图生成 3-扩图 4-批量上传 5-推送广告平台
   * @format int32
   */
  jobType?: number;
  /** 提示词优化结果，当 jobType=1 时返回 */
  promptJobResult?: PromptJobResultBean;
  /** 推送广告平台结果，当 jobType=5 时返回 */
  uploadToAdPlatformJobResult?: UploadToAdPlatformJobResultBean;
}

/** QueryFormOptionsResp */
export interface QueryFormOptionsResp {
  /** 所有尺寸列表 */
  allSizeList?: string[];
  /** 渠道选项 */
  channelOptionList?: string[];
  /** 渠道尺寸映射 */
  channelSizeMapping?: Record<string, string[]>;
  /** 语言选项 */
  languageOptionList?: StringOptionBean[];
  /** 素材类型选项 */
  materialTypeOptionList?: OptionBean[];
  /** 活动周期选项 */
  periodList?: StringOptionBean[];
  /** 产品图片来源选项 */
  productImageSrcList?: StringOptionBean[];
  /** 场景类型选项 */
  sceneTypeOptionList?: OptionBean[];
  /** 所属阶段选项 */
  stageList?: OptionBean[];
  /** 任务状态 */
  taskStatusList?: OptionBean[];
}

/** QueryTaskListReq */
export interface QueryTaskListReq {
  /** 创建人编码 */
  creatorList?: string[];
  /** 设计师编码 */
  designerList?: string[];
  /** 关键词 任务名称 版本号 */
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
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
}

/** QueryTaskListResp */
export interface QueryTaskListResp {
  code?: string;
  /** 任务列表 */
  dataList?: TaskListItemBean[];
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

/** QueryTaskProgressResp */
export interface QueryTaskProgressResp {
  /**
   * 当前任务状态码
   * @format int32
   */
  currentStatus?: number;
  /** 当前任务状态名称 */
  currentStatusName?: string;
  /** 按阶段起始状态确定的进度节点序列，顺序与 AdTaskStatusEnum 流转一致 */
  progressList?: TaskProgressItemBean[];
  /** 任务编码 */
  taskCode?: string;
  /**
   * 任务阶段，与创建任务时一致，用于确定进度条起始节点
   * @format int32
   */
  taskStage?: number;
  /** 任务阶段描述 */
  taskStageDesc?: string;
}

/** ReExpandImageBean */
export interface ReExpandImageBean {
  /** 渠道 */
  channel?: string;
  /** 扩图尺寸不能为空 */
  sizeList: string[];
}

/** ReExpandImageReq */
export interface ReExpandImageReq {
  /** 扩图集合 */
  expandImageList?: ReExpandImageBean[];
  /** 任务编码 */
  taskCode: string;
}

/** RefinePromptReq */
export interface RefinePromptReq {
  /** 用户输入提示词 */
  prompt: string;
  /** 任务编码 */
  taskCode: string;
}

/** SaveTaskReq */
export interface SaveTaskReq {
  /** 促销 -> 活动名称 */
  activityName?: string;
  /** 促销 -> 活动时期 preheat-预热期、official-正式期、return-返场期 */
  activityPeriod?: string;
  /** 渠道列表 */
  channelList: string[];
  /** 条件组列表 */
  conditionGroupList: ConditionGroupParamBean[];
  /** 平销/新品上线场景类型 ->（日常推广）内容方向 */
  contentDirection?: string;
  /** 一句话描述(活动描述) */
  description?: string;
  /** 设计师姓名 */
  designerName?: string;
  /** 促销 -> 折扣信息 */
  discountInfo?: string;
  /** 图片来源 self-自制 cdx-CDX cf-CF */
  imageSource?: string;
  /**
   * 是否AI生成
   * @format int32
   */
  isAiGenerated?: number;
  /** 语言列表 */
  languageList: string[];
  /**
   * 素材类型 默认图片 1-图片 2-视频
   * @format int32
   */
  materialType: number;
  /** 新品上线 -> 组别 */
  sceneGroup?: string;
  /**
   * 场景类型
   * @format int32
   */
  sceneType: number;
  /**
   * 尺寸列表
   * @uniqueItems true
   */
  sizeList: string[];
  /** 任务列表 */
  taskList: TaskItemParam[];
  /**
   * 任务阶段
   * @format int32
   */
  taskStage: number;
}

/** SaveTaskResp */
export interface SaveTaskResp {
  /** 任务编码列表 */
  taskCodeList?: string[];
  /**
   * 任务阶段
   * @format int32
   */
  taskStage?: number;
}

/** SpuBean */
export interface SpuBean {
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
  /** 图片来源 */
  imageSource?: string;
  /** 商品图片地址 */
  productImageUrl?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
}

/** SpuParam */
export interface SpuParam {
  /** 品类编码 */
  categoryCode: string;
  /** 品类名称 */
  categoryName: string;
  /** SPU编码 */
  spuCode: string;
  /** SPU名称 */
  spuName: string;
}

/** StringOptionBean */
export interface StringOptionBean {
  /** 选项名称 */
  label?: string;
  /** 描述备注 */
  remark?: string;
  /** 选项值 */
  value?: string;
}

/** TaskDetailResp */
export interface TaskDetailResp {
  /** 业务信息 */
  bizInfo?: BizInfoBean;
  /** 条件组列表 */
  conditionGroupList?: ConditionGroupBean[];
  /** 创建时间 */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 一句话描述 */
  description?: string;
  /** 扩图确认列表 */
  expandConfirmedImageList?: ExpandImageBean[];
  /** 扩图结果列表 */
  expandResultImageList?: ExpandImageBean[];
  /** 成品图分组列表 */
  finishedImageGroupList?: FinishedGroupBean[];
  /** 原图候选列表 */
  originalCandidateImageList?: OriginalCandidateImageBean[];
  /** 确认原图 */
  originalConfirmedImage?: ImageBean;
  /** SPU列表 */
  spuList?: SpuBean[];
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusName?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务标题 */
  taskName?: string;
  /**
   * 任务类型
   * @format int32
   */
  taskType?: number;
  /** 更新时间 */
  updateTime?: string;
}

/** TaskItemParam */
export interface TaskItemParam {
  /** SPU列表 */
  spuList: SpuParam[];
}

/** TaskListItemBean */
export interface TaskListItemBean {
  /** 创建时间 */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 一句话描述 */
  description?: string;
  /** 设计师名称 */
  designerName?: string;
  /**
   * 场景类型
   * @format int32
   */
  sceneType?: number;
  /** 图片 */
  spuImage?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusName?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务标题 */
  taskName?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 版本号 */
  versionNo?: string;
}

/** TaskProgressItemBean */
export interface TaskProgressItemBean {
  /** 节点进度：COMPLETED-已完成，IN_PROGRESS-进行中，NOT_STARTED-未开始 */
  progressState?: string;
  /** 节点进度中文：已完成 / 进行中 / 未开始 */
  progressStateName?: string;
  /**
   * 任务状态码，对应 AdTaskStatusEnum
   * @format int32
   */
  statusCode?: number;
  /** 任务状态名称 */
  statusName?: string;
}

/** UploadFinishedImageBatchBean */
export interface UploadFinishedImageBatchBean {
  /** folderName 子文件夹名称，与详情页展示的编码组名称是匹配的，例如：场景1-V3-EN */
  folderName: string;
  /** 图片列表 */
  imageList: FinishedImageParam[];
}

/** UploadFinishedImageBatchReq */
export interface UploadFinishedImageBatchReq {
  finishedImageBatchList: UploadFinishedImageBatchBean[];
  /** 任务编码 */
  taskCode: string;
}

/** UploadFinishedImageReq */
export interface UploadFinishedImageReq {
  /** 分组Key */
  groupKey: string;
  /** 图片列表 */
  imageList: FinishedImageParam[];
  /** 任务编码 */
  taskCode: string;
}

/** UploadFinishedImageResp */
export interface UploadFinishedImageResp {
  /**
   * 删除旧图数量
   * @format int32
   */
  deletedCount?: number;
  /** 最详细详情视图编码 */
  detailViewDisplayCode?: string;
  /** 业务展示编码 */
  displayCode?: string;
  /** 分组Key */
  groupKey?: string;
  /** 图片列表 */
  imageList?: FinishedImageBean[];
  /**
   * 新版本号
   * @format int32
   */
  newVersion?: number;
  /**
   * 保存成功数量
   * @format int32
   */
  savedCount?: number;
  /** 不匹配任务尺寸列表的尺寸（已跳过保存） */
  unmatchedSizeList?: string[];
}

/** UploadImageReq */
export interface UploadImageReq {
  /** OSS Key */
  ossKey: string;
  /** SPU编码 上传类型 product-提示词上传商品图时，必传 */
  spuCode?: string;
  /** 商品图片来源方式 上传类型 product-提示词上传商品图时，必传 aigc-aigc上传；local-本地上传 */
  src?: string;
  /** 任务编码 */
  taskCode: string;
  /** 上传类型 product-提示词上传商品图/original-上传原图 */
  uploadType: string;
}

/** UploadImageResp */
export interface UploadImageResp {
  /** 图片地址 */
  imageUrl?: string;
  /** OSS Key */
  ossKey?: string;
}

/** UploadToAdPlatformJobResultBean */
export interface UploadToAdPlatformJobResultBean {
  /** 批次号 */
  batchNo?: string;
  /** 批次状态 */
  batchStatus?: string;
  /**
   * 失败数
   * @format int32
   */
  failedCount?: number;
  /** 失败项列表 */
  failedItems?: FailedItemBean[];
  /**
   * 成功数
   * @format int32
   */
  successCount?: number;
  /**
   * 总任务数
   * @format int32
   */
  totalCount?: number;
  /** 推送广告平台结果 */
  uploadToAdPlatformResult?: UploadToAdPlatformResp;
}

/** UploadToAdPlatformReq */
export interface UploadToAdPlatformReq {
  /** 任务编码 */
  taskCode: string;
}

/** UploadToAdPlatformResp */
export interface UploadToAdPlatformResp {
  /** 提示信息 */
  message?: string;
  /** 是否成功 */
  success?: boolean;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}
