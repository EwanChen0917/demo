import { statisticalApi, productApi } from '@/api/index';
import { ContentType } from '@/api/statistical/http-client';
import { isEmpty } from 'lodash-es';

const TRANSLATION_REQUEST_TIMEOUT = 30 * 60 * 1000;

const callApi = async (apiFunc, params, requestOptions) => {
  try {
    const res = await apiFunc.call(statisticalApi, params, requestOptions);
    const result = res?.data !== undefined ? res.data : res?.result ?? res;
    if (result?.status && Number(result.status) >= 400) {
      throw new Error(result?.error || result?.message || 'Request Error');
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const callProductApi = async (apiFunc, params) => {
  try {
    const res = await apiFunc.call(productApi, params);
    const result = res?.data !== undefined ? res.data : res?.result ?? res;
    if (result?.status && Number(result.status) >= 400) {
      throw new Error(result?.error || result?.message || 'Request Error');
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const LOG_TYPE_KEYWORDS = [
  { type: 'transfer', keywords: ['transfer', '交接', '转交', '移交'] },
  { type: 'split', keywords: ['split', '拆分', '拆单'] },
  { type: 'processing', keywords: ['processing', '进行中', '处理中', '处理', 'assign', '接手'] },
  {
    type: 'complete',
    keywords: ['complete', '完成', '解决', '创建', 'closed', 'finish', '已解', '结束', '办结'],
  },
];

const resolveLogType = (operationType, description = '') => {
  const normalized = `${operationType || ''} ${description || ''}`.toLowerCase();
  for (const { type, keywords } of LOG_TYPE_KEYWORDS) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return type;
    }
  }
  return 'complete';
};

const buildLogDetail = (log) => {
  const suggestions = log.tip || log.operationTypeDesc || log.operationType;
  const description = log.extraInfo || log.itemContent;
  const hasDetail = suggestions || description;
  if (!hasDetail) {
    return undefined;
  }
  return {
    suggestions,
    deadline: log.updateTime,
    description,
    overdue: Boolean(`${log.extraInfo || ''} ${log.remark || ''}`.includes('超时')),
  };
};

const mapWorkOrderLogs = (logsData) => {
  const sourceLogs = Array.isArray(logsData) ? logsData : logsData?.logList ?? [];
  if (!Array.isArray(sourceLogs)) {
    return [];
  }
  return sourceLogs.map((log) => ({
    id:
      log.serialCode ||
      `${log.operator || 'anonymous'}-${log.operationType || 'log'}-${
        log.createTime || log.updateTime || ''
      }`,
    operationType: log.operationType,
    operationTypeDesc: log.operationTypeDesc,
    extraInfo: log.extraInfo,
    itemContent: log.itemContent,
    remark: log.remark,
    createTime: log.createTime,
    updateTime: log.updateTime,
    operator: log.operator,
    operatorCode: log.operatorCode,
    operatorAvatar: log.operatorAvatar,
    originalWorkOrderCode: log.originalWorkOrderCode,
    workOrderCode: log.workOrderCode,
    itemCode: log.itemCode,
    type: resolveLogType(log.operationType, log.operationTypeDesc || log.remark),
    roleLabel: log.tip,
    actorName: log.operator || log.operatorCode,
    action: log.operationTypeDesc || log.operationType || log.tip || '更新',
    time: log.createTime || log.updateTime,
    avatar: log.operatorAvatar,
    sourceTicketId: log.originalWorkOrderCode,
    viewTicketId: log.itemCode,
    detail: buildLogDetail(log),
  }));
};

/** 查询舆情列表 (数据中心) */
export const querySentimentList = (params) => {
  const getLeafValues = (value) => {
    if (!value) return [];
    if (Array.isArray(value) && Array.isArray(value[0])) {
      return value.map((item) => item?.[item.length - 1]).filter(Boolean);
    }
    if (Array.isArray(value)) {
      const leaf = value[value.length - 1];
      return leaf ? [leaf] : [];
    }
    return [];
  };
  const statusMap = {
    processing: 0,
    resolved: 1,
    no_need: 4,
  };
  const statusValue =
    params?.status === '' || params?.status === undefined
      ? undefined
      : statusMap[params.status] ?? params.status;

  const workOrderFlag =
    params?.isWorkOrder === 'yes' ? 1 : params?.isWorkOrder === 'no' ? 0 : undefined;

  const dataSourceList =
    isEmpty(params?.dataSourceList) || params?.dataSourceList.length === 0
      ? undefined
      : params.dataSourceList;
  const interactionRangeMap = {
    lt5: '0-4',
    lt50: '5-50',
    gt50: '51',
  };
  const interactionRange = interactionRangeMap[params?.coveredNum];
  const prTagList = getLeafValues(params?.problemCategory);
  const productLevel1 = params?.productLevel1;
  const productLevel2 = params?.productLevel2;
  const productLevel3 = params?.productLevel3;
  const productLevel4 = params?.productLevel4;
  const productLevel5 = params?.productLevel5;
  const classificationValue = Array.isArray(params?.classification)
    ? params.classification[params.classification.length - 1]
    : params?.classification;

  return callApi(statisticalApi.luteosAiAnalyzeOpinionQueryOpinionDataCenterList, {
    pageNum: params?.pageNum,
    pageSize: params?.pageSize,
    uniqueCode: params?.uniqueCode,
    title: params?.title,
    sentimentList: params?.sentimentList,
    levelList: params?.orderLevelList,
    prTagList,
    productLevel1,
    productLevel2,
    productLevel3,
    productLevel4,
    productLevel5,
    contentTypeList: params?.contentTypeList,
    relevanceList: params?.relevanceList,
    countryList: params?.regionList,
    interactionRange,
    interactionNum: params?.likeCommentReposts,
    dataSourceList,
    publishStartDate: params?.publishTimeStart,
    publishEndDate: params?.publishTimeEnd,
    status: statusValue,
    workOrderFlag,
    classification: classificationValue,
  }).then((result) => {
    if (result?.opinionDataList && !result.list) {
      return {
        ...result,
        list: result.opinionDataList,
      };
    }
    return result;
  });
};

/** 查询工单列表 */
export const queryWorkOrderList = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionQueryList, params);
};

/** 创建工单 */
export const createTicket = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionWorkOrderSave, params);
};

