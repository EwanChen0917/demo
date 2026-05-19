import { useAxios } from '@/config/axios/useAxios';

const request = useAxios();

/* 红人标识码 */
export const queryMetaMarkList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryMetaMarkList', params });
};
export const saveMetaMarkInfo = (data: any) => {
  return request.post({ url: '/api/luteos/meta/saveMetaMarkInfo', data });
};
export const queryOperatorList = () => {
  return request.get({ url: '/api/luteos/meta/queryOperatorList' });
};
export const handleMetaMark = (data: any) => {
  return request.post({ url: '/api/luteos/meta/handleMetaMark', data });
};

/* 红人合作 */
export const queryUserList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryUserList', params });
};

// 红人列表导出
export const exportUserList = (data: any) => {
  return request.post({ url: '/api/luteos/meta/exportUserList', data });
};
export const queryUserSquareList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryUserSquareList', params });
};
export const operateUser = (data: any) => {
  return request.post({ url: '/api/luteos/meta/operateUser', data });
};
export const queryUserListParam = () => {
  return request.get({ url: '/api/luteos/meta/queryUserListParam' });
};

export const queryHomeData = () => {
  return request.get({ url: '/api/luteos/meta/queryHomeData' });
};

/* 红人标签 */
export const queryLabelList = (params: any) => {
  return request.get({ url: '/api/platform/label/queryLabelList', params });
};

export const queryUserInfo = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryUserInfo', params });
};

export const queryChannelList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryChannelList', params });
};

export const querySiteList = (params: any) => {
  return request.get({ url: '/api/platform/site/querySiteList', params });
};
export const saveLabelInfo = (data: any) => {
  return request.post({ url: '/api/platform/label/saveLabelInfo', data });
};
export const saveUserInfo = (data: any) => {
  return request.post({ url: '/api/luteos/meta/saveUserInfo', data });
};
export const queryCountryList = (params: any) => {
  return request.get({ url: '/api/luteos/data/queryCountryList', params });
};

/* 订单列表 */
export const querySampleOrder = (data: any) => {
  return request.post({ url: '/api/order/querySampleOrder', data });
};
export const querySaleOrder = (data: any) => {
  return request.post({ url: '/api/order/querySaleOrder', data });
};

export const queryProjectList = (data: any) => {
  return request.post({ url: '/api/luteos/meta/queryProjectList', data });
};

export const queryProductList = (params: any) => {
  return request.get({ url: '/api/luteos/data/querySkuList', params });
};

export const queryDataProductList = (params: any) => {
  return request.get({ url: '/api/luteos/data/queryProductList', params });
};

export const addProject = (data: any) => {
  return request.post({ url: '/api/luteos/meta/addProject', data });
};

export const queryProductLineList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryProductLineList', params });
};

export const queryMetaMarkTaskList = (params: any) => {
  return request.get({ url: '/api/luteos/meta/queryMetaMarkTaskList', params });
};

export const handleMetaMarkTask = (data: any) => {
  return request.post({ url: '/api/luteos/meta/handleMetaMarkTask', data });
};

export const saveMetaMarkTask = (data: any) => {
  return request.post({ url: '/api/luteos/meta/saveMetaMarkTask', data });
};

/** 发样申请 */
// 物流服务商列表查询
export const queryShippingSupplierList = (params: any) => {
  return request.get({ url: '/api/luteos/data/queryShippingSupplierList', params });
};

// 商品仓库库存查询
// export const queryWarehouseProduct = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/base/queryWarehouseProduct', params });
// };

// 仓库列表查询
// export const queryWarehouseList = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/base/queryWarehouseList', params });
// };

// 仓库物流方式查询
// export const queryWarehouseLogistics = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/base/queryWarehouseLogistics', params });
// };

// 发样单保存
// export const saveSampleOrder = (data: any) => {
//   return request.post({ url: '/api/luteos/meta/order/saveSampleOrder', data });
// };

// 销售订单详情查询
// export const queryMetaOrderDetail = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/order/queryMetaOrderDetail', params });
// };

// // 销售订单查询
// export const queryMetaOrderList = (data: any) => {
//   return request.post({ url: '/api/luteos/meta/order/queryMetaOrderList', data });
// };

// // 销售订单导出
// export const exportMetaOrder = (data: any) => {
//   return request.post({ url: '/api/luteos/meta/order/exportMetaOrder', data });
// };

// 发样单详情查询
// export const querySampleOrderDetail = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/order/querySampleOrderDetail', params });
// };

// 发样单列表查询
// export const querySampleOrderList = (data: any) => {
//   return request.post({
//     url: '/api/luteos/meta/order/querySampleOrderList',
//     data,
//   });
// };

// 同步发样单状态
// export const syncSampleOrderStatus = (data: any) => {
//   return request.post({ url: '/api/luteos/meta/order/syncSampleOrderStatus', data });
// };

// 查询SKU列表
export const querySkuList = (params: any) => {
  return request.get({ url: '/api/luteos/data/querySkuList', params });
};

// 订单枚举查询
// export const queryOrderEnum = (params: any) => {
//   return request.get({ url: '/api/luteos/meta/order/queryOrderEnum', params });
// };
