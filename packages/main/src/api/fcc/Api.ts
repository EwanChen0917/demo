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

import {
  CommonExportResp,
  CommonRespObject,
  FccCategoryDeleteReq,
  FccCategoryDeleteResp,
  FccCategoryListResp,
  FccCategorySaveReq,
  FccCategorySaveResp,
  FccClientFileResp,
  FccClientFileUploadReq,
  FccDeleteReq,
  FccDeptInfoListResp,
  FccFileInfoResp,
  FccFileQueryKeywordResp,
  FccFolderInfoResp,
  FccFolderParentBeanResp,
  FccFolderResp,
  FccLabelDeleteReq,
  FccLabelFileListResp,
  FccLabelLevelListResp,
  FccLabelLevelSaveReq,
  FccLabelLevelSaveResp,
  FccLabelListResp,
  FccLabelSaveReq,
  FccLabelSaveResp,
  FccOperateReq,
  FccQueryResp,
  FccRecentLabelFileResp,
  FccSaveReq,
  FccSaveResp,
  FccSimpleLabelFileResp,
  FccSortFileReq,
  FccThumbnailUrlReq,
  FccThumbnailUrlResp,
  FccTopLabelFileResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 文件分类模块
   * @name LuteosFccCategoryDeleteFccCategory
   * @summary 标签分类删除
   * @request POST:/api/luteos/fcc/category/deleteFccCategory
   * @response `200` `FccCategoryDeleteResp` OK
   */
  luteosFccCategoryDeleteFccCategory = (req: FccCategoryDeleteReq, params: RequestParams = {}) =>
    this.request<FccCategoryDeleteResp, any>({
      path: `/api/luteos/fcc/category/deleteFccCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件分类模块
   * @name LuteosFccCategoryQueryFccCategoryList
   * @summary 标签分类查询
   * @request GET:/api/luteos/fcc/category/queryFccCategoryList
   * @response `200` `FccCategoryListResp` OK
   */
  luteosFccCategoryQueryFccCategoryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<FccCategoryListResp, any>({
      path: `/api/luteos/fcc/category/queryFccCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件分类模块
   * @name LuteosFccCategorySaveFccCategory
   * @summary 标签分类保存
   * @request POST:/api/luteos/fcc/category/saveFccCategory
   * @response `200` `FccCategorySaveResp` OK
   */
  luteosFccCategorySaveFccCategory = (req: FccCategorySaveReq, params: RequestParams = {}) =>
    this.request<FccCategorySaveResp, any>({
      path: `/api/luteos/fcc/category/saveFccCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryAllFolderList
   * @summary 用户端-文件下拉树查询
   * @request GET:/api/luteos/fcc/center/client/queryAllFolderList
   * @response `200` `FccFolderInfoResp` OK
   */
  luteosFccCenterClientQueryAllFolderList = (
    query: {
      /** 上级目录 默认素材中心 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFolderInfoResp, any>({
      path: `/api/luteos/fcc/center/client/queryAllFolderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryFileInfo
   * @summary 用户端-查询文件信息
   * @request GET:/api/luteos/fcc/center/client/queryFileInfo
   * @response `200` `FccFileInfoResp` OK
   */
  luteosFccCenterClientQueryFileInfo = (
    query: {
      /** 文件编码 */
      fileCode?: string;
      /**
       * 操作类型 1-下载 2-预览
       * @format int32
       */
      operateType: number;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFileInfoResp, any>({
      path: `/api/luteos/fcc/center/client/queryFileInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryFileList
   * @summary 用户端-文件查询
   * @request GET:/api/luteos/fcc/center/client/queryFileList
   * @response `200` `FccClientFileResp` OK
   */
  luteosFccCenterClientQueryFileList = (
    query: {
      /** 文件格式集合 */
      extTypeList?: string[];
      /** 文件路径对应的fileCode */
      filePathCode?: string;
      /** 文件名称 */
      keyword?: string;
      /** 文件标签编码集合 */
      labelCodeList?: string[];
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
      /** 父级编码 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccClientFileResp, any>({
      path: `/api/luteos/fcc/center/client/queryFileList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryFolderList
   * @summary 用户端-文件夹查询
   * @request GET:/api/luteos/fcc/center/client/queryFolderList
   * @response `200` `FccFolderInfoResp` OK
   */
  luteosFccCenterClientQueryFolderList = (
    query: {
      /** 上级目录 默认素材中心 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFolderInfoResp, any>({
      path: `/api/luteos/fcc/center/client/queryFolderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryKeyWordTop
   * @summary 用户端-查询搜索关键词前五位
   * @request GET:/api/luteos/fcc/center/client/queryKeyWordTop
   * @response `200` `FccFileQueryKeywordResp` OK
   */
  luteosFccCenterClientQueryKeyWordTop = (params: RequestParams = {}) =>
    this.request<FccFileQueryKeywordResp, any>({
      path: `/api/luteos/fcc/center/client/queryKeyWordTop`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryLabelFileList
   * @summary 用户端-素材文件分页查询
   * @request GET:/api/luteos/fcc/center/client/queryLabelFileList
   * @response `200` `FccLabelFileListResp` OK
   */
  luteosFccCenterClientQueryLabelFileList = (
    query: {
      /** 文件格式集合 */
      extTypeList?: string[];
      /** 文件名称 */
      keyword?: string;
      /** 二级标签编码 最近更新跳转素材文件分页页面时必传 */
      labelCode?: string;
      /** 文件标签编码集合 */
      labelCodeList?: string[];
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
      /**
       * 场景 素材场景:scene=3
       * @format int32
       */
      scene: number;
      /** 一级标签编码 点击一级标签、最近更新、红人素材全部时传 */
      topLabelCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccLabelFileListResp, any>({
      path: `/api/luteos/fcc/center/client/queryLabelFileList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryRecentLabelFileList
   * @summary 用户端-最近更新文件查询
   * @request GET:/api/luteos/fcc/center/client/queryRecentLabelFileList
   * @response `200` `FccRecentLabelFileResp` OK
   */
  luteosFccCenterClientQueryRecentLabelFileList = (
    query: {
      /** 文件格式集合 */
      extTypeList?: string[];
      /** 文件名称 */
      keyword?: string;
      /** 文件标签编码集合 */
      labelCodeList?: string[];
      /** 父级编码 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccRecentLabelFileResp, any>({
      path: `/api/luteos/fcc/center/client/queryRecentLabelFileList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQuerySimpleLabelFileList
   * @summary 用户端-首页简版素材文件查询
   * @request GET:/api/luteos/fcc/center/client/querySimpleLabelFileList
   * @response `200` `FccSimpleLabelFileResp` OK
   */
  luteosFccCenterClientQuerySimpleLabelFileList = (
    query: {
      /** 文件格式集合 */
      extTypeList?: string[];
      /** 文件名称 */
      keyword?: string;
      /** 文件标签编码集合 */
      labelCodeList?: string[];
      /** 父级编码 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccSimpleLabelFileResp, any>({
      path: `/api/luteos/fcc/center/client/querySimpleLabelFileList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientQueryTopLabelFileList
   * @summary 用户端-一级标签文件查询
   * @request GET:/api/luteos/fcc/center/client/queryTopLabelFileList
   * @response `200` `FccTopLabelFileResp` OK
   */
  luteosFccCenterClientQueryTopLabelFileList = (
    query: {
      /** 文件格式集合 */
      extTypeList?: string[];
      /** 文件名称 */
      keyword?: string;
      /** 文件标签编码集合 */
      labelCodeList?: string[];
      /** 父级编码 */
      parentCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccTopLabelFileResp, any>({
      path: `/api/luteos/fcc/center/client/queryTopLabelFileList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterClientUploadFile
   * @summary 上传文件
   * @request POST:/api/luteos/fcc/center/client/uploadFile
   * @response `200` `(FccSaveResp)[]` OK
   */
  luteosFccCenterClientUploadFile = (req: FccClientFileUploadReq, params: RequestParams = {}) =>
    this.request<FccSaveResp[], any>({
      path: `/api/luteos/fcc/center/client/uploadFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterDeleteFiles
   * @summary 删除文件
   * @request POST:/api/luteos/fcc/center/deleteFiles
   * @response `200` `void` OK
   */
  luteosFccCenterDeleteFiles = (fccDeleteReq: FccDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/fcc/center/deleteFiles`,
      method: 'POST',
      body: fccDeleteReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterDownFile
   * @summary 下载文件
   * @request GET:/api/luteos/fcc/center/downFile
   * @response `200` `CommonExportResp` OK
   */
  luteosFccCenterDownFile = (
    query: {
      /** fileCode */
      fileCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/fcc/center/downFile`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterFindAllFolder
   * @summary 查询所有文件夹
   * @request GET:/api/luteos/fcc/center/findAllFolder
   * @response `200` `FccFolderResp` OK
   */
  luteosFccCenterFindAllFolder = (
    query: {
      /** 文件编码 */
      fileCode?: string;
      /**
       *  场景 1-文控 2-在线知识库 5-我的素材
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFolderResp, any>({
      path: `/api/luteos/fcc/center/findAllFolder`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterFindFolderParentList
   * @summary 查询文件夹祖先树结构
   * @request GET:/api/luteos/fcc/center/findFolderParentList
   * @response `200` `FccFolderParentBeanResp` OK
   */
  luteosFccCenterFindFolderParentList = (
    query: {
      /** 文件编码 */
      fileCode?: string;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFolderParentBeanResp, any>({
      path: `/api/luteos/fcc/center/findFolderParentList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterOperateFile
   * @summary 操作文件
   * @request POST:/api/luteos/fcc/center/operateFile
   * @response `200` `CommonRespObject` OK
   */
  luteosFccCenterOperateFile = (req: FccOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/fcc/center/operateFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterQueryDeptInfoList
   * @summary 查询文件部门可见范围
   * @request GET:/api/luteos/fcc/center/queryDeptInfoList
   * @response `200` `FccDeptInfoListResp` OK
   */
  luteosFccCenterQueryDeptInfoList = (
    query: {
      /** fileCode */
      fileCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccDeptInfoListResp, any>({
      path: `/api/luteos/fcc/center/queryDeptInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterQueryFccList
   * @summary 文件中心/在线知识库列表查询
   * @request GET:/api/luteos/fcc/center/queryFccList
   * @response `200` `FccQueryResp` OK
   */
  luteosFccCenterQueryFccList = (
    query: {
      /**
       * 文件权限 1-可下载及查看 2-仅查看
       * @format int32
       */
      auth?: number;
      /** 可见部门id */
      deptIdList?: string[];
      /** 文件格式 */
      extTypeList?: string[];
      /** 文控中心编码 */
      fileCode?: string;
      /** 文件路径 */
      filePathCode?: string;
      /** 文件标签 */
      fileTagList?: string[];
      /** 文件/文件名称/文件内容 */
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
      /**
       *  场景 1-文控 2-在线知识库 3-素材管理 5-我的素材
       * @format int32
       */
      scene: number;
      /** 按照排序排 asc-正序 desc 倒序 */
      sortBy?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccQueryResp, any>({
      path: `/api/luteos/fcc/center/queryFccList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterQueryFileInfo
   * @summary 查询文件信息
   * @request GET:/api/luteos/fcc/center/queryFileInfo
   * @response `200` `FccFileInfoResp` OK
   */
  luteosFccCenterQueryFileInfo = (
    query: {
      /** 文件编码 */
      fileCode?: string;
      /**
       * 操作类型 1-下载 2-预览
       * @format int32
       */
      operateType: number;
      /**
       * 场景
       * @format int32
       */
      scene: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccFileInfoResp, any>({
      path: `/api/luteos/fcc/center/queryFileInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterSaveOrUpdate
   * @summary 新建/编辑
   * @request POST:/api/luteos/fcc/center/saveOrUpdate
   * @response `200` `(FccSaveResp)[]` OK
   */
  luteosFccCenterSaveOrUpdate = (fccSaveReq: FccSaveReq, params: RequestParams = {}) =>
    this.request<FccSaveResp[], any>({
      path: `/api/luteos/fcc/center/saveOrUpdate`,
      method: 'POST',
      body: fccSaveReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterSaveThumbnailUrl
   * @summary 保存缩略图
   * @request POST:/api/luteos/fcc/center/saveThumbnailUrl
   * @response `200` `FccThumbnailUrlResp` OK
   */
  luteosFccCenterSaveThumbnailUrl = (req: FccThumbnailUrlReq, params: RequestParams = {}) =>
    this.request<FccThumbnailUrlResp, any>({
      path: `/api/luteos/fcc/center/saveThumbnailUrl`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件中心模块
   * @name LuteosFccCenterSortFile
   * @summary 文件拖拉排序
   * @request POST:/api/luteos/fcc/center/sortFile
   * @response `200` `CommonRespObject` OK
   */
  luteosFccCenterSortFile = (req: FccSortFileReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/fcc/center/sortFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件标签模块
   * @name LuteosFccTagDeleteFccTag
   * @summary 文件标签删除
   * @request POST:/api/luteos/fcc/tag/deleteFccTag
   * @response `200` `CommonRespObject` OK
   */
  luteosFccTagDeleteFccTag = (req: FccLabelDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/fcc/tag/deleteFccTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件标签模块
   * @name LuteosFccTagQueryFccLabelLevelList
   * @summary 分层级文件标签查询
   * @request GET:/api/luteos/fcc/tag/queryFccLabelLevelList
   * @response `200` `FccLabelLevelListResp` OK
   */
  luteosFccTagQueryFccLabelLevelList = (
    query: {
      /** 创建人编码 */
      creatorList?: string[];
      /** 标签名称 */
      labelName?: string;
      /** 标签类型 fc_center-文控 fc_knowledge-知识库 fc_material-素材 fc_research-用研资料 */
      labelType: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FccLabelLevelListResp, any>({
      path: `/api/luteos/fcc/tag/queryFccLabelLevelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件标签模块
   * @name LuteosFccTagQueryFccLabelList
   * @summary 文件标签查询
   * @request GET:/api/luteos/fcc/tag/queryFccLabelList
   * @response `200` `FccLabelListResp` OK
   */
  luteosFccTagQueryFccLabelList = (
    query: {
      /** 分类编码 */
      categoryCode?: string;
      /** 创建人编码 */
      creator?: string;
      /** 标签名称 */
      labelName?: string;
      /** 标签类型 fc_center-文控 fc_knowledge-知识库 fc_material-素材 fc_research-用研资料 */
      labelType: string;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<FccLabelListResp, any>({
      path: `/api/luteos/fcc/tag/queryFccLabelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件标签模块
   * @name LuteosFccTagSaveFccLabel
   * @summary 分层级文件标签保存
   * @request POST:/api/luteos/fcc/tag/saveFccLabel
   * @response `200` `FccLabelLevelSaveResp` OK
   */
  luteosFccTagSaveFccLabel = (req: FccLabelLevelSaveReq, params: RequestParams = {}) =>
    this.request<FccLabelLevelSaveResp, any>({
      path: `/api/luteos/fcc/tag/saveFccLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 文件标签模块
   * @name LuteosFccTagSaveFccTag
   * @summary 文件标签保存
   * @request POST:/api/luteos/fcc/tag/saveFccTag
   * @response `200` `FccLabelSaveResp` OK
   */
  luteosFccTagSaveFccTag = (req: FccLabelSaveReq, params: RequestParams = {}) =>
    this.request<FccLabelSaveResp, any>({
      path: `/api/luteos/fcc/tag/saveFccTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
