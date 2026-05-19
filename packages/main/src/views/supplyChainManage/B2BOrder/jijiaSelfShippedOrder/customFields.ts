const customFields = [
  {
    title: '订单明细',
    propertyArr: [
      { key: 'productImageUrl', label: '图片', checked: true },
      { key: 'productName', label: '商品名称', checked: true, readonly: true },
      { key: 'supplySku', label: '供应链SKU', checked: true, readonly: true },
      { key: 'numInt', label: '数量', checked: true, readonly: true },
      { key: 'price', label: '销售单价', checked: true, readonly: true },
      { key: 'total', label: '总数量', checked: true, readonly: false },
      { key: 'customerDesc', label: '客户名称', checked: true, readonly: true },
      { key: 'shopAccount', label: '卖家账号', checked: true },
      { key: 'creator', label: '创建人', checked: true },
      { key: 'waitAuditOperatorList', label: '当前待审核人', checked: true },
      { key: 'sourceDesc', label: '订单来源', checked: true },
      { key: 'orderSaleTypeDesc', label: '订单渠道', checked: true },
    ],
  },
  {
    title: '订单金额',
    propertyArr: [
      {
        key: 'realTransactionAmount',
        label: '订单售价(不含税)',
        checked: true,
      },
      {
        key: 'discountAmount',
        label: '订单折扣',
        checked: true,
      },
      { key: 'taxes', label: '订单税金', checked: true },
      { key: 'freightAmount', label: '订单买家支付运费', checked: true },
      { key: 'tipAmount', label: '订单其他费用', checked: true },
    ],
  },
  {
    title: '发货信息',
    propertyArr: [
      { key: 'receiverName', label: '收件人', checked: true, readonly: true },
      {
        key: 'receiverCountry',
        label: '国家/地区',
        checked: true,
        readonly: true,
        slot: 'buyerCountryDesc',
      },
      { key: 'warehouseName', label: '发货仓库', checked: true, readonly: true },
      { key: 'logisticsChannelName', label: '物流渠道', checked: true, readonly: true },
      // { key: 'trackOrderCode', label: '跟踪号', checked: true },
      // { key: 'waybillNo', label: '运单号', checked: true },
      // { key: 'outboundCode', label: '出库单号', checked: true },
      // { key: 'markShippedStatusDesc', label: '标发状态', checked: true },
      // {
      //   key: 'updateMarkShipped',
      //   label: '标发更新状态',
      //   checked: true,
      //   slot: 'updateMarkShipped',
      // },
    ],
  },
  {
    title: '时间',
    propertyArr: [
      { key: 'paymentTime', label: '付款', checked: true, readonly: true },
      // { key: 'sendTime', label: '发货', checked: true },
      // { key: 'auditTime', label: '审核', checked: true },
    ],
  },
];
export default customFields;
