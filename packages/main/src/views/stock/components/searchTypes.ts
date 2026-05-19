export const searchTypes = {
  // 积加库存
  jjProductTypes: [
    { label: '供应链SKU', value: 'skus' },
    { label: '产品名称', value: 'skuName' },
  ],
  jjFbaSeachTypes: [
    { label: 'ASIN', value: 'asins' },
    { label: 'MSKU', value: 'mskus' },
    { label: 'FNSKU', value: 'fnskus' },
    { label: '供应链SKU', value: 'skus' },
    { label: '产品名称', value: 'productName' },
  ],
  jjWalmartSeachTypes: [
    { label: 'ItemID', value: 'itemIds' },
    { label: 'MSKU', value: 'mskus' },
    { label: 'GTIN', value: 'gtins' },
    { label: '供应链SKU', value: 'skus' },
    { label: '产品名称', value: 'skuName' },
  ],
  jjTripartiteSeachTypes: [
    { label: '供应链SKU', value: 'skus' },
    { label: '三方仓SKU', value: 'thirdSkus' },
    { label: '产品名称', value: 'productName' },
    { label: '三方仓名称', value: 'productCnName' },
  ],

  // 平台库存
  fbtSearchTypes: [
    { label: 'MSKU', value: 'mskus' },
    { label: 'ItemID', value: 'itemIds' },
    { label: '供应链SKU', value: 'skus' },
    { label: '产品名称', value: 'productName' },
  ],

  // 计划业务库存
  // 中仓
  centerSearchTypes: [
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品名称', value: 'productName' },
    { label: '产品SKU', value: 'skuCode' },
  ],
  // Amazon
  fbaSearchTypes: [
    { label: 'ASIN', value: 'asin' },
    { label: 'MSKU', value: 'msku' },
    { label: 'FNSKU', value: 'fnsku' },
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品名称', value: 'productName' },
  ],
  // shopify
  shopifySearchTypes: [
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品SKU', value: 'skuCode' },
    { label: '产品名称', value: 'productName' },
  ],
  //walmart
  walmartSearchTypes: [
    { label: 'ItemID', value: 'itemId' },
    { label: 'MSKU', value: 'msku' },
    { label: 'GTIN', value: 'gtin' },
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品SKU', value: 'skuCode' },
    { label: '产品名称', value: 'productName' },
  ],
  // tiktok
  tikTokSearchTypes: [
    // { label: 'ItemID', value: 'itemId' },
    { label: 'MSKU', value: 'msku' },
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品SKU', value: 'skuCode' },
    { label: '产品名称', value: 'productName' },
  ],
  // 零售
  retailSearchTypes: [
    { label: '供应链SKU', value: 'supplySku' },
    { label: '产品SKU', value: 'skuCode' },
    { label: '产品名称', value: 'productName' },
  ],

  // 采购订单
  purchaseOrderSearchTypes: [
    { label: '任务单号', value: 'taskNumber' },
    { label: '采购单号', value: 'purchaseOrderNumber' },
    { label: '供应商', value: 'supplierName' },
    { label: '产品名称', value: 'productName' },
  ],
};
