import { useAxios } from '@/config/axios/useAxios';

const request = useAxios();

// 查询年度新品数据-甘特图
// export const queryPdtProductList = (data: any) => {
//   return request.post({ url: '/api/luteos/newprod/queryPdtProductChartList', data });
// };

// 查询年度新品数据-表格
export const queryPdtProductTableList = (data: any) => {
  return request.post({ url: '/api/luteos/newprod/queryPdtProductTableList', data });
};

// 更新评分
export const reviewStar = (data: any) => {
  return request.post({ url: '/api/luteos/newprod/reviewStar', data });
};

// 更新上架时间
export const updateListingTime = (data: any) => {
  return request.post({ url: '/api/luteos/newprod/updateListingTime', data });
};

// 取消商品
export const cancelPdtProduct = (data: any) => {
  return request.post({ url: '/api/luteos/newprod/cancelPdtProduct', data });
};

// 查询品类-分页数据
export const queryPdtProductOwnerList = (params: any) => {
  return request.get({ url: '/api/luteos/pdt/queryOperatorList', params });
};

// 查询品线-分页数据
export const queryPdtProductLineList = (data: any) => {
  return request.post({ url: '/api/luteos/newprod/queryPdtProductLineList', data });
};

// 当月交付新品
export const getMonthHandleAnalysis = (data: any) => {
  return request.post({ url: '/api/luteos/pdtdashborad/getMonthHandleAnalysis', data });
};

// 全年新品分类
export const getYearProductLineAnalysis = (data: any) => {
  return request.post({ url: '/api/luteos/pdtdashborad/getYearProductLineAnalysis', data });
};

// 全年新品上线总数-产品经理列表
export const getYearProductManagerAnalysis = (data: any) => {
  return request.post({ url: '/api/luteos/pdtdashborad/getYearProductManagerAnalysis', data });
};

// 年度分值
export const getPdtProductAvgStartAndDealyCount = (data: any) => {
  return request.post({ url: '/api/luteos/pdtdashborad/getPdtProductAvgStartAndDealyCount', data });
};

// 全年产品达标率趋势图
export const getComplianceTrendency = (data: any) => {
  return request.post({ url: '/api/luteos/pdtdashborad/getComplianceTrendency', data });
};

// 全年产品达标率趋势图
export const queryFileRecordList = (params: any) => {
  return request.get({ url: '/api/platform/fileRecord/queryFileRecordList', params });
};