/** 导出工单 */
export const exportWorkOrder = (params) => {
  return callApi(
    (payload) =>
      statisticalApi.request({
        path: `/api/luteos/ai/analyze/opinion/workOrder/exportWorkOrder`,
        method: 'POST',
        type: ContentType.Json,
        body: payload,
      }),
    params
  );
};

/** 导出数据中心 */
export const exportOpinionData = (params) => {
  return callApi(
    (payload) =>
      statisticalApi.request({
        path: `/api/luteos/ai/analyze/opinion/exportOpinionData`,
        method: 'POST',
        type: ContentType.Json,
        body: payload,
      }),
    params
  );
};

/** 获取问题分类字典 (标签树) */
export const getCategoryDict = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionQueryTagTree, {
    source: 'PR-VOC',
    ...(params || {}),
  });
};

/** 获取产品分类字典 (Mock 场景下与 Category 共用逻辑) */
export const getProductDict = (params) => {
  return callProductApi(productApi.luteosProductCategoryQueryCategoryTree, {
    ...(params || {}),
  }).then((result) => ({
    tagTreeList: result?.categoryList || [],
  }));
};

/** 获取员工列表 (执行人) */
export const getEmployeeList = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionQueryExecutorList, params);
};

/** 工单处理 */
export const handleTicketAction = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionWorkOrderOperate, params);
};

/** 获取工单日志 */
export const queryTicketLogs = (workOrderCode) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionWorkOrderQueryLog, { workOrderCode }).then(
    (result) => mapWorkOrderLogs(result?.logList ?? result)
  );
};

/** 获取筛选参数列表 (如状态、分类计数等) */
export const queryOpinionParamList = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionQueryOpinionParamList, params);
};

/** 翻译 */
export const translateSubmit = (params) => {
  return callApi(statisticalApi.luteosAiAnalyzeOpinionTranslationSubmit, params, {
    timeout: TRANSLATION_REQUEST_TIMEOUT,
  });
};
