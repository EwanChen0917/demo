import { defineStore } from 'pinia';
import { refreshType } from '@/views/budget/base/enums/enums';

export default defineStore('useTask', () => {
  const taskMap = reactive({
    samplesendSync: true,
    turnoverSync: true,
    supplierSync: true,
    B2BOrderSync: true,
    fbaSendSync: true,
    customsDeclarationPlanSync: true,
    customsDeclarationPlanLastRefreshTime: '',
    [refreshType.映射关系]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.产品信息]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.售价信息]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.采购成本价]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.研发项目]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.国家信息]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.渠道]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.运营人员信息]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.sku开卖时间]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.GTM品线]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.收入结算单]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.ToB收入结算单]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.平台库存单]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.收款单]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.OA付款单]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.其他往来单位]: { apiSync: true, lastRefreshTime: '' },
    [refreshType.银行账号]: { apiSync: true, lastRefreshTime: '' },
    overSeaSendSync: true,
    lastRefreshTime: '',
  });
  return {
    taskMap,
  };
});
