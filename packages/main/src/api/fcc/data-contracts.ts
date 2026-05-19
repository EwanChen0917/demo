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

/** ChildLabelFileBean */
export interface ChildLabelFileBean {
  /** 文件信息 */
  fileList?: FccCenterBean[];
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
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

/** FccCategoryBean */
export interface FccCategoryBean {
  /** 子集 */
  categoryBeanList?: FccCategoryBean[];
  /** 分类id */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 创建人 */
  creatorName?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 分类父id */
  parentCategoryCode?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** FccCategoryDeleteReq */
export interface FccCategoryDeleteReq {
  /** 分类编码 */
  categoryCode?: string;
}

/** FccCategoryDeleteResp */
export interface FccCategoryDeleteResp {
  /** 分类编码 */
  categoryCode?: string;
}

/** FccCategoryListResp */
export interface FccCategoryListResp {
  code?: string;
  /** 文件分类集合 */
  fileCategoryList?: FccCategoryBean[];
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

/** FccCategorySaveReq */
export interface FccCategorySaveReq {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 父级分类编码 */
  parentCategoryCode?: string;
}

/** FccCategorySaveResp */
export interface FccCategorySaveResp {
  /** 分类编码 */
  categoryCode?: string;
}

/** FccCenterBean */
export interface FccCenterBean {
  /**
   * 权限 1-下载及可查看 2-仅查看
   * @format int32
   */
  auth?: number;
  /** 子项list */
  children?: FccCenterBean[];
  /** 文件名扩展类型 */
  extType?: string;
  /** 文控中心编码 */
  fileCode?: string;
  /** 名称 */
  fileName?: string;
  /**
   * 文件数量
   * @format int32
   */
  fileNumber?: number;
  /** 文件路径 */
  filePath?: string;
  /** 文件大小 */
  fileSize?: string;
  /** 文件来源 */
  fileSource?: string;
  /**
   * 文控类型 1-文件夹 2-文件
   * @format int32
   */
  fileType?: number;
  /** 标签信息集合 */
  labelInfoList?: LabelInfoBean[];
  /** 上级编码 */
  parentCode?: string;
  /** 可见范围列表 */
  scopeList?: LuteFileScopeBean[];
  /**
   * 排序 值越小优先级越高
   * @format int32
   */
  sort?: number;
  /** 标签列表 */
  tagList?: FccLabelSimpleBean[];
  /** 缩略图url */
  thumbnailUrl?: string;
  /** 顶级编码 */
  topCode?: string;
  /**
   * 上传时间
   * @format date-time
   */
  uploadTime?: string;
  /** 上传人编码 */
  uploaderCode?: string;
  /** 上传人名称 */
  uploaderName?: string;
  /** 文件地址 */
  url?: string;
  /**
   * 视频时长
   * @format int64
   */
  videoTime?: number;
  /** 可见范围-字符串 */
  viewScopeStr?: string;
}

/** FccClientFileResp */
export interface FccClientFileResp {
  code?: string;
  /** 用户端文件集合 */
  fileClientList?: FccCenterBean[];
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

/** FccClientFileUploadReq */
export interface FccClientFileUploadReq {
  /**
   * 权限 1-可下载及查看 2-仅查看 单选
   * @format int32
   */
  auth: number;
  /** 文件夹名称 */
  fileName?: string;
  /** 文件集合 */
  fileReqs?: FileUploadReq[];
  /** 标签编码 */
  labelCodeList?: string[];
  /** 权限可见范围 部门编码 */
  ownerList: string[];
  /** 父类编码 */
  parentCode?: string;
  /**
   *  场景 1-文控 2-在线知识库 3-素材管理 5-我的素材
   * @format int32
   */
  scene: number;
}

/** FccDeleteReq */
export interface FccDeleteReq {
  /** fileCode 集合 */
  fileCodeList?: string[];
}

/** FccDeptInfoListResp */
export interface FccDeptInfoListResp {
  /** 部门集合 */
  deptList?: DeptInfoBean[];
}

/** FccFileInfoResp */
export interface FccFileInfoResp {
  /** 文件格式类型 */
  extType?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件链接 */
  filePath?: string;
}

/** FccFileQueryKeywordResp */
export interface FccFileQueryKeywordResp {
  /** 热门搜索词列表 */
  keyWordList?: string[];
}

/** FccFolderBean */
export interface FccFolderBean {
  /** 下级目录 */
  childFolder?: FccFolderBean;
  /** 文件夹编码 */
  fileCode?: string;
  /** 文件夹名称 */
  fileName?: string;
}

/** FccFolderInfoResp */
export interface FccFolderInfoResp {
  /** 文件夹集合 */
  folderList?: FccFolderBean[];
}

/** FccFolderParentBeanResp */
export interface FccFolderParentBeanResp {
  /** 文件夹编码 */
  fccFolder?: FccFolderBean;
}

/** FccFolderResp */
export interface FccFolderResp {
  /** 文件夹下面的文件夹编码集合 */
  fccFolderDetails?: FccCenterBean[];
}

/** FccLabelBean */
export interface FccLabelBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 分类全路径 */
  categoryPath?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
  /**
   * 启动状态 1-启动 0-关闭
   * @format int32
   */
  status?: number;
}

/** FccLabelDeleteReq */
export interface FccLabelDeleteReq {
  /** 标签编码列表 */
  labelCodeList?: string[];
}

/** FccLabelFileListResp */
export interface FccLabelFileListResp {
  code?: string;
  /** 文件信息 */
  fileList?: FccCenterBean[];
  /** 二级标签 */
  labelCode?: string;
  /** 二级标签名称 */
  labelName?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 一级标签 */
  topLabelCode?: string;
  /** 一级标签名称 */
  topLabelName?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FccLabelLevelListResp */
export interface FccLabelLevelListResp {
  /** 文件标签集合-分层级 */
  fccLabelLevelList?: LabelInfoBean[];
}

/** FccLabelLevelSaveReq */
export interface FccLabelLevelSaveReq {
  /** 标签编码 */
  labelCode?: string;
  /** 标签类型 fc_center-文控 fc_knowledge-知识库 fc_material-素材 fc_research-用研资料 */
  labelModel?: string;
  /** 标签名称 */
  labelName: string;
  /** 父级标签编码 */
  parentLabelCode?: string;
  /**
   * 状态
   * @format int32
   */
  status: number;
}

/** FccLabelLevelSaveResp */
export interface FccLabelLevelSaveResp {
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
}

/** FccLabelListResp */
export interface FccLabelListResp {
  code?: string;
  /** 文件标签集合 */
  fccLabelList?: FccLabelBean[];
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

/** FccLabelSaveReq */
export interface FccLabelSaveReq {
  /** 分类编码 */
  categoryCode: string;
  /** 标签列表 */
  labelList: SimpleLabelBean[];
  /** 标签类型 fc_center-文控 fc_knowledge-知识库 fc_material-素材 fc_research-用研资料 */
  labelType?: string;
  /**
   * 状态
   * @format int32
   */
  status: number;
}

/** FccLabelSaveResp */
export interface FccLabelSaveResp {
  /** 标签编码 */
  labelCodeList?: string[];
}

/** FccLabelSimpleBean */
export interface FccLabelSimpleBean {
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
}

/** FccOperateReq */
export interface FccOperateReq {
  /**
   * 权限  操作2必填
   * @format int32
   */
  auth?: number;
  /** 文件编码 */
  fileCode: string;
  /** 文件来源 操作4必填 */
  fileSource?: string;
  /** 标签列表 */
  labelCodeList?: string[];
  /**
   * 操作类型 1-修改可见范围 2-修改文件权限 3-编辑标签 4-修改文件来源 5-更新标签
   * @format int32
   */
  operateType: number;
  /** 可见范围集合  操作1必填 */
  ownerList?: string[];
  /**
   * 场景 素材场景：3； 操作5-更新标签必传
   * @format int32
   */
  scene?: number;
}

/** FccQueryResp */
export interface FccQueryResp {
  code?: string;
  /** 文控中心列表 */
  fileCenterBeanList?: FccCenterBean[];
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

/** FccRecentLabelFileResp */
export interface FccRecentLabelFileResp {
  /** 最近更新文件 */
  fileList?: LabelFileRecentBean[];
}

/** FccSaveReq */
export interface FccSaveReq {
  /**
   * 权限 1-可下载及查看 2-仅查看 单选
   * @format int32
   */
  auth: number;
  /** 文控中心编码 */
  fileCode?: string;
  /** 文件夹名称 */
  fileName?: string;
  /** 文件路径 */
  filePathCode?: string;
  /** 文件集合 */
  fileReqs?: FileReq[];
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 文件来源 */
  fileSource?: string;
  /** 是否添加 */
  isAdd?: boolean;
  /** 标签编码 */
  labelCodeList?: string[];
  /** 权限可见范围 部门编码 */
  ownerList: string[];
  /** 父类编码 */
  parentCode?: string;
  /**
   *  场景 1-文控 2-在线知识库 3-素材管理
   * @format int32
   */
  scene: number;
}

/** FccSaveResp */
export interface FccSaveResp {
  /** 文件key */
  fileKey?: string;
  /** 文件地址 */
  url?: string;
}

/** FccSimpleLabelFileResp */
export interface FccSimpleLabelFileResp {
  /** 标签文件信息 */
  labelFileList?: LabelFileBean[];
}

/** FccSortFileReq */
export interface FccSortFileReq {
  /** 文件编码 */
  fileCode: string;
  /**
   * 当前列表中的顺序
   * @format int32
   */
  newSort?: number;
  /**
   * 后端返回的顺序
   * @format int32
   */
  originalSort?: number;
}

/** FccThumbnailUrlReq */
export interface FccThumbnailUrlReq {
  /** 文件编码 */
  fileCode: string;
  /** 缩略图key */
  thumbnailKey: string;
}

/** FccThumbnailUrlResp */
export interface FccThumbnailUrlResp {
  /** 文件编码 */
  fileCode?: string;
}

/** FccTopLabelFileResp */
export interface FccTopLabelFileResp {
  /** 一级标签集合 */
  topLabelFileList?: LabelFileTopBean[];
}

/** FileReq */
export interface FileReq {
  /** 文件内容 */
  content?: string;
  /** 文件类型 */
  extType?: string;
  /** 文件上传key */
  fileKey?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 缩略图 */
  thumbnailKey?: string;
  /**
   * 视频时长大小 秒
   * @format int64
   */
  videoTime?: number;
}

/** FileUploadReq */
export interface FileUploadReq {
  /** 文件内容 */
  content?: string;
  /** 文件类型 */
  extType?: string;
  /** 文件上传key */
  fileKey?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 缩略图 */
  thumbnailKey?: string;
  /**
   * 视频时长大小 秒
   * @format int64
   */
  videoTime?: number;
}

/** LabelFileBean */
export interface LabelFileBean {
  /** 二级标签信息 */
  childLabelFileList?: ChildLabelFileBean[];
  /** 一级标签编码 */
  topLabelCode?: string;
  /** 一级标签名称 */
  topLabelName?: string;
}

/** LabelFileRecentBean */
export interface LabelFileRecentBean {
  /** 头像 */
  avatar?: string;
  /**
   * 最近更新时间
   * @format date-time
   */
  createTime?: string;
  /** 文件 */
  fileList?: SimpleFccCenterBean[];
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
  /** 用户编码 */
  memberCode?: string;
  /** 用户名称 */
  memberName?: string;
  /**
   * 标签数量
   * @format int32
   */
  num?: number;
  /** 一级标签编码 */
  topLabelCode?: string;
  /** 一级标签名称 */
  topLabelName?: string;
}

/** LabelFileTopBean */
export interface LabelFileTopBean {
  /** 文件 */
  fileList?: SimpleFccCenterBean[];
  /**
   * 标签数量
   * @format int32
   */
  num?: number;
  /** 一级标签编码 */
  topLabelCode?: string;
  /** 一级标签名称 */
  topLabelName?: string;
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

/** LuteFileScopeBean */
export interface LuteFileScopeBean {
  /**
   * 可见部门编码
   * @format int64
   */
  deptId?: number;
  /** 可见部门名称 */
  deptName?: string;
}

/** SimpleFccCenterBean */
export interface SimpleFccCenterBean {
  /** 头像 */
  avatar?: string;
  /**
   * 上传时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 文件名扩展类型 */
  extType?: string;
  /** 文件编码 */
  fileCode?: string;
  /** 文件名称 */
  fileName?: string;
  /** 标签编码 */
  labelCode?: string;
  /** 缩略图url */
  thumbnailUrl?: string;
  /** 一级标签编码 */
  topLabelCode?: string;
}

/** SimpleLabelBean */
export interface SimpleLabelBean {
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
